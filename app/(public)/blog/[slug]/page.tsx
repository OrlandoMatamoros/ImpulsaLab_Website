import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import { Metadata } from 'next'
import { getPostBySlug, listSlugs, type Locale } from '@/lib/blog'
import BlogPostContent from './BlogPostContent'

// Per-request locale resolution from the `lang` cookie set by the
// LanguageContext on the client.
export const dynamic = 'force-dynamic'

async function resolveLocale(): Promise<Locale> {
  const c = await cookies()
  const raw = c.get('lang')?.value?.toUpperCase()
  return raw === 'EN' ? 'en' : 'es'
}

export async function generateStaticParams() {
  const slugs = await listSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const locale = await resolveLocale()
  const post = await getPostBySlug(slug, locale)

  if (!post) return {}

  const url = `https://www.tuimpulsalab.com/blog/${slug}`
  const image = post.image || '/images/og-image.jpg'
  const blogLabel = post.locale === 'en' ? 'Impulsa Lab Blog' : 'Blog Impulsa Lab'

  return {
    title: `${post.title} | ${blogLabel}`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: 'article',
      locale: post.locale === 'en' ? 'en_US' : 'es_ES',
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const locale = await resolveLocale()
  const post = await getPostBySlug(slug, locale)

  if (!post) return notFound()

  return <BlogPostContent post={post} requestedLocale={locale} />
}
