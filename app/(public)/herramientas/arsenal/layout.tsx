import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arsenal de Herramientas de IA para Negocios',
  description: 'Coleccion curada de herramientas de inteligencia artificial para potenciar cada area de tu negocio: finanzas, operaciones y marketing.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/herramientas/arsenal' },
  openGraph: {
    title: 'Arsenal de Herramientas de IA para Negocios',
    description: 'Coleccion curada de herramientas de IA para potenciar finanzas, operaciones y marketing de tu negocio.',
    url: 'https://www.tuimpulsalab.com/herramientas/arsenal',
    type: 'website',
    images: [{ url: '/opengraph-image.png?v=2', width: 1200, height: 630, alt: 'Impulsa Lab - Arsenal de IA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arsenal de Herramientas de IA para Negocios',
    description: 'Coleccion curada de herramientas de IA para potenciar finanzas, operaciones y marketing de tu negocio.',
    images: ['/opengraph-image.png?v=2'],
  },
}

export default function ArsenalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
