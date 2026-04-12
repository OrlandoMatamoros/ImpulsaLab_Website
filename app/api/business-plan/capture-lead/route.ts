import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const maxDuration = 10

export async function POST(req: NextRequest) {
  try {
    const { email, businessName, locale } = await req.json()

    if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
      return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
    }

    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      'unknown'

    await adminDb.collection('business_plan_leads').add({
      email: email.trim().toLowerCase(),
      businessName: typeof businessName === 'string' ? businessName.slice(0, 200) : '',
      locale: locale === 'EN' ? 'EN' : 'ES',
      source: 'business-plan-builder',
      ip: clientIp,
      userAgent: req.headers.get('user-agent')?.slice(0, 300) || '',
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('capture-lead error:', error)
    // Don't block the user's PDF download on backend failure.
    return NextResponse.json({ success: false }, { status: 200 })
  }
}
