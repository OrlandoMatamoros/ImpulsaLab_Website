import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terminos y Condiciones',
  description: 'Terminos y condiciones de uso de los servicios de Impulsa Lab.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/legal/terminos' },
}

export default function TerminosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
