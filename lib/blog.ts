/**
 * Blog filesystem loader — Impulsa Lab (i18n)
 *
 * Reads MDX files from content/blog/{es,en}/*.mdx at build time, parses
 * frontmatter with gray-matter, and exposes a locale-aware API consumed
 * by the /blog routes.
 *
 * URL contract: blog URLs are NOT localized — every post lives under
 * /blog/<slug>. The active locale comes from a cookie (`lang`) read by
 * the server components. If a post is missing in the requested locale,
 * the loader falls back to Spanish and flags `isFallback: true` so the
 * UI can show a banner.
 *
 * Frontmatter schema (required unless noted):
 *   title:     string
 *   excerpt:   string
 *   author:    string
 *   date:      string  (ISO or YYYY-MM-DD)
 *   image:     string  (absolute URL, stable CDN)
 *   category:  string
 *   readTime:  string  (e.g. "8 min")
 *   slug:      string  (should match the file name; same in ES and EN)
 *   featured?: boolean (optional)
 */

import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

export type Locale = 'es' | 'en'

export interface Post {
  slug: string
  title: string
  excerpt: string
  author: string
  date: string
  image: string
  category: string
  readTime: string
  featured?: boolean
  content: string
  /** The locale the file was actually read from. */
  locale: Locale
  /** True when the requested locale was missing and we fell back. */
  isFallback?: boolean
  /** When isFallback=true, the locale we fell back FROM (the requested one). */
  requestedLocale?: Locale
}

const BLOG_ROOT = path.join(process.cwd(), 'content', 'blog')

function dirFor(locale: Locale): string {
  return path.join(BLOG_ROOT, locale)
}

async function readBlogDir(locale: Locale): Promise<string[]> {
  try {
    const entries = await fs.readdir(dirFor(locale))
    return entries.filter((f) => f.endsWith('.mdx'))
  } catch {
    return []
  }
}

function normalize(
  data: Record<string, unknown>,
  fallbackSlug: string,
  content: string,
  locale: Locale,
): Post {
  return {
    slug: String(data.slug || fallbackSlug),
    title: String(data.title || ''),
    excerpt: String(data.excerpt || ''),
    author: String(data.author || 'Impulsa Lab'),
    date: String(data.date || new Date().toISOString()),
    image: String(data.image || ''),
    category: String(data.category || 'General'),
    readTime: String(data.readTime || '5 min'),
    featured: Boolean(data.featured),
    content,
    locale,
  }
}

async function readPostFile(slug: string, locale: Locale): Promise<Post | null> {
  const file = path.join(dirFor(locale), `${slug}.mdx`)
  try {
    const raw = await fs.readFile(file, 'utf-8')
    const { data, content } = matter(raw)
    return normalize(data, slug, content, locale)
  } catch {
    return null
  }
}

/**
 * List posts for a given locale. If a slug only exists in ES while
 * `locale === 'en'` is requested, the ES version is included with
 * `isFallback: true`. Posts only present in EN show normally when EN
 * is requested and are filtered out when ES is requested (since ES is
 * the canonical locale and a missing ES file means the post is not
 * "live" in our master language).
 */
export async function getAllPosts(locale: Locale): Promise<Post[]> {
  const esFiles = await readBlogDir('es')
  const slugs = esFiles.map((f) => f.replace(/\.mdx$/, ''))

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      if (locale === 'es') {
        return readPostFile(slug, 'es')
      }
      // Requested EN: try EN first, fall back to ES with flag
      const en = await readPostFile(slug, 'en')
      if (en) return en
      const es = await readPostFile(slug, 'es')
      if (!es) return null
      return { ...es, isFallback: true, requestedLocale: 'en' as Locale }
    }),
  )

  return posts
    .filter((p): p is Post => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * Load a single post by slug for a locale. Falls back to ES with
 * `isFallback: true` if the requested locale is EN and the EN file
 * is missing. Returns null if neither locale has the post.
 */
export async function getPostBySlug(slug: string, locale: Locale): Promise<Post | null> {
  if (locale === 'es') {
    return readPostFile(slug, 'es')
  }
  const en = await readPostFile(slug, 'en')
  if (en) return en
  const es = await readPostFile(slug, 'es')
  if (!es) return null
  return { ...es, isFallback: true, requestedLocale: 'en' }
}

/**
 * All unique slugs across both locales. Used for `generateStaticParams`
 * — the URL space `/blog/<slug>` is shared by ES and EN.
 */
export async function listSlugs(): Promise<string[]> {
  const [es, en] = await Promise.all([readBlogDir('es'), readBlogDir('en')])
  const all = new Set<string>([
    ...es.map((f) => f.replace(/\.mdx$/, '')),
    ...en.map((f) => f.replace(/\.mdx$/, '')),
  ])
  return Array.from(all)
}
