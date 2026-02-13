// English translations
import { TranslationKeys } from './es';

export const en: TranslationKeys = {
  // Common
  common: {
    loading: 'Loading...',
    error: 'Error',
    cancel: 'Cancel',
    confirm: 'Confirm',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    save: 'Save',
    share: 'Share',
    download: 'Download',
    new: 'New',
  },

  // Lead Gate Screen
  leadGate: {
    title: '3D Business Diagnostic',
    subtitle: 'Evaluate your business in 3 key dimensions',
    badges: {
      finance: 'Finance',
      operations: 'Operations',
      marketing: 'Marketing',
    },
    formTitle: "Let's start with your information",
    formSubtitle: 'This data will help us personalize your diagnostic',
    fields: {
      name: 'Full name',
      namePlaceholder: 'John Smith',
      email: 'Email',
      emailPlaceholder: 'john@company.com',
      phone: 'Phone (optional)',
      phonePlaceholder: '+1 555 123 4567',
      company: 'Company name',
      companyPlaceholder: 'My Company Inc.',
      industry: 'Industry',
      industryPlaceholder: 'Select your industry',
      employees: 'Number of employees',
      employeesPlaceholder: 'Select range',
      zipCode: 'Zip Code',
      zipCodePlaceholder: '12345',
    },
    errors: {
      nameRequired: 'Name is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Invalid email',
      companyRequired: 'Company name is required',
      industryRequired: 'Please select an industry',
      employeesRequired: 'Please select number of employees',
      zipCodeRequired: 'Zip code is required',
      zipCodeInvalid: 'Invalid zip code (5 digits)',
    },
    submitButton: 'Start Diagnostic',
    privacyNote: 'Your data is secure and will not be shared with third parties',
    saveError: 'There was a problem saving your data. Please try again.',
  },

  // Diagnostic Wizard Screen
  wizard: {
    completed: 'completed',
    of: 'of',
    keyQuestion: 'Key question',
    selectionRequired: 'Selection required',
    selectOptionMessage: 'Please select an option to continue.',
    processing: 'Processing...',
    viewResults: 'View Results',
    exitTitle: 'Exit diagnostic',
    exitMessage: 'Your progress will be saved automatically. Do you want to exit?',
    exit: 'Exit',
    loadingQuestions: 'Loading questions...',
    errorNoLead: 'Lead data not found.',
    processingError: 'There was a problem processing your diagnostic. Please try again.',
  },

  // Results Screen
  results: {
    completed: 'Diagnostic completed',
    overallScore: 'Overall Score',
    profileVsIndustry: 'Your profile vs. Industry',
    comparedWith: 'Compared with',
    dimensionDetail: 'Detail by dimension',
    recommendations: 'Recommendations for you',
    downloadPDF: 'Download PDF Plan',
    share: 'Share',
    new: 'New',
    noResults: 'No results available',
    startDiagnostic: 'Start diagnostic',
    newDiagnosticTitle: 'New diagnostic',
    newDiagnosticMessage: 'Do you want to start a new diagnostic? Current results will be deleted.',
    startNew: 'Start new',
    pdfGenerated: 'PDF Generated',
    pdfSaved: 'The file has been saved successfully.',
    pdfError: 'Could not generate PDF.',
    shareMessage: 'My 3D Business Diagnostic - Impulsa Lab\n\nOverall Score: {overall}/100\nFinance: {finance}\nOperations: {operations}\nMarketing: {marketing}\n\nLevel: {level}\n\nDiscover yours at Impulsa Lab!',
    legend: {
      yourScore: 'Your score',
      industryAverage: 'Industry average',
    },
    vsIndustry: 'vs industry',
    // AI Roadmap
    aiRoadmap: {
      loadingAI: 'Generating personalized recommendations...',
      primaryRecommendation: 'Primary Recommendation',
      why: 'Why is it important?',
      expectedImpact: 'Expected Impact',
      actionPlan: 'Action Plan',
      tools: 'Recommended Tools',
      quickWin: 'Quick Win',
      timeline: 'Estimated Timeline',
      roadmap90Days: 'Your Roadmap - 90 Days',
      focus: 'Focus',
      keyActions: 'Key Actions',
      expectedOutcome: 'Expected Outcome',
      successMetrics: 'Success Metrics',
      warningTitle: 'Attention',
      byDimension: 'By Dimension',
    },
  },

  // Dimensions
  dimensions: {
    finance: 'Finance',
    operations: 'Operations',
    marketing: 'Marketing',
  },

  // Maturity Levels
  maturity: {
    expansion: {
      label: 'Expansion',
      description: 'Organization ready to scale',
    },
    growth: {
      label: 'Growth',
      description: 'Established company with improvement opportunities',
    },
    survival: {
      label: 'Survival',
      description: 'Fundamental challenges requiring intervention',
    },
  },

  // Percentile Labels
  percentile: {
    excellent: 'Excellent',
    good: 'Good',
    average: 'Average',
    below_average: 'Below average',
  },

  // Industries
  industries: {
    retail: 'Retail / Commerce',
    manufacturing: 'Manufacturing',
    services: 'Professional services',
    technology: 'Technology',
    healthcare: 'Healthcare',
    construction: 'Construction',
    hospitality: 'Hospitality & Tourism',
    education: 'Education',
    agriculture: 'Agriculture',
    other: 'Other',
  },

  // Employee counts
  employees: {
    '1-10': '1-10 employees (Micro)',
    '11-50': '11-50 employees (Small)',
    '51-250': '51-250 employees (Medium)',
    '251+': '251+ employees (Large)',
  },

  // Language selector
  language: {
    title: 'Language',
    spanish: 'Español',
    english: 'English',
  },

  // Questions
  questions: {
    'FIN-PRE-1': {
      text: 'How confident do you feel managing your business finances?',
      options: {
        a: 'No control - I have no clear visibility',
        b: 'Basic oversight - I check occasionally',
        c: 'Constant monitoring - I have everything under control',
      },
    },
    'OPS-PRE-1': {
      text: 'What percentage of your week involves repetitive manual work?',
      options: {
        a: 'More than 60% - Most is repetitive',
        b: '30-60% - A good portion',
        c: 'Less than 30% - Very little',
      },
    },
    'MKT-PRE-1': {
      text: 'How effective is your digital visibility for attracting customers?',
      options: {
        a: 'Minimal - We barely have any presence',
        b: 'Unstructured - We post without strategy',
        c: 'Strategic - We have a defined plan',
      },
    },
    'fin-b-1': {
      text: 'How often do you review your business financial numbers?',
      options: {
        a: 'Annually or never',
        b: 'Quarterly',
        c: 'Monthly',
        d: 'Weekly',
        e: 'Daily with automated reports',
      },
    },
    'fin-b-2': {
      text: 'Do you know the profit margin of your products or services?',
      options: {
        a: "I don't know",
        b: 'I have a general idea',
        c: 'I know the main products',
        d: 'I have the complete catalog documented',
      },
    },
    'fin-b-3': {
      text: 'How do you handle personal accounts vs. business accounts?',
      options: {
        a: 'They are mixed',
        b: 'Partially separated',
        c: 'Completely separated with different accounts',
      },
    },
    'fin-b-4': {
      text: 'How many months of operating expenses do you have in reserve?',
      options: {
        a: 'Less than 1 month',
        b: '1-3 months',
        c: '3-6 months',
        d: '6-12 months',
        e: 'More than 12 months',
      },
    },
    'fin-b-5': {
      text: 'What tools do you use to manage your finances?',
      options: {
        a: 'Paper and notebook',
        b: 'Basic spreadsheets (Excel/Sheets)',
        c: 'Accounting software (QuickBooks, Wave)',
        d: 'Integrated ERP with automatic reports',
      },
    },
    'ops-b-1': {
      text: 'How many hours per week do you spend on repetitive tasks?',
      options: {
        a: 'More than 20 hours',
        b: '10-20 hours',
        c: '5-10 hours',
        d: '2-5 hours',
        e: '0-2 hours (almost everything automated)',
      },
    },
    'ops-b-2': {
      text: 'How do you manage client appointments and reservations?',
      options: {
        a: 'Manually by phone/WhatsApp',
        b: 'Basic calendar (Google Calendar)',
        c: 'Online booking system',
        d: 'Automated system with reminders',
      },
    },
    'ops-b-3': {
      text: 'What level of documentation do your processes have?',
      options: {
        a: "None - It's all in my head",
        b: 'Basic written notes',
        c: 'Formal written manuals',
        d: 'Digital documentation with videos',
      },
    },
    'ops-b-4': {
      text: 'How do you control your inventory or resources?',
      options: {
        a: 'From memory',
        b: 'Manual list or basic Excel',
        c: 'Digital inventory system',
        d: 'Automated system with alerts',
      },
    },
    'ops-b-5': {
      text: 'How long does it take you to generate a results report?',
      options: {
        a: 'A full day or more',
        b: 'Several hours',
        c: 'Less than an hour',
        d: 'Instant (real-time dashboards)',
      },
    },
    'mkt-b-1': {
      text: 'How easy is it to find your business on Google?',
      options: {
        a: "We don't have a website",
        b: "We have a website but it doesn't appear in searches",
        c: 'We appear in some searches',
        d: 'We are in the top results',
      },
    },
    'mkt-b-2': {
      text: 'How often do you post on social media?',
      options: {
        a: 'Never or almost never',
        b: 'Occasionally (when we remember)',
        c: 'Weekly with a calendar',
        d: 'Daily with defined strategy',
      },
    },
    'mkt-b-3': {
      text: 'How well defined is your ideal customer?',
      options: {
        a: "I don't have it clear",
        b: 'I have a general idea',
        c: 'Basic documented profile',
        d: 'Data-based buyer personas',
      },
    },
    'mkt-b-4': {
      text: 'How do you currently get new customers?',
      options: {
        a: 'Only through referrals',
        b: 'Referrals + some social media',
        c: 'Multiple channels (social, Google, email)',
        d: 'Integrated omnichannel strategy',
      },
    },
    'mkt-b-5': {
      text: 'Do you measure the return on investment of your marketing?',
      options: {
        a: "I don't measure anything",
        b: 'I have basic metrics (followers, likes)',
        c: 'I measure conversions and sales',
        d: 'Advanced attribution with ROI by channel',
      },
    },
  },
};
