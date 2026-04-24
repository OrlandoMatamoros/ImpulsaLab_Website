// app/diagnostico/components/pdf/sections/ExecutiveSummary.tsx
import jsPDF from 'jspdf';
import { PDFStyles } from '../utils/pdfStyles';

export async function generateExecutiveSummary(
  pdf: jsPDF,
  scores: any,
  clientInfo: any,
  chartImages: any,
  styles: typeof PDFStyles,
  translations: any
) {
  const tp = translations;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  pdf.setFillColor(...styles.colors.primary);
  pdf.rect(0, 0, pageWidth, 35, 'F');
  pdf.setTextColor(...styles.colors.white);
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text(tp.headerTitle, 20, 22);

  let yPos = 50;

  const averageScore = Math.round((scores.finance + scores.operations + scores.marketing) / 3);
  const industryName = (clientInfo?.industry as keyof typeof styles.industryBenchmarks) || 'Otro';
  const benchmarks = styles.industryBenchmarks[industryName] || styles.industryBenchmarks['Otro'];

  pdf.setFillColor(...styles.colors.lightGray);
  pdf.roundedRect(15, yPos - 5, pageWidth - 30, 40, 3, 3, 'F');

  pdf.setTextColor(...styles.colors.black);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(tp.businessStatus, 20, yPos + 5);

  yPos += 12;
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');

  const stage = averageScore >= 70 ? tp.stageExpansion :
                averageScore >= 40 ? tp.stageGrowth :
                tp.stageSurvival;

  pdf.text(`${tp.companyLabel} ${clientInfo?.companyName || tp.defaultCompany}`, 25, yPos);
  pdf.text(`${tp.stageLabel} ${stage}`, 25, yPos + 7);
  pdf.text(`${tp.globalScoreLabel} ${averageScore}/100`, 25, yPos + 14);
  pdf.text(`${tp.industryLabel} ${industryName}`, 25, yPos + 21);

  yPos += 35;

  if (chartImages?.radar) {
    pdf.text(tp.triDimensionalAnalysis, 20, yPos);
    yPos += 5;
    pdf.addImage(chartImages.radar, 'PNG', 20, yPos, 80, 60);
    yPos += 65;
  }

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  pdf.text(tp.scoresByDimension, 20, yPos);
  yPos += 10;

  drawScoreBar(pdf, tp.finance, scores.finance, benchmarks.finance, 25, yPos, styles.colors.secondary, tp.vsIndustry);
  yPos += 20;

  drawScoreBar(pdf, tp.operations, scores.operations, benchmarks.operations, 25, yPos, styles.colors.success, tp.vsIndustry);
  yPos += 20;

  drawScoreBar(pdf, tp.marketing, scores.marketing, benchmarks.marketing, 25, yPos, styles.colors.purple, tp.vsIndustry);
  yPos += 25;

  if (chartImages?.bar) {
    pdf.text(tp.industryComparison, 20, yPos);
    yPos += 5;

    if (yPos + 60 > pageHeight - 30) {
      pdf.addPage();
      yPos = 30;
    }

    pdf.addImage(chartImages.bar, 'PNG', pageWidth - 100, yPos - 80, 80, 60);
  }

  if (yPos > 200) {
    pdf.addPage();
    yPos = 30;
  }

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  pdf.text(tp.keyInsights, 20, yPos);
  yPos += 10;

  const insights = [
    {
      text: `${tp.biggestOpportunity} ${getWeakestDimension(scores, tp)} (${Math.min(scores.finance, scores.operations, scores.marketing)} ${tp.pts})`,
      color: styles.colors.danger
    },
    {
      text: `${tp.biggestStrength} ${getStrongestDimension(scores, tp)} (${Math.max(scores.finance, scores.operations, scores.marketing)} ${tp.pts})`,
      color: styles.colors.success
    },
    {
      text: `${tp.improvementPotential} ${100 - averageScore}%`,
      color: styles.colors.warning
    }
  ];

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);

  insights.forEach(insight => {
    pdf.setFillColor(...insight.color);
    pdf.circle(25, yPos - 1, 2, 'F');
    pdf.setTextColor(...styles.colors.black);
    pdf.text(insight.text, 30, yPos);
    yPos += 7;
  });

  pdf.setFontSize(9);
  pdf.setTextColor(...styles.colors.gray);
  pdf.text(`${tp.page} 2`, pageWidth - 20, pageHeight - 10, { align: 'right' });
}

function drawScoreBar(
  pdf: jsPDF,
  label: string,
  score: number,
  benchmark: number,
  x: number,
  y: number,
  color: [number, number, number],
  vsIndustryLabel: string
) {
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.setTextColor(0, 0, 0);
  pdf.text(label, x, y);

  pdf.setFillColor(230, 230, 230);
  pdf.rect(x, y + 2, 100, 8, 'F');

  pdf.setFillColor(...color);
  pdf.rect(x, y + 2, (score / 100) * 100, 8, 'F');

  const benchmarkX = x + (benchmark / 100) * 100;
  pdf.setDrawColor(100, 100, 100);
  pdf.setLineWidth(2);
  pdf.line(benchmarkX, y + 1, benchmarkX, y + 11);

  pdf.text(`${score}/100`, x + 105, y + 7);

  const diff = score - benchmark;
  const diffColor = diff >= 0 ? [16, 185, 129] : [239, 68, 68];
  pdf.setTextColor(...diffColor as [number, number, number]);
  pdf.setFontSize(9);
  pdf.text(`(${diff >= 0 ? '+' : ''}${diff} ${vsIndustryLabel})`, x + 130, y + 7);
}

function getWeakestDimension(scores: any, tp: any): string {
  const min = Math.min(scores.finance, scores.operations, scores.marketing);
  if (scores.finance === min) return tp.finance;
  if (scores.operations === min) return tp.operations;
  return tp.marketing;
}

function getStrongestDimension(scores: any, tp: any): string {
  const max = Math.max(scores.finance, scores.operations, scores.marketing);
  if (scores.finance === max) return tp.finance;
  if (scores.operations === max) return tp.operations;
  return tp.marketing;
}
