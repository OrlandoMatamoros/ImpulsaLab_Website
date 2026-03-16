// app/diagnostico/components/pdf/sections/CoverPage.tsx
import jsPDF from 'jspdf';
import { PDFStyles } from '../utils/pdfStyles';

export async function generateCoverPage(
  pdf: jsPDF,
  clientInfo: any,
  scores: any,
  styles: typeof PDFStyles,
  translations?: any
) {
  const tp = translations;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Fondo degradado azul corporativo
  pdf.setFillColor(...styles.colors.primary);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // Marco decorativo doble
  pdf.setDrawColor(255, 255, 255);
  pdf.setLineWidth(2);
  pdf.rect(10, 10, pageWidth - 20, pageHeight - 20);
  pdf.setLineWidth(1);
  pdf.rect(12, 12, pageWidth - 24, pageHeight - 24);

  // LOGO SECTION - Isotipo + Logo solo texto (más pequeño)
  try {
    // Isotipo centrado (reducido)
    pdf.addImage('/images/isotipo.jpg', 'JPEG', pageWidth/2 - 20, 25, 40, 40);
    // Logo solo texto debajo del isotipo (reducido)
    pdf.addImage('/images/logo solo texto.jpg', 'JPEG', pageWidth/2 - 35, 68, 70, 18);
  } catch (error) {
    // Fallback si no cargan las imágenes
    console.error('Error loading logos:', error);

    // Área blanca para el logo fallback
    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(pageWidth/2 - 35, 25, 70, 25, 5, 5, 'F');

    pdf.setTextColor(...styles.colors.primary);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('IMPULSA', pageWidth/2, 37, { align: 'center' });
    pdf.setFontSize(18);
    pdf.text('LAB', pageWidth/2, 47, { align: 'center' });
  }

  // Título principal
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(32);
  pdf.setFont('helvetica', 'bold');
  pdf.text(tp?.title ?? 'DIAGNÓSTICO 3D', pageWidth/2, 105, { align: 'center' });

  // Subtítulo
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'normal');
  pdf.text(tp?.subtitle ?? 'BUSINESS INTELLIGENCE', pageWidth/2, 118, { align: 'center' });

  // Línea decorativa doble
  pdf.setDrawColor(255, 255, 255);
  pdf.setLineWidth(2);
  pdf.line(25, 125, pageWidth - 25, 125);
  pdf.setLineWidth(1);
  pdf.line(30, 128, pageWidth - 30, 128);

  // INFORMACIÓN DEL CLIENTE - Cuadro con fondo blanco
  const companyName = clientInfo?.companyName || clientInfo?.name || (tp?.defaultCompany ?? 'Tu Empresa');
  const industry = clientInfo?.industry || (tp?.notSpecified ?? 'No especificada');
  const contactName = clientInfo?.contactName || '';

  // Recuadro blanco
  pdf.setFillColor(255, 255, 255);
  pdf.roundedRect(25, 138, pageWidth - 50, 38, 5, 5, 'F');

  // Textos en azul corporativo
  pdf.setTextColor(...styles.colors.primary);
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text(companyName.toUpperCase(), pageWidth/2, 150, { align: 'center' });

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`${tp?.industryLabel ?? 'Industria:'} ${industry}`, pageWidth/2, 160, { align: 'center' });

  if (contactName) {
    pdf.text(`${tp?.contactLabel ?? 'Contacto:'} ${contactName}`, pageWidth/2, 168, { align: 'center' });
  }

  // SCORE GLOBAL - Círculo mejorado
  const averageScore = Math.round((scores.finance + scores.operations + scores.marketing) / 3);

  // Círculo blanco de fondo
  pdf.setFillColor(255, 255, 255);
  pdf.circle(pageWidth/2, 200, 32, 'F');

  // Color del anillo según score
  const scoreColor = averageScore >= 70 ? styles.colors.success :
                    averageScore >= 40 ? styles.colors.warning :
                    styles.colors.danger;

  // Anillo de color
  pdf.setDrawColor(...scoreColor);
  pdf.setLineWidth(4);
  pdf.circle(pageWidth/2, 200, 30, 'S');

  // Número del score centrado
  pdf.setTextColor(...styles.colors.primary);
  pdf.setFontSize(38);
  pdf.setFont('helvetica', 'bold');
  pdf.text(averageScore.toString(), pageWidth/2, 207, { align: 'center' });

  // "/100" dentro del círculo
  pdf.setFontSize(11);
  pdf.setTextColor(...styles.colors.gray);
  pdf.text('/100', pageWidth/2, 217, { align: 'center' });

  // PUNTUACIÓN GLOBAL y ETAPA
  const stage = averageScore >= 70 ? (tp?.stageExpansion ?? 'EXPANSIÓN') :
                averageScore >= 40 ? (tp?.stageGrowth ?? 'CRECIMIENTO') :
                (tp?.stageSurvival ?? 'SUPERVIVENCIA');

  // Textos alineados
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(13);
  pdf.setFont('helvetica', 'bold');
  pdf.text(tp?.globalScore ?? 'PUNTUACIÓN GLOBAL', pageWidth/2, 240, { align: 'center' });

  // Badge de etapa centrado debajo
  pdf.setFillColor(...scoreColor);
  pdf.roundedRect(pageWidth/2 - 35, 245, 70, 18, 8, 8, 'F');

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text(stage, pageWidth/2, 255, { align: 'center' });

  // FOOTER - Información de contacto
  const dateLocale = tp?.dateLocale ?? 'es-ES';
  const currentDate = new Date().toLocaleDateString(dateLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Fecha de generación
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const generatedText = tp?.generatedOn ? tp.generatedOn(currentDate) : `Generado el ${currentDate}`;
  pdf.text(generatedText, pageWidth/2, 270, { align: 'center' });

  // Línea separadora sutil
  pdf.setDrawColor(255, 255, 255, 100);
  pdf.setLineWidth(0.5);
  pdf.line(35, 275, pageWidth - 35, 275);

  // Información de contacto
  pdf.setFontSize(9);
  pdf.setTextColor(255, 255, 255);
  pdf.text('www.tuimpulsalab.com | contacto@tuimpulsalab.com', pageWidth/2, 282, { align: 'center' });

  // Teléfono
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.text('+1 929 500-1850', pageWidth/2, 290, { align: 'center' });
}
