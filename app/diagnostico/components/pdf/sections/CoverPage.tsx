// app/diagnostico/components/pdf/sections/CoverPage.tsx
import jsPDF from 'jspdf';
import { PDFStyles } from '../utils/pdfStyles';

export async function generateCoverPage(
  pdf: jsPDF,
  clientInfo: any,
  scores: any,
  styles: typeof PDFStyles,
  translations: any
) {
  const tp = translations;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  pdf.setFillColor(...styles.colors.primary);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  pdf.setDrawColor(255, 255, 255);
  pdf.setLineWidth(2);
  pdf.rect(10, 10, pageWidth - 20, pageHeight - 20);
  pdf.setLineWidth(1);
  pdf.rect(12, 12, pageWidth - 24, pageHeight - 24);

  try {
    pdf.addImage('/images/isotipo.jpg', 'JPEG', pageWidth/2 - 20, 25, 40, 40);
    pdf.addImage('/images/logo solo texto.jpg', 'JPEG', pageWidth/2 - 35, 68, 70, 18);
  } catch (error) {
    console.error('Error loading logos:', error);
    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(pageWidth/2 - 35, 25, 70, 25, 5, 5, 'F');
    pdf.setTextColor(...styles.colors.primary);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('IMPULSA', pageWidth/2, 37, { align: 'center' });
    pdf.setFontSize(18);
    pdf.text('LAB', pageWidth/2, 47, { align: 'center' });
  }

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(32);
  pdf.setFont('helvetica', 'bold');
  pdf.text(tp.title, pageWidth/2, 105, { align: 'center' });

  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'normal');
  pdf.text(tp.subtitle, pageWidth/2, 118, { align: 'center' });

  pdf.setDrawColor(255, 255, 255);
  pdf.setLineWidth(2);
  pdf.line(25, 125, pageWidth - 25, 125);
  pdf.setLineWidth(1);
  pdf.line(30, 128, pageWidth - 30, 128);

  const companyName = clientInfo?.companyName || clientInfo?.name || tp.defaultCompany;
  const industry = clientInfo?.industry || tp.notSpecified;
  const contactName = clientInfo?.contactName || '';

  pdf.setFillColor(255, 255, 255);
  pdf.roundedRect(25, 138, pageWidth - 50, 38, 5, 5, 'F');

  pdf.setTextColor(...styles.colors.primary);
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text(companyName.toUpperCase(), pageWidth/2, 150, { align: 'center' });

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`${tp.industryLabel} ${industry}`, pageWidth/2, 160, { align: 'center' });

  if (contactName) {
    pdf.text(`${tp.contactLabel} ${contactName}`, pageWidth/2, 168, { align: 'center' });
  }

  const averageScore = Math.round((scores.finance + scores.operations + scores.marketing) / 3);

  pdf.setFillColor(255, 255, 255);
  pdf.circle(pageWidth/2, 200, 32, 'F');

  const scoreColor = averageScore >= 70 ? styles.colors.success :
                    averageScore >= 40 ? styles.colors.warning :
                    styles.colors.danger;

  pdf.setDrawColor(...scoreColor);
  pdf.setLineWidth(4);
  pdf.circle(pageWidth/2, 200, 30, 'S');

  pdf.setTextColor(...styles.colors.primary);
  pdf.setFontSize(38);
  pdf.setFont('helvetica', 'bold');
  pdf.text(averageScore.toString(), pageWidth/2, 207, { align: 'center' });

  pdf.setFontSize(11);
  pdf.setTextColor(...styles.colors.gray);
  pdf.text('/100', pageWidth/2, 217, { align: 'center' });

  const stage = averageScore >= 70 ? tp.stageExpansion :
                averageScore >= 40 ? tp.stageGrowth :
                tp.stageSurvival;

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(13);
  pdf.setFont('helvetica', 'bold');
  pdf.text(tp.globalScore, pageWidth/2, 240, { align: 'center' });

  pdf.setFillColor(...scoreColor);
  pdf.roundedRect(pageWidth/2 - 35, 245, 70, 18, 8, 8, 'F');

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text(stage, pageWidth/2, 255, { align: 'center' });

  const currentDate = new Date().toLocaleDateString(tp.dateLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(tp.generatedOn(currentDate), pageWidth/2, 270, { align: 'center' });

  pdf.setDrawColor(255, 255, 255, 100);
  pdf.setLineWidth(0.5);
  pdf.line(35, 275, pageWidth - 35, 275);

  pdf.setFontSize(9);
  pdf.setTextColor(255, 255, 255);
  pdf.text('www.tuimpulsalab.com | contacto@tuimpulsalab.com', pageWidth/2, 282, { align: 'center' });

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.text('+1 347 450-9281', pageWidth/2, 290, { align: 'center' });
}
