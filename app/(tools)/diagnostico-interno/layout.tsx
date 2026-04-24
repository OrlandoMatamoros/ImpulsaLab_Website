import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Diagnostico Interno',
  description: 'Herramienta de diagnostico interno para consultores.',
  robots: { index: false, follow: false },
}

export default function DiagnosticoInternoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
