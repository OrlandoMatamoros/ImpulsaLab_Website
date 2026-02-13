// ============================================
// IMPULSA LAB - GEMINI AI SERVICE
// ============================================

import { LeadData, Answer, DiagnosticScores } from '../types';

// API Configuration
const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Types for AI Recommendations
export interface AIRecommendations {
  primaryRecommendation: {
    title: string;
    why: string;
    impact: string;
    actions: string[];
    timeline: string;
    tools: string[];
    quickWin: string;
  };
  secondaryRecommendations: {
    finance: { title: string; action: string; impact: string };
    operations: { title: string; action: string; impact: string };
    marketing: { title: string; action: string; impact: string };
  };
  roadmap90Days: Array<{
    phase: string;
    focus: string;
    keyActions: string[];
    expectedOutcome: string;
  }>;
  warningMessage?: string;
  successMetrics: string[];
}

// Check if Gemini is configured
export const isGeminiConfigured = (): boolean => {
  return !!GEMINI_API_KEY && GEMINI_API_KEY.length > 10;
};

// Generate personalized recommendations using Gemini
export const generateAIRecommendations = async (
  scores: DiagnosticScores,
  leadData: LeadData,
  answers: Answer[],
  language: 'es' | 'en' = 'es'
): Promise<AIRecommendations | null> => {
  if (!isGeminiConfigured()) {
    console.log('Gemini API not configured, using fallback recommendations');
    return null;
  }

  const languageInstruction = language === 'es'
    ? 'Responde completamente en español.'
    : 'Respond completely in English.';

  const prompt = `
${languageInstruction}

Eres un consultor experto de Impulsa Lab especializado en transformación digital de negocios.

Analiza los siguientes datos del diagnóstico 3D:

INFORMACIÓN DEL CLIENTE:
- Empresa: ${leadData.companyName}
- Contacto: ${leadData.name}
- Email: ${leadData.email}
- Industria: ${leadData.industry}
- Empleados: ${leadData.employeeCount}

PUNTUACIONES DEL DIAGNÓSTICO 3D:
- Finanzas: ${scores.finance}/100
- Operaciones: ${scores.operations}/100
- Marketing: ${scores.marketing}/100
- Promedio General: ${scores.overall}/100

RESPUESTAS DEL DIAGNÓSTICO:
${JSON.stringify(answers.map(a => ({ questionId: a.questionId, points: a.points })), null, 2)}

Genera un plan de acción personalizado en formato JSON con la siguiente estructura EXACTA:

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
      "phase": "${language === 'es' ? 'Días 1-30' : 'Days 1-30'}",
      "focus": "Título del enfoque",
      "keyActions": ["Acción 1", "Acción 2"],
      "expectedOutcome": "Resultado esperado"
    },
    {
      "phase": "${language === 'es' ? 'Días 31-60' : 'Days 31-60'}",
      "focus": "Título del enfoque",
      "keyActions": ["Acción 1", "Acción 2"],
      "expectedOutcome": "Resultado esperado"
    },
    {
      "phase": "${language === 'es' ? 'Días 61-90' : 'Days 61-90'}",
      "focus": "Título del enfoque",
      "keyActions": ["Acción 1", "Acción 2"],
      "expectedOutcome": "Resultado esperado"
    }
  ],
  "warningMessage": "Solo si hay puntuaciones muy bajas (<30), incluir un mensaje de advertencia. De lo contrario, null",
  "successMetrics": ["Métrica 1 para medir éxito", "Métrica 2", "Métrica 3"]
}

IMPORTANTE:
- Sé específico y personalizado basándote en las puntuaciones y la industria
- Prioriza el eje con menor puntuación
- Las recomendaciones deben ser accionables y realistas para un negocio de ${leadData.employeeCount} empleados
- Incluye herramientas y tecnologías específicas
- El tono debe ser profesional pero cercano
- Si alguna puntuación es menor a 30, incluye warningMessage
- Responde SOLO con el JSON, sin texto adicional, sin markdown
`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      console.error('Gemini API error:', response.status, await response.text());
      return null;
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error('No text in Gemini response');
      return null;
    }

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('No JSON found in Gemini response');
      return null;
    }

    const recommendations = JSON.parse(jsonMatch[0]) as AIRecommendations;

    // Clean up warningMessage if it's null or "null"
    if (recommendations.warningMessage === 'null' || recommendations.warningMessage === null) {
      delete recommendations.warningMessage;
    }

    return recommendations;

  } catch (error) {
    console.error('Error generating AI recommendations:', error);
    return null;
  }
};

