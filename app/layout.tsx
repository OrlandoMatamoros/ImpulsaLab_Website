import type { Metadata } from 'next'
import { Manrope, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import { FirebaseProviders } from '@/components/FirebaseProviders'
import './globals.css'

// FirebaseProviders is a 'use client' component that internally uses
// dynamic({ ssr: false }) to keep Firebase SDK out of the SSR payload.
// Mounting it here at root ensures auth state persists across all route groups
// ((public) and (tools)) — no more "logged-out on navigate to /" bug.

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
    default: 'Impulsa Lab — IA y Automatización para PYMEs',
    template: '%s | Impulsa Lab',
  },
  description: 'Diagnóstico 3D gratuito, agentes de IA y consultoría en Finanzas, Operaciones y Marketing. Transformación digital para PYMEs con resultados medibles.',
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
    title: 'Impulsa Lab — IA y Automatización para PYMEs',
    description: 'Diagnóstico 3D gratuito, agentes de IA y consultoría en Finanzas, Operaciones y Marketing. Transformación digital para PYMEs con resultados medibles.',
    url: 'https://www.tuimpulsalab.com/',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Impulsa Lab — IA y Automatización para PYMEs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Impulsa Lab — IA y Automatización para PYMEs',
    description: 'Diagnóstico 3D gratuito, agentes de IA y consultoría en Finanzas, Operaciones y Marketing. Transformación digital para PYMEs con resultados medibles.',
    images: ['/images/og-image.jpg'],
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
                streetAddress: '118-35 Queens Blvd #400',
                addressLocality: 'Forest Hills',
                addressRegion: 'NY',
                postalCode: '11375',
                addressCountry: 'US',
              },
              areaServed: ['US', 'LATAM'],
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

        <FirebaseProviders>{children}</FirebaseProviders>
      </body>
    </html>
  )
}
