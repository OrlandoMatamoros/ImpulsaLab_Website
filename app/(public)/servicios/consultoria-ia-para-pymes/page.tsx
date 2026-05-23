import Link from 'next/link'
import { LINKS } from '@/lib/constants'

const CANONICAL = 'https://www.tuimpulsalab.com/servicios/consultoria-ia-para-pymes'

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Consultoría IA para PYMEs: Implementación Real, No Teoría',
  description:
    'Consultoría de inteligencia artificial para PYMEs latinas en NYC y LATAM. Implementamos agentes IA con n8n + Claude: chatbots, facturación automática, atención al cliente. Diagnóstico gratis en 30 min.',
  url: CANONICAL,
  datePublished: '2026-05-08',
  dateModified: '2026-05-08',
  inLanguage: 'es-ES',
  author: { '@type': 'Person', name: 'Orlando Matamoros' },
  publisher: { '@id': 'https://www.tuimpulsalab.com/#organization' },
  image: {
    '@type': 'ImageObject',
    url: 'https://www.tuimpulsalab.com/images/og-image.jpg',
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
}

// Reusable check icon
function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

// Reusable CTA button (primary)
function PrimaryButton({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 bg-[#002D62] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#003d82] transition-all duration-300 hover:scale-105 shadow-lg"
      >
        {children}
      </a>
    )
  }
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 bg-[#002D62] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#003d82] transition-all duration-300 hover:scale-105 shadow-lg"
    >
      {children}
    </Link>
  )
}

// Reusable CTA button (secondary/outlined)
function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 border-2 border-[#002D62] text-[#002D62] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#002D62] hover:text-white transition-all duration-300"
    >
      {children}
    </Link>
  )
}

