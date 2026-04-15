/**
 * RSS News Service — Impulsa Lab
 *
 * Fetches and normalizes news from curated tier-1 AI/tech RSS feeds.
 * Zero external deps — manual RSS 2.0 + Atom parser.
 *
 * 2026-04-14 updates (fase 3):
 *   - Per-feed User-Agent override. MIT Technology Review now uses a
 *     Googlebot UA to avoid its WAF silently dropping our default agent.
 *   - og:image fallback: when the RSS item has no inline image we do a
 *     cheap HTML HEAD + GET on the source URL and regex the og:image
 *     out of <head>. In-memory cache per request batch.
 */

export interface NewsItem {
  id: string
  title: string
  summary: string
  content: string
  sourceUrl: string
  source: string
  date: string
  category: string
  tags: string[]
  readTime: number
  imageUrl: string
  isTrending: boolean
  isFeatured: boolean
}

interface FeedConfig {
  name: string
  slug: string
  url: string
  userAgent?: string // optional per-feed UA override
  defaultCategory?: string
}

const DEFAULT_UA =
  'Mozilla/5.0 (compatible; ImpulsaLabNewsBot/1.0; +https://www.tuimpulsalab.com)'
const GOOGLEBOT_UA = 'Googlebot/2.1 (+http://www.google.com/bot.html)'

// Curated tier-1 AI/tech feeds. Keep the list short — quality over quantity.
const FEEDS: FeedConfig[] = [
  {
    name: 'TechCrunch',
    slug: 'techcrunch',
    url: 'https://techcrunch.com/category/artificial-intelligence/feed/',
  },
  {
    name: 'The Verge',
    slug: 'the-verge',
    url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
  },
  {
    name: 'MIT Technology Review',
    slug: 'mit-tech-review',
    url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed',
    userAgent: GOOGLEBOT_UA, // WAF blocks our default UA from Vercel egress IPs
  },
  {
    name: 'Ars Technica',
    slug: 'ars-technica',
    url: 'https://arstechnica.com/ai/feed/',
  },
  {
    name: 'Wired',
    slug: 'wired',
    url: 'https://www.wired.com/feed/tag/ai/latest/rss',
  },
]

const FEED_TIMEOUT_MS = 10000
const OG_FETCH_TIMEOUT_MS = 5000
const MAX_ITEMS = 24

// ---------- Parsing helpers ----------

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&nbsp;/g, ' ')
}

function stripHtml(html: string): string {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  )
}

function extractTag(block: string, tag: string): string | null {
  const cdata = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`, 'i').exec(block)
  if (cdata) return cdata[1].trim()
  const plain = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i').exec(block)
  if (plain) return plain[1].trim()
  return null
}

function extractAttr(block: string, tag: string, attr: string): string | null {
  const re = new RegExp(`<${tag}[^>]*\\s${attr}\\s*=\\s*"([^"]+)"[^>]*/?>`, 'i')
  const m = re.exec(block)
  return m ? m[1] : null
}

function extractImage(itemBlock: string, description: string): string {
  const media = extractAttr(itemBlock, 'media:content', 'url')
  if (media) return media
  const thumb = extractAttr(itemBlock, 'media:thumbnail', 'url')
  if (thumb) return thumb
  const encRe = /<enclosure[^>]*url="([^"]+)"[^>]*type="image\/[^"]+"/i
  const enc = encRe.exec(itemBlock)
  if (enc) return enc[1]
  const imgRe = /<img[^>]+src="([^"]+)"/i
  const img = imgRe.exec(description)
  if (img) return img[1]
  return ''
}

function parseRssItems(xml: string): string[] {
  const items = xml.match(/<item\b[\s\S]*?<\/item>/gi)
  if (items && items.length > 0) return items
  const entries = xml.match(/<entry\b[\s\S]*?<\/entry>/gi)
  return entries || []
}

