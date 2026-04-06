import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Noticias de IA y Tecnologia para Negocios | Impulsa Lab',
  description: 'Ultimas noticias curadas sobre inteligencia artificial, automatizacion y tecnologia aplicada a negocios latinos. Actualizado diariamente.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/herramientas/noticias' },
  openGraph: {
    title: 'Noticias de IA y Tecnologia para Negocios',
    description: 'Noticias curadas sobre IA, automatizacion y tecnologia aplicada a negocios. Actualizado diariamente.',
    url: 'https://www.tuimpulsalab.com/herramientas/noticias',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Noticias de IA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noticias de IA y Tecnologia para Negocios',
    description: 'Noticias curadas sobre IA, automatizacion y tecnologia aplicada a negocios. Actualizado diariamente.',
    images: ['/images/og-image.jpg'],
  },
}

export default function NoticiasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
