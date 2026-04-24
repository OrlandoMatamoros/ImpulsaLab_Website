import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Test WhatsApp',
  description: 'Pagina de prueba de integracion WhatsApp.',
  robots: { index: false, follow: false },
}

export default function TestWhatsappLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
