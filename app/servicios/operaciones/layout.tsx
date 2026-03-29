import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Automatizacion de Choque - Operaciones con IA para PYMEs',
  description: 'Optimiza las operaciones de tu negocio con agentes de IA, automatizacion de procesos y plataformas inteligentes. Desde $200 por automatizacion.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios/operaciones',
  },
  openGraph: {
    title: 'Automatizacion de Choque - Operaciones con IA para PYMEs',
    description: 'Agentes de IA, automatizacion de procesos y plataformas inteligentes para tu negocio. Desde $200.',
    url: 'https://www.tuimpulsalab.com/servicios/operaciones',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Automatizacion de Operaciones' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automatizacion de Choque - Operaciones con IA para PYMEs',
    description: 'Agentes de IA, automatizacion de procesos y plataformas inteligentes para tu negocio. Desde $200.',
    images: ['/images/og-image.jpg'],
  },
}

export default function OperacionesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
