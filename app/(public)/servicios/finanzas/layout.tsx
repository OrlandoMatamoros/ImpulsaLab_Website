import { Metadata } from 'next'
import { buildBreadcrumbLd } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Finanzas con IA: Dashboard + CFO Virtual',
  description: 'Tu PYME merece un CFO. Dashboards financieros con IA, proyecciones automáticas y alertas de riesgo para negocios latinos. Desde $997 + $147/mes.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios/finanzas',
  },
  openGraph: {
    title: 'Finanzas con IA: Dashboard + CFO Virtual | Impulsa Lab',
    description: 'Tu PYME merece un CFO. Dashboards financieros con IA, proyecciones automáticas y alertas de riesgo para negocios latinos. Desde $997 + $147/mes.',
    url: 'https://www.tuimpulsalab.com/servicios/finanzas',
    type: 'website',
    images: [{ url: '/opengraph-image.png?v=2', width: 1200, height: 630, alt: 'Impulsa Lab - CFO en tu Excel con IA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finanzas con IA: Dashboard + CFO Virtual | Impulsa Lab',
    description: 'Tu PYME merece un CFO. Dashboards financieros con IA, proyecciones automáticas y alertas de riesgo para negocios latinos. Desde $997 + $147/mes.',
    images: ['/opengraph-image.png?v=2'],
  },
}

// Service schema — Finanzas
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.tuimpulsalab.com/servicios/finanzas#service',
  name: 'CFO Virtual con IA — Automatización Financiera para PYMEs',
  description:
    'Dashboards financieros automatizados, proyecciones con IA, alertas de riesgo y seguimiento de KPIs para restaurantes, tiendas y servicios latinos.',
  url: 'https://www.tuimpulsalab.com/servicios/finanzas',
  provider: { '@id': 'https://www.tuimpulsalab.com/#organization' },
  areaServed: [
    { '@type': 'City', name: 'New York City' },
    { '@type': 'Country', name: 'US' },
    { '@type': 'Country', name: 'CO' },
    { '@type': 'Country', name: 'MX' },
  ],
  offers: {
    '@type': 'Offer',
    price: '147',
    priceCurrency: 'USD',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '147',
      priceCurrency: 'USD',
      unitText: 'monthly',
    },
    url: 'https://www.tuimpulsalab.com/servicios/finanzas',
  },
  serviceType: 'Financial Automation Consulting',
  category: 'Artificial Intelligence Consulting',
}

const breadcrumbSchema = buildBreadcrumbLd([
  { name: 'Inicio', path: '/' },
  { name: 'Servicios', path: '/servicios' },
  { name: 'Finanzas con IA', path: '/servicios/finanzas' },
])

export default function FinanzasLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  )
}
