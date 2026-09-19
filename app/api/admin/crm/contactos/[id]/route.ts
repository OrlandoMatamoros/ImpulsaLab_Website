// /api/admin/crm/contactos/[id]
//  GET    → contacto + su historial de mensajes
//  PATCH  → etapa, próximo paso, interés, nombre (lo que Orlando edita a mano)
//  DELETE → borra el contacto y sus mensajes (para limpiar pruebas o spam)

import { NextRequest, NextResponse } from 'next/server'
import { exigirAdmin } from '@/lib/admin/guardia'
import { adminDb } from '@/lib/firebase-admin'
import { COL_CONTACTOS, COL_MENSAJES } from '@/lib/crm/ingesta'
import { texto } from '@/lib/crm/normalizar'
import { ETAPAS, type Etapa } from '@/lib/crm/tipos'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Ctx = { params: Promise<{ id: string }> }

export async function GET(req: NextRequest, { params }: Ctx) {
  const guardia = await exigirAdmin(req)
  if (!guardia.ok) return guardia.respuesta
  const { id } = await params

  try {
    const doc = await adminDb.collection(COL_CONTACTOS).doc(id).get()
    if (!doc.exists) return NextResponse.json({ error: 'no_existe' }, { status: 404 })

    const snap = await adminDb.collection(COL_MENSAJES).where('contacto_id', '==', id).limit(500).get()
    const mensajes: Record<string, unknown>[] = snap.docs
      .map((d) => ({ id: d.id, ...d.data() }) as Record<string, unknown>)
      .sort((a, b) => String(a.fecha || '').localeCompare(String(b.fecha || '')))

    return NextResponse.json({ contacto: { id: doc.id, ...doc.data() }, mensajes })
  } catch (error) {
    console.error('[admin/crm/contacto] error:', error)
    return NextResponse.json({ error: 'error_interno' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const guardia = await exigirAdmin(req)
  if (!guardia.ok) return guardia.respuesta
  const { id } = await params

  let body: Record<string, unknown>
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'json_invalido' }, { status: 400 })
  }

  const ahora = new Date().toISOString()
  const cambios: Record<string, unknown> = { actualizado: ahora, ultima_gestion: ahora }

  if (typeof body.etapa === 'string') {
    if (!(ETAPAS as readonly string[]).includes(body.etapa)) {
      return NextResponse.json({ error: 'etapa_invalida' }, { status: 400 })
    }
    cambios.etapa = body.etapa as Etapa
  }
  if (typeof body.proximo_paso === 'string') cambios.proximo_paso = texto(body.proximo_paso, 200)
  if (typeof body.proximo_paso_fecha === 'string') {
    const f = body.proximo_paso_fecha.trim()
    if (f && !/^\d{4}-\d{2}-\d{2}$/.test(f)) {
      return NextResponse.json({ error: 'fecha_invalida' }, { status: 400 })
    }
    cambios.proximo_paso_fecha = f
  }
  if (typeof body.interes === 'string') cambios.interes = texto(body.interes, 200)
  if (typeof body.nombre === 'string') cambios.nombre = texto(body.nombre, 120)

  try {
    const ref = adminDb.collection(COL_CONTACTOS).doc(id)
    await adminDb.runTransaction(async (t) => {
      const doc = await t.get(ref)
      if (!doc.exists) throw new Error('no_existe')
      const previo = doc.data() as Record<string, unknown>

      if (cambios.etapa && cambios.etapa !== previo.etapa) {
        const historial = Array.isArray(previo.historial_etapas) ? previo.historial_etapas : []
        cambios.historial_etapas = [
          ...historial.slice(-49),
          { fecha: ahora, de: (previo.etapa as string) || '', a: cambios.etapa },
        ]
      }
      t.set(ref, cambios, { merge: true })
    })

    const doc = await adminDb.collection(COL_CONTACTOS).doc(id).get()
    return NextResponse.json({ ok: true, contacto: { id: doc.id, ...doc.data() } })
  } catch (error) {
    if ((error as Error).message === 'no_existe') {
      return NextResponse.json({ error: 'no_existe' }, { status: 404 })
    }
    console.error('[admin/crm/contacto] PATCH error:', error)
    return NextResponse.json({ error: 'error_interno' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: Ctx) {
  const guardia = await exigirAdmin(req)
  if (!guardia.ok) return guardia.respuesta
  const { id } = await params

  try {
    const mensajes = await adminDb.collection(COL_MENSAJES).where('contacto_id', '==', id).limit(500).get()
    const lote = adminDb.batch()
    mensajes.docs.forEach((d) => lote.delete(d.ref))
    lote.delete(adminDb.collection(COL_CONTACTOS).doc(id))
    await lote.commit()
    return NextResponse.json({ ok: true, mensajes_borrados: mensajes.size })
  } catch (error) {
    console.error('[admin/crm/contacto] DELETE error:', error)
    return NextResponse.json({ error: 'error_interno' }, { status: 500 })
  }
}
