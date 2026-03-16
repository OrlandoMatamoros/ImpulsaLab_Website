import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Servicios de Finanzas - Nova Finance',
  description: 'Automatiza tus procesos financieros con IA. Proyecciones, analisis de riesgo y dashboards inteligentes para tu PYME.',
}

export default function FinanzasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
