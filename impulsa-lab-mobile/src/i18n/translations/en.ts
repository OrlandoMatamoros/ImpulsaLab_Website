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
};
