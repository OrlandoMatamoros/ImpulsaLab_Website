import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes - Servicios, Precios y Proceso',
  description: 'Respuestas a las preguntas mas frecuentes sobre los servicios de Impulsa Lab, diagnostico 3D, precios y proceso de trabajo con IA.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/faq' },
  openGraph: {
    title: 'Preguntas Frecuentes - Servicios, Precios y Proceso',
    description: 'Respuestas sobre servicios de Impulsa Lab, diagnostico 3D, precios y proceso de trabajo.',
    url: 'https://www.tuimpulsalab.com/faq',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - FAQ' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Preguntas Frecuentes - Servicios, Precios y Proceso',
    description: 'Respuestas sobre servicios de Impulsa Lab, diagnostico 3D, precios y proceso de trabajo.',
    images: ['/images/og-image.jpg'],
  },
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
