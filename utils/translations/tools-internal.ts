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

  // ===== INVOICING (herramientas/facturacion) =====
  facturacionPage: {
    title: 'Invoicing',
    subtitle: 'Internal invoicing system - Impulsa Lab',
    openInNewTab: 'Open in new tab',
  },
}
