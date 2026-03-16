// ============================================
// IMPULSA LAB - CONFIGURACIÓN POR TAMAÑO DE EMPRESA
// ============================================

import { CompanySizeConfig, CompanySize } from '../types';

export const COMPANY_SIZE_CONFIGS: CompanySizeConfig[] = [
  {
    size: 'micro',
    label: 'Micro Empresa',
    minEmployees: 1,
    maxEmployees: 10,
    baselines: {
      finance: 50,
      operations: 45,
      marketing: 40,
    },
    recommendations: [
      'Enfócate en separar finanzas personales de las del negocio',
      'Implementa herramientas gratuitas de contabilidad',
      'Automatiza tareas repetitivas con herramientas simples',
      'Establece presencia básica en redes sociales',
    ],
  },
  {
    size: 'small',
    label: 'Pequeña Empresa',
    minEmployees: 11,
    maxEmployees: 50,
    baselines: {
      finance: 60,
      operations: 55,
      marketing: 55,
    },
    recommendations: [
      'Implementa software de contabilidad profesional',
      'Documenta tus procesos clave',
      'Desarrolla una estrategia de marketing multicanal',
      'Considera contratar especialistas o agencias',
    ],
  },
  {
    size: 'medium',
    label: 'Mediana Empresa',
    minEmployees: 51,
    maxEmployees: 250,
    baselines: {
      finance: 70,
      operations: 70,
      marketing: 65,
    },
    recommendations: [
      'Evalúa implementar un ERP integrado',
      'Establece KPIs y dashboards de seguimiento',
      'Desarrolla buyer personas basados en datos',
      'Invierte en automatización de marketing',
    ],
  },
  {
    size: 'large',
    label: 'Gran Empresa',
    minEmployees: 251,
    maxEmployees: Infinity,
    baselines: {
      finance: 80,
      operations: 80,
      marketing: 75,
    },
    recommendations: [
      'Implementa sistemas de BI avanzados',
      'Optimiza procesos con metodologías lean/six sigma',
      'Desarrolla estrategia omnicanal integrada',
      'Considera transformación digital completa',
    ],
  },
];

// Helper function to get company size config by employee count
export const getCompanySizeByEmployees = (employeeCount: number): CompanySizeConfig => {
  const config = COMPANY_SIZE_CONFIGS.find(
    c => employeeCount >= c.minEmployees && employeeCount <= c.maxEmployees
  );
  return config || COMPANY_SIZE_CONFIGS[0];
};

// Helper function to get company size label
export const getCompanySizeLabel = (employeeCount: number): string => {
  const config = getCompanySizeByEmployees(employeeCount);
  return config.label;
};

// Employee count options for the form
export const EMPLOYEE_COUNT_OPTIONS = [
  { value: '1', label: '1-5 empleados' },
  { value: '6', label: '6-10 empleados' },
  { value: '15', label: '11-25 empleados' },
  { value: '35', label: '26-50 empleados' },
  { value: '75', label: '51-100 empleados' },
  { value: '150', label: '101-250 empleados' },
  { value: '300', label: '250+ empleados' },
];
