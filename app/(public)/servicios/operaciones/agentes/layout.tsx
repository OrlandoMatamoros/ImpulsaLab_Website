import { Metadata } from 'next'
import { buildBreadcrumbLd } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Agentes de IA para Negocios — Automatización Inteligente | Impulsa Lab',
  description: 'Implementa agentes de inteligencia artificial que automatizan tareas repetitivas, atienden clientes y optimizan operaciones de tu PYME 24/7.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios/operaciones/agentes',
  },
  openGraph: {
    title: 'Agentes de IA para Negocios — Automatización Inteligente | Impulsa Lab',
    description: 'Agentes de IA que automatizan tareas, atienden clientes y optimizan operaciones de tu PYME 24/7.',
    url: 'https://www.tuimpulsalab.com/servicios/operaciones/agentes',
    type: 'website',
    images: [{ url: '/opengraph-image.png?v=2', width: 1200, height: 630, alt: 'Impulsa Lab - Agentes de IA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agentes de IA para Negocios — Automatización Inteligente | Impulsa Lab',
    description: 'Agentes de IA que automatizan tareas, atienden clientes y optimizan operaciones de tu PYME 24/7.',
    images: ['/opengraph-image.png?v=2'],
  },
}

const breadcrumbSchema = buildBreadcrumbLd([
  { name: 'Inicio', path: '/' },
  { name: 'Servicios', path: '/servicios' },
  { name: 'Operaciones', path: '/servicios/operaciones' },
  { name: 'Agentes de IA', path: '/servicios/operaciones/agentes' },
])

export default function AgentesLayout({ children }: { children: React.ReactNode }) {
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
