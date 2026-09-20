// POST /api/crm/alertado
// Lo llama el vigilante DESPUÉS de mandarte el aviso, para que el contacto no
// vuelva a alertar cada 2 horas y para dejar guardado el diagnóstico que hizo
// Claude (se ve en la ficha del CRM).
//
// Autenticación de máquina: Authorization: Bearer <CRM_INGEST_SECRET>
// Cuerpo: { id, evaluacion?: {veredicto, motivo, urgencia, mensaje_sugerido} }
//
// OJO: ruta de máquina — no puede quedar detrás de un redirect (regla 74).

import { NextRequest, NextResponse } from 'next/server'
import { exigirSecreto } from '@/lib/admin/guardia'
import { adminDb } from '@/lib/firebase-admin'
import { COL_CONTACTOS } from '@/lib/crm/ingesta'
import { texto } from '@/lib/crm/normalizar'
import { estadoTrasAlerta, type ContactoConAlerta } from '@/lib/crm/pendientes'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 20

const URGENCIAS = ['alta', 'media', 'baja'] as const

export async function POST(req: NextRequest) {
  const guardia = exigirSecreto(req, 'CRM_INGEST_SECRET')
  if (!guardia.ok) return guardia.respuesta

  let body: Record<string, unknown>
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'json_invalido' }, { status: 400 })
  }

  const id = typeof body.id === 'string' ? body.id.trim() : ''
  if (!id) return NextResponse.json({ error: 'falta_id' }, { status: 400 })

  const ev = (body.evaluacion || {}) as Record<string, unknown>
  const ahora = new Date()

  try {
    const ref = adminDb.collection(COL_CONTACTOS).doc(id)
    const doc = await ref.get()
    if (!doc.exists) return NextResponse.json({ error: 'no_existe' }, { status: 404 })

    const previo = doc.data() as ContactoConAlerta
    const cambios: Record<string, unknown> = {
      ...estadoTrasAlerta({ ...previo, id }, ahora),
      actualizado: ahora.toISOString(),
    }

    if (ev && typeof ev === 'object' && Object.keys(ev).length) {
      const urgencia = typeof ev.urgencia === 'string' && (URGENCIAS as readonly string[]).includes(ev.urgencia)
        ? ev.urgencia
        : 'media'
      cambios.evaluacion = {
        fecha: ahora.toISOString(),
        veredicto: texto(ev.veredicto, 40),
        motivo: texto(ev.motivo, 400),
        urgencia,
        mensaje_sugerido: texto(ev.mensaje_sugerido, 600),
      }
    }

    // OJO: NO se toca `ultima_gestion`. Avisar no es atender: si se marcara,
    // el contacto dejaría de salir como «sin respuesta» sin que nadie le escriba.
    await ref.update(cambios)
    return NextResponse.json({ ok: true, id, alertas_enviadas: cambios.alertas_enviadas })
  } catch (error) {
    console.error('[crm/alertado] error:', error)
    return NextResponse.json({ error: 'error_interno' }, { status: 500 })
  }
}
