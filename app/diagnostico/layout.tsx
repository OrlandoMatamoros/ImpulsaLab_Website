import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Diagnostico 3D Gratuito de Madurez Digital para PYMEs',
  description: 'Evalua el nivel de madurez digital de tu empresa en Finanzas, Operaciones y Marketing con nuestro diagnostico gratuito impulsado por IA.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/diagnostico' },
  openGraph: {
    title: 'Diagnostico 3D Gratuito de Madurez Digital para PYMEs',
    description: 'Evalua tu empresa en Finanzas, Operaciones y Marketing con nuestro diagnostico gratuito impulsado por IA.',
    url: 'https://www.tuimpulsalab.com/diagnostico',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Diagnostico 3D' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diagnostico 3D Gratuito de Madurez Digital para PYMEs',
    description: 'Evalua tu empresa en Finanzas, Operaciones y Marketing con nuestro diagnostico gratuito impulsado por IA.',
    images: ['/images/og-image.jpg'],
  },
}

export default function DiagnosticoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="diagnostico-layout">
      {children}
    </div>
  );
}