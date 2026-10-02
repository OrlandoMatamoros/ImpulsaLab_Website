import type { Metadata } from 'next'
import Image from 'next/image'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa6'
import { TALLER } from '@/lib/taller/config'
import { AGENDA, CASOS } from '@/lib/taller/contenido'
import { estadoVenta } from '@/lib/taller/precio'
import { estadoCupo } from '@/lib/taller/cupos'
import { fechaCorta, fechaLarga, hora, ultimoMinuto } from '@/lib/taller/fechas'
import BotonReservar from './_componentes/BotonReservar'
import CuentaRegresiva from './_componentes/CuentaRegresiva'
import BarraMovil from './_componentes/BarraMovil'
import NotaReferido from './_componentes/NotaReferido'
import Revelar from './_componentes/Revelar'
import LineaAgenda from './_componentes/LineaAgenda'
import './taller.css'

// El precio cambia por fecha y el cupo por las ventas: la página se arma en cada visita (es
// liviana). Lo que se COBRA y el cierre por cupo los vuelve a decidir el servidor en cada
// intento de pago (app/api/taller/checkout).
export const dynamic = 'force-dynamic'

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const EV = TALLER.evento
const FECHA = fechaLarga(TALLER.inicio) // viernes 20 de noviembre
const HORARIO = `${hora(TALLER.inicio)} a ${hora(TALLER.fin)}`
const LIMITE_DEVOLUCION = fechaLarga(TALLER.limiteDevolucion)
const PRECIO_COMPLETO = TALLER.franjas[TALLER.franjas.length - 1].precio
const FOTO = '/images/FotoWebImpulsalab.png'
const LEDE =
  '4 horas en Brooklyn: casos reales de negocios resueltos en vivo, paso a paso, con espacio para tus preguntas en cada uno y media hora final solo de preguntas.'
const WHATSAPP = `https://wa.me/${TALLER.whatsapp}?text=${encodeURIComponent(
  `Hola, tengo una pregunta sobre ${EV.la} de IA del ${fechaCorta(TALLER.inicio)}.`,
)}`

export const metadata: Metadata = {
  title: `${EV.nombre} en Brooklyn · ${cap(fechaCorta(TALLER.inicio))}`,
  description: `${EV.nombreLargo}: presencial, en español y con casos reales resueltos en vivo. ${cap(FECHA)}, ${hora(TALLER.inicio)}, ${TALLER.lugar.direccion}, Brooklyn. Cupo limitado.`,
  alternates: { canonical: 'https://goimpulsalab.com/masterclass' },
  robots: TALLER.lanzado ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: 'website',
    locale: 'es_US',
    url: 'https://goimpulsalab.com/masterclass',
    title: `${EV.nombre} · ${cap(FECHA)} en Brooklyn`,
    description: 'Presencial, en español, con casos reales de negocios resueltos en vivo y tus preguntas respondidas.',
  },
  // Sin esto hereda la tarjeta genérica de la portada al compartir en X.
  twitter: {
    card: 'summary_large_image',
    title: `${EV.nombre} · ${cap(FECHA)} en Brooklyn`,
    description: 'Presencial, en español y con casos reales resueltos en vivo.',
  },
}

