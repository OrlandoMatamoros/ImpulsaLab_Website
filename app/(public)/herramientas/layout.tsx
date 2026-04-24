import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Herramientas de IA Gratuitas para Negocios Latinos',
  description: 'Plan de negocios con IA, agentes especializados, prompt designer, noticias curadas y catalogo de 130+ herramientas. Todo gratis para pymes latinas.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/herramientas' },
  openGraph: {
    title: 'Herramientas de IA Gratuitas para Negocios Latinos',
    description: 'Plan de negocios con IA, agentes especializados, prompt designer, noticias y catalogo de 130+ herramientas. Todo gratis.',
    url: 'https://www.tuimpulsalab.com/herramientas',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Herramientas de IA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Herramientas de IA Gratuitas para Negocios Latinos',
    description: 'Plan de negocios con IA, agentes especializados, prompt designer y catalogo de 130+ herramientas. Todo gratis.',
    images: ['/images/og-image.jpg'],
  },
}

export default function HerramientasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
