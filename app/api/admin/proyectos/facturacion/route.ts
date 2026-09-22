// POST /api/admin/proyectos/facturacion
//
// Lo llama la app de invoicing (invoicing.tuimpulsalab.com) cada vez que pasa
// algo facturable: se envía o acepta un estimado, se emite, envía o cobra una
// factura. Autenticación por secreto propio (`FACTURACION_SYNC_SECRET`), no por
// sesión: lo ejecuta una máquina, no un navegador.
//
// Manda el RESUMEN COMPLETO de cada proyecto, no eventos sueltos. Así es
// idempotente: si un envío se pierde, el siguiente deja los números correctos
// igual. Un log de eventos exigiría acumular estado aquí y quedaría desfasado
// en cuanto fallara una entrega.
//
// ⚠️ Esta ruta tiene que estar en RUTAS_MAQUINA del middleware: un 301 convierte
// el POST en GET y el dato se pierde sin que nadie vea un error (regla 74).

import { NextRequest, NextResponse } from 'next/server'
import { exigirSecreto } from '@/lib/admin/guardia'
import { adminDb } from '@/lib/firebase-admin'
import { COL_PROYECTO_FACTURACION, normalizarResumen } from '@/lib/admin/facturacion'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 30

const LIMITE = 100

export async function POST(req: NextRequest) {
  const guardia = exigirSecreto(req, 'FACTURACION_SYNC_SECRET')
  if (!guardia.ok) return guardia.respuesta

  let body: { proyectos?: unknown }
  try {
    body = (await req.json()) as { proyectos?: unknown }
  } catch {
    return NextResponse.json({ error: 'json_invalido' }, { status: 400 })
  }

  if (!Array.isArray(body?.proyectos)) {
    return NextResponse.json({ error: 'falta_proyectos' }, { status: 400 })
  }
  if (body.proyectos.length > LIMITE) {
    return NextResponse.json({ error: 'demasiados_proyectos' }, { status: 400 })
  }

  const validos = body.proyectos
    .map(normalizarResumen)
    .filter((r): r is NonNullable<ReturnType<typeof normalizarResumen>> => r !== null)
  const descartados = body.proyectos.length - validos.length

  try {
    // Se escribe sin borrar lo que no venga: a diferencia del espejo del
    // tablero, aquí un proyecto ausente significa «el invoicing no tiene nada
    // suyo ahora mismo», no «ya no existe». Borrarlo perdería el histórico.
    const lote = adminDb.batch()
    const col = adminDb.collection(COL_PROYECTO_FACTURACION)
    const recibido = new Date().toISOString()
    for (const r of validos) {
      lote.set(col.doc(String(r.n)), { ...r, recibido }, { merge: true })
    }
    await lote.commit()

    return NextResponse.json({
      ok: true,
      guardados: validos.length,
      descartados,
      recibido,
    })
  } catch (error) {
    console.error('[admin/proyectos/facturacion] error:', error)
    return NextResponse.json({ error: 'error_interno' }, { status: 500 })
  }
}