const PREGUNTAS: { p: string; r: React.ReactNode }[] = [
  {
    p: '¿Necesito saber de tecnología?',
    r: 'No. Si sabes usar WhatsApp, puedes con esto. A la IA se le escribe en español, como le escribirías a una persona.',
  },
  {
    p: '¿Tengo que llevar computador?',
    r: 'No hace falta: todo se muestra en pantalla grande, paso a paso. Si quieres seguir los casos en tu celular o en tu computador, tráelo.',
  },
  {
    p: '¿Me sirve si mi negocio no es un restaurante?',
    r: 'Sí. Los casos son de restaurante, bodega, salón y servicios, y lo que se muestra se aplica a cualquier negocio. En las preguntas puedes traer el tuyo.',
  },
  {
    p: '¿Todo es en español?',
    r: 'Sí, todo: la explicación, los casos y las preguntas.',
  },
  {
    p: '¿Dónde es y cómo llego?',
    r: (
      <>
        En {TALLER.lugar.direccion}, {TALLER.lugar.ciudad}.{' '}
        <a href={TALLER.lugar.mapa} target="_blank" rel="noopener noreferrer" className="font-bold text-[#002D62] underline decoration-[#00BCD4] decoration-2 underline-offset-4">
          Ver en el mapa
        </a>
        .
      </>
    ),
  },
  {
    p: '¿Hay comida?',
    r: 'Café y snacks en la pausa.',
  },
  {
    p: '¿Hay cupo limitado?',
    r: `Sí: el salón tiene ${TALLER.cupoMaximo} puestos. Cuando se llenen, se cierra la inscripción.`,
  },
  {
    p: '¿Puedo ir con mi socio o con alguien de mi equipo?',
    r: 'Sí. Cada persona hace su propia reserva, porque cada una ocupa su puesto.',
  },
  {
    p: '¿Cómo pago?',
    r: 'Con tarjeta de crédito o débito en la página de pago segura de Stripe. Si tu celular tiene Apple Pay o Google Pay, también puedes usarlos. El precio que ves es el total: no hay cargos extra.',
  },
  {
    p: '¿Qué recibo cuando pago?',
    r: 'Ves tu confirmación en pantalla, con botones para guardar la fecha en tu calendario, y te llega el recibo al correo.',
  },
  {
    p: `¿Y después ${EV.dela}?`,
    r: `Si quieres que te acompañemos con tu negocio, puedes seguir con mentoría en español. Después ${EV.dela} te escribimos con las opciones; no es obligatorio y no tienes que decidir nada ese día.`,
  },
]

