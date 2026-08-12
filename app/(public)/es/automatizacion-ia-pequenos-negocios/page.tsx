import Link from 'next/link'
import { LINKS } from '@/lib/constants'

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

function AlertIcon() {
  return (
    <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const FAQS = [
  {
    q: '¿Qué es exactamente la automatización con IA para un pequeño negocio?',
    a: 'Es software que hace tus tareas repetitivas por ti: responder los mensajes de tus clientes, capturar y dar seguimiento a prospectos, registrar facturas, enviar recordatorios y mover datos entre las herramientas que ya usas. Lo construimos con n8n y Claude AI para que funcione 24/7 sin que tengas que estar pendiente. No necesitas saber nada técnico; si sabes usar WhatsApp y Google Sheets, sabes usar lo que construimos.',
  },
  {
    q: '¿Cuánto cuesta y hay costos ocultos?',
    a: 'Los planes arrancan desde $97/mes para automatización de procesos y consultoría IA, y desde $297/mes para un bot de WhatsApp con IA completo. El Diagnóstico 3D gratis cuesta $0. Los únicos costos extra posibles son las plataformas de terceros que pagarías de todos modos (por ejemplo, el uso de la API de WhatsApp Business). Te lo explicamos todo en el Diagnóstico antes de que te comprometas — sin sorpresas.',
  },
  {
    q: '¿Qué tan rápido queda funcionando?',
    a: 'La mayoría de las automatizaciones para pequeños negocios quedan listas en días, no meses. El bot de WhatsApp con IA puede empezar a responder a tus clientes desde el primer día. Construimos y probamos con tus datos reales primero, luego lanzamos, capacitamos a tu equipo y te damos soporte durante el primer mes.',
  },
  {
    q: '¿Trabajan con mi industria — como un restaurante o una bodega?',
    a: 'Sí. Construimos automatización con IA para restaurantes y comida, bodegas y minimarkets, clínicas dentales y médicas, salones y spas, contadores y tiendas, además de otros negocios de servicios. Cada configuración se adapta a cómo funciona tu negocio de verdad — vemos los casos de uso de tu industria en el Diagnóstico gratis.',
  },
  {
    q: '¿Necesito saber de tecnología o contratar un experto interno?',
    a: 'No. Nosotros somos tu equipo de automatización con IA y tu consultor de n8n — de eso se trata trabajar con nosotros. Tú nos cuentas cómo funciona tu negocio; nosotros diseñamos, construimos, conectamos y mantenemos el sistema. Te lo entregamos con capacitación en lenguaje simple para que tú y tu equipo lo manejen sin depender de nosotros para cada cambio.',
  },
  {
    q: '¿Atienden negocios cerca de mí en NYC?',
    a: 'Sí. Somos un negocio con área de servicio en Queens, NYC, que atiende a pequeños negocios en los cinco condados y toda el área de Nueva York — y de forma remota en EE.UU. y LATAM. Somos bilingües en español e inglés, así que trabajamos contigo en el idioma que prefieras.',
  },
]

export default function AutomatizacionIAPequenosNegociosPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gray-700 transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Automatización con IA para pequeños negocios</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-[#002D62] text-white pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden>
          <div className="absolute top-0 -left-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Automatiza WhatsApp, facturas y prospectos con IA — sin saber de tecnología
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Construimos la inteligencia artificial que atiende a tus clientes por WhatsApp, controla tus facturas y captura tus prospectos — funcionando 24/7 para que tú no tengas que hacerlo. Equipo bilingüe en Queens, NYC. Implementación real con resultados medibles, desde $97/mes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/diagnostico"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#002D62] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                Agenda tu Diagnóstico 3D gratis (30 min)
              </Link>
              <a
                href={LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <WhatsAppIcon />
                Escríbenos por WhatsApp
              </a>
            </div>
            <p className="text-blue-200 text-sm mt-6">
              5.0 en Google · Atención en español e inglés · En Queens, NYC, para todo EE.UU. y LATAM · Sin conocimientos técnicos
            </p>
          </div>
        </div>
      </section>

      <article className="container mx-auto px-4 py-12 max-w-4xl">

        {/* Problem */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Eres el dueño, el operador y la máquina contestadora
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Si tienes un pequeño negocio, tu día ya tiene demasiados trabajos encima. Los repetitivos te están costando dinero en silencio:
          </p>
          <ul className="space-y-3 mb-6">
            {[
              'Tus clientes te escriben a las 11pm por WhatsApp preguntando por horarios, precios y citas — y los pierdes cuando nadie responde a tiempo.',
              'Las facturas, recibos y pagos viven en tu correo y en tu cabeza. Los cuadras los domingos, a mano.',
              'Llegan prospectos de tu sitio web, Instagram y Google — pero el seguimiento es lento, así que se enfrían.',
              'Pagas a personas para copiar datos entre Excel, el correo y tu caja registradora, en vez de hacer crecer el negocio.',
              'Tus competidores más grandes ya tienen IA haciendo esto. Tú todavía no.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700 text-lg">
                <AlertIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-lg text-gray-700 font-medium">
            Cada una de estas es una tarea repetitiva. Y las tareas repetitivas son exactamente lo que la automatización con IA está hecha para quitarte de encima.
          </p>
        </section>

        {/* Solution */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Configuramos la IA que se encarga del trabajo pesado por ti
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Impulsa Lab es una agencia bilingüe de automatización con IA en Queens, NYC. No te vendemos una presentación de 80 páginas — construimos los sistemas reales y te los entregamos funcionando. Usamos n8n (el motor de automatización), Claude AI (el cerebro que entiende a tus clientes) y las herramientas que ya usas, como WhatsApp, Gmail, Google Sheets, Square y QuickBooks.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {[
              { t: 'Atención al cliente 24/7 por WhatsApp', d: 'Un bot de WhatsApp con IA que responde preguntas, comparte precios, agenda citas y solo te pasa el caso cuando de verdad necesita un humano. El canal favorito de tus clientes.' },
              { t: 'Captura de prospectos y seguimiento al instante', d: 'Atrapa cada prospecto de tu web y tus canales, califícalo y respóndele automáticamente en segundos.' },
              { t: 'Control de facturas y pagos', d: 'Extrae los datos de las facturas que llegan, regístralos automáticamente y recibe un resumen diario limpio en vez del maratón de hoja de cálculo del domingo.' },
              { t: 'Automatización de cualquier tarea repetitiva', d: 'Si es un proceso paso a paso, un consultor de n8n de nuestro equipo lo deja funcionando solo.' },
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-5 border border-gray-200">
                <div className="flex items-start gap-2">
                  <CheckIcon />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.t}</h3>
                    <p className="text-gray-700 text-sm">{item.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-lg text-gray-700">
            Hecho para tu industria — restaurante, bodega, salón, clínica dental o tienda. No necesitas saber de tecnología. Tú nos cuentas cómo funciona tu negocio; nosotros lo automatizamos.
          </p>
        </section>

        {/* How it works */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Cómo funciona — 3 pasos simples</h2>
          <div className="space-y-6">
            {[
              { label: 'Diagnóstico 3D gratis (30 min)', desc: 'Nos reunimos por videollamada y revisamos tu negocio en tres ejes: Finanzas, Operaciones y Marketing. Identificamos las 1–3 automatizaciones con mayor retorno para tu negocio específico. Sales con un plan de acción claro — nos contrates o no.' },
              { label: 'Lo construimos', desc: 'Configuramos y conectamos todo a las herramientas que ya usas, y lo probamos con tus datos reales. La mayoría de los proyectos quedan listos en días, no meses. Tú sigues en tu negocio; nosotros hacemos el trabajo técnico.' },
              { label: 'Lanzamiento, capacitación y soporte', desc: 'Tu sistema entra en operación. Te capacitamos a ti y a tu equipo en lenguaje simple, te entregamos acceso completo y nos quedamos el primer mes para afinarlo con los casos reales. Planes mensuales desde $97/mes — sin amarres de largo plazo para empezar.' },
            ].map((step, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-xl border-2 bg-blue-50 border-blue-200">
                <div className="flex-shrink-0 w-12 h-12 bg-[#002D62] text-white rounded-full flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{step.label}</h3>
                  <p className="text-gray-700">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Proof */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">La confianza de dueños de pequeños negocios en NYC</h2>
          <div className="bg-blue-50 border-l-4 border-[#002D62] rounded-r-xl p-6">
            <p className="text-lg text-[#002D62] font-semibold mb-2">
              5.0 en Google · Negocio con área de servicio en Queens, NYC
            </p>
            <p className="text-gray-700">
              Trabajamos con restaurantes, bodegas, clínicas dentales y médicas, salones, contadores y tiendas en NYC y LATAM — en español e inglés.
            </p>
          </div>
        </section>

        {/* Offer */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Empieza con un Diagnóstico 3D gratis — y automatiza desde $97/mes
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            No tiene costo ni compromiso. En 30 minutos mapeamos tu automatización de mayor retorno y te damos un plan y un precio claros. Si encaja, empiezas en pequeño y escalas cuando veas el valor.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-800 mb-4">Qué obtienes en el Diagnóstico gratis</h3>
              <ul className="space-y-3">
                {[
                  'Una revisión de tus procesos de Finanzas, Operaciones y Marketing',
                  'Las 1–3 automatizaciones que debes hacer primero, ordenadas por retorno',
                  'Un precio y un tiempo claros — sin costos ocultos',
                  'Una respuesta honesta sobre si la IA te conviene ahora mismo',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-50 border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Precios transparentes</h3>
              <ul className="space-y-3 text-gray-800">
                <li className="flex justify-between border-b border-gray-200 pb-2"><span>Automatización de procesos</span><span className="font-bold text-[#002D62]">desde $97/mes</span></li>
                <li className="flex justify-between border-b border-gray-200 pb-2"><span>Consultoría IA para pequeños negocios</span><span className="font-bold text-[#002D62]">desde $97/mes</span></li>
                <li className="flex justify-between border-b border-gray-200 pb-2"><span>Bot de WhatsApp con IA</span><span className="font-bold text-[#002D62]">desde $297/mes</span></li>
                <li className="flex justify-between"><span>Diagnóstico 3D</span><span className="font-bold text-green-600">$0</span></li>
              </ul>
            </div>
          </div>
          <div className="text-center">
            <Link
              href="/diagnostico"
              className="inline-flex items-center justify-center gap-2 bg-[#002D62] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#003d82] transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Agenda tu Diagnóstico 3D gratis (30 min)
            </Link>
            <p className="text-gray-600 mt-3 text-sm">
              ¿Prefieres hablar primero? <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="text-[#002D62] font-semibold hover:underline">Escríbenos por WhatsApp</a> o llama al <a href="tel:+13474509281" className="text-[#002D62] font-semibold hover:underline">(347) 450-9281</a>.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Preguntas frecuentes</h2>
          <div className="space-y-6">
            {FAQS.map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-6 py-4">
                  <h3 className="text-lg font-bold text-gray-900">{item.q}</h3>
                </div>
                <div className="px-6 py-5 bg-white">
                  <p className="text-gray-700">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="rounded-2xl overflow-hidden mb-8">
          <div className="bg-gradient-to-br from-[#002D62] to-[#0057b8] px-8 py-14 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para poner la IA a trabajar en tu negocio?</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              30 minutos. Sin costo. Sin compromiso. Solo una respuesta clara sobre qué automatizar primero para el mayor retorno — construido y con soporte de un equipo bilingüe aquí en NYC.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/diagnostico"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#002D62] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                Agenda tu Diagnóstico 3D gratis (30 min)
              </Link>
              <a
                href={LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 transition-all duration-300"
              >
                <WhatsAppIcon />
                Escríbenos por WhatsApp
              </a>
            </div>
            <p className="text-blue-200 text-sm mt-8">
              Impulsa Lab · Queens, NYC · Atención en EE.UU. y LATAM · Español e inglés · Llama al (347) 450-9281
            </p>
          </div>
        </section>

      </article>
    </div>
  )
}
