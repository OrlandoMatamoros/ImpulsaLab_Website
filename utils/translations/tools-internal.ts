// Translations for internal admin tools (Web Analyzer + Strategic Board)
// Only visible to orlando@tuimpulsalab.com

export const toolsInternalES = {
  // ===== WEB ANALYZER (herramientas/auditoria-web) =====
  auditPage: {
    // Header
    internalTools: 'Herramientas Internas',
    newAudit: 'Nueva auditoria',

    // Hero
    smartWebAudit: 'Auditoria Web',
    smartWebAuditHighlight: 'Inteligente',
    heroSubtitle: 'Analiza tu sitio web con inteligencia artificial y obten un diagnostico profesional en segundos.',
    poweredBy: 'Powered by',

    // Form
    placeholder: 'https://ejemplo.com',
    analyzeButton: 'Analizar Sitio Web',
    analyzing: 'Analizando...',
    hideSourceCode: 'Ocultar campo de codigo fuente',
    showSourceCode: 'No se puede acceder? Pega el codigo fuente',
    sourceCodePlaceholder: 'Pega aqui el codigo HTML de tu sitio web...',

    // Loading steps
    loadingSteps: [
      'Conectando con el sitio web...',
      'Descargando contenido...',
      'Analizando SEO tecnico...',
      'Evaluando diseno y UX...',
      'Revisando estrategia comercial...',
      'Analizando estructura...',
      'Evaluando presencia digital...',
      'Verificando seguridad...',
      'Generando reporte con IA...',
    ],

    // Results
    resultFor: 'Resultado para',
    overallScore: 'Puntuacion General',
    maturityLevel: 'Nivel de madurez:',
    detailedAnalysis: 'Analisis Detallado',
    topRecommendations: 'Top 5 Recomendaciones Prioritarias',
    howImpulsaHelps: 'Como Impulsa Lab puede ayudarte',
    basedOnAudit: 'Basado en tu auditoria, estos servicios tendrian mayor impacto en tu negocio:',
    scheduleFree: 'Agendar consulta gratuita',
    downloadPdf: 'Descargar PDF',
    analyzeAnother: 'Analizar otro sitio',

    // Features
    sixDimensions: '6 Dimensiones',
    sixDimensionsDesc: 'SEO, Diseno, Conversion, Estructura, Presencia Digital y Seguridad.',
    aiAnalysis: 'Analisis con IA',
    aiAnalysisDesc: 'Claude analiza tu sitio como lo haria un consultor experto.',
    actionableReport: 'Reporte Accionable',
    actionableReportDesc: 'Hallazgos concretos y recomendaciones que puedes implementar hoy.',

    // Section Card
    findings: 'Hallazgos',
    recommendations: 'Recomendaciones',
    findingsCount: 'hallazgos',
    recommendationsCount: 'recomendaciones',

    // Score labels
    critical: 'Critico',
    developing: 'En Desarrollo',
    good: 'Bueno',
    excellent: 'Excelente',

    // Errors
    unexpectedError: 'Error inesperado. Intenta de nuevo.',
    connectionError: 'Error de conexion. Verifica tu internet e intenta de nuevo.',

    // Print
    printTitle: 'Auditoria Web Inteligente',
  },

  // ===== STRATEGIC BOARD (herramientas/strategic-board) =====
  boardPage: {
    // Header
    strategicBoard: 'Strategic Board',
    version: 'Junta Estrategica AI v1.0',

    // Title
    mainTitle: 'JUNTA ESTRATEGICA AI',
    poweredBy: 'Powered by',

    // Directors
    technicalDirector: 'Director Tecnico',
    strategyDirector: 'Director de Estrategia',
    marketDirector: 'Director de Mercado',
    waiting: 'En espera...',
    analyzing: 'Analizando...',
    keyPoints: 'Puntos Clave',
    recommendation: 'Recomendacion',
    confidence: 'Confianza',

    // Domains
    domainGeneral: 'General',
    domainFinance: 'Finanzas',
    domainMarketing: 'Marketing',
    domainOperations: 'Operaciones',
    domainProduct: 'Producto',
    domainTechnology: 'Tecnologia',

    // Resolution
    boardResolution: 'RESOLUCION DE JUNTA',
    resolutionSubtitle: 'Impulsa Lab - Resolucion de Junta Estrategica',
    consensus: 'Consenso',
    disagreements: 'Desacuerdos',
    finalRecommendation: 'Recomendacion Final',
    immediateActions: 'Acciones Inmediatas',

    // Input
    newQueryForBoard: 'Nueva consulta para la Junta',
    questionForBoard: 'Cual es la pregunta para la Junta?',
    questionPlaceholder: 'Ej: Deberia expandir mi negocio de consultoria tech a Colombia? Tengo $50K de presupuesto y 3 meses de runway...',
    domainLabel: 'Dominio (opcional)',
    downloadMinutes: 'Descargar Acta de Junta',
    newQuery: 'Nueva Consulta',
    conveneBoard: 'Convocar Junta',
    cancel: 'Cancelar',
    synthesizing: 'NOVA sintetizando resolucion...',

    // Example queries
    exampleQueries: [
      'Deberiamos pivotar SOMATT de $49/mes a un modelo freemium con enterprise tier?',
      'Un restaurante con $25K/mes quiere digitalizar operaciones. Cual es la estrategia?',
      'Es viable entrar al mercado de Colombia con Impulsa Lab en 2027?',
      'Como monetizar la base de datos de diagnosticos de SOMATT?',
      'Un salon de belleza quiere automatizar agendamiento y marketing. Que recomendamos?',
    ],

    // Print
    printTitle: 'Acta de Junta Estrategica AI',
    printQuery: 'Consulta',
    printDomain: 'Dominio',
  },

  // ===== JUNTA ESTRATEGICA MARKETING (public /herramientas/agentes/junta-estrategica) =====
  juntaMarketing: {
    // Hero
    heroEyebrow: 'Agente Enterprise',
    heroTitle: 'Junta Estrategica AI',
    heroSubtitle: '4 cerebros. 1 decision. Cero sesgo.',
    heroDescription:
      'Convoca una junta directiva virtual cuando necesites tomar decisiones estrategicas. Claude, Gemini y GPT debaten desde 3 perspectivas distintas. NOVA sintetiza una resolucion ejecutiva con consenso, desacuerdos y acciones inmediatas.',
    ctaPrimary: 'Solicitar Demo',
    ctaSecondary: 'Iniciar sesion',
    // How it works
    howTitle: 'Como funciona',
    howSubtitle: 'Cada decision pasa por 4 cerebros especializados',
    directors: [
      {
        emoji: '\u2699\uFE0F',
        name: 'Director Tecnico',
        model: 'Claude',
        color: '#00BCD4',
        description:
          'Analiza factibilidad, arquitectura y costos. Te dice que es construible, cuando y por cuanto.',
      },
      {
        emoji: '\uD83E\uDDED',
        name: 'Director de Estrategia',
        model: 'Gemini',
        color: '#8B5CF6',
        description:
          'Evalua posicionamiento, ventaja competitiva y timing. Conecta tendencias macro con tu situacion especifica.',
      },
      {
        emoji: '\uD83C\uDF0E',
        name: 'Director de Mercado',
        model: 'GPT',
        color: '#10B981',
        description:
          'Investiga competencia, pricing y segmentos. Cita benchmarks reales del mercado.',
      },
      {
        emoji: '\u2B50',
        name: 'NOVA Moderadora',
        model: 'Claude Opus',
        color: '#F59E0B',
        description:
          'Sintetiza las 3 perspectivas en una resolucion de junta con consenso, desacuerdos y plan de accion.',
      },
    ],
    // For whom
    forWhomTitle: 'Para quien es',
    forWhomSubtitle: 'Decisiones grandes que merecen mas de una cabeza',
    audiences: [
      {
        title: 'Empresas en crecimiento',
        description:
          'Toma decisiones estrategicas con criterio multidisciplinario sin necesidad de un equipo directivo formal.',
      },
      {
        title: 'Fundadores y CEOs',
        description:
          'Tu sparring partner para decisiones grandes: pivots, expansion, pricing, fundraising.',
      },
      {
        title: 'Fondos y Accelerators',
        description:
          'Primer screening AI de oportunidades. Evalua startups con un panel objetivo en minutos.',
      },
    ],
    // Use cases
    useCasesTitle: 'Casos de uso reales',
    useCasesSubtitle: 'Preguntas que la Junta ha debatido esta semana',
    useCases: [
      'Pivotar mi SaaS de $49/mes a freemium con enterprise tier?',
      'Restaurante con $25K/mes quiere digitalizar operaciones. Cual es la estrategia?',
      'Es viable entrar al mercado colombiano con mi servicio en 2027?',
      'Como monetizar mi base de datos de diagnosticos?',
      'Salon de belleza quiere automatizar marketing. Que recomendamos?',
    ],
    // Final CTA
    ctaTitle: 'Disponible para Clientes Enterprise',
    ctaDescription:
      'Cada cliente Enterprise recibe su propia instancia con contexto pre-cargado de su empresa, sus metricas, su mercado y sus decisiones pasadas.',
    ctaFootnote: 'Tambien disponible como integracion custom a tu workflow existente.',
    ctaButton: 'Solicitar Demo Enterprise',
  },

  // ===== BUSINESS PLAN BUILDER (herramientas/plan-de-negocios) =====
  businessPlanPage: {
    // Hero
    heroTitle: 'Plan de Negocios',
    heroHighlight: 'con IA',
    heroSubtitle:
      'Genera un plan de negocios profesional en minutos. Gratis, bilingue, disenado para pequenos negocios.',
    poweredBy: 'Creado por',
    timeWarning: 'El plan tarda entre 30 y 90 segundos en generarse. No cierres esta ventana.',

    // Steps
    step1Title: 'Info Basica',
    step2Title: 'Detalles',
    step3Title: 'Financiero',

    // Step 1 fields
    businessNameLabel: 'Nombre del negocio',
    businessNamePlaceholder: 'Ej: Mi Restaurante LLC',
    industryLabel: 'Industria',
    industryPlaceholder: 'Selecciona una industria',
    industries: [
      'Restaurante',
      'Retail',
      'Servicios Profesionales',
      'Tecnologia',
      'Belleza y Salud',
      'Construccion',
      'Alimentos y Bebidas',
      'Educacion',
      'Transporte',
      'Otro',
    ],
    industryOtherLabel: 'Especifica tu industria',
    industryOtherPlaceholder: 'Ej: Agricultura urbana, logistica, etc.',
    locationLabel: 'Ubicacion',
    locationPlaceholder: 'Ej: Miami, FL',
    stageLabel: 'Etapa del negocio',
    stagePlaceholder: 'Selecciona una etapa',
    stages: ['Idea / Pre-lanzamiento', 'Menos de 1 ano', '1-3 anos', 'Mas de 3 anos'],

    // Step 2 fields
    descriptionLabel: 'Descripcion del negocio',
    descriptionPlaceholder:
      'Describe tu negocio en 2-3 oraciones. Que haces, para quien, y como generas ingresos.',
    mainProductLabel: 'Producto o servicio principal',
    mainProductPlaceholder: 'Ej: Comida colombiana autentica para llevar y delivery',
    idealClientLabel: 'Cliente ideal',
    idealClientPlaceholder: 'Ej: Familias latinas de 25-45 anos en el area de Queens',
    differentiatorLabel: 'Diferenciador (que los hace unicos)',
    differentiatorPlaceholder: 'Ej: Recetas familiares de 3 generaciones, ingredientes importados',

    // Step 3 fields
    investmentLabel: 'Inversion inicial estimada',
    investmentPlaceholder: 'Selecciona un rango',
    investmentRanges: [
      'Menos de $5,000',
      '$5,000 - $15,000',
      '$15,000 - $50,000',
      '$50,000 - $100,000',
      '$100,000 - $250,000',
      'Mas de $250,000',
    ],
    monthlySalesLabel: 'Ventas mensuales en USD (actuales o proyectadas)',
    monthlySalesPlaceholder: '8000',
    seeksFundingLabel: '¿Busca financiamiento?',
    yes: 'Si',
    no: 'No',
    fundingAmountLabel: '¿Cuanto financiamiento busca? (USD)',
    fundingAmountPlaceholder: '50000',
    employeesLabel: 'Numero de empleados',
    employeesPlaceholder: 'Selecciona un rango',
    employeeRanges: ['Solo yo', '2-5', '6-10', '11-25', '26-50', 'Mas de 50'],

    // Navigation
    back: 'Atras',
    next: 'Siguiente',
    generatePlan: 'Generar Plan de Negocios',
    generating: 'Generando...',
    planReady: 'Tu plan esta listo',

    // Loading
    loadingSteps: [
      'Analizando tu industria...',
      'Investigando el mercado...',
      'Evaluando competencia...',
      'Disenando estrategia de marketing...',
      'Calculando proyecciones financieras...',
      'Planificando operaciones...',
      'Evaluando riesgos...',
      'Creando plan de implementacion...',
      'Generando plan de negocios con IA...',
    ],

    // Results
    planGenerated: 'Plan de negocios generado con inteligencia artificial',
    planSections: 'Secciones del Plan',
    highlightsCount: 'puntos clave',
    keyHighlights: 'Puntos Clave',
    fullContent: 'Contenido Completo',

    // Metrics
    metricRevenue: 'Ingresos Ano 1',
    metricBreakEven: 'Punto de Equilibrio',
    metricInvestment: 'Inversion Necesaria',
    metricMargin: 'Margen Ano 3',

    // CTA
    ctaTitle: '¿Necesitas ayuda implementando este plan?',
    ctaDescription:
      'Impulsa Lab puede automatizar tus operaciones, construir tu presencia digital y acelerar el crecimiento de tu negocio.',
    ctaButton: 'Hablar con un consultor',

    // Actions
    exportPdf: 'Exportar PDF',
    newPlan: 'Nuevo Plan',
    freePlanUsed:
      'Ya generaste tu plan gratuito. Contactanos para generar planes adicionales.',
    contactUs: 'Contactanos',

    // Email gate (for PDF download)
    emailGateTitle: 'Ingresa tu email para descargar el PDF',
    emailGateSubtitle:
      'Te enviaremos tambien consejos practicos de IA y automatizacion para tu negocio. Sin spam.',
    emailGatePlaceholder: 'tu@email.com',
    emailGateSubmit: 'Descargar PDF',
    emailGateCancel: 'Cancelar',
    emailGateSending: 'Preparando PDF...',
    emailInvalid: 'Ingresa un email valido.',

    // Errors
    unexpectedError: 'Error inesperado. Intenta de nuevo.',
    connectionError: 'Error de conexion. Verifica tu internet e intenta de nuevo.',
    rateLimitError:
      'Has alcanzado el limite de planes por hora. Intenta de nuevo mas tarde o contactanos.',

    // Print
    printTitle: 'Plan de Negocios AI',

    // Features
    feature1Title: '10 Secciones',
    feature1Desc:
      'Desde resumen ejecutivo hasta plan de implementacion. Un plan completo y profesional.',
    feature2Title: 'Generado con IA',
    feature2Desc:
      'Claude AI analiza tu industria y genera proyecciones financieras realistas.',
    feature3Title: 'Proyecciones Financieras',
    feature3Desc:
      'Tabla de 3 anos con ingresos, costos y margen. Listo para presentar a inversores.',
  },

  // ===== INVOICING (herramientas/facturacion) =====
  facturacionPage: {
    title: 'Facturacion',
    subtitle: 'Sistema interno de facturacion - Impulsa Lab',
    openInNewTab: 'Abrir en pestana nueva',
  },
}

