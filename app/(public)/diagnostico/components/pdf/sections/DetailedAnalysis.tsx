// app/diagnostico/components/pdf/sections/DetailedAnalysis.tsx
import jsPDF from 'jspdf';
import { PDFStyles } from '../utils/pdfStyles';

export async function generateDetailedAnalysis(
  pdf: jsPDF,
  scores: any,
  responses: any[],
  clientInfo: any,
  styles: typeof PDFStyles,
  translations: any
) {
  const tp = translations;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  pdf.setFillColor(...styles.colors.primary);
  pdf.rect(0, 0, pageWidth, 35, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text(tp.headerTitle, 20, 22);

  let yPos = 50;

  const industryName = clientInfo?.industry || 'Otro';
  const benchmarks = styles.industryBenchmarks[industryName as keyof typeof styles.industryBenchmarks] || styles.industryBenchmarks['Otro'];

  // FINANZAS
  pdf.setFillColor(...styles.colors.secondary);
  pdf.rect(15, yPos - 8, pageWidth - 30, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(tp.finance, 20, yPos);

  yPos += 15;

  pdf.setFillColor(245, 245, 245);
  pdf.roundedRect(20, yPos, pageWidth - 40, 25, 3, 3, 'F');

  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...styles.colors.secondary);
  pdf.text(`${tp.scoreLabel} ${scores.finance}/100`, 30, yPos + 10);

  pdf.setTextColor(...styles.colors.gray);
  pdf.setFontSize(12);
  pdf.text(`${tp.benchmarkLabel} ${industryName}: ${benchmarks.finance}`, 30, yPos + 18);

  const financeDiff = scores.finance - benchmarks.finance;
  pdf.setTextColor(...(financeDiff >= 0 ? styles.colors.success : styles.colors.danger));
  pdf.setFontSize(11);
  pdf.text(`${financeDiff >= 0 ? '+' : ''}${financeDiff} ${tp.pts}`, pageWidth - 50, yPos + 14);

  yPos += 35;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(11);
  pdf.setTextColor(...styles.colors.black);

  const financeAnalysis = scores.finance >= 40
    ? tp.financeAnalysisAbove(scores.finance, industryName, benchmarks.finance)
    : tp.financeAnalysisBelow(scores.finance, benchmarks.finance);

  const lines1 = pdf.splitTextToSize(financeAnalysis, pageWidth - 50);
  lines1.forEach((line: string) => {
    pdf.text(line, 25, yPos);
    yPos += 6;
  });

  yPos += 5;

  drawROICard(pdf, yPos, styles.colors.secondary);
  const financeROI = scores.finance < 60 ? '200-300%' : '150-200%';
  const financeTime = scores.finance < 60 ? '30-45' : '15-30';
  fillROICard(pdf, yPos, financeROI, financeTime, styles.colors.secondary, tp);

  yPos += 30;

  // OPERACIONES
  pdf.setFillColor(...styles.colors.success);
  pdf.rect(15, yPos - 8, pageWidth - 30, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(tp.operations, 20, yPos);

  yPos += 15;

  pdf.setFillColor(245, 245, 245);
  pdf.roundedRect(20, yPos, pageWidth - 40, 25, 3, 3, 'F');

  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...styles.colors.success);
  pdf.text(`${tp.scoreLabel} ${scores.operations}/100`, 30, yPos + 10);

  pdf.setTextColor(...styles.colors.gray);
  pdf.setFontSize(12);
  pdf.text(`${tp.benchmarkLabel} ${industryName}: ${benchmarks.operations}`, 30, yPos + 18);

  const opsDiff = scores.operations - benchmarks.operations;
  pdf.setTextColor(...(opsDiff >= 0 ? styles.colors.success : styles.colors.danger));
  pdf.setFontSize(11);
  pdf.text(`${opsDiff >= 0 ? '+' : ''}${opsDiff} ${tp.pts}`, pageWidth - 50, yPos + 14);

  yPos += 35;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(11);
  pdf.setTextColor(...styles.colors.black);

  const operationsAnalysis = scores.operations >= 40
    ? tp.opsAnalysisAbove(scores.operations, benchmarks.operations)
    : tp.opsAnalysisBelow(scores.operations, benchmarks.operations);

  const lines2 = pdf.splitTextToSize(operationsAnalysis, pageWidth - 50);
  lines2.forEach((line: string) => {
    pdf.text(line, 25, yPos);
    yPos += 6;
  });

  yPos += 5;

  drawROICard(pdf, yPos, styles.colors.success);
  const opsROI = scores.operations < 60 ? '200-300%' : '150-200%';
  const opsTime = scores.operations < 60 ? '30-45' : '15-30';
  fillROICard(pdf, yPos, opsROI, opsTime, styles.colors.success, tp);

  if (yPos > 200) {
    pdf.addPage();
    yPos = 30;
  } else {
    yPos += 30;
  }

  // MARKETING
  pdf.setFillColor(...styles.colors.purple);
  pdf.rect(15, yPos - 8, pageWidth - 30, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(tp.marketing, 20, yPos);

  yPos += 15;

  pdf.setFillColor(245, 245, 245);
  pdf.roundedRect(20, yPos, pageWidth - 40, 25, 3, 3, 'F');

  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...styles.colors.purple);
  pdf.text(`${tp.scoreLabel} ${scores.marketing}/100`, 30, yPos + 10);

  pdf.setTextColor(...styles.colors.gray);
  pdf.setFontSize(12);
  pdf.text(`${tp.benchmarkLabel} ${industryName}: ${benchmarks.marketing}`, 30, yPos + 18);

  const mktDiff = scores.marketing - benchmarks.marketing;
  pdf.setTextColor(...(mktDiff >= 0 ? styles.colors.success : styles.colors.danger));
  pdf.setFontSize(11);
  pdf.text(`${mktDiff >= 0 ? '+' : ''}${mktDiff} ${tp.pts}`, pageWidth - 50, yPos + 14);

  yPos += 35;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(11);
  pdf.setTextColor(...styles.colors.black);

  const marketingAnalysis = scores.marketing >= 40
    ? tp.mktAnalysisAbove(scores.marketing, benchmarks.marketing)
    : tp.mktAnalysisBelow(scores.marketing, benchmarks.marketing);

  const lines3 = pdf.splitTextToSize(marketingAnalysis, pageWidth - 50);
  lines3.forEach((line: string) => {
    pdf.text(line, 25, yPos);
    yPos += 6;
  });

  yPos += 5;

  drawROICard(pdf, yPos, styles.colors.purple);
  const mktROI = scores.marketing < 60 ? '200-300%' : '150-200%';
  const mktTime = scores.marketing < 60 ? '30-45' : '15-30';
  fillROICard(pdf, yPos, mktROI, mktTime, styles.colors.purple, tp);

  pdf.setFontSize(9);
  pdf.setTextColor(...styles.colors.gray);
  pdf.text(`${tp.page} 3`, pageWidth - 20, pageHeight - 10, { align: 'right' });
}

function drawROICard(pdf: jsPDF, yPos: number, color: [number, number, number]) {
  const pageWidth = pdf.internal.pageSize.getWidth();
  pdf.setFillColor(...color.map(c => Math.min(255, c + 200)) as [number, number, number]);
  pdf.roundedRect(20, yPos, (pageWidth - 45) / 2, 20, 3, 3, 'F');
}

function fillROICard(pdf: jsPDF, yPos: number, roi: string, time: string, color: [number, number, number], tp: any) {
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(...color);
  pdf.text(tp.roiExpected, 25, yPos + 8);
  pdf.setTextColor(0, 0, 0);
  pdf.text(roi, 70, yPos + 8);

  pdf.setTextColor(...color);
  pdf.text(tp.timeLabel, 25, yPos + 15);
  pdf.setTextColor(0, 0, 0);
  pdf.text(`${time} ${tp.days}`, 55, yPos + 15);

  pdf.setTextColor(...color);
  pdf.text(tp.priorityHigh, 110, yPos + 12);
}
