import { AI_MODELS } from '@/lib/ai-models'
import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { adminDb } from '@/lib/firebase-admin'

export const maxDuration = 60

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const RATE_LIMIT_MAX = 5
const ipHits = new Map<string, number[]>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const hits = ipHits.get(ip) || []
  const recent = hits.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  if (recent.length >= RATE_LIMIT_MAX) {
    ipHits.set(ip, recent)
    return false
  }
  recent.push(now)
  ipHits.set(ip, recent)
  return true
}

const ERRORS = {
  ES: {
    missing: 'Faltan datos para generar el plan.',
    invalidEmail: 'Email invalido.',
    noResponse: 'No se recibio respuesta del analisis.',
    parseError: 'Error al procesar el plan. Intenta de nuevo.',
    internal: 'Error interno del servidor.',
    rateLimit: 'Has alcanzado el limite por hora. Intenta de nuevo mas tarde.',
  },
  EN: {
    missing: 'Missing data to generate the plan.',
    invalidEmail: 'Invalid email.',
    noResponse: 'No response received from the analysis.',
    parseError: 'Failed to process the plan. Please try again.',
    internal: 'Internal server error.',
    rateLimit: 'You have reached the hourly limit. Please try again later.',
  },
} as const

export async function POST(req: NextRequest) {
  const clientIp =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'

  let lang: 'ES' | 'EN' = 'ES'

  try {
    const body = await req.json()
    const { industry, idealClient, objective, email, locale } = body
    lang = locale?.toUpperCase() === 'EN' ? 'EN' : 'ES'
    const errors = ERRORS[lang]

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json({ error: errors.rateLimit }, { status: 429 })
    }

    if (!industry || !idealClient || !objective) {
      return NextResponse.json({ error: errors.missing }, { status: 400 })
    }

    if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
      return NextResponse.json({ error: errors.invalidEmail }, { status: 400 })
    }

    // Fire-and-forget lead capture
    adminDb
      .collection('leads')
      .add({
        email: email.trim().toLowerCase(),
        source: 'content-strategist',
        locale: lang,
        metadata: {
          industry: String(industry).slice(0, 300),
          idealClient: String(idealClient).slice(0, 300),
          objective: String(objective).slice(0, 300),
        },
        ip: clientIp,
        userAgent: req.headers.get('user-agent')?.slice(0, 300) || '',
        createdAt: new Date().toISOString(),
      })
      .catch((err) => console.error('content-strategist lead capture failed:', err))

    const promptLang = lang === 'EN' ? 'English' : 'Spanish'
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const prompt = `You are the AI Content Strategist for Impulsa Lab, a tech consultancy for small Latino businesses. Generate a concrete, actionable weekly content plan in ${promptLang}.

BUSINESS INPUT:
- Industry / main product: ${industry}
- Ideal customer: ${idealClient}
- #1 content goal this month: ${objective}

Respond with ONLY valid JSON (no markdown, no backticks, pure JSON) in this exact shape:

{
  "objective": "short restatement of the goal",
  "instagram": [
    { "type": "post type (e.g., Educational Carousel)", "content": "concrete post idea with angle, hook and suggested visual" },
    { "type": "post type", "content": "..." },
    { "type": "post type", "content": "..." }
  ],
  "blog": [
    "specific SEO-friendly blog title 1",
    "specific SEO-friendly blog title 2"
  ],
  "video": {
    "title": "catchy short-form video title",
    "description": "30-60s video concept: hook, body, CTA"
  },
  "email": {
    "subject": "email subject line under 50 chars",
    "content": "2-sentence email body concept with clear CTA"
  }
}

RULES:
- All content must be specific to the provided industry and ideal customer (no generic filler).
- Write everything in ${promptLang}.
- Instagram post "content" fields should be 2-3 sentences max with a real angle.`

    const message = await client.messages.create({
      model: AI_MODELS.SONNET,
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    })

    const textBlock = message.content.find((b) => b.type === 'text')
    if (!textBlock || textBlock.type !== 'text') {
      return NextResponse.json({ error: errors.noResponse }, { status: 500 })
    }

    let resultText = textBlock.text.trim()
    if (resultText.startsWith('```')) {
      resultText = resultText.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '')
    }

    let plan
    try {
      plan = JSON.parse(resultText)
    } catch {
      const jsonMatch = resultText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        try {
          plan = JSON.parse(jsonMatch[0])
        } catch {
          return NextResponse.json({ error: errors.parseError }, { status: 500 })
        }
      } else {
        return NextResponse.json({ error: errors.parseError }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true, plan })
  } catch (error: unknown) {
    console.error('content-strategist generate error:', error)
    const msg = error instanceof Error ? error.message : ERRORS[lang].internal
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
