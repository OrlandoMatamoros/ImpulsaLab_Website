import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Noticias y Articulos sobre IA y Transformacion Digital',
  description: 'Articulos, guias y noticias sobre inteligencia artificial, automatizacion y transformacion digital para negocios.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/blog' },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
