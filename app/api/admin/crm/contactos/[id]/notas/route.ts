// POST /api/admin/crm/contactos/[id]/notas — agrega una nota fechada al contacto.
// Las notas son de Orlando: las máquinas nunca las tocan.

import { NextRequest, NextResponse } from 'next/server'
import { exigirAdmin } from '@/lib/admin/guardia'
import { adminDb } from '@/lib/firebase-admin'
import { COL_CONTACTOS, MAX_NOTAS } from '@/lib/crm/ingesta'
import { texto } from '@/lib/crm/normalizar'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guardia = await exigirAdmin(req)
  if (!guardia.ok) return guardia.respuesta
  const { id } = await params

  let body: { texto?: string }
  try {
    body = (await req.json()) as { texto?: string }
  } catch {
    return NextResponse.json({ error: 'json_invalido' }, { status: 400 })
  }

  const contenido = texto(body.texto, 2000)
  if (!contenido) return NextResponse.json({ error: 'nota_vacia' }, { status: 400 })

  const ahora = new Date().toISOString()
  const ref = adminDb.collection(COL_CONTACTOS).doc(id)

  try {
    await adminDb.runTransaction(async (t) => {
      const doc = await t.get(ref)
      if (!doc.exists) throw new Error('no_existe')
      const previo = doc.data() as Record<string, unknown>
      const notas = Array.isArray(previo.notas) ? previo.notas : []
      t.set(
        ref,
        {
          notas: [...notas, { fecha: ahora, texto: contenido }].slice(-MAX_NOTAS),
          ultima_gestion: ahora,
          actualizado: ahora,
        },
        { merge: true },
      )
    })
    const doc = await ref.get()
    return NextResponse.json({ ok: true, contacto: { id: doc.id, ...doc.data() } })
  } catch (error) {
    if ((error as Error).message === 'no_existe') {
      return NextResponse.json({ error: 'no_existe' }, { status: 404 })
    }
    console.error('[admin/crm/notas] error:', error)
    return NextResponse.json({ error: 'error_interno' }, { status: 500 })
  }
}
