// ============================================
// IMPULSA LAB - MOTOR DE SCORING
// ============================================

import {
  Answer,
  Dimension,
  DimensionScore,
  DiagnosticResult,
  MaturityLevel,
  BenchmarkComparison,
  LeadData,
  Industry,
} from '../types';
import {
  ALL_QUESTIONS,
  QUESTIONS_BY_DIMENSION,
  DIMENSION_WEIGHTS,
  MATURITY_THRESHOLDS,
} from '../constants';
import { getBenchmarkByIndustry } from '../constants/industry-benchmarks';

/**
 * Calculate score for a single dimension
 * Formula: Score = Σ(Option_Points × Question_Weight) / Σ(Weights)
 */
export const calculateDimensionScore = (
  dimension: Dimension,
  answers: Answer[]
): DimensionScore => {
  const dimensionQuestions = QUESTIONS_BY_DIMENSION[dimension];

  let totalWeightedScore = 0;
  let totalWeight = 0;
  let answeredQuestions = 0;

  dimensionQuestions.forEach(question => {
    const answer = answers.find(a => a.questionId === question.id);
    if (answer) {
      totalWeightedScore += answer.points * question.weight;
      totalWeight += question.weight;
      answeredQuestions++;
    }
  });

  // Avoid division by zero
  const rawScore = totalWeight > 0 ? totalWeightedScore / totalWeight : 0;

  // Normalize score between 0 and 100
  const normalizedScore = Math.min(100, Math.max(0, Math.round(rawScore)));

  return {
    dimension,
    score: normalizedScore,
    answeredQuestions,
    totalWeight,
  };
};

/**
 * Calculate overall score using dimension weights (40-30-30)
 * Formula: Overall = (Finance × 0.40) + (Operations × 0.30) + (Marketing × 0.30)
 */
export const calculateOverallScore = (dimensionScores: {
  finance: number;
  operations: number;
  marketing: number;
}): number => {
  const overall =
    dimensionScores.finance * DIMENSION_WEIGHTS.finance +
    dimensionScores.operations * DIMENSION_WEIGHTS.operations +
    dimensionScores.marketing * DIMENSION_WEIGHTS.marketing;

  return Math.round(overall);
};

/**
 * Determine maturity level based on overall score
 * - Expansion: >= 70
 * - Growth: 40-69
 * - Survival: < 40
 */
export const determineMaturityLevel = (overallScore: number): MaturityLevel => {
  if (overallScore >= MATURITY_THRESHOLDS.expansion) {
    return 'expansion';
  } else if (overallScore >= MATURITY_THRESHOLDS.growth) {
    return 'growth';
  }
  return 'survival';
};

/**
 * Get maturity level display info
 */
export const getMaturityLevelInfo = (level: MaturityLevel): {
  label: string;
  description: string;
  color: string;
} => {
  const info = {
    expansion: {
      label: 'Expansión',
      description: 'Organización lista para escalar',
      color: '#22c55e', // green
    },
    growth: {
      label: 'Crecimiento',
      description: 'Empresa establecida con oportunidades de mejora',
      color: '#f59e0b', // amber
    },
    survival: {
      label: 'Supervivencia',
      description: 'Desafíos fundamentales que requieren intervención',
      color: '#ef4444', // red
    },
  };

  return info[level];
};

/**
 * Compare user score against industry benchmark
 */
export const compareWithBenchmark = (
  userScore: number,
  industry: Industry,
  dimension: Dimension
): BenchmarkComparison => {
  const benchmark = getBenchmarkByIndustry(industry);
  const thresholds = benchmark.thresholds[dimension];

  // Calculate industry average (midpoint of good and average)
  const industryAverage = Math.round((thresholds.good + thresholds.average) / 2);

  // Determine percentile category
  let percentile: string;
  if (userScore >= thresholds.excellent) {
    percentile = 'excellent';
  } else if (userScore >= thresholds.good) {
    percentile = 'good';
  } else if (userScore >= thresholds.average) {
    percentile = 'average';
  } else {
    percentile = 'below_average';
  }

  return {
    userScore,
    industryAverage,
    percentile,
  };
};

/**
 * Get percentile display info
 */
export const getPercentileInfo = (percentile: string): {
  label: string;
  color: string;
  emoji: string;
} => {
  const info: Record<string, { label: string; color: string; emoji: string }> = {
    excellent: {
      label: 'Excelente',
      color: '#22c55e',
      emoji: '🏆',
    },
    good: {
      label: 'Bueno',
      color: '#3b82f6',
      emoji: '👍',
    },
    average: {
      label: 'Promedio',
      color: '#f59e0b',
      emoji: '📊',
    },
    below_average: {
      label: 'Por debajo del promedio',
      color: '#ef4444',
      emoji: '⚠️',
    },
  };

  return info[percentile] || info.average;
};

/**
 * Generate unique diagnostic ID
 */
const generateDiagnosticId = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `diag_${timestamp}_${random}`;
};

/**
 * Calculate complete diagnostic result
 */
export const calculateDiagnosticResult = (
  leadData: LeadData,
  answers: Answer[]
): DiagnosticResult => {
  // Calculate dimension scores
  const financeScore = calculateDimensionScore('finance', answers);
  const operationsScore = calculateDimensionScore('operations', answers);
  const marketingScore = calculateDimensionScore('marketing', answers);

  const scores = {
    finance: financeScore.score,
    operations: operationsScore.score,
    marketing: marketingScore.score,
    overall: 0,
  };

  // Calculate overall score
  scores.overall = calculateOverallScore(scores);

  // Determine maturity level
  const maturityLevel = determineMaturityLevel(scores.overall);

  // Compare with industry benchmarks
  const industryComparison = {
    finance: compareWithBenchmark(scores.finance, leadData.industry, 'finance'),
    operations: compareWithBenchmark(scores.operations, leadData.industry, 'operations'),
    marketing: compareWithBenchmark(scores.marketing, leadData.industry, 'marketing'),
  };

  return {
    id: generateDiagnosticId(),
    leadData,
    answers,
    scores,
    maturityLevel,
    industryComparison,
    completedAt: new Date(),
  };
};

/**
 * Get question by ID
 */
export const getQuestionById = (questionId: string) => {
  return ALL_QUESTIONS.find(q => q.id === questionId);
};

/**
 * Get dimension label in Spanish
 */
export const getDimensionLabel = (dimension: Dimension): string => {
  const labels = {
    finance: 'Finanzas',
    operations: 'Operaciones',
    marketing: 'Marketing',
  };
  return labels[dimension];
};

/**
 * Calculate progress percentage
 */
export const calculateProgress = (currentIndex: number, totalQuestions: number): number => {
  return Math.round((currentIndex / totalQuestions) * 100);
};
