import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Verificacion WhatsApp',
  description: 'Verificacion de cuenta via WhatsApp.',
  robots: { index: false, follow: false },
}

export default function VerificationWhatsappLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
