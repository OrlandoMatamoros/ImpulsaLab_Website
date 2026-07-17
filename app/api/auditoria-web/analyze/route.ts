import { AI_MODELS } from '@/lib/ai-models'
import { rateLimit } from '@/lib/rate-limit'
import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { adminAuth } from '@/lib/firebase-admin'
import { isAdminEmail } from '@/lib/admin-emails'
import { safeFetch } from '@/lib/ssrf-guard'

export const maxDuration = 60
export const runtime = 'nodejs'

// Rate limit: 20 req / IP / hour. Internal tool — generous but still capped.
// Shared atomic limiter (Upstash Redis); replaces the old per-instance in-memory
// Map that concurrency across serverless instances could bypass.
const RATE_LIMIT_WINDOW_SEC = 60 * 60
const RATE_LIMIT_MAX = 20

const ERRORS = {
  ES: {
    missing: 'Se requiere una URL o codigo fuente para analizar.',
    fetchFailed: 'No se pudo acceder al sitio. Intenta pegar el codigo fuente directamente.',
    noContent: 'No se obtuvo contenido para analizar.',
    noResponse: 'No se recibio respuesta del analisis.',
    parseError: 'Error al procesar el analisis. Intenta de nuevo.',
    internal: 'Error interno del servidor.',
    unauthorized: 'Acceso restringido. Debes iniciar sesion como administrador.',
    rateLimit: 'Has alcanzado el limite de auditorias por hora. Intenta de nuevo mas tarde.',
  },
  EN: {
    missing: 'A URL or source code is required for analysis.',
    fetchFailed: 'Could not access the site. Try pasting the source code directly.',
    noContent: 'No content was retrieved for analysis.',
    noResponse: 'No response received from the analysis.',
    parseError: 'Failed to process the analysis. Please try again.',
    internal: 'Internal server error.',
    unauthorized: 'Restricted access. You must sign in as an administrator.',
    rateLimit: 'You have reached the hourly audit limit. Please try again later.',
  },
} as const

