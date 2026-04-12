// app/diagnostico/components/pdf/sections/ROIMetrics.tsx
import jsPDF from 'jspdf';
import { PDFStyles } from '../utils/pdfStyles';

export async function generateROIMetrics(
  pdf: jsPDF,
  scores: any,
  clientInfo: any,
  styles: typeof PDFStyles,
  translations: any
) {
  const tp = translations;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const maxY = pageHeight - 30;

  const checkPageSpace = (currentY: number, requiredSpace: number): number => {
    if (currentY + requiredSpace > maxY) {
      pdf.addPage();
      pdf.setFillColor(...styles.colors.primary);
      pdf.rect(0, 0, pageWidth, 35, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.text(tp.headerTitleCont, 20, 22);

      pdf.setFontSize(9);
      pdf.setTextColor(...styles.colors.gray);
      pdf.text(`${tp.page} ${pdf.getCurrentPageInfo().pageNumber} ${tp.pageOf ? '' : 'de 7'}`, pageWidth - 20, pageHeight - 10, { align: 'right' });

      return 45;
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

  const weakestAxis = Object.entries(scores).reduce<{ key: string; value: number }>(
    (min, [key, value]) =>
      (typeof value === 'number' && value < min.value) ? { key, value } : min,
    { key: 'finance', value: scores.finance as number }
  );

  const weakAxisLabel = tp.axisLabels[weakestAxis.key as 'finance' | 'operations' | 'marketing'];

  yPos = checkPageSpace(yPos, 20);

  pdf.setFillColor(...styles.colors.success);
  pdf.rect(15, yPos - 8, pageWidth - 30, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(tp.kpiSectionTitle, 20, yPos);

  yPos += 15;

  const dynamicScoreKpi = {
    metric: `${tp.scoreKpiPrefix} ${weakAxisLabel}`,
    current: weakestAxis.value.toString(),
    target: Math.min(weakestAxis.value + 35, 100).toString(),
    timeline: `90 ${tp.days}`,
    impact: tp.scoreKpiImpact,
  };
  const kpis = [dynamicScoreKpi, ...tp.kpis];

  yPos = checkPageSpace(yPos, 12);

  pdf.setFillColor(...styles.colors.lightGray);
  pdf.rect(20, yPos, pageWidth - 40, 10, 'F');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(...styles.colors.black);
  pdf.text(tp.tableHeaders.metric, 25, yPos + 7);
  pdf.text(tp.tableHeaders.current, 70, yPos + 7);
  pdf.text(tp.tableHeaders.target, 100, yPos + 7);
  pdf.text(tp.tableHeaders.timeline, 135, yPos + 7);
  pdf.text(tp.tableHeaders.impact, 165, yPos + 7);

  yPos += 12;

  kpis.forEach((kpi, index) => {
    yPos = checkPageSpace(yPos, 10);

    if (index % 2 === 0) {
      pdf.setFillColor(250, 250, 250);
      pdf.rect(20, yPos - 3, pageWidth - 40, 8, 'F');
    }

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(...styles.colors.black);
    pdf.text(kpi.metric, 25, yPos + 2);
    pdf.text(kpi.current, 70, yPos + 2);

    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...styles.colors.success);
    pdf.text(kpi.target, 100, yPos + 2);

    pdf.setTextColor(...styles.colors.black);
    pdf.setFont('helvetica', 'normal');
    pdf.text(kpi.timeline, 135, yPos + 2);

    const impactColor = kpi.impact === tp.scoreKpiImpact ? styles.colors.success : styles.colors.warning;
    pdf.setTextColor(...impactColor);
    pdf.setFont('helvetica', 'bold');
    pdf.text(kpi.impact, 165, yPos + 2);

    yPos += 8;
  });

  yPos += 15;

  yPos = checkPageSpace(yPos, 60);

  pdf.setFillColor(...styles.colors.secondary);
  pdf.rect(15, yPos - 8, pageWidth - 30, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(tp.roiSectionTitle, 20, yPos);

  yPos += 15;

  const roiCards: Array<{ title: string; value: string; detail: string; color: [number, number, number] }> = [
    { ...tp.roiCards[0], color: styles.colors.success },
    { ...tp.roiCards[1], color: styles.colors.secondary },
    { ...tp.roiCards[2], color: styles.colors.purple },
  ];

  const cardWidth = (pageWidth - 50) / 3;
  roiCards.forEach((card, index) => {
    const xPos = 20 + (index * (cardWidth + 5));

    pdf.setFillColor(...card.color);
    pdf.roundedRect(xPos, yPos, cardWidth, 35, 3, 3, 'F');

    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.text(card.title, xPos + cardWidth/2, yPos + 10, { align: 'center' });

    pdf.setFontSize(16);
    pdf.text(card.value, xPos + cardWidth/2, yPos + 20, { align: 'center' });

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.text(card.detail, xPos + cardWidth/2, yPos + 28, { align: 'center' });
  });

  yPos += 45;

  yPos = checkPageSpace(yPos, 55);

  pdf.setFillColor(...styles.colors.lightGray);
  pdf.roundedRect(20, yPos, pageWidth - 40, 50, 3, 3, 'F');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  pdf.setTextColor(...styles.colors.primary);
  pdf.text(tp.roiBreakdownTitle, 25, yPos + 10);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.setTextColor(...styles.colors.black);

  let tempY = yPos + 18;
  (tp.roiBreakdown as string[]).forEach((item: string) => {
    const itemLines = pdf.splitTextToSize(`• ${item}`, pageWidth - 50);
    tempY = checkPageSpace(tempY, itemLines.length * 7);

    itemLines.forEach((line: string) => {
      pdf.text(line, 30, tempY);
      tempY += 6;
    });
    tempY += 1;
  });

  yPos = tempY + 10;

  yPos = checkPageSpace(yPos, 60);

  pdf.setFillColor(...styles.colors.primary);
  pdf.rect(15, yPos - 8, pageWidth - 30, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(tp.benefitsTitle, 20, yPos);

  yPos += 10;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.setTextColor(...styles.colors.black);

  (tp.benefits as string[]).forEach((benefit: string) => {
    yPos = checkPageSpace(yPos, 8);

    pdf.setFillColor(...styles.colors.success);
    pdf.circle(25, yPos - 1, 2, 'F');
    pdf.setTextColor(...styles.colors.black);

    const benefitLines = pdf.splitTextToSize(benefit, pageWidth - 55);
    benefitLines.forEach((line: string) => {
      pdf.text(line, 30, yPos);
      yPos += 5;
    });
    yPos += 2;
  });

  const spaceNeeded = 30;
  if (yPos + spaceNeeded >= maxY) {
    pdf.addPage();
    yPos = 45;
  } else {
    yPos += 10;
  }

  pdf.setFillColor(220, 252, 231);
  pdf.setDrawColor(...styles.colors.success);
  pdf.setLineWidth(2);
  pdf.roundedRect(20, yPos, pageWidth - 40, 25, 3, 3, 'FD');

  pdf.setTextColor(...styles.colors.success);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(11);
  pdf.text(tp.guaranteeTitle, pageWidth/2, yPos + 8, { align: 'center' });

  pdf.setTextColor(...styles.colors.black);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.text(tp.guaranteeLine1, pageWidth/2, yPos + 15, { align: 'center' });
  pdf.text(tp.guaranteeLine2, pageWidth/2, yPos + 20, { align: 'center' });

  pdf.setFontSize(9);
  pdf.setTextColor(...styles.colors.gray);
  pdf.text(tp.pageOf(6, 7), pageWidth - 20, pageHeight - 10, { align: 'right' });
}