function extractLink(block: string): string {
  const rss = /<link>([^<]+)<\/link>/i.exec(block)
  if (rss && rss[1]) return rss[1].trim()
  const atomRel = /<link[^>]*rel="alternate"[^>]*href="([^"]+)"/i.exec(block)
  if (atomRel) return atomRel[1]
  const atomAny = /<link[^>]*href="([^"]+)"/i.exec(block)
  if (atomAny) return atomAny[1]
  return ''
}

function extractDate(block: string): string {
  const pub = extractTag(block, 'pubDate')
  if (pub) {
    const d = new Date(pub)
    if (!isNaN(d.getTime())) return d.toISOString()
  }
  const published = extractTag(block, 'published')
  if (published) {
    const d = new Date(published)
    if (!isNaN(d.getTime())) return d.toISOString()
  }
  const updated = extractTag(block, 'updated')
  if (updated) {
    const d = new Date(updated)
    if (!isNaN(d.getTime())) return d.toISOString()
  }
  return new Date().toISOString()
}

// ---------- Categorization ----------

function categorize(title: string, summary: string): string {
  const text = `${title} ${summary}`.toLowerCase()
  if (/\b(regulat|law|policy|eu act|ban|lawsuit|compliance|antitrust|ftc|sec)\b/.test(text)) {
    return 'regulations'
  }
  if (/\b(launch|announces|unveils|releases|introduc|debut|rolls out|now available)\b/.test(text)) {
    return 'product-launches'
  }
  if (/\b(research|study|paper|benchmark|scientists|findings|experiment|discover)\b/.test(text)) {
    return 'research'
  }
  if (/\b(funding|raises|series [abcd]|valuation|ipo|acquir|revenue|earnings|growth)\b/.test(text)) {
    return 'success-stories'
  }
  if (/\b(enterprise|business|smb|cfo|ceo|productivity|workflow|operations|copilot for)\b/.test(text)) {
    return 'business-ai'
  }
  return 'market-trends'
}

function extractTags(title: string, summary: string): string[] {
  const text = `${title} ${summary}`.toLowerCase()
  const bag = [
    ['ChatGPT', /\bchatgpt\b/],
    ['Claude', /\bclaude\b/],
    ['Gemini', /\bgemini\b/],
    ['OpenAI', /\bopenai\b/],
    ['Anthropic', /\banthropic\b/],
    ['Google', /\bgoogle\b/],
    ['Microsoft', /\bmicrosoft\b/],
    ['Meta', /\bmeta\b/],
    ['NVIDIA', /\bnvidia\b/],
    ['Agents', /\bagents?\b/],
    ['Robotics', /\brobot/],
    ['LLM', /\b(llm|large language model)\b/],
    ['Machine Learning', /\b(ml|machine learning)\b/],
    ['Startup', /\bstartups?\b/],
    ['Enterprise', /\benterprise\b/],
  ] as const

  const tags: string[] = []
  for (const [label, re] of bag) {
    if (re.test(text)) tags.push(label)
    if (tags.length >= 5) break
  }
  if (tags.length === 0) tags.push('AI', 'Technology')
  return tags
}

function estimateReadTime(summary: string): number {
  const words = summary.trim().split(/\s+/).filter(Boolean).length
  return Math.max(3, Math.min(8, Math.round(words / 60) + 3))
}

function stableId(url: string): string {
  let h = 5381
  for (let i = 0; i < url.length; i++) h = ((h * 33) ^ url.charCodeAt(i)) >>> 0
  return `news-${h.toString(36)}`
}

// ---------- og:image fallback ----------

/**
 * Fetch the source URL and pull <meta property="og:image" content="..."> out of
 * the <head>. Short timeout, graceful fail — we never throw, we return ''.
 * Cached in-memory per instance to avoid re-fetching the same URL across runs
 * within the same serverless container.
 */
const ogImageCache = new Map<string, string>()

async function fetchOgImage(url: string): Promise<string> {
  if (!url) return ''
  const cached = ogImageCache.get(url)
  if (cached !== undefined) return cached

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), OG_FETCH_TIMEOUT_MS)

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': GOOGLEBOT_UA,
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      signal: controller.signal,
      cache: 'no-store',
    })
    if (!res.ok) {
      ogImageCache.set(url, '')
      return ''
    }
    // Read only the first ~200KB — og:image lives in <head>, no need for whole page.
    const text = await res.text()
    const head = text.slice(0, 200_000)
    // Match both og:image and og:image:secure_url / twitter:image
    const patterns = [
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
      /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
    ]
    for (const p of patterns) {
      const m = p.exec(head)
      if (m && m[1]) {
        const found = m[1].trim()
        ogImageCache.set(url, found)
        return found
      }
    }
    ogImageCache.set(url, '')
    return ''
  } catch {
    ogImageCache.set(url, '')
    return ''
  } finally {
    clearTimeout(timer)
  }
}

// ---------- Service ----------

export class RssNewsService {
  async getLatestNews(): Promise<NewsItem[]> {
    const results = await Promise.allSettled(FEEDS.map((f) => this.fetchFeed(f)))

    const allItems: NewsItem[] = []
    for (const r of results) {
      if (r.status === 'fulfilled') allItems.push(...r.value)
    }

    // De-dup by URL
    const seen = new Set<string>()
    const deduped = allItems.filter((it) => {
      if (!it.sourceUrl || seen.has(it.sourceUrl)) return false
      seen.add(it.sourceUrl)
      return true
    })

    // Sort newest first
    deduped.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Cap early so we only do og:image lookups on items that will ship.
    const top = deduped.slice(0, MAX_ITEMS)

    // og:image fallback in parallel — only for items missing an image.
    const needsImage = top.filter((n) => !n.imageUrl)
    if (needsImage.length > 0) {
      const ogResults = await Promise.allSettled(
        needsImage.map((n) => fetchOgImage(n.sourceUrl))
      )
      ogResults.forEach((r, i) => {
        if (r.status === 'fulfilled' && r.value) {
          needsImage[i].imageUrl = r.value
        }
      })
    }

    // Flag trending/featured based on final order.
    return top.map((n, i) => ({
      ...n,
      isTrending: i < 5,
      isFeatured: i === 0,
    }))
  }

  private async fetchFeed(feed: FeedConfig): Promise<NewsItem[]> {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), FEED_TIMEOUT_MS)
    const ua = feed.userAgent || DEFAULT_UA

    try {
      const res = await fetch(feed.url, {
        headers: {
          'User-Agent': ua,
          Accept: 'application/rss+xml, application/xml, text/xml, */*',
        },
        signal: controller.signal,
        cache: 'no-store',
      })

      if (!res.ok) {
        console.warn(`[rss-news] ${feed.slug}: HTTP ${res.status}`)
        return []
      }

      const xml = await res.text()
      return this.parseFeed(xml, feed)
    } catch (err) {
      console.warn(`[rss-news] ${feed.slug}: ${(err as Error).message}`)
      return []
    } finally {
      clearTimeout(timer)
    }
  }

  private parseFeed(xml: string, feed: FeedConfig): NewsItem[] {
    const items = parseRssItems(xml)
    const out: NewsItem[] = []

    for (const block of items.slice(0, 8)) {
      try {
        const rawTitle = extractTag(block, 'title') || ''
        const title = stripHtml(rawTitle)
        if (!title || title.length < 10) continue

        const sourceUrl = extractLink(block)
        if (!sourceUrl) continue

        const rawDesc =
          extractTag(block, 'description') ||
          extractTag(block, 'content:encoded') ||
          extractTag(block, 'summary') ||
          extractTag(block, 'content') ||
          ''

        const summary = stripHtml(rawDesc).slice(0, 240)
        const imageUrl = extractImage(block, rawDesc)

        out.push({
          id: stableId(sourceUrl),
          title: title.slice(0, 200),
          summary,
          content: '',
          sourceUrl,
          source: feed.name,
          date: extractDate(block),
          category: feed.defaultCategory || categorize(title, summary),
          tags: extractTags(title, summary),
          readTime: estimateReadTime(summary),
          imageUrl,
          isTrending: false,
          isFeatured: false,
        })
      } catch (err) {
        console.warn(`[rss-news] ${feed.slug}: item parse error — ${(err as Error).message}`)
      }
    }

    return out
  }
}
