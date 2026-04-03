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
          '/docs/',
          '/recursos/',
          '/_next/',
          '/__/',
        ],
      },
    ],
    sitemap: 'https://www.tuimpulsalab.com/sitemap.xml',
  }
}
