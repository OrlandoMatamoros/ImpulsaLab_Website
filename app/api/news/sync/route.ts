import { NextResponse } from 'next/server'
import { RssNewsService } from '@/lib/rss-news-service'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

export async function GET() {
  try {
    const service = new RssNewsService()
    const news = await service.getLatestNews()
    return NextResponse.json(news)
  } catch (error) {
    console.error('[news/sync] error:', error)
    return NextResponse.json({ error: 'news_sync_failed' }, { status: 500 })
  }
}

export async function POST() {
  return GET()
}
