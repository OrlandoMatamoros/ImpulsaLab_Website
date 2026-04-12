// app/diagnostico/components/pdf/sections/Conclusions.tsx
import jsPDF from 'jspdf';
import { PDFStyles } from '../utils/pdfStyles';

export async function generateConclusions(
  pdf: jsPDF,
  scores: any,
  clientInfo: any,
  userData: any,
  styles: typeof PDFStyles,
  translations: any
) {
  const tp = translations;

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const maxY = pageHeight - 40;

  const checkPageSpace = (currentY: number, requiredSpace: number, addHeader: boolean = true): number => {
    if (currentY + requiredSpace > maxY) {
      pdf.addPage();

      if (addHeader) {
        pdf.setFillColor(...styles.colors.primary);
        pdf.rect(0, 0, pageWidth, 35, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(20);
        pdf.setFont('helvetica', 'bold');
        pdf.text(tp.headerTitleCont, 20, 22);

        const currentPage = pdf.getCurrentPageInfo().pageNumber;
        pdf.setFontSize(9);
        pdf.setTextColor(...styles.colors.gray);
        pdf.text(tp.pageOf(currentPage, currentPage), pageWidth - 20, pageHeight - 10, { align: 'right' });

        return 45;
      }

      return 30;
    }
    return currentY;
  };

  pdf.setFillColor(...styles.colors.primary);
  pdf.rect(0, 0, pageWidth, 35, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text(tp.headerTitle, 20, 22);

  let yPos = 50;

  const averageScore = Math.round((scores.finance + scores.operations + scores.marketing) / 3);
  const companyName = clientInfo?.companyName || clientInfo?.name || tp.defaultCompany;
  const industryName = clientInfo?.industry || tp.defaultIndustry;

  const businessStage = averageScore >= 70 ? tp.stageExpansion :
                        averageScore >= 40 ? tp.stageGrowth :
                        tp.stageSurvival;

  const weakestAxis = Object.entries(scores).reduce((min, [key, value]) => {
    const numValue = value as number;
    return numValue < min.value ? { key, value: numValue } : min;
  }, { key: 'finance', value: scores.finance as number });

  const strongestAxis = Object.entries(scores).reduce((max, [key, value]) => {
    const numValue = value as number;
    return numValue > max.value ? { key, value: numValue } : max;
  }, { key: 'finance', value: scores.finance as number });

  const weakAxis = tp.axisLabels[weakestAxis.key as 'finance' | 'operations' | 'marketing'];
  const strongAxis = tp.axisLabels[strongestAxis.key as 'finance' | 'operations' | 'marketing'];

  yPos = checkPageSpace(yPos, 20);

  pdf.setFillColor(...styles.colors.primary);
  pdf.rect(15, yPos - 8, pageWidth - 30, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(tp.currentSituationTitle, 20, yPos);

  yPos += 12;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(11);
  pdf.setTextColor(...styles.colors.black);

  const summaryText = tp.summaryText(companyName, averageScore, businessStage, strongAxis, strongestAxis.value, weakAxis, weakestAxis.value);

  const lines1 = pdf.splitTextToSize(summaryText, pageWidth - 50);
  lines1.forEach((line: string) => {
    yPos = checkPageSpace(yPos, 7);
    pdf.text(line, 25, yPos);
    yPos += 6;
  });

  yPos += 10;

  yPos = checkPageSpace(yPos, 75);

  pdf.setFillColor(...styles.colors.success);
  pdf.rect(15, yPos - 8, pageWidth - 30, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(tp.growthPotentialTitle, 20, yPos);

  yPos += 12;

  const totalPotential = Math.round(((100 - scores.finance) + (100 - scores.operations) + (100 - scores.marketing)) / 3);

  pdf.setFillColor(220, 252, 231);
  pdf.roundedRect(20, yPos, pageWidth - 40, 60, 3, 3, 'F');

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(11);
  pdf.setTextColor(...styles.colors.black);

  const potentialText = tp.potentialText(totalPotential, companyName);

  const lines2 = pdf.splitTextToSize(potentialText, pageWidth - 50);
  let tempY = yPos + 8;
  lines2.forEach((line: string) => {
    pdf.text(line, 25, tempY);
    tempY += 6;
  });

  tempY += 3;

  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...styles.colors.success);
  (tp.achievements as string[]).forEach((achievement: string) => {
    tempY = checkPageSpace(tempY, 7);
    pdf.text(achievement, 30, tempY);
    tempY += 6;
  });

  yPos = tempY + 10;

  yPos = checkPageSpace(yPos, 50);

  pdf.setFillColor(220, 38, 127);
  pdf.rect(15, yPos - 8, pageWidth - 30, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(tp.strategicRecTitle, 20, yPos);

  yPos += 12;

  pdf.setFillColor(255, 239, 239);
  pdf.roundedRect(20, yPos, pageWidth - 40, 35, 3, 3, 'F');

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(11);
  pdf.setTextColor(...styles.colors.black);

  const recommendationText = tp.recommendationText(weakAxis);

  const lines3 = pdf.splitTextToSize(recommendationText, pageWidth - 50);
  tempY = yPos + 8;
  lines3.forEach((line: string) => {
    tempY = checkPageSpace(tempY, 7);
    pdf.text(line, 25, tempY);
    tempY += 6;
  });

  yPos = tempY + 10;

  yPos = checkPageSpace(yPos, 40);

  pdf.setFillColor(0, 123, 255);
  pdf.roundedRect(20, yPos, pageWidth - 40, 35, 5, 5, 'F');

  pdf.setTextColor(255, 255, 255);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(16);
  pdf.text(tp.nextStepTitle, pageWidth/2, yPos + 12, { align: 'center' });

  pdf.setFontSize(13);
  pdf.setFont('helvetica', 'normal');
  pdf.text(tp.nextStepLine1, pageWidth/2, yPos + 22, { align: 'center' });
  pdf.text(tp.nextStepLine2, pageWidth/2, yPos + 28, { align: 'center' });

  yPos += 45;

  yPos = checkPageSpace(yPos, 50);

  pdf.setFillColor(245, 245, 245);
  pdf.roundedRect(20, yPos, pageWidth - 40, 45, 3, 3, 'F');

  pdf.setTextColor(...styles.colors.black);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(11);
  pdf.text(tp.sessionBenefitsTitle, 25, yPos + 8);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);

  let benefitY = yPos + 16;
  (tp.sessionBenefits as string[]).forEach((benefit: string) => {
    benefitY = checkPageSpace(benefitY, 7);
    pdf.text(benefit, 30, benefitY);
    benefitY += 6;
  });

  yPos = benefitY + 10;

  const footerSpace = 40;
  if (yPos + footerSpace > pageHeight - 35) {
    pdf.addPage();
    yPos = pageHeight - 35;
  } else {
    yPos = pageHeight - 35;
  }

  pdf.setFillColor(...styles.colors.primary);
  pdf.rect(0, yPos, pageWidth, 35, 'F');

  pdf.setTextColor(255, 255, 255);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  pdf.text('IMPULSA LAB', 20, yPos + 10);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(tp.footerTagline, 20, yPos + 15);

  pdf.setFontSize(9);
  pdf.text(tp.footerConfidential, 20, yPos + 22);

  const currentDate = new Date().toLocaleDateString(tp.dateLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const validUntilStr = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(tp.dateLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  pdf.text(tp.validUntil(validUntilStr), 20, yPos + 28);

  pdf.setFont('helvetica', 'bold');
  pdf.text(tp.directContact, pageWidth - 80, yPos + 10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(styles.contactInfo?.email || 'contacto@tuimpulsalab.com', pageWidth - 80, yPos + 15);
  pdf.text(styles.contactInfo?.phoneCalls || '+1 347 450-9281', pageWidth - 80, yPos + 20);
  pdf.text(styles.contactInfo?.website || 'www.tuimpulsalab.com', pageWidth - 80, yPos + 25);

  if (userData && ['client', 'consultant', 'admin'].includes(userData.role)) {
    pdf.setTextColor(255, 255, 255, 200);
    pdf.setFontSize(8);
    const email = userData.email || tp.authorizedUser;
    pdf.text(tp.generatedBy(email), pageWidth/2, yPos + 30, { align: 'center' });
  }

  const totalPages = pdf.getCurrentPageInfo().pageNumber;
  pdf.setFontSize(9);
  pdf.setTextColor(255, 255, 255, 200);
  pdf.text(tp.pageOf(totalPages, totalPages), pageWidth - 20, yPos + 30, { align: 'right' });
}
