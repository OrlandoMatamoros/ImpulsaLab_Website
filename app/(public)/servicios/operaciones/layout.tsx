import { Metadata } from 'next'
import { buildBreadcrumbLd } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Automatizacion de Choque - Operaciones con IA para PYMEs',
  description: 'Optimiza las operaciones de tu negocio con agentes de IA, automatizacion de procesos y plataformas inteligentes. Desde $500 setup + $97/mes.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios/operaciones',
  },
  openGraph: {
    title: 'Automatizacion de Choque - Operaciones con IA para PYMEs',
    description: 'Agentes de IA, automatizacion de procesos y plataformas inteligentes para tu negocio. Desde $500 setup + $97/mes.',
    url: 'https://www.tuimpulsalab.com/servicios/operaciones',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Automatizacion de Operaciones' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automatizacion de Choque - Operaciones con IA para PYMEs',
    description: 'Agentes de IA, automatizacion de procesos y plataformas inteligentes para tu negocio. Desde $500 setup + $97/mes.',
    images: ['/images/og-image.jpg'],
  },
}

const breadcrumbSchema = buildBreadcrumbLd([
  { name: 'Inicio', path: '/' },
  { name: 'Servicios', path: '/servicios' },
  { name: 'Operaciones', path: '/servicios/operaciones' },
])

export default function OperacionesLayout({ children }: { children: React.ReactNode }) {
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
