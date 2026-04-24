import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terminos y Condiciones | Impulsa Lab',
  description: 'Terminos y condiciones de uso de los servicios de consultoria digital e IA de Impulsa Lab.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/legal/terminos' },
  openGraph: {
    title: 'Terminos y Condiciones | Impulsa Lab',
    description: 'Terminos y condiciones de uso de los servicios de consultoria digital e IA de Impulsa Lab.',
    url: 'https://www.tuimpulsalab.com/legal/terminos',
    type: 'website',
  },
}

export default function TerminosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
