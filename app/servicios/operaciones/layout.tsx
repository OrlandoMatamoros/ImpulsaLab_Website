import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Servicios de Operaciones - Automatizacion con IA',
  description: 'Optimiza las operaciones de tu negocio con agentes de IA, automatizacion de procesos y plataformas inteligentes. Desde $200 por automatizacion.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios/operaciones',
  },
}

export default function OperacionesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
