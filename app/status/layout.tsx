import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Estado del Sistema',
  description: 'Verifica el estado actual de los servicios y plataformas de Impulsa Lab en tiempo real.',
}

export default function StatusLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
