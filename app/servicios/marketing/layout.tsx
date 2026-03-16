import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Servicios de Marketing Digital con IA',
  description: 'Potencia tu marketing con inteligencia artificial. Contenido automatizado, analisis de audiencia y estrategias data-driven.',
}

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
