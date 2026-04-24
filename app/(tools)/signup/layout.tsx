import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crear Cuenta',
  description: 'Crea tu cuenta en Impulsa Lab y comienza tu transformacion digital hoy.',
  robots: { index: false, follow: true },
}

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
