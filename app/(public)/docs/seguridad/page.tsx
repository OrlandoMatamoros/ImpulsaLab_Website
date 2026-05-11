import type { Metadata } from 'next'
import EnDesarrolloClient from '@/components/docs/EnDesarrolloClient'

export const metadata: Metadata = {
  title: 'Seguridad | Documentación | Impulsa Lab',
  description: 'Documentación de seguridad de Impulsa Lab. Próximamente disponible.',
  robots: { index: false, follow: false },
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/docs/seguridad',
  },
}

export default function SeguridadPage() {
  return <EnDesarrolloClient />
}
