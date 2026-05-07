import { Metadata } from 'next'
import { buildBreadcrumbLd } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Arsenal de Automatizacion - Herramientas y Plataformas IA',
  description: 'Conoce las herramientas de automatizacion que usamos: desde email marketing hasta CRM inteligente. Soluciones probadas para PYMEs latinoamericanas.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios/operaciones/arsenal',
  },
  openGraph: {
    title: 'Arsenal de Automatizacion - Herramientas IA Probadas',
    description: 'Herramientas de automatizacion probadas: email marketing, CRM inteligente y mas para PYMEs latinas.',
    url: 'https://www.tuimpulsalab.com/servicios/operaciones/arsenal',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Arsenal de Automatizacion' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arsenal de Automatizacion - Herramientas IA Probadas',
    description: 'Herramientas de automatizacion probadas: email marketing, CRM inteligente y mas para PYMEs latinas.',
    images: ['/images/og-image.jpg'],
  },
}

const breadcrumbSchema = buildBreadcrumbLd([
  { name: 'Inicio', path: '/' },
  { name: 'Servicios', path: '/servicios' },
  { name: 'Operaciones', path: '/servicios/operaciones' },
  { name: 'Arsenal de Automatización', path: '/servicios/operaciones/arsenal' },
])

export default function ArsenalLayout({ children }: { children: React.ReactNode }) {
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
