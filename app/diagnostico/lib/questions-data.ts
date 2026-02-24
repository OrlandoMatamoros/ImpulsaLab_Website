import { Question } from '@/types/questions';

// Structural data only — text comes from translations
const questionStructure = {
  finance: {
    basic: [
      { id: 'fin-b-1', type: 'multiple-choice' as const, weight: 2.0, category: 'critical' as const, maturityLevel: 'basic' as const, optionValues: [
        { value: 'daily-automated', score: 95 }, { value: 'weekly', score: 80 }, { value: 'monthly', score: 60 }, { value: 'quarterly', score: 40 }, { value: 'yearly', score: 20 }
      ]},
      { id: 'fin-b-2', type: 'multiple-choice' as const, weight: 1.8, category: 'critical' as const, maturityLevel: 'basic' as const, optionValues: [
        { value: 'none', score: 10 }, { value: 'approx', score: 40 }, { value: 'some', score: 70 }, { value: 'all', score: 95 }
      ]},
      { id: 'fin-b-3', type: 'multiple-choice' as const, weight: 1.5, category: 'important' as const, maturityLevel: 'basic' as const, optionValues: [
        { value: 'no', score: 15 }, { value: 'partial', score: 50 }, { value: 'yes', score: 95 }
      ]},
      { id: 'fin-b-4', type: 'multiple-choice' as const, weight: 1.8, category: 'critical' as const, maturityLevel: 'basic' as const, optionValues: [
        { value: 'none', score: 10 }, { value: '1-2', score: 30 }, { value: '3-6', score: 60 }, { value: '6-12', score: 85 }, { value: '12+', score: 100 }
      ]},
      { id: 'fin-b-5', type: 'multiple-choice' as const, weight: 1.2, category: 'important' as const, maturityLevel: 'basic' as const, optionValues: [
        { value: 'paper', score: 15 }, { value: 'excel-basic', score: 40 }, { value: 'excel-advanced', score: 65 }, { value: 'software', score: 85 }, { value: 'erp', score: 100 }
      ]},
    ],
    intermediate: [] as any[],
    advanced: [] as any[],
  },
  operations: {
    basic: [
      { id: 'ops-b-1', type: 'multiple-choice' as const, weight: 2.0, category: 'critical' as const, maturityLevel: 'basic' as const, optionValues: [
        { value: '0-2', score: 95 }, { value: '3-5', score: 75 }, { value: '6-10', score: 55 }, { value: '11-20', score: 35 }, { value: '20+', score: 15 }
      ]},
      { id: 'ops-b-2', type: 'multiple-choice' as const, weight: 1.5, category: 'important' as const, maturityLevel: 'basic' as const, optionValues: [
        { value: 'phone', score: 20 }, { value: 'email', score: 40 }, { value: 'calendar', score: 60 }, { value: 'booking', score: 80 }, { value: 'automated', score: 95 }
      ]},
      { id: 'ops-b-3', type: 'multiple-choice' as const, weight: 1.6, category: 'critical' as const, maturityLevel: 'basic' as const, optionValues: [
        { value: 'none', score: 10 }, { value: 'some', score: 35 }, { value: 'most', score: 65 }, { value: 'all', score: 85 }, { value: 'digital', score: 100 }
      ]},
      { id: 'ops-b-4', type: 'multiple-choice' as const, weight: 1.4, category: 'important' as const, maturityLevel: 'basic' as const, optionValues: [
        { value: 'mental', score: 15 }, { value: 'paper', score: 30 }, { value: 'excel', score: 50 }, { value: 'software', score: 75 }, { value: 'automated', score: 95 }
      ]},
      { id: 'ops-b-5', type: 'multiple-choice' as const, weight: 1.3, category: 'important' as const, maturityLevel: 'basic' as const, optionValues: [
        { value: 'instant', score: 100 }, { value: '30min', score: 80 }, { value: '2hours', score: 60 }, { value: '4hours', score: 40 }, { value: 'day', score: 20 }
      ]},
    ],
    intermediate: [] as any[],
    advanced: [] as any[],
  },
  marketing: {
    basic: [
      { id: 'mkt-b-1', type: 'multiple-choice' as const, weight: 2.0, category: 'critical' as const, maturityLevel: 'basic' as const, optionValues: [
        { value: 'no-website', score: 10 }, { value: 'unsure', score: 30 }, { value: 'sometimes', score: 50 }, { value: 'usually', score: 75 }, { value: 'always', score: 95 }
      ]},
      { id: 'mkt-b-2', type: 'multiple-choice' as const, weight: 1.5, category: 'important' as const, maturityLevel: 'basic' as const, optionValues: [
        { value: 'never', score: 15 }, { value: 'sporadic', score: 35 }, { value: 'weekly', score: 55 }, { value: 'daily', score: 75 }, { value: 'multiple', score: 95 }
      ]},
      { id: 'mkt-b-3', type: 'multiple-choice' as const, weight: 1.8, category: 'critical' as const, maturityLevel: 'basic' as const, optionValues: [
        { value: 'no-idea', score: 15 }, { value: 'basic', score: 40 }, { value: 'defined', score: 65 }, { value: 'detailed', score: 85 }, { value: 'data-driven', score: 100 }
      ]},
      { id: 'mkt-b-4', type: 'multiple-choice' as const, weight: 1.6, category: 'critical' as const, maturityLevel: 'basic' as const, optionValues: [
        { value: 'referrals', score: 25 }, { value: 'basic-ads', score: 45 }, { value: 'multi-channel', score: 65 }, { value: 'integrated', score: 85 }, { value: 'omnichannel', score: 100 }
      ]},
      { id: 'mkt-b-5', type: 'multiple-choice' as const, weight: 1.4, category: 'important' as const, maturityLevel: 'basic' as const, optionValues: [
        { value: 'no', score: 20 }, { value: 'guess', score: 45 }, { value: 'basic', score: 65 }, { value: 'detailed', score: 85 }, { value: 'advanced', score: 100 }
      ]},
    ],
    intermediate: [] as any[],
    advanced: [] as any[],
  },
};

// Translation shape for a single question
interface QuestionTranslation {
  text: string;
  helpText?: string;
  options: string[];
}

// Build questions by merging structure + translations
function buildQuestions(
  axis: 'finance' | 'operations' | 'marketing',
  translations?: QuestionTranslation[]
): Question[] {
  const structures = questionStructure[axis].basic;
  return structures.map((s, i) => {
    const tr = translations?.[i];
    return {
      id: s.id,
      text: tr?.text || '',
      helpText: tr?.helpText,
      type: s.type,
      weight: s.weight,
      category: s.category,
      maturityLevel: s.maturityLevel,
      options: s.optionValues.map((ov, j) => ({
        value: ov.value,
        label: tr?.options?.[j] || ov.value,
        score: ov.score,
      })),
    };
  });
}

// Legacy export for backward compatibility
export const questionBank = {
  finance: { basic: buildQuestions('finance'), intermediate: [], advanced: [] },
  operations: { basic: buildQuestions('operations'), intermediate: [], advanced: [] },
  marketing: { basic: buildQuestions('marketing'), intermediate: [], advanced: [] },
};

export function selectAdaptiveQuestions(
  axis: 'finance' | 'operations' | 'marketing',
  preAssessmentScore: number,
  numberOfQuestions: number = 5,
  translations?: QuestionTranslation[]
): Question[] {
  const questions = buildQuestions(axis, translations);
  return questions.slice(0, numberOfQuestions);
}
