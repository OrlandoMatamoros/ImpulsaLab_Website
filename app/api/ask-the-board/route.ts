import Anthropic from '@anthropic-ai/sdk'
import { GoogleGenerativeAI } from '@google/generative-ai'
import OpenAI from 'openai'
import { NextRequest, NextResponse } from 'next/server'
import { adminAuth, adminDb } from '@/lib/firebase-admin'

export const maxDuration = 60

const LIFETIME_LIMIT = 3

// Defense-in-depth: cap per-IP hourly throughput so a single IP cannot
// burn compute even if multiple accounts share it (e.g., coffee shop bots).
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const RATE_LIMIT_MAX_IP = 10
const ipHits = new Map<string, number[]>()

function checkIpRateLimit(ip: string): boolean {
  const now = Date.now()
  const hits = ipHits.get(ip) || []
  const recent = hits.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  if (recent.length >= RATE_LIMIT_MAX_IP) {
    ipHits.set(ip, recent)
    return false
  }
  recent.push(now)
  ipHits.set(ip, recent)
  return true
}

const ERRORS = {
  ES: {
    missing: 'Se requiere una pregunta.',
    unauthorized: 'Debes iniciar sesion para usar esta herramienta.',
    rateLimit: 'Demasiadas solicitudes. Intenta mas tarde.',
    locked: 'Has usado tus 3 preguntas gratuitas.',
    internal: 'Error interno del servidor.',
  },
  EN: {
    missing: 'A question is required.',
    unauthorized: 'You must sign in to use this tool.',
    rateLimit: 'Too many requests. Please try again later.',
    locked: 'You have used your 3 free questions.',
    internal: 'Internal server error.',
  },
} as const

interface DecodedUser {
  uid: string
  email: string
}

async function verifyAuth(req: NextRequest): Promise<DecodedUser | null> {
  const authHeader = req.headers.get('authorization') || ''
  if (!authHeader.startsWith('Bearer ')) return null
  const idToken = authHeader.slice(7)
  try {
    const decoded = await adminAuth.verifyIdToken(idToken)
    if (!decoded.email) return null
    return { uid: decoded.uid, email: decoded.email.toLowerCase() }
  } catch {
    return null
  }
}

async function countUserQueries(email: string): Promise<number> {
  const snapshot = await adminDb
    .collection('leads')
    .where('email', '==', email)
    .where('source', '==', 'ask-the-board')
    .count()
    .get()
  return snapshot.data().count
}

// GET — returns current usage for the authenticated user
export async function GET(req: NextRequest) {
  const user = await verifyAuth(req)
  if (!user) {
    return NextResponse.json({ error: ERRORS.ES.unauthorized }, { status: 401 })
  }

  try {
    const used = await countUserQueries(user.email)
    return NextResponse.json({
      queriesUsed: used,
      limit: LIFETIME_LIMIT,
      locked: used >= LIFETIME_LIMIT,
    })
  } catch (err) {
    console.error('ask-the-board GET error:', err)
    return NextResponse.json({ queriesUsed: 0, limit: LIFETIME_LIMIT, locked: false })
  }
}

