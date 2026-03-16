// ============================================
// IMPULSA LAB - BANCO DE PREGUNTAS COMPLETO
// ============================================

import { Question } from '../types';

// Pre-Assessment Questions (3)
export const PRE_ASSESSMENT_QUESTIONS: Question[] = [
  {
    id: 'FIN-PRE-1',
    dimension: 'finance',
    text: '¿Qué tan seguro te sientes manejando las finanzas de tu negocio?',
    weight: 1.0,
    category: 'STANDARD',
    isPreAssessment: true,
    options: [
      { id: 'fin-pre-1-a', label: 'Sin control - No tengo visibilidad clara', points: 20 },
      { id: 'fin-pre-1-b', label: 'Supervisión básica - Reviso ocasionalmente', points: 50 },
      { id: 'fin-pre-1-c', label: 'Monitoreo constante - Tengo todo bajo control', points: 80 },
    ],
  },
  {
    id: 'OPS-PRE-1',
    dimension: 'operations',
    text: '¿Qué porcentaje de tu semana involucra trabajo manual repetitivo?',
    weight: 1.0,
    category: 'STANDARD',
    isPreAssessment: true,
    options: [
      { id: 'ops-pre-1-a', label: 'Más del 60% - La mayoría es repetitivo', points: 20 },
      { id: 'ops-pre-1-b', label: '30-60% - Una buena parte', points: 50 },
      { id: 'ops-pre-1-c', label: 'Menos del 30% - Muy poco', points: 80 },
    ],
  },
  {
    id: 'MKT-PRE-1',
    dimension: 'marketing',
    text: '¿Qué tan efectiva es tu visibilidad digital para atraer clientes?',
    weight: 1.0,
    category: 'STANDARD',
    isPreAssessment: true,
    options: [
      { id: 'mkt-pre-1-a', label: 'Mínima - Casi no tenemos presencia', points: 20 },
      { id: 'mkt-pre-1-b', label: 'Desestructurada - Publicamos sin estrategia', points: 50 },
      { id: 'mkt-pre-1-c', label: 'Estratégica - Tenemos un plan definido', points: 80 },
    ],
  },
];

// Finance Module Questions (5)
export const FINANCE_QUESTIONS: Question[] = [
  {
    id: 'fin-b-1',
    dimension: 'finance',
    text: '¿Con qué frecuencia revisas los números financieros de tu negocio?',
    weight: 2.0,
    category: 'CRITICAL',
    options: [
      { id: 'fin-b-1-a', label: 'Anualmente o nunca', points: 20 },
      { id: 'fin-b-1-b', label: 'Trimestralmente', points: 40 },
      { id: 'fin-b-1-c', label: 'Mensualmente', points: 60 },
      { id: 'fin-b-1-d', label: 'Semanalmente', points: 80 },
      { id: 'fin-b-1-e', label: 'Diariamente con reportes automatizados', points: 95 },
    ],
  },
  {
    id: 'fin-b-2',
    dimension: 'finance',
    text: '¿Conoces el margen de ganancia de tus productos o servicios?',
    weight: 1.8,
    category: 'CRITICAL',
    options: [
      { id: 'fin-b-2-a', label: 'No lo sé', points: 10 },
      { id: 'fin-b-2-b', label: 'Tengo una idea general', points: 35 },
      { id: 'fin-b-2-c', label: 'Conozco los principales productos', points: 60 },
      { id: 'fin-b-2-d', label: 'Tengo el catálogo completo documentado', points: 95 },
    ],
  },
  {
    id: 'fin-b-3',
    dimension: 'finance',
    text: '¿Cómo manejas las cuentas personales vs. las del negocio?',
    weight: 1.5,
    category: 'IMPORTANT',
    options: [
      { id: 'fin-b-3-a', label: 'Están mezcladas', points: 15 },
      { id: 'fin-b-3-b', label: 'Parcialmente separadas', points: 50 },
      { id: 'fin-b-3-c', label: 'Completamente separadas con cuentas distintas', points: 95 },
    ],
  },
  {
    id: 'fin-b-4',
    dimension: 'finance',
    text: '¿Cuántos meses de gastos operativos tienes en reserva?',
    weight: 1.8,
    category: 'CRITICAL',
    options: [
      { id: 'fin-b-4-a', label: 'Menos de 1 mes', points: 10 },
      { id: 'fin-b-4-b', label: '1-3 meses', points: 40 },
      { id: 'fin-b-4-c', label: '3-6 meses', points: 65 },
      { id: 'fin-b-4-d', label: '6-12 meses', points: 85 },
      { id: 'fin-b-4-e', label: 'Más de 12 meses', points: 100 },
    ],
  },
  {
    id: 'fin-b-5',
    dimension: 'finance',
    text: '¿Qué herramientas usas para administrar tus finanzas?',
    weight: 1.2,
    category: 'IMPORTANT',
    options: [
      { id: 'fin-b-5-a', label: 'Papel y cuaderno', points: 15 },
      { id: 'fin-b-5-b', label: 'Hojas de cálculo básicas (Excel/Sheets)', points: 40 },
      { id: 'fin-b-5-c', label: 'Software de contabilidad (QuickBooks, Wave)', points: 70 },
      { id: 'fin-b-5-d', label: 'ERP integrado con reportes automáticos', points: 100 },
    ],
  },
];