function Check({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className={className}>
      <path d="M4.5 10.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Equis({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className={className}>
      <path d="M6 6l8 8M14 6l-8 8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

/** WhatsApp, Instagram y Facebook de Impulsa. `tono`: sobre fondo azul (claro) o blanco (oscuro). */
function Redes({ tono = 'claro', className = '' }: { tono?: 'claro' | 'oscuro'; className?: string }) {
  const base =
    tono === 'claro'
      ? 'text-white/85 ring-white/25 hover:bg-white/10 hover:text-white'
      : 'text-[#002D62] ring-[#D6E0EC] hover:bg-[#F4F7FB]'
  const enlaces = [
    { href: WHATSAPP, nombre: 'Escríbenos por WhatsApp', Icono: FaWhatsapp },
    { href: TALLER.redes.instagram, nombre: 'Impulsa Lab en Instagram', Icono: FaInstagram },
    { href: TALLER.redes.facebook, nombre: 'Impulsa Lab en Facebook', Icono: FaFacebookF },
  ]
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {enlaces.map(({ href, nombre, Icono }) => (
        <li key={nombre}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={nombre}
            title={nombre}
            className={`flex h-10 w-10 items-center justify-center rounded-full ring-1 transition-colors ${base}`}
          >
            <Icono className="h-[18px] w-[18px]" aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  )
}

export default async function TallerPage() {
  const venta = estadoVenta()
  const cupo = await estadoCupo()
  const abierta = venta.abierta && !cupo.agotado
  const franja = venta.abierta ? venta.franja : null
  const siguiente = venta.abierta ? venta.siguiente : null
  const indiceVigente = venta.abierta ? venta.indice : TALLER.franjas.length
  const modoPrueba = (process.env.TALLER_STRIPE_SECRET_KEY ?? '').includes('_test_')

  const proximoPaso =
    franja && siguiente
      ? `Sube a $${siguiente.precio} el ${fechaCorta(franja.corte)}.`
      : franja
        ? 'Es el último precio: la venta cierra cuando empieza el evento.'
        : null
  const lineaCupo = cupo.avisar ? `Quedan ${cupo.quedan} de ${TALLER.cupoMaximo} puestos` : `Cupo limitado: ${TALLER.cupoMaximo} puestos`
  const cerrado = cupo.agotado ? 'Se agotaron los cupos.' : 'Las inscripciones ya cerraron.'

  const eventoJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: EV.nombreLargo,
    startDate: TALLER.inicio,
    endDate: TALLER.fin,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    inLanguage: 'es',
    maximumAttendeeCapacity: TALLER.cupoMaximo,
    location: {
      '@type': 'Place',
      name: `${TALLER.lugar.direccion}, Brooklyn`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: TALLER.lugar.direccion,
        addressLocality: 'Brooklyn',
        addressRegion: 'NY',
        postalCode: '11208',
        addressCountry: 'US',
      },
    },
    organizer: { '@type': 'Organization', name: 'Impulsa Lab', url: 'https://goimpulsalab.com' },
    performer: { '@type': 'Person', name: 'Orlando Matamoros' },
    image: `https://goimpulsalab.com${FOTO}`,
    description: 'Presencial y en español: casos reales de negocios resueltos en vivo, con preguntas en cada caso y media hora final de preguntas.',
    ...(franja
      ? {
          offers: {
            '@type': 'Offer',
            price: franja.precio,
            priceCurrency: 'USD',
            availability: cupo.agotado ? 'https://schema.org/SoldOut' : 'https://schema.org/LimitedAvailability',
            validThrough: franja.corte,
            url: 'https://goimpulsalab.com/masterclass',
          },
        }
      : {}),
  }

  let reloj = new Date(TALLER.inicio).getTime()
  const agenda = AGENDA.map((b) => {
    const desde = new Date(reloj)
    reloj += b.min * 60_000
    return { ...b, desde: hora(desde).replace(/ [ap]\. m\.$/, ''), hasta: hora(new Date(reloj)) }
  })

  return (
    <div className="overflow-x-clip bg-white font-sans text-[#002D62] antialiased">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventoJsonLd) }} />

      {modoPrueba && (
        <p className="bg-[#001B3D] px-4 py-2 text-center text-[13px] font-medium text-white/85">
          <span aria-hidden className="mr-2 inline-block h-2 w-2 rounded-full bg-[#00BCD4] align-middle" />
          Vista previa: los pagos de esta página son de prueba y no cobran dinero real.
        </p>
      )}

      <main>
        {/* ───────────────── Héroe ───────────────── */}
        <header className="relative overflow-hidden bg-[#002D62] text-white">
          {/* Luz cian detrás del retrato: el único gesto decorativo fijo de la página. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 top-10 hidden h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(0,188,212,0.35)_0%,rgba(0,188,212,0)_65%)] md:block"
          />
          <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-3 sm:px-6 sm:pt-6 md:pb-20 md:pt-8">
            <div className="t-entra t-entra-1 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Image src="/images/taller/isotipo-negativo.png" alt="" width={191} height={345} className="h-8 w-auto sm:h-9" priority />
                <span className="text-[15px] font-extrabold tracking-[0.02em] text-white">Impulsa Lab</span>
              </div>
              <Redes tono="claro" />
            </div>

            <div className="mt-4 grid items-end gap-10 sm:mt-8 md:mt-12 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-12">
              <div>
                <p className="t-entra t-entra-1 text-[15px] font-bold text-[#00BCD4] sm:text-base">{EV.nombreLargo}</p>
                <h1 className="t-entra t-entra-2 mt-1.5 text-[28px] font-extrabold leading-[1.05] tracking-[-0.025em] min-[400px]:text-[30px] sm:mt-3 sm:text-5xl lg:text-[60px]">
                  Pon la inteligencia artificial a trabajar en tu negocio.
                </h1>

                <ul className="t-entra t-entra-3 mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-[16px] font-bold sm:mt-6 sm:gap-y-2.5 sm:text-[17px]">
                  {['Presencial', 'En español', 'Casos reales', 'Preguntas en vivo'].map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00BCD4] text-[#002D62]">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>

                <p className="t-entra t-entra-3 mt-5 hidden max-w-[48ch] text-lg leading-relaxed text-white/80 sm:block">{LEDE}</p>

                {/* La entrada: fecha, lugar, cupo, precio y botón en un solo objeto. */}
                <div className="t-entra t-entra-4 relative mt-4 grid overflow-hidden rounded-2xl bg-white text-[#002D62] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
                  <div className="px-5 py-3 sm:px-6 sm:py-6">
                    <p className="text-[21px] font-extrabold leading-tight tracking-[-0.01em] sm:text-[22px]">{cap(FECHA)}</p>
                    <p className="mt-1 text-[16px] font-bold">{HORARIO}</p>
                    <a
                      href={TALLER.lugar.mapa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-block text-[15px] leading-snug text-[#3A4A5E] underline decoration-[#00BCD4] decoration-2 underline-offset-4 sm:mt-3"
                    >
                      {TALLER.lugar.direccion},<br className="hidden sm:inline" /> {TALLER.lugar.ciudad}
                      <span className="sr-only"> (abre el mapa)</span>
                    </a>
                    <p className={`mt-1 text-[14px] font-bold sm:mt-3 ${cupo.avisar ? 'text-[#B42318]' : 'text-[#3A4A5E]'}`}>{lineaCupo}</p>
                  </div>

                  {/* Perforación: línea punteada + dos muescas del color del fondo. */}
                  <div aria-hidden className="relative h-0 border-t-2 border-dashed border-[#C9D6E5] sm:absolute sm:inset-y-0 sm:left-[46.5%] sm:h-auto sm:w-0 sm:border-l-2 sm:border-t-0">
                    <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-[#002D62]" />
                    <span className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-[#002D62] sm:-bottom-3 sm:-left-3 sm:right-auto sm:top-auto" />
                  </div>

                  <div className="px-5 py-3 sm:py-6 sm:pl-7 sm:pr-6">
                    {abierta && franja ? (
                      <>
                        <p className="text-[14px] font-bold text-[#3A4A5E]">{franja.nombre}: precio de hoy</p>
                        <p className="mt-0.5 flex items-baseline gap-3">
                          <span className="text-[40px] font-extrabold leading-none tracking-[-0.03em] [font-variant-numeric:tabular-nums] sm:text-[44px]">
                            ${franja.precio}
                          </span>
                          {franja.precio < PRECIO_COMPLETO && (
                            <span className="text-[17px] font-bold text-[#55657A]">
                              <span className="sr-only">Precio completo: </span>
                              <s>${PRECIO_COMPLETO}</s>
                            </span>
                          )}
                        </p>
                        <p className="mt-1.5 text-[14px] leading-snug text-[#3A4A5E]">
                          {proximoPaso} <CuentaRegresiva hasta={franja.corte} className="font-bold text-[#002D62]" />
                        </p>
                        <BotonReservar id="reservar-heroe" precio={franja.precio} tono="oscuro" lugar="heroe" className="mt-2.5 sm:mt-4" />
                      </>
                    ) : (
                      <p className="text-lg font-bold">{cerrado}</p>
                    )}
                  </div>
                </div>

                <NotaReferido className="t-entra t-entra-5 mt-4 text-[15px] text-[#B2EBF2]" />
                <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-white/80 sm:hidden">{LEDE}</p>
                <p className="t-entra t-entra-5 mt-3 max-w-[52ch] text-[14px] leading-relaxed text-white/75">
                  Pagas en la página segura de Stripe, con tarjeta, Apple Pay o Google Pay. El precio es el total, sin cargos extra.
                </p>
              </div>

              <figure className="t-entra-foto relative mx-auto w-full max-w-[420px] md:mx-0 md:ml-auto">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] ring-1 ring-white/15">
                  <Image
                    src={FOTO}
                    alt="Orlando Matamoros, fundador de Impulsa Lab"
                    fill
                    priority
                    sizes="(min-width: 768px) 420px, 92vw"
                    className="object-cover object-[55%_20%]"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgba(0,27,61,0.95)_0%,rgba(0,27,61,0.7)_60%,rgba(0,27,61,0)_100%)] px-6 pb-5 pt-16">
                    <span className="block text-lg font-extrabold">Orlando Matamoros</span>
                    <span className="block text-[14px] text-white/80">Fundador de Impulsa Lab. Resuelve cada caso en vivo y responde tus preguntas.</span>
                  </figcaption>
                </div>
              </figure>
            </div>
          </div>
        </header>

        {/* ───────────────── ¿Te suena? ───────────────── */}
        <section className="bg-[#F4F7FB]">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:py-24">
            <Revelar>
              <h2 className="text-[30px] font-extrabold leading-[1.1] tracking-[-0.02em] md:text-[40px]">¿Te suena conocido?</h2>
              <blockquote className="mt-6 border-l-4 border-[#00BCD4] pl-5">
                <p className="text-[19px] font-bold leading-snug">
                  «Todos saben que tienen que meter la inteligencia artificial en su negocio. El problema es que nadie les dice cómo.»
                </p>
                <footer className="mt-3 text-[14px] text-[#3A4A5E]">Dueña de un minimarket en Brooklyn</footer>
              </blockquote>
            </Revelar>
            <ul className="divide-y divide-[#D6E0EC] border-y border-[#D6E0EC]">
              {[
                'Contestas los mismos mensajes de WhatsApp todo el día.',
                'Sabes que la IA existe, pero no sabes por dónde empezar.',
                'Tus ventas están en la caja o en un Excel y nadie tiene tiempo de mirarlas.',
                'Viste un curso de seis semanas, en inglés y en línea, y lo cerraste.',
              ].map((t, i) => (
                <li key={t}>
                  <Revelar retraso={i * 90} className="py-5 text-[19px] font-medium leading-snug md:text-[21px]">
                    {t}
                  </Revelar>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────────────── Contra el «hágalo usted mismo» ─────────────────
            Mensaje pedido por Orlando (informe de competidores, 2-oct): sin nombrar a nadie y sin
            «somos los únicos», que el informe no lo prueba. */}
        <section className="bg-[#002D62] text-white">
          <Revelar className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-20">
            <p className="text-[26px] font-extrabold leading-[1.2] tracking-[-0.02em] md:text-[36px]">
              No te vendemos una aplicación para que la configures solo. Te mostramos, en vivo y paso a paso, cómo usar la IA en casos
              reales de negocios como el tuyo, en español y en persona.
            </p>
            <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-white/80">
              Y si después quieres que te acompañemos con tu negocio, seguimos con mentoría en español.
            </p>
          </Revelar>
        </section>

        {/* ───────────────── Los casos ───────────────── */}
        <section id="casos">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
            <Revelar>
              <h2 className="max-w-[22ch] text-[30px] font-extrabold leading-[1.1] tracking-[-0.02em] md:text-[40px]">
                Lo que vamos a resolver en vivo
              </h2>
              <p className="mt-4 max-w-[60ch] text-[17px] leading-relaxed text-[#3A4A5E]">
                Casos reales de negocios como el tuyo, del más completo al más sencillo. Cada uno deja su espacio para preguntas.
              </p>
            </Revelar>
            <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CASOS.map((c, i) => (
                <li key={c.titulo} className={i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}>
                  <Revelar
                    retraso={(i % 3) * 90}
                    className="group h-full rounded-2xl bg-[#F4F7FB] p-6 ring-1 ring-transparent transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_40px_-24px_rgba(0,45,98,0.55)] hover:ring-[#D6E0EC] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    <span className="text-[14px] font-extrabold text-[#00A5BB] [font-variant-numeric:tabular-nums]">
                      Caso {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-2 text-[20px] font-extrabold leading-snug">{c.titulo}</h3>
                    <p className="mt-2 text-[16px] leading-relaxed text-[#3A4A5E]">{c.detalle}</p>
                  </Revelar>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────────────── Para quién ───────────────── */}
        <section className="bg-[#F4F7FB]">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20">
            <Revelar className="rounded-2xl bg-white p-7 ring-1 ring-[#D6E0EC]">
              <h2 className="text-[24px] font-extrabold tracking-[-0.01em]">Es para ti si…</h2>
              <ul className="mt-5 space-y-3.5 text-[17px] leading-snug">
                {[
                  'Tienes un negocio funcionando en Nueva York, o estás por abrirlo.',
                  'Usas el celular para todo, pero la IA todavía no.',
                  'Quieres ver cómo se hace, paso a paso, antes de pagar por herramientas.',
                  'Prefieres aprender en persona y en español.',
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#00A5BB]" />
                    {t}
                  </li>
                ))}
              </ul>
            </Revelar>
            <Revelar retraso={120} className="rounded-2xl p-7 ring-1 ring-[#D6E0EC]">
              <h2 className="text-[24px] font-extrabold tracking-[-0.01em]">No es para ti si…</h2>
              <ul className="mt-5 space-y-3.5 text-[17px] leading-snug text-[#3A4A5E]">
                {['Buscas un curso de programación.', 'Ya usas IA todos los días en tu negocio.', 'Quieres una charla de motivación sin casos reales.'].map((t) => (
                  <li key={t} className="flex gap-3">
                    <Equis className="mt-0.5 h-5 w-5 shrink-0 text-[#8A99AB]" />
                    {t}
                  </li>
                ))}
              </ul>
            </Revelar>
          </div>
        </section>

        {/* ───────────────── Agenda ───────────────── */}
        <section id="agenda">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24">
            <Revelar>
              <h2 className="text-[30px] font-extrabold leading-[1.1] tracking-[-0.02em] md:text-[40px]">Las 4 horas, una por una</h2>
              <p className="mt-4 max-w-[60ch] text-[17px] leading-relaxed text-[#3A4A5E]">
                {cap(FECHA)}, de {HORARIO}: casos reales con preguntas en cada uno, y media hora al final solo para tus preguntas.
              </p>
            </Revelar>
            <div className="relative mt-10">
              <LineaAgenda className="bottom-6 left-[9px] top-6" />
              <ol className="space-y-3">
                {agenda.map((b, i) => (
                  <li key={b.titulo} className="relative pl-10">
                    <span
                      aria-hidden
                      className={`absolute left-0 top-6 h-[21px] w-[21px] rounded-full border-[3px] ${
                        b.tipo === 'preguntas' ? 'border-[#00BCD4] bg-[#002D62]' : b.tipo === 'pausa' ? 'border-[#D6E0EC] bg-white' : 'border-[#00BCD4] bg-white'
                      }`}
                    />
                    <Revelar
                      retraso={Math.min(i, 2) * 60}
                      className={`rounded-2xl px-5 py-5 sm:px-6 ${
                        b.tipo === 'preguntas' ? 'bg-[#002D62] text-white' : b.tipo === 'pausa' ? 'bg-white' : 'bg-[#F4F7FB]'
                      }`}
                    >
                      <p className={`text-[14px] font-bold [font-variant-numeric:tabular-nums] ${b.tipo === 'preguntas' ? 'text-[#00BCD4]' : 'text-[#3A4A5E]'}`}>
                        {b.desde}–{b.hasta}
                      </p>
                      <h3 className={`mt-1 text-[20px] font-extrabold leading-snug ${b.tipo === 'pausa' ? 'text-[#3A4A5E]' : ''}`}>{b.titulo}</h3>
                      <p className={`mt-1.5 text-[16px] leading-relaxed ${b.tipo === 'preguntas' ? 'text-white/85' : 'text-[#3A4A5E]'}`}>{b.texto}</p>
                    </Revelar>
                  </li>
                ))}
              </ol>
            </div>
            <Revelar className="mt-8 rounded-xl bg-[#F4F7FB] px-5 py-4 text-[16px] leading-relaxed">
              <strong className="font-extrabold">Qué traer:</strong> el celular cargado, tu computador si quieres seguir los casos (no es
              obligatorio) y tus preguntas.
            </Revelar>
          </div>
        </section>

        {/* ───────────────── Quién te enseña ───────────────── */}
        <section className="bg-[#F4F7FB]">
          <Revelar className="mx-auto grid max-w-4xl items-center gap-8 px-4 py-16 sm:px-6 md:grid-cols-[180px_minmax(0,1fr)] md:py-20">
            <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full ring-4 ring-white md:h-44 md:w-44">
              <Image src={FOTO} alt="Orlando Matamoros" fill sizes="176px" className="object-cover object-[55%_12%]" />
            </div>
            <div>
              <h2 className="text-[28px] font-extrabold leading-tight tracking-[-0.02em] md:text-[34px]">Quién te enseña</h2>
              <p className="mt-1 text-[17px] font-bold text-[#3A4A5E]">Orlando Matamoros, fundador de Impulsa Lab</p>
              <ul className="mt-5 space-y-2.5 text-[17px] leading-relaxed">
                <li>Ha asesorado a más de 90 emprendimientos y ha dictado más de una docena de cursos en los últimos dos años.</li>
                <li>Más de 20 años en planificación estratégica, finanzas y operaciones.</li>
                <li>Colombiano. Vive en Nueva York y trabaja con dueños de negocios latinos que quieren usar la IA sin volverse técnicos.</li>
              </ul>
            </div>
          </Revelar>
        </section>

        {/* ───────────────── Precios: la escalera ───────────────── */}
        <section id="precios">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 md:py-24">
            <Revelar>
              <h2 className="text-[30px] font-extrabold leading-[1.1] tracking-[-0.02em] md:text-[40px]">El precio sube dos veces</h2>
              <p className="mt-4 max-w-[60ch] text-[17px] leading-relaxed text-[#3A4A5E]">
                Quien reserva primero paga menos, y quien ya pagó conserva su precio. Cupo limitado a {TALLER.cupoMaximo} puestos.
              </p>
            </Revelar>
            <ol className="mt-10 grid gap-4 md:grid-cols-3 md:items-end">
              {TALLER.franjas.map((f, i) => {
                const estado = i < indiceVigente ? 'pasada' : i === indiceVigente ? 'vigente' : 'proxima'
                const desde = i === 0 ? null : fechaLarga(TALLER.franjas[i - 1].corte)
                const hasta =
                  i === TALLER.franjas.length - 1
                    ? 'Hasta el día del evento'
                    : `Hasta el ${fechaLarga(ultimoMinuto(f.corte))}${i === 0 ? ` a las ${hora(ultimoMinuto(f.corte))}` : ''}`
                const alturas = ['md:min-h-[210px]', 'md:min-h-[250px]', 'md:min-h-[290px]']
                return (
                  <li key={f.id} aria-current={estado === 'vigente' ? 'true' : undefined}>
                    <Revelar
                      escalon
                      retraso={i * 140}
                      className={`flex h-full flex-col justify-end rounded-2xl p-6 ${alturas[i] ?? ''} ${
                        estado === 'vigente'
                          ? 'bg-[#002D62] text-white shadow-[0_20px_50px_-24px_rgba(0,45,98,0.8)] ring-2 ring-[#00BCD4]'
                          : estado === 'pasada'
                            ? 'bg-[#F4F7FB] text-[#5A6B80]'
                            : 'bg-white ring-1 ring-[#D6E0EC]'
                      }`}
                    >
                      <p className={`text-[14px] font-bold ${estado === 'vigente' ? 'text-[#00BCD4]' : ''}`}>
                        {estado === 'vigente' ? 'Vigente ahora' : estado === 'pasada' ? 'Terminó' : `Desde el ${desde}`}
                      </p>
                      <p className="mt-1 text-[18px] font-extrabold">{f.nombre}</p>
                      <p className="mt-2 text-[48px] font-extrabold leading-none tracking-[-0.03em] [font-variant-numeric:tabular-nums]">
                        {estado === 'pasada' ? <s>${f.precio}</s> : `$${f.precio}`}
                      </p>
                      <p className={`mt-3 text-[15px] leading-snug ${estado === 'vigente' ? 'text-white/80' : estado === 'pasada' ? '' : 'text-[#3A4A5E]'}`}>
                        {hasta}
                      </p>
                    </Revelar>
                  </li>
                )
              })}
            </ol>
          </div>
        </section>

        {/* ───────────────── Preguntas ───────────────── */}
        <section className="bg-[#F4F7FB]">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
            <Revelar>
              <h2 className="text-[30px] font-extrabold leading-[1.1] tracking-[-0.02em] md:text-[40px]">Preguntas frecuentes</h2>
            </Revelar>
            <div className="mt-8 border-t border-[#D6E0EC]">
              {PREGUNTAS.map((q) => (
                <details key={q.p} className="group border-b border-[#D6E0EC]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[18px] font-extrabold leading-snug [&::-webkit-details-marker]:hidden">
                    {q.p}
                    <span
                      aria-hidden
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-xl font-bold text-[#002D62] transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                    >
                      +
                    </span>
                  </summary>
                  <div className="pb-6 pr-10 text-[17px] leading-relaxed text-[#3A4A5E]">{q.r}</div>
                </details>
              ))}
            </div>
            {/* La página de pago de Stripe enlaza aquí (#devoluciones): debe existir siempre. */}
            <div id="devoluciones" className="mt-10 scroll-mt-6 rounded-2xl bg-white p-6 ring-1 ring-[#D6E0EC]">
              <h3 className="text-[18px] font-extrabold">Política de devoluciones</h3>
              <p className="mt-2 text-[16px] leading-relaxed text-[#3A4A5E]">
                Si pagas y luego no puedes ir, avísanos hasta el {LIMITE_DEVOLUCION} y te devolvemos el 100 %. Después de esa fecha
                puedes pasarle tu cupo a otra persona: solo dinos su nombre. Las devoluciones llegan a tu tarjeta en 5 a 10 días hábiles.
              </p>
            </div>
          </div>
        </section>

        {/* ───────────────── Cierre ───────────────── */}
        <section className="relative overflow-hidden bg-[#002D62] text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-56 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,188,212,0.28)_0%,rgba(0,188,212,0)_65%)]"
          />
          <Revelar className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 md:py-24">
            <Image src="/images/taller/logo-impulsa-negativo.png" alt="Impulsa Lab" width={613} height={480} className="mx-auto h-20 w-auto" />
            <h2 className="mt-8 text-[30px] font-extrabold leading-[1.1] tracking-[-0.02em] md:text-[42px]">
              Te esperamos el {FECHA} a las {hora(TALLER.inicio)}
            </h2>
            <p className="mt-3 text-[17px] text-white/80">
              {TALLER.lugar.direccion}, {TALLER.lugar.ciudad}
            </p>
            <p className={`mt-2 text-[15px] font-bold ${cupo.avisar ? 'text-[#FFB4A8]' : 'text-[#B2EBF2]'}`}>{lineaCupo}</p>
            {abierta && franja ? (
              <div className="mx-auto mt-8 max-w-sm">
                <p className="text-[15px] text-white/80">
                  {proximoPaso} <CuentaRegresiva hasta={franja.corte} className="font-bold text-white" />
                </p>
                <BotonReservar id="reservar-cierre" precio={franja.precio} lugar="cierre" className="mt-4" />
              </div>
            ) : (
              <p className="mt-8 text-lg font-bold">{cerrado}</p>
            )}
            <p className="mt-8 text-[16px] text-white/80">
              ¿Tienes dudas?{' '}
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="font-bold text-white underline decoration-[#00BCD4] decoration-2 underline-offset-4">
                Escríbenos por WhatsApp
              </a>{' '}
              o síguenos en redes.
            </p>
            <Redes tono="claro" className="mt-4 justify-center" />
          </Revelar>
        </section>
      </main>

      <footer id="pie" className="bg-[#001B3D] pb-28 text-white/70 lg:pb-0">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-8 text-[14px] sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date(TALLER.inicio).getFullYear()} Impulsa Lab LLC, Nueva York</p>
          <Redes tono="claro" />
          <nav aria-label="Enlaces legales" className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="/legal/privacidad" className="hover:text-white">Privacidad</a>
            <a href="/legal/terminos" className="hover:text-white">Términos</a>
            <a href="/" className="hover:text-white">goimpulsalab.com</a>
          </nav>
        </div>
      </footer>

      {abierta && franja && <BarraMovil precio={franja.precio} detalle={`${cap(FECHA)}, ${hora(TALLER.inicio)}, en Brooklyn`} />}
    </div>
  )
}
