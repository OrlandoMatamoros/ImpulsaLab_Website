// Auto-generated — EN-only slice of diagnostico-ui.ts
// DO NOT edit directly; update diagnostico-ui.ts and re-run scripts/split-translations.mjs
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
    scoreKpiPrefix: 'Score',
    scoreKpiImpact: 'HIGH',
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

  // === Diagnostico SEO Hero (server-rendered landing content) ===
  diagnosticoSeoHero: {
    h1: 'Free 3D Digital Maturity Diagnostic for your SMB',
    intro:
      'The Impulsa Lab 3D Diagnostic is a free 15-minute assessment that analyzes your company\'s digital maturity across three critical dimensions: Finance, Operations, and Marketing. Designed for small and medium businesses that want to understand where they stand and what concrete steps to take to grow with artificial intelligence and automation.',
    introDims: { finance: 'Finance', operations: 'Operations', marketing: 'Marketing' },
    h2Benefits: 'What do you get by completing the diagnostic?',
    benefits: [
      { strong: 'Visual 3D radar', rest: ' of your digital maturity in Finance, Operations, and Marketing, with a 0-100 score in each dimension.' },
      { strong: 'Identification of critical gaps', rest: ' — which processes are costing you time and money, and which to automate first to maximize ROI.' },
      { strong: 'Personalized action plan', rest: ' generated by AI with the 3-5 first initiatives you should execute in the next 90 days.' },
      { strong: 'Benchmark against similar SMBs', rest: ' — where you stand versus your industry and size.' },
      { strong: 'Recommended resources', rest: ' — tools, guides, and Impulsa Lab services aligned with your specific gaps.' },
    ],
    h2How: 'How does the 3D Diagnostic work?',
    steps: [
      { strong: 'Answer 18 questions', rest: ' about how your business operates today across the three dimensions. There are no right or wrong answers — just honesty about your current reality.' },
      { strong: 'Our AI analyzes your responses', rest: ' against a benchmark of more than 500 SMBs evaluated by Impulsa Lab.' },
      { strong: 'Receive your 3D report instantly', rest: ' on screen, with the option to download it as a PDF and receive a copy by email.' },
      { strong: 'Optional:', rest: ' schedule a free 30-minute call with our team to review your report and define next steps.' },
    ],
    socialProofPrefix: 'More than ',
    socialProofStrong: '500 SMB owners',
    socialProofSuffix:
      ' across the United States and Latin America have already completed their 3D Diagnostic. It is 100% free, no credit card required, and the results are yours with no strings attached. Start now and in 15 minutes you will know exactly how much growth potential your business has and where to begin.',
  },
}

export default diagnosticoUiEN
