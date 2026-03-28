import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Noticias de IA y Tecnologia',
  description: 'Ultimas noticias sobre inteligencia artificial, automatizacion y tecnologia para negocios.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/herramientas/noticias' },
}

export default function NoticiasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
