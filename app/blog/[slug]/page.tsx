import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getPostBySlug, listSlugs } from '@/lib/blog'
import BlogPostContent from './BlogPostContent'

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
  const post = await getPostBySlug(slug)

  if (!post) return {}

  const url = `https://www.tuimpulsalab.com/blog/${slug}`
  const image = post.image || '/images/og-image.jpg'

  return {
    title: `${post.title} | Blog Impulsa Lab`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: 'article',
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
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  return <BlogPostContent post={post} />
}
