import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agentes de IA para Negocios - Automatizacion Inteligente',
  description: 'Implementa agentes de inteligencia artificial que automatizan tareas repetitivas, atienden clientes y optimizan operaciones de tu PYME 24/7.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios/operaciones/agentes',
  },
}

export default function AgentesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
