import { Metadata } from 'next'
import { buildBreadcrumbLd } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Consultoría IA para PYMEs | Automatización Real desde $97/mes | Impulsa Lab NYC',
  description:
    'Consultoría de inteligencia artificial para PYMEs latinas en NYC y LATAM. Implementamos agentes IA con n8n + Claude: chatbots, facturación automática, atención al cliente. Diagnóstico gratis en 30 min.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios/consultoria-ia-para-pymes',
  },
  openGraph: {
    title: 'Consultoría IA para PYMEs | Automatización Real desde $97/mes | Impulsa Lab NYC',
    description:
      'Consultoría de inteligencia artificial para PYMEs latinas en NYC y LATAM. Implementamos agentes IA con n8n + Claude: chatbots, facturación automática, atención al cliente. Diagnóstico gratis en 30 min.',
    url: 'https://www.tuimpulsalab.com/servicios/consultoria-ia-para-pymes',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Consultoría IA para PYMEs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consultoría IA para PYMEs | Automatización Real desde $97/mes | Impulsa Lab NYC',
    description:
      'Consultoría de inteligencia artificial para PYMEs latinas en NYC y LATAM. Implementamos agentes IA con n8n + Claude: chatbots, facturación automática, atención al cliente. Diagnóstico gratis en 30 min.',
    images: ['/images/og-image.jpg'],
  },
  robots: { index: true, follow: true },
}

// 7 FAQs from H2.9 for FAQPage structured data
const faqSchemaItems = [
  {
    question: '¿Cuánto cuesta implementar IA en una PYME?',
    answer:
      'Los proyectos de IA para PYMEs en Impulsa Lab arrancan desde $97/mes para automatizaciones puntuales (tracking de facturas, respuestas automáticas). La implementación inicial (setup + configuración) cuesta entre $500 y $3,000 dependiendo de la complejidad. Los agentes IA completos (atención al cliente 24/7, agendamiento inteligente) van de $297 a $497/mes. Para contexto: un empleado administrativo en NYC cuesta mínimo $3,500/mes — los agentes hacen el trabajo equivalente de 2-3 personas.',
  },
  {
    question: '¿En cuánto tiempo se ven resultados con IA?',
    answer:
      'Resultados operativos inmediatos: el agente WhatsApp responde desde el día 1. Reducción de carga de trabajo: visible en semana 1-2. ROI financiero medible (más ventas, menos errores, menos horas manuales): típicamente semana 3-4. Un restaurante cliente nuestro redujo en 40% las consultas repetitivas de WhatsApp en los primeros 7 días. No prometemos milagros — prometemos implementaciones que funcionan.',
  },
  {
    question: '¿Necesito saber de tecnología para trabajar con ustedes?',
    answer:
      'Cero conocimiento técnico requerido. Tu trabajo es contarnos cómo funciona tu negocio. Nuestro trabajo es automatizarlo. Usamos n8n con interfaz visual, dashboards listos para usar y capacitación incluida en todos los proyectos. Si sabes usar WhatsApp y Google Sheets, sabes usar lo que construimos.',
  },
  {
    question: '¿Qué diferencia a Impulsa Lab de otras consultoras de IA?',
    answer:
      'Tres diferencias concretas. Primero, implementamos — no solo asesoramos. Al final del proyecto tienes sistemas funcionando, no una presentación de PowerPoint. Segundo, precios PYME — nuestros proyectos cuestan 5-10 veces menos que agencias tradicionales de NYC porque eliminamos overhead de grandes consultoras. Tercero, contexto latino — entendemos los modelos de negocio, los procesos y los clientes de PYMEs latinas porque somos parte de esa comunidad.',
  },
  {
    question: '¿Puedo automatizar solo una parte de mi negocio y escalar después?',
    answer:
      'Esa es exactamente la estrategia recomendada. Empezamos con el punto de mayor dolor o mayor ROI (típicamente atención al cliente o tracking financiero), lo implementamos bien, medimos resultados y luego expandimos. No hay contratos de largo plazo obligatorios en los planes base — puedes empezar con $97/mes y escalar cuando veas el valor.',
  },
  {
    question: '¿Qué pasa si el agente IA comete un error?',
    answer:
      'Los agentes IA tienen límites configurados. Para transacciones, respuestas fuera de guión o situaciones de alta sensibilidad, el agente escala automáticamente al humano. Nuestros sistemas incluyen logging completo — puedes ver exactamente qué respondió el agente y cuándo. El primer mes de operación incluye soporte activo para ajustar el comportamiento según los casos reales que aparezcan.',
  },
  {
    question: '¿Con qué plataformas trabajan? ¿Se integra con lo que ya uso?',
    answer:
      'Nuestro stack core es n8n + Claude AI + Firebase, que se conecta con prácticamente cualquier sistema que tenga API o webhook. Integraciones nativas incluidas en nuestros proyectos: WhatsApp Business, Google Sheets/Drive, Gmail, Calendly, QuickBooks, Xero, Square, Shopify, WooCommerce, Slack, y 50+ herramientas más. Si usas un sistema específico, preguntamos en el diagnóstico si hay integración disponible antes de comprometerse.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqSchemaItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

const breadcrumbSchema = buildBreadcrumbLd([
  { name: 'Inicio', path: '/' },
  { name: 'Servicios', path: '/servicios' },
  { name: 'Consultoría IA para PYMEs', path: '/servicios/consultoria-ia-para-pymes' },
])

export default function ConsultoriaIAPymesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  )
}
