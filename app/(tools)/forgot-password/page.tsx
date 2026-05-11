import type { Metadata } from 'next'
import ForgotPasswordClient from './ForgotPasswordClient'

export const metadata: Metadata = {
  title: 'Recuperar contraseña | Impulsa Lab',
  description: 'Restablece tu contraseña de Impulsa Lab.',
  robots: { index: false, follow: false },
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />
}
