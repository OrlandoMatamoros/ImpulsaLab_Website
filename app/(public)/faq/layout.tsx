import { Metadata } from 'next'
import { buildBreadcrumbLd } from '@/lib/schema'

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

// Top 8 most general FAQs for structured data — sourced from faq-es.ts
// Criteria: cross-service, no specific pricing figures, max discoverability
const faqSchemaItems = [
  {
    question: '¿Qué es Impulsa Lab?',
    answer:
      'Impulsa Lab es una firma de consultoría de nueva generación con sede en Albany, NY, especializada en democratizar la inteligencia de negocio para pequeñas y medianas empresas (PYMES). Utilizamos inteligencia artificial y análisis de datos para transformar los tres pilares fundamentales de tu negocio: Finanzas, Operaciones y Marketing.',
  },
  {
    question: '¿Qué es el Diagnóstico 3D?',
    answer:
      'El Diagnóstico 3D es nuestra metodología propietaria que evalúa la madurez de tu negocio en tres ejes fundamentales: Finanzas (control y claridad), Operaciones (eficiencia y automatización) y Marketing (identidad y atracción). Este análisis nos permite identificar tu "coordenada" exacta y aplicar soluciones de IA personalizadas que atacan los puntos críticos de tu empresa.',
  },
  {
    question: '¿En qué se diferencia Impulsa Lab de otras consultoras?',
    answer:
      'A diferencia de las consultoras tradicionales que entregan planes estáticos, nosotros implementamos sistemas vivos: dashboards financieros interactivos, agentes de IA que automatizan operaciones y sistemas de marketing que funcionan 24/7. No vendemos el mapa; vendemos el GPS y el combustible para el viaje. Además, nuestros precios son accesibles para PYMES, no solo para grandes corporaciones.',
  },
  {
    question: '¿Necesito conocimientos técnicos para usar las soluciones de IA?',
    answer:
      'No, absolutamente no. Nuestro enfoque es hacer la IA accesible y fácil de usar. Todas nuestras soluciones vienen con capacitación completa y están diseñadas para ser intuitivas. Te enseñamos paso a paso cómo usar cada herramienta, y nuestro soporte continuo asegura que nunca te quedes atascado.',
  },
  {
    question: '¿La IA reemplazará a mis empleados?',
    answer:
      'No, la IA está diseñada para potenciar a tu equipo, no para reemplazarlo. Nuestras soluciones automatizan tareas repetitivas y manuales, liberando tiempo valioso para que tú y tu equipo se enfoquen en actividades estratégicas, creatividad y atención personalizada al cliente. Es como darle superpoderes a tu equipo actual.',
  },
  {
    question: '¿Cómo es el proceso de trabajo con Impulsa Lab?',
    answer:
      'Nuestro proceso es simple: 1) Diagnóstico 3D gratuito (30 min), 2) Propuesta personalizada basada en tus necesidades, 3) Kick-off del proyecto con recopilación de información, 4) Desarrollo e implementación (2-4 semanas), 5) Entrega, capacitación y lanzamiento, 6) Soporte continuo y optimización. Te acompañamos en cada paso.',
  },
  {
    question: '¿Cuánto tiempo toma ver resultados?',
    answer:
      'Los primeros resultados son visibles casi inmediatamente. Con dashboards financieros, tendrás claridad desde el día 1 de implementación. Los agentes de IA comienzan a trabajar en 1-2 semanas. El ROI completo típicamente se ve en 60-90 días, pero muchos clientes reportan mejoras significativas en eficiencia desde la primera semana.',
  },
  {
    question: '¿Qué tipo de soporte ofrecen después de la implementación?',
    answer:
      'Todos nuestros planes incluyen soporte inicial de 30 días. Los planes con suscripción incluyen soporte prioritario continuo, actualizaciones mensuales, y reuniones estratégicas regulares. Además, tienes acceso a nuestra base de conocimientos, tutoriales en video, y respuesta a consultas por email/WhatsApp.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqSchemaItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

const breadcrumbSchema = buildBreadcrumbLd([
  { name: 'Inicio', path: '/' },
  { name: 'Preguntas Frecuentes', path: '/faq' },
])

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  )
}
