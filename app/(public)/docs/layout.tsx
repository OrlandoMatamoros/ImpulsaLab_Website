import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Documentacion | Impulsa Lab',
    template: '%s | Documentacion | Impulsa Lab',
  },
  description: 'Documentacion tecnica de Impulsa Lab: API, integraciones, webhooks y seguridad para desarrolladores.',
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
