import type { Metadata } from 'next'
import EnDesarrolloClient from '@/components/docs/EnDesarrolloClient'

export const metadata: Metadata = {
  title: 'API Docs',
  description: 'Documentaci\u00f3n de API de Impulsa Lab. Pr\u00f3ximamente disponible.',
  robots: { index: false, follow: false },
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/docs/api',
  },
}

export default function DocsApiPage() {
  return <EnDesarrolloClient />
}
