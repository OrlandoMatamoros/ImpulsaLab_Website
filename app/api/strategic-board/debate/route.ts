import Anthropic from '@anthropic-ai/sdk'
import { GoogleGenerativeAI } from '@google/generative-ai'
import OpenAI from 'openai'
import { NextRequest } from 'next/server'
import { adminAuth } from '@/lib/firebase-admin'
import { isAdminEmail } from '@/lib/admin-emails'
import { AI_MODELS } from '@/lib/ai-models'

export const maxDuration = 120

// Rate limit: 20 debates / IP / hour. Internal tool — generous but capped
// because each debate fires 4 LLM calls serially (~$0.05-0.10 each).
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const RATE_LIMIT_MAX = 20
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

/* ------------------------------------------------------------------ */
/*  System prompts                                                     */
/* ------------------------------------------------------------------ */

function claudeSystemPrompt(domain: string, locale: string) {
  const lang = locale === 'en' ? 'English' : 'espanol'
  return `Eres el Director Tecnico de la Junta Estrategica de Impulsa Lab. Tu nombre es CLAUDE.
Analiza cada pregunta desde la perspectiva tecnica: factibilidad, arquitectura, costos de implementacion, timeline, stack tecnologico.
Se especifico con numeros concretos (costos, tiempos, metricas).
${domain !== 'General' ? `Enfocate especialmente en el dominio de ${domain}.` : ''}
Responde SIEMPRE en ${lang} con EXACTAMENTE este formato:

## Puntos Clave
- (3-5 bullets concretos)

## Recomendacion
(1 parrafo directo y accionable)

## Confianza: X%`
}

function geminiSystemPrompt(domain: string, claudeResponse: string, locale: string) {
  const lang = locale === 'en' ? 'English' : 'espanol'
  return `Eres el Director de Estrategia de la Junta Estrategica de Impulsa Lab. Tu nombre es GEMINI.
Analiza cada pregunta desde la perspectiva estrategica: posicionamiento, ventaja competitiva, tendencias de mercado, timing.
Conecta tendencias macro con la situacion especifica del negocio.
${domain !== 'General' ? `Enfocate especialmente en el dominio de ${domain}.` : ''}

El Director Tecnico (CLAUDE) ya dio su analisis:
---
${claudeResponse}
---

Considerando ese analisis tecnico, da tu perspectiva estrategica. Puedes estar de acuerdo o en desacuerdo.
Responde SIEMPRE en ${lang} con EXACTAMENTE este formato:

## Puntos Clave
- (3-5 bullets concretos)

## Recomendacion
(1 parrafo directo y accionable)

## Confianza: X%`
}

function gptSystemPrompt(
  domain: string,
  claudeResponse: string,
  geminiResponse: string,
  locale: string
) {
  const lang = locale === 'en' ? 'English' : 'espanol'
  return `Eres el Director de Mercado de la Junta Estrategica de Impulsa Lab. Tu nombre es GPT.
Analiza cada pregunta desde la perspectiva de mercado: investigacion de mercado, competencia, pricing, segmentos de clientes, datos del consumidor.
Cita datos de mercado, benchmarks y comparaciones competitivas cuando sea posible.
${domain !== 'General' ? `Enfocate especialmente en el dominio de ${domain}.` : ''}

El Director Tecnico (CLAUDE) analizo:
---
${claudeResponse}
---

El Director de Estrategia (GEMINI) analizo:
---
${geminiResponse}
---

Considerando ambos analisis, da tu perspectiva de mercado. Puedes estar de acuerdo o en desacuerdo con cualquiera.
Responde SIEMPRE en ${lang} con EXACTAMENTE este formato:

## Puntos Clave
- (3-5 bullets concretos)

## Recomendacion
(1 parrafo directo y accionable)

## Confianza: X%`
}

function novaSystemPrompt(
  claudeResponse: string,
  geminiResponse: string,
  gptResponse: string,
  locale: string
) {
  return `Eres NOVA, la moderadora de la Junta Estrategica de Impulsa Lab.
Tu rol es sintetizar las 3 perspectivas de los directores en una Resolucion de Junta clara y accionable.
Identifica donde coinciden, donde no, y da una recomendacion final ejecutiva.

Director Tecnico (CLAUDE):
---
${claudeResponse}
---

Director de Estrategia (GEMINI):
---
${geminiResponse}
---

Director de Mercado (GPT):
---
${gptResponse}
---

Sintetiza en una Resolucion de Junta. Responde SIEMPRE en ${locale === 'en' ? 'English' : 'espanol'} con EXACTAMENTE este formato:

## Consenso
(Puntos donde los 3 directores coinciden)

## Desacuerdos
(Puntos donde difieren y por que)

## Recomendacion Final
(1-2 parrafos con la decision ejecutiva)

## Confianza: X%

## Acciones Inmediatas
1. (accion concreta)
2. (accion concreta)
3. (accion concreta)
4. (accion concreta si aplica)
5. (accion concreta si aplica)`
}

/* ------------------------------------------------------------------ */
/*  AI Calls                                                           */
/* ------------------------------------------------------------------ */

