import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Docs',
  description: 'Documentacion de la API de Impulsa Lab para integraciones y automatizaciones empresariales.',
}

export default function ApiDocsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
