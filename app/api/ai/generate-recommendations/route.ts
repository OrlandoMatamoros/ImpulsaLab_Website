import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { rateLimit } from '@/lib/rate-limit';

// Inicializar Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

// Public endpoint hitting the paid Gemini API — previously had NO rate limit.
// Shared atomic limiter (Upstash Redis) caps anonymous quota abuse. 10/IP/hour
// leaves room for legitimate diagnostic re-runs while blocking floods.
const RATE_LIMIT_WINDOW_SEC = 60 * 60;
const RATE_LIMIT_MAX = 10;

export async function POST(request: Request) {
  try {
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const rl = await rateLimit({
      prefix: 'gr',
      identifier: clientIp,
      limit: RATE_LIMIT_MAX,
      windowSec: RATE_LIMIT_WINDOW_SEC,
    });
    if (!rl.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Has alcanzado el limite de recomendaciones por hora. Intenta de nuevo mas tarde.',
        },
        { status: 429 }
      );
    }

    const { scores, clientInfo, responses } = await request.json();

    // Verificar que tenemos la API key
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      console.error('No se encontró GOOGLE_GEMINI_API_KEY');
      return NextResponse.json({
        success: false,
        error: 'API key no configurada'
      });
    }

    // Crear el modelo
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    // Construir el prompt
    const prompt = `
    Eres un consultor experto de Impulsa Lab especializado en transformación digital de negocios.
    
    Analiza los siguientes datos del diagnóstico 3D:
    
    INFORMACIÓN DEL CLIENTE:
    - Empresa: ${clientInfo.companyName}
    - Contacto: ${clientInfo.contactName}
    - Industria: ${clientInfo.industry || 'No especificada'}
    - Empleados: ${clientInfo.employees || 'No especificado'}
    
    PUNTUACIONES DEL DIAGNÓSTICO 3D:
    - Finanzas: ${scores.finance}/100
    - Operaciones: ${scores.operations}/100
    - Marketing: ${scores.marketing}/100
    - Promedio: ${Math.round((scores.finance + scores.operations + scores.marketing) / 3)}/100
    
    RESPUESTAS DETALLADAS:
    ${JSON.stringify(responses, null, 2)}
    
    Genera un plan de acción personalizado en formato JSON con la siguiente estructura:
    
    {
      "primaryRecommendation": {
        "title": "Título específico basado en el eje más débil",
        "why": "Explicación clara de por qué es crítico actuar ahora (2-3 oraciones)",
        "impact": "Impacto cuantificable esperado",
        "actions": ["Acción 1 específica", "Acción 2", "Acción 3", "Acción 4"],
        "timeline": "Tiempo estimado de implementación",
        "tools": ["Herramienta 1", "Herramienta 2", "Herramienta 3"],
        "quickWin": "Una acción que pueden implementar hoy mismo"
      },
      "secondaryRecommendations": {
        "finance": {
          "title": "Mejora específica para finanzas",
          "action": "Acción concreta",
          "impact": "Resultado esperado"
        },
        "operations": {
          "title": "Mejora específica para operaciones",
          "action": "Acción concreta",
          "impact": "Resultado esperado"
        },
        "marketing": {
          "title": "Mejora específica para marketing",
          "action": "Acción concreta",
          "impact": "Resultado esperado"
        }
      },
      "roadmap90Days": [
        {
          "phase": "Días 1-30",
          "focus": "Título del enfoque",
          "keyActions": ["Acción 1", "Acción 2"],
          "expectedOutcome": "Resultado esperado"
        },
        {
          "phase": "Días 31-60",
          "focus": "Título del enfoque",
          "keyActions": ["Acción 1", "Acción 2"],
          "expectedOutcome": "Resultado esperado"
        },
        {
          "phase": "Días 61-90",
          "focus": "Título del enfoque",
          "keyActions": ["Acción 1", "Acción 2"],
          "expectedOutcome": "Resultado esperado"
        }
      ],
      "warningMessage": "Solo si hay puntuaciones muy bajas (<30), incluir un mensaje de advertencia",
      "successMetrics": ["Métrica 1 para medir éxito", "Métrica 2", "Métrica 3"]
    }
    
    IMPORTANTE:
    - Sé específico y personalizado basándote en las puntuaciones y respuestas
    - Prioriza el eje con menor puntuación
    - Las recomendaciones deben ser accionables y realistas
    - Incluye herramientas y tecnologías específicas
    - El tono debe ser profesional pero cercano
    - Si alguna puntuación es menor a 30, incluye warningMessage
    - Responde SOLO con el JSON, sin texto adicional
    `;

    // Generar las recomendaciones
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Intentar parsear el JSON
    try {
      // Limpiar el texto para obtener solo el JSON
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No se encontró JSON válido en la respuesta');
      }

      const recommendations = JSON.parse(jsonMatch[0]);

      return NextResponse.json({
        success: true,
        recommendations
      });

    } catch (parseError) {
      console.error('Error al parsear JSON:', parseError);
      console.log('Respuesta de Gemini:', text);
      
      return NextResponse.json({
        success: false,
        error: 'Error al procesar las recomendaciones'
      });
    }

  } catch (error) {
    console.error('Error en generate-recommendations:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
}