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
          '/login',
          '/signup',
          '/verify-email',
          '/verification',
          '/verification-whatsapp',
          '/unauthorized',
          '/test-whatsapp',
          '/consultant',
          '/diagnostico-interno',
        ],
      },
    ],
    sitemap: 'https://www.tuimpulsalab.com/sitemap.xml',
  }
}
