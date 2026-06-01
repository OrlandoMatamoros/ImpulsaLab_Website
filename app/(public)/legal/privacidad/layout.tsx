import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politica de Privacidad',
  description: 'Politica de privacidad de Impulsa Lab. Como protegemos y manejamos tus datos personales de forma segura y transparente.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/legal/privacidad' },
  openGraph: {
    title: 'Politica de Privacidad | Impulsa Lab',
    description: 'Como protegemos y manejamos tus datos personales de forma segura y transparente.',
    url: 'https://www.tuimpulsalab.com/legal/privacidad',
    type: 'website',
  },
}

export default function PrivacidadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
