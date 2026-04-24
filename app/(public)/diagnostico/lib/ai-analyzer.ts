import OpenAI from 'openai';
import { AxisScores, DetailedScore } from './scoring-engine';

export interface AIAnalysisResult {
  executive_summary: string;
  key_insights: {
    finance: string[];
    operations: string[];
    marketing: string[];
  };
  critical_gaps: any[];
  recommendations: {
    quick_wins: any[];
    medium_term: any[];
    long_term: any[];
  };
  growth_potential: {
    scenario: string;
    projected_improvement: number;
    timeframe: string;
  };
  next_steps: string[];
}

export interface AIAnalyzerTranslations {
  executiveSummary: (companyName: string) => string;
  financeInsight: string;
  operationsInsight: string;
  marketingInsight: string;
  scenario: string;
  timeframe: string;
  nextSteps: string[];
  realTimeInsight: string;
}

export class AIAnalyzer {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }

  async analyzeDiagnostic(
    companyData: any,
    scores: AxisScores,
    detailedScores: DetailedScore[],
    responses: any[],
    translations?: AIAnalyzerTranslations
  ): Promise<AIAnalysisResult> {
    const t = translations;
    return {
      executive_summary: t?.executiveSummary(companyData.name) ?? `Full analysis for ${companyData.name}`,
      key_insights: {
        finance: [t?.financeInsight ?? 'Financial insight 1'],
        operations: [t?.operationsInsight ?? 'Operational insight 1'],
        marketing: [t?.marketingInsight ?? 'Marketing insight 1']
      },
      critical_gaps: [],
      recommendations: {
        quick_wins: [],
        medium_term: [],
        long_term: []
      },
      growth_potential: {
        scenario: t?.scenario ?? 'Optimistic',
        projected_improvement: 30,
        timeframe: t?.timeframe ?? '6 months'
      },
      next_steps: t?.nextSteps ?? ['Next step 1', 'Next step 2']
    };
  }

  async analyzeResponseInRealTime(
    question: any,
    response: any,
    previousResponses: any[],
    translations?: { realTimeInsight: string }
  ): Promise<any> {
    return {
      insight: translations?.realTimeInsight ?? 'Real-time response analysis',
      followUpQuestion: null,
      suggestedProbe: null
    };
  }
}
