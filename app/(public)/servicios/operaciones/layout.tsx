import { Metadata } from 'next'
import { buildBreadcrumbLd } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Automatización de Operaciones con IA para PYMEs | Impulsa Lab',
  description: 'Automatiza operaciones con agentes IA y n8n: WhatsApp 24/7, facturación automática y flujos sin código para PYMEs latinas en NYC. Desde $597 setup.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios/operaciones',
  },
  openGraph: {
    title: 'Automatización de Operaciones con IA para PYMEs | Impulsa Lab',
    description: 'Automatiza operaciones con agentes IA y n8n: WhatsApp 24/7, facturación automática y flujos sin código para PYMEs latinas en NYC. Desde $597 setup.',
    url: 'https://www.tuimpulsalab.com/servicios/operaciones',
    type: 'website',
    images: [{ url: '/opengraph-image.png?v=2', width: 1200, height: 630, alt: 'Impulsa Lab - Automatización de Operaciones con IA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automatización de Operaciones con IA para PYMEs | Impulsa Lab',
    description: 'Automatiza operaciones con agentes IA y n8n: WhatsApp 24/7, facturación automática y flujos sin código para PYMEs latinas en NYC. Desde $597 setup.',
    images: ['/opengraph-image.png?v=2'],
  },
}

const breadcrumbSchema = buildBreadcrumbLd([
  { name: 'Inicio', path: '/' },
  { name: 'Servicios', path: '/servicios' },
  { name: 'Operaciones', path: '/servicios/operaciones' },
])

// Service schema — Operaciones
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.tuimpulsalab.com/servicios/operaciones#service',
  name: 'Automatización de Operaciones con IA — Agentes n8n para PYMEs',
  description:
    'Automatización de procesos operativos con agentes IA y n8n: gestión WhatsApp 24/7, facturación automática, plataformas inteligentes y flujos sin código para PYMEs latinas.',
  url: 'https://www.tuimpulsalab.com/servicios/operaciones',
  provider: { '@id': 'https://www.tuimpulsalab.com/#organization' },
  areaServed: [
    { '@type': 'City', name: 'New York City' },
    { '@type': 'Country', name: 'US' },
    { '@type': 'Country', name: 'CO' },
    { '@type': 'Country', name: 'MX' },
  ],
  offers: {
    '@type': 'Offer',
    price: '597',
    priceCurrency: 'USD',
    url: 'https://www.tuimpulsalab.com/servicios/operaciones',
  },
  serviceType: 'Business Process Automation',
  category: 'Artificial Intelligence Consulting',
}

export default function OperacionesLayout({ children }: { children: React.ReactNode }) {
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
