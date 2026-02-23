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
}
