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
}

export const diagnosticoUiEN = {
  // === DiagnosticWizard ===
  diagnosticWizard: {
    title: '3D Business Diagnostic',
    subtitle: 'Evaluate the three key dimensions of your business',
    steps: {
      registro: 'Registration',
      evaluacionInicial: 'Initial Assessment',
      finanzas: 'Finance',
      operaciones: 'Operations',
      marketing: 'Marketing',
      procesando: 'Processing',
      resultados: 'Results',
    },
    pasoNDeTotal: 'Step',
    de: 'of',
    completado: 'Completed',
    inicio: 'Home',
    reiniciar: 'Restart',
    anterior: 'Previous',
    siguiente: 'Next',
    irAResultados: 'Go to Results',
    procesamientoEnCurso: 'Automatic processing in progress...',
    progresoGuardado: 'Your progress is saved automatically',
    errorNoLead: 'Error: Lead data not found. Please restart the diagnostic.',
    resetDialogTitle: 'Restart the diagnostic?',
    resetDialogDescription: 'This action will erase all your current progress and you will start from the beginning. The information entered cannot be recovered.',
    cancelar: 'Cancel',
    siReiniciar: 'Yes, restart everything',
  },

  // === InitialLeadCapture ===
  initialLeadCapture: {
    title: '3D Business Diagnostic',
    subtitle: 'Register your details to start your personalized assessment',
    accessNote: '✓ You will receive immediate access • ✓ Results by email',
    labelNombre: 'Your Full Name *',
    placeholderNombre: 'E.g.: John Smith',
    labelEmail: 'Email *',
    placeholderEmail: 'you@email.com',
    emailNote: 'We will send the results to this email',
    labelNegocio: 'Business Name *',
    placeholderNegocio: 'E.g.: Antology Restaurant',
    labelIndustria: 'Industry *',
    selectIndustria: 'Select your industry',
    industrias: {
      tecnologia: 'Technology',
      retail: 'Retail / Commerce',
      servicios: 'Professional Services',
      manufactura: 'Manufacturing',
      salud: 'Health & Wellness',
      educacion: 'Education',
      alimentos: 'Food & Restaurants',
      construccion: 'Construction',
      turismo: 'Tourism & Hospitality',
      otro: 'Other',
    },
    labelEmpleados: 'Number of Employees *',
    placeholderEmpleados: 'E.g.: 10',
    empleadosNote: 'This helps us personalize the diagnostic for your company',
    labelTelefono: 'Phone',
    telefonoOpcional: '(Optional)',
    placeholderTelefono: '+1 234 567 8900',
    btnSubmitting: 'Registering access...',
    btnSubmit: 'Start Official Diagnostic',
    privacyNote: 'Your data is protected. We do not share your information.',
    errorNombreRequerido: 'Name is required',
    errorEmailRequerido: 'Email is required',
    errorEmailInvalido: 'Invalid email',
    errorNegocioRequerido: 'Business name is required',
    errorIndustriaRequerida: 'Select your industry',
    errorEmpleadosRequerido: 'Enter the number of employees',
    errorEmpleadosInvalido: 'Must be a number greater than 0',
    beneficio1Titulo: 'Quick Assessment',
    beneficio1Desc: 'Only 5-7 minutes',
    beneficio2Titulo: 'Detailed Results',
    beneficio2Desc: 'By email instantly',
    beneficio3Titulo: 'Free Consultation',
    beneficio3Desc: '30 min with an expert',
  },

  // === PreAssessment ===
  preAssessment: {
    pregunta: 'Question',
    de: 'of',
    anterior: '← Previous',
    questions: [
      {
        title: 'Finance',
        question: 'How in control do you feel of your business finances?',
        options: [
          'No control - I don\'t know my numbers',
          'Basic control - I review occasionally',
          'Good control - Constant monitoring',
        ],
      },
      {
        title: 'Operations',
        question: 'How much time do you spend on repetitive and manual tasks?',
        options: [
          'Too much - More than 60% of my time',
          'Moderate - Between 30-60% of my time',
          'Little - Less than 30% of my time',
        ],
      },
      {
        title: 'Marketing',
        question: 'How effective is your digital presence and customer attraction?',
        options: [
          'Very basic - Almost no presence',
          'Moderate - Some presence but no strategy',
          'Strong - Clear strategy and measurable results',
        ],
      },
    ],
  },

  // === AdaptiveQuestions ===
  adaptiveQuestions: {
    cargando: 'Loading questions...',
    pregunta: 'Question',
    de: 'of',
    completado: 'completed',
    anterior: 'Previous',
    siguiente: 'Next',
    completar: 'Complete',
    seleccionaOpcion: 'Select an option to continue',
    puntuacionActual: 'Current score',
    sliderDesacuerdo: 'Strongly disagree',
    sliderAcuerdo: 'Strongly agree',
    categoryLabels: {
      critical: 'Critical',
      important: 'Important',
      relevant: 'Relevant',
    },
    axisInfo: {
      finance: {
        title: 'Finance',
        description: 'Assessment of financial management and economic health of your company',
      },
      operations: {
        title: 'Operations',
        description: 'Analysis of operational efficiency and processes in your business',
      },
      marketing: {
        title: 'Marketing',
        description: 'Assessment of your marketing strategies and market presence',
      },
    },
  },

  // === AutoProcessing ===
  autoProcessing: {
    steps: {
      calculating: {
        title: 'Calculating Business Intelligence',
        description: 'Analyzing your answers across the 3 dimensions...',
      },
      sendingReport: {
        title: 'Generating Your Personalized Report',
        description: 'Preparing detailed results...',
      },
      sendingAdmin: {
        title: 'Sending Results',
        descriptionPrefix: 'Sending report to',
      },
      savingCrm: {
        title: 'Saving Information',
        description: 'Storing your results securely...',
      },
      complete: {
        title: 'All Done!',
        description: 'Redirecting to your results...',
      },
    },
    progreso: 'Progress',
    vistaPrevia: 'Results Preview',
    finanzas: 'Finance',
    operaciones: 'Operations',
    marketing: 'Marketing',
    promedioGeneral: 'Overall Average',
    indicadores: {
      analisis: 'Analysis completed',
      reporte: 'Report generated',
      email: 'Email sent',
      datos: 'Data saved',
      listo: 'Ready to see results!',
    },
    infoNote: 'This process takes only a few seconds...',
  },

  // === RadarChart3D ===
  radarChart3D: {
    defaultCompany: 'Your Company',
    labels: ['FINANCE', 'OPERATIONS', 'MARKETING'],
    labelsMobile: ['FIN', 'OPS', 'MKT'],
    expansion: 'Expansion',
    supervivencia: 'Survival',
  },

  // === ClientInfoStep ===
  clientInfoStep: {
    labelEmpresa: 'Company Name *',
    placeholderEmpresa: 'E.g.: Antology Restaurant',
    labelContacto: 'Contact Name *',
    placeholderContacto: 'E.g.: John Smith',
    labelIndustria: 'Industry *',
    selectIndustria: 'Select an industry',
    industrias: [
      'Technology',
      'Retail',
      'Services',
      'Manufacturing',
      'Health',
      'Education',
      'Food',
      'Other',
    ],
    labelEmpleados: 'Number of Employees *',
    placeholderEmpleados: 'E.g.: 10',
    labelIngresos: 'Annual Revenue (USD)',
    placeholderIngresos: 'E.g.: 500000',
    labelEmail: 'Contact Email *',
    placeholderEmail: 'contact@company.com',
    labelTelefono: 'Phone',
    placeholderTelefono: '+1 234 567 8900',
    btnSubmit: 'Continue to Diagnostic',
    errorEmpresa: 'Company name is required',
    errorContacto: 'Contact name is required',
    errorIndustria: 'Select an industry',
    errorEmail: 'Email is required',
    errorEmailInvalido: 'Invalid email',
    errorEmpleados: 'Enter the number of employees',
  },

  // === LeadConfirmation ===
  leadConfirmation: {
    // Success state
    successTitle: 'Report Sent Successfully!',
    successMsg: 'We have sent your complete diagnostic to',
    checkInbox: 'Check your inbox',
    checkSpam: '(Also check your SPAM folder)',
    redirecting: 'Redirecting to your results page...',
    redirectDesc: 'There you can schedule your free consultation and see the full analysis',
    // Validation
    errorNombre: 'Name is required',
    errorEmail: 'Email is required',
    errorEmailInvalido: 'Invalid email',
    errorSubmit: 'Error sending the report. Please try again.',
    errorConexion: 'Connection error. Check your internet and try again.',
    // Main form
    completedTitle: 'Diagnostic Completed!',
    completedDesc: 'Confirm your details to receive the full report and unlock your results.',
    formTitle: 'Confirm Your Contact Details',
    labelNombre: 'Full Name *',
    placeholderNombre: 'Your full name',
    labelEmail: 'Email *',
    placeholderEmail: 'you@email.com',
    // Info section
    infoTitle: 'You will receive:',
    infoItems: [
      'Complete report with your diagnostic',
      'Detailed analysis of the 3 dimensions',
      'Personalized recommendations',
      'Access to schedule a free consultation',
    ],
    // Button
    btnSubmitting: 'Sending...',
    btnSubmit: 'Send Results and Continue',
    // Privacy
    privacyText: 'By continuing, you agree to receive the report and communications from ImpulsaLab.',
    privacyLink: 'See our',
    privacyLinkText: 'Privacy Policy',
    // API data defaults
    noProporcionado: 'Not provided',
    noEspecificada: 'Not specified',
  },

  // === ProfessionalRecommendations ===
  professionalRecommendations: {
    // Loading
    loadingTitle: 'Analyzing your situation with AI...',
    loadingSubtitle: 'Generating personalized recommendations',
    // Errors
    errorGenerar: 'Error generating recommendations',
    errorNote: 'Note: Using standard recommendations.',
    // Labels
    badgeAI: 'AI Generated',
    badgeStandard: 'Standard Recommendations',
    // Card titles
    mainTitle: 'Main Action Plan',
    quickWinTitle: 'Immediate Action!',
    whyTitle: 'Why is it critical to act now?',
    impactTitle: 'Expected impact',
    actionPlanTitle: 'Step-by-step action plan',
    timelineTitle: 'Implementation timeline',
    toolsTitle: 'Recommended tools',
    warningTitle: 'Warning',
    roadmapTitle: 'Your Personalized 90-Day Roadmap',
    expectedOutcome: 'Expected outcome:',
    metricsTitle: 'Key Metrics to Measure Your Success',
    // Secondary axis labels
    axisLabels: {
      finance: 'Finance',
      operations: 'Operations',
      marketing: 'Marketing',
    },
    // Default recommendations
    defaults: {
      titlePrefix: 'Urgent Improvement in',
      why: 'This is your weakest point and it is limiting your business growth.',
      impact: 'Expected improvement of 30-50% in the next 90 days',
      actions: [
        'Implement basic control system',
        'Automate key processes',
        'Establish tracking metrics',
        'Create continuous improvement plan',
      ],
      timeline: '4-6 weeks',
      tools: ['Digital tools', 'Automation', 'AI'],
      quickWin: 'Start today with a quick audit of your current situation',
      roadmap: [
        {
          phase: 'Days 1-30',
          focus: 'Establish foundations',
          keyActions: ['Initial audit', 'Quick wins'],
          expectedOutcome: 'Basic system running',
        },
        {
          phase: 'Days 31-60',
          focus: 'Optimization and automation',
          keyActions: ['Automate processes', 'Train team'],
          expectedOutcome: 'Efficiency improved 30%',
        },
        {
          phase: 'Days 61-90',
          focus: 'Scaling',
          keyActions: ['Expand system', 'Measure results'],
          expectedOutcome: 'Complete system operational',
        },
      ],
    },
  },

  // === QuestionsData ===
  questionsData: {
    finance: [
      { text: 'How often do you review your business numbers?', helpText: 'Includes review of sales, expenses, and profits', options: ['Daily with automated dashboard', 'Weekly with reports', 'Monthly', 'Quarterly', 'Yearly or less'] },
      { text: 'Do you know the profit margin for each product/service you offer?', options: ['I don\'t know it', 'I have a rough idea', 'I know it for my main products', 'I have it calculated for my entire catalog'] },
      { text: 'Are your personal finances separated from your business finances?', options: ['No, they are mixed', 'Partially separated', 'Yes, completely separated'] },
      { text: 'How many months could you operate if all your sales stopped tomorrow?', helpText: 'Cash runway or financial cushion', options: ['Less than 1 month', '1-2 months', '3-6 months', '6-12 months', 'More than 1 year'] },
      { text: 'What tools do you use to manage your finances?', options: ['Paper or notes', 'Basic Excel', 'Excel with advanced formulas', 'Specialized software', 'Integrated ERP system'] },
    ],
    operations: [
      { text: 'How many hours per week do you spend on repetitive tasks?', helpText: 'Tasks you do over and over in the same way', options: ['0-2 hours', '3-5 hours', '6-10 hours', '11-20 hours', 'More than 20 hours'] },
      { text: 'How do you manage client appointments?', options: ['By phone/WhatsApp manually', 'By email back and forth', 'Shared calendar', 'Online booking system', 'Fully automated'] },
      { text: 'Do you have your key business processes documented?', options: ['No, it\'s all in my head', 'Some basic processes', 'Most are documented', 'All with detailed procedures', 'Digital system with videos'] },
      { text: 'How do you manage your business inventory?', options: ['Mental tracking', 'Paper records', 'Manually updated Excel', 'Specialized software', 'Automated system with alerts'] },
      { text: 'How long does it take you to generate a performance report?', options: ['It\'s instant', 'Less than 30 minutes', 'About 2 hours', 'Half a day', 'A full day or more'] },
    ],
    marketing: [
      { text: 'Can customers easily find you on Google?', options: ['I don\'t have a website', 'I\'m not sure', 'Sometimes I appear', 'Usually on the first page', 'Always in the top results'] },
      { text: 'How often do you post on social media?', options: ['Never or almost never', 'When I remember', '1-2 times a week', 'Daily', 'Multiple times a day with strategy'] },
      { text: 'Do you know who your ideal customer is?', options: ['I don\'t have it clear', 'General idea', 'Basic profile defined', 'Detailed buyer persona', 'Multiple data-driven personas'] },
      { text: 'How do you acquire new customers?', options: ['Only by referrals', 'Some basic advertising', 'Multiple unintegrated channels', 'Integrated multichannel strategy', 'Omnichannel with automation'] },
      { text: 'Do you measure the return on your marketing investment?', options: ['I don\'t measure ROI', 'I have a rough idea', 'Basic measurement', 'Detailed metrics', 'Advanced analytics with attribution'] },
    ],
  },

  // === ScoringEngine ===
  scoringEngine: {
    maturityStages: {
      survival: 'Survival',
      growth: 'Growth',
      expansion: 'Expansion',
    },
  },

  // === AIAnalyzer ===
  aiAnalyzer: {
    executiveSummary: (companyName: string) => `Full analysis for ${companyName}`,
    financeInsight: 'Financial insight 1',
    operationsInsight: 'Operational insight 1',
    marketingInsight: 'Marketing insight 1',
    scenario: 'Optimistic',
    timeframe: '6 months',
    nextSteps: ['Next step 1', 'Next step 2'],
    realTimeInsight: 'Real-time response analysis',
  },

  // === ResultsDashboard ===
  resultsDashboard: {
    // Header
    headerTitle: '3D Diagnostic Completed',
    defaultCompany: 'Your Company',
    globalScore: 'Global Score',
    // Business stages
    stages: {
      expansion: { stage: 'Expansion', description: 'Your business is ready to scale' },
      growth: { stage: 'Growth', description: 'You have a solid foundation to grow' },
      survival: { stage: 'Survival', description: 'Time to strengthen the fundamentals' },
    },
    // Axis labels
    axisLabels: { finance: 'Finance', operations: 'Operations', marketing: 'Marketing' },
    // Tabs
    tabOverview: 'Overview',
    tabDetails: 'Detailed Analysis',
    tabRecommendations: 'AI Action Plan',
    // Company profile
    companyProfileTitle: 'Company Profile',
    companyProfileSubtitle: 'Context for your diagnostic',
    clasificacion: 'Classification:',
    empleados: 'Employees:',
    industria: 'Industry:',
    priorityTitle: 'Priority Actions',
    prioritySubtitle: 'For your size and industry',
    strengthsTitle: 'Your Strengths in',
    improvementTitle: 'Improvement Opportunities',
    // Radar chart
    radarTitle: '3D Business Map',
    radarName: 'Your Business',
    // Bar chart
    vsIndustry: 'vs Industry',
    avgPrefix: 'Average',
    // Insights
    criticalArea: 'Critical Area',
    weakestMsg: 'Your weakest axis is',
    withPoints: 'with',
    points: 'points',
    belowAvg: 'points below the average of',
    improvementPotential: 'Improvement Potential',
    improvementMsg: 'average improvement potential.',
    improvementHave: 'You have a',
    improvementAdvice: 'With the right strategies, you can surpass the industry average.',
    strengthCard: 'Your Strength',
    strengthMsg: 'You stand out in',
    aboveAvg: 'points above the average.',
    solidBase: 'Leverage this solid base to grow.',
    // Details tab
    detailsTitle: 'Detailed Analysis by Axis - Industry:',
    benchmark: 'Benchmark',
    aboveLabel: '✓ Above',
    belowLabel: '✗ Below',
    comparisonWith: 'Comparison with',
    diagnostico: 'Diagnostic:',
    roiPotencial: 'ROI Potential:',
    inMonths: 'in 12 months',
    implTime: 'Implementation Time:',
    days: 'days',
    toSeeResults: 'to see results',
    savingPotential: 'Saving Potential:',
    hrsWeek: 'hrs/week',
    inManualTasks: 'in manual tasks',
    capacityIncrease: 'Capacity Increase:',
    noMoreHiring: 'without hiring more staff',
    leadsIncrease: 'Leads Increase:',
    inSixMonths: 'in 6 months',
    cacReduction: 'CAC Reduction:',
    withAutomation: 'with automation',
    industryContext: 'Industry Context:',
    bestPractices: 'Best Practices in',
    trends: 'Trends in',
    // Finance diagnostics
    financeDiag: {
      excellent: (company: string, benchmark: number, industry: string) => `Excellent financial management. ${company} demonstrates exceptional control, far surpassing the average of ${benchmark} points in ${industry}. This level of financial maturity places you in the top 10% of your industry.`,
      good: (score: number, benchmark: number) => `Solid financial control. With ${score} points, you ${score >= benchmark ? 'surpass' : 'are close to'} the industry average. There are specific opportunities to optimize margins and cash flow that could raise your score by 15-20 additional points.`,
      medium: (score: number, industry: string, benchmark: number) => `Financial control in development. Your score of ${score} indicates basic systems are in place, but real-time visibility is lacking. Companies in ${industry} with best practices average ${benchmark} points.`,
      low: (score: number, benchmark: number) => `Reactive financial management. With ${score} points, you are ${benchmark - score} points below the industry standard. This represents the greatest opportunity for immediate improvement in your business.`,
    },
    // Operations diagnostics
    opsDiag: {
      excellent: (score: number, benchmark: number, industry: string) => `World-class operations. With ${score} points, you surpass the benchmark of ${benchmark} in ${industry}. Your automated and documented processes are a competitive asset that allows you to scale efficiently.`,
      good: (score: number, benchmark: number) => `Efficient operations. Your score of ${score} ${score >= benchmark ? 'surpasses' : 'approaches'} the industry average. There is potential to automate 2-3 additional key processes that would free up 10-15 hours per week.`,
      medium: (score: number, benchmark: number, industry: string) => `Functional operations with opportunities. With ${score} points, there is significant room to reach the standard of ${benchmark} in ${industry}. Selective automation can double your capacity without increasing costs.`,
      low: (score: number, benchmark: number) => `Primarily manual operations. Your score of ${score} is ${benchmark - score} points below the average. It is estimated that 60-70% of your team's time is spent on automatable repetitive tasks.`,
    },
    // Marketing diagnostics
    mktDiag: {
      excellent: (score: number, benchmark: number, industry: string) => `High-performance marketing. With ${score} points, you significantly surpass the average of ${benchmark} in ${industry}. Your brand generates consistent demand and has an optimized CAC with LTV/CAC > 3:1.`,
      good: (score: number, benchmark: number) => `Effective marketing strategy. Your score of ${score} ${score >= benchmark ? 'is above' : 'approaches'} the industry average. With specific digital channel optimizations, you could reduce CAC by 20-30%.`,
      medium: (score: number, benchmark: number, industry: string) => `Marketing in building phase. With ${score} points, you have a base but lack consistency. The average in ${industry} is ${benchmark}, indicating significant growth opportunity in demand generation.`,
      low: (score: number, benchmark: number) => `Reactive and limited marketing. Your score of ${score} is ${benchmark - score} points below the standard. Competitors are capturing your potential market through effective digital strategies.`,
    },
    // Industry context texts
    financeContext: {
      Tecnología: 'In the tech sector, rigorous financial control is critical due to investment cycles and the need to demonstrate SaaS metrics like MRR, CAC, and LTV to investors.',
      Retail: 'In retail, inventory management and tight margins require daily financial visibility. Industry leaders operate with real-time dashboards.',
      Servicios: 'In professional services, profitability tracking by project and client is fundamental. Successful firms maintain 20-30% margins through strict control.',
      Alimentos: 'In the food industry, variable cost control and waste management can mean the difference between loss and profit. Typical margins range between 3-8%.',
      default: 'effective financial control is the foundation for strategic decision-making and sustainable growth.',
    },
    opsContext: {
      Tecnología: 'Leading tech companies automate deployment, testing, and level-1 support. They use agile and DevOps methodologies to reduce time-to-market by 40-60%.',
      Retail: 'Successful retailers integrate inventory, POS, and e-commerce in real time. Automated restocking and dynamic pricing are industry standards.',
      Servicios: 'Efficient service firms automate proposals, onboarding, and billing. Leaders maintain 75-85% utilization through intelligent resource management.',
      Alimentos: 'In food, automated traceability, temperature control, and FIFO management are critical. Leaders reduce waste to 2-3% through predictive systems.',
      default: 'operational efficiency marks the difference between market leaders and followers.',
    },
    mktContext: {
      Tecnología: 'In tech, content marketing and product-led growth dominate. Successful companies generate 60% of leads through educational content and maintain 2-4% conversion rates.',
      Retail: 'Modern retail requires omnichannel presence. Leaders integrate online/offline experiences, use AI personalization, and maintain 15-20% email engagement rates.',
      Servicios: 'In services, thought leadership and referrals are key. Successful firms generate 40% of new clients via referrals and maintain active LinkedIn presence.',
      Alimentos: 'In food, local presence and social media are critical. Successful businesses maintain 4.5+ Google ratings and generate 30% of sales via local digital marketing.',
      default: 'effective digital marketing is indispensable for sustainable growth.',
    },
    // Recommendations loading
    aiLoading: 'Generating personalized AI recommendations...',
    // CTA
    ctaTitle: 'Ready to transform your business?',
    ctaDescPremium: 'Download your complete diagnostic and schedule your strategy session to implement improvements.',
    ctaDescPublic: 'Schedule a free 30-minute consultation and we will show you exactly how to implement these improvements in your business.',
    ctaButton: 'Schedule Free Consultation',
  },

  // === PDF CoverPage ===
  pdfCoverPage: {
    title: '3D DIAGNOSTIC',
    subtitle: 'BUSINESS INTELLIGENCE',
    defaultCompany: 'Your Company',
    notSpecified: 'Not specified',
    industryLabel: 'Industry:',
    contactLabel: 'Contact:',
    globalScore: 'GLOBAL SCORE',
    stageExpansion: 'EXPANSION',
    stageGrowth: 'GROWTH',
    stageSurvival: 'SURVIVAL',
    generatedOn: (date: string) => `Generated on ${date}`,
    dateLocale: 'en-US',
  },

  // === PDF ExecutiveSummary ===
  pdfExecutiveSummary: {
    headerTitle: 'EXECUTIVE SUMMARY',
    businessStatus: 'Business Status',
    defaultCompany: 'Your Company',
    companyLabel: 'Company:',
    stageLabel: 'Stage:',
    globalScoreLabel: 'Global Score:',
    industryLabel: 'Industry:',
    stageExpansion: 'Expansion',
    stageGrowth: 'Growth',
    stageSurvival: 'Survival',
    triDimensionalAnalysis: 'Tri-Dimensional Analysis',
    scoresByDimension: 'Scores by Dimension',
    finance: 'Finance',
    operations: 'Operations',
    marketing: 'Marketing',
    industryComparison: 'Industry Comparison',
    keyInsights: 'Key Insights',
    biggestOpportunity: 'Biggest opportunity:',
    biggestStrength: 'Biggest strength:',
    improvementPotential: 'Improvement potential:',
    pts: 'pts',
    vsIndustry: 'vs industry',
    page: 'Page',
  },

  // === PDF DetailedAnalysis ===
  pdfDetailedAnalysis: {
    headerTitle: 'DETAILED ANALYSIS BY AXIS',
    finance: 'FINANCE',
    operations: 'OPERATIONS',
    marketing: 'MARKETING',
    scoreLabel: 'Score:',
    benchmarkLabel: 'Benchmark',
    pts: 'pts',
    roiExpected: 'Expected ROI:',
    timeLabel: 'Time:',
    days: 'days',
    priorityHigh: 'Priority: HIGH',
    page: 'Page',
    financeAnalysisAbove: (score: number, industry: string, benchmark: number) =>
      `Basic financial control that requires strengthening. A score of ${score} indicates fundamental systems with visibility gaps. The ${industry} industry averages ${benchmark} points, representing a significant improvement opportunity.`,
    financeAnalysisBelow: (score: number, benchmark: number) =>
      `Reactive financial management. With ${score} points, you are ${benchmark - score} points below the industry standard. This represents the greatest opportunity for immediate improvement.`,
    opsAnalysisAbove: (score: number, benchmark: number) =>
      `Functional but manual operations. A score of ${score} reveals dependence on manual processes limiting scalability. With the benchmark at ${benchmark}, there is an opportunity to double capacity through automation.`,
    opsAnalysisBelow: (score: number, benchmark: number) =>
      `Primarily manual operations. Your score of ${score} is ${benchmark - score} points below the average. An estimated 60-70% of time is spent on automatable tasks.`,
    mktAnalysisAbove: (score: number, benchmark: number) =>
      `Basic marketing with untapped potential. With ${score} points vs ${benchmark} benchmark, there is a gap in digital positioning. Competition is capturing market share through omnichannel strategies.`,
    mktAnalysisBelow: (score: number, benchmark: number) =>
      `Reactive and limited marketing. Your score of ${score} is ${benchmark - score} points below the standard. Competitors are capturing your potential market through effective digital strategies.`,
  },

  // === PDF ROIMetrics ===
  pdfROIMetrics: {
    headerTitle: 'SUCCESS METRICS AND RETURN ON INVESTMENT',
    headerTitleCont: 'SUCCESS METRICS AND ROI (Cont.)',
    pageOf: (current: number, total: number) => `Page ${current} of ${total}`,
    axisLabels: { finance: 'Finance', operations: 'Operations', marketing: 'Marketing' },
    kpiSectionTitle: 'KEY SUCCESS INDICATORS (KPIs)',
    tableHeaders: { metric: 'Metric', current: 'Current', target: 'Target', timeline: 'Timeline', impact: 'Impact' },
    kpis: [
      { metric: 'Operational Efficiency', current: '100%', target: '145%', timeline: '60 days', impact: 'HIGH' },
      { metric: 'Time on Manual Tasks', current: '100%', target: '60%', timeline: '30 days', impact: 'MEDIUM' },
      { metric: 'Data Visibility', current: 'Reactive', target: 'Proactive', timeline: '45 days', impact: 'HIGH' },
      { metric: 'Processing Capacity', current: '1X', target: '2.5X', timeline: '90 days', impact: 'HIGH' },
      { metric: 'Response Time', current: '100%', target: '30%', timeline: '60 days', impact: 'MEDIUM' },
    ],
    roiSectionTitle: 'PROJECTED RETURN ON INVESTMENT',
    roiCards: [
      { title: 'Year 1 ROI', value: '250-350%', detail: 'Full recovery + profits' },
      { title: 'Payback', value: '3-4 months', detail: 'Recovery time' },
      { title: 'Annual Savings', value: '$50-150K', detail: 'In efficiencies and automation' },
    ],
    roiBreakdownTitle: 'RETURN ON INVESTMENT BREAKDOWN',
    roiBreakdown: [
      'Labor hour savings: 20-30 hrs/week × $30/hr = $24,000-36,000/year',
      'Capacity increase without hiring: Equivalent to 2-3 employees = $100,000-150,000/year',
      'Error and rework reduction: 70-80% fewer errors = $20,000-30,000/year',
      'Sales conversion improvement: 20-30% more conversion = $50,000-100,000/year',
    ],
    benefitsTitle: 'INTANGIBLE BENEFITS',
    benefits: [
      'Greater agility to respond to market changes',
      'Improved team morale and productivity',
      'Positioning as an innovative leader in your industry',
      'Ability to make decisions based on real data',
      'Reduced operational stress and team burnout',
      'Preparation for investment or expansion opportunities',
    ],
    guaranteeTitle: 'IMPULSA LAB RESULTS GUARANTEE',
    guaranteeLine1: 'If you don\'t achieve at least 50% of the projected ROI in 6 months,',
    guaranteeLine2: 'we provide additional consulting at no cost until you do.',
    page: 'Page',
    days: 'days',
  },

  // === PDF ActionPlan ===
  pdfActionPlan: {
    headerTitle: 'PERSONALIZED ACTION PLAN',
    headerTitleCont: 'PERSONALIZED ACTION PLAN (Cont.)',
    axisLabels: { finance: 'Finance', operations: 'Operations', marketing: 'Marketing' },
    criticalAction: 'CRITICAL PRIORITY ACTION',
    strengthen: 'Strengthen',
    whyActNow: 'Why act NOW?',
    defaultWhy: (score: number, axis: string) =>
      `Your score of ${score} in ${axis} is critical. Acting now can generate a 200-300% ROI in the next 12 months.`,
    implementationPlan: 'Implementation Plan - 5 Key Steps:',
    defaultActions: [
      'Initial audit of current state',
      'Quick wins implementation',
      'Key process automation',
      'KPI establishment',
      'Continuous optimization',
    ],
    quickWinTitle: 'QUICK WIN - Action for TODAY:',
    defaultQuickWin: 'Implement a basic tracking dashboard with the 3 most critical metrics.',
    successMetrics: 'Success Metrics:',
    strengthenImmediately: 'Immediately',
    page: 'Page',
  },

  // === PDF Roadmap ===
  pdfRoadmap: {
    headerTitle: 'TRANSFORMATION ROADMAP - 90 DAYS',
    headerTitleCont: 'TRANSFORMATION ROADMAP - 90 DAYS (Cont.)',
    timelineLabels: [
      { label: 'Start', day: '0' },
      { label: 'Phase 1', day: '30' },
      { label: 'Phase 2', day: '60' },
      { label: 'Phase 3', day: '90' },
    ],
    dayPrefix: 'Day',
    keyActions: 'Key actions:',
    expectedResult: 'Expected result:',
    defaultPhases: [
      {
        title: 'PHASE 1: FOUNDATIONS (Days 1-30)',
        objective: 'Establish solid foundations',
        actions: [
          'Complete audit of current systems and processes',
          'Implementation of identified quick wins',
          'Configuration of basic monitoring tools',
          'Initial team training',
        ],
        result: 'Basic system operational with 40% more visibility',
      },
      {
        title: 'PHASE 2: OPTIMIZATION (Days 31-60)',
        objective: 'Automate and optimize key processes',
        actions: [
          'Automation of 3-5 critical processes',
          'Implementation of advanced dashboards',
          'Workflow optimization',
          'Establishment of automated metrics',
        ],
        result: 'Operational efficiency improved 35-45%',
      },
      {
        title: 'PHASE 3: SCALING (Days 61-90)',
        objective: 'Scale the system and prepare for growth',
        actions: [
          'Expansion of the system to all areas',
          'Implementation of predictive analytics',
          'Continuous data-driven optimization',
          'Preparation for 2-3X scaling',
        ],
        result: 'Complete system with scaling capability',
      },
    ],
    objectiveLabel: 'Objective:',
    actionsLabel: 'Actions:',
    resultLabel: 'Result:',
    continuation: '(Continued)',
    successIndicatorsTitle: 'ROADMAP SUCCESS INDICATORS',
    successIndicators: [
      '✓ 40-60% reduction in manual tasks',
      '✓ 2-3X capacity increase',
      '✓ Positive ROI from month 3',
    ],
    page: 'Page',
    pageOf: (current: number, total: number) => `Page ${current} of ${total}`,
  },

  // === PDF Conclusions ===
  pdfConclusions: {
    headerTitle: 'CONCLUSIONS AND NEXT STEPS',
    headerTitleCont: 'CONCLUSIONS AND NEXT STEPS (Cont.)',
    defaultCompany: 'Your Company',
    defaultIndustry: 'your industry',
    stageExpansion: 'Expansion',
    stageGrowth: 'Growth',
    stageSurvival: 'Survival',
    axisLabels: { finance: 'Finance', operations: 'Operations', marketing: 'Marketing' },
    currentSituationTitle: 'YOUR CURRENT SITUATION SUMMARY',
    summaryText: (company: string, score: number, stage: string, strongAxis: string, strongScore: number, weakAxis: string, weakScore: number) =>
      `${company} has completed the Impulsa 3D Diagnostic achieving a global score of ${score}/100, placing it in the "${stage}" stage. The analysis reveals notable strengths in ${strongAxis} (${strongScore} points) and significant improvement opportunities in ${weakAxis} (${weakScore} points).`,
    growthPotentialTitle: 'YOUR GROWTH POTENTIAL',
    potentialText: (potential: number, company: string) =>
      `The analysis reveals an average improvement potential of ${potential}%. With the right strategies and expert guidance, ${company} can achieve:`,
    achievements: [
      '• 35-50% increase in operational efficiency',
      '• 40-60% reduction in operating costs',
      '• 200-300% increase in capacity without hiring',
      '• 250-350% ROI in the first year',
    ],
    strategicRecTitle: 'STRATEGIC RECOMMENDATION',
    recommendationText: (weakAxis: string) =>
      `Based on the comprehensive diagnostic, the priority recommendation is to immediately begin the transformation of ${weakAxis}. This strategic intervention will address the main bottleneck limiting your growth and generate the greatest impact in the shortest time possible.`,
    nextStepTitle: 'YOUR NEXT STEP',
    nextStepLine1: 'Schedule your FREE 30-minute strategy session',
    nextStepLine2: 'to design your personalized implementation plan',
    sessionBenefitsTitle: 'In your free strategy session you will receive:',
    sessionBenefits: [
      '• Detailed analysis of your results with an expert',
      '• Personalized action plan for your situation',
      '• Identification of 3-5 immediate quick wins',
      '• Specific ROI and timeline estimation',
      '• Access to exclusive tools and resources',
    ],
    footerTagline: 'Business Intelligence & Digital Transformation',
    footerConfidential: 'This diagnostic is confidential and property of your organization',
    validUntil: (date: string) => `Valid until: ${date}`,
    directContact: 'Direct Contact:',
    generatedBy: (email: string) => `Generated by: ${email}`,
    authorizedUser: 'Authorized user',
    dateLocale: 'en-US',
    page: 'Page',
    pageOf: (current: number, total: number) => `Page ${current} of ${total}`,
  },

  // === PDFGenerator ===
  pdfGenerator: {
    generatingPdf: 'Generating PDF...',
    downloadFull: 'Download Full PDF',
    pdfAvailable: 'PDF Available (Schedule Consultation)',
    errorGenerating: 'There was an error generating the PDF. Please try again.',
    defaultCompany: 'Company',
    scheduleConsultation: 'Schedule your free consultation to get the full PDF',
    loginForMore: 'Log in to access more features',
  },

  // === PDFStyles (utility functions) ===
  pdfStyles: {
    expansion: 'Expansion',
    growth: 'Growth',
    survival: 'Survival',
    expansionMsg: 'Your business is ready to scale',
    growthMsg: 'You have a solid foundation for growth',
    survivalMsg: 'It\'s time to strengthen the fundamentals',
    dateLocale: 'en-US',
    currencyLocale: 'en-US',
  },
}
