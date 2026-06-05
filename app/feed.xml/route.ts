/**
 * RSS 2.0 feed for the Impulsa Lab blog — served at /feed.xml
 *
 * Built from the same MDX source as /blog (lib/blog.ts, ES = canonical
 * locale). Used for syndication / auto-posting to LinkedIn and other
 * channels, and for RSS auto-discovery from the blog <head>.
 */
import { getAllPosts } from '@/lib/blog'

export const dynamic = 'force-static'

const SITE = 'https://www.tuimpulsalab.com'

function esc(s: string): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const posts = await getAllPosts('es')
  const now = new Date().toUTCString()

  const items = posts
    .map((p) => {
      const link = `${SITE}/blog/${p.slug}`
      const pub = new Date(p.date).toUTCString()
      const imgUrl = p.image
        ? p.image.startsWith('http')
          ? p.image
          : `${SITE}${p.image.startsWith('/') ? '' : '/'}${p.image}`
        : ''
      const enclosure = imgUrl
        ? `\n      <enclosure url="${esc(imgUrl)}" type="image/jpeg" />`
        : ''
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pub}</pubDate>
      <category>${esc(p.category)}</category>
      <dc:creator>${esc(p.author)}</dc:creator>
      <description>${esc(p.excerpt)}</description>${enclosure}
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Impulsa Lab — Blog</title>
    <link>${SITE}/blog</link>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
    <description>IA, automatización y transformación digital para PYMEs latinas en EE.UU. Nuevos contenidos cada semana en Impulsa Lab.</description>
    <language>es</language>
    <lastBuildDate>${now}</lastBuildDate>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
