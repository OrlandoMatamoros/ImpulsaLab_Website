import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agentes de IA para Negocios - Automatizacion Inteligente',
  description: 'Implementa agentes de inteligencia artificial que automatizan tareas repetitivas, atienden clientes y optimizan operaciones de tu PYME 24/7.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios/operaciones/agentes',
  },
  openGraph: {
    title: 'Agentes de IA para Negocios - Automatizacion 24/7',
    description: 'Agentes de IA que automatizan tareas, atienden clientes y optimizan operaciones de tu PYME 24/7.',
    url: 'https://www.tuimpulsalab.com/servicios/operaciones/agentes',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Agentes de IA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agentes de IA para Negocios - Automatizacion 24/7',
    description: 'Agentes de IA que automatizan tareas, atienden clientes y optimizan operaciones de tu PYME 24/7.',
    images: ['/images/og-image.jpg'],
  },
}

export default function AgentesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