export default function ConsultoriaIAPymesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Breadcrumb navigation */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gray-700 transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/servicios" className="hover:text-gray-700 transition-colors">Servicios</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Consultoría IA para PYMEs</span>
          </nav>
        </div>
      </div>

      {/* Hero section */}
      <section className="relative bg-[#002D62] text-white pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden>
          <div className="absolute top-0 -left-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Consultoría IA para PYMEs: Implementación Real, No Teoría
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Automatizamos tu negocio con inteligencia artificial en 4 semanas. Stack real: n8n + Claude. Resultados medibles desde $97/mes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/diagnostico"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#002D62] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                Diagnóstico Gratis — 30 minutos
              </Link>
              <a
                href={LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-300"
              >
                Hablar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main article content */}
      <article className="container mx-auto px-4 py-12 max-w-4xl">

        {/* TL;DR box */}
        <div className="bg-blue-50 border-l-4 border-[#002D62] rounded-r-xl p-6 mb-12">
          <p className="font-bold text-[#002D62] text-lg mb-3">Resumen ejecutivo</p>
          <ul className="space-y-2">
            {[
              'Impulsa Lab implementa IA en PYMEs latinas en NYC y LATAM con resultados medibles en 30 días',
              'Stack real: n8n + Claude AI + Firebase — no PowerPoints, no consultoras Big 4',
              'Precios desde $97/mes — sin costos de setup de $50,000',
              'Empezamos con un Diagnóstico 3D gratuito de 30 minutos',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-800">
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── H2.1 ── Por qué tu PYME necesita IA ahora */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Por qué tu PYME latina necesita IA ahora (y no dentro de 2 años)
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            En 2024, el 67% de las PYMEs en Estados Unidos ya usaban alguna forma de automatización inteligente según datos del U.S. Chamber of Commerce. En 2026, ese número supera el 80%. La pregunta no es si la IA va a cambiar tu industria — ya la cambió. La pregunta es si tu negocio va a liderar ese cambio o va a reaccionar tarde.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Para las PYMEs latinas en NYC y LATAM, la brecha es aún más crítica. Compites contra negocios que ya tienen chatbots atendiendo clientes a las 2am, sistemas que procesan facturas automáticamente y dashboards que muestran en tiempo real si el negocio está ganando o perdiendo. Mientras tanto, muchos dueños de PYMEs siguen copiando datos a mano en Excel los domingos.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">La ventana de oportunidad se está cerrando</h3>
          <p className="text-lg text-gray-700 mb-4">
            Hay un momento en la adopción de cualquier tecnología donde implementarla genera una ventaja competitiva real. Ese momento para la IA en PYMEs es ahora. En 2 años, no automatizar va a ser una desventaja — no una diferenciación.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Los negocios que están implementando IA hoy están:
          </p>
          <ul className="space-y-3 mb-6 ml-4">
            {[
              'Reduciendo costos operativos entre 30% y 60% en tareas repetitivas',
              'Respondiendo a clientes en segundos, no en horas — a cualquier hora del día',
              'Tomando decisiones con datos reales, no con intuición',
              'Escalando sin proporcionalidad directa en contrataciones',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700 text-lg">
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">El mito del costo prohibitivo ya no aplica</h3>
          <p className="text-lg text-gray-700 mb-4">
            La narrativa de que la IA es solo para grandes corporaciones con presupuestos de millones quedó obsoleta. Los modelos de lenguaje como Claude de Anthropic y las plataformas de automatización como n8n democratizaron completamente el acceso. Un sistema que hace 3 años costaba $200,000 implementar en un banco, hoy se puede construir para una PYME desde $747 de setup y $97-$497 al mes.
          </p>
          <p className="text-lg text-gray-700">
            El costo de NO implementar IA ya es mayor que el costo de implementarla.
          </p>
        </section>

        {/* Inline CTA 1 */}
        <div className="bg-gradient-to-r from-[#002D62] to-[#0057b8] rounded-xl p-8 mb-14 text-center text-white">
          <p className="text-xl font-bold mb-2">¿Tu PYME ya debería tener IA funcionando?</p>
          <p className="text-blue-100 mb-6">Diagnóstico 3D gratuito — descubrimos exactamente qué automatizar primero para mayor ROI</p>
          <Link
            href="/diagnostico"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#002D62] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
          >
            Agendar Diagnóstico Gratuito
          </Link>
        </div>

        {/* ── H2.2 ── Qué es la consultoría IA y qué NO es */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Qué es la consultoría IA para PYMEs (y qué NO es)
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Existe mucha confusión sobre qué incluye realmente una consultoría de inteligencia artificial para pequeñas empresas. Parte de esa confusión viene de consultoras grandes que venden "estrategias de transformación digital" por $50,000 y entregan un documento de 80 páginas que nadie implementa.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Lo que SÍ es */}
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-800 mb-4">Lo que SÍ es consultoría IA para PYMEs</h3>
              <ul className="space-y-3">
                {[
                  'Diagnóstico de procesos manuales y repetitivos en tu negocio',
                  'Selección de las automatizaciones con mayor ROI para tu industria',
                  'Implementación técnica completa: workflows, agentes IA, integraciones',
                  'Capacitación para que tu equipo use los sistemas sin depender de nosotros',
                  'Soporte y optimización continua basada en datos reales de uso',
                  'Precios escalables desde $97/mes — sin lock-in de contratos largos',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Lo que NO es */}
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-800 mb-4">Lo que NO es</h3>
              <ul className="space-y-3">
                {[
                  'Un reporte de 80 páginas sin implementación',
                  'Promesas de "transformación digital" sin métricas concretas',
                  'Soluciones genéricas de ChatGPT sin personalización para tu negocio',
                  'Dependencia permanente de un consultor para cada cambio',
                  'Presupuestos de $50,000+ inaccesibles para PYMEs',
                  'Tecnología experimental sin casos de uso comprobados',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Dos niveles de servicio: workflows vs agentes IA</h3>
          <p className="text-lg text-gray-700 mb-4">
            En Impulsa Lab distinguimos claramente dos niveles de automatización con precios y complejidades distintas:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-xl p-6 border border-gray-200">
              <div className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full inline-block mb-3">Nivel 1</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Workflows de Automatización</h4>
              <p className="text-gray-600 mb-1 font-semibold">$97–$197/mes</p>
              <p className="text-gray-700 text-sm">
                Flujos lineales: trigger → acción → resultado. Ideales para tareas predecibles y repetitivas. Ejemplo: cuando llega una factura por email → extrae los datos → los registra en Google Sheets → envía resumen diario.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-300">
              <div className="text-sm font-semibold text-white bg-[#002D62] px-3 py-1 rounded-full inline-block mb-3">Nivel 2</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Agentes IA</h4>
              <p className="text-gray-600 mb-1 font-semibold">$297–$497/mes</p>
              <p className="text-gray-700 text-sm">
                Cerebro IA que entiende contexto, toma decisiones y maneja excepciones. Ejemplo: el agente WhatsApp lee la consulta del cliente, entiende la intención, busca información en tu catálogo, responde con precisión y escala al humano cuando es necesario.
              </p>
            </div>
          </div>
        </section>

        {/* ── H2.3 ── El proceso en 4 semanas */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Cómo trabajamos: el proceso en 4 semanas
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            No tenemos procesos de 6 meses ni fases interminables de discovery. Implementamos en 4 semanas o menos para proyectos estándar. Así funciona:
          </p>

          <div className="space-y-6">
            {[
              {
                week: 'Semana 0',
                label: 'Diagnóstico 3D',
                desc: '30 minutos gratuitos por videoconferencia. Analizamos tus procesos actuales en tres ejes: Finanzas, Operaciones y Marketing. Identificamos los 2-3 puntos donde la IA tiene mayor ROI para tu negocio específico. Sales con un plan de acción claro — independientemente de si contratas o no.',
                color: 'bg-gray-100 border-gray-300',
                numColor: 'bg-gray-600',
              },
              {
                week: 'Semana 1',
                label: 'Kickoff y Configuración Base',
                desc: 'Firma del acuerdo de trabajo, acceso a las plataformas necesarias (WhatsApp Business, Google Workspace, etc.) y configuración del entorno técnico. Construimos el primer flujo o agente en modo sandbox — sin tocar tu sistema productivo.',
                color: 'bg-blue-50 border-blue-200',
                numColor: 'bg-blue-600',
              },
              {
                week: 'Semana 2',
                label: 'Desarrollo e Integración',
                desc: 'Implementación completa del sistema acordado. Configuración de las integraciones con tus herramientas actuales (CRM, email, POS, etc.). Pruebas con datos reales de tu negocio para calibrar respuestas y comportamientos del agente.',
                color: 'bg-blue-50 border-blue-200',
                numColor: 'bg-blue-600',
              },
              {
                week: 'Semana 3',
                label: 'Ajustes y Capacitación',
                desc: 'Revisión con el equipo del cliente, ajuste de flujos según feedback real, documentación de operación y sesión de capacitación para el equipo. El sistema pasa a modo de prueba activa — opera en paralelo al proceso manual para comparar resultados.',
                color: 'bg-green-50 border-green-200',
                numColor: 'bg-green-600',
              },
              {
                week: 'Semana 4',
                label: 'Lanzamiento y Entrega',
                desc: 'El sistema entra en producción. Entregamos documentación completa, acceso a todas las plataformas y primer reporte de métricas. El mes 1 incluye soporte activo por WhatsApp — respondemos en menos de 4 horas en horario laboral.',
                color: 'bg-green-50 border-green-200',
                numColor: 'bg-green-600',
              },
            ].map((step, i) => (
              <div key={i} className={`flex gap-4 p-6 rounded-xl border-2 ${step.color}`}>
                <div className={`flex-shrink-0 w-12 h-12 ${step.numColor} text-white rounded-full flex items-center justify-center font-bold text-sm`}>
                  {i + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-gray-500">{step.week}</span>
                    <span className="text-gray-300">|</span>
                    <h3 className="text-xl font-bold text-gray-900">{step.label}</h3>
                  </div>
                  <p className="text-gray-700">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── H2.4 ── Catálogo de automatizaciones */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Catálogo de automatizaciones listas para activar en tu PYME
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            No construimos desde cero en cada proyecto. Tenemos 13 productos probados en producción que se personalizan y activan en días, no en meses. Esto reduce costos de implementación y elimina riesgos técnicos.
          </p>

          {/* Nivel 1 table */}
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Nivel 1 — Workflows de Automatización ($97–$197/mes)
          </h3>
          <div className="overflow-x-auto mb-10 rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#002D62] text-white">
                  <th className="text-left p-4 font-semibold">Producto</th>
                  <th className="text-left p-4 font-semibold">Qué hace</th>
                  <th className="text-left p-4 font-semibold">Precio/mes</th>
                  <th className="text-left p-4 font-semibold">Ideal para</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    product: 'Smart Invoice Tracker',
                    desc: 'Extrae datos de facturas por email, registra en Google Sheets, envía resumen diario',
                    price: '$97–$197',
                    ideal: 'Restaurantes, clínicas, retail',
                  },
                  {
                    product: 'Lead Capture & Auto-Response',
                    desc: 'Captura leads del sitio web, los clasifica por intención y envía respuesta personalizada automática',
                    price: '$97–$197',
                    ideal: 'Cualquier PYME con formulario web',
                  },
                  {
                    product: 'Review & Reputation Manager',
                    desc: 'Monitorea Google Reviews, Yelp y Facebook, alerta reseñas negativas y sugiere respuestas',
                    price: '$97–$197',
                    ideal: 'Restaurantes, salones, clínicas',
                  },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4 font-semibold text-gray-900">{row.product}</td>
                    <td className="p-4 text-gray-700">{row.desc}</td>
                    <td className="p-4 font-bold text-[#002D62]">{row.price}</td>
                    <td className="p-4 text-gray-600">{row.ideal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Nivel 2 table */}
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Nivel 2 — Agentes IA ($297–$497/mes)
          </h3>
          <div className="overflow-x-auto mb-10 rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#002D62] text-white">
                  <th className="text-left p-4 font-semibold">Producto</th>
                  <th className="text-left p-4 font-semibold">Qué hace</th>
                  <th className="text-left p-4 font-semibold">Precio/mes</th>
                  <th className="text-left p-4 font-semibold">Ideal para</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    product: 'WhatsApp AI Customer Service Bot',
                    desc: 'Agente IA que atiende clientes por WhatsApp 24/7: consultas, precios, reservas, escalación a humano',
                    price: '$297–$497',
                    ideal: 'Cualquier PYME con volumen WhatsApp',
                  },
                  {
                    product: 'Appointment Scheduler Agent',
                    desc: 'Agenda citas por WhatsApp/web, envía recordatorios, maneja cancelaciones y lista de espera',
                    price: '$297–$497',
                    ideal: 'Salones, clínicas, servicios profesionales',
                  },
                  {
                    product: 'Daily Digest Agent',
                    desc: 'Recopila KPIs del día (ventas, leads, reseñas), genera resumen ejecutivo y lo envía por email/WhatsApp',
                    price: '$297–$497',
                    ideal: 'Dueños de PYME que manejan múltiples canales',
                  },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4 font-semibold text-gray-900">{row.product}</td>
                    <td className="p-4 text-gray-700">{row.desc}</td>
                    <td className="p-4 font-bold text-[#002D62]">{row.price}</td>
                    <td className="p-4 text-gray-600">{row.ideal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Nivel Premium table */}
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Nivel Premium — Soluciones Custom ($697–$997/mes)
          </h3>
          <div className="overflow-x-auto mb-8 rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#002D62] text-white">
                  <th className="text-left p-4 font-semibold">Producto</th>
                  <th className="text-left p-4 font-semibold">Qué hace</th>
                  <th className="text-left p-4 font-semibold">Precio/mes</th>
                  <th className="text-left p-4 font-semibold">Ideal para</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    product: 'AI Financial Dashboard Updater',
                    desc: 'Integración completa con POS/QuickBooks, dashboard de KPIs en tiempo real, alertas de anomalías',
                    price: '$697–$997',
                    ideal: 'PYMEs con $500K+ ingresos anuales',
                  },
                  {
                    product: 'Cold Outreach Engine',
                    desc: 'Prospección automatizada: identifica prospectos calificados, personaliza mensajes con IA, secuencia de follow-ups',
                    price: '$197–$797',
                    ideal: 'PYMEs con ciclo de venta B2B',
                  },
                  {
                    product: 'SEO & Brand Monitor',
                    desc: 'Monitoreo continuo de posición en Google, alerta de menciones de marca, reportes automáticos semanales',
                    price: '$127–$597',
                    ideal: 'PYMEs con presencia digital activa',
                  },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4 font-semibold text-gray-900">{row.product}</td>
                    <td className="p-4 text-gray-700">{row.desc}</td>
                    <td className="p-4 font-bold text-[#002D62]">{row.price}</td>
                    <td className="p-4 text-gray-600">{row.ideal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-gray-600 text-sm">
            Ver el catálogo completo de herramientas y plataformas en{' '}
            <Link href="/herramientas/arsenal" className="text-[#002D62] font-semibold hover:underline">
              el Arsenal Tecnológico de Impulsa Lab
            </Link>
            .
          </p>
        </section>

        {/* ── H2.5 ── IA por industria */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            IA para tu industria: casos de uso por sector
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            La IA no es igual para todos los negocios. Un restaurante tiene dolores completamente distintos a una clínica dental o un estudio contable. Aquí los casos de uso más comunes por sector — con resultados reales de clientes Impulsa Lab:
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                sector: 'Restaurantes y Food Service',
                icon: '🍽️',
                pains: [
                  'Consultas repetitivas por WhatsApp: horario, menú, reservas',
                  'Reseñas negativas sin respuesta rápida',
                  'Sin control de costos por plato en tiempo real',
                ],
                solutions: [
                  'Agente WhatsApp que responde menú, toma reservas y confirma pedidos',
                  'Sistema de monitoreo y respuesta automática de reseñas Google',
                  'Dashboard de costos + ventas por plato integrado con POS',
                ],
                result: 'Caso real: reducción del 40% en consultas manuales de WhatsApp en semana 1',
                ctaHref: '/contacto',
              },
              {
                sector: 'Salones de Belleza y Spas',
                icon: '✂️',
                pains: [
                  'Agenda manual con doble-booking y cancelaciones sin aviso',
                  'Clientes que no aparecen (no-shows) sin recordatorios',
                  'Cero visibilidad de qué servicios son más rentables',
                ],
                solutions: [
                  'Agente de agendamiento por WhatsApp con confirmación automática',
                  'Recordatorios automáticos 24h y 2h antes del servicio',
                  'Reporte semanal de servicios más rentables y horas pico',
                ],
                result: 'Caso real: reducción de no-shows del 35% con recordatorios automáticos',
                ctaHref: '/contacto',
              },
              {
                sector: 'Contadores y Estudios Profesionales',
                icon: '📊',
                pains: [
                  'Procesamiento manual de facturas y recibos de clientes',
                  'Seguimiento de pagos pendientes sin sistema automatizado',
                  'Documentos dispersos sin organización inteligente',
                ],
                solutions: [
                  'Smart Invoice Tracker: extracción automática de datos de facturas',
                  'Sistema de recordatorios de cobros vencidos por email/WhatsApp',
                  'Organización automática de documentos por cliente y fecha',
                ],
                result: 'Caso real: 60% de reducción en tiempo de procesamiento de facturas',
                ctaHref: '/servicios/finanzas',
              },
              {
                sector: 'Retail y Tiendas',
                icon: '🛍️',
                pains: [
                  'Inventario sin visibilidad en tiempo real',
                  'Clientes que preguntan disponibilidad de productos por WhatsApp',
                  'Sin sistema de seguimiento a clientes que no regresan',
                ],
                solutions: [
                  'Agente WhatsApp con consulta de inventario en tiempo real',
                  'Dashboard de inventario integrado con POS (Square, Shopify)',
                  'Campaña de reactivación automática para clientes inactivos',
                ],
                result: 'Caso real: 25% de incremento en clientes recurrentes con campaña de reactivación',
                ctaHref: '/servicios/marketing',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.sector}</h3>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-red-700 mb-2">Dolores comunes:</p>
                  <ul className="space-y-1">
                    {item.pains.map((pain, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                        <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        {pain}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-green-700 mb-2">Soluciones Impulsa Lab:</p>
                  <ul className="space-y-1">
                    {item.solutions.map((sol, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckIcon />
                        {sol}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-blue-800 font-medium">{item.result}</p>
                </div>
                <Link
                  href={item.ctaHref}
                  className="text-sm text-[#002D62] font-semibold hover:underline inline-flex items-center gap-1"
                >
                  Ver soluciones para este sector
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── H2.6 ── Stack tecnológico */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Stack tecnológico: qué usamos y por qué
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            La transparencia tecnológica es parte de cómo trabajamos. No usamos herramientas de caja negra que no puedes auditar. Nuestro stack es open-source donde puede ser, best-in-class donde es necesario, y siempre explicable al cliente.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              {
                tool: 'n8n',
                role: 'Motor de automatización',
                why: 'Open-source, self-hosteable, visual. 400+ integraciones nativas. Código auditable — sabes exactamente qué hace cada nodo del flujo. Sin dependencia de un vendor cerrado.',
                badge: 'Open Source',
                badgeColor: 'bg-green-100 text-green-800',
              },
              {
                tool: 'Claude (Anthropic)',
                role: 'Modelo de lenguaje IA',
                why: 'Estado del arte en comprensión de contexto, razonamiento y seguridad. Preferimos Claude sobre GPT-4 para casos de negocio porque maneja mejor instrucciones largas y reduce alucinaciones en contextos estructurados.',
                badge: 'Best-in-class',
                badgeColor: 'bg-blue-100 text-blue-800',
              },
              {
                tool: 'Firebase',
                role: 'Backend y autenticación',
                why: 'Base de datos en tiempo real, autenticación segura, hosting CDN global. Para PYMEs es ideal: sin servidores que mantener, escala automáticamente y precio proporcional al uso real.',
                badge: 'Serverless',
                badgeColor: 'bg-purple-100 text-purple-800',
              },
              {
                tool: 'Google Workspace',
                role: 'Productividad y datos',
                why: 'La mayoría de PYMEs ya usan Gmail y Google Sheets. Integramos directamente con lo que ya tienes sin forzar migraciones.',
                badge: 'Integración nativa',
                badgeColor: 'bg-yellow-100 text-yellow-800',
              },
              {
                tool: 'WhatsApp Business API',
                role: 'Canal de comunicación',
                why: 'El canal dominante para PYMEs latinas. Implementamos a través de providers certificados Meta para garantizar continuidad del servicio y cumplimiento de políticas.',
                badge: 'Canal principal',
                badgeColor: 'bg-green-100 text-green-800',
              },
              {
                tool: 'Next.js / Vercel',
                role: 'Dashboards y portales web',
                why: 'Para proyectos que requieren dashboards custom o portales cliente, usamos Next.js en Vercel: deployments instantáneos, CDN global, cero configuración de servidor.',
                badge: 'Para proyectos web',
                badgeColor: 'bg-gray-100 text-gray-800',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{item.tool}</h3>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${item.badgeColor}`}>{item.badge}</span>
                </div>
                <p className="text-sm text-[#002D62] font-semibold mb-2">{item.role}</p>
                <p className="text-sm text-gray-700">{item.why}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-600">
            ¿Quieres ver el catálogo completo de herramientas que usamos?{' '}
            <Link href="/herramientas/arsenal" className="text-[#002D62] font-semibold hover:underline">
              Visita el Arsenal Tecnológico
            </Link>
            .
          </p>
        </section>

        {/* ── H2.7 ── Precios reales */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Precios reales de consultoría IA para PYMEs en NYC
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Una de las cosas que más diferencia a Impulsa Lab es la transparencia de precios. La industria de consultoría tradicional opera con precios ocultos para "calificar" clientes antes de revelar números. Nosotros publicamos rangos reales porque respetamos tu tiempo y el nuestro.
          </p>

          <div className="overflow-x-auto mb-8 rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#002D62] text-white">
                  <th className="text-left p-4 font-semibold">Tipo de proyecto</th>
                  <th className="text-left p-4 font-semibold">Setup (one-time)</th>
                  <th className="text-left p-4 font-semibold">Mensual</th>
                  <th className="text-left p-4 font-semibold">Tiempo de implementación</th>
                  <th className="text-left p-4 font-semibold">Comparación mercado NYC</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    type: 'Workflow / automatización agéntica',
                    setup: 'desde $747',
                    monthly: '$97–$147',
                    time: '1–2 semanas',
                    market: 'Agencias NYC: $1,500–$5,000 setup',
                  },
                  {
                    type: 'Agente IA (WhatsApp, atención)',
                    setup: '$597–$1,497',
                    monthly: '$297–$437',
                    time: '2–3 semanas',
                    market: 'Agencias NYC: $8,000–$20,000 setup',
                  },
                  {
                    type: 'Dashboard financiero custom',
                    setup: 'desde $997',
                    monthly: '$147–$197',
                    time: '3–4 semanas',
                    market: 'Agencias NYC: $10,000–$30,000 setup',
                  },
                  {
                    type: 'Suite completa (múltiples agentes)',
                    setup: '$1,997–$4,997',
                    monthly: '$357–$727',
                    time: '4–8 semanas',
                    market: 'Big 4: $50,000–$200,000+',
                  },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4 font-semibold text-gray-900">{row.type}</td>
                    <td className="p-4 text-gray-700">{row.setup}</td>
                    <td className="p-4 font-bold text-[#002D62]">{row.monthly}</td>
                    <td className="p-4 text-gray-700">{row.time}</td>
                    <td className="p-4 text-gray-500 text-xs">{row.market}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Por qué podemos ser 5-10x más baratos que agencias NYC</h3>
          <ul className="space-y-3 mb-6">
            {[
              'Stack tecnológico open-source y cloud-native — no licencias de $50,000/año',
              'Equipo remoto sin overhead de oficina en Midtown Manhattan',
              'Templates y productos prebuildeados que reducen tiempo de desarrollo 70%',
              'Foco exclusivo en PYMEs — no tenemos overhead de proyectos enterprise',
              'Modelo de suscripción en lugar de contratos de consultoría por horas',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700 text-lg">
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <p className="font-bold text-amber-900 mb-2">Nota sobre sorpresas en el precio</p>
            <p className="text-amber-800">
              Los únicos costos adicionales posibles son: (1) costos de plataformas de terceros que ya usas (ej: WhatsApp Business API ~$0.015/conversación), (2) costos de API de Claude si el volumen de mensajes es muy alto (raramente relevante para PYMEs con menos de 1,000 conversaciones/mes). Lo discutimos en detalle en el diagnóstico antes de cotizar.
            </p>
          </div>
        </section>

        {/* Inline CTA 2 */}
        <div className="bg-gradient-to-r from-[#002D62] to-[#0057b8] rounded-xl p-8 mb-14 text-center text-white">
          <p className="text-xl font-bold mb-2">¿Cuánto costaría tu proyecto específico?</p>
          <p className="text-blue-100 mb-6">El diagnóstico de 30 minutos es gratis y sales con un presupuesto claro</p>
          <Link
            href="/diagnostico"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#002D62] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
          >
            Cotizar mi Proyecto — Sin Costo
          </Link>
        </div>

        {/* ── H2.8 ── Quiénes somos */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Impulsa Lab: consultoría IA con raíces latinas, desde Nueva York
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Impulsa Lab nació trabajando con negocios latinoamericanos en los barrios de inmigrantes de Brooklyn y Queens — emprendimientos que se enfrentan a los mismos desafíos: competencia con cadenas grandes, márgenes ajustados, y procesos operativos que dependen de pocas personas.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Fundada por Orlando Matamoros, consultor con experiencia en implementaciones de inteligencia de negocio para organizaciones en LATAM y Estados Unidos, Impulsa Lab existe con una misión concreta: democratizar el acceso a herramientas de IA que hasta hace poco solo podían pagar las grandes corporaciones.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            No somos una consultora de PowerPoints. Somos un equipo técnico que implementa, entrega y se queda hasta que el sistema funciona. Nuestros clientes son restaurantes en Queens, salones en Brooklyn, contadores en el Bronx y PYMEs en Colombia, México y Centroamérica.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Entendemos el modelo de negocio de una PYME latina porque somos parte de esa comunidad. Sabemos que el dueño muchas veces es también el vendedor, el contador y el operador. Por eso nuestros sistemas están diseñados para ser manejados por una persona sin conocimiento técnico — no para crear dependencia de un consultor externo.
          </p>
          <Link
            href="/nosotros"
            className="inline-flex items-center gap-2 text-[#002D62] font-semibold hover:underline"
          >
            Conocer más sobre Impulsa Lab
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </section>

        {/* ── H2.9 ── FAQ — Opción A: siempre expandido */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Preguntas frecuentes sobre consultoría IA para PYMEs
          </h2>

          <div className="space-y-6">
            {[
              {
                q: '¿Cuánto cuesta implementar IA en una PYME?',
                a: (
                  <p className="text-gray-700">
                    Los proyectos de IA para PYMEs en Impulsa Lab arrancan desde <strong>$97/mes</strong> para automatizaciones puntuales (tracking de facturas, respuestas automáticas). La implementación inicial (setup + configuración) arranca <strong>desde $747</strong> y varía según la complejidad. Los agentes IA completos (atención al cliente 24/7, agendamiento inteligente) van de <strong>$297 a $497/mes</strong>. Para contexto: un empleado administrativo en NYC cuesta mínimo $3,500/mes — los agentes hacen el trabajo equivalente de 2-3 personas.
                  </p>
                ),
              },
              {
                q: '¿En cuánto tiempo se ven resultados con IA?',
                a: (
                  <div className="text-gray-700 space-y-1">
                    <p><strong>Resultados operativos inmediatos:</strong> el agente WhatsApp responde desde el día 1.</p>
                    <p><strong>Reducción de carga de trabajo:</strong> visible en semana 1-2.</p>
                    <p><strong>ROI financiero medible</strong> (más ventas, menos errores, menos horas manuales): típicamente semana 3-4.</p>
                    <p className="mt-2">Un restaurante cliente nuestro redujo en 40% las consultas repetitivas de WhatsApp en los primeros 7 días. No prometemos milagros — prometemos implementaciones que funcionan.</p>
                  </div>
                ),
              },
              {
                q: '¿Necesito saber de tecnología para trabajar con ustedes?',
                a: (
                  <p className="text-gray-700">
                    Cero conocimiento técnico requerido. Tu trabajo es contarnos cómo funciona tu negocio. Nuestro trabajo es automatizarlo. Usamos n8n con interfaz visual, dashboards listos para usar y capacitación incluida en todos los proyectos. Si sabes usar WhatsApp y Google Sheets, sabes usar lo que construimos.
                  </p>
                ),
              },
              {
                q: '¿Qué diferencia a Impulsa Lab de otras consultoras de IA?',
                a: (
                  <div className="text-gray-700 space-y-2">
                    <p><strong>Primero, implementamos</strong> — no solo asesoramos. Al final del proyecto tienes sistemas funcionando, no una presentación de PowerPoint.</p>
                    <p><strong>Segundo, precios PYME</strong> — nuestros proyectos cuestan 5-10 veces menos que agencias tradicionales de NYC porque eliminamos overhead de grandes consultoras.</p>
                    <p><strong>Tercero, contexto latino</strong> — entendemos los modelos de negocio, los procesos y los clientes de PYMEs latinas porque somos parte de esa comunidad.</p>
                  </div>
                ),
              },
              {
                q: '¿Puedo automatizar solo una parte de mi negocio y escalar después?',
                a: (
                  <p className="text-gray-700">
                    Esa es exactamente la estrategia recomendada. Empezamos con el punto de mayor dolor o mayor ROI (típicamente atención al cliente o tracking financiero), lo implementamos bien, medimos resultados y luego expandimos. No hay contratos de largo plazo obligatorios en los planes base — puedes empezar con $97/mes y escalar cuando veas el valor.
                  </p>
                ),
              },
              {
                q: '¿Qué pasa si el agente IA comete un error?',
                a: (
                  <p className="text-gray-700">
                    Los agentes IA tienen límites configurados. Para transacciones, respuestas fuera de guión o situaciones de alta sensibilidad, el agente escala automáticamente al humano. Nuestros sistemas incluyen logging completo — puedes ver exactamente qué respondió el agente y cuándo. El primer mes de operación incluye soporte activo para ajustar el comportamiento según los casos reales que aparezcan. Para leer más sobre la diferencia entre agentes y workflows lineales:{' '}
                    <Link href="/blog/agentes-ai-vs-workflows-lineales-2026" className="text-[#002D62] font-semibold hover:underline">
                      Agentes IA vs Workflows lineales: cuándo usar cada uno
                    </Link>
                    .
                  </p>
                ),
              },
              {
                q: '¿Con qué plataformas trabajan? ¿Se integra con lo que ya uso?',
                a: (
                  <div className="text-gray-700">
                    <p className="mb-2">Nuestro stack core es n8n + Claude AI + Firebase, que se conecta con prácticamente cualquier sistema que tenga API o webhook. Integraciones nativas incluidas en nuestros proyectos:</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                      {['WhatsApp Business', 'Google Sheets/Drive', 'Gmail', 'Calendly', 'QuickBooks', 'Xero', 'Square', 'Shopify', 'WooCommerce', 'Slack', 'HubSpot', '50+ herramientas más'].map((tool, i) => (
                        <span key={i} className="flex items-center gap-1 text-sm">
                          <CheckIcon />
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ),
              },
            ].map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-6 py-4">
                  <h3 className="text-lg font-bold text-gray-900">{item.q}</h3>
                </div>
                <div className="px-6 py-5 bg-white">
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── H2.10 ── Footer CTA fuerte */}
        <section className="rounded-2xl overflow-hidden mb-8">
          <div className="bg-gradient-to-br from-[#002D62] to-[#0057b8] px-8 py-14 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tu PYME merece IA que funcione, no promesas
            </h2>
            <p className="text-xl text-blue-100 mb-4 max-w-2xl mx-auto">
              30 minutos de diagnóstico. Sin costo. Sin compromiso de contratación. Solo claridad sobre qué automatizar primero para el mayor ROI en tu negocio.
            </p>
            <p className="text-blue-200 mb-10 max-w-xl mx-auto">
              Más de 20 PYMEs latinas en NYC y LATAM ya tienen sistemas IA funcionando. El siguiente puedes ser tú.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/diagnostico"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#002D62] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                Agendar Diagnóstico Gratuito
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href={LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </section>

      </article>
    </div>
  )
}
