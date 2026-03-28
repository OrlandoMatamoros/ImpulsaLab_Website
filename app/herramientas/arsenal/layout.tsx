import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arsenal de Herramientas de IA',
  description: 'Coleccion curada de herramientas de inteligencia artificial para potenciar cada area de tu negocio.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/herramientas/arsenal' },
}

export default function ArsenalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
