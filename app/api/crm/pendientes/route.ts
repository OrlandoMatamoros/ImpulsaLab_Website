// GET /api/crm/pendientes
// Lo que consume el vigilante de conversaciones cortadas (flujo n8n «CRM — Alerta
// de conversación cortada»). Autenticación de máquina:
//   Authorization: Bearer <CRM_INGEST_SECRET>
//
// Devuelve SOLO los contactos que hay que avisar ahora (lib/crm/pendientes.ts
// decide), cada uno con su conversación reciente para que Claude la lea, el
// enlace de WhatsApp ya armado y el enlace a su ficha.
//
// OJO: ruta de máquina — no puede quedar detrás de un redirect (regla 74).

import { NextRequest, NextResponse } from 'next/server'
import { exigirSecreto } from '@/lib/admin/guardia'
import { adminDb } from '@/lib/firebase-admin'
import { COL_CONTACTOS, COL_MENSAJES } from '@/lib/crm/ingesta'
import { enlaceWhatsApp, mensajeWhatsApp, telefonoLegible, type ContactoCRM, type MensajeCRM } from '@/lib/crm/tipos'
import { esperaEnTexto, necesitaAlerta, type ContactoConAlerta } from '@/lib/crm/pendientes'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 30

const SITIO = 'https://goimpulsalab.com'
const MAX_MENSAJES = 12

export async function GET(req: NextRequest) {
  const guardia = exigirSecreto(req, 'CRM_INGEST_SECRET')
  if (!guardia.ok) return guardia.respuesta

  const ahora = new Date()
  try {
    const snap = await adminDb.collection(COL_CONTACTOS).limit(500).get()
    const candidatos = snap.docs
      .map((d) => ({ ...(d.data() as ContactoCRM), id: d.id }) as ContactoConAlerta)
      .filter((c) => necesitaAlerta(c, ahora))

    const pendientes = []
    for (const c of candidatos) {
      const ms = await adminDb
        .collection(COL_MENSAJES)
        .where('contacto_id', '==', c.id)
        .limit(200)
        .get()
      const conversacion = ms.docs
        .map((d) => d.data() as MensajeCRM)
        .sort((a, b) => (a.fecha < b.fecha ? -1 : a.fecha > b.fecha ? 1 : 0))
        .slice(-MAX_MENSAJES)
        .map((m) => ({
          fecha: m.fecha,
          quien: m.direccion === 'entrante' ? 'persona' : 'impulsa',
          texto: (m.texto || '').slice(0, 700),
        }))

      pendientes.push({
        id: c.id,
        nombre: c.nombre || '',
        telefono: telefonoLegible(c.telefono),
        correo: c.correo || '',
        origen: c.origen,
        etapa: c.etapa,
        temperatura: c.temperatura || '',
        interes: c.interes || '',
        tema: c.tema || '',
        ultimo_contacto: c.ultimo_contacto,
        espera: esperaEnTexto(c, ahora),
        avisos_previos: c.alertas_enviadas && c.alerta_de === c.ultimo_contacto ? c.alertas_enviadas : 0,
        ultimo_mensaje: (c.ultimo_mensaje || '').slice(0, 700),
        conversacion,
        enlace_whatsapp: enlaceWhatsApp(c),
        mensaje_sugerido_base: mensajeWhatsApp(c),
        enlace_ficha: `${SITIO}/admin/crm?contacto=${encodeURIComponent(c.id)}`,
      })
    }

    return NextResponse.json({ generado: ahora.toISOString(), total: pendientes.length, pendientes })
  } catch (error) {
    console.error('[crm/pendientes] error:', error)
    return NextResponse.json({ error: 'error_interno' }, { status: 500 })
  }
}
