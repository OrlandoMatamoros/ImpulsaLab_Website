import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Verificar Email',
  description: 'Verifica tu direccion de correo electronico para activar tu cuenta de Impulsa Lab.',
  robots: { index: false, follow: false },
}

export default function VerifyEmailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
