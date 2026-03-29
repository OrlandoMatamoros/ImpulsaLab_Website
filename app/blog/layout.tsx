import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Articulos sobre IA y Transformacion Digital',
  description: 'Articulos, guias y noticias sobre inteligencia artificial, automatizacion y transformacion digital para negocios latinos en EE.UU.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/blog' },
  openGraph: {
    title: 'Blog - Articulos sobre IA y Transformacion Digital',
    description: 'Guias y noticias sobre inteligencia artificial, automatizacion y transformacion digital para negocios.',
    url: 'https://www.tuimpulsalab.com/blog',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Articulos sobre IA y Transformacion Digital',
    description: 'Guias y noticias sobre inteligencia artificial, automatizacion y transformacion digital para negocios.',
    images: ['/images/og-image.jpg'],
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
