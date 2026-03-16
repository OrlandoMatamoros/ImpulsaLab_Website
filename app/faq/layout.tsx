import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes',
  description: 'Respuestas a las preguntas mas frecuentes sobre los servicios de Impulsa Lab, diagnostico 3D, precios y proceso de trabajo.',
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
