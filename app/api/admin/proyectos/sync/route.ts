// POST /api/admin/proyectos/sync
// Lo llama `~/tablero-proyectos/build.py` al final de cada construcción del
// tablero, con las tarjetas de NEGOCIO. Autenticación por secreto propio
// (`PROYECTOS_SYNC_SECRET`), no por sesión: lo ejecuta un script, no el navegador.
//
// Es un espejo completo: lo que no venga en el payload se borra del panel (así
// desaparece del sitio un proyecto que se pasó a personal). Las notas que Orlando
// escribe en el panel viven en OTRA colección y este espejo no las toca.
//
// Esta ruta está exenta del portero de sesión del middleware (ver middleware.ts).

import { NextRequest, NextResponse } from 'next/server'
import { exigirSecreto } from '@/lib/admin/guardia'
import { adminDb } from '@/lib/firebase-admin'
import { COL_PROYECTOS, filtrarTarjetas } from '@/lib/admin/proyectos'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 30

export async function POST(req: NextRequest) {
  const guardia = exigirSecreto(req, 'PROYECTOS_SYNC_SECRET')
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

  const { tarjetas, omitidos } = filtrarTarjetas(body.proyectos)

  try {
    const ahora = new Date().toISOString()
    const col = adminDb.collection(COL_PROYECTOS)
    const existentes = await col.get()
    const vigentes = new Set(tarjetas.map((t) => String(t.n)))

    const lote = adminDb.batch()
    tarjetas.forEach((t) => lote.set(col.doc(String(t.n)), { ...t, sincronizado: ahora }))
    existentes.docs.forEach((d) => {
      if (!vigentes.has(d.id)) lote.delete(d.ref)
    })
    await lote.commit()

    return NextResponse.json({
      ok: true,
      sincronizados: tarjetas.length,
      borrados: existentes.docs.filter((d) => !vigentes.has(d.id)).map((d) => d.id),
      omitidos,
      sincronizado: ahora,
    })
  } catch (error) {
    console.error('[admin/proyectos/sync] error:', error)
    return NextResponse.json({ error: 'error_interno' }, { status: 500 })
  }
}
