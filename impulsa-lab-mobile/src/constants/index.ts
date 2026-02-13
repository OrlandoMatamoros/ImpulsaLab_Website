// ============================================
// IMPULSA LAB - EXPORTACIÓN DE CONSTANTES
// ============================================

export * from './questions';
export * from './industry-benchmarks';
export * from './company-size';

// Dimension weights for overall score calculation
export const DIMENSION_WEIGHTS = {
  finance: 0.40,
  operations: 0.30,
  marketing: 0.30,
} as const;

// Maturity level thresholds
export const MATURITY_THRESHOLDS = {
  expansion: 70, // >= 70
  growth: 40,    // >= 40 && < 70
  survival: 0,   // < 40
} as const;

// App configuration
export const APP_CONFIG = {
  appName: 'Impulsa Lab',
  version: '1.0.0',
  supportEmail: 'soporte@impulsalab.com',
} as const;
