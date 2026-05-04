import { AI_MODELS } from '@/lib/ai-models'
import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export const maxDuration = 120

// Simple in-memory rate limit: 5 requests / IP / hour.
// Resets on cold start — acceptable for MVP, upgrade to Upstash later.
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
    missing: 'Se requiere nombre del negocio, industria y descripcion.',
    noResponse: 'No se recibio respuesta del analisis.',
    parseError: 'Error al procesar el plan. Intenta de nuevo.',
    internal: 'Error interno del servidor.',
    rateLimit: 'Has alcanzado el limite de planes por hora. Intenta de nuevo mas tarde.',
  },
  EN: {
    missing: 'Business name, industry and description are required.',
    noResponse: 'No response received from the analysis.',
    parseError: 'Failed to process the plan. Please try again.',
    internal: 'Internal server error.',
    rateLimit: 'You have reached the hourly plan limit. Please try again later.',
  },
} as const

export async function POST(req: NextRequest) {
  const clientIp =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'

  try {
    const body = await req.json()
    const {
      businessName,
      industry,
      location,
      stage,
      description,
      mainProduct,
      idealClient,
      differentiator,
      initialInvestment,
      monthlySales,
      seeksFunding,
      fundingAmount,
      employees,
      locale,
    } = body

    const lang = locale?.toUpperCase() === 'EN' ? 'EN' : 'ES'
    const errors = ERRORS[lang]

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json({ error: errors.rateLimit }, { status: 429 })
    }

    const str = (v: unknown, max = 500) =>
      typeof v === 'string' ? v.trim().slice(0, max) : ''

    const required = {
      businessName: str(businessName, 200),
      industry: str(industry, 200),
      description: str(description, 1000),
    }

    if (
      required.businessName.length < 2 ||
      required.industry.length < 2 ||
      required.description.length < 10
    ) {
      return NextResponse.json({ error: errors.missing }, { status: 400 })
    }

    const promptLang = lang === 'EN' ? 'English' : 'Spanish'
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const prompt = `You are a senior business consultant for Impulsa Lab, a tech consultancy for small Latino businesses. Generate a professional, comprehensive business plan in ${promptLang} based on the following information.

BUSINESS INFORMATION:
- Business Name: ${required.businessName}
- Industry: ${required.industry}
- Location: ${str(location, 200) || 'Not specified'}
- Stage: ${str(stage, 100) || 'Not specified'}
- Description: ${required.description}
- Main Product/Service: ${str(mainProduct, 500) || 'Not specified'}
- Ideal Customer: ${str(idealClient, 500) || 'Not specified'}
- Differentiator: ${str(differentiator, 500) || 'Not specified'}
- Initial Investment: ${str(initialInvestment, 100) || 'Not specified'}
- Monthly Sales (USD, current or projected): ${monthlySales ? `$${str(monthlySales, 50)}` : 'Not specified'}
- Seeks Funding: ${seeksFunding ? `Yes - $${str(fundingAmount, 50) || 'amount not specified'}` : 'No'}
- Number of Employees: ${str(employees, 50) || 'Not specified'}

Generate ONLY valid JSON (no markdown, no backticks, pure JSON) with this exact structure:

{
  "businessName": "${required.businessName}",
  "sections": [
    {
      "id": "executive-summary",
      "title": "Resumen Ejecutivo / Executive Summary",
      "content": "2-3 paragraph executive summary",
      "highlights": ["key highlight 1", "key highlight 2", "key highlight 3"]
    },
    {
      "id": "company-description",
      "title": "Descripcion de la Empresa / Company Description",
      "content": "detailed company description",
      "highlights": ["mission statement", "vision", "legal structure recommendation"]
    },
    {
      "id": "market-analysis",
      "title": "Analisis de Mercado / Market Analysis",
      "content": "market size, target segments, competition analysis",
      "highlights": ["target market size", "main competitors", "market opportunity"]
    },
    {
      "id": "products-services",
      "title": "Productos y Servicios / Products & Services",
      "content": "detailed product/service description, pricing strategy",
      "highlights": ["core offering", "pricing model", "competitive advantage"]
    },
    {
      "id": "marketing-sales",
      "title": "Estrategia de Marketing y Ventas / Marketing & Sales Strategy",
      "content": "channels, positioning, customer acquisition strategy",
      "highlights": ["primary channels", "customer acquisition cost estimate", "growth strategy"]
    },
    {
      "id": "operations",
      "title": "Plan Operativo / Operations Plan",
      "content": "day-to-day operations, processes, technology needs",
      "highlights": ["key processes", "technology stack", "supplier/vendor strategy"]
    },
    {
      "id": "team",
      "title": "Equipo y Organizacion / Team & Organization",
      "content": "org structure, key roles, hiring plan",
      "highlights": ["key roles needed", "org structure", "hiring timeline"]
    },
    {
      "id": "financial-projections",
      "title": "Proyecciones Financieras / Financial Projections",
      "content": "3-year projections with revenue, costs, profit. Include a markdown table with Year 1, Year 2, Year 3 columns showing: Revenue, COGS, Gross Profit, Operating Expenses, Net Profit, Profit Margin %",
      "highlights": ["year 1 revenue projection", "break-even timeline", "3-year profit trend"]
    },
    {
      "id": "risk-analysis",
      "title": "Analisis de Riesgos / Risk Analysis",
      "content": "top risks with mitigation strategies",
      "highlights": ["risk 1 + mitigation", "risk 2 + mitigation", "risk 3 + mitigation"]
    },
    {
      "id": "implementation",
      "title": "Plan de Implementacion / Implementation Plan",
      "content": "12-month timeline with milestones. Include a markdown table: Month | Milestone | Key Actions",
      "highlights": ["months 1-3 focus", "months 4-6 focus", "months 7-12 focus"]
    }
  ],
  "keyMetrics": {
    "estimatedRevYear1": "$X",
    "breakEvenMonths": "X months",
    "initialInvestmentNeeded": "$X",
    "projectedMarginYear3": "X%"
  }
}

IMPORTANT INSTRUCTIONS:
- All section content should be detailed (3-5 paragraphs each minimum)
- Financial projections must use specific USD dollar amounts based on industry benchmarks and the stated monthly sales
- If a US state or city is provided in Location, localize insights: reference state-specific regulations, local market dynamics, and demographic data
- Include specific, actionable recommendations (not generic advice)
- Highlights should be concise bullet points (max 15 words each)
- The financial table must use realistic numbers based on the industry and any monthly sales provided
- Write ALL prose entirely in ${promptLang} — section titles stay bilingual as shown
- Be specific to the business described, avoid filler language`

    const message = await client.messages.create({
      model: AI_MODELS.SONNET,
      max_tokens: 8192,
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
          return NextResponse.json(
            { error: errors.parseError, raw: resultText.substring(0, 500) },
            { status: 500 }
          )
        }
      } else {
        return NextResponse.json(
          { error: errors.parseError, raw: resultText.substring(0, 500) },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({ success: true, plan })
  } catch (error: unknown) {
    console.error('Business plan generation error:', error)
    const lang = 'ES' // best effort when body parsing itself failed
    const message = error instanceof Error ? error.message : ERRORS[lang].internal
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
