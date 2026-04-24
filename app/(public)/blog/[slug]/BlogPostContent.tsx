import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { FaArrowLeft, FaClock, FaUser, FaCalendar, FaArrowRight } from 'react-icons/fa'
import type { Post, Locale } from '@/lib/blog'

// Server Component — renders MDX with Tailwind prose styling.
// next-mdx-remote/rsc compiles MDX at request/build time; no client bundle.

const mdxComponents = {
  h2: (props: React.ComponentProps<'h2'>) => (
    <h2 className="text-3xl font-bold mt-12 mb-4 text-gray-900" {...props} />
  ),
  h3: (props: React.ComponentProps<'h3'>) => (
    <h3 className="text-2xl font-bold mt-8 mb-3 text-gray-900" {...props} />
  ),
  p: (props: React.ComponentProps<'p'>) => (
    <p className="my-5 text-gray-700 leading-relaxed text-lg" {...props} />
  ),
  a: (props: React.ComponentProps<'a'>) => (
    <a className="text-blue-600 underline hover:text-blue-800" {...props} />
  ),
  ul: (props: React.ComponentProps<'ul'>) => (
    <ul className="my-5 list-disc list-inside space-y-2 text-gray-700 text-lg" {...props} />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol className="my-5 list-decimal list-inside space-y-2 text-gray-700 text-lg" {...props} />
  ),
  li: (props: React.ComponentProps<'li'>) => <li className="leading-relaxed" {...props} />,
  strong: (props: React.ComponentProps<'strong'>) => (
    <strong className="font-semibold text-gray-900" {...props} />
  ),
  blockquote: (props: React.ComponentProps<'blockquote'>) => (
    <blockquote
      className="border-l-4 border-blue-600 pl-6 my-6 italic text-gray-700 bg-blue-50 py-4 rounded-r"
      {...props}
    />
  ),
  code: (props: React.ComponentProps<'code'>) => (
    <code className="bg-gray-100 text-pink-700 px-1.5 py-0.5 rounded text-sm" {...props} />
  ),
  pre: (props: React.ComponentProps<'pre'>) => (
    <pre
      className="bg-gray-900 text-gray-100 rounded-lg p-4 my-6 overflow-x-auto text-sm"
      {...props}
    />
  ),
  hr: (props: React.ComponentProps<'hr'>) => (
    <hr className="my-10 border-gray-300" {...props} />
  ),
  table: (props: React.ComponentProps<'table'>) => (
    <div className="my-6 overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200" {...props} />
    </div>
  ),
  th: (props: React.ComponentProps<'th'>) => (
    <th
      className="border border-gray-200 bg-gray-50 px-4 py-2 text-left font-semibold text-gray-900"
      {...props}
    />
  ),
  td: (props: React.ComponentProps<'td'>) => (
    <td className="border border-gray-200 px-4 py-2 text-gray-700" {...props} />
  ),
}

const ui = {
  es: {
    back: 'Volver al blog',
    ctaTitle: 'Listo para automatizar lo que lees aqui?',
    ctaSubtitle: 'Agenda un diagnostico gratuito de 20 minutos y sal con un plan concreto.',
    ctaPrimary: 'Diagnostico gratuito',
    ctaSecondary: 'Ver mas articulos',
    fallbackBanner:
      'Esta nota aun no esta disponible en ingles. Mostrando version en espanol.',
    dateLocale: 'es-ES',
  },
  en: {
    back: 'Back to blog',
    ctaTitle: 'Ready to automate what you just read?',
    ctaSubtitle: 'Book a free 20-minute diagnostic and walk away with a concrete plan.',
    ctaPrimary: 'Free diagnostic',
    ctaSecondary: 'See more posts',
    fallbackBanner: 'This post is not yet available in English. Showing Spanish version.',
    dateLocale: 'en-US',
  },
} as const

function formatDate(iso: string, dateLocale: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString(dateLocale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}

export default function BlogPostContent({
  post,
  requestedLocale,
}: {
  post: Post
  /** Locale the user asked for; may differ from `post.locale` when falling back. */
  requestedLocale: Locale
}) {
  // UI chrome should follow the user's chosen language even when the
  // body falls back to ES — that way an EN visitor sees an EN banner
  // explaining why the article is in Spanish.
  const t = ui[requestedLocale]
  const showFallbackBanner = post.isFallback === true

  return (
    <article className="min-h-screen bg-white">
      {/* Top nav */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            {t.back}
          </Link>
        </div>
      </div>

      {/* Hero image */}
      {post.image && (
        <div className="w-full h-[420px] relative overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        </div>
      )}

      {/* Header */}
      <header className="container mx-auto px-4 max-w-3xl pt-12">
        {showFallbackBanner && (
          <div
            role="status"
            className="mb-6 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700"
          >
            {t.fallbackBanner}
          </div>
        )}
        <span className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full mb-4">
          {post.category}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">{post.excerpt}</p>
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 pb-8 border-b">
          <span className="flex items-center gap-2">
            <FaUser />
            {post.author}
          </span>
          <span className="flex items-center gap-2">
            <FaCalendar />
            {formatDate(post.date, t.dateLocale)}
          </span>
          <span className="flex items-center gap-2">
            <FaClock />
            {post.readTime}
          </span>
        </div>
      </header>

      {/* Body */}
      <div className="container mx-auto px-4 max-w-3xl pb-16">
        <div className="prose prose-lg max-w-none">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">{t.ctaTitle}</h2>
          <p className="text-xl mb-8 opacity-95">{t.ctaSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/diagnostico"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all"
            >
              {t.ctaPrimary}
              <FaArrowRight />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              {t.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
