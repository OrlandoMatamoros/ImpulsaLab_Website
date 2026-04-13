import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const VALID_SOURCES = [
  'business-plan-builder',
  'content-strategist',
  'ask-the-board',
  'web-analyzer',
  'prompt-designer',
  'noticias-newsletter',
] as const

type LeadSource = (typeof VALID_SOURCES)[number]

export const maxDuration = 10

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, source, locale, metadata } = body

    if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
      return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
    }

    if (typeof source !== 'string' || !VALID_SOURCES.includes(source as LeadSource)) {
      return NextResponse.json({ error: 'invalid_source' }, { status: 400 })
    }

    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      'unknown'

    const safeMetadata =
      metadata && typeof metadata === 'object' && !Array.isArray(metadata)
        ? Object.fromEntries(
            Object.entries(metadata)
              .slice(0, 20)
              .map(([k, v]) => [
                String(k).slice(0, 60),
                typeof v === 'string' ? v.slice(0, 500) : v,
              ])
          )
        : {}

    await adminDb.collection('leads').add({
      email: email.trim().toLowerCase(),
      source,
      locale: locale === 'EN' ? 'EN' : 'ES',
      metadata: safeMetadata,
      ip: clientIp,
      userAgent: req.headers.get('user-agent')?.slice(0, 300) || '',
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('leads/capture error:', error)
    // Don't block the caller's happy path on backend failure.
    return NextResponse.json({ success: false }, { status: 200 })
  }
}
