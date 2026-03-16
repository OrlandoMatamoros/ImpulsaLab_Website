import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Iniciar Sesion',
  description: 'Inicia sesion en tu cuenta de Impulsa Lab para acceder a tu dashboard y herramientas.',
  robots: { index: false, follow: true },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
