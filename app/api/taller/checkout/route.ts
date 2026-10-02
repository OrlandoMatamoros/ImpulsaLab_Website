import { NextResponse } from 'next/server'
import { TALLER } from '@/lib/taller/config'
import { estadoVenta, vendedorPorRef } from '@/lib/taller/precio'
import { fechaLarga, hora } from '@/lib/taller/fechas'
import { crearSesion, ErrorStripe, llaveTaller } from '@/lib/taller/stripe'
import { estadoCupo } from '@/lib/taller/cupos'
import { rateLimit } from '@/lib/rate-limit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST /api/taller/checkout — abre la página de pago de Stripe del taller.
 * Cuerpo opcional: { ref: "yorkis" } (el código del vendedor que venía en el enlace).
 * El precio NO viene del navegador: sale de la franja vigente en este instante.
 */

// Orígenes a los que Stripe puede devolver al comprador. Cualquier otro cae al dominio canónico.
function origenPermitido(req: Request): string {
  const canonico = 'https://goimpulsalab.com'
  try {
    const o = new URL(req.url)
    const host = o.hostname
    if (host === 'goimpulsalab.com') return canonico
    if (host === 'localhost' || host === '127.0.0.1') return o.origin
    // Vistas previas del proyecto en Vercel.
    if (/^impulsa-lab-v-claude-[a-z0-9-]+\.vercel\.app$/.test(host)) return `https://${host}`
  } catch {
    /* URL inválida: canónico */
  }
  return canonico
}

