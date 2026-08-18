import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agentes de IA Gratis para tu Negocio | Impulsa Lab',
  description: '4 agentes de IA gratis: finanzas, operaciones, marketing y estrategia. Pruébalos sin registrarte y mira en minutos qué automatización necesita tu negocio.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/herramientas/agentes' },
  openGraph: {
    title: 'Agentes de IA Gratis para tu Negocio | Impulsa Lab',
    description: 'Asistentes de IA especializados para finanzas, operaciones y marketing de tu negocio. Prueba gratis.',
    url: 'https://www.tuimpulsalab.com/herramientas/agentes',
    type: 'website',
    images: [{ url: '/opengraph-image.png?v=2', width: 1200, height: 630, alt: 'Impulsa Lab - Agentes de IA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agentes de IA Gratis para tu Negocio | Impulsa Lab',
    description: 'Asistentes de IA especializados para finanzas, operaciones y marketing de tu negocio. Prueba gratis.',
    images: ['/opengraph-image.png?v=2'],
  },
}

export default function AgentesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}