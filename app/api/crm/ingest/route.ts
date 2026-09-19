// POST /api/crm/ingest
// Puerta de entrada del CRM para las máquinas (flujos de n8n y la carga inicial
// desde la hoja). Autenticación: `Authorization: Bearer <CRM_INGEST_SECRET>`.
//
// Es idempotente y deduplica por contacto: ver lib/crm/ingesta.ts.
// OJO: este endpoint NO debe quedar detrás de un redirect 301 — un 301 convierte
// el POST en GET y el dato se pierde en silencio (ver middleware.ts).

import { NextRequest, NextResponse } from 'next/server'
import { exigirSecreto } from '@/lib/admin/guardia'
import { ErrorIngesta, ingestarEvento, type PayloadIngesta } from '@/lib/crm/ingesta'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 20

export async function POST(req: NextRequest) {
  const guardia = exigirSecreto(req, 'CRM_INGEST_SECRET')
  if (!guardia.ok) return guardia.respuesta

  let body: PayloadIngesta
  try {
    body = (await req.json()) as PayloadIngesta
  } catch {
    return NextResponse.json({ error: 'json_invalido' }, { status: 400 })
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'json_invalido' }, { status: 400 })
  }

  try {
    const resultado = await ingestarEvento(body)
    return NextResponse.json(resultado)
  } catch (error) {
    if (error instanceof ErrorIngesta) {
      return NextResponse.json({ error: error.codigo }, { status: error.status })
    }
    console.error('[crm/ingest] error:', error)
    return NextResponse.json({ error: 'error_interno' }, { status: 500 })
  }
}
