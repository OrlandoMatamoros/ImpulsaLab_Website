import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { FirebaseAuthProvider } from '@/contexts/FirebaseAuthContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { AuthTokenProvider } from '@/components/AuthTokenProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WidgetProvider from '@/components/widgets/WidgetProvider'
import CookieBanner from '@/components/CookieBanner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tuimpulsalab.com'),
  title: {
    default: 'Impulsa Lab - Transformacion Digital Empresarial con IA',
    template: '%s | Impulsa Lab',
  },
  description: 'Diagnostico 3D, herramientas de IA, y servicios de consultoria en Finanzas, Operaciones y Marketing para PYMEs.',
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
    siteName: 'Impulsa Lab',
    title: 'Impulsa Lab - Transformacion Digital Empresarial con IA',
    description: 'Diagnostico 3D, herramientas de IA, y servicios de consultoria en Finanzas, Operaciones y Marketing para PYMEs.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Impulsa Lab - Transformacion Digital Empresarial con IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Impulsa Lab - Transformacion Digital Empresarial con IA',
    description: 'Diagnostico 3D, herramientas de IA, y servicios de consultoria en Finanzas, Operaciones y Marketing para PYMEs.',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* JSON-LD Organization + WebSite schema (Google knows who we are and how to search us) */}
        <Script
          id="ld-organization"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': 'https://www.tuimpulsalab.com/#organization',
              name: 'Impulsa Lab',
              legalName: 'Impulsa Lab',
              url: 'https://www.tuimpulsalab.com',
              logo: 'https://www.tuimpulsalab.com/images/og-image.jpg',
              description:
                'Consultoría en transformación digital con IA para PYMEs latinas en EE.UU. Servicios de finanzas, operaciones y marketing potenciados por inteligencia artificial.',
              foundingDate: '2024',
              areaServed: ['US', 'LATAM'],
              knowsLanguage: ['es', 'en'],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                email: 'orlando@tuimpulsalab.com',
                areaServed: ['US', 'LATAM'],
                availableLanguage: ['Spanish', 'English'],
              },
              sameAs: [
                'https://www.linkedin.com/company/impulsa-lab',
              ],
            }),
          }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': 'https://www.tuimpulsalab.com/#website',
              url: 'https://www.tuimpulsalab.com',
              name: 'Impulsa Lab',
              description:
                'Transformación digital empresarial con IA para PYMEs latinas',
              publisher: { '@id': 'https://www.tuimpulsalab.com/#organization' },
              inLanguage: 'es-ES',
            }),
          }}
        />

        {/* Google Ads (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17854811161"
          strategy="afterInteractive"
        />
        <Script id="google-ads-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17854811161');
          `}
        </Script>

        <LanguageProvider>
          <FirebaseAuthProvider>
            <AuthTokenProvider>
              <Header />
              <main className="min-h-screen pt-16">
                {children}
              </main>
              <Footer />
              <WidgetProvider />
            </AuthTokenProvider>
          </FirebaseAuthProvider>
        </LanguageProvider>
        <CookieBanner />
      </body>
    </html>
  )
}