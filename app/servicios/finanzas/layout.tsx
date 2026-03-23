import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CFO en tu Excel con IA - Servicios de Finanzas',
  description: 'Automatiza tus procesos financieros con IA. Dashboards inteligentes, proyecciones y analisis de riesgo para tu PYME. Desde $250.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios/finanzas',
  },
}

export default function FinanzasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
