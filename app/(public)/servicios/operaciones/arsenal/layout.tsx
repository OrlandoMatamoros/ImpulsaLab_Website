import { Metadata } from 'next'
import { buildBreadcrumbLd } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Arsenal de Automatización — Herramientas y Plataformas IA | Impulsa Lab',
  description: 'Conoce las herramientas de automatización que usamos: desde email marketing hasta CRM inteligente. Soluciones probadas para PYMEs latinoamericanas.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios/operaciones/arsenal',
  },
  openGraph: {
    title: 'Arsenal de Automatización — Herramientas y Plataformas IA | Impulsa Lab',
    description: 'Herramientas de automatización probadas: email marketing, CRM inteligente y más para PYMEs latinas.',
    url: 'https://www.tuimpulsalab.com/servicios/operaciones/arsenal',
    type: 'website',
    images: [{ url: '/opengraph-image.png?v=2', width: 1200, height: 630, alt: 'Impulsa Lab - Arsenal de Automatización con IA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arsenal de Automatización — Herramientas y Plataformas IA | Impulsa Lab',
    description: 'Herramientas de automatización probadas: email marketing, CRM inteligente y más para PYMEs latinas.',
    images: ['/opengraph-image.png?v=2'],
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
