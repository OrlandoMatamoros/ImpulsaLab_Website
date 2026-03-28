import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politica de Privacidad',
  description: 'Politica de privacidad de Impulsa Lab. Como protegemos y manejamos tus datos personales.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/legal/privacidad' },
}

export default function PrivacidadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
