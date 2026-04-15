/**
 * Blog filesystem loader — Impulsa Lab
 *
 * Reads MDX files from content/blog/*.mdx at build time, parses frontmatter
 * with gray-matter, and exposes a tiny API used by the /blog routes.
 *
 * Frontmatter schema (required unless noted):
 *   title:     string
 *   excerpt:   string
 *   author:    string
 *   date:      string  (ISO or YYYY-MM-DD)
 *   image:     string  (absolute URL, stable CDN — no random keywords)
 *   category:  string
 *   readTime:  string  (e.g. "8 min")
 *   slug:      string  (should match the file name)
 *   featured?: boolean (optional)
 */

import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

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
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

async function readBlogDir(): Promise<string[]> {
  try {
    const entries = await fs.readdir(BLOG_DIR)
    return entries.filter((f) => f.endsWith('.mdx'))
  } catch {
    return []
  }
}

function normalize(data: Record<string, unknown>, fallbackSlug: string, content: string): Post {
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
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const files = await readBlogDir()
  const posts = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(BLOG_DIR, file), 'utf-8')
      const { data, content } = matter(raw)
      const slug = file.replace(/\.mdx$/, '')
      return normalize(data, slug, content)
    })
  )
  // Newest first
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const file = path.join(BLOG_DIR, `${slug}.mdx`)
  try {
    const raw = await fs.readFile(file, 'utf-8')
    const { data, content } = matter(raw)
    return normalize(data, slug, content)
  } catch {
    return null
  }
}

export async function listSlugs(): Promise<string[]> {
  const files = await readBlogDir()
  return files.map((f) => f.replace(/\.mdx$/, ''))
}
