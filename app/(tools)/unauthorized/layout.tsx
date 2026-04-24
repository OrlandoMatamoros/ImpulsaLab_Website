import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Acceso No Autorizado',
  description: 'No tienes permisos para acceder a esta pagina.',
  robots: { index: false, follow: false },
}

export default function UnauthorizedLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