// Operations Module Questions (5)
export const OPERATIONS_QUESTIONS: Question[] = [
  {
    id: 'ops-b-1',
    dimension: 'operations',
    text: '¿Cuántas horas a la semana dedicas a tareas repetitivas?',
    weight: 2.0,
    category: 'CRITICAL',
    options: [
      { id: 'ops-b-1-a', label: 'Más de 20 horas', points: 15 },
      { id: 'ops-b-1-b', label: '10-20 horas', points: 35 },
      { id: 'ops-b-1-c', label: '5-10 horas', points: 55 },
      { id: 'ops-b-1-d', label: '2-5 horas', points: 75 },
      { id: 'ops-b-1-e', label: '0-2 horas (casi todo automatizado)', points: 95 },
    ],
  },
  {
    id: 'ops-b-2',
    dimension: 'operations',
    text: '¿Cómo manejas las citas y reservaciones de clientes?',
    weight: 1.5,
    category: 'IMPORTANT',
    options: [
      { id: 'ops-b-2-a', label: 'Manualmente por teléfono/WhatsApp', points: 20 },
      { id: 'ops-b-2-b', label: 'Calendario básico (Google Calendar)', points: 45 },
      { id: 'ops-b-2-c', label: 'Sistema de reservas online', points: 70 },
      { id: 'ops-b-2-d', label: 'Sistema automatizado con recordatorios', points: 95 },
    ],
  },
  {
    id: 'ops-b-3',
    dimension: 'operations',
    text: '¿Qué nivel de documentación tienen tus procesos?',
    weight: 1.6,
    category: 'CRITICAL',
    options: [
      { id: 'ops-b-3-a', label: 'Ninguna - Todo está en mi cabeza', points: 10 },
      { id: 'ops-b-3-b', label: 'Notas básicas escritas', points: 30 },
      { id: 'ops-b-3-c', label: 'Manuales escritos formales', points: 60 },
      { id: 'ops-b-3-d', label: 'Documentación digital con videos', points: 100 },
    ],
  },
  {
    id: 'ops-b-4',
    dimension: 'operations',
    text: '¿Cómo controlas tu inventario o recursos?',
    weight: 1.4,
    category: 'IMPORTANT',
    options: [
      { id: 'ops-b-4-a', label: 'De memoria', points: 15 },
      { id: 'ops-b-4-b', label: 'Lista manual o Excel básico', points: 35 },
      { id: 'ops-b-4-c', label: 'Sistema de inventario digital', points: 65 },
      { id: 'ops-b-4-d', label: 'Sistema automatizado con alertas', points: 95 },
    ],
  },
  {
    id: 'ops-b-5',
    dimension: 'operations',
    text: '¿Cuánto tiempo te toma generar un reporte de resultados?',
    weight: 1.3,
    category: 'IMPORTANT',
    options: [
      { id: 'ops-b-5-a', label: 'Un día completo o más', points: 20 },
      { id: 'ops-b-5-b', label: 'Varias horas', points: 40 },
      { id: 'ops-b-5-c', label: 'Menos de una hora', points: 70 },
      { id: 'ops-b-5-d', label: 'Instantáneo (dashboards en tiempo real)', points: 100 },
    ],
  },
];

