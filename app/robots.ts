import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/dashboard/',
          '/api/',
          '/api-docs',
          '/docs/',
          '/status',
          '/login',
          '/signup',
          '/verify-email',
          '/verification',
          '/verification-whatsapp',
          '/unauthorized',
          '/test-whatsapp',
          '/consultant',
          '/diagnostico-interno',
          '/gracias',
          '/partners',
          '/carreras',
          '/recursos/',
          '/herramientas/prompt-designer',
          '/_next/',
          '/__/',
        ],
      },
    ],
    sitemap: 'https://www.tuimpulsalab.com/sitemap.xml',
  }
}