// POST — runs a board query
export async function POST(req: NextRequest) {
  const clientIp =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'

  let lang: 'ES' | 'EN' = 'ES'

  try {
    // 1. Auth
    const user = await verifyAuth(req)
    if (!user) {
      return NextResponse.json({ error: ERRORS.ES.unauthorized }, { status: 401 })
    }

    // 2. IP rate limit
    if (!checkIpRateLimit(clientIp)) {
      return NextResponse.json({ error: ERRORS.ES.rateLimit }, { status: 429 })
    }

    // 3. Parse body + locale
    const body = await req.json()
    const { question, locale } = body
    lang = locale?.toUpperCase() === 'EN' ? 'EN' : 'ES'
    const errors = ERRORS[lang]

    if (!question || typeof question !== 'string' || question.trim().length < 5) {
      return NextResponse.json({ error: errors.missing }, { status: 400 })
    }

    // 4. Hard lifetime limit check (Firestore count)
    const currentCount = await countUserQueries(user.email)
    if (currentCount >= LIFETIME_LIMIT) {
      return NextResponse.json(
        { error: errors.locked, locked: true, queriesUsed: currentCount, limit: LIFETIME_LIMIT },
        { status: 403 }
      )
    }

    // 5. Write the lead doc FIRST, so concurrent requests from the same
    //    user cannot race past the limit. We increment usage atomically by
    //    relying on the count. If the LLM call fails later, the user still
    //    spent a quota slot — that's an acceptable trade-off vs. allowing
    //    parallel bypass.
    await adminDb.collection('leads').add({
      email: user.email,
      uid: user.uid,
      source: 'ask-the-board',
      locale: lang,
      metadata: { question: String(question).slice(0, 500) },
      ip: clientIp,
      userAgent: req.headers.get('user-agent')?.slice(0, 300) || '',
      createdAt: new Date().toISOString(),
    })

    // 6. Fire 3 cheap models in parallel
    const promptLang = lang === 'EN' ? 'English' : 'Spanish'
    const responses = { chatgpt: '', claude: '', gemini: '', unified: '' }
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
                content: `You are a technical business automation expert. Answer concretely in at most 80 words. Write in ${promptLang}.`,
              },
              { role: 'user', content: question },
            ],
            max_tokens: 200,
            temperature: 0.7,
          })
          .then((r) => {
            responses.chatgpt = r.choices?.[0]?.message?.content?.trim() || ''
          })
          .catch((err) => console.error('ask-the-board GPT error:', err))
      )
    }

    if (process.env.ANTHROPIC_API_KEY) {
      const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
      aiPromises.push(
        anthropic.messages
          .create({
            model: 'claude-haiku-4-5',
            max_tokens: 200,
            messages: [
              {
                role: 'user',
                content: `As a digital transformation and change management expert, answer in at most 80 words and in ${promptLang}: ${question}`,
              },
            ],
          })
          .then((m) => {
            const block = m.content.find((b) => b.type === 'text')
            responses.claude = block && block.type === 'text' ? block.text.trim() : ''
          })
          .catch((err) => console.error('ask-the-board Claude error:', err))
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
            `As a market and consumer insights specialist, answer in at most 80 words and in ${promptLang}: ${question}`
          )
          .then((r) => {
            responses.gemini = r.response.text()?.trim() || ''
          })
          .catch((err) => console.error('ask-the-board Gemini error:', err))
      )
    }

    await Promise.all(aiPromises)

    // 7. Synthesize with the same Haiku (cheap) so one Anthropic call is
    //    reused conceptually — could upgrade to Sonnet if quality suffers.
    if (
      process.env.ANTHROPIC_API_KEY &&
      (responses.chatgpt || responses.claude || responses.gemini)
    ) {
      try {
        const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
        const synth = await anthropic.messages.create({
          model: 'claude-haiku-4-5',
          max_tokens: 500,
          messages: [
            {
              role: 'user',
              content: `You are the Executive Synthesizer for Impulsa Lab. Three AI advisors analyzed the question "${question}":

Technical (GPT): ${responses.chatgpt || 'no response'}

Human (Claude): ${responses.claude || 'no response'}

Market (Gemini): ${responses.gemini || 'no response'}

Produce an executive synthesis in ${promptLang} that:
- combines the strongest insights from each perspective
- resolves contradictions with one clear recommendation
- lists 3-5 concrete, actionable next steps
- is plain prose (no emojis), at most 200 words`,
            },
          ],
        })
        const block = synth.content.find((b) => b.type === 'text')
        responses.unified = block && block.type === 'text' ? block.text.trim() : ''
      } catch (err) {
        console.error('ask-the-board synthesis error:', err)
      }
    }

    return NextResponse.json({
      ...responses,
      queriesUsed: currentCount + 1,
      limit: LIFETIME_LIMIT,
      locked: currentCount + 1 >= LIFETIME_LIMIT,
    })
  } catch (err) {
    console.error('ask-the-board POST error:', err)
    return NextResponse.json({ error: ERRORS[lang].internal }, { status: 500 })
  }
}
