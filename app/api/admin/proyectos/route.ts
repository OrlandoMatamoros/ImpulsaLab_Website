// GET /api/admin/proyectos — tarjetas de negocio del tablero + las notas de
// seguimiento que Orlando escribe desde el panel (colección aparte: el espejo
// del tablero nunca las pisa).

import { NextRequest, NextResponse } from 'next/server'
import { exigirAdmin } from '@/lib/admin/guardia'
import { adminDb } from '@/lib/firebase-admin'
import { COL_PROYECTOS, COL_PROYECTO_NOTAS } from '@/lib/admin/proyectos'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const guardia = await exigirAdmin(req)
  if (!guardia.ok) return guardia.respuesta

  try {
    const [snapProyectos, snapNotas] = await Promise.all([
      adminDb.collection(COL_PROYECTOS).limit(200).get(),
      adminDb.collection(COL_PROYECTO_NOTAS).limit(1000).get(),
    ])

    const notasPorProyecto: Record<string, Array<Record<string, unknown>>> = {}
    snapNotas.docs.forEach((d) => {
      const data = d.data() as Record<string, unknown>
      const clave = String(data.n ?? '')
      if (!notasPorProyecto[clave]) notasPorProyecto[clave] = []
      notasPorProyecto[clave].push({ id: d.id, ...data })
    })
    Object.values(notasPorProyecto).forEach((lista) =>
      lista.sort((a, b) => String(b.fecha || '').localeCompare(String(a.fecha || ''))),
    )

    const proyectos: Record<string, unknown>[] = snapProyectos.docs
      .map((d) => ({ ...d.data(), notas_panel: notasPorProyecto[d.id] || [] }) as Record<string, unknown>)
      .sort((a, b) => Number(a.n) - Number(b.n))

    return NextResponse.json({ proyectos, total: proyectos.length })
  } catch (error) {
    console.error('[admin/proyectos] error:', error)
    return NextResponse.json({ error: 'error_interno' }, { status: 500 })
  }
}