export const toolsInternalEN = {
  auditPage: {
    internalTools: 'Internal Tools',
    newAudit: 'New audit',

    smartWebAudit: 'Smart Web',
    smartWebAuditHighlight: 'Audit',
    heroSubtitle: 'Analyze your website with artificial intelligence and get a professional diagnosis in seconds.',
    poweredBy: 'Powered by',

    placeholder: 'https://example.com',
    analyzeButton: 'Analyze Website',
    analyzing: 'Analyzing...',
    hideSourceCode: 'Hide source code field',
    showSourceCode: "Can't access it? Paste the source code",
    sourceCodePlaceholder: 'Paste your website HTML code here...',

    loadingSteps: [
      'Connecting to website...',
      'Downloading content...',
      'Analyzing technical SEO...',
      'Evaluating design & UX...',
      'Reviewing commercial strategy...',
      'Analyzing structure...',
      'Evaluating digital presence...',
      'Checking security...',
      'Generating AI report...',
    ],

    resultFor: 'Result for',
    overallScore: 'Overall Score',
    maturityLevel: 'Maturity level:',
    detailedAnalysis: 'Detailed Analysis',
    topRecommendations: 'Top 5 Priority Recommendations',
    howImpulsaHelps: 'How Impulsa Lab can help you',
    basedOnAudit: 'Based on your audit, these services would have the greatest impact on your business:',
    scheduleFree: 'Schedule free consultation',
    downloadPdf: 'Download PDF',
    analyzeAnother: 'Analyze another site',

    sixDimensions: '6 Dimensions',
    sixDimensionsDesc: 'SEO, Design, Conversion, Structure, Digital Presence and Security.',
    aiAnalysis: 'AI Analysis',
    aiAnalysisDesc: 'Claude analyzes your site like an expert consultant would.',
    actionableReport: 'Actionable Report',
    actionableReportDesc: 'Concrete findings and recommendations you can implement today.',

    findings: 'Findings',
    recommendations: 'Recommendations',
    findingsCount: 'findings',
    recommendationsCount: 'recommendations',

    critical: 'Critical',
    developing: 'Developing',
    good: 'Good',
    excellent: 'Excellent',

    unexpectedError: 'Unexpected error. Please try again.',
    connectionError: 'Connection error. Check your internet and try again.',

    printTitle: 'Smart Web Audit',
  },

  boardPage: {
    strategicBoard: 'Strategic Board',
    version: 'AI Strategic Board v1.0',

    mainTitle: 'AI STRATEGIC BOARD',
    poweredBy: 'Powered by',

    technicalDirector: 'Technical Director',
    strategyDirector: 'Strategy Director',
    marketDirector: 'Market Director',
    waiting: 'Waiting...',
    analyzing: 'Analyzing...',
    keyPoints: 'Key Points',
    recommendation: 'Recommendation',
    confidence: 'Confidence',

    domainGeneral: 'General',
    domainFinance: 'Finance',
    domainMarketing: 'Marketing',
    domainOperations: 'Operations',
    domainProduct: 'Product',
    domainTechnology: 'Technology',

    boardResolution: 'BOARD RESOLUTION',
    resolutionSubtitle: 'Impulsa Lab - Strategic Board Resolution',
    consensus: 'Consensus',
    disagreements: 'Disagreements',
    finalRecommendation: 'Final Recommendation',
    immediateActions: 'Immediate Actions',

    newQueryForBoard: 'New query for the Board',
    questionForBoard: 'What is the question for the Board?',
    questionPlaceholder: 'E.g.: Should I expand my tech consulting business to Colombia? I have $50K budget and 3 months of runway...',
    domainLabel: 'Domain (optional)',
    downloadMinutes: 'Download Board Minutes',
    newQuery: 'New Query',
    conveneBoard: 'Convene Board',
    cancel: 'Cancel',
    synthesizing: 'NOVA synthesizing resolution...',

    exampleQueries: [
      'Should we pivot SOMATT from $49/mo to a freemium model with enterprise tier?',
      "A restaurant with $25K/mo wants to digitize operations. What's the strategy?",
      'Is it viable to enter the Colombia market with Impulsa Lab in 2027?',
      "How to monetize SOMATT's diagnostics database?",
      'A beauty salon wants to automate scheduling and marketing. What do we recommend?',
    ],

    printTitle: 'AI Strategic Board Minutes',
    printQuery: 'Query',
    printDomain: 'Domain',
  },

  // ===== STRATEGIC BOARD MARKETING (public /herramientas/agentes/junta-estrategica) =====
  juntaMarketing: {
    heroEyebrow: 'Enterprise Agent',
    heroTitle: 'AI Strategic Board',
    heroSubtitle: '4 brains. 1 decision. Zero bias.',
    heroDescription:
      'Convene a virtual board of directors whenever you need to make a strategic call. Claude, Gemini and GPT debate from 3 distinct perspectives. NOVA synthesizes an executive resolution with consensus, disagreements and immediate actions.',
    ctaPrimary: 'Request Demo',
    ctaSecondary: 'Sign in',

    howTitle: 'How it works',
    howSubtitle: 'Every decision goes through 4 specialized brains',
    directors: [
      {
        emoji: '\u2699\uFE0F',
        name: 'Technical Director',
        model: 'Claude',
        color: '#00BCD4',
        description:
          'Analyzes feasibility, architecture and costs. Tells you what can be built, when and at what price.',
      },
      {
        emoji: '\uD83E\uDDED',
        name: 'Strategy Director',
        model: 'Gemini',
        color: '#8B5CF6',
        description:
          'Evaluates positioning, competitive advantage and timing. Connects macro trends to your specific situation.',
      },
      {
        emoji: '\uD83C\uDF0E',
        name: 'Market Director',
        model: 'GPT',
        color: '#10B981',
        description:
          'Researches competition, pricing and segments. Cites real market benchmarks.',
      },
      {
        emoji: '\u2B50',
        name: 'NOVA Moderator',
        model: 'Claude Opus',
        color: '#F59E0B',
        description:
          'Synthesizes all 3 perspectives into a board resolution with consensus, disagreements and action plan.',
      },
    ],

    forWhomTitle: 'Who it is for',
    forWhomSubtitle: 'Big decisions that deserve more than one head',
    audiences: [
      {
        title: 'Growing companies',
        description:
          'Make strategic decisions with multi-disciplinary judgment without needing a formal executive team.',
      },
      {
        title: 'Founders and CEOs',
        description:
          'Your sparring partner for big calls: pivots, expansion, pricing, fundraising.',
      },
      {
        title: 'Funds and accelerators',
        description:
          'First AI screening of opportunities. Evaluate startups with an objective panel in minutes.',
      },
    ],

    useCasesTitle: 'Real use cases',
    useCasesSubtitle: 'Questions the Board has debated this week',
    useCases: [
      'Should I pivot my SaaS from $49/mo to freemium with an enterprise tier?',
      'A restaurant with $25K/mo wants to digitize operations. What is the strategy?',
      'Is it viable to enter the Colombian market with my service in 2027?',
      'How do I monetize my diagnostics database?',
      'A beauty salon wants to automate marketing. What do we recommend?',
    ],

    ctaTitle: 'Available for Enterprise clients',
    ctaDescription:
      'Every Enterprise client gets a dedicated instance with pre-loaded context about their company, metrics, market and past decisions.',
    ctaFootnote: 'Also available as a custom integration into your existing workflow.',
    ctaButton: 'Request Enterprise Demo',
  },

  // ===== BUSINESS PLAN BUILDER (herramientas/plan-de-negocios) =====
  businessPlanPage: {
    heroTitle: 'Business Plan',
    heroHighlight: 'with AI',
    heroSubtitle:
      'Generate a professional business plan in minutes. Free, bilingual, designed for small businesses.',
    poweredBy: 'Built by',
    timeWarning: 'Plan generation takes 30 to 90 seconds. Please do not close this window.',

    step1Title: 'Basic Info',
    step2Title: 'Details',
    step3Title: 'Financial',

    businessNameLabel: 'Business name',
    businessNamePlaceholder: 'E.g.: My Restaurant LLC',
    industryLabel: 'Industry',
    industryPlaceholder: 'Select an industry',
    industries: [
      'Restaurant',
      'Retail',
      'Professional Services',
      'Technology',
      'Beauty & Health',
      'Construction',
      'Food & Beverage',
      'Education',
      'Transportation',
      'Other',
    ],
    industryOtherLabel: 'Specify your industry',
    industryOtherPlaceholder: 'E.g.: Urban farming, logistics, etc.',
    locationLabel: 'Location',
    locationPlaceholder: 'E.g.: Miami, FL',
    stageLabel: 'Business stage',
    stagePlaceholder: 'Select a stage',
    stages: ['Idea / Pre-launch', 'Less than 1 year', '1-3 years', 'More than 3 years'],

    descriptionLabel: 'Business description',
    descriptionPlaceholder:
      'Describe your business in 2-3 sentences. What you do, for whom, and how you generate revenue.',
    mainProductLabel: 'Main product or service',
    mainProductPlaceholder: 'E.g.: Authentic Colombian food for takeout and delivery',
    idealClientLabel: 'Ideal customer',
    idealClientPlaceholder: 'E.g.: Latino families aged 25-45 in the Queens area',
    differentiatorLabel: 'Differentiator (what makes you unique)',
    differentiatorPlaceholder: 'E.g.: 3-generation family recipes, imported ingredients',

    investmentLabel: 'Estimated initial investment',
    investmentPlaceholder: 'Select a range',
    investmentRanges: [
      'Less than $5,000',
      '$5,000 - $15,000',
      '$15,000 - $50,000',
      '$50,000 - $100,000',
      '$100,000 - $250,000',
      'More than $250,000',
    ],
    monthlySalesLabel: 'Monthly sales in USD (current or projected)',
    monthlySalesPlaceholder: '8000',
    seeksFundingLabel: 'Seeking funding?',
    yes: 'Yes',
    no: 'No',
    fundingAmountLabel: 'How much funding are you seeking? (USD)',
    fundingAmountPlaceholder: '50000',
    employeesLabel: 'Number of employees',
    employeesPlaceholder: 'Select a range',
    employeeRanges: ['Just me', '2-5', '6-10', '11-25', '26-50', 'More than 50'],

    back: 'Back',
    next: 'Next',
    generatePlan: 'Generate Business Plan',
    generating: 'Generating...',
    planReady: 'Your plan is ready',

    loadingSteps: [
      'Analyzing your industry...',
      'Researching the market...',
      'Evaluating competition...',
      'Designing marketing strategy...',
      'Calculating financial projections...',
      'Planning operations...',
      'Assessing risks...',
      'Creating implementation plan...',
      'Generating business plan with AI...',
    ],

    planGenerated: 'Business plan generated with artificial intelligence',
    planSections: 'Plan Sections',
    highlightsCount: 'key highlights',
    keyHighlights: 'Key Highlights',
    fullContent: 'Full Content',

    metricRevenue: 'Year 1 Revenue',
    metricBreakEven: 'Break-Even',
    metricInvestment: 'Investment Needed',
    metricMargin: 'Year 3 Margin',

    ctaTitle: 'Need help implementing this plan?',
    ctaDescription:
      'Impulsa Lab can automate your operations, build your digital presence, and accelerate your business growth.',
    ctaButton: 'Talk to a consultant',

    exportPdf: 'Export PDF',
    newPlan: 'New Plan',
    freePlanUsed:
      'You already generated your free plan. Contact us to generate additional plans.',
    contactUs: 'Contact us',

    emailGateTitle: 'Enter your email to download the PDF',
    emailGateSubtitle:
      'We will also send you practical AI and automation tips for your business. No spam.',
    emailGatePlaceholder: 'you@email.com',
    emailGateSubmit: 'Download PDF',
    emailGateCancel: 'Cancel',
    emailGateSending: 'Preparing PDF...',
    emailInvalid: 'Please enter a valid email.',

    unexpectedError: 'Unexpected error. Please try again.',
    connectionError: 'Connection error. Check your internet and try again.',
    rateLimitError:
      'You have reached the hourly plan limit. Please try again later or contact us.',

    printTitle: 'AI Business Plan',

    feature1Title: '10 Sections',
    feature1Desc:
      'From executive summary to implementation plan. A complete, professional plan.',
    feature2Title: 'AI-Generated',
    feature2Desc:
      'Claude AI analyzes your industry and generates realistic financial projections.',
    feature3Title: 'Financial Projections',
    feature3Desc:
      '3-year table with revenue, costs and margin. Ready to present to investors.',
  },

  // ===== INVOICING (herramientas/facturacion) =====
  facturacionPage: {
    title: 'Invoicing',
    subtitle: 'Internal invoicing system - Impulsa Lab',
    openInNewTab: 'Open in new tab',
  },
}
