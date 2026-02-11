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
};

export type TranslationKeys = typeof es;
