import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { adminAuth, adminDb } from '@/lib/firebase-admin'

export const maxDuration = 60

const LIFETIME_LIMIT = 3
const SOURCE = 'prompt-optimizer'

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
    missing: 'Se requiere un prompt para analizar.',
    unauthorized: 'Debes iniciar sesion para usar el optimizador.',
    rateLimit: 'Demasiadas solicitudes. Intenta mas tarde.',
    locked: 'Has usado tus 3 optimizaciones gratuitas.',
    internal: 'Error interno del servidor.',
    invalidModel: 'Modelo objetivo invalido.',
  },
  EN: {
    missing: 'A prompt is required to analyze.',
    unauthorized: 'You must sign in to use the optimizer.',
    rateLimit: 'Too many requests. Please try again later.',
    locked: 'You have used your 3 free optimizations.',
    internal: 'Internal server error.',
    invalidModel: 'Invalid target model.',
  },
} as const

type TargetModel = 'claude' | 'gpt' | 'gemini' | 'universal'
const VALID_MODELS: TargetModel[] = ['claude', 'gpt', 'gemini', 'universal']

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

async function countUserUses(email: string): Promise<number> {
  const snapshot = await adminDb
    .collection('leads')
    .where('email', '==', email)
    .where('source', '==', SOURCE)
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
    const used = await countUserUses(user.email)
    return NextResponse.json({
      used,
      limit: LIFETIME_LIMIT,
      locked: used >= LIFETIME_LIMIT,
    })
  } catch (err) {
    console.error('prompt-optimizer GET error:', err)
    return NextResponse.json({ used: 0, limit: LIFETIME_LIMIT, locked: false })
  }
}

function buildAnalyzerPrompt(userPrompt: string, targetModel: TargetModel, lang: 'ES' | 'EN') {
  const modelHint = {
    claude: 'Anthropic Claude (XML tags recommended)',
    gpt: 'OpenAI GPT-4/5 (markdown with section headers recommended)',
    gemini: 'Google Gemini (structured markdown recommended)',
    universal: 'any LLM (neutral plain-text format)',
  }[targetModel]

  const responseLang = lang === 'EN' ? 'English' : 'Spanish'

  return `You are a senior prompt engineer. You will analyze a user's prompt and return a structured JSON response.

The user's prompt targets: ${modelHint}

Analyze it on these 5 criteria (2 points each, max 10):
1. Role clarity (is a persona defined?)
2. Specificity (concrete task vs. vague)
3. Context quality (enough background?)
4. Few-shot examples (input/output shown?)
5. Output format (is the expected schema/structure defined?)

Return ONLY a valid JSON object (no markdown fence, no prose outside the JSON) with this exact shape:
{
  "score": <integer 1-10>,
  "improvements": [
    "<string: first concrete improvement>",
    "<string: second concrete improvement>",
    "<string: third concrete improvement>"
  ],
  "optimizedPrompt": "<string: fully rewritten prompt in the optimal format for ${modelHint}, with all 5 criteria addressed. Escape any internal quotes and newlines properly for JSON.>"
}

All text must be written in ${responseLang}. The optimizedPrompt must be immediately copy-pasteable into the target LLM.

<user_prompt>
${userPrompt}
</user_prompt>`
}

function extractJson(raw: string): {
  score: number
  improvements: string[]
  optimizedPrompt: string
} | null {
  let cleaned = raw.trim()
  // Strip any accidental markdown fence
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '')
  }
  try {
    const parsed = JSON.parse(cleaned)
    if (
      typeof parsed.score !== 'number' ||
      !Array.isArray(parsed.improvements) ||
      typeof parsed.optimizedPrompt !== 'string'
    ) {
      return null
    }
    return {
      score: Math.max(1, Math.min(10, Math.round(parsed.score))),
      improvements: parsed.improvements.slice(0, 5).map((s: unknown) => String(s)),
      optimizedPrompt: parsed.optimizedPrompt,
    }
  } catch {
    return null
  }
}

// POST — runs optimizer on a user's prompt
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

    // 3. Parse body
    const body = await req.json()
    const { prompt, targetModel, locale } = body
    lang = locale?.toUpperCase() === 'EN' ? 'EN' : 'ES'
    const errors = ERRORS[lang]

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 20) {
      return NextResponse.json({ error: errors.missing }, { status: 400 })
    }
    if (!targetModel || !VALID_MODELS.includes(targetModel)) {
      return NextResponse.json({ error: errors.invalidModel }, { status: 400 })
    }

    // 4. Hard lifetime limit check
    const currentCount = await countUserUses(user.email)
    if (currentCount >= LIFETIME_LIMIT) {
      return NextResponse.json(
        { error: errors.locked, locked: true, used: currentCount, limit: LIFETIME_LIMIT },
        { status: 403 }
      )
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: errors.internal }, { status: 500 })
    }

    // 5. Record usage FIRST to prevent parallel bypass
    await adminDb.collection('leads').add({
      email: user.email,
      uid: user.uid,
      source: SOURCE,
      locale: lang,
      metadata: {
        targetModel,
        promptLength: prompt.length,
        promptPreview: prompt.slice(0, 200),
      },
      ip: clientIp,
      userAgent: req.headers.get('user-agent')?.slice(0, 300) || '',
      createdAt: new Date().toISOString(),
    })

    // 6. Run Haiku analyzer
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: buildAnalyzerPrompt(prompt, targetModel as TargetModel, lang),
        },
      ],
    })

    const block = message.content.find((b) => b.type === 'text')
    const raw = block && block.type === 'text' ? block.text : ''
    const parsed = extractJson(raw)

    if (!parsed) {
      console.error('prompt-optimizer parse error. Raw:', raw.slice(0, 500))
      return NextResponse.json({ error: errors.internal }, { status: 500 })
    }

    return NextResponse.json({
      ...parsed,
      used: currentCount + 1,
      limit: LIFETIME_LIMIT,
      locked: currentCount + 1 >= LIFETIME_LIMIT,
    })
  } catch (err) {
    console.error('prompt-optimizer POST error:', err)
    return NextResponse.json({ error: ERRORS[lang].internal }, { status: 500 })
  }
}
