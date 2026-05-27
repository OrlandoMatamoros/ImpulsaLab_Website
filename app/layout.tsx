import type { Metadata } from 'next'
import { Manrope, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

// FirebaseProviders is mounted in app/(tools)/layout.tsx only.
// Public routes get clean Server Component trees with all JSON-LD inline.
// useAuth() on public routes returns safe-null defaults (user: null, loading: false).

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
})
const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tuimpulsalab.com'),
  title: {
    default: 'Consultoría en IA para Negocios Latinos en NYC | Impulsa Lab',
    template: '%s | Impulsa Lab',
  },
  description: 'Consultoría en Inteligencia Artificial para negocios latinos en NYC. Agentes IA, bots WhatsApp y flujos n8n. Empieza con tu Diagnóstico 3D gratis.',
  applicationName: 'Impulsa Lab',
  manifest: '/manifest.webmanifest',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    alternateLocale: ['en_US'],
    siteName: 'Impulsa Lab',
    title: 'Consultoría en IA para Negocios Latinos en NYC | Impulsa Lab',
    description: 'Consultoría en Inteligencia Artificial para negocios latinos en NYC. Agentes IA, bots WhatsApp y flujos n8n. Empieza con tu Diagnóstico 3D gratis.',
    url: 'https://www.tuimpulsalab.com/',
    images: [
      {
        url: '/opengraph-image.png?v=2',
        width: 1200,
        height: 630,
        alt: 'Impulsa Lab — Consultoría en IA para Negocios Latinos en NYC',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consultoría en IA para Negocios Latinos en NYC | Impulsa Lab',
    description: 'Consultoría en Inteligencia Artificial para negocios latinos en NYC. Agentes IA, bots WhatsApp y flujos n8n. Empieza con tu Diagnóstico 3D gratis.',
    images: ['/opengraph-image.png?v=2'],
  },
  verification: {
    google: 'SiCheXqFkVDrLLuNSd9wx8zKZ3Pq8LYwTjz1uGeNitg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    copyright: '© 2026 Impulsa Lab LLC',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${manrope.variable} ${geistMono.variable} font-sans`}>
        {/* JSON-LD Organization + WebSite schema — native <script> tags render server-side
            and appear in initial HTML so Google crawlers (which don't execute JS) can parse them. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': 'https://www.tuimpulsalab.com/#organization',
              name: 'Impulsa Lab',
              legalName: 'Impulsa Lab LLC',
              url: 'https://www.tuimpulsalab.com',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.tuimpulsalab.com/images/isotipo-color.png',
              },
              description:
                'Consultoría en transformación digital con IA para PYMEs. Servicios de finanzas, operaciones y marketing potenciados por inteligencia artificial.',
              foundingDate: '2024',
              founder: {
                '@type': 'Person',
                name: 'Orlando Matamoros',
                url: 'https://www.linkedin.com/in/orlando-matamoros',
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'New York',
                addressRegion: 'NY',
                addressCountry: 'US',
              },
              areaServed: [
                { '@type': 'City', name: 'New York City' },
                { '@type': 'Country', name: 'US' },
              ],
              knowsLanguage: ['es', 'en'],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-347-450-9281',
                email: 'contacto@tuimpulsalab.com',
                contactType: 'customer service',
                areaServed: ['US', 'LATAM'],
                availableLanguage: ['Spanish', 'English'],
              },
              sameAs: [
                'https://www.linkedin.com/company/impulsa-lab',
                'https://www.facebook.com/Tuimpulsalab',
                'https://www.instagram.com/tuimpulsalabny/',
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': 'https://www.tuimpulsalab.com/#website',
              url: 'https://www.tuimpulsalab.com',
              name: 'Impulsa Lab',
              description:
                'Transformación digital empresarial con IA para PYMEs',
              publisher: { '@id': 'https://www.tuimpulsalab.com/#organization' },
              inLanguage: 'es-ES',
            }),
          }}
        />

        {/* JSON-LD LocalBusiness (Service Area Business) — no street address per SAB guidelines.
            areaServed: 5 boroughs NYC + Nassau County + Suffolk County + Westchester County.
            Updated TASK-04: 8 explicit service areas for Local SEO. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              '@id': 'https://www.tuimpulsalab.com/#localbusiness',
              name: 'Impulsa Lab',
              url: 'https://www.tuimpulsalab.com',
              telephone: '+1-347-450-9281',
              email: 'contacto@tuimpulsalab.com',
              image: 'https://www.tuimpulsalab.com/images/isotipo-color.png',
              description:
                'Consultoría en IA y automatización para PYMEs latinas en Nueva York. Agentes IA, bots WhatsApp y flujos n8n para negocios en NYC y LATAM.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'New York',
                addressRegion: 'NY',
                postalCode: '12207',
                streetAddress: '54 State Street, Ste 804',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 40.7128,
                longitude: -74.006,
              },
              areaServed: [
                { '@type': 'City', name: 'Manhattan', containedInPlace: { '@type': 'State', name: 'New York' } },
                { '@type': 'City', name: 'Brooklyn', containedInPlace: { '@type': 'State', name: 'New York' } },
                { '@type': 'City', name: 'Queens', containedInPlace: { '@type': 'State', name: 'New York' } },
                { '@type': 'City', name: 'Bronx', containedInPlace: { '@type': 'State', name: 'New York' } },
                { '@type': 'City', name: 'Staten Island', containedInPlace: { '@type': 'State', name: 'New York' } },
                { '@type': 'AdministrativeArea', name: 'Nassau County', containedInPlace: { '@type': 'State', name: 'New York' } },
                { '@type': 'AdministrativeArea', name: 'Suffolk County', containedInPlace: { '@type': 'State', name: 'New York' } },
                { '@type': 'AdministrativeArea', name: 'Westchester County', containedInPlace: { '@type': 'State', name: 'New York' } },
              ],
              priceRange: '$$',
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '09:00',
                closes: '18:00',
              },
              knowsLanguage: ['es', 'en'],
              sameAs: [
                'https://www.linkedin.com/company/impulsa-lab',
                'https://www.facebook.com/Tuimpulsalab',
                'https://www.instagram.com/tuimpulsalabny/',
              ],
            }),
          }}
        />

        {/* Google Ads (gtag.js) — lazyOnload defers loading until browser is idle */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17854811161"
          strategy="lazyOnload"
        />
        <Script id="google-ads-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17854811161');
          `}
        </Script>

        {children}
      </body>
    </html>
  )
}
