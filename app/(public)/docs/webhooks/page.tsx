import type { Metadata } from 'next'
import EnDesarrolloClient from '@/components/docs/EnDesarrolloClient'

export const metadata: Metadata = {
  title: 'Webhooks | Documentación | Impulsa Lab',
  description: 'Documentación de webhooks de Impulsa Lab. Próximamente disponible.',
  robots: { index: false, follow: false },
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/docs/webhooks',
  },
}

export default function WebhooksPage() {
  return <EnDesarrolloClient />
}
