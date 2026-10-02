import type { Metadata } from 'next'
import Image from 'next/image'
import { TALLER } from '@/lib/taller/config'
import { estadoVenta } from '@/lib/taller/precio'
import { fechaCorta, fechaLarga, hora, ultimoMinuto } from '@/lib/taller/fechas'
import BotonReservar from './_componentes/BotonReservar'
import CuentaRegresiva from './_componentes/CuentaRegresiva'
import BarraMovil from './_componentes/BarraMovil'
import NotaReferido from './_componentes/NotaReferido'

// El precio cambia por fecha: la página se arma en cada visita (es liviana), así el precio
// mostrado nunca queda viejo tras un corte. El que se COBRA lo recalcula el servidor en cada
// intento de pago (app/api/taller/checkout).
export const dynamic = 'force-dynamic'

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const FECHA = fechaLarga(TALLER.inicio) // viernes 20 de noviembre
const HORARIO = `${hora(TALLER.inicio)} a ${hora(TALLER.fin)}`
const DECISION = fechaLarga(TALLER.decision)
const PRECIO_COMPLETO = TALLER.franjas[TALLER.franjas.length - 1].precio
const LEDE =
  'Una tarde de 4 horas en Brooklyn: 3 de mentoría con ejercicios en vivo y 1 de clínica donde resolvemos el problema que tú traigas.'
const WHATSAPP = `https://wa.me/${TALLER.whatsapp}?text=${encodeURIComponent(
  `Hola, tengo una pregunta sobre el Taller de IA del ${fechaCorta(TALLER.inicio)}.`,
)}`

export const metadata: Metadata = {
  title: `Taller + mentoría de IA en Brooklyn · ${cap(fechaCorta(TALLER.inicio))}`,
  description: `Taller presencial y en español para dueños de negocio: 4 horas con tu negocio real y mentoría. ${cap(FECHA)}, ${hora(TALLER.inicio)}, ${TALLER.lugar.direccion}, Brooklyn.`,
  alternates: { canonical: 'https://goimpulsalab.com/taller' },
  robots: TALLER.lanzado ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: 'website',
    locale: 'es_US',
    url: 'https://goimpulsalab.com/taller',
    title: `Taller + mentoría de IA · ${cap(FECHA)} en Brooklyn`,
    description: 'Presencial, en español, con tu negocio real y con mentoría. 4 horas para poner la IA a trabajar en tu negocio.',
  },
  // Sin esto hereda la tarjeta genérica de la portada al compartir en X.
  twitter: {
    card: 'summary_large_image',
    title: `Taller + mentoría de IA · ${cap(FECHA)} en Brooklyn`,
    description: 'Presencial, en español, con tu negocio real y con mentoría.',
  },
}

/** La agenda arranca a la hora de inicio del archivo de configuración. Debe sumar 4 horas. */
const BLOQUES: { min: number; titulo: string; texto: string; tipo?: 'pausa' | 'clinica' }[] = [
  {
    min: 30,
    titulo: 'La IA sin enredos',
    texto:
      'De dónde salió, qué es un «modelo» (el cerebro que hay detrás de ChatGPT o Claude), qué empresas mandan hoy y las tres formas de usarla: en la página web, en la app del celular y en el computador.',
  },
  {
    min: 30,
    titulo: 'Tu cuenta y tu primera conexión',
    texto:
      'Dejas tu cuenta lista, aprendes cuál IA conviene para cada tarea y qué es un conector: la forma de unir la IA con las aplicaciones que ya usas. En vivo la conectamos a una app de viajes y buscamos pasajes.',
  },
  {
    min: 60,
    titulo: 'Tus números',
    texto:
      'Le das a la IA un Excel de ventas y te dice qué se vende, qué no y cuánto te deja. Con los datos de una caja registradora armamos un tablero de control. Y creas un Excel, un Word y una presentación con solo pedirlos.',
  },
  { min: 15, titulo: 'Pausa', texto: 'Café y algo de picar.', tipo: 'pausa' },
  {
    min: 45,
    titulo: 'Tus clientes y tus redes',
    texto:
      'Contestas correos y reseñas de Google con tu propio tono. Le tomas una foto a un producto tuyo y sales con la publicación lista para Instagram.',
  },
  {
    min: 60,
    titulo: 'Clínica en vivo con tu negocio',
    texto:
      'Traes el problema que te quita tiempo cada semana y lo resolvemos en pantalla, delante de todos y paso a paso.',
    tipo: 'clinica',
  },
]

