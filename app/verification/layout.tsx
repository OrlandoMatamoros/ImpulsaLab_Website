import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Verificacion',
  description: 'Pagina de verificacion de cuenta de Impulsa Lab.',
  robots: { index: false, follow: false },
}

export default function VerificationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