// Fallback recommendations when AI is not available
export const getFallbackRecommendations = (
  scores: DiagnosticScores,
  language: 'es' | 'en' = 'es'
): AIRecommendations => {
  const weakestAxis = scores.finance <= scores.operations && scores.finance <= scores.marketing
    ? 'finance'
    : scores.operations <= scores.marketing
    ? 'operations'
    : 'marketing';

  const translations = {
    es: {
      finance: {
        title: 'Fortalece tu Control Financiero',
        why: 'Las finanzas son la base de cualquier negocio. Sin visibilidad clara de tus números, es difícil tomar decisiones estratégicas.',
        action: 'Implementa un sistema de seguimiento financiero semanal',
        impact: 'Mejor control de flujo de efectivo y decisiones más informadas',
      },
      operations: {
        title: 'Optimiza tus Operaciones',
        why: 'La eficiencia operativa determina tu capacidad de escalar. Procesos manuales limitan el crecimiento.',
        action: 'Documenta y automatiza los 3 procesos más repetitivos',
        impact: 'Ahorro de 10+ horas semanales en tareas manuales',
      },
      marketing: {
        title: 'Aumenta tu Visibilidad Digital',
        why: 'En la era digital, la visibilidad es clave para atraer nuevos clientes. Sin presencia online, pierdes oportunidades.',
        action: 'Establece una presencia consistente en redes sociales',
        impact: 'Mayor alcance y generación de leads cualificados',
      },
      roadmap: [
        { phase: 'Días 1-30', focus: 'Diagnóstico y Quick Wins' },
        { phase: 'Días 31-60', focus: 'Implementación de Mejoras' },
        { phase: 'Días 61-90', focus: 'Optimización y Escalado' },
      ],
    },
    en: {
      finance: {
        title: 'Strengthen Your Financial Control',
        why: 'Finances are the foundation of any business. Without clear visibility of your numbers, it\'s hard to make strategic decisions.',
        action: 'Implement a weekly financial tracking system',
        impact: 'Better cash flow control and more informed decisions',
      },
      operations: {
        title: 'Optimize Your Operations',
        why: 'Operational efficiency determines your ability to scale. Manual processes limit growth.',
        action: 'Document and automate the 3 most repetitive processes',
        impact: 'Save 10+ hours weekly on manual tasks',
      },
      marketing: {
        title: 'Increase Your Digital Visibility',
        why: 'In the digital age, visibility is key to attracting new customers. Without an online presence, you lose opportunities.',
        action: 'Establish a consistent presence on social media',
        impact: 'Greater reach and qualified lead generation',
      },
      roadmap: [
        { phase: 'Days 1-30', focus: 'Diagnosis and Quick Wins' },
        { phase: 'Days 31-60', focus: 'Improvement Implementation' },
        { phase: 'Days 61-90', focus: 'Optimization and Scaling' },
      ],
    },
  };

  const t = translations[language];
  const primary = t[weakestAxis];

  return {
    primaryRecommendation: {
      title: primary.title,
      why: primary.why,
      impact: primary.impact,
      actions: [
        primary.action,
        language === 'es' ? 'Revisa tus métricas semanalmente' : 'Review your metrics weekly',
        language === 'es' ? 'Establece objetivos claros' : 'Set clear goals',
        language === 'es' ? 'Mide tu progreso mensualmente' : 'Measure your progress monthly',
      ],
      timeline: language === 'es' ? '30 días' : '30 days',
      tools: ['Google Sheets', 'Notion', 'Trello'],
      quickWin: primary.action,
    },
    secondaryRecommendations: {
      finance: {
        title: t.finance.title,
        action: t.finance.action,
        impact: t.finance.impact,
      },
      operations: {
        title: t.operations.title,
        action: t.operations.action,
        impact: t.operations.impact,
      },
      marketing: {
        title: t.marketing.title,
        action: t.marketing.action,
        impact: t.marketing.impact,
      },
    },
    roadmap90Days: t.roadmap.map((phase, index) => ({
      phase: phase.phase,
      focus: phase.focus,
      keyActions: [
        index === 0
          ? (language === 'es' ? 'Evaluar situación actual' : 'Evaluate current situation')
          : index === 1
          ? (language === 'es' ? 'Implementar cambios clave' : 'Implement key changes')
          : (language === 'es' ? 'Medir resultados' : 'Measure results'),
        language === 'es' ? 'Ajustar estrategia según resultados' : 'Adjust strategy based on results',
      ],
      expectedOutcome: index === 0
        ? (language === 'es' ? 'Claridad sobre prioridades' : 'Clarity on priorities')
        : index === 1
        ? (language === 'es' ? 'Mejoras visibles' : 'Visible improvements')
        : (language === 'es' ? 'Resultados medibles' : 'Measurable results'),
    })),
    successMetrics: [
      language === 'es' ? 'Incremento en puntuación del diagnóstico' : 'Increase in diagnostic score',
      language === 'es' ? 'Reducción de tiempo en tareas manuales' : 'Reduction in manual task time',
      language === 'es' ? 'Mejora en indicadores clave' : 'Improvement in key indicators',
    ],
  };
};
