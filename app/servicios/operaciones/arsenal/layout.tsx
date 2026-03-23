import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arsenal de Automatizacion - Herramientas y Plataformas IA',
  description: 'Conoce las herramientas de automatizacion que usamos: desde email marketing hasta CRM inteligente. Soluciones probadas para PYMEs latinoamericanas.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios/operaciones/arsenal',
  },
}

export default function ArsenalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