function extractMeta(html: string) {
  const get = (pattern: RegExp): string => {
    const m = html.match(pattern)
    return m ? m[1].trim() : ''
  }

  const countMatches = (pattern: RegExp): number => {
    const m = html.match(pattern)
    return m ? m.length : 0
  }

  return {
    title: get(/<title[^>]*>([^<]*)<\/title>/i),
    metaDescription: get(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i),
    metaKeywords: get(/<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']*)["']/i),
    ogTitle: get(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i),
    ogDescription: get(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["']/i),
    ogImage: get(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i),
    canonical: get(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i),
    viewport: get(/<meta[^>]*name=["']viewport["'][^>]*content=["']([^"']*)["']/i),
    h1Count: countMatches(/<h1[\s>]/gi),
    h2Count: countMatches(/<h2[\s>]/gi),
    h3Count: countMatches(/<h3[\s>]/gi),
    imgCount: countMatches(/<img[\s>]/gi),
    imgWithAlt: countMatches(/<img[^>]*alt=["'][^"']+["']/gi),
    linkCount: countMatches(/<a[\s>]/gi),
    scriptCount: countMatches(/<script[\s>]/gi),
    hasHttps: false,
    hasStructuredData:
      html.includes('application/ld+json') ||
      html.includes('itemtype=') ||
      html.includes('vocab='),
    formCount: countMatches(/<form[\s>]/gi),
    hasRobotsMeta: /<meta[^>]*name=["']robots["']/i.test(html),
    htmlLang: get(/<html[^>]*lang=["']([^"']*)["']/i),
    charsetDeclared:
      /<meta[^>]*charset=/i.test(html) ||
      /<meta[^>]*content=["'][^"']*charset=/i.test(html),
  }
}

export async function POST(req: NextRequest) {
  const clientIp =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'

  // Default to ES for errors thrown before we parse the body.
  let lang: 'ES' | 'EN' = 'ES'

  try {
    // ===== 1. Admin auth gate (Firebase ID token) =====
    const authHeader = req.headers.get('authorization') || ''
    if (!authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: ERRORS.ES.unauthorized }, { status: 401 })
    }
    const idToken = authHeader.slice(7)

    let decoded
    try {
      decoded = await adminAuth.verifyIdToken(idToken)
    } catch {
      return NextResponse.json({ error: ERRORS.ES.unauthorized }, { status: 401 })
    }

    if (!isAdminEmail(decoded.email)) {
      return NextResponse.json({ error: ERRORS.ES.unauthorized }, { status: 403 })
    }

    // ===== 2. Rate limit =====
    const rl = await rateLimit({
      prefix: 'aw',
      identifier: clientIp,
      limit: RATE_LIMIT_MAX,
      windowSec: RATE_LIMIT_WINDOW_SEC,
    })
    if (!rl.success) {
      return NextResponse.json({ error: ERRORS.ES.rateLimit }, { status: 429 })
    }

    // ===== 3. Parse + validate body =====
    const body = await req.json()
    const { url, sourceCode, locale } = body
    lang = locale?.toUpperCase() === 'EN' ? 'EN' : 'ES'
    const errors = ERRORS[lang]

    if (!url && !sourceCode) {
      return NextResponse.json({ error: errors.missing }, { status: 400 })
    }

    // ===== 4. Fetch HTML =====
    let html = sourceCode || ''
    let fetchedUrl = url || ''
    let fetchError = ''
    let isHttps = false

    if (!sourceCode && url) {
      let normalizedUrl = url.trim()
      if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
        normalizedUrl = 'https://' + normalizedUrl
      }
      fetchedUrl = normalizedUrl
      isHttps = normalizedUrl.startsWith('https://')

      try {
        // safeFetch bloquea destinos internos (localhost, IP privadas, metadata
        // cloud 169.254.169.254) validando la URL y cada redirect — defensa SSRF.
        const res = await safeFetch(normalizedUrl, {
          'User-Agent':
            'Mozilla/5.0 (compatible; ImpulsaLab-Audit/1.0; +https://tuimpulsalab.com)',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        })
        html = await res.text()
      } catch (e: unknown) {
        fetchError = e instanceof Error ? e.message : 'unknown fetch error'
      }
    }

    if (!html && fetchError) {
      return NextResponse.json({ error: `${errors.fetchFailed} (${fetchError})` }, { status: 422 })
    }

    if (!html) {
      return NextResponse.json({ error: errors.noContent }, { status: 422 })
    }

    // ===== 5. Analyze with Claude =====
    const meta = extractMeta(html)
    meta.hasHttps = isHttps

    const truncatedHtml =
      html.length > 25000 ? html.substring(0, 25000) + '\n[...truncado...]' : html

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const promptLang = lang === 'EN' ? 'English' : 'Spanish'

    const prompt = `You are an expert web auditor for Impulsa Lab, a tech consultancy for small Latino businesses. Analyze the following website and generate a professional report in ${promptLang}.

URL analyzed: ${fetchedUrl}

EXTRACTED METADATA:
${JSON.stringify(meta, null, 2)}

HTML CODE:
\`\`\`html
${truncatedHtml}
\`\`\`

Analyze the site across these 6 dimensions and respond ONLY with valid JSON (no markdown, no backticks, pure JSON):

{
  "companyName": "company name detected from the site",
  "sections": [
    {
      "id": "seo",
      "name": "${lang === 'EN' ? 'Technical SEO' : 'SEO Tecnico'}",
      "score": <0-100>,
      "findings": ["specific finding 1", "finding 2", ...],
      "recommendations": ["actionable recommendation 1", "recommendation 2", ...]
    },
    {
      "id": "design",
      "name": "${lang === 'EN' ? 'Design & UX' : 'Diseno & UX'}",
      "score": <0-100>,
      "findings": [...],
      "recommendations": [...]
    },
    {
      "id": "commercial",
      "name": "${lang === 'EN' ? 'Commercial & Merchandising' : 'Comercial & Merchandising'}",
      "score": <0-100>,
      "findings": [...],
      "recommendations": [...]
    },
    {
      "id": "structure",
      "name": "${lang === 'EN' ? 'Structure & Architecture' : 'Estructura & Arquitectura'}",
      "score": <0-100>,
      "findings": [...],
      "recommendations": [...]
    },
    {
      "id": "presence",
      "name": "${lang === 'EN' ? 'Digital Presence' : 'Presencia Digital'}",
      "score": <0-100>,
      "findings": [...],
      "recommendations": [...]
    },
    {
      "id": "security",
      "name": "${lang === 'EN' ? 'Security & Performance' : 'Seguridad & Performance'}",
      "score": <0-100>,
      "findings": [...],
      "recommendations": [...]
    }
  ],
  "overallScore": <weighted average 0-100>,
  "maturityLevel": "<${lang === 'EN' ? 'Critical|Developing|Competent|Advanced' : 'Critico|En Desarrollo|Competente|Avanzado'}>",
  "topRecommendations": ["the 5 most impactful recommendations, prioritized"],
  "impulsaServices": ["2-3 Impulsa Lab services that would help"]
}

SECTION CRITERIA:

1. Technical SEO: meta title/description, headings (unique H1), sitemap signals, robots, schema markup, mobile-friendly signals, canonical, lang attribute, alt text on images.

2. Design & UX: visual consistency, legible typography, spacing, accessibility (contrast, alt text, HTML semantics), clear navigation, responsive signals, visible CTAs.

3. Commercial & Merchandising: clear value proposition, effective CTAs, trust signals (testimonials, logos, certifications), conversion funnel, visible pricing, urgency/scarcity.

4. Structure & Architecture: content hierarchy, internal links, complete footer, legal pages (privacy, terms), breadcrumbs, logical navigation.

5. Digital Presence: social media links, blog/content, contact/lead capture form, email marketing signals, WhatsApp/chat, Google Business signals.

6. Security & Performance: HTTPS, script count, image optimization, CDN signals, security headers, secure forms.

Be specific in findings (mention concrete data from the site). Recommendations must be actionable. Each section should have 3-6 findings and 3-5 recommendations. Write ALL findings and recommendations in ${promptLang}.`

    const message = await client.messages.create({
      model: AI_MODELS.HAIKU,
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }],
    })

    const textBlock = message.content.find((b) => b.type === 'text')
    if (!textBlock || textBlock.type !== 'text') {
      return NextResponse.json({ error: errors.noResponse }, { status: 500 })
    }

    if (message.stop_reason === 'max_tokens') {
      console.error('Analyze: response truncated at max_tokens', message.usage)
      return NextResponse.json({ error: errors.parseError + ' (max_tokens)' }, { status: 500 })
    }

    let analysisText = textBlock.text.trim()

    if (analysisText.startsWith('```')) {
      analysisText = analysisText.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '')
    }

    let analysis
    try {
      analysis = JSON.parse(analysisText)
    } catch {
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        try {
          analysis = JSON.parse(jsonMatch[0])
        } catch {
          return NextResponse.json(
            { error: errors.parseError, raw: analysisText.substring(0, 500) },
            { status: 500 }
          )
        }
      } else {
        return NextResponse.json(
          { error: errors.parseError, raw: analysisText.substring(0, 500) },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({ success: true, url: fetchedUrl, analysis })
  } catch (error: unknown) {
    console.error('Analysis error:', error)
    const message = error instanceof Error ? error.message : ERRORS[lang].internal
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
