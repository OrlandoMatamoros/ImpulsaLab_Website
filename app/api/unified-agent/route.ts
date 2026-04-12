import Anthropic from '@anthropic-ai/sdk'
import { GoogleGenerativeAI } from '@google/generative-ai'
import OpenAI from 'openai'
import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export const maxDuration = 60

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Rate limit: 5 queries / IP / hour (each query = 4 LLM calls, so this
// caps real cost exposure).
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

// Simple response cache (1h TTL, in-memory).
interface CachedResponses {
  chatgpt: string
  claude: string
  gemini: string
  unified: string
}
const responseCache = new Map<string, { data: CachedResponses; timestamp: number }>()
const CACHE_DURATION = 3600000

const ERRORS = {
  ES: {
    missing: 'Se requiere una pregunta.',
    invalidEmail: 'Email invalido.',
    rateLimit: 'Has alcanzado el limite por hora. Intenta de nuevo mas tarde.',
    internal: 'Error interno del servidor.',
  },
  EN: {
    missing: 'A query is required.',
    invalidEmail: 'Invalid email.',
    rateLimit: 'You have reached the hourly limit. Please try again later.',
    internal: 'Internal server error.',
  },
} as const

export async function POST(request: NextRequest) {
  const clientIp =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  let lang: 'ES' | 'EN' = 'ES'

  try {
    const body = await request.json()
    const { query, email, locale } = body
    lang = locale?.toUpperCase() === 'EN' ? 'EN' : 'ES'
    const errors = ERRORS[lang]

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json({ error: errors.rateLimit }, { status: 429 })
    }

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: errors.missing }, { status: 400 })
    }

    if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
      return NextResponse.json({ error: errors.invalidEmail }, { status: 400 })
    }

    // Fire-and-forget lead capture (one doc per query, so multiple queries
    // from the same session produce multiple docs — use email to dedupe
    // downstream if needed).
    adminDb
      .collection('leads')
      .add({
        email: email.trim().toLowerCase(),
        source: 'unified-agent',
        locale: lang,
        metadata: { query: String(query).slice(0, 500) },
        ip: clientIp,
        userAgent: request.headers.get('user-agent')?.slice(0, 300) || '',
        createdAt: new Date().toISOString(),
      })
      .catch((err) => console.error('unified-agent lead capture failed:', err))

    // Cache key by query only (same question -> same 4 responses).
    const cacheKey = query.toLowerCase().trim()
    const cached = responseCache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return NextResponse.json(cached.data)
    }

    const responses: CachedResponses = { chatgpt: '', claude: '', gemini: '', unified: '' }
    const promptLang = lang === 'EN' ? 'English' : 'Spanish'

    // ===== 1. Run GPT + Claude + Gemini in parallel =====
    const aiPromises: Promise<void>[] = []

    if (process.env.OPENAI_API_KEY) {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
      aiPromises.push(
        openai.chat.completions
          .create({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: `You are a business automation expert. Respond technically and specifically in at most 80 words. Write in ${promptLang}.`,
              },
              { role: 'user', content: query },
            ],
            max_tokens: 180,
            temperature: 0.7,
          })
          .then((r) => {
            responses.chatgpt = r.choices?.[0]?.message?.content?.trim() || ''
          })
          .catch((err) => {
            console.error('unified-agent GPT error:', err)
          })
      )
    }

    if (process.env.ANTHROPIC_API_KEY) {
      const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
      aiPromises.push(
        anthropic.messages
          .create({
            model: 'claude-haiku-4-5',
            max_tokens: 180,
            messages: [
              {
                role: 'user',
                content: `As a digital transformation and change management expert, respond in at most 80 words and in ${promptLang}: ${query}`,
              },
            ],
          })
          .then((m) => {
            const block = m.content.find((b) => b.type === 'text')
            responses.claude = block && block.type === 'text' ? block.text.trim() : ''
          })
          .catch((err) => {
            console.error('unified-agent Claude error:', err)
          })
      )
    }

    const geminiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_GEMINI_API_KEY ||
      process.env.GOOGLE_AI_API_KEY
    if (geminiKey) {
      const genAI = new GoogleGenerativeAI(geminiKey)
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
      aiPromises.push(
        model
          .generateContent(
            `As an AI and business automation specialist, respond in at most 80 words and in ${promptLang}: ${query}`
          )
          .then((r) => {
            responses.gemini = r.response.text()?.trim() || ''
          })
          .catch((err) => {
            console.error('unified-agent Gemini error:', err)
          })
      )
    }

    await Promise.all(aiPromises)

    // ===== 2. Synthesize with Claude Sonnet 4.6 (the real synthesizer) =====
    if (process.env.ANTHROPIC_API_KEY && (responses.chatgpt || responses.claude || responses.gemini)) {
      try {
        const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
        const synth = await anthropic.messages.create({
          model: 'claude-sonnet-4-6',
          max_tokens: 700,
          messages: [
            {
              role: 'user',
              content: `You are the Executive Synthesizer for Impulsa Lab. Three AI advisors analyzed the business question "${query}":

GPT (technical perspective): ${responses.chatgpt || 'no response'}

Claude Haiku (human perspective): ${responses.claude || 'no response'}

Gemini (market perspective): ${responses.gemini || 'no response'}

Produce an executive synthesis in ${promptLang} that:
1. Combines the strongest insights from each perspective
2. Resolves contradictions with a clear recommendation
3. Gives 4-5 specific, actionable steps with concrete metrics where possible
4. Is written in plain prose (no emojis)
5. Is at most 250 words`,
            },
          ],
        })
        const synthBlock = synth.content.find((b) => b.type === 'text')
        responses.unified = synthBlock && synthBlock.type === 'text' ? synthBlock.text.trim() : ''
      } catch (err) {
        console.error('unified-agent synthesis error:', err)
      }
    }

    responseCache.set(cacheKey, { data: responses, timestamp: Date.now() })
    return NextResponse.json(responses)
  } catch (error) {
    console.error('unified-agent error:', error)
    return NextResponse.json({ error: ERRORS[lang].internal }, { status: 500 })
  }
}

export async function GET() {
  const status = {
    openai: !!process.env.OPENAI_API_KEY,
    anthropic: !!process.env.ANTHROPIC_API_KEY,
    gemini: !!(
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_GEMINI_API_KEY ||
      process.env.GOOGLE_AI_API_KEY
    ),
  }
  return NextResponse.json({ status, cache_size: responseCache.size })
}
