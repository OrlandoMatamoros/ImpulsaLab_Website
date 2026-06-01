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
          '/consultant/',
          '/diagnostico-interno/',
          '/login/',
          '/signup/',
          '/verification/',
          '/verification-whatsapp/',
          '/verify-email/',
          '/unauthorized/',
          '/test-whatsapp/',
          '/status/',
          // Solo bloqueamos data routes; /_next/static/ (CSS/JS/fonts) debe ser
          // rastreable para que Googlebot renderice y evalúe mobile-friendliness.
          // Antes era '/_next/' completo → GSC marcaba los CSS como "Bloqueada por robots.txt".
          '/_next/data/',
          '/__/',
        ],
      },
    ],
    sitemap: 'https://www.tuimpulsalab.com/sitemap.xml',
  }
}
