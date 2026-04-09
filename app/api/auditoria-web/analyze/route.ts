import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export const maxDuration = 60

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
  try {
    const { url, sourceCode } = await req.json()

    if (!url && !sourceCode) {
      return NextResponse.json(
        { error: 'Se requiere una URL o codigo fuente para analizar.' },
        { status: 400 }
      )
    }

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
        const res = await fetch(normalizedUrl, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (compatible; ImpulsaLab-Audit/1.0; +https://tuimpulsalab.com)',
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          },
          signal: AbortSignal.timeout(15000),
          redirect: 'follow',
        })
        html = await res.text()
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Error desconocido al obtener URL'
        fetchError = message
      }
    }

    if (!html && fetchError) {
      return NextResponse.json(
        {
          error: `No se pudo acceder al sitio: ${fetchError}. Intenta pegar el codigo fuente directamente.`,
        },
        { status: 422 }
      )
    }

    if (!html) {
      return NextResponse.json(
        { error: 'No se obtuvo contenido para analizar.' },
        { status: 422 }
      )
    }

    const meta = extractMeta(html)
    meta.hasHttps = isHttps

    const truncatedHtml =
      html.length > 60000 ? html.substring(0, 60000) + '\n[...truncado...]' : html

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const prompt = `Eres un experto auditor web para Impulsa Lab, una consultora tech para pequenos negocios. Analiza el siguiente sitio web y genera un reporte profesional en JSON.

URL analizada: ${fetchedUrl}

METADATOS EXTRAIDOS:
${JSON.stringify(meta, null, 2)}

CODIGO HTML:
\`\`\`html
${truncatedHtml}
\`\`\`

Analiza el sitio en estas 6 dimensiones y responde UNICAMENTE con un JSON valido (sin markdown, sin backticks, solo JSON puro):

{
  "companyName": "nombre de la empresa detectado del sitio",
  "sections": [
    {
      "id": "seo",
      "name": "SEO Tecnico",
      "score": <0-100>,
      "findings": ["hallazgo especifico 1", "hallazgo 2", ...],
      "recommendations": ["recomendacion accionable 1", "recomendacion 2", ...]
    },
    {
      "id": "design",
      "name": "Diseno & UX",
      "score": <0-100>,
      "findings": [...],
      "recommendations": [...]
    },
    {
      "id": "commercial",
      "name": "Comercial & Merchandising",
      "score": <0-100>,
      "findings": [...],
      "recommendations": [...]
    },
    {
      "id": "structure",
      "name": "Estructura & Arquitectura",
      "score": <0-100>,
      "findings": [...],
      "recommendations": [...]
    },
    {
      "id": "presence",
      "name": "Presencia Digital",
      "score": <0-100>,
      "findings": [...],
      "recommendations": [...]
    },
    {
      "id": "security",
      "name": "Seguridad & Performance",
      "score": <0-100>,
      "findings": [...],
      "recommendations": [...]
    }
  ],
  "overallScore": <promedio ponderado 0-100>,
  "maturityLevel": "<Critico|En Desarrollo|Competente|Avanzado>",
  "topRecommendations": ["las 5 recomendaciones mas impactantes, priorizadas"],
  "impulsaServices": ["2-3 servicios de Impulsa Lab que ayudarian: ej 'Optimizacion SEO', 'Rediseno UX', 'Estrategia de Conversion', 'WhatsApp Bot para atencion al cliente', 'Automatizacion de Lead Capture'"]
}

CRITERIOS POR SECCION:

1. SEO Tecnico (seo): meta title/description, headings (H1 unico), sitemap signals, robots, schema markup, mobile-friendly signals, canonical, lang attribute, alt text en imagenes.

2. Diseno & UX (design): consistencia visual, tipografia legible, espaciado, accesibilidad (contraste, alt text, semantica HTML), navegacion clara, responsive signals, CTA visibles.

3. Comercial & Merchandising (commercial): propuesta de valor clara, CTAs efectivos, trust signals (testimonios, logos, certificaciones), funnel de conversion, pricing visible, urgencia/escasez.

4. Estructura & Arquitectura (structure): jerarquia de contenido, enlaces internos, footer completo, paginas legales (privacidad, terminos), breadcrumbs, navegacion logica.

5. Presencia Digital (presence): enlaces a redes sociales, blog/contenido, formulario de contacto/lead capture, email marketing signals, WhatsApp/chat, Google Business signals.

6. Seguridad & Performance (security): HTTPS, cantidad de scripts, optimizacion de imagenes, CDN signals, headers de seguridad, formularios seguros.

Se especifico en los hallazgos (menciona datos concretos del sitio). Las recomendaciones deben ser accionables. Cada seccion debe tener 3-6 hallazgos y 3-5 recomendaciones.`

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    })

    const textBlock = message.content.find((b) => b.type === 'text')
    if (!textBlock || textBlock.type !== 'text') {
      return NextResponse.json(
        { error: 'No se recibio respuesta del analisis.' },
        { status: 500 }
      )
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
            {
              error: 'Error al procesar el analisis. Intenta de nuevo.',
              raw: analysisText.substring(0, 500),
            },
            { status: 500 }
          )
        }
      } else {
        return NextResponse.json(
          {
            error: 'Error al procesar el analisis. Intenta de nuevo.',
            raw: analysisText.substring(0, 500),
          },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({
      success: true,
      url: fetchedUrl,
      analysis,
    })
  } catch (error: unknown) {
    console.error('Analysis error:', error)
    const message = error instanceof Error ? error.message : 'Error interno del servidor'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