const LLEVAS = [
  {
    t: 'Tu cuenta de IA lista',
    d: 'Y sabiendo cuál usar para qué: ChatGPT, Claude o Gemini, y qué plan te conviene.',
  },
  {
    t: 'Tus números en claro',
    d: 'Subes el Excel o el reporte de tu caja y sales sabiendo qué se vende y cuánto te deja.',
  },
  {
    t: 'Clientes contestados en un minuto',
    d: 'Correos y reseñas de Google respondidos con tu tono, sin sonar a robot.',
  },
  {
    t: 'Publicaciones con tus productos',
    d: 'Una foto de algo que vendes se convierte en un post listo para tus redes.',
  },
  {
    t: 'Documentos con solo pedirlos',
    d: 'Un Excel, una carta en Word o una presentación, escribiendo en español lo que necesitas.',
  },
  {
    t: 'Tu problema, resuelto',
    d: 'La última hora es para los casos que traen ustedes, con tu negocio en pantalla.',
  },
]

const PREGUNTAS: { p: string; r: React.ReactNode }[] = [
  {
    p: '¿Necesito saber de tecnología?',
    r: 'No. Si sabes usar WhatsApp, puedes con esto. A la IA se le escribe en español, como le escribirías a una persona.',
  },
  {
    p: '¿Tengo que llevar computador?',
    r: 'Si tienes, tráelo: se trabaja más cómodo. Con el celular también puedes seguir todo el taller. Antes del taller te escribimos para que llegues con tu cuenta creada.',
  },
  {
    p: '¿Todo es en español?',
    r: 'Sí, todo: la explicación, los ejercicios y la clínica.',
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
    r: 'Café y algo de picar en la pausa.',
  },
  {
    p: '¿Puedo ir con mi socio o con alguien de mi equipo?',
    r: 'Sí. Cada persona hace su propia reserva, porque cada una ocupa su puesto y trabaja con su propio negocio.',
  },
  {
    p: `¿Qué pasa si no llegan a ${TALLER.minimoPersonas} personas?`,
    r: `El ${DECISION} decidimos. Si no llegamos a ${TALLER.minimoPersonas}, el taller no se hace y te devolvemos el 100 % de tu dinero sin que tengas que pedirlo.`,
  },
  {
    p: '¿Cómo pago?',
    r: 'Con tarjeta de crédito o débito en la página de pago segura de Stripe. Si tu celular tiene Apple Pay o Google Pay, también puedes usarlos. El precio que ves es el total: no hay cargos extra.',
  },
  {
    p: '¿Y después del taller?',
    r: 'Si quieres seguir, puedes continuar con mentoría en español para tu negocio. Después del taller te escribimos con las opciones; no es obligatorio y no tienes que decidir nada ese día.',
  },
  {
    p: '¿Qué recibo cuando pago?',
    r: 'Ves tu confirmación en pantalla, con botones para guardar el taller en tu calendario, y te llega el recibo al correo.',
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

export default function TallerPage() {
  const venta = estadoVenta()
  const franja = venta.abierta ? venta.franja : null
  const siguiente = venta.abierta ? venta.siguiente : null
  const indiceVigente = venta.abierta ? venta.indice : TALLER.franjas.length
  const modoPrueba = (process.env.TALLER_STRIPE_SECRET_KEY ?? '').includes('_test_')

  // Línea bajo el precio: qué pasa después y cuándo.
  const proximoPaso =
    franja && siguiente
      ? `Sube a $${siguiente.precio} el ${fechaCorta(franja.corte)}.`
      : franja
        ? 'Es el último precio: la venta cierra cuando empieza el taller.'
        : null

  const eventoJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: TALLER.nombreLargo,
    startDate: TALLER.inicio,
    endDate: TALLER.fin,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    inLanguage: 'es',
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
    image: 'https://goimpulsalab.com/images/taller/orlando-taller.png',
    description: 'Taller presencial y en español: 3 horas de mentoría con ejercicios en vivo y 1 hora de clínica con tu negocio real.',
    ...(franja
      ? {
          offers: {
            '@type': 'Offer',
            price: franja.precio,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            validThrough: franja.corte,
            url: 'https://goimpulsalab.com/taller',
          },
        }
      : {}),
  }

  let reloj = new Date(TALLER.inicio).getTime()
  const agenda = BLOQUES.map((b) => {
    const desde = new Date(reloj)
    reloj += b.min * 60_000
    return { ...b, desde: hora(desde).replace(' p. m.', '').replace(' a. m.', ''), hasta: hora(new Date(reloj)) }
  })

  return (
    <div className="bg-white font-sans text-[#002D62] antialiased">
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
        {/* Luz cian detrás del retrato: el único gesto decorativo de la página. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-10 hidden h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(0,188,212,0.35)_0%,rgba(0,188,212,0)_65%)] md:block"
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-4 sm:px-6 sm:pt-6 md:pb-20 md:pt-8">
          <div className="flex items-center gap-3">
            <Image src="/images/taller/isotipo-negativo.png" alt="" width={191} height={345} className="h-9 w-auto" priority />
            <span className="text-[15px] font-extrabold tracking-[0.02em] text-white">Impulsa Lab</span>
          </div>

          <div className="mt-5 grid items-end gap-10 sm:mt-8 md:mt-12 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-12">
            <div>
              <p className="text-[15px] font-bold text-[#00BCD4] sm:text-base">Taller + mentoría de IA para dueños de negocio</p>
              <h1 className="mt-2 text-[30px] font-extrabold sm:mt-3 leading-[1.05] tracking-[-0.025em] sm:text-5xl lg:text-[60px]">
                Pon la inteligencia artificial a trabajar en tu negocio.
              </h1>

              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[16px] font-bold sm:mt-6 sm:text-[17px]">
                {['Presencial', 'En español', 'Con tu negocio real', 'Con mentoría'].map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00BCD4] text-[#002D62]">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>

              <p className="mt-5 hidden max-w-[46ch] text-lg leading-relaxed text-white/80 sm:block">
                {LEDE}
              </p>

              {/* La entrada: fecha, lugar, precio y botón en un solo objeto. */}
              <div className="relative mt-5 grid overflow-hidden rounded-2xl bg-white text-[#002D62] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
                <div className="px-5 py-3.5 sm:px-6 sm:py-6">
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
                </div>

                {/* Perforación: línea punteada + dos muescas del color del fondo. */}
                <div aria-hidden className="relative h-0 border-t-2 border-dashed border-[#C9D6E5] sm:absolute sm:inset-y-0 sm:left-[46.5%] sm:h-auto sm:w-0 sm:border-l-2 sm:border-t-0">
                  <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-[#002D62] sm:-left-3 sm:-top-3" />
                  <span className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-[#002D62] sm:-bottom-3 sm:-left-3 sm:right-auto sm:top-auto" />
                </div>

                <div className="px-5 py-3.5 sm:py-6 sm:pl-7 sm:pr-6">
                  {franja ? (
                    <>
                      <p className="text-[14px] font-bold text-[#3A4A5E]">{franja.nombre}: precio de hoy</p>
                      <p className="mt-0.5 flex items-baseline gap-3">
                        <span className="text-[40px] font-extrabold leading-none sm:text-[44px] tracking-[-0.03em] [font-variant-numeric:tabular-nums]">
                          ${franja.precio}
                        </span>
                        {franja.precio < PRECIO_COMPLETO && (
                          <span className="text-[17px] font-bold text-[#55657A]">
                            <span className="sr-only">Precio completo: </span>
                            <s>${PRECIO_COMPLETO}</s>
                          </span>
                        )}
                      </p>
                      <p className="mt-2 text-[14px] leading-snug text-[#3A4A5E]">
                        {proximoPaso}{' '}
                        <CuentaRegresiva hasta={franja.corte} className="font-bold text-[#002D62]" />
                      </p>
                      <BotonReservar id="reservar-heroe" precio={franja.precio} tono="oscuro" lugar="heroe" className="mt-3 sm:mt-4" />
                    </>
                  ) : (
                    <p className="text-lg font-bold">Las inscripciones para este taller ya cerraron.</p>
                  )}
                </div>
              </div>

              <NotaReferido className="mt-4 text-[15px] text-[#B2EBF2]" />
              <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-white/80 sm:hidden">{LEDE}</p>
              <p className="mt-3 max-w-[52ch] text-[14px] leading-relaxed text-white/75">
                Si no llegamos a {TALLER.minimoPersonas} personas, te devolvemos el 100 %. Pagas en la página segura de Stripe, con
                tarjeta, Apple Pay o Google Pay.
              </p>
            </div>

            <figure className="relative mx-auto w-full max-w-[420px] md:mx-0 md:ml-auto">
              <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#0A3F7E_0%,#002D62_55%,#001B3D_100%)] pt-8 ring-1 ring-white/15">
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-2/3 bg-[radial-gradient(ellipse_at_50%_20%,rgba(0,188,212,0.45),rgba(0,188,212,0)_70%)]"
                />
                <Image
                  src="/images/taller/orlando-taller.webp"
                  alt="Orlando Matamoros, fundador de Impulsa Lab, con blazer azul y camisa celeste"
                  width={696}
                  height={950}
                  sizes="(min-width: 768px) 420px, 92vw"
                  className="relative mx-auto h-auto w-full"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgba(0,27,61,0.95)_0%,rgba(0,27,61,0.7)_60%,rgba(0,27,61,0)_100%)] px-6 pb-5 pt-14">
                  <span className="block text-lg font-extrabold">Orlando Matamoros</span>
                  <span className="block text-[14px] text-white/80">Fundador de Impulsa Lab. Dicta las 4 horas en persona.</span>
                </figcaption>
              </div>
            </figure>
          </div>
        </div>
      </header>

      {/* ───────────────── ¿Te suena? ───────────────── */}
      <section className="bg-[#F4F7FB]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:py-24">
          <div>
            <h2 className="text-[30px] font-extrabold leading-[1.1] tracking-[-0.02em] md:text-[40px]">¿Te suena conocido?</h2>
            <blockquote className="mt-6 border-l-4 border-[#00BCD4] pl-5">
              <p className="text-[19px] font-bold leading-snug">
                «Todos saben que tienen que meter la inteligencia artificial en su negocio. El problema es que nadie les dice cómo.»
              </p>
              <footer className="mt-3 text-[14px] text-[#3A4A5E]">Dueña de un minimarket en Brooklyn</footer>
            </blockquote>
          </div>
          <ul className="divide-y divide-[#D6E0EC] border-y border-[#D6E0EC]">
            {[
              'Contestas los mismos mensajes de WhatsApp todo el día.',
              'Sabes que la IA existe, pero no sabes por dónde empezar.',
              'Tus ventas están en la caja o en un Excel y nadie tiene tiempo de mirarlas.',
              'Viste un curso de seis semanas, en inglés y en línea, y lo cerraste.',
            ].map((t) => (
              <li key={t} className="py-5 text-[19px] font-medium leading-snug md:text-[21px]">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────────── Contra el «hágalo usted mismo» ─────────────────
          Mensaje pedido por Orlando (informe de competidores, 2-oct): sin nombrar a nadie y sin
          «somos los únicos», que el informe no lo prueba. */}
      <section className="bg-[#002D62] text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-20">
          <p className="text-[26px] font-extrabold leading-[1.2] tracking-[-0.02em] md:text-[36px]">
            No te vendemos una aplicación para que la configures solo. La configuras en el salón, con los datos de tu negocio y con
            mentoría a tu lado, en español y en persona.
          </p>
          <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-white/80">
            Por eso el taller es presencial, en español, con tu negocio real y con mentoría. Y si al terminar quieres seguir, puedes
            continuar con mentoría en español para tu negocio.
          </p>
        </div>
      </section>

      {/* ───────────────── Lo que te llevas ───────────────── */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <h2 className="max-w-[20ch] text-[30px] font-extrabold leading-[1.1] tracking-[-0.02em] md:text-[40px]">
            Sales con cosas hechas, no con apuntes
          </h2>
          <p className="mt-4 max-w-[60ch] text-[17px] leading-relaxed text-[#3A4A5E]">
            Cada ejercicio se hace en el salón, con tu cuenta y con los datos de tu negocio. Esto es lo que te llevas puesto:
          </p>
          <ul className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {LLEVAS.map((l) => (
              <li key={l.t} className="flex gap-4">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#002D62] text-[#00BCD4]">
                  <Check className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="text-[18px] font-extrabold leading-snug">{l.t}</h3>
                  <p className="mt-1 text-[16px] leading-relaxed text-[#3A4A5E]">{l.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────────── Para quién ───────────────── */}
      <section className="bg-[#F4F7FB]">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20">
          <div className="rounded-2xl bg-white p-7 ring-1 ring-[#D6E0EC]">
            <h2 className="text-[24px] font-extrabold tracking-[-0.01em]">Es para ti si…</h2>
            <ul className="mt-5 space-y-3.5 text-[17px] leading-snug">
              {[
                'Tienes un negocio funcionando en Nueva York, o estás por abrirlo.',
                'Usas el celular para todo, pero la IA todavía no.',
                'Quieres ganar horas a la semana sin volverte técnico.',
                'Prefieres aprender en persona y en español.',
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#00A5BB]" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl p-7 ring-1 ring-[#D6E0EC]">
            <h2 className="text-[24px] font-extrabold tracking-[-0.01em]">No es para ti si…</h2>
            <ul className="mt-5 space-y-3.5 text-[17px] leading-snug text-[#3A4A5E]">
              {[
                'Buscas un curso de programación.',
                'Ya usas IA todos los días en tu negocio.',
                'Quieres una charla de motivación sin práctica.',
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <Equis className="mt-0.5 h-5 w-5 shrink-0 text-[#8A99AB]" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────────────── Agenda ───────────────── */}
      <section id="agenda">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24">
          <h2 className="text-[30px] font-extrabold leading-[1.1] tracking-[-0.02em] md:text-[40px]">Las 4 horas, una por una</h2>
          <p className="mt-4 max-w-[60ch] text-[17px] leading-relaxed text-[#3A4A5E]">
            Tres horas de mentoría con ejercicios en vivo y una de clínica, el {FECHA} de {HORARIO}
          </p>
          <ol className="mt-10">
            {agenda.map((b) => (
              <li
                key={b.titulo}
                className={`grid grid-cols-[88px_minmax(0,1fr)] gap-4 border-t py-6 sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-8 ${
                  b.tipo === 'clinica'
                    ? 'mt-2 rounded-2xl border-t-0 bg-[#002D62] px-5 text-white sm:px-6'
                    : 'border-[#D6E0EC]'
                }`}
              >
                <p className={`pt-1 text-[15px] font-bold [font-variant-numeric:tabular-nums] ${b.tipo === 'clinica' ? 'text-[#00BCD4]' : 'text-[#3A4A5E]'}`}>
                  {b.desde}–{b.hasta}
                </p>
                <div>
                  <h3 className={`text-[20px] font-extrabold leading-snug ${b.tipo === 'pausa' ? 'text-[#3A4A5E]' : ''}`}>{b.titulo}</h3>
                  <p className={`mt-1.5 text-[16px] leading-relaxed ${b.tipo === 'clinica' ? 'text-white/85' : 'text-[#3A4A5E]'}`}>{b.texto}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 rounded-xl bg-[#F4F7FB] px-5 py-4 text-[16px] leading-relaxed">
            <strong className="font-extrabold">Qué traer:</strong> el celular cargado, tu computador si tienes (no es obligatorio) y un problema real de tu negocio para la clínica.
          </p>
        </div>
      </section>

      {/* ───────────────── Quién te enseña ───────────────── */}
      <section className="bg-[#F4F7FB]">
        <div className="mx-auto grid max-w-4xl items-center gap-8 px-4 py-16 sm:px-6 md:grid-cols-[180px_minmax(0,1fr)] md:py-20">
          <div className="mx-auto h-40 w-40 overflow-hidden rounded-full bg-[#002D62] ring-4 ring-white md:h-44 md:w-44">
            <Image
              src="/images/taller/orlando-taller.webp"
              alt="Orlando Matamoros"
              width={696}
              height={950}
              sizes="176px"
              className="h-auto w-full origin-[50%_12%] scale-[1.55]"
            />
          </div>
          <div>
            <h2 className="text-[28px] font-extrabold leading-tight tracking-[-0.02em] md:text-[34px]">Quién te enseña</h2>
            <p className="mt-1 text-[17px] font-bold text-[#3A4A5E]">Orlando Matamoros, fundador de Impulsa Lab</p>
            <ul className="mt-5 space-y-2.5 text-[17px] leading-relaxed">
              <li>Colombiano. Vive en Nueva York y trabaja con dueños de negocios latinos que quieren usar la IA sin volverse técnicos.</li>
              <li>Más de 20 años en planificación estratégica, finanzas y operaciones.</li>
              <li>En 2026 dictó un curso de IA para dueños de pequeños negocios en Brooklyn.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ───────────────── Precios: la escalera ───────────────── */}
      <section id="precios">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 md:py-24">
          <h2 className="text-[30px] font-extrabold leading-[1.1] tracking-[-0.02em] md:text-[40px]">El precio sube dos veces</h2>
          <p className="mt-4 max-w-[60ch] text-[17px] leading-relaxed text-[#3A4A5E]">
            Quien reserva primero paga menos, y quien ya pagó conserva su precio. El precio es el total: sin cargos extra al pagar.
          </p>
          <ol className="mt-10 grid gap-4 md:grid-cols-3 md:items-end">
            {TALLER.franjas.map((f, i) => {
              const estado = i < indiceVigente ? 'pasada' : i === indiceVigente ? 'vigente' : 'proxima'
              const desde = i === 0 ? null : fechaLarga(TALLER.franjas[i - 1].corte)
              const hasta = i === TALLER.franjas.length - 1 ? 'hasta el día del taller' : `hasta el ${fechaLarga(ultimoMinuto(f.corte))}`
              const alturas = ['md:min-h-[210px]', 'md:min-h-[250px]', 'md:min-h-[290px]']
              return (
                <li
                  key={f.id}
                  aria-current={estado === 'vigente' ? 'true' : undefined}
                  className={`flex flex-col justify-end rounded-2xl p-6 ${alturas[i] ?? ''} ${
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
                    {i === 0 ? `Hasta el ${fechaLarga(ultimoMinuto(f.corte))} a las ${hora(ultimoMinuto(f.corte))}` : cap(hasta)}
                  </p>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* ───────────────── Garantías ───────────────── */}
      <section className="bg-[#001B3D] text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 md:py-24">
          <h2 className="text-[30px] font-extrabold leading-[1.1] tracking-[-0.02em] md:text-[40px]">Dos promesas</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div className="border-t-2 border-[#00BCD4] pt-6">
              <h3 className="text-[22px] font-extrabold">Si no llegamos a {TALLER.minimoPersonas} personas, te devolvemos todo</h3>
              <p className="mt-3 text-[17px] leading-relaxed text-white/80">
                El {DECISION} decidimos. Si para ese día no somos {TALLER.minimoPersonas}, el taller no se hace y te devolvemos el 100 % de tu dinero,
                sin que tengas que pedirlo.
              </p>
            </div>
            <div className="border-t-2 border-[#00BCD4] pt-6">
              <h3 className="text-[22px] font-extrabold">Si en la primera hora sientes que no es para ti, también</h3>
              <p className="mt-3 text-[17px] leading-relaxed text-white/80">
                Al terminar la primera hora, si sientes que el taller no es lo que buscabas, nos lo dices ahí mismo y te devolvemos tu
                dinero completo. Sin discusiones.
              </p>
            </div>
          </div>
          <div id="devoluciones" className="mt-12 scroll-mt-6 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <h3 className="text-[18px] font-extrabold">Si pagas y luego no puedes ir</h3>
            <p className="mt-2 text-[16px] leading-relaxed text-white/80">
              Avísanos hasta el {DECISION} y te devolvemos el 100 %. Después de esa fecha puedes pasarle tu cupo a otra persona: solo
              dinos su nombre. Las devoluciones llegan a tu tarjeta en 5 a 10 días hábiles.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────── Preguntas ───────────────── */}
      <section>
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
          <h2 className="text-[30px] font-extrabold leading-[1.1] tracking-[-0.02em] md:text-[40px]">Preguntas frecuentes</h2>
          <div className="mt-8 border-t border-[#D6E0EC]">
            {PREGUNTAS.map((q) => (
              <details key={q.p} className="group border-b border-[#D6E0EC]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[18px] font-extrabold leading-snug [&::-webkit-details-marker]:hidden">
                  {q.p}
                  <span
                    aria-hidden
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F4F7FB] text-xl font-bold text-[#002D62] transition-transform duration-150 group-open:rotate-45 motion-reduce:transition-none"
                  >
                    +
                  </span>
                </summary>
                <div className="pb-6 pr-10 text-[17px] leading-relaxed text-[#3A4A5E]">{q.r}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── Cierre ───────────────── */}
      <section className="bg-[#002D62] text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 md:py-24">
          <Image src="/images/taller/logo-impulsa-negativo.png" alt="Impulsa Lab" width={613} height={480} className="mx-auto h-20 w-auto" />
          <h2 className="mt-8 text-[30px] font-extrabold leading-[1.1] tracking-[-0.02em] md:text-[42px]">
            Te esperamos el {FECHA} a las {hora(TALLER.inicio)}
          </h2>
          <p className="mt-3 text-[17px] text-white/80">
            {TALLER.lugar.direccion}, {TALLER.lugar.ciudad}
          </p>
          {franja ? (
            <div className="mx-auto mt-8 max-w-sm">
              <p className="text-[15px] text-white/80">
                {proximoPaso} <CuentaRegresiva hasta={franja.corte} className="font-bold text-white" />
              </p>
              <BotonReservar id="reservar-cierre" precio={franja.precio} lugar="cierre" className="mt-4" />
            </div>
          ) : (
            <p className="mt-8 text-lg font-bold">Las inscripciones para este taller ya cerraron.</p>
          )}
          <p className="mt-8 text-[16px] text-white/80">
            ¿Tienes dudas?{' '}
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="font-bold text-white underline decoration-[#00BCD4] decoration-2 underline-offset-4">
              Escríbenos por WhatsApp
            </a>
          </p>
        </div>
      </section>

      </main>

      <footer className="bg-[#001B3D] pb-28 text-white/70 md:pb-0">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-[14px] sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date(TALLER.inicio).getFullYear()} Impulsa Lab LLC, Nueva York</p>
          <nav aria-label="Enlaces legales" className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="/legal/privacidad" className="hover:text-white">Privacidad</a>
            <a href="/legal/terminos" className="hover:text-white">Términos</a>
            <a href="/" className="hover:text-white">goimpulsalab.com</a>
          </nav>
        </div>
      </footer>

      {franja && <BarraMovil precio={franja.precio} detalle={`${cap(FECHA)}, ${hora(TALLER.inicio)}, en Brooklyn`} />}
    </div>
  )
}
