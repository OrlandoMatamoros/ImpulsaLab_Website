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
          '/_next/',
          '/__/',
        ],
      },
    ],
    sitemap: 'https://www.tuimpulsalab.com/sitemap.xml',
  }
}
