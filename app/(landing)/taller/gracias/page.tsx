import type { Metadata } from 'next'
import Image from 'next/image'
import { TALLER } from '@/lib/taller/config'
import { fechaCorta, fechaLarga, hora } from '@/lib/taller/fechas'
import { enlaceGoogleCalendar } from '@/lib/taller/calendario'
import { leerSesion, llaveTaller, type SesionCheckout } from '@/lib/taller/stripe'
import RegistrarCompra from './RegistrarCompra'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Tu cupo en el taller',
  robots: { index: false, follow: false },
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const ID_VALIDO = /^cs_(test|live)_[A-Za-z0-9]{10,250}$/

async function buscarPago(id: string | undefined): Promise<SesionCheckout | null> {
  if (!id || !ID_VALIDO.test(id)) return null
  const llave = llaveTaller()
  if (!llave) return null
  try {
    const s = await leerSesion(llave, id)
    // Solo cuenta si es un pago de ESTE taller (la cuenta de Stripe también cobra otras cosas).
    if (s.metadata?.evento !== TALLER.id || s.payment_status !== 'paid') return null
    return s
  } catch (err) {
    console.error('[taller] No se pudo leer la sesión de pago en la página de gracias:', String(err))
    return null
  }
}

export default async function GraciasPage({ searchParams }: { searchParams: Promise<{ sesion?: string }> }) {
  const { sesion } = await searchParams
  const pago = await buscarPago(sesion)
  const nombre = pago?.customer_details?.name?.trim().split(/\s+/)[0] ?? null
  const whatsapp = `https://wa.me/${TALLER.whatsapp}?text=${encodeURIComponent(
    `Hola, tengo una pregunta sobre el Taller de IA del ${fechaCorta(TALLER.inicio)}.`,
  )}`
  const invitar = `https://wa.me/?text=${encodeURIComponent(
    `Me inscribí al ${TALLER.nombre} de Impulsa Lab: presencial y en español, el ${fechaLarga(TALLER.inicio)} en Brooklyn. ¿Vamos? https://goimpulsalab.com/taller`,
  )}`

  return (
    <main className="min-h-screen bg-[#002D62] font-sans text-white antialiased">
      {pago && !pago.livemode && (
        <p className="bg-[#001B3D] px-4 py-2 text-center text-[13px] font-medium text-white/85">
          Vista previa: este fue un pago de prueba, no se cobró dinero real.
        </p>
      )}
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 md:py-20">
        <Image src="/images/taller/isotipo-negativo.png" alt="Impulsa Lab" width={191} height={345} className="h-10 w-auto" />

        {pago ? (
          <>
            <RegistrarCompra valor={(pago.amount_total ?? 0) / 100} franja={pago.metadata?.franja ?? ''} />
            <h1 className="mt-8 text-[34px] font-extrabold leading-[1.08] tracking-[-0.025em] sm:text-5xl">
              {nombre ? `¡Listo, ${nombre}!` : '¡Listo!'} Tu cupo está asegurado.
            </h1>
            <p className="mt-4 text-[18px] leading-relaxed text-white/85">
              Te esperamos en el {TALLER.nombre}. Guarda esta fecha en tu calendario: es lo más importante ahora.
            </p>

            <div className="mt-8 rounded-2xl bg-white p-6 text-[#002D62] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]">
              <p className="text-[22px] font-extrabold leading-tight">{cap(fechaLarga(TALLER.inicio))}</p>
              <p className="mt-1 text-[16px] font-bold">
                {hora(TALLER.inicio)} a {hora(TALLER.fin)}
              </p>
              <p className="mt-3 text-[16px] leading-snug text-[#3A4A5E]">
                {TALLER.lugar.direccion}, {TALLER.lugar.ciudad}{' '}
                <a href={TALLER.lugar.mapa} target="_blank" rel="noopener noreferrer" className="font-bold text-[#002D62] underline decoration-[#00BCD4] decoration-2 underline-offset-4">
                  Ver en el mapa
                </a>
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a
                  href={enlaceGoogleCalendar()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-[#002D62] px-5 py-3.5 text-center text-[16px] font-extrabold text-white hover:bg-[#0A3F7E]"
                >
                  Agregar a Google Calendar
                </a>
                <a
                  href="/taller/evento.ics"
                  className="rounded-xl px-5 py-3.5 text-center text-[16px] font-extrabold text-[#002D62] ring-2 ring-[#002D62] hover:bg-[#F4F7FB]"
                >
                  Agregar a Apple u Outlook
                </a>
              </div>
            </div>

            <h2 className="mt-10 text-[22px] font-extrabold">Qué sigue</h2>
            <ul className="mt-4 space-y-3 text-[17px] leading-relaxed text-white/85">
              <li>Te llega el recibo de pago a tu correo.</li>
              <li>Antes del taller te escribimos para que llegues con tu cuenta de IA creada.</li>
              <li>El día del taller trae el celular cargado, tu computador si tienes y un problema real de tu negocio para la clínica.</li>
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href={invitar} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[#00BCD4] px-5 py-3.5 text-center text-[16px] font-extrabold text-[#002D62] hover:bg-[#33CADD]">
                Invitar a un colega por WhatsApp
              </a>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-xl px-5 py-3.5 text-center text-[16px] font-extrabold text-white ring-2 ring-white/40 hover:ring-white">
                Tengo una pregunta
              </a>
            </div>
          </>
        ) : (
          <>
            <h1 className="mt-8 text-[30px] font-extrabold leading-tight tracking-[-0.02em] sm:text-4xl">No encontramos un pago con este enlace</h1>
            <p className="mt-4 text-[18px] leading-relaxed text-white/85">
              Si acabas de pagar y llegaste aquí, escríbenos por WhatsApp con el correo que usaste y lo revisamos. Si todavía no has
              reservado, puedes hacerlo desde la página del taller.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/taller" className="rounded-xl bg-[#00BCD4] px-5 py-3.5 text-center text-[16px] font-extrabold text-[#002D62] hover:bg-[#33CADD]">
                Ir a la página del taller
              </a>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-xl px-5 py-3.5 text-center text-[16px] font-extrabold text-white ring-2 ring-white/40 hover:ring-white">
                Escribir por WhatsApp
              </a>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
