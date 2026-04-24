import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gracias por Contactarnos',
  description: 'Hemos recibido tu mensaje. Un consultor de Impulsa Lab se pondra en contacto contigo pronto.',
  robots: { index: false, follow: true },
}

export default function GraciasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
