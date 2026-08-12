import { Metadata } from 'next'
import { buildBreadcrumbLd } from '@/lib/schema'

const CANONICAL = 'https://www.tuimpulsalab.com/es/automatizacion-ia-pequenos-negocios'
const EN_MIRROR = 'https://www.tuimpulsalab.com/en/ai-automation-small-business'

export const metadata: Metadata = {
  title: 'WhatsApp, Facturas y Prospectos con IA | Impulsa Lab',
  description:
    'Automatiza WhatsApp, facturas y prospectos con IA. Sin saber de tecnología. Equipo bilingüe en Queens, NYC. Diagnóstico 3D gratis. Desde $97/mes.',
  alternates: {
    canonical: CANONICAL,
    languages: {
      'es': CANONICAL,
      'en-US': EN_MIRROR,
      'x-default': EN_MIRROR,
    },
  },
  openGraph: {
    title: 'WhatsApp, Facturas y Prospectos con IA | Impulsa Lab',
    description:
      'La IA que responde tu WhatsApp, controla tus facturas y captura tus prospectos, 24/7 y sin que necesites saber de tecnología. Equipo bilingüe en NYC. Diagnóstico 3D gratis. Desde $97/mes.',
    url: CANONICAL,
    type: 'website',
    locale: 'es_US',
    images: [{ url: '/opengraph-image.png?v=2', width: 1200, height: 630, alt: 'Impulsa Lab — Automatización de WhatsApp, facturas y prospectos con IA en NYC' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WhatsApp, Facturas y Prospectos con IA | Impulsa Lab',
    description:
      'La IA que responde tu WhatsApp, controla facturas y captura prospectos 24/7, sin que necesites saber de tecnología. Diagnóstico 3D gratis. Desde $97/mes.',
    images: ['/opengraph-image.png?v=2'],
  },
  robots: { index: true, follow: true },
}

const faqSchemaItems = [
  {
    question: '¿Qué es exactamente la automatización con IA para un pequeño negocio?',
    answer:
      'Es software que hace tus tareas repetitivas por ti: responder los mensajes de tus clientes, capturar y dar seguimiento a prospectos, registrar facturas, enviar recordatorios y mover datos entre las herramientas que ya usas. Lo construimos con n8n y Claude AI para que funcione 24/7. No necesitas saber nada técnico; si sabes usar WhatsApp y Google Sheets, sabes usar lo que construimos.',
  },
  {
    question: '¿Cuánto cuesta y hay costos ocultos?',
    answer:
      'Los planes arrancan desde $97/mes para automatización de procesos y consultoría IA, y desde $297/mes para un bot de WhatsApp con IA completo. El Diagnóstico 3D gratis cuesta $0. Los únicos costos extra posibles son las plataformas de terceros que pagarías de todos modos. Te lo explicamos todo en el Diagnóstico antes de que te comprometas — sin sorpresas.',
  },
  {
    question: '¿Qué tan rápido queda funcionando?',
    answer:
      'La mayoría de las automatizaciones para pequeños negocios quedan listas en días, no meses. El bot de WhatsApp con IA puede empezar a responder desde el primer día. Construimos y probamos con tus datos reales primero, luego lanzamos, capacitamos a tu equipo y te damos soporte el primer mes.',
  },
  {
    question: '¿Trabajan con mi industria — como un restaurante o una bodega?',
    answer:
      'Sí. Construimos automatización con IA para restaurantes, bodegas y minimarkets, clínicas dentales y médicas, salones, contadores y tiendas, entre otros. Cada configuración se adapta a cómo funciona tu negocio de verdad.',
  },
  {
    question: '¿Necesito saber de tecnología o contratar un experto interno?',
    answer:
      'No. Nosotros somos tu equipo de automatización con IA y tu consultor de n8n. Tú nos cuentas cómo funciona tu negocio; nosotros diseñamos, construimos, conectamos y mantenemos el sistema, y te lo entregamos con capacitación en lenguaje simple.',
  },
  {
    question: '¿Atienden negocios cerca de mí en NYC?',
    answer:
      'Sí. Somos un negocio con área de servicio en Queens, NYC, que atiende a pequeños negocios en los cinco condados y toda el área de Nueva York — y de forma remota en EE.UU. y LATAM. Somos bilingües en español e inglés.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqSchemaItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

const breadcrumbSchema = buildBreadcrumbLd([
  { name: 'Inicio', path: '/' },
  { name: 'Automatización con IA para pequeños negocios', path: '/es/automatizacion-ia-pequenos-negocios' },
])

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': CANONICAL + '#service',
  name: 'Automatización con IA para Pequeños Negocios — desde $97/mes',
  description:
    'Automatización con IA y flujos n8n para pequeños negocios en NYC: bots de WhatsApp, captura de prospectos, control de facturas y atención al cliente 24/7. Equipo bilingüe. Diagnóstico 3D gratis.',
  url: CANONICAL,
  inLanguage: 'es-US',
  provider: { '@id': 'https://www.tuimpulsalab.com/#organization' },
  serviceType: 'Business Process Automation',
  category: 'Artificial Intelligence',
  areaServed: [
    { '@type': 'City', name: 'New York City' },
    { '@type': 'AdministrativeArea', name: 'Queens' },
    { '@type': 'Country', name: 'US' },
    { '@type': 'Country', name: 'CO' },
    { '@type': 'Country', name: 'MX' },
  ],
  offers: {
    '@type': 'Offer',
    price: '97',
    priceCurrency: 'USD',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '97',
      priceCurrency: 'USD',
      unitText: 'monthly',
    },
    url: CANONICAL,
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios de Automatización con IA',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Automatización de procesos', description: 'desde $97/mes' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bot de WhatsApp con IA', description: 'desde $297/mes' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Consultoría IA para pequeños negocios', description: 'desde $97/mes' } },
    ],
  },
}

export default function AutomatizacionIALayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  )
}
