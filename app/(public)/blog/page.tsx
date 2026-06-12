import Link from 'next/link'
import Image from 'next/image'
import { cookies } from 'next/headers'
import type { Metadata } from 'next'
import { FaArrowRight, FaClock, FaUser } from 'react-icons/fa'
import { getAllPosts, type Locale } from '@/lib/blog'

// Server Component — reads MDX from content/blog/{es,en} based on the
// `lang` cookie set by LanguageContext on the client. Because we use
// cookies(), Next renders this route dynamically per request, which is
// exactly what we want for an i18n switch without changing the URL.
export const dynamic = 'force-dynamic'

async function resolveLocale(): Promise<Locale> {
  const c = await cookies()
  const raw = c.get('lang')?.value?.toUpperCase()
  return raw === 'EN' ? 'en' : 'es'
}

const metaByLocale = {
  es: {
    title: 'Blog de Automatización con IA para PYMEs',
    description:
      'Artículos sobre agentes AI, automatización de procesos y arquitectura de negocio para PYMEs que van en serio. Escrito por el equipo de Impulsa Lab.',
  },
  en: {
    title: 'Blog — AI Agents and Automation for SMBs',
    description:
      'Articles on AI agents, process automation, and business architecture for SMBs that mean business. Written by the Impulsa Lab team.',
  },
} as const

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveLocale()
  const m = metaByLocale[locale]
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: 'https://www.tuimpulsalab.com/blog' },
    openGraph: {
      title: m.title,
      description: m.description,
      url: 'https://www.tuimpulsalab.com/blog',
      siteName: 'Impulsa Lab',
      locale: locale === 'en' ? 'en_US' : 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.description,
    },
  }
}

const ui = {
  es: {
    breadcrumbHome: 'Inicio',
    breadcrumbBlog: 'Blog',
    heroTitle: 'Blog Impulsa Lab',
    heroSubtitle: 'Agentes AI, automatización y arquitectura para PYMEs que van en serio.',
    featuredLabel: 'Articulo destacado',
    readMore: 'Leer mas',
    empty: 'Aun no hay articulos publicados.',
    ctaTitle: 'Necesitas ayuda para automatizar tu negocio?',
    ctaSubtitle: 'Agenda un diagnostico gratuito de 20 minutos y sal con un plan claro.',
    ctaPrimary: 'Diagnostico gratuito',
    ctaSecondary: 'Hablar con un experto',
  },
  en: {
    breadcrumbHome: 'Home',
    breadcrumbBlog: 'Blog',
    heroTitle: 'Impulsa Lab Blog',
    heroSubtitle: 'AI agents, automation, and architecture for SMBs that mean business.',
    featuredLabel: 'Featured post',
    readMore: 'Read more',
    empty: 'No posts published yet.',
    ctaTitle: 'Need help automating your business?',
    ctaSubtitle: 'Book a free 20-minute diagnostic and walk away with a clear plan.',
    ctaPrimary: 'Free diagnostic',
    ctaSecondary: 'Talk to an expert',
  },
} as const

export default async function BlogPage() {
  const locale = await resolveLocale()
  const t = ui[locale]
  const posts = await getAllPosts(locale)
  const featured = posts.find((p) => p.featured) || posts[0]
  const rest = posts.filter((p) => p.slug !== featured?.slug)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
              {t.breadcrumbHome}
            </Link>
            <span className="mx-2 text-gray-500" aria-hidden="true">/</span>
            <span className="text-gray-900 font-medium">{t.breadcrumbBlog}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t.heroTitle}</h1>
          <p className="text-xl md:text-2xl mb-2 max-w-3xl mx-auto opacity-95">
            {t.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">{t.featuredLabel}</h2>
            <Link
              href={`/blog/${featured.slug}`}
              className="block bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-full min-h-[300px]">
                  {featured.image ? (
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600" />
                  )}
                </div>
                <div className="p-8 md:p-12">
                  <span className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full mb-4">
                    {featured.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                    {featured.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FaUser className="text-xs" />
                        {featured.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="text-xs" />
                        {featured.readTime}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-2 text-blue-600 font-semibold">
                      {t.readMore}
                      <FaArrowRight className="text-sm" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {rest.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group block"
                >
                  <div className="relative h-48 overflow-hidden">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600" />
                    )}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-white text-xs font-semibold text-gray-700 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FaUser className="text-xs" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="text-xs" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">{t.empty}</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.ctaTitle}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">{t.ctaSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/diagnostico"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              {t.ctaPrimary}
              <FaArrowRight />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              {t.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
