// app/diagnostico/components/pdf/utils/pdfStyles.ts
export const PDFStyles = {
  colors: {
    primary: [0, 45, 98] as [number, number, number],      // Azul Impulsa
    secondary: [59, 130, 246] as [number, number, number], // Azul claro
    success: [16, 185, 129] as [number, number, number],   // Verde
    warning: [245, 158, 11] as [number, number, number],   // Amarillo
    danger: [239, 68, 68] as [number, number, number],     // Rojo
    purple: [139, 92, 246] as [number, number, number],    // Púrpura
    gray: [107, 114, 128] as [number, number, number],     // Gris
    lightGray: [243, 244, 246] as [number, number, number],// Gris claro
    white: [255, 255, 255] as [number, number, number],    // Blanco
    black: [0, 0, 0] as [number, number, number],          // Negro
  },
  
  fonts: {
    title: { size: 24, style: 'bold' as const },
    subtitle: { size: 18, style: 'bold' as const },
    heading: { size: 14, style: 'bold' as const },
    body: { size: 11, style: 'normal' as const },
    small: { size: 9, style: 'normal' as const },
  },
  
  spacing: {
    page: { margin: 20, padding: 15 },
    section: { marginBottom: 20 },
    element: { marginBottom: 10 },
    line: { height: 6 }
  },
  
  // Información de contacto oficial
  contactInfo: {
    email: 'contacto@tuimpulsalab.com',
    phoneWhatsApp: '+1 347 904 3169',     // WhatsApp Business
    phoneCalls: '+1 347 450-9281',        // Para llamadas y SMS
    website: 'www.tuimpulsalab.com',
    calendly: 'https://calendly.com/orlando-tuimpulsalab/30min'
  },
  
  // Benchmarks por industria
  industryBenchmarks: {
    'Tecnología': { finance: 75, operations: 80, marketing: 70 },
    'Retail': { finance: 65, operations: 70, marketing: 75 },
    'Servicios': { finance: 70, operations: 65, marketing: 65 },
    'Manufactura': { finance: 70, operations: 75, marketing: 60 },
    'Salud': { finance: 80, operations: 75, marketing: 55 },
    'Educación': { finance: 60, operations: 65, marketing: 60 },
    'Alimentos': { finance: 65, operations: 70, marketing: 65 },
    'Otro': { finance: 65, operations: 70, marketing: 60 }
  },
};

export default PDFStyles;