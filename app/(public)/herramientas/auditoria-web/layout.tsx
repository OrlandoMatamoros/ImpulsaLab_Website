import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Auditoria Web',
  description: 'Herramienta interna - Auditoria web inteligente con IA',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AuditoriaWebLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
