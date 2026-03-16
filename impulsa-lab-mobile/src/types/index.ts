// ============================================
// IMPULSA LAB - TIPOS DE TYPESCRIPT
// ============================================

// Dimensiones del diagnóstico
export type Dimension = 'finance' | 'operations' | 'marketing';

// Categorías de importancia de preguntas
export type QuestionCategory = 'CRITICAL' | 'IMPORTANT' | 'STANDARD';

// Clasificación de madurez empresarial
export type MaturityLevel = 'survival' | 'growth' | 'expansion';

// Industrias disponibles
export type Industry =
  | 'technology'
  | 'retail'
  | 'manufacturing'
  | 'healthcare'
  | 'professional_services'
  | 'hospitality'
  | 'construction'
  | 'education'
  | 'real_estate'
  | 'other';

// Tamaños de empresa
export type CompanySize = 'micro' | 'small' | 'medium' | 'large';

// ============================================
// INTERFACES DE PREGUNTAS
// ============================================

export interface QuestionOption {
  id: string;
  label: string;
  points: number;
}

export interface Question {
  id: string;
  dimension: Dimension;
  text: string;
  weight: number;
  category: QuestionCategory;
  options: QuestionOption[];
  isPreAssessment?: boolean;
}

// ============================================
// INTERFACES DE LEAD/USUARIO
// ============================================

export interface LeadData {
  name: string;
  email: string;
  phone?: string;
  companyName: string;
  industry: Industry;
  employeeCount: number;
  zipCode: string;
}

// ============================================
// INTERFACES DE RESPUESTAS Y RESULTADOS
// ============================================

export interface Answer {
  questionId: string;
  optionId: string;
  points: number;
}

export interface DimensionScore {
  dimension: Dimension;
  score: number;
  answeredQuestions: number;
  totalWeight: number;
}

export interface DiagnosticResult {
  id: string;
  leadData: LeadData;
  answers: Answer[];
  scores: {
    finance: number;
    operations: number;
    marketing: number;
    overall: number;
  };
  maturityLevel: MaturityLevel;
  industryComparison: {
    finance: BenchmarkComparison;
    operations: BenchmarkComparison;
    marketing: BenchmarkComparison;
  };
  completedAt: Date;
}

export interface BenchmarkComparison {
  userScore: number;
  industryAverage: number;
  percentile: string; // 'excellent' | 'good' | 'average' | 'below_average'
}

// ============================================
// INTERFACES DE BENCHMARKS
// ============================================

export interface IndustryBenchmark {
  industry: Industry;
  label: string;
  thresholds: {
    finance: BenchmarkThresholds;
    operations: BenchmarkThresholds;
    marketing: BenchmarkThresholds;
  };
}

export interface BenchmarkThresholds {
  excellent: number;
  good: number;
  average: number;
  belowAverage: number;
}

// ============================================
// INTERFACES DE TAMAÑO DE EMPRESA
// ============================================

export interface CompanySizeConfig {
  size: CompanySize;
  label: string;
  minEmployees: number;
  maxEmployees: number;
  baselines: {
    finance: number;
    operations: number;
    marketing: number;
  };
  recommendations: string[];
}

// ============================================
// INTERFACES DE ESTADO DE LA APP
// ============================================

export interface AppState {
  // Datos del lead
  leadData: LeadData | null;
  setLeadData: (data: LeadData) => void;

  // Respuestas del diagnóstico
  answers: Answer[];
  addAnswer: (answer: Answer) => void;
  clearAnswers: () => void;

  // Pregunta actual
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;

  // Resultado del diagnóstico
  result: DiagnosticResult | null;
  setResult: (result: DiagnosticResult) => void;

  // Estado de carga
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // Reset completo
  resetDiagnostic: () => void;
}

// ============================================
// INTERFACES DE FIREBASE
// ============================================

export interface FirestoreLead extends LeadData {
  createdAt: Date;
  updatedAt: Date;
}

export interface FirestoreDiagnostic {
  leadId: string;
  answers: Answer[];
  scores: DiagnosticResult['scores'];
  maturityLevel: MaturityLevel;
  completedAt: Date;
}
