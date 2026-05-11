import type { Metadata } from 'next'
import EnDesarrolloClient from '@/components/docs/EnDesarrolloClient'

export const metadata: Metadata = {
  title: 'Integraciones',
  description: 'Documentación de integraciones de Impulsa Lab. Próximamente disponible.',
  robots: { index: false, follow: false },
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/docs/integraciones',
  },
}

export default function IntegracionesPage() {
  return <EnDesarrolloClient />
}