async function callClaude(question: string, systemPrompt: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return '## Puntos Clave\n- API key de Anthropic no configurada\n- No se pudo realizar el analisis tecnico\n\n## Recomendacion\nConfigurar la variable ANTHROPIC_API_KEY para habilitar al Director Tecnico.\n\n## Confianza: 0%'
  }

  const client = new Anthropic({ apiKey })
  const message = await client.messages.create({
    model: AI_MODELS.SONNET,
    max_tokens: 1500,
    system: systemPrompt,
    messages: [{ role: 'user', content: question }],
  })

  const block = message.content[0]
  if (block.type === 'text') return block.text
  return 'Sin respuesta del Director Tecnico.'
}

async function callGemini(question: string, systemPrompt: string): Promise<string> {
  const apiKey = process.env.GOOGLE_AI_API_KEY
  if (!apiKey) {
    return '## Puntos Clave\n- API key de Google AI no configurada\n- No se pudo realizar el analisis estrategico\n\n## Recomendacion\nConfigurar la variable GOOGLE_AI_API_KEY para habilitar al Director de Estrategia.\n\n## Confianza: 0%'
  }

  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction: systemPrompt,
  })
  const result = await model.generateContent(question)
  const response = result.response

  return response.text() || 'Sin respuesta del Director de Estrategia.'
}

async function callGPT(question: string, systemPrompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return '## Puntos Clave\n- API key de OpenAI no configurada\n- No se pudo realizar el analisis de mercado\n\n## Recomendacion\nConfigurar la variable OPENAI_API_KEY para habilitar al Director de Mercado.\n\n## Confianza: 0%'
  }

  const client = new OpenAI({ apiKey })
  const completion = await client.chat.completions.create({
    model: 'gpt-4o',
    max_tokens: 1500,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: question },
    ],
  })

  return (
    completion.choices[0]?.message?.content ?? 'Sin respuesta del Director de Mercado.'
  )
}

async function callNova(systemPrompt: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return '## Consenso\nNo se pudo sintetizar sin API key.\n\n## Desacuerdos\nN/A\n\n## Recomendacion Final\nConfigurar ANTHROPIC_API_KEY.\n\n## Confianza: 0%\n\n## Acciones Inmediatas\n1. Configurar las API keys necesarias'
  }

  const client = new Anthropic({ apiKey })
  const message = await client.messages.create({
    model: AI_MODELS.SONNET,
    max_tokens: 2000,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: 'Genera la Resolucion de Junta sintetizando las 3 perspectivas anteriores.',
      },
    ],
  })

  const block = message.content[0]
  if (block.type === 'text') return block.text
  return 'Sin resolucion disponible.'
}

/* ------------------------------------------------------------------ */
/*  Route handler                                                      */
/* ------------------------------------------------------------------ */

export async function POST(request: NextRequest) {
  const clientIp =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  try {
    // ===== 1. Admin auth gate (Firebase ID token) =====
    const authHeader = request.headers.get('authorization') || ''
    if (!authHeader.startsWith('Bearer ')) {
      return Response.json({ error: 'Acceso restringido.' }, { status: 401 })
    }
    const idToken = authHeader.slice(7)

    let decoded
    try {
      decoded = await adminAuth.verifyIdToken(idToken)
    } catch {
      return Response.json({ error: 'Token invalido.' }, { status: 401 })
    }

    if (!isAdminEmail(decoded.email)) {
      return Response.json({ error: 'Acceso restringido.' }, { status: 403 })
    }

    // ===== 2. Rate limit =====
    if (!checkRateLimit(clientIp)) {
      return Response.json(
        { error: 'Has alcanzado el limite de debates por hora. Intenta mas tarde.' },
        { status: 429 }
      )
    }

    // ===== 3. Parse body =====
    const body = await request.json()
    const { question, domain = 'General', locale = 'es' } = body as {
      question: string
      domain?: string
      locale?: string
    }

    if (!question || typeof question !== 'string' || question.trim().length < 5) {
      return Response.json(
        { error: 'La pregunta debe tener al menos 5 caracteres.' },
        { status: 400 }
      )
    }

    const claudeResponse = await callClaude(question, claudeSystemPrompt(domain, locale))

    const geminiResponse = await callGemini(
      question,
      geminiSystemPrompt(domain, claudeResponse, locale)
    )

    const gptResponse = await callGPT(
      question,
      gptSystemPrompt(domain, claudeResponse, geminiResponse, locale)
    )

    const resolutionResponse = await callNova(
      novaSystemPrompt(claudeResponse, geminiResponse, gptResponse, locale)
    )

    return Response.json({
      claude: claudeResponse,
      gemini: geminiResponse,
      gpt: gptResponse,
      resolution: resolutionResponse,
    })
  } catch (err: unknown) {
    console.error('Debate API error:', err)

    const message = err instanceof Error ? err.message : 'Error interno del servidor'

    if (message.includes('rate_limit') || message.includes('429')) {
      return Response.json(
        { error: 'Limite de uso de API alcanzado. Intenta de nuevo en unos minutos.' },
        { status: 429 }
      )
    }

    if (message.includes('authentication') || message.includes('401')) {
      return Response.json(
        { error: 'Error de autenticacion con uno de los proveedores AI.' },
        { status: 401 }
      )
    }

    return Response.json(
      { error: `Error procesando la consulta: ${message}` },
      { status: 500 }
    )
  }
}
