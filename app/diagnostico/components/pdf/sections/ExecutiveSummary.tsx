// app/diagnostico/components/pdf/sections/ExecutiveSummary.tsx
import jsPDF from 'jspdf';
import { PDFStyles } from '../utils/pdfStyles';

export async function generateExecutiveSummary(
  pdf: jsPDF,
  scores: any,
  clientInfo: any,
  chartImages: any,
  styles: typeof PDFStyles,
  translations?: any
) {
  const tp = translations;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Header
  pdf.setFillColor(...styles.colors.primary);
  pdf.rect(0, 0, pageWidth, 35, 'F');
  pdf.setTextColor(...styles.colors.white);
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text(tp?.headerTitle ?? 'RESUMEN EJECUTIVO', 20, 22);

  let yPos = 50;

  // Score promedio
  const averageScore = Math.round((scores.finance + scores.operations + scores.marketing) / 3);
  const industryName = (clientInfo?.industry as keyof typeof styles.industryBenchmarks) || 'Otro';
  const benchmarks = styles.industryBenchmarks[industryName] || styles.industryBenchmarks['Otro'];

  // Card de información general
  pdf.setFillColor(...styles.colors.lightGray);
  pdf.roundedRect(15, yPos - 5, pageWidth - 30, 40, 3, 3, 'F');

  pdf.setTextColor(...styles.colors.black);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(tp?.businessStatus ?? 'Estado del Negocio', 20, yPos + 5);

  yPos += 12;
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');

  const stage = averageScore >= 70 ? (tp?.stageExpansion ?? 'Expansión') :
                averageScore >= 40 ? (tp?.stageGrowth ?? 'Crecimiento') :
                (tp?.stageSurvival ?? 'Supervivencia');

  pdf.text(`${tp?.companyLabel ?? 'Empresa:'} ${clientInfo?.companyName || (tp?.defaultCompany ?? 'Tu Empresa')}`, 25, yPos);
  pdf.text(`${tp?.stageLabel ?? 'Etapa:'} ${stage}`, 25, yPos + 7);
  pdf.text(`${tp?.globalScoreLabel ?? 'Score Global:'} ${averageScore}/100`, 25, yPos + 14);
  pdf.text(`${tp?.industryLabel ?? 'Industria:'} ${industryName}`, 25, yPos + 21);

  yPos += 35;

  // Insertar gráfico de radar si existe
  if (chartImages?.radar) {
    pdf.text(tp?.triDimensionalAnalysis ?? 'Análisis Tridimensional', 20, yPos);
    yPos += 5;
    pdf.addImage(chartImages.radar, 'PNG', 20, yPos, 80, 60);
    yPos += 65;
  }

  // Scores por dimensión
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  pdf.text(tp?.scoresByDimension ?? 'Puntuaciones por Dimensión', 20, yPos);
  yPos += 10;

  // Finanzas
  drawScoreBar(pdf, tp?.finance ?? 'Finanzas', scores.finance, benchmarks.finance, 25, yPos, styles.colors.secondary, tp?.vsIndustry ?? 'vs industria');
  yPos += 20;

  // Operaciones
  drawScoreBar(pdf, tp?.operations ?? 'Operaciones', scores.operations, benchmarks.operations, 25, yPos, styles.colors.success, tp?.vsIndustry ?? 'vs industria');
  yPos += 20;

  // Marketing
  drawScoreBar(pdf, tp?.marketing ?? 'Marketing', scores.marketing, benchmarks.marketing, 25, yPos, styles.colors.purple, tp?.vsIndustry ?? 'vs industria');
  yPos += 25;

  // Insertar gráfico de barras si existe
  if (chartImages?.bar) {
    pdf.text(tp?.industryComparison ?? 'Comparación con Industria', 20, yPos);
    yPos += 5;

    // Verificar si hay espacio suficiente
    if (yPos + 60 > pageHeight - 30) {
      pdf.addPage();
      yPos = 30;
    }

    pdf.addImage(chartImages.bar, 'PNG', pageWidth - 100, yPos - 80, 80, 60);
  }

  // Insights clave
  if (yPos > 200) {
    pdf.addPage();
    yPos = 30;
  }

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  pdf.text(tp?.keyInsights ?? 'Insights Clave', 20, yPos);
  yPos += 10;

  const ptsLabel = tp?.pts ?? 'pts';
  const insights = [
    {
      text: `${tp?.biggestOpportunity ?? 'Mayor oportunidad:'} ${getWeakestDimension(scores, tp)} (${Math.min(scores.finance, scores.operations, scores.marketing)} ${ptsLabel})`,
      color: styles.colors.danger
    },
    {
      text: `${tp?.biggestStrength ?? 'Mayor fortaleza:'} ${getStrongestDimension(scores, tp)} (${Math.max(scores.finance, scores.operations, scores.marketing)} ${ptsLabel})`,
      color: styles.colors.success
    },
    {
      text: `${tp?.improvementPotential ?? 'Potencial de mejora:'} ${100 - averageScore}%`,
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

  // Número de página
  pdf.setFontSize(9);
  pdf.setTextColor(...styles.colors.gray);
  pdf.text(`${tp?.page ?? 'Página'} 2`, pageWidth - 20, pageHeight - 10, { align: 'right' });
}

// Función auxiliar para dibujar barras de score
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

  // Barra de fondo
  pdf.setFillColor(230, 230, 230);
  pdf.rect(x, y + 2, 100, 8, 'F');

  // Barra de progreso
  pdf.setFillColor(...color);
  pdf.rect(x, y + 2, (score / 100) * 100, 8, 'F');

  // Línea de benchmark
  const benchmarkX = x + (benchmark / 100) * 100;
  pdf.setDrawColor(100, 100, 100);
  pdf.setLineWidth(2);
  pdf.line(benchmarkX, y + 1, benchmarkX, y + 11);

  // Texto del score
  pdf.text(`${score}/100`, x + 105, y + 7);

  // Comparación con benchmark
  const diff = score - benchmark;
  const diffColor = diff >= 0 ? [16, 185, 129] : [239, 68, 68];
  pdf.setTextColor(...diffColor as [number, number, number]);
  pdf.setFontSize(9);
  pdf.text(`(${diff >= 0 ? '+' : ''}${diff} ${vsIndustryLabel})`, x + 130, y + 7);
}

function getWeakestDimension(scores: any, tp?: any): string {
  const min = Math.min(scores.finance, scores.operations, scores.marketing);
  if (scores.finance === min) return tp?.finance ?? 'Finanzas';
  if (scores.operations === min) return tp?.operations ?? 'Operaciones';
  return tp?.marketing ?? 'Marketing';
}

function getStrongestDimension(scores: any, tp?: any): string {
  const max = Math.max(scores.finance, scores.operations, scores.marketing);
  if (scores.finance === max) return tp?.finance ?? 'Finanzas';
  if (scores.operations === max) return tp?.operations ?? 'Operaciones';
  return tp?.marketing ?? 'Marketing';
}
