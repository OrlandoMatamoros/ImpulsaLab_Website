import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agentes de IA - ImpulsaLab',
  description: 'Asistentes de IA especializados para cada área de tu negocio',
  alternates: { canonical: 'https://www.tuimpulsalab.com/herramientas/agentes' },
}

export default function AgentesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}