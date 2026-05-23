import { Metadata } from 'next'
import DiagnosticoSEOHero from './components/DiagnosticoSEOHero'

export const metadata: Metadata = {
  title: 'Diagnóstico 3D Gratuito de Madurez Digital para PYMEs',
  description:
    'Evalúa el nivel de madurez digital de tu empresa en Finanzas, Operaciones y Marketing con nuestro diagnóstico gratuito impulsado por IA. 15 minutos, resultados inmediatos.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/diagnostico' },
  openGraph: {
    title: 'Diagnóstico 3D Gratuito de Madurez Digital para PYMEs',
    description:
      'Evalúa tu empresa en Finanzas, Operaciones y Marketing con nuestro diagnóstico gratuito impulsado por IA. 15 minutos, resultados inmediatos.',
    url: 'https://www.tuimpulsalab.com/diagnostico',
    type: 'website',
    images: [{ url: '/opengraph-image.png?v=2', width: 1200, height: 630, alt: 'Impulsa Lab - Diagnóstico 3D' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diagnóstico 3D Gratuito de Madurez Digital para PYMEs',
    description:
      'Evalúa tu empresa en Finanzas, Operaciones y Marketing con nuestro diagnóstico gratuito impulsado por IA. 15 minutos, resultados inmediatos.',
    images: ['/opengraph-image.png?v=2'],
  },
}

export default function DiagnosticoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="diagnostico-layout">
      {/* Bilingual SEO hero — client component reacts to useLanguage().
          First paint on the server renders the default ES content so crawlers
          still see real content; hydration swaps to EN when the user has it. */}
      <DiagnosticoSEOHero />

      {/* JSON-LD Service schema — native <script> renders server-side so crawlers see it.
          Previously used next/script strategy="afterInteractive" which is invisible to bots. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Business Diagnostic Assessment',
            name: 'Diagnóstico 3D de Madurez Digital',
            provider: { '@id': 'https://www.tuimpulsalab.com/#organization' },
            areaServed: ['US', 'LATAM'],
            description:
              'Evaluación gratuita de 15 minutos que analiza la madurez digital de tu PYME en Finanzas, Operaciones y Marketing, con plan de acción personalizado generado por IA.',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            },
            url: 'https://www.tuimpulsalab.com/diagnostico',
          }),
        }}
      />

      {children}
    </div>
  );
}