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

  let body: { proyectos?: unknown; completo?: unknown }
  try {
    body = (await req.json()) as { proyectos?: unknown; completo?: unknown }
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

  // `completo: true` significa que el emisor mandó la lista ENTERA de proyectos
  // que facturan ahora mismo. Solo entonces se puede borrar lo que no venga.
  //
  // Hace falta: reasignar un cliente de un proyecto a otro dejaba el documento
  // viejo huérfano, y la ficha equivocada seguía mostrando dinero que ya no era
  // suya. Pasó el 22-sep con El Conuco Market, puesto por error en el proyecto
  // 2 («Taller de IA») cuando es el 1.
  const completo = body.completo === true

  try {
    const lote = adminDb.batch()
    const col = adminDb.collection(COL_PROYECTO_FACTURACION)
    const recibido = new Date().toISOString()
    for (const r of validos) {
      lote.set(col.doc(String(r.n)), { ...r, recibido }, { merge: true })
    }

    let borrados: string[] = []
    if (completo) {
      const vigentes = new Set(validos.map((r) => String(r.n)))
      const existentes = await col.get()
      borrados = existentes.docs.filter((d) => !vigentes.has(d.id)).map((d) => d.id)
      borrados.forEach((id) => lote.delete(col.doc(id)))
    }

    await lote.commit()

    return NextResponse.json({
      ok: true,
      guardados: validos.length,
      descartados,
      borrados,
      recibido,
    })
  } catch (error) {
    console.error('[admin/proyectos/facturacion] error:', error)
    return NextResponse.json({ error: 'error_interno' }, { status: 500 })
  }
}
