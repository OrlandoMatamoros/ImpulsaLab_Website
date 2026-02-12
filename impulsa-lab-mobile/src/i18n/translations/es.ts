// Spanish translations
export const es = {
  // Common
  common: {
    loading: 'Cargando...',
    error: 'Error',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    next: 'Siguiente',
    previous: 'Anterior',
    submit: 'Enviar',
    save: 'Guardar',
    share: 'Compartir',
    download: 'Descargar',
    new: 'Nuevo',
  },

  // Lead Gate Screen
  leadGate: {
    title: 'Diagnóstico Empresarial 3D',
    subtitle: 'Evalúa tu negocio en 3 dimensiones clave',
    badges: {
      finance: 'Finanzas',
      operations: 'Operaciones',
      marketing: 'Marketing',
    },
    formTitle: 'Comencemos con tu información',
    formSubtitle: 'Estos datos nos ayudarán a personalizar tu diagnóstico',
    fields: {
      name: 'Nombre completo',
      namePlaceholder: 'Juan Pérez',
      email: 'Email',
      emailPlaceholder: 'juan@empresa.com',
      phone: 'Teléfono (opcional)',
      phonePlaceholder: '+52 55 1234 5678',
      company: 'Nombre de la empresa',
      companyPlaceholder: 'Mi Empresa S.A.',
      industry: 'Industria',
      industryPlaceholder: 'Selecciona tu industria',
      employees: 'Número de empleados',
      employeesPlaceholder: 'Selecciona el rango',
      zipCode: 'Código Postal',
      zipCodePlaceholder: '12345',
    },
    errors: {
      nameRequired: 'El nombre es requerido',
      emailRequired: 'El email es requerido',
      emailInvalid: 'Email inválido',
      companyRequired: 'El nombre de la empresa es requerido',
      industryRequired: 'Selecciona una industria',
      employeesRequired: 'Selecciona el número de empleados',
      zipCodeRequired: 'El código postal es requerido',
      zipCodeInvalid: 'Código postal inválido (5 dígitos)',
    },
    submitButton: 'Comenzar Diagnóstico',
    privacyNote: 'Tus datos están seguros y no serán compartidos con terceros',
    saveError: 'Hubo un problema al guardar tus datos. Por favor intenta de nuevo.',
  },

  // Diagnostic Wizard Screen
  wizard: {
    completed: 'completado',
    of: 'de',
    keyQuestion: 'Pregunta clave',
    selectionRequired: 'Selección requerida',
    selectOptionMessage: 'Por favor selecciona una opción para continuar.',
    processing: 'Procesando...',
    viewResults: 'Ver Resultados',
    exitTitle: 'Salir del diagnóstico',
    exitMessage: 'Tu progreso se guardará automáticamente. ¿Deseas salir?',
    exit: 'Salir',
    loadingQuestions: 'Cargando preguntas...',
    errorNoLead: 'No se encontraron los datos del lead.',
    processingError: 'Hubo un problema al procesar tu diagnóstico. Por favor intenta de nuevo.',
  },

  // Results Screen
  results: {
    completed: 'Diagnóstico completado',
    overallScore: 'Puntaje General',
    profileVsIndustry: 'Tu perfil vs. Industria',
    comparedWith: 'Comparado con',
    dimensionDetail: 'Detalle por dimensión',
    recommendations: 'Recomendaciones para ti',
    downloadPDF: 'Descargar Plan PDF',
    share: 'Compartir',
    new: 'Nuevo',
    noResults: 'No hay resultados disponibles',
    startDiagnostic: 'Iniciar diagnóstico',
    newDiagnosticTitle: 'Nuevo diagnóstico',
    newDiagnosticMessage: '¿Deseas iniciar un nuevo diagnóstico? Se borrarán los resultados actuales.',
    startNew: 'Iniciar nuevo',
    pdfGenerated: 'PDF Generado',
    pdfSaved: 'El archivo se ha guardado correctamente.',
    pdfError: 'No se pudo generar el PDF.',
    shareMessage: 'Mi Diagnóstico Empresarial 3D - Impulsa Lab\n\nPuntaje General: {overall}/100\nFinanzas: {finance}\nOperaciones: {operations}\nMarketing: {marketing}\n\nNivel: {level}\n\n¡Descubre el tuyo en Impulsa Lab!',
    legend: {
      yourScore: 'Tu puntaje',
      industryAverage: 'Promedio industria',
    },
    vsIndustry: 'vs industria',
  },

  // Dimensions
  dimensions: {
    finance: 'Finanzas',
    operations: 'Operaciones',
    marketing: 'Marketing',
  },

  // Maturity Levels
  maturity: {
    expansion: {
      label: 'Expansión',
      description: 'Organización lista para escalar',
    },
    growth: {
      label: 'Crecimiento',
      description: 'Empresa establecida con oportunidades de mejora',
    },
    survival: {
      label: 'Supervivencia',
      description: 'Desafíos fundamentales que requieren intervención',
    },
  },

  // Percentile Labels
  percentile: {
    excellent: 'Excelente',
    good: 'Bueno',
    average: 'Promedio',
    below_average: 'Por debajo del promedio',
  },

  // Industries
  industries: {
    retail: 'Comercio / Retail',
    manufacturing: 'Manufactura',
    services: 'Servicios profesionales',
    technology: 'Tecnología',
    healthcare: 'Salud',
    construction: 'Construcción',
    hospitality: 'Hotelería y turismo',
    education: 'Educación',
    agriculture: 'Agricultura',
    other: 'Otro',
  },

  // Employee counts
  employees: {
    '1-10': '1-10 empleados (Micro)',
    '11-50': '11-50 empleados (Pequeña)',
    '51-250': '51-250 empleados (Mediana)',
    '251+': '251+ empleados (Grande)',
  },

  // Language selector
  language: {
    title: 'Idioma',
    spanish: 'Español',
    english: 'English',
  },

  // Questions
  questions: {
    'FIN-PRE-1': {
      text: '¿Qué tan seguro te sientes manejando las finanzas de tu negocio?',
      options: {
        a: 'Sin control - No tengo visibilidad clara',
        b: 'Supervisión básica - Reviso ocasionalmente',
        c: 'Monitoreo constante - Tengo todo bajo control',
      },
    },
    'OPS-PRE-1': {
      text: '¿Qué porcentaje de tu semana involucra trabajo manual repetitivo?',
      options: {
        a: 'Más del 60% - La mayoría es repetitivo',
        b: '30-60% - Una buena parte',
        c: 'Menos del 30% - Muy poco',
      },
    },
    'MKT-PRE-1': {
      text: '¿Qué tan efectiva es tu visibilidad digital para atraer clientes?',
      options: {
        a: 'Mínima - Casi no tenemos presencia',
        b: 'Desestructurada - Publicamos sin estrategia',
        c: 'Estratégica - Tenemos un plan definido',
      },
    },
    'fin-b-1': {
      text: '¿Con qué frecuencia revisas los números financieros de tu negocio?',
      options: {
        a: 'Anualmente o nunca',
        b: 'Trimestralmente',
        c: 'Mensualmente',
        d: 'Semanalmente',
        e: 'Diariamente con reportes automatizados',
      },
    },
    'fin-b-2': {
      text: '¿Conoces el margen de ganancia de tus productos o servicios?',
      options: {
        a: 'No lo sé',
        b: 'Tengo una idea general',
        c: 'Conozco los principales productos',
        d: 'Tengo el catálogo completo documentado',
      },
    },
    'fin-b-3': {
      text: '¿Cómo manejas las cuentas personales vs. las del negocio?',
      options: {
        a: 'Están mezcladas',
        b: 'Parcialmente separadas',
        c: 'Completamente separadas con cuentas distintas',
      },
    },
    'fin-b-4': {
      text: '¿Cuántos meses de gastos operativos tienes en reserva?',
      options: {
        a: 'Menos de 1 mes',
        b: '1-3 meses',
        c: '3-6 meses',
        d: '6-12 meses',
        e: 'Más de 12 meses',
      },
    },
    'fin-b-5': {
      text: '¿Qué herramientas usas para administrar tus finanzas?',
      options: {
        a: 'Papel y cuaderno',
        b: 'Hojas de cálculo básicas (Excel/Sheets)',
        c: 'Software de contabilidad (QuickBooks, Wave)',
        d: 'ERP integrado con reportes automáticos',
      },
    },
    'ops-b-1': {
      text: '¿Cuántas horas a la semana dedicas a tareas repetitivas?',
      options: {
        a: 'Más de 20 horas',
        b: '10-20 horas',
        c: '5-10 horas',
        d: '2-5 horas',
        e: '0-2 horas (casi todo automatizado)',
      },
    },
    'ops-b-2': {
      text: '¿Cómo manejas las citas y reservaciones de clientes?',
      options: {
        a: 'Manualmente por teléfono/WhatsApp',
        b: 'Calendario básico (Google Calendar)',
        c: 'Sistema de reservas online',
        d: 'Sistema automatizado con recordatorios',
      },
    },
    'ops-b-3': {
      text: '¿Qué nivel de documentación tienen tus procesos?',
      options: {
        a: 'Ninguna - Todo está en mi cabeza',
        b: 'Notas básicas escritas',
        c: 'Manuales escritos formales',
        d: 'Documentación digital con videos',
      },
    },
    'ops-b-4': {
      text: '¿Cómo controlas tu inventario o recursos?',
      options: {
        a: 'De memoria',
        b: 'Lista manual o Excel básico',
        c: 'Sistema de inventario digital',
        d: 'Sistema automatizado con alertas',
      },
    },
    'ops-b-5': {
      text: '¿Cuánto tiempo te toma generar un reporte de resultados?',
      options: {
        a: 'Un día completo o más',
        b: 'Varias horas',
        c: 'Menos de una hora',
        d: 'Instantáneo (dashboards en tiempo real)',
      },
    },
    'mkt-b-1': {
      text: '¿Qué tan fácil es encontrar tu negocio en Google?',
      options: {
        a: 'No tenemos sitio web',
        b: 'Tenemos web pero no aparece en búsquedas',
        c: 'Aparecemos en algunas búsquedas',
        d: 'Estamos en los primeros resultados',
      },
    },
    'mkt-b-2': {
      text: '¿Con qué frecuencia publicas en redes sociales?',
      options: {
        a: 'Nunca o casi nunca',
        b: 'Ocasionalmente (cuando nos acordamos)',
        c: 'Semanalmente con calendario',
        d: 'Diariamente con estrategia definida',
      },
    },
    'mkt-b-3': {
      text: '¿Qué tan bien definido tienes tu cliente ideal?',
      options: {
        a: 'No lo tengo claro',
        b: 'Tengo una idea general',
        c: 'Perfil documentado básico',
        d: 'Buyer personas basados en datos',
      },
    },
    'mkt-b-4': {
      text: '¿Cómo consigues nuevos clientes actualmente?',
      options: {
        a: 'Solo por referidos',
        b: 'Referidos + algo de redes sociales',
        c: 'Múltiples canales (redes, Google, email)',
        d: 'Estrategia omnicanal integrada',
      },
    },
    'mkt-b-5': {
      text: '¿Mides el retorno de inversión de tu marketing?',
      options: {
        a: 'No mido nada',
        b: 'Tengo métricas básicas (seguidores, likes)',
        c: 'Mido conversiones y ventas',
        d: 'Atribución avanzada con ROI por canal',
      },
    },
  },
};

export type TranslationKeys = typeof es;
