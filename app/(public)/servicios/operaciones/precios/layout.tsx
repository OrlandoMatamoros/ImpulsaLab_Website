import { Metadata } from 'next'
import { buildBreadcrumbLd } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Precios de Automatizacion - Planes desde $97/mes',
  description: 'Planes claros de automatizacion: automatizacion agentica desde $747 setup, o suites $1,997-$3,997 de 3-10 workflows. Sin costos ocultos para tu PYME.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios/operaciones/precios',
  },
  openGraph: {
    title: 'Precios de Automatizacion - Desde $97/mes',
    description: 'Planes claros sin costos ocultos: automatizacion desde $747 setup, o suites $1,997-$3,997 para tu PYME.',
    url: 'https://www.tuimpulsalab.com/servicios/operaciones/precios',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Precios de Automatizacion' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Precios de Automatizacion - Desde $97/mes',
    description: 'Planes claros sin costos ocultos: automatizacion desde $747 setup, o suites $1,997-$3,997 para tu PYME.',
    images: ['/images/og-image.jpg'],
  },
}

const breadcrumbSchema = buildBreadcrumbLd([
  { name: 'Inicio', path: '/' },
  { name: 'Servicios', path: '/servicios' },
  { name: 'Operaciones', path: '/servicios/operaciones' },
  { name: 'Precios', path: '/servicios/operaciones/precios' },
])

export default function PreciosLayout({ children }: { children: React.ReactNode }) {
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
