// app/diagnostico/components/pdf/sections/DetailedAnalysis.tsx
import jsPDF from 'jspdf';
import { PDFStyles } from '../utils/pdfStyles';

export async function generateDetailedAnalysis(
  pdf: jsPDF,
  scores: any,
  responses: any[],
  clientInfo: any,
  styles: typeof PDFStyles,
  translations?: any
) {
  const tp = translations;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Header
  pdf.setFillColor(...styles.colors.primary);
  pdf.rect(0, 0, pageWidth, 35, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text(tp?.headerTitle ?? 'ANÁLISIS DETALLADO POR EJE', 20, 22);

  let yPos = 50;

  const industryName = clientInfo?.industry || 'Otro';
  const benchmarks = styles.industryBenchmarks[industryName as keyof typeof styles.industryBenchmarks] || styles.industryBenchmarks['Otro'];

  // FINANZAS
  pdf.setFillColor(...styles.colors.secondary);
  pdf.rect(15, yPos - 8, pageWidth - 30, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(tp?.finance ?? 'FINANZAS', 20, yPos);

  yPos += 15;

  pdf.setFillColor(245, 245, 245);
  pdf.roundedRect(20, yPos, pageWidth - 40, 25, 3, 3, 'F');

  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...styles.colors.secondary);
  pdf.text(`${tp?.scoreLabel ?? 'Score:'} ${scores.finance}/100`, 30, yPos + 10);

  pdf.setTextColor(...styles.colors.gray);
  pdf.setFontSize(12);
  pdf.text(`${tp?.benchmarkLabel ?? 'Benchmark'} ${industryName}: ${benchmarks.finance}`, 30, yPos + 18);

  const financeDiff = scores.finance - benchmarks.finance;
  pdf.setTextColor(...(financeDiff >= 0 ? styles.colors.success : styles.colors.danger));
  pdf.setFontSize(11);
  pdf.text(`${financeDiff >= 0 ? '+' : ''}${financeDiff} ${tp?.pts ?? 'pts'}`, pageWidth - 50, yPos + 14);

  yPos += 35;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(11);
  pdf.setTextColor(...styles.colors.black);

  const financeAnalysis = scores.finance >= 40
    ? (tp?.financeAnalysisAbove ? tp.financeAnalysisAbove(scores.finance, industryName, benchmarks.finance) : `Control financiero básico que requiere fortalecimiento. El score de ${scores.finance} indica sistemas fundamentales pero con brechas en visibilidad. La industria ${industryName} promedia ${benchmarks.finance} puntos, representando una oportunidad de mejora significativa.`)
    : (tp?.financeAnalysisBelow ? tp.financeAnalysisBelow(scores.finance, benchmarks.finance) : `Gestión financiera reactiva. Con ${scores.finance} puntos, estás ${benchmarks.finance - scores.finance} puntos por debajo del estándar de la industria. Esto representa la mayor oportunidad de mejora inmediata.`);

  const lines1 = pdf.splitTextToSize(financeAnalysis, pageWidth - 50);
  lines1.forEach((line: string) => {
    pdf.text(line, 25, yPos);
    yPos += 6;
  });

  yPos += 5;

  // ROI Info
  drawROICard(pdf, yPos, styles.colors.secondary, tp);
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
  pdf.text(tp?.operations ?? 'OPERACIONES', 20, yPos);

  yPos += 15;

  pdf.setFillColor(245, 245, 245);
  pdf.roundedRect(20, yPos, pageWidth - 40, 25, 3, 3, 'F');

  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...styles.colors.success);
  pdf.text(`${tp?.scoreLabel ?? 'Score:'} ${scores.operations}/100`, 30, yPos + 10);

  pdf.setTextColor(...styles.colors.gray);
  pdf.setFontSize(12);
  pdf.text(`${tp?.benchmarkLabel ?? 'Benchmark'} ${industryName}: ${benchmarks.operations}`, 30, yPos + 18);

  const opsDiff = scores.operations - benchmarks.operations;
  pdf.setTextColor(...(opsDiff >= 0 ? styles.colors.success : styles.colors.danger));
  pdf.setFontSize(11);
  pdf.text(`${opsDiff >= 0 ? '+' : ''}${opsDiff} ${tp?.pts ?? 'pts'}`, pageWidth - 50, yPos + 14);

  yPos += 35;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(11);
  pdf.setTextColor(...styles.colors.black);

  const operationsAnalysis = scores.operations >= 40
    ? (tp?.opsAnalysisAbove ? tp.opsAnalysisAbove(scores.operations, benchmarks.operations) : `Operaciones funcionales pero manuales. El score de ${scores.operations} revela dependencia de procesos manuales que limitan escalabilidad. Con el benchmark en ${benchmarks.operations}, existe oportunidad de duplicar capacidad mediante automatización.`)
    : (tp?.opsAnalysisBelow ? tp.opsAnalysisBelow(scores.operations, benchmarks.operations) : `Operaciones principalmente manuales. Tu puntuación de ${scores.operations} está ${benchmarks.operations - scores.operations} puntos debajo del promedio. Se estima que el 60-70% del tiempo se dedica a tareas automatizables.`);

  const lines2 = pdf.splitTextToSize(operationsAnalysis, pageWidth - 50);
  lines2.forEach((line: string) => {
    pdf.text(line, 25, yPos);
    yPos += 6;
  });

  yPos += 5;

  drawROICard(pdf, yPos, styles.colors.success, tp);
  const opsROI = scores.operations < 60 ? '200-300%' : '150-200%';
  const opsTime = scores.operations < 60 ? '30-45' : '15-30';
  fillROICard(pdf, yPos, opsROI, opsTime, styles.colors.success, tp);

  // Verificar si necesitamos nueva página
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
  pdf.text(tp?.marketing ?? 'MARKETING', 20, yPos);

  yPos += 15;

  pdf.setFillColor(245, 245, 245);
  pdf.roundedRect(20, yPos, pageWidth - 40, 25, 3, 3, 'F');

  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...styles.colors.purple);
  pdf.text(`${tp?.scoreLabel ?? 'Score:'} ${scores.marketing}/100`, 30, yPos + 10);

  pdf.setTextColor(...styles.colors.gray);
  pdf.setFontSize(12);
  pdf.text(`${tp?.benchmarkLabel ?? 'Benchmark'} ${industryName}: ${benchmarks.marketing}`, 30, yPos + 18);

  const mktDiff = scores.marketing - benchmarks.marketing;
  pdf.setTextColor(...(mktDiff >= 0 ? styles.colors.success : styles.colors.danger));
  pdf.setFontSize(11);
  pdf.text(`${mktDiff >= 0 ? '+' : ''}${mktDiff} ${tp?.pts ?? 'pts'}`, pageWidth - 50, yPos + 14);

  yPos += 35;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(11);
  pdf.setTextColor(...styles.colors.black);

  const marketingAnalysis = scores.marketing >= 40
    ? (tp?.mktAnalysisAbove ? tp.mktAnalysisAbove(scores.marketing, benchmarks.marketing) : `Marketing básico con potencial sin explotar. Con ${scores.marketing} puntos vs ${benchmarks.marketing} del benchmark, existe brecha en posicionamiento digital. La competencia está capturando market share mediante estrategias omnicanal.`)
    : (tp?.mktAnalysisBelow ? tp.mktAnalysisBelow(scores.marketing, benchmarks.marketing) : `Marketing reactivo y limitado. Tu puntuación de ${scores.marketing} está ${benchmarks.marketing - scores.marketing} puntos bajo el estándar. Los competidores están capturando tu mercado potencial mediante estrategias digitales efectivas.`);

  const lines3 = pdf.splitTextToSize(marketingAnalysis, pageWidth - 50);
  lines3.forEach((line: string) => {
    pdf.text(line, 25, yPos);
    yPos += 6;
  });

  yPos += 5;

  drawROICard(pdf, yPos, styles.colors.purple, tp);
  const mktROI = scores.marketing < 60 ? '200-300%' : '150-200%';
  const mktTime = scores.marketing < 60 ? '30-45' : '15-30';
  fillROICard(pdf, yPos, mktROI, mktTime, styles.colors.purple, tp);

  // Número de página
  pdf.setFontSize(9);
  pdf.setTextColor(...styles.colors.gray);
  pdf.text(`${tp?.page ?? 'Página'} 3`, pageWidth - 20, pageHeight - 10, { align: 'right' });
}

function drawROICard(pdf: jsPDF, yPos: number, color: [number, number, number], tp?: any) {
  const pageWidth = pdf.internal.pageSize.getWidth();
  pdf.setFillColor(...color.map(c => Math.min(255, c + 200)) as [number, number, number]);
  pdf.roundedRect(20, yPos, (pageWidth - 45) / 2, 20, 3, 3, 'F');
}

function fillROICard(pdf: jsPDF, yPos: number, roi: string, time: string, color: [number, number, number], tp?: any) {
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(...color);
  pdf.text(tp?.roiExpected ?? 'ROI Esperado:', 25, yPos + 8);
  pdf.setTextColor(0, 0, 0);
  pdf.text(roi, 70, yPos + 8);

  pdf.setTextColor(...color);
  pdf.text(tp?.timeLabel ?? 'Tiempo:', 25, yPos + 15);
  pdf.setTextColor(0, 0, 0);
  pdf.text(`${time} ${tp?.days ?? 'días'}`, 55, yPos + 15);

  pdf.setTextColor(...color);
  pdf.text(tp?.priorityHigh ?? 'Prioridad: ALTA', 110, yPos + 12);
}
