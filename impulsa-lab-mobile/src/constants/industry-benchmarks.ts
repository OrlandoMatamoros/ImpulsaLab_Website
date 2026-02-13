// ============================================
// IMPULSA LAB - BENCHMARKS POR INDUSTRIA
// ============================================

import { IndustryBenchmark, Industry } from '../types';

export const INDUSTRY_BENCHMARKS: IndustryBenchmark[] = [
  {
    industry: 'technology',
    label: 'Tecnología',
    thresholds: {
      finance: { excellent: 85, good: 72, average: 60, belowAverage: 48 },
      operations: { excellent: 88, good: 75, average: 62, belowAverage: 50 },
      marketing: { excellent: 90, good: 78, average: 65, belowAverage: 52 },
    },
  },
  {
    industry: 'retail',
    label: 'Retail / Comercio',
    thresholds: {
      finance: { excellent: 78, good: 65, average: 52, belowAverage: 40 },
      operations: { excellent: 85, good: 72, average: 60, belowAverage: 48 },
      marketing: { excellent: 88, good: 75, average: 62, belowAverage: 50 },
    },
  },
  {
    industry: 'manufacturing',
    label: 'Manufactura',
    thresholds: {
      finance: { excellent: 82, good: 70, average: 58, belowAverage: 46 },
      operations: { excellent: 90, good: 77, average: 64, belowAverage: 52 },
      marketing: { excellent: 80, good: 67, average: 54, belowAverage: 42 },
    },
  },
  {
    industry: 'healthcare',
    label: 'Salud',
    thresholds: {
      finance: { excellent: 80, good: 68, average: 56, belowAverage: 44 },
      operations: { excellent: 85, good: 73, average: 61, belowAverage: 49 },
      marketing: { excellent: 75, good: 63, average: 51, belowAverage: 39 },
    },
  },
  {
    industry: 'professional_services',
    label: 'Servicios Profesionales',
    thresholds: {
      finance: { excellent: 83, good: 71, average: 59, belowAverage: 47 },
      operations: { excellent: 82, good: 70, average: 58, belowAverage: 46 },
      marketing: { excellent: 85, good: 73, average: 61, belowAverage: 49 },
    },
  },
  {
    industry: 'hospitality',
    label: 'Hospitalidad / Restaurantes',
    thresholds: {
      finance: { excellent: 75, good: 63, average: 51, belowAverage: 39 },
      operations: { excellent: 88, good: 76, average: 64, belowAverage: 52 },
      marketing: { excellent: 86, good: 74, average: 62, belowAverage: 50 },
    },
  },
  {
    industry: 'construction',
    label: 'Construcción',
    thresholds: {
      finance: { excellent: 78, good: 66, average: 54, belowAverage: 42 },
      operations: { excellent: 85, good: 73, average: 61, belowAverage: 49 },
      marketing: { excellent: 70, good: 58, average: 46, belowAverage: 34 },
    },
  },
  {
    industry: 'education',
    label: 'Educación',
    thresholds: {
      finance: { excellent: 76, good: 64, average: 52, belowAverage: 40 },
      operations: { excellent: 80, good: 68, average: 56, belowAverage: 44 },
      marketing: { excellent: 82, good: 70, average: 58, belowAverage: 46 },
    },
  },
  {
    industry: 'real_estate',
    label: 'Bienes Raíces',
    thresholds: {
      finance: { excellent: 80, good: 68, average: 56, belowAverage: 44 },
      operations: { excellent: 78, good: 66, average: 54, belowAverage: 42 },
      marketing: { excellent: 88, good: 76, average: 64, belowAverage: 52 },
    },
  },
  {
    industry: 'other',
    label: 'Otra Industria',
    thresholds: {
      finance: { excellent: 78, good: 66, average: 54, belowAverage: 42 },
      operations: { excellent: 82, good: 70, average: 58, belowAverage: 46 },
      marketing: { excellent: 80, good: 68, average: 56, belowAverage: 44 },
    },
  },
];

// Helper function to get benchmark by industry
export const getBenchmarkByIndustry = (industry: Industry): IndustryBenchmark => {
  return INDUSTRY_BENCHMARKS.find(b => b.industry === industry) || INDUSTRY_BENCHMARKS[INDUSTRY_BENCHMARKS.length - 1];
};

// Helper function to get industry label
export const getIndustryLabel = (industry: Industry): string => {
  const benchmark = getBenchmarkByIndustry(industry);
  return benchmark.label;
};

// Industry options for dropdown
export const INDUSTRY_OPTIONS = INDUSTRY_BENCHMARKS.map(b => ({
  value: b.industry,
  label: b.label,
}));
