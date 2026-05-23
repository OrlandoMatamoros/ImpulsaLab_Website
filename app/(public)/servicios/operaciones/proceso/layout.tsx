import { Metadata } from 'next'
import { buildBreadcrumbLd } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Proceso de Automatizacion - Como Trabajamos',
  description: 'Nuestro proceso de automatizacion paso a paso: diagnostico, implementacion y optimizacion. Resultados medibles en semanas, no meses.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios/operaciones/proceso',
  },
  openGraph: {
    title: 'Proceso de Automatizacion - Como Trabajamos',
    description: 'Diagnostico, implementacion y optimizacion. Resultados medibles en semanas, no meses.',
    url: 'https://www.tuimpulsalab.com/servicios/operaciones/proceso',
    type: 'website',
    images: [{ url: '/opengraph-image.png?v=2', width: 1200, height: 630, alt: 'Impulsa Lab - Proceso de Automatizacion' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Proceso de Automatizacion - Como Trabajamos',
    description: 'Diagnostico, implementacion y optimizacion. Resultados medibles en semanas, no meses.',
    images: ['/opengraph-image.png?v=2'],
  },
}

const breadcrumbSchema = buildBreadcrumbLd([
  { name: 'Inicio', path: '/' },
  { name: 'Servicios', path: '/servicios' },
  { name: 'Operaciones', path: '/servicios/operaciones' },
  { name: 'Proceso', path: '/servicios/operaciones/proceso' },
])

export default function ProcesoLayout({ children }: { children: React.ReactNode }) {
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
