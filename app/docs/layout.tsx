import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documentacion',
  description: 'Documentacion tecnica de Impulsa Lab: API, integraciones, webhooks y seguridad para desarrolladores.',
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