const TIPOS_NEGOCIO = [
  { value: 'restaurante', label: 'Restaurante, cafetería o comida' },
  { value: 'bodega', label: 'Bodega, minimarket o tienda' },
  { value: 'belleza', label: 'Salón de belleza, barbería o uñas' },
  { value: 'construccion', label: 'Construcción, remodelación u oficios' },
  { value: 'servicios', label: 'Limpieza, mudanzas o servicios a domicilio' },
  { value: 'transporte', label: 'Transporte o entregas' },
  { value: 'profesional', label: 'Contabilidad, seguros, impuestos o bienes raíces' },
  { value: 'otro', label: 'Otro tipo de negocio' },
  { value: 'ninguno', label: 'Todavía no tengo negocio' },
]

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || req.headers.get('x-real-ip') || 'desconocida'
  const rl = await rateLimit({ prefix: 'taller-pago', identifier: ip, limit: 12, windowSec: 600 })
  if (!rl.success) {
    return NextResponse.json(
      { error: 'Hiciste muchos intentos seguidos. Espera unos minutos y vuelve a intentarlo.' },
      { status: rl.httpStatus ?? 429 },
    )
  }

  const venta = estadoVenta()
  if (!venta.abierta) {
    return NextResponse.json({ error: 'Las inscripciones ya cerraron.' }, { status: 410 })
  }
  // Cupo del salón: al venderse todos los puestos, no se abren más pagos.
  if ((await estadoCupo()).agotado) {
    return NextResponse.json({ error: 'Se agotaron los cupos. Escríbenos por WhatsApp para quedar en lista de espera.' }, { status: 410 })
  }

  let ref: unknown = null
  try {
    const texto = await req.text()
    if (texto.length > 2_000) return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 })
    if (texto) ref = (JSON.parse(texto) as { ref?: unknown }).ref
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 })
  }
  const vendedor = vendedorPorRef(ref)

  const llave = llaveTaller()
  if (!llave) {
    return NextResponse.json(
      { error: 'El pago no está disponible en este momento. Escríbenos por WhatsApp y te inscribimos.' },
      { status: 503 },
    )
  }

  const origen = origenPermitido(req)
  const ahoraSeg = Math.floor(Date.now() / 1000)
  // La sesión vence cuando vence la franja (para que nadie pague el precio viejo horas después),
  // dentro del rango que Stripe acepta: entre 30 min y 24 h desde ahora.
  const corteSeg = Math.floor(new Date(venta.franja.corte).getTime() / 1000)
  const expira = Math.min(ahoraSeg + 24 * 3600 - 60, Math.max(ahoraSeg + 31 * 60, corteSeg))

  const metadatos = {
    evento: TALLER.id,
    franja: venta.franja.id,
    precio: String(venta.franja.precio),
    ref: vendedor?.slug ?? 'ninguno',
  }
  const opcionesReferido = [
    ...TALLER.vendedores.map((v) => ({ value: v.slug, label: v.nombre })),
    { value: 'redes', label: 'Lo vi en redes sociales' },
    { value: 'otro', label: 'Otra persona o lugar' },
  ]
  const lugar = `${TALLER.lugar.direccion}, ${TALLER.lugar.ciudad}`

  try {
    const sesion = await crearSesion(llave, {
      mode: 'payment',
      locale: 'es-419',
      submit_type: 'book',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: venta.franja.precio * 100,
            product_data: {
              name: `${TALLER.evento.nombre} · ${venta.franja.nombre}`,
              description: `Presencial y en español · ${fechaLarga(TALLER.inicio, true)}, ${hora(TALLER.inicio)} a ${hora(TALLER.fin)} · ${lugar}`,
            },
          },
        },
      ],
      name_collection: { individual: { enabled: true } },
      phone_number_collection: { enabled: true },
      custom_fields: [
        {
          key: 'negocio',
          label: { type: 'custom', custom: 'Nombre de tu negocio' },
          type: 'text',
          optional: true,
          text: { maximum_length: 120 },
        },
        {
          key: 'tipo',
          label: { type: 'custom', custom: '¿A qué se dedica tu negocio?' },
          type: 'dropdown',
          dropdown: { options: TIPOS_NEGOCIO },
        },
        {
          key: 'referido',
          label: { type: 'custom', custom: '¿Quién te la recomendó?' },
          type: 'dropdown',
          dropdown: { options: opcionesReferido, default_value: vendedor?.slug },
        },
      ],
      // Solo tarjeta (incluye Apple Pay y Google Pay): los medios que confirman días después
      // (débito bancario) dejarían al comprador viendo «pago no encontrado».
      // OJO: desde la versión 2026-09-30.endive `payment_method_types` ya no existe y da 400.
      allowed_payment_method_types: ['card'],
      // Sin Link: en la prueba del 2-oct Link colaba «Banco» y «Klarna» (5,99 % + 30 ¢) aunque la
      // sesión fuera solo tarjeta. La página promete tarjeta, Apple Pay y Google Pay.
      wallet_options: { link: { display: 'never' } },
      // Sin cupones: la cuenta de Stripe es compartida y un cupón de otro producto valdría aquí.
      custom_text: {
        submit: {
          message:
            `Al reservar aceptas la política de devoluciones ${TALLER.evento.dela} (goimpulsalab.com/masterclass#devoluciones). ` +
            `Cupo limitado a ${TALLER.cupoMaximo} puestos.`,
        },
      },
      metadata: metadatos,
      payment_intent_data: {
        description: `${TALLER.evento.nombre} · ${fechaLarga(TALLER.inicio, true)} · ${venta.franja.nombre}`,
        metadata: metadatos,
      },
      expires_at: expira,
      success_url: `${origen}/masterclass/gracias?sesion={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origen}/masterclass${vendedor ? `?ref=${vendedor.slug}` : ''}`,
    })

    if (!sesion.url) throw new ErrorStripe('Stripe no devolvió la URL de pago', 502)
    return NextResponse.json({ url: sesion.url }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (err) {
    const detalle = err instanceof ErrorStripe ? `${err.status} ${err.codigo ?? ''} ${err.message}` : String(err)
    console.error('[taller] No se pudo crear la sesión de pago:', detalle)
    return NextResponse.json(
      { error: 'No pudimos abrir el pago. Intenta de nuevo en un minuto o escríbenos por WhatsApp.' },
      { status: 502 },
    )
  }
}
