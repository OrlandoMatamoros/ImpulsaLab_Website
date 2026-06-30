'use client'

// `window.gtag` ya está declarado globalmente en el repo (app/(public)/gracias/page.tsx),
// así que aquí no se redeclara — se reutiliza esa declaración global.

// Etiqueta de conversión de Google Ads para "Clic WhatsApp — Academy" (Tarea A2, creada 2026-06-30).
const CONVERSION_SEND_TO = 'AW-17854811161/Bn_ECJiHjcgcEJmY68FC'

// Número de WhatsApp de ENTRADA DEL BOT (Atlas) — confirmado por Orlando 2026-06-29.
// El 347... es atención humana (mensajes/llamadas), NO va en la campaña.
const WHATSAPP_NUMBER = '19295007815'
const WHATSAPP_TEXT = 'Hola, me interesa la capacitación de IA de Impulsa Academy ($297).'

export default function WhatsAppCTA() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`

  function handleClick() {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', { send_to: CONVERSION_SEND_TO, value: 1.0, currency: 'USD' })
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:brightness-110"
    >
      Escríbenos por WhatsApp
    </a>
  )
}
