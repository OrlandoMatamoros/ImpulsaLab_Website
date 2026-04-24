import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Panel de Consultor',
  description: 'Acceso interno para consultores de Impulsa Lab.',
  robots: { index: false, follow: false },
}

export default function ConsultantLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
