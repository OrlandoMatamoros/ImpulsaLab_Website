import type { Metadata } from 'next'
import EnDesarrolloClient from '@/components/docs/EnDesarrolloClient'

export const metadata: Metadata = {
  title: 'Documentaci\u00f3n',
  description: 'Documentaci\u00f3n de Impulsa Lab. Pr\u00f3ximamente disponible.',
  robots: { index: false, follow: false },
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/docs',
  },
}

export default function DocsPage() {
  return <EnDesarrolloClient />
}
