// /api/admin/proyectos/[n]/notas
//  POST   → agrega una nota de seguimiento al proyecto (solo Orlando)
//  DELETE → borra una nota (?nota=<id>)
// Viven en `admin_proyecto_notas`, aparte del espejo del tablero.

import { NextRequest, NextResponse } from 'next/server'
import { exigirAdmin } from '@/lib/admin/guardia'
import { adminDb } from '@/lib/firebase-admin'
import { COL_PROYECTO_NOTAS } from '@/lib/admin/proyectos'
import { texto } from '@/lib/crm/normalizar'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Ctx = { params: Promise<{ n: string }> }

export async function POST(req: NextRequest, { params }: Ctx) {
  const guardia = await exigirAdmin(req)
  if (!guardia.ok) return guardia.respuesta
  const { n } = await params
  const numero = Number(n)
  if (!Number.isFinite(numero)) return NextResponse.json({ error: 'proyecto_invalido' }, { status: 400 })

  let body: { texto?: string }
  try {
    body = (await req.json()) as { texto?: string }
  } catch {
    return NextResponse.json({ error: 'json_invalido' }, { status: 400 })
  }

  const contenido = texto(body.texto, 2000)
  if (!contenido) return NextResponse.json({ error: 'nota_vacia' }, { status: 400 })

  try {
    const ref = await adminDb.collection(COL_PROYECTO_NOTAS).add({
      n: numero,
      texto: contenido,
      fecha: new Date().toISOString(),
      autor: guardia.email,
    })
    const doc = await ref.get()
    return NextResponse.json({ ok: true, nota: { id: doc.id, ...doc.data() } })
  } catch (error) {
    console.error('[admin/proyectos/notas] error:', error)
    return NextResponse.json({ error: 'error_interno' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: Ctx) {
  const guardia = await exigirAdmin(req)
  if (!guardia.ok) return guardia.respuesta
  await params // la nota se identifica por su id, el número va en la URL por claridad

  const notaId = req.nextUrl.searchParams.get('nota') || ''
  if (!notaId) return NextResponse.json({ error: 'falta_nota' }, { status: 400 })

  try {
    await adminDb.collection(COL_PROYECTO_NOTAS).doc(notaId).delete()
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[admin/proyectos/notas] DELETE error:', error)
    return NextResponse.json({ error: 'error_interno' }, { status: 500 })
  }
}
