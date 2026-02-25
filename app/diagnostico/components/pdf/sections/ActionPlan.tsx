// app/diagnostico/components/pdf/sections/ActionPlan.tsx
import jsPDF from 'jspdf';
import { PDFStyles } from '../utils/pdfStyles';

export async function generateActionPlan(
  pdf: jsPDF,
  scores: any,
  aiAnalysis: any,
  clientInfo: any,
  styles: typeof PDFStyles,
  translations?: any
) {
  const tp = translations;

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const maxY = pageHeight - 30; // Margen inferior para evitar cortes

  // Función helper para verificar espacio y agregar página si es necesario
  const checkPageSpace = (currentY: number, requiredSpace: number): number => {
    if (currentY + requiredSpace > maxY) {
      pdf.addPage();
      // Agregar header en nueva página
      pdf.setFillColor(...styles.colors.primary);
      pdf.rect(0, 0, pageWidth, 35, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.text(tp?.headerTitleCont ?? 'PLAN DE ACCIÓN PERSONALIZADO (Cont.)', 20, 22);
      return 45; // Nueva posición Y después del header
    }
    return currentY;
  };

  // Header
  pdf.setFillColor(...styles.colors.primary);
  pdf.rect(0, 0, pageWidth, 35, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text(tp?.headerTitle ?? 'PLAN DE ACCIÓN PERSONALIZADO', 20, 22);

  let yPos = 50;

  // Identificar eje más débil
  const weakestAxis = Object.entries(scores).reduce(
    (min: { key: string; value: number }, [key, value]) =>
      (value as number) < min.value ? { key, value: value as number } : min,
    { key: 'finance', value: scores.finance as number }
  );

  const weakAxisLabel = weakestAxis.key === 'finance' ? 'Finanzas' :
                       weakestAxis.key === 'operations' ? 'Operaciones' : 'Marketing';

  const axisLabel = tp?.axisLabels?.[weakestAxis.key] ?? weakAxisLabel;

  // Si hay análisis de IA, usarlo
  if (aiAnalysis?.primaryRecommendation) {
    // ACCIÓN CRÍTICA con verificación de espacio
    yPos = checkPageSpace(yPos, 40);

    pdf.setFillColor(255, 239, 239);
    pdf.setDrawColor(239, 68, 68);
    pdf.setLineWidth(2);
    pdf.roundedRect(15, yPos - 5, pageWidth - 30, 30, 5, 5, 'FD');

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(220, 38, 127);
    pdf.text(tp?.criticalAction ?? 'ACCIÓN CRÍTICA PRIORITARIA', pageWidth/2, yPos + 5, { align: 'center' });

    pdf.setFontSize(14);
    pdf.setTextColor(...styles.colors.black);
    const title = aiAnalysis.primaryRecommendation.title || `${tp?.strengthen ?? 'Fortalecer'} ${axisLabel}`;
    pdf.text(title, pageWidth/2, yPos + 15, { align: 'center' });

    yPos += 35;

    // ¿Por qué actuar AHORA? con verificación
    yPos = checkPageSpace(yPos, 50);

    pdf.setFillColor(255, 249, 196);
    pdf.roundedRect(20, yPos, pageWidth - 40, 40, 3, 3, 'F');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.setTextColor(...styles.colors.black);
    pdf.text(tp?.whyActNow ?? '¿Por qué actuar AHORA?', 25, yPos + 8);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    const defaultWhyText = `Tu puntuación de ${weakestAxis.value} en ${axisLabel} es crítica. Actuar ahora puede generar un ROI del 200-300% en los próximos 12 meses.`;
    const whyText = aiAnalysis.primaryRecommendation.why ||
      (tp?.defaultWhy ? tp.defaultWhy(weakestAxis.value, axisLabel) : defaultWhyText);

    const whyLines = pdf.splitTextToSize(whyText, pageWidth - 50);
    let tempY = yPos + 15;
    whyLines.forEach((line: string) => {
      tempY = checkPageSpace(tempY, 6);
      pdf.text(line, 25, tempY);
      tempY += 5;
    });

    yPos = tempY + 10;

    // Plan de Implementación con verificación por cada paso
    yPos = checkPageSpace(yPos, 20);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(...styles.colors.primary);
    pdf.text(tp?.implementationPlan ?? 'Plan de Implementación - 5 Pasos Clave:', 25, yPos);
    yPos += 10;

    const actions = aiAnalysis.primaryRecommendation.actions || (tp?.defaultActions ?? [
      'Auditoría inicial del estado actual',
      'Implementación de quick wins',
      'Automatización de procesos clave',
      'Establecimiento de KPIs',
      'Optimización continua'
    ]);

    actions.forEach((action: string, index: number) => {
      // Verificar espacio para cada acción
      yPos = checkPageSpace(yPos, 15);

      // Número en círculo
      pdf.setFillColor(...styles.colors.secondary);
      pdf.circle(28, yPos - 2, 4, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9);
      pdf.text((index + 1).toString(), 28, yPos, { align: 'center' });

      // Texto de la acción
      pdf.setTextColor(...styles.colors.black);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);

      const actionLines = pdf.splitTextToSize(action, pageWidth - 60);
      let actionY = yPos - 2;
      actionLines.forEach((line: string) => {
        pdf.text(line, 35, actionY);
        actionY += 5;
      });
      yPos = actionY + 3;
    });

    yPos += 5;

    // Quick Win con verificación
    yPos = checkPageSpace(yPos, 35);

    pdf.setFillColor(255, 241, 118);
    pdf.setDrawColor(255, 193, 7);
    pdf.setLineWidth(2);
    pdf.roundedRect(15, yPos, pageWidth - 30, 30, 5, 5, 'FD');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(...styles.colors.black);
    pdf.text(tp?.quickWinTitle ?? 'QUICK WIN - Acción para HOY:', 25, yPos + 10);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    const quickWin = aiAnalysis.primaryRecommendation.quickWin ||
      (tp?.defaultQuickWin ?? 'Implementa un dashboard básico de seguimiento con las 3 métricas más críticas.');

    const quickWinLines = pdf.splitTextToSize(quickWin, pageWidth - 50);
    tempY = yPos + 17;
    quickWinLines.forEach((line: string) => {
      pdf.text(line, 25, tempY);
      tempY += 5;
    });

    yPos = tempY + 10;

    // Métricas de éxito con verificación
    if (aiAnalysis.successMetrics && aiAnalysis.successMetrics.length > 0) {
      yPos = checkPageSpace(yPos, 40);

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(...styles.colors.black);
      pdf.text(tp?.successMetrics ?? 'Métricas de Éxito:', 25, yPos);

      yPos += 8;

      aiAnalysis.successMetrics.forEach((metric: string) => {
        yPos = checkPageSpace(yPos, 8);
        pdf.setFillColor(...styles.colors.success);
        pdf.circle(30, yPos - 2, 2, 'F');
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        pdf.setTextColor(...styles.colors.black);

        const metricLines = pdf.splitTextToSize(metric, pageWidth - 60);
        metricLines.forEach((line: string) => {
          pdf.text(line, 35, yPos);
          yPos += 5;
        });
        yPos += 3;
      });
    }

  } else {
    // Plan por defecto si no hay IA
    yPos = checkPageSpace(yPos, 40);

    pdf.setFillColor(255, 239, 239);
    pdf.setDrawColor(239, 68, 68);
    pdf.setLineWidth(2);
    pdf.roundedRect(15, yPos - 5, pageWidth - 30, 30, 5, 5, 'FD');

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(220, 38, 127);
    pdf.text(tp?.criticalAction ?? 'ACCIÓN CRÍTICA PRIORITARIA', pageWidth/2, yPos + 5, { align: 'center' });

    pdf.setFontSize(14);
    pdf.setTextColor(...styles.colors.black);
    pdf.text(`${tp?.strengthen ?? 'Fortalecer'} ${axisLabel} ${tp?.strengthenImmediately ?? 'Inmediatamente'}`, pageWidth/2, yPos + 15, { align: 'center' });

    yPos += 35;
  }

  // Número de página
  pdf.setFontSize(9);
  pdf.setTextColor(...styles.colors.gray);
  pdf.text(`${tp?.page ?? 'Página'} 4`, pageWidth - 20, pageHeight - 10, { align: 'right' });
}
