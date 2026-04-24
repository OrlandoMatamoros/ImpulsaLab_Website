import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Junta Estratégica AI — Sesión | Impulsa Lab',
  description: 'Herramienta interna - Junta Estratégica AI multi-modelo',
  robots: {
    index: false,
    follow: false,
  },
}

export default function JuntaEstrategicaAppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
