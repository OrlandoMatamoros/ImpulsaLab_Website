import { Metadata } from 'next'
import Script from 'next/script'

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
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Diagnóstico 3D' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diagnóstico 3D Gratuito de Madurez Digital para PYMEs',
    description:
      'Evalúa tu empresa en Finanzas, Operaciones y Marketing con nuestro diagnóstico gratuito impulsado por IA. 15 minutos, resultados inmediatos.',
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
      {/* Server-rendered SEO hero — ensures crawlers see real content even when
          the interactive wizard below is hydrated only on the client. This is
          visible to users too (not hidden) so it does not count as cloaking. */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-12 border-b border-gray-200" aria-labelledby="diagnostico-h1">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 id="diagnostico-h1" className="text-4xl md:text-5xl font-bold text-[#002D62] mb-6">
            Diagnóstico 3D Gratuito de Madurez Digital para tu PYME
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            El Diagnóstico 3D de Impulsa Lab es una evaluación gratuita de 15 minutos
            que analiza el nivel de madurez digital de tu empresa en tres dimensiones
            críticas: <strong>Finanzas</strong>, <strong>Operaciones</strong> y{' '}
            <strong>Marketing</strong>. Diseñado para pequeñas y medianas empresas
            que quieren entender dónde están parados y qué pasos concretos tomar
            para crecer con inteligencia artificial y automatización.
          </p>
          <h2 className="text-2xl font-semibold text-[#002D62] mt-8 mb-4">
            ¿Qué obtienes al completar el diagnóstico?
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>
              <strong>Radar 3D visual</strong> de tu madurez digital en Finanzas,
              Operaciones y Marketing, con score de 0 a 100 en cada dimensión.
            </li>
            <li>
              <strong>Identificación de brechas críticas</strong> — qué procesos te
              están costando tiempo y dinero, y cuáles automatizar primero para
              maximizar ROI.
            </li>
            <li>
              <strong>Plan de acción personalizado</strong> generado por IA con las
              3-5 primeras iniciativas que debes ejecutar en los próximos 90 días.
            </li>
            <li>
              <strong>Comparativa con PYMEs similares</strong> — dónde estás
              respecto a tu industria y tamaño.
            </li>
            <li>
              <strong>Recursos recomendados</strong> — herramientas, guías y
              servicios de Impulsa Lab alineados con tus brechas específicas.
            </li>
          </ul>
          <h2 className="text-2xl font-semibold text-[#002D62] mt-8 mb-4">
            ¿Cómo funciona el Diagnóstico 3D?
          </h2>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-6">
            <li>
              <strong>Respondes 18 preguntas</strong> sobre cómo opera hoy tu
              empresa en las tres dimensiones. No hay respuestas correctas o
              incorrectas — solo honestidad sobre tu realidad actual.
            </li>
            <li>
              <strong>Nuestra IA analiza tus respuestas</strong> contra un
              benchmark de más de 500 PYMEs evaluadas por Impulsa Lab.
            </li>
            <li>
              <strong>Recibes tu reporte 3D al instante</strong> en pantalla, con
              opción de descargarlo en PDF y recibir una copia por email.
            </li>
            <li>
              <strong>Opcional:</strong> agenda una llamada gratuita de 30 minutos
              con nuestro equipo para revisar tu reporte y definir próximos pasos.
            </li>
          </ol>
          <p className="text-lg text-gray-700 mb-4">
            Más de <strong>500 dueños de PYMEs</strong> en Estados Unidos y
            Latinoamérica ya completaron su Diagnóstico 3D. Es 100% gratis, no
            requiere tarjeta de crédito, y los resultados son tuyos sin
            compromiso. Empieza ahora mismo y en 15 minutos sabrás exactamente
            cuánto potencial de crecimiento tiene tu empresa y por dónde
            empezar.
          </p>
        </div>
      </section>

      {/* JSON-LD WebPage schema for the Diagnostico — tells Google this is a Service page */}
      <Script
        id="ld-diagnostico"
        type="application/ld+json"
        strategy="afterInteractive"
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