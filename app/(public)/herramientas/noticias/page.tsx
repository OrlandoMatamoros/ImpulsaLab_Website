import type { Metadata } from 'next'
import { RssNewsService } from '@/lib/rss-news-service'
import NoticiasInteractive, { type NewsItem } from './NoticiasInteractive'

// noindex: CTR is 0% on irrelevant queries (tech news, not our services).
// follow:true preserves crawl budget for outbound links inside the page.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
}

// ISR: regenerate at most every hour. Combined with the client-side
// refresh inside NoticiasInteractive (every 60 min while tab is open), this
// keeps the news current without hammering the upstream feeds on every request.
export const revalidate = 3600

async function getInitialNews(): Promise<NewsItem[]> {
  try {
    const service = new RssNewsService()
    const news = await service.getLatestNews()
    return Array.isArray(news) ? news : []
  } catch (error) {
    // If every feed is down or the service throws, render an empty grid
    // rather than crashing the page. The interactive component handles the
    // empty state gracefully.
    console.error('[noticias/page] Failed to fetch news server-side:', error)
    return []
  }
}

export default async function NoticiasPage() {
  const initialNews = await getInitialNews()
  return <NoticiasInteractive initialNews={initialNews} />
}
