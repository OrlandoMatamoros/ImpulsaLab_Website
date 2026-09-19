// GET /api/admin/crm/contactos
// Lista de contactos para la tabla del panel. Solo Orlando (ID token + allowlist).
// ?pruebas=1 incluye los contactos marcados como prueba (los de smoke tests).

import { NextRequest, NextResponse } from 'next/server'
import { exigirAdmin } from '@/lib/admin/guardia'
import { adminDb } from '@/lib/firebase-admin'
import { COL_CONTACTOS } from '@/lib/crm/ingesta'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const LIMITE = 500

export async function GET(req: NextRequest) {
  const guardia = await exigirAdmin(req)
  if (!guardia.ok) return guardia.respuesta

  const incluirPruebas = req.nextUrl.searchParams.get('pruebas') === '1'

  try {
    const snap = await adminDb.collection(COL_CONTACTOS).limit(LIMITE).get()
    const contactos: Record<string, unknown>[] = snap.docs
      .map((d) => ({ id: d.id, ...d.data() }) as Record<string, unknown>)
      .filter((c) => incluirPruebas || c.es_prueba !== true)
      // Orden en memoria: el volumen es de decenas de filas, no vale un índice.
      .sort((a, b) =>
        String(b.ultimo_contacto || b.actualizado || '').localeCompare(
          String(a.ultimo_contacto || a.actualizado || ''),
        ),
      )

    return NextResponse.json({ contactos, total: contactos.length })
  } catch (error) {
    console.error('[admin/crm/contactos] error:', error)
    return NextResponse.json({ error: 'error_interno' }, { status: 500 })
  }
}
