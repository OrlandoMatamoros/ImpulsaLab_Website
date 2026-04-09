import { GmailNewsService } from '@/lib/gmail-news-service'
import NoticiasInteractive, { type NewsItem } from './NoticiasInteractive'

// ISR: regenerate at most every hour. Combined with the client-side
// refresh inside NoticiasInteractive (every 60 min while tab is open), this
// keeps the news current without hammering Gmail on every request.
export const revalidate = 3600

async function getInitialNews(): Promise<NewsItem[]> {
  try {
    const service = new GmailNewsService()
    const news = await service.getLatestNews()
    return Array.isArray(news) ? news : []
  } catch (error) {
    // If Gmail credentials are missing or the API fails, render an empty
    // grid rather than crashing the page. The interactive component handles
    // the empty state gracefully.
    console.error('[noticias/page] Failed to fetch news server-side:', error)
    return []
  }
}

export default async function NoticiasPage() {
  const initialNews = await getInitialNews()
  return <NoticiasInteractive initialNews={initialNews} />
}
