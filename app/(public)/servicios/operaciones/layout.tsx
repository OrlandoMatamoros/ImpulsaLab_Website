import { Metadata } from 'next'
import { buildBreadcrumbLd } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Automatización de Operaciones con IA para PYMEs | Impulsa Lab',
  description: 'Automatización de operaciones con agentes IA y n8n para PYMEs. Gestión de WhatsApp, facturación automática, plataformas inteligentes y flujos sin código. Agentes desde $597 setup.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios/operaciones',
  },
  openGraph: {
    title: 'Automatización de Operaciones con IA para PYMEs | Impulsa Lab',
    description: 'Automatización de operaciones con agentes IA y n8n para PYMEs. Gestión de WhatsApp, facturación automática, plataformas inteligentes y flujos sin código. Agentes desde $597 setup.',
    url: 'https://www.tuimpulsalab.com/servicios/operaciones',
    type: 'website',
    images: [{ url: '/opengraph-image.png?v=2', width: 1200, height: 630, alt: 'Impulsa Lab - Automatización de Operaciones con IA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automatización de Operaciones con IA para PYMEs | Impulsa Lab',
    description: 'Automatización de operaciones con agentes IA y n8n para PYMEs. Gestión de WhatsApp, facturación automática, plataformas inteligentes y flujos sin código. Agentes desde $597 setup.',
    images: ['/opengraph-image.png?v=2'],
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
