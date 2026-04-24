// Auto-generated — ES-only slice of diagnostico-ui.ts
// DO NOT edit directly; update diagnostico-ui.ts and re-run scripts/split-translations.mjs
// Traducciones para los componentes UI del Diagnóstico 3D

export const diagnosticoUiES = {
  // === DiagnosticWizard ===
  diagnosticWizard: {
    title: 'Diagnóstico 3D Empresarial',
    subtitle: 'Evalúa las tres dimensiones clave de tu negocio',
    steps: {
      registro: 'Registro',
      evaluacionInicial: 'Evaluación Inicial',
      finanzas: 'Finanzas',
      operaciones: 'Operaciones',
      marketing: 'Marketing',
      procesando: 'Procesando',
      resultados: 'Resultados',
    },
    pasoNDeTotal: 'Paso',
    de: 'de',
    completado: 'Completado',
    inicio: 'Inicio',
    reiniciar: 'Reiniciar',
    anterior: 'Anterior',
    siguiente: 'Siguiente',
    irAResultados: 'Ir a Resultados',
    procesamientoEnCurso: 'Procesamiento automático en curso...',
    progresoGuardado: 'Tu progreso se guarda automáticamente',
    errorNoLead: 'Error: No se encontraron datos del lead. Por favor, reinicia el diagnóstico.',
    resetDialogTitle: '¿Reiniciar el diagnóstico?',
    resetDialogDescription: 'Esta acción borrará todo tu progreso actual y comenzarás desde el principio. No se podrá recuperar la información ingresada.',
    cancelar: 'Cancelar',
    siReiniciar: 'Sí, reiniciar todo',
  },

  // === InitialLeadCapture ===
  initialLeadCapture: {
    title: 'Diagnóstico 3D Empresarial',
    subtitle: 'Registra tus datos para comenzar tu evaluación personalizada',
    accessNote: '✓ Recibirás acceso inmediato • ✓ Resultados por email',
    labelNombre: 'Tu Nombre Completo *',
    placeholderNombre: 'Ej: Juan Pérez',
    labelEmail: 'Email *',
    placeholderEmail: 'tu@email.com',
    emailNote: 'Te enviaremos los resultados a este correo',
    labelNegocio: 'Nombre de tu Negocio *',
    placeholderNegocio: 'Ej: Restaurante Antology',
    labelIndustria: 'Industria *',
    selectIndustria: 'Selecciona tu industria',
    industrias: {
      tecnologia: 'Tecnología',
      retail: 'Retail / Comercio',
      servicios: 'Servicios Profesionales',
      manufactura: 'Manufactura',
      salud: 'Salud y Bienestar',
      educacion: 'Educación',
      alimentos: 'Alimentos y Restaurantes',
      construccion: 'Construcción',
      turismo: 'Turismo y Hospitalidad',
      otro: 'Otro',
    },
    labelEmpleados: 'Número de Empleados *',
    placeholderEmpleados: 'Ej: 10',
    empleadosNote: 'Esto nos ayuda a personalizar el diagnóstico para tu empresa',
    labelTelefono: 'Teléfono',
    telefonoOpcional: '(Opcional)',
    placeholderTelefono: '+1 234 567 8900',
    btnSubmitting: 'Registrando acceso...',
    btnSubmit: 'Comenzar Diagnóstico Oficial',
    privacyNote: 'Tus datos están protegidos. No compartimos tu información.',
    errorNombreRequerido: 'El nombre es requerido',
    errorEmailRequerido: 'El email es requerido',
    errorEmailInvalido: 'Email inválido',
    errorNegocioRequerido: 'El nombre del negocio es requerido',
    errorIndustriaRequerida: 'Selecciona tu industria',
    errorEmpleadosRequerido: 'Ingresa el número de empleados',
    errorEmpleadosInvalido: 'Debe ser un número mayor a 0',
    beneficio1Titulo: 'Evaluación Rápida',
    beneficio1Desc: 'Solo 5-7 minutos',
    beneficio2Titulo: 'Resultados Detallados',
    beneficio2Desc: 'Por email al instante',
    beneficio3Titulo: 'Consulta Gratuita',
    beneficio3Desc: '30 min con experto',
  },

  // === PreAssessment ===
  preAssessment: {
    pregunta: 'Pregunta',
    de: 'de',
    anterior: '← Anterior',
    questions: [
      {
        title: 'Finanzas',
        question: '¿Qué tan en control te sientes de las finanzas de tu negocio?',
        options: [
          'Sin control - No sé mis números',
          'Control básico - Reviso ocasionalmente',
          'Buen control - Monitoreo constante',
        ],
      },
      {
        title: 'Operaciones',
        question: '¿Cuánto tiempo dedicas a tareas repetitivas y manuales?',
        options: [
          'Demasiado - Más del 60% del tiempo',
          'Moderado - Entre 30-60% del tiempo',
          'Poco - Menos del 30% del tiempo',
        ],
      },
      {
        title: 'Marketing',
        question: '¿Qué tan efectiva es tu presencia digital y atracción de clientes?',
        options: [
          'Muy básica - Casi no tengo presencia',
          'Moderada - Algo de presencia pero sin estrategia',
          'Fuerte - Estrategia clara y resultados medibles',
        ],
      },
    ],
  },

  // === AdaptiveQuestions ===
  adaptiveQuestions: {
    cargando: 'Cargando preguntas...',
    pregunta: 'Pregunta',
    de: 'de',
    completado: 'completado',
    anterior: 'Anterior',
    siguiente: 'Siguiente',
    completar: 'Completar',
    seleccionaOpcion: 'Selecciona una opción para continuar',
    puntuacionActual: 'Puntuación actual',
    sliderDesacuerdo: 'Totalmente en desacuerdo',
    sliderAcuerdo: 'Totalmente de acuerdo',
    categoryLabels: {
      critical: 'Crítico',
      important: 'Importante',
      relevant: 'Relevante',
    },
    axisInfo: {
      finance: {
        title: 'Finanzas',
        description: 'Evaluación de la gestión financiera y salud económica de tu empresa',
      },
      operations: {
        title: 'Operaciones',
        description: 'Análisis de la eficiencia operativa y procesos de tu negocio',
      },
      marketing: {
        title: 'Marketing',
        description: 'Evaluación de tus estrategias de marketing y presencia en el mercado',
      },
    },
  },

  // === AutoProcessing ===
  autoProcessing: {
    steps: {
      calculating: {
        title: 'Calculando Inteligencia de Negocio',
        description: 'Analizando tus respuestas en las 3 dimensiones...',
      },
      sendingReport: {
        title: 'Generando tu Reporte Personalizado',
        description: 'Preparando resultados detallados...',
      },
      sendingAdmin: {
        title: 'Enviando Resultados',
        descriptionPrefix: 'Enviando reporte a',
      },
      savingCrm: {
        title: 'Guardando Información',
        description: 'Almacenando tus resultados de forma segura...',
      },
      complete: {
        title: '¡Todo Listo!',
        description: 'Redirigiendo a tus resultados...',
      },
    },
    progreso: 'Progreso',
    vistaPrevia: 'Vista Previa de Resultados',
    finanzas: 'Finanzas',
    operaciones: 'Operaciones',
    marketing: 'Marketing',
    promedioGeneral: 'Promedio General',
    indicadores: {
      analisis: 'Análisis completado',
      reporte: 'Reporte generado',
      email: 'Email enviado',
      datos: 'Datos guardados',
      listo: '¡Listo para ver resultados!',
    },
    infoNote: 'Este proceso toma solo unos segundos...',
  },

  // === RadarChart3D ===
  radarChart3D: {
    defaultCompany: 'Tu Empresa',
    labels: ['FINANZAS', 'OPERACIONES', 'MARKETING'],
    labelsMobile: ['FIN', 'OPS', 'MKT'],
    expansion: 'Expansión',
    supervivencia: 'Supervivencia',
  },

  // === ClientInfoStep ===
  clientInfoStep: {
    labelEmpresa: 'Nombre de la Empresa *',
    placeholderEmpresa: 'Ej: Antology Restaurante',
    labelContacto: 'Nombre del Contacto *',
    placeholderContacto: 'Ej: Juan Pérez',
    labelIndustria: 'Industria *',
    selectIndustria: 'Selecciona una industria',
    industrias: [
      'Tecnología',
      'Retail',
      'Servicios',
      'Manufactura',
      'Salud',
      'Educación',
      'Alimentos',
      'Otro',
    ],
    labelEmpleados: 'Número de Empleados *',
    placeholderEmpleados: 'Ej: 10',
    labelIngresos: 'Ingresos Anuales (USD)',
    placeholderIngresos: 'Ej: 500000',
    labelEmail: 'Email de Contacto *',
    placeholderEmail: 'contacto@empresa.com',
    labelTelefono: 'Teléfono',
    placeholderTelefono: '+1 234 567 8900',
    btnSubmit: 'Continuar al Diagnóstico',
    errorEmpresa: 'El nombre de la empresa es requerido',
    errorContacto: 'El nombre de contacto es requerido',
    errorIndustria: 'Selecciona una industria',
    errorEmail: 'El email es requerido',
    errorEmailInvalido: 'Email inválido',
    errorEmpleados: 'Ingresa el número de empleados',
  },

  // === LeadConfirmation ===
  leadConfirmation: {
    // Success state
    successTitle: '¡Reporte Enviado Exitosamente!',
    successMsg: 'Hemos enviado tu diagnóstico completo a',
    checkInbox: 'Revisa tu bandeja de entrada',
    checkSpam: '(También verifica tu carpeta de SPAM)',
    redirecting: 'Redirigiendo a tu página de resultados...',
    redirectDesc: 'Allí podrás agendar tu consulta gratuita y ver el análisis completo',
    // Validation
    errorNombre: 'El nombre es requerido',
    errorEmail: 'El email es requerido',
    errorEmailInvalido: 'Email inválido',
    errorSubmit: 'Error al enviar el reporte. Intenta nuevamente.',
    errorConexion: 'Error de conexión. Verifica tu internet e intenta nuevamente.',
    // Main form
    completedTitle: '¡Diagnóstico Completado!',
    completedDesc: 'Confirma tus datos para enviarte el reporte completo y desbloquear tu resultado.',
    formTitle: 'Confirma tus Datos de Contacto',
    labelNombre: 'Nombre Completo *',
    placeholderNombre: 'Tu nombre completo',
    labelEmail: 'Email *',
    placeholderEmail: 'tu@email.com',
    // Info section
    infoTitle: 'Recibirás:',
    infoItems: [
      'Reporte completo con tu diagnóstico',
      'Análisis detallado de las 3 dimensiones',
      'Recomendaciones personalizadas',
      'Acceso a agendar consultoría gratuita',
    ],
    // Button
    btnSubmitting: 'Enviando...',
    btnSubmit: 'Enviar Resultados y Continuar',
    // Privacy
    privacyText: 'Al continuar, aceptas recibir el reporte y comunicaciones de ImpulsaLab.',
    privacyLink: 'Consulta nuestra',
    privacyLinkText: 'Política de Privacidad',
    // API data defaults
    noProporcionado: 'No proporcionado',
    noEspecificada: 'No especificada',
  },

  // === ProfessionalRecommendations ===
  professionalRecommendations: {
    // Loading
    loadingTitle: 'Analizando tu situación con IA...',
    loadingSubtitle: 'Generando recomendaciones personalizadas',
    // Errors
    errorGenerar: 'Error al generar recomendaciones',
    errorNote: 'Nota: Usando recomendaciones estándar.',
    // Labels
    badgeAI: 'Generado con IA',
    badgeStandard: 'Recomendaciones Estándar',
    // Card titles
    mainTitle: 'Plan de Acción Principal',
    quickWinTitle: '¡Acción Inmediata!',
    whyTitle: '¿Por qué es crítico actuar ahora?',
    impactTitle: 'Impacto esperado',
    actionPlanTitle: 'Plan de acción paso a paso',
    timelineTitle: 'Tiempo de implementación',
    toolsTitle: 'Herramientas recomendadas',
    warningTitle: 'Atención',
    roadmapTitle: 'Tu Roadmap Personalizado de 90 Días',
    expectedOutcome: 'Resultado esperado:',
    metricsTitle: 'Métricas Clave para Medir tu Éxito',
    // Secondary axis labels
    axisLabels: {
      finance: 'Finanzas',
      operations: 'Operaciones',
      marketing: 'Marketing',
    },
    // Default recommendations
    defaults: {
      titlePrefix: 'Mejora Urgente en',
      why: 'Este es tu punto más débil y está limitando el crecimiento de tu negocio.',
      impact: 'Mejora esperada del 30-50% en los próximos 90 días',
      actions: [
        'Implementar sistema de control básico',
        'Automatizar procesos clave',
        'Establecer métricas de seguimiento',
        'Crear plan de mejora continua',
      ],
      timeline: '4-6 semanas',
      tools: ['Herramientas digitales', 'Automatización', 'IA'],
      quickWin: 'Comienza hoy mismo con una auditoría rápida de tu situación actual',
      roadmap: [
        {
          phase: 'Días 1-30',
          focus: 'Establecer fundamentos',
          keyActions: ['Auditoría inicial', 'Quick wins'],
          expectedOutcome: 'Sistema básico funcionando',
        },
        {
          phase: 'Días 31-60',
          focus: 'Optimización y automatización',
          keyActions: ['Automatizar procesos', 'Entrenar equipo'],
          expectedOutcome: 'Eficiencia mejorada 30%',
        },
        {
          phase: 'Días 61-90',
          focus: 'Escalamiento',
          keyActions: ['Expandir sistema', 'Medir resultados'],
          expectedOutcome: 'Sistema completo operativo',
        },
      ],
    },
  },

  // === QuestionsData ===
  questionsData: {
    finance: [
      { text: '¿Con qué frecuencia revisas los números de tu negocio?', helpText: 'Incluye revisión de ventas, gastos y utilidades', options: ['Diariamente con dashboard automatizado', 'Semanalmente con reportes', 'Mensualmente', 'Trimestralmente', 'Anualmente o menos'] },
      { text: '¿Conoces el margen de ganancia de cada producto/servicio que ofreces?', options: ['No lo conozco', 'Tengo una idea aproximada', 'Lo sé para mis productos principales', 'Lo tengo calculado para todo mi catálogo'] },
      { text: '¿Tienes separadas las finanzas personales de las del negocio?', options: ['No, están mezcladas', 'Parcialmente separadas', 'Sí, completamente separadas'] },
      { text: '¿Cuántos meses podrías operar si mañana se detuvieran todas tus ventas?', helpText: 'Cash runway o colchón financiero', options: ['Menos de 1 mes', '1-2 meses', '3-6 meses', '6-12 meses', 'Más de 1 año'] },
      { text: '¿Qué herramientas utilizas para gestionar tus finanzas?', options: ['Papel o notas', 'Excel básico', 'Excel con fórmulas avanzadas', 'Software especializado', 'Sistema ERP integrado'] },
    ],
    operations: [
      { text: '¿Cuántas horas a la semana dedicas a tareas repetitivas?', helpText: 'Tareas que haces una y otra vez de la misma manera', options: ['0-2 horas', '3-5 horas', '6-10 horas', '11-20 horas', 'Más de 20 horas'] },
      { text: '¿Cómo gestionas las citas con clientes?', options: ['Por teléfono/WhatsApp manual', 'Por email ida y vuelta', 'Calendario compartido', 'Sistema de reservas online', 'Totalmente automatizado'] },
      { text: '¿Tienes documentados los procesos clave de tu negocio?', options: ['No, todo está en mi cabeza', 'Algunos procesos básicos', 'La mayoría documentados', 'Todos con procedimientos detallados', 'Sistema digital con videos'] },
      { text: '¿Cómo manejas el inventario de tu negocio?', options: ['Control mental', 'Registros en papel', 'Excel actualizado manualmente', 'Software especializado', 'Sistema automatizado con alertas'] },
      { text: '¿Cuánto tiempo te toma generar un reporte de desempeño?', options: ['Es instantáneo', 'Menos de 30 minutos', 'Unas 2 horas', 'Medio día', 'Un día completo o más'] },
    ],
    marketing: [
      { text: '¿Los clientes te encuentran fácilmente en Google?', options: ['No tengo sitio web', 'No estoy seguro', 'A veces aparezco', 'Usualmente en primera página', 'Siempre en los primeros resultados'] },
      { text: '¿Con qué frecuencia publicas en redes sociales?', options: ['Nunca o casi nunca', 'Cuando me acuerdo', '1-2 veces por semana', 'Diariamente', 'Varias veces al día con estrategia'] },
      { text: '¿Conoces quién es tu cliente ideal?', options: ['No lo tengo claro', 'Idea general', 'Perfil básico definido', 'Buyer persona detallado', 'Múltiples personas basadas en datos'] },
      { text: '¿Cómo captas nuevos clientes?', options: ['Solo por recomendaciones', 'Algo de publicidad básica', 'Varios canales sin integrar', 'Estrategia multicanal integrada', 'Omnicanal con automatización'] },
      { text: '¿Mides el retorno de tu inversión en marketing?', options: ['No mido ROI', 'Tengo una idea aproximada', 'Medición básica', 'Métricas detalladas', 'Analytics avanzado con atribución'] },
    ],
  },

  // === ScoringEngine ===
  scoringEngine: {
    maturityStages: {
      survival: 'Supervivencia',
      growth: 'Crecimiento',
      expansion: 'Expansión',
    },
  },

  // === AIAnalyzer ===
  aiAnalyzer: {
    executiveSummary: (companyName: string) => `Análisis completo para ${companyName}`,
    financeInsight: 'Insight financiero 1',
    operationsInsight: 'Insight operacional 1',
    marketingInsight: 'Insight de marketing 1',
    scenario: 'Optimista',
    timeframe: '6 meses',
    nextSteps: ['Siguiente paso 1', 'Siguiente paso 2'],
    realTimeInsight: 'Análisis en tiempo real de la respuesta',
  },

  // === ResultsDashboard ===
  resultsDashboard: {
    // Header
    headerTitle: 'Diagnóstico 3D Completado',
    defaultCompany: 'Tu Empresa',
    globalScore: 'Puntuación Global',
    // Business stages
    stages: {
      expansion: { stage: 'Expansión', description: 'Tu negocio está listo para escalar' },
      growth: { stage: 'Crecimiento', description: 'Tienes una base sólida para crecer' },
      survival: { stage: 'Supervivencia', description: 'Es momento de fortalecer los fundamentos' },
    },
    // Axis labels
    axisLabels: { finance: 'Finanzas', operations: 'Operaciones', marketing: 'Marketing' },
    // Tabs
    tabOverview: 'Vista General',
    tabDetails: 'Análisis Detallado',
    tabRecommendations: 'Plan de Acción IA',
    // Company profile
    companyProfileTitle: 'Perfil de Empresa',
    companyProfileSubtitle: 'Contexto para tu diagnóstico',
    clasificacion: 'Clasificación:',
    empleados: 'Empleados:',
    industria: 'Industria:',
    priorityTitle: 'Acciones Prioritarias',
    prioritySubtitle: 'Para tu tamaño e industria',
    strengthsTitle: 'Tus Fortalezas en',
    improvementTitle: 'Oportunidades de Mejora',
    // Radar chart
    radarTitle: 'Mapa 3D de tu Negocio',
    radarName: 'Tu Negocio',
    // Bar chart
    vsIndustry: 'vs Industria',
    avgPrefix: 'Promedio',
    // Insights
    criticalArea: 'Área Crítica',
    weakestMsg: 'Tu eje más débil es',
    withPoints: 'con',
    points: 'puntos',
    belowAvg: 'puntos por debajo del promedio de',
    improvementPotential: 'Potencial de Mejora',
    improvementMsg: 'de potencial de mejora promedio.',
    improvementHave: 'Tienes un',
    improvementAdvice: 'Con las estrategias correctas, puedes superar el promedio de la industria.',
    strengthCard: 'Tu Fortaleza',
    strengthMsg: 'Destacas en',
    aboveAvg: 'puntos sobre el promedio.',
    solidBase: 'Aprovecha esta base sólida para crecer.',
    // Details tab
    detailsTitle: 'Análisis Detallado por Eje - Industria:',
    benchmark: 'Benchmark',
    aboveLabel: '✓ Por encima',
    belowLabel: '✗ Por debajo',
    comparisonWith: 'Comparación con',
    diagnostico: 'Diagnóstico:',
    roiPotencial: 'ROI Potencial:',
    inMonths: 'en 12 meses',
    implTime: 'Tiempo de Implementación:',
    days: 'días',
    toSeeResults: 'para ver resultados',
    savingPotential: 'Ahorro Potencial:',
    hrsWeek: 'hrs/semana',
    inManualTasks: 'en tareas manuales',
    capacityIncrease: 'Incremento Capacidad:',
    noMoreHiring: 'sin contratar más personal',
    leadsIncrease: 'Incremento en Leads:',
    inSixMonths: 'en 6 meses',
    cacReduction: 'Reducción CAC:',
    withAutomation: 'con automatización',
    industryContext: 'Contexto de la Industria:',
    bestPractices: 'Mejores Prácticas en',
    trends: 'Tendencias en',
    // Finance diagnostics
    financeDiag: {
      excellent: (company: string, benchmark: number, industry: string) => `Excelente gestión financiera. ${company} demuestra un control excepcional, superando ampliamente el promedio de ${benchmark} puntos en ${industry}. Este nivel de madurez financiera te posiciona en el top 10% de tu industria.`,
      good: (score: number, benchmark: number) => `Control financiero sólido. Con ${score} puntos, ${score >= benchmark ? 'superas' : 'estás cerca de'} el promedio de la industria. Hay oportunidades específicas para optimizar márgenes y flujo de caja que podrían elevar tu puntuación 15-20 puntos adicionales.`,
      medium: (score: number, industry: string, benchmark: number) => `Control financiero en desarrollo. Tu puntuación de ${score} indica que hay sistemas básicos implementados, pero falta visibilidad en tiempo real. Las empresas de ${industry} con mejores prácticas promedian ${benchmark} puntos.`,
      low: (score: number, benchmark: number) => `Gestión financiera reactiva. Con ${score} puntos, estás ${benchmark - score} puntos por debajo del estándar de la industria. Esto representa la mayor oportunidad de mejora inmediata para tu negocio.`,
    },
    // Operations diagnostics
    opsDiag: {
      excellent: (score: number, benchmark: number, industry: string) => `Operaciones de clase mundial. Con ${score} puntos, superas el benchmark de ${benchmark} en ${industry}. Tus procesos automatizados y documentados son un activo competitivo que te permite escalar eficientemente.`,
      good: (score: number, benchmark: number) => `Operaciones eficientes. Tu puntuación de ${score} ${score >= benchmark ? 'supera' : 'se acerca a'} la media de la industria. Existe potencial para automatizar 2-3 procesos clave adicionales que liberarían 10-15 horas semanales.`,
      medium: (score: number, benchmark: number, industry: string) => `Operaciones funcionales con oportunidades. Con ${score} puntos, hay margen significativo para alcanzar el estándar de ${benchmark} en ${industry}. La automatización selectiva puede duplicar tu capacidad sin aumentar costos.`,
      low: (score: number, benchmark: number) => `Operaciones principalmente manuales. Tu puntuación de ${score} está ${benchmark - score} puntos debajo del promedio. Se estima que el 60-70% del tiempo de tu equipo se dedica a tareas repetitivas automatizables.`,
    },
    // Marketing diagnostics
    mktDiag: {
      excellent: (score: number, benchmark: number, industry: string) => `Marketing de alto rendimiento. Con ${score} puntos, superas significativamente el promedio de ${benchmark} en ${industry}. Tu marca genera demanda consistente y tiene un CAC optimizado con LTV/CAC > 3:1.`,
      good: (score: number, benchmark: number) => `Estrategia de marketing efectiva. Tu puntuación de ${score} ${score >= benchmark ? 'está por encima del' : 'se acerca al'} promedio de la industria. Con optimizaciones específicas en canales digitales, podrías reducir CAC en 20-30%.`,
      medium: (score: number, benchmark: number, industry: string) => `Marketing en fase de construcción. Con ${score} puntos, tienes base pero falta consistencia. El promedio en ${industry} es ${benchmark}, indicando oportunidad de crecimiento significativo en generación de demanda.`,
      low: (score: number, benchmark: number) => `Marketing reactivo y limitado. Tu puntuación de ${score} está ${benchmark - score} puntos bajo el estándar. Los competidores están capturando tu mercado potencial mediante estrategias digitales efectivas.`,
    },
    // Industry context texts
    financeContext: {
      Tecnología: 'En el sector tecnológico, el control financiero riguroso es crítico debido a los ciclos de inversión y la necesidad de demostrar métricas SaaS como MRR, CAC y LTV a inversores.',
      Retail: 'En retail, la gestión de inventario y márgenes ajustados requiere visibilidad financiera diaria. Los líderes del sector operan con dashboards en tiempo real.',
      Servicios: 'En servicios profesionales, el tracking de rentabilidad por proyecto y cliente es fundamental. Las firmas exitosas mantienen márgenes del 20-30% mediante control estricto.',
      Alimentos: 'En la industria alimentaria, el control de costos variables y la gestión de mermas puede significar la diferencia entre pérdida y ganancia. Los márgenes típicos oscilan entre 3-8%.',
      default: 'el control financiero efectivo es la base para la toma de decisiones estratégicas y el crecimiento sostenible.',
    },
    opsContext: {
      Tecnología: 'Las empresas tech líderes automatizan deployment, testing y soporte nivel 1. Utilizan metodologías ágiles y DevOps para reducir time-to-market en 40-60%.',
      Retail: 'Los retailers exitosos integran inventario, POS y e-commerce en tiempo real. La automatización de reabastecimiento y pricing dinámico son estándares de la industria.',
      Servicios: 'Las firmas de servicios eficientes automatizan propuestas, onboarding y facturación. Los líderes mantienen utilización del 75-85% mediante gestión inteligente de recursos.',
      Alimentos: 'En alimentos, la trazabilidad automatizada, control de temperatura y gestión FIFO son críticos. Los líderes reducen mermas al 2-3% mediante sistemas predictivos.',
      default: 'la eficiencia operativa marca la diferencia entre líderes y seguidores del mercado.',
    },
    mktContext: {
      Tecnología: 'En tech, el content marketing y product-led growth dominan. Las empresas exitosas generan 60% de leads mediante contenido educativo y mantienen tasas de conversión del 2-4%.',
      Retail: 'El retail moderno requiere omnicanalidad. Los líderes integran experiencias online/offline, utilizan personalización AI y mantienen engagement rates del 15-20% en email.',
      Servicios: 'En servicios, el thought leadership y referencias son clave. Las firmas exitosas generan 40% de nuevos clientes vía referencias y mantienen presencia activa en LinkedIn.',
      Alimentos: 'En alimentos, la presencia local y redes sociales son críticas. Los exitosos mantienen ratings 4.5+ en Google y generan 30% de ventas vía marketing digital local.',
      default: 'el marketing digital efectivo es indispensable para el crecimiento sostenible.',
    },
    // Recommendations loading
    aiLoading: 'Generando recomendaciones personalizadas con IA...',
    // CTA
    ctaTitle: '¿Listo para transformar tu negocio?',
    ctaDescPremium: 'Descarga tu diagnóstico completo y agenda tu sesión de estrategia para implementar las mejoras.',
    ctaDescPublic: 'Agenda una consultoría gratuita de 30 minutos y te mostraremos exactamente cómo implementar estas mejoras en tu negocio.',
    ctaButton: 'Agendar Consultoría Gratuita',
  },

  // === PDF CoverPage ===
  pdfCoverPage: {
    title: 'DIAGNÓSTICO 3D',
    subtitle: 'BUSINESS INTELLIGENCE',
    defaultCompany: 'Tu Empresa',
    notSpecified: 'No especificada',
    industryLabel: 'Industria:',
    contactLabel: 'Contacto:',
    globalScore: 'PUNTUACIÓN GLOBAL',
    stageExpansion: 'EXPANSIÓN',
    stageGrowth: 'CRECIMIENTO',
    stageSurvival: 'SUPERVIVENCIA',
    generatedOn: (date: string) => `Generado el ${date}`,
    dateLocale: 'es-ES',
  },

  // === PDF ExecutiveSummary ===
  pdfExecutiveSummary: {
    headerTitle: 'RESUMEN EJECUTIVO',
    businessStatus: 'Estado del Negocio',
    defaultCompany: 'Tu Empresa',
    companyLabel: 'Empresa:',
    stageLabel: 'Etapa:',
    globalScoreLabel: 'Score Global:',
    industryLabel: 'Industria:',
    stageExpansion: 'Expansión',
    stageGrowth: 'Crecimiento',
    stageSurvival: 'Supervivencia',
    triDimensionalAnalysis: 'Análisis Tridimensional',
    scoresByDimension: 'Puntuaciones por Dimensión',
    finance: 'Finanzas',
    operations: 'Operaciones',
    marketing: 'Marketing',
    industryComparison: 'Comparación con Industria',
    keyInsights: 'Insights Clave',
    biggestOpportunity: 'Mayor oportunidad:',
    biggestStrength: 'Mayor fortaleza:',
    improvementPotential: 'Potencial de mejora:',
    pts: 'pts',
    vsIndustry: 'vs industria',
    page: 'Página',
  },

  // === PDF DetailedAnalysis ===
  pdfDetailedAnalysis: {
    headerTitle: 'ANÁLISIS DETALLADO POR EJE',
    finance: 'FINANZAS',
    operations: 'OPERACIONES',
    marketing: 'MARKETING',
    scoreLabel: 'Score:',
    benchmarkLabel: 'Benchmark',
    pts: 'pts',
    roiExpected: 'ROI Esperado:',
    timeLabel: 'Tiempo:',
    days: 'días',
    priorityHigh: 'Prioridad: ALTA',
    page: 'Página',
    financeAnalysisAbove: (score: number, industry: string, benchmark: number) =>
      `Control financiero básico que requiere fortalecimiento. El score de ${score} indica sistemas fundamentales pero con brechas en visibilidad. La industria ${industry} promedia ${benchmark} puntos, representando una oportunidad de mejora significativa.`,
    financeAnalysisBelow: (score: number, benchmark: number) =>
      `Gestión financiera reactiva. Con ${score} puntos, estás ${benchmark - score} puntos por debajo del estándar de la industria. Esto representa la mayor oportunidad de mejora inmediata.`,
    opsAnalysisAbove: (score: number, benchmark: number) =>
      `Operaciones funcionales pero manuales. El score de ${score} revela dependencia de procesos manuales que limitan escalabilidad. Con el benchmark en ${benchmark}, existe oportunidad de duplicar capacidad mediante automatización.`,
    opsAnalysisBelow: (score: number, benchmark: number) =>
      `Operaciones principalmente manuales. Tu puntuación de ${score} está ${benchmark - score} puntos debajo del promedio. Se estima que el 60-70% del tiempo se dedica a tareas automatizables.`,
    mktAnalysisAbove: (score: number, benchmark: number) =>
      `Marketing básico con potencial sin explotar. Con ${score} puntos vs ${benchmark} del benchmark, existe brecha en posicionamiento digital. La competencia está capturando market share mediante estrategias omnicanal.`,
    mktAnalysisBelow: (score: number, benchmark: number) =>
      `Marketing reactivo y limitado. Tu puntuación de ${score} está ${benchmark - score} puntos bajo el estándar. Los competidores están capturando tu mercado potencial mediante estrategias digitales efectivas.`,
  },

  // === PDF ROIMetrics ===
  pdfROIMetrics: {
    headerTitle: 'MÉTRICAS DE ÉXITO Y RETORNO DE INVERSIÓN',
    headerTitleCont: 'MÉTRICAS DE ÉXITO Y ROI (Cont.)',
    pageOf: (current: number, total: number) => `Página ${current} de ${total}`,
    axisLabels: { finance: 'Finanzas', operations: 'Operaciones', marketing: 'Marketing' },
    kpiSectionTitle: 'INDICADORES CLAVE DE ÉXITO (KPIs)',
    tableHeaders: { metric: 'Métrica', current: 'Actual', target: 'Objetivo', timeline: 'Plazo', impact: 'Impacto' },
    scoreKpiPrefix: 'Score',
    scoreKpiImpact: 'ALTO',
    kpis: [
      { metric: 'Eficiencia Operativa', current: '100%', target: '145%', timeline: '60 días', impact: 'ALTO' },
      { metric: 'Tiempo en Tareas Manuales', current: '100%', target: '60%', timeline: '30 días', impact: 'MEDIO' },
      { metric: 'Visibilidad de Datos', current: 'Reactiva', target: 'Proactiva', timeline: '45 días', impact: 'ALTO' },
      { metric: 'Capacidad de Procesamiento', current: '1X', target: '2.5X', timeline: '90 días', impact: 'ALTO' },
      { metric: 'Tiempo de Respuesta', current: '100%', target: '30%', timeline: '60 días', impact: 'MEDIO' },
    ],
    roiSectionTitle: 'RETORNO DE INVERSIÓN PROYECTADO',
    roiCards: [
      { title: 'ROI Año 1', value: '250-350%', detail: 'Recuperación total + ganancias' },
      { title: 'Payback', value: '3-4 meses', detail: 'Tiempo de recuperación' },
      { title: 'Ahorro Anual', value: '$50-150K', detail: 'En eficiencias y automatización' },
    ],
    roiBreakdownTitle: 'DESGLOSE DEL RETORNO DE INVERSIÓN',
    roiBreakdown: [
      'Ahorro en horas laborales: 20-30 hrs/semana × $30/hr = $24,000-36,000/año',
      'Incremento en capacidad sin contratar: Equivalente a 2-3 empleados = $100,000-150,000/año',
      'Reducción de errores y reprocesos: 70-80% menos errores = $20,000-30,000/año',
      'Mejora en conversión de ventas: 20-30% más conversión = $50,000-100,000/año',
    ],
    benefitsTitle: 'BENEFICIOS INTANGIBLES',
    benefits: [
      'Mayor agilidad para responder a cambios del mercado',
      'Mejora en la moral y productividad del equipo',
      'Posicionamiento como líder innovador en tu industria',
      'Capacidad de tomar decisiones basadas en datos reales',
      'Reducción del estrés operativo y burnout del equipo',
      'Preparación para oportunidades de inversión o expansión',
    ],
    guaranteeTitle: 'GARANTÍA DE RESULTADOS IMPULSA LAB',
    guaranteeLine1: 'Si no alcanzas al menos 50% del ROI proyectado en 6 meses,',
    guaranteeLine2: 'te proporcionamos consultoría adicional sin costo hasta lograrlo.',
    page: 'Página',
    days: 'días',
  },

  // === PDF ActionPlan ===
  pdfActionPlan: {
    headerTitle: 'PLAN DE ACCIÓN PERSONALIZADO',
    headerTitleCont: 'PLAN DE ACCIÓN PERSONALIZADO (Cont.)',
    axisLabels: { finance: 'Finanzas', operations: 'Operaciones', marketing: 'Marketing' },
    criticalAction: 'ACCIÓN CRÍTICA PRIORITARIA',
    strengthen: 'Fortalecer',
    whyActNow: '¿Por qué actuar AHORA?',
    defaultWhy: (score: number, axis: string) =>
      `Tu puntuación de ${score} en ${axis} es crítica. Actuar ahora puede generar un ROI del 200-300% en los próximos 12 meses.`,
    implementationPlan: 'Plan de Implementación - 5 Pasos Clave:',
    defaultActions: [
      'Auditoría inicial del estado actual',
      'Implementación de quick wins',
      'Automatización de procesos clave',
      'Establecimiento de KPIs',
      'Optimización continua',
    ],
    quickWinTitle: 'QUICK WIN - Acción para HOY:',
    defaultQuickWin: 'Implementa un dashboard básico de seguimiento con las 3 métricas más críticas.',
    successMetrics: 'Métricas de Éxito:',
    strengthenImmediately: 'Inmediatamente',
    page: 'Página',
  },

  // === PDF Roadmap ===
  pdfRoadmap: {
    headerTitle: 'ROADMAP DE TRANSFORMACIÓN - 90 DÍAS',
    headerTitleCont: 'ROADMAP DE TRANSFORMACIÓN - 90 DÍAS (Cont.)',
    timelineLabels: [
      { label: 'Inicio', day: '0' },
      { label: 'Fase 1', day: '30' },
      { label: 'Fase 2', day: '60' },
      { label: 'Fase 3', day: '90' },
    ],
    dayPrefix: 'Día',
    keyActions: 'Acciones clave:',
    expectedResult: 'Resultado esperado:',
    defaultPhases: [
      {
        title: 'FASE 1: FUNDAMENTOS (Días 1-30)',
        objective: 'Establecer las bases sólidas',
        actions: [
          'Auditoría completa de sistemas y procesos actuales',
          'Implementación de quick wins identificados',
          'Configuración de herramientas básicas de monitoreo',
          'Capacitación inicial del equipo',
        ],
        result: 'Sistema básico operativo con 40% más visibilidad',
      },
      {
        title: 'FASE 2: OPTIMIZACIÓN (Días 31-60)',
        objective: 'Automatizar y optimizar procesos clave',
        actions: [
          'Automatización de 3-5 procesos críticos',
          'Implementación de dashboards avanzados',
          'Optimización de flujos de trabajo',
          'Establecimiento de métricas automatizadas',
        ],
        result: 'Eficiencia operativa mejorada 35-45%',
      },
      {
        title: 'FASE 3: ESCALAMIENTO (Días 61-90)',
        objective: 'Escalar el sistema y preparar crecimiento',
        actions: [
          'Expansión del sistema a todas las áreas',
          'Implementación de analytics predictivos',
          'Optimización continua basada en datos',
          'Preparación para scaling 2-3X',
        ],
        result: 'Sistema completo con capacidad de escalar',
      },
    ],
    objectiveLabel: 'Objetivo:',
    actionsLabel: 'Acciones:',
    resultLabel: 'Resultado:',
    continuation: '(Continuación)',
    successIndicatorsTitle: 'INDICADORES DE ÉXITO DEL ROADMAP',
    successIndicators: [
      '✓ Reducción 40-60% en tareas manuales',
      '✓ Incremento 2-3X en capacidad',
      '✓ ROI positivo desde mes 3',
    ],
    page: 'Página',
    pageOf: (current: number, total: number) => `Página ${current} de ${total}`,
  },

  // === PDF Conclusions ===
  pdfConclusions: {
    headerTitle: 'CONCLUSIONES Y PRÓXIMOS PASOS',
    headerTitleCont: 'CONCLUSIONES Y PRÓXIMOS PASOS (Cont.)',
    defaultCompany: 'Tu Empresa',
    defaultIndustry: 'tu industria',
    stageExpansion: 'Expansión',
    stageGrowth: 'Crecimiento',
    stageSurvival: 'Supervivencia',
    axisLabels: { finance: 'Finanzas', operations: 'Operaciones', marketing: 'Marketing' },
    currentSituationTitle: 'RESUMEN DE TU SITUACIÓN ACTUAL',
    summaryText: (company: string, score: number, stage: string, strongAxis: string, strongScore: number, weakAxis: string, weakScore: number) =>
      `${company} ha completado el Diagnóstico 3D Impulsa obteniendo una puntuación global de ${score}/100, ubicándose en la etapa de "${stage}". El análisis revela fortalezas notables en ${strongAxis} (${strongScore} puntos) y oportunidades significativas de mejora en ${weakAxis} (${weakScore} puntos).`,
    growthPotentialTitle: 'TU POTENCIAL DE CRECIMIENTO',
    potentialText: (potential: number, company: string) =>
      `El análisis revela un potencial de mejora del ${potential}% promedio. Con las estrategias correctas y el acompañamiento experto, ${company} puede lograr:`,
    achievements: [
      '• Incremento del 35-50% en eficiencia operativa',
      '• Reducción del 40-60% en costos operativos',
      '• Aumento del 200-300% en capacidad sin contratar',
      '• ROI del 250-350% en el primer año',
    ],
    strategicRecTitle: 'RECOMENDACIÓN ESTRATÉGICA',
    recommendationText: (weakAxis: string) =>
      `Basado en el diagnóstico integral, la recomendación prioritaria es iniciar inmediatamente con la transformación de ${weakAxis}. Esta intervención estratégica abordará el cuello de botella principal que limita tu crecimiento y generará el mayor impacto en el menor tiempo posible.`,
    nextStepTitle: 'TU PRÓXIMO PASO',
    nextStepLine1: 'Agenda tu sesión estratégica GRATUITA de 30 minutos',
    nextStepLine2: 'para diseñar tu plan de implementación personalizado',
    sessionBenefitsTitle: 'En tu sesión estratégica gratuita recibirás:',
    sessionBenefits: [
      '• Análisis detallado de tus resultados con un experto',
      '• Plan de acción personalizado para tu situación',
      '• Identificación de 3-5 quick wins inmediatos',
      '• Estimación de ROI y timeline específico',
      '• Acceso a herramientas y recursos exclusivos',
    ],
    footerTagline: 'Business Intelligence & Digital Transformation',
    footerConfidential: 'Este diagnóstico es confidencial y propiedad de tu organización',
    validUntil: (date: string) => `Validez: hasta ${date}`,
    directContact: 'Contacto Directo:',
    generatedBy: (email: string) => `Generado por: ${email}`,
    authorizedUser: 'Usuario autorizado',
    dateLocale: 'es-ES',
    page: 'Página',
    pageOf: (current: number, total: number) => `Página ${current} de ${total}`,
  },

  // === PDFGenerator ===
  pdfGenerator: {
    generatingPdf: 'Generando PDF...',
    downloadFull: 'Descargar PDF Completo',
    pdfAvailable: 'PDF Disponible (Agenda Consultoría)',
    errorGenerating: 'Hubo un error al generar el PDF. Por favor intenta de nuevo.',
    defaultCompany: 'Empresa',
    scheduleConsultation: 'Agenda tu consultoría gratuita para obtener el PDF completo',
    loginForMore: 'Inicia sesión para acceder a más funciones',
  },

  // === PDFStyles (utility functions) ===
  pdfStyles: {
    expansion: 'Expansión',
    growth: 'Crecimiento',
    survival: 'Supervivencia',
    expansionMsg: 'Tu negocio está listo para escalar',
    growthMsg: 'Tienes una base sólida para crecer',
    survivalMsg: 'Es momento de fortalecer los fundamentos',
    dateLocale: 'es-ES',
    currencyLocale: 'es-US',
  },

  // === Diagnostico SEO Hero (server-rendered landing content) ===
  diagnosticoSeoHero: {
    h1: 'Diagnóstico 3D Gratuito de Madurez Digital para tu PYME',
    intro:
      'El Diagnóstico 3D de Impulsa Lab es una evaluación gratuita de 15 minutos que analiza el nivel de madurez digital de tu empresa en tres dimensiones críticas: Finanzas, Operaciones y Marketing. Diseñado para pequeñas y medianas empresas que quieren entender dónde están parados y qué pasos concretos tomar para crecer con inteligencia artificial y automatización.',
    introDims: { finance: 'Finanzas', operations: 'Operaciones', marketing: 'Marketing' },
    h2Benefits: '¿Qué obtienes al completar el diagnóstico?',
    benefits: [
      { strong: 'Radar 3D visual', rest: ' de tu madurez digital en Finanzas, Operaciones y Marketing, con score de 0 a 100 en cada dimensión.' },
      { strong: 'Identificación de brechas críticas', rest: ' — qué procesos te están costando tiempo y dinero, y cuáles automatizar primero para maximizar ROI.' },
      { strong: 'Plan de acción personalizado', rest: ' generado por IA con las 3-5 primeras iniciativas que debes ejecutar en los próximos 90 días.' },
      { strong: 'Comparativa con PYMEs similares', rest: ' — dónde estás respecto a tu industria y tamaño.' },
      { strong: 'Recursos recomendados', rest: ' — herramientas, guías y servicios de Impulsa Lab alineados con tus brechas específicas.' },
    ],
    h2How: '¿Cómo funciona el Diagnóstico 3D?',
    steps: [
      { strong: 'Respondes 18 preguntas', rest: ' sobre cómo opera hoy tu empresa en las tres dimensiones. No hay respuestas correctas o incorrectas — solo honestidad sobre tu realidad actual.' },
      { strong: 'Nuestra IA analiza tus respuestas', rest: ' contra un benchmark de más de 500 PYMEs evaluadas por Impulsa Lab.' },
      { strong: 'Recibes tu reporte 3D al instante', rest: ' en pantalla, con opción de descargarlo en PDF y recibir una copia por email.' },
      { strong: 'Opcional:', rest: ' agenda una llamada gratuita de 30 minutos con nuestro equipo para revisar tu reporte y definir próximos pasos.' },
    ],
    socialProofPrefix: 'Más de ',
    socialProofStrong: '500 dueños de PYMEs',
    socialProofSuffix:
      ' en Estados Unidos y Latinoamérica ya completaron su Diagnóstico 3D. Es 100% gratis, no requiere tarjeta de crédito, y los resultados son tuyos sin compromiso. Empieza ahora mismo y en 15 minutos sabrás exactamente cuánto potencial de crecimiento tiene tu empresa y por dónde empezar.',
  },
}

export default diagnosticoUiES
