import { Metadata } from 'next'
import { buildBreadcrumbLd } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Landing Pages + Marketing Digital con IA — Impulsa Lab',
  description: 'Lanza tu presencia online en días, no meses. Landing pages desde $697, websites desde $2,497 y campañas digitales con IA para PYMEs latinas en EE.UU. Hablamos español.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios/marketing',
  },
  openGraph: {
    title: 'Landing Pages + Marketing Digital con IA — Impulsa Lab',
    description: 'Lanza tu presencia online en días, no meses. Landing pages desde $697, websites desde $2,497 y campañas digitales con IA para PYMEs latinas en EE.UU. Hablamos español.',
    url: 'https://www.tuimpulsalab.com/servicios/marketing',
    type: 'website',
    images: [{ url: '/opengraph-image.png?v=2', width: 1200, height: 630, alt: 'Impulsa Lab - Landing Express y Marketing Digital' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Landing Pages + Marketing Digital con IA — Impulsa Lab',
    description: 'Lanza tu presencia online en días, no meses. Landing pages desde $697, websites desde $2,497 y campañas digitales con IA para PYMEs latinas en EE.UU. Hablamos español.',
    images: ['/opengraph-image.png?v=2'],
  },
}

// Service schema — Marketing
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.tuimpulsalab.com/servicios/marketing#service',
  name: 'Marketing Digital con IA — Landing Pages y Campañas para PYMEs',
  description:
    'Landing pages profesionales desde $697, sitios web desde $2,497 y campañas de marketing digital con IA para PYMEs latinas en EE.UU. Entrega en días, no meses.',
  url: 'https://www.tuimpulsalab.com/servicios/marketing',
  provider: { '@id': 'https://www.tuimpulsalab.com/#organization' },
  areaServed: [
    { '@type': 'City', name: 'New York City' },
    { '@type': 'Country', name: 'US' },
    { '@type': 'Country', name: 'CO' },
    { '@type': 'Country', name: 'MX' },
  ],
  offers: {
    '@type': 'Offer',
    price: '697',
    priceCurrency: 'USD',
    url: 'https://www.tuimpulsalab.com/servicios/marketing',
  },
  serviceType: 'Digital Marketing Consulting',
  category: 'Artificial Intelligence Consulting',
}

const breadcrumbSchema = buildBreadcrumbLd([
  { name: 'Inicio', path: '/' },
  { name: 'Servicios', path: '/servicios' },
  { name: 'Marketing con IA', path: '/servicios/marketing' },
])

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
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
