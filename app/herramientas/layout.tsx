import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Herramientas de IA Gratuitas para Negocios Latinos',
  description: 'Accede a nuestro arsenal de herramientas de IA: agentes inteligentes, prompt designer, noticias y mas para tu empresa latina.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/herramientas' },
  openGraph: {
    title: 'Herramientas de IA Gratuitas para Negocios Latinos',
    description: 'Arsenal de herramientas de IA: agentes inteligentes, prompt designer, noticias y mas para tu empresa.',
    url: 'https://www.tuimpulsalab.com/herramientas',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Herramientas de IA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Herramientas de IA Gratuitas para Negocios Latinos',
    description: 'Arsenal de herramientas de IA: agentes inteligentes, prompt designer, noticias y mas para tu empresa.',
    images: ['/images/og-image.jpg'],
  },
}

export default function HerramientasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