// Marketing Module Questions (5)
export const MARKETING_QUESTIONS: Question[] = [
  {
    id: 'mkt-b-1',
    dimension: 'marketing',
    text: '¿Qué tan fácil es encontrar tu negocio en Google?',
    weight: 2.0,
    category: 'CRITICAL',
    options: [
      { id: 'mkt-b-1-a', label: 'No tenemos sitio web', points: 10 },
      { id: 'mkt-b-1-b', label: 'Tenemos web pero no aparece en búsquedas', points: 30 },
      { id: 'mkt-b-1-c', label: 'Aparecemos en algunas búsquedas', points: 55 },
      { id: 'mkt-b-1-d', label: 'Estamos en los primeros resultados', points: 95 },
    ],
  },
  {
    id: 'mkt-b-2',
    dimension: 'marketing',
    text: '¿Con qué frecuencia publicas en redes sociales?',
    weight: 1.5,
    category: 'IMPORTANT',
    options: [
      { id: 'mkt-b-2-a', label: 'Nunca o casi nunca', points: 15 },
      { id: 'mkt-b-2-b', label: 'Ocasionalmente (cuando nos acordamos)', points: 35 },
      { id: 'mkt-b-2-c', label: 'Semanalmente con calendario', points: 65 },
      { id: 'mkt-b-2-d', label: 'Diariamente con estrategia definida', points: 95 },
    ],
  },
  {
    id: 'mkt-b-3',
    dimension: 'marketing',
    text: '¿Qué tan bien definido tienes tu cliente ideal?',
    weight: 1.8,
    category: 'CRITICAL',
    options: [
      { id: 'mkt-b-3-a', label: 'No lo tengo claro', points: 15 },
      { id: 'mkt-b-3-b', label: 'Tengo una idea general', points: 40 },
      { id: 'mkt-b-3-c', label: 'Perfil documentado básico', points: 70 },
      { id: 'mkt-b-3-d', label: 'Buyer personas basados en datos', points: 100 },
    ],
  },
  {
    id: 'mkt-b-4',
    dimension: 'marketing',
    text: '¿Cómo consigues nuevos clientes actualmente?',
    weight: 1.6,
    category: 'CRITICAL',
    options: [
      { id: 'mkt-b-4-a', label: 'Solo por referidos', points: 25 },
      { id: 'mkt-b-4-b', label: 'Referidos + algo de redes sociales', points: 45 },
      { id: 'mkt-b-4-c', label: 'Múltiples canales (redes, Google, email)', points: 75 },
      { id: 'mkt-b-4-d', label: 'Estrategia omnicanal integrada', points: 100 },
    ],
  },
  {
    id: 'mkt-b-5',
    dimension: 'marketing',
    text: '¿Mides el retorno de inversión de tu marketing?',
    weight: 1.4,
    category: 'IMPORTANT',
    options: [
      { id: 'mkt-b-5-a', label: 'No mido nada', points: 20 },
      { id: 'mkt-b-5-b', label: 'Tengo métricas básicas (seguidores, likes)', points: 40 },
      { id: 'mkt-b-5-c', label: 'Mido conversiones y ventas', points: 70 },
      { id: 'mkt-b-5-d', label: 'Atribución avanzada con ROI por canal', points: 100 },
    ],
  },
];

// All questions combined in order
export const ALL_QUESTIONS: Question[] = [
  ...PRE_ASSESSMENT_QUESTIONS,
  ...FINANCE_QUESTIONS,
  ...OPERATIONS_QUESTIONS,
  ...MARKETING_QUESTIONS,
];

// Questions by dimension (for scoring)
export const QUESTIONS_BY_DIMENSION = {
  finance: [...PRE_ASSESSMENT_QUESTIONS.filter(q => q.dimension === 'finance'), ...FINANCE_QUESTIONS],
  operations: [...PRE_ASSESSMENT_QUESTIONS.filter(q => q.dimension === 'operations'), ...OPERATIONS_QUESTIONS],
  marketing: [...PRE_ASSESSMENT_QUESTIONS.filter(q => q.dimension === 'marketing'), ...MARKETING_QUESTIONS],
};
