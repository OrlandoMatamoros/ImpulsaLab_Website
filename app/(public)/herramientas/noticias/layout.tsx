import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Noticias de IA para PYMEs Latinas — Curadas con IA | Impulsa Lab',
  description: 'Últimas noticias curadas sobre inteligencia artificial, automatización y tecnología aplicada a negocios latinos. Actualizado diariamente.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/herramientas/noticias' },
  openGraph: {
    title: 'Noticias de IA para PYMEs Latinas — Curadas con IA | Impulsa Lab',
    description: 'Últimas noticias curadas sobre inteligencia artificial, automatización y tecnología aplicada a negocios latinos. Actualizado diariamente.',
    url: 'https://www.tuimpulsalab.com/herramientas/noticias',
    type: 'website',
    images: [{ url: '/opengraph-image.png?v=2', width: 1200, height: 630, alt: 'Impulsa Lab - Noticias de IA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noticias de IA para PYMEs Latinas — Curadas con IA | Impulsa Lab',
    description: 'Últimas noticias curadas sobre inteligencia artificial, automatización y tecnología aplicada a negocios latinos. Actualizado diariamente.',
    images: ['/opengraph-image.png?v=2'],
  },
}

export default function NoticiasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
