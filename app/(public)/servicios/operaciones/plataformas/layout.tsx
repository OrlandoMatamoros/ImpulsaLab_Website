import { Metadata } from 'next'
import { buildBreadcrumbLd } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Plataformas de Automatizacion - n8n, Make y Zapier',
  description: 'Integramos las mejores plataformas de automatizacion: n8n, Make, Zapier y herramientas custom para conectar todos los sistemas de tu negocio.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios/operaciones/plataformas',
  },
  openGraph: {
    title: 'Plataformas de Automatizacion - n8n, Make y Zapier',
    description: 'Las mejores plataformas de automatizacion para conectar todos los sistemas de tu negocio.',
    url: 'https://www.tuimpulsalab.com/servicios/operaciones/plataformas',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Plataformas de Automatizacion' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plataformas de Automatizacion - n8n, Make y Zapier',
    description: 'Las mejores plataformas de automatizacion para conectar todos los sistemas de tu negocio.',
    images: ['/images/og-image.jpg'],
  },
}

const breadcrumbSchema = buildBreadcrumbLd([
  { name: 'Inicio', path: '/' },
  { name: 'Servicios', path: '/servicios' },
  { name: 'Operaciones', path: '/servicios/operaciones' },
  { name: 'Plataformas', path: '/servicios/operaciones/plataformas' },
])

export default function PlataformasLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  )
}
