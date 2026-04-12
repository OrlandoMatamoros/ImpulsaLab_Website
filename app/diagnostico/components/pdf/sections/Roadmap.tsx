// app/diagnostico/components/pdf/sections/Roadmap.tsx
import jsPDF from 'jspdf';
import { PDFStyles } from '../utils/pdfStyles';

interface RoadmapPhase {
  phase: string;
  focus: string;
  keyActions: string[];
  expectedOutcome: string;
}

export async function generateRoadmap(
  pdf: jsPDF,
  roadmapData: RoadmapPhase[] | undefined,
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

  pdf.setDrawColor(200, 200, 200);
  pdf.setLineWidth(3);
  pdf.line(30, yPos, pageWidth - 30, yPos);

  const phases = [
    { x: 30, color: styles.colors.primary },
    { x: 76, color: styles.colors.secondary },
    { x: 122, color: styles.colors.purple },
    { x: 168, color: styles.colors.success }
  ];

  phases.forEach((phase, i) => {
    const tl = tp.timelineLabels[i];
    pdf.setFillColor(...phase.color);
    pdf.circle(phase.x, yPos, 5, 'F');
    pdf.setTextColor(...styles.colors.black);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.text(tl.label, phase.x, yPos - 10, { align: 'center' });
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.text(`${tp.dayPrefix} ${tl.day}`, phase.x, yPos + 12, { align: 'center' });
  });

  yPos += 30;

  if (roadmapData && roadmapData.length > 0) {
    roadmapData.forEach((phase, index) => {
      const phaseColor = index === 0 ? styles.colors.secondary :
                        index === 1 ? styles.colors.purple :
                        styles.colors.success;

      yPos = checkPageSpace(yPos, 70);

      pdf.setFillColor(...phaseColor);
      pdf.rect(15, yPos - 8, pageWidth - 30, 12, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${phase.phase}: ${phase.focus}`, 20, yPos);

      yPos += 10;

      pdf.setFillColor(245, 245, 245);
      pdf.roundedRect(20, yPos, pageWidth - 40, 45, 3, 3, 'F');

      pdf.setTextColor(...styles.colors.black);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.text(tp.keyActions, 25, yPos + 8);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      let tempY = yPos + 15;

      phase.keyActions.forEach(action => {
        const actionLines = pdf.splitTextToSize(`• ${action}`, pageWidth - 50);

        if (tempY + (actionLines.length * 5) > maxY) {
          pdf.addPage();
          pdf.setFillColor(...styles.colors.primary);
          pdf.rect(0, 0, pageWidth, 35, 'F');
          pdf.setTextColor(255, 255, 255);
          pdf.setFontSize(20);
          pdf.setFont('helvetica', 'bold');
          pdf.text(tp.headerTitleCont, 20, 22);
          tempY = 45;

          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(10);
          pdf.setTextColor(...styles.colors.black);
        }

        actionLines.forEach((line: string) => {
          pdf.text(line, 30, tempY);
          tempY += 5;
        });
      });

      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...phaseColor);
      pdf.text(`${tp.expectedResult} ${phase.expectedOutcome}`, 25, tempY + 3);

      yPos = tempY + 15;
    });
  } else {
    const defaultPhases: Array<{
      title: string;
      objective: string;
      actions: string[];
      result: string;
    }> = tp.defaultPhases;

    defaultPhases.forEach((phase, index) => {
      const phaseColor: [number, number, number] =
        index === 0 ? styles.colors.secondary :
        index === 1 ? styles.colors.purple :
        styles.colors.success;

      yPos = checkPageSpace(yPos, 70);

      pdf.setFillColor(...phaseColor);
      pdf.rect(15, yPos - 8, pageWidth - 30, 12, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text(phase.title, 20, yPos);

      yPos += 10;

      pdf.setFillColor(245, 245, 245);
      pdf.roundedRect(20, yPos, pageWidth - 40, 55, 3, 3, 'F');

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(...phaseColor);
      pdf.text(`${tp.objectiveLabel} ${phase.objective}`, 25, yPos + 8);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(...styles.colors.black);

      let tempY = yPos + 15;
      pdf.text(tp.actionsLabel, 25, tempY);
      tempY += 5;

      phase.actions.forEach((action: string) => {
        const actionLines = pdf.splitTextToSize(`• ${action}`, pageWidth - 50);

        if (tempY + (actionLines.length * 5) > maxY) {
          pdf.addPage();
          pdf.setFillColor(...styles.colors.primary);
          pdf.rect(0, 0, pageWidth, 35, 'F');
          pdf.setTextColor(255, 255, 255);
          pdf.setFontSize(20);
          pdf.setFont('helvetica', 'bold');
          pdf.text(tp.headerTitleCont, 20, 22);
          tempY = 45;

          pdf.setFillColor(...phaseColor);
          pdf.rect(15, tempY - 8, pageWidth - 30, 12, 'F');
          pdf.setTextColor(255, 255, 255);
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          pdf.text(`${phase.title} ${tp.continuation}`, 20, tempY);
          tempY += 15;

          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(10);
          pdf.setTextColor(...styles.colors.black);
        }

        actionLines.forEach((line: string) => {
          pdf.text(line, 30, tempY);
          tempY += 5;
        });
      });

      if (tempY + 10 > maxY) {
        pdf.addPage();
        pdf.setFillColor(...styles.colors.primary);
        pdf.rect(0, 0, pageWidth, 35, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(20);
        pdf.setFont('helvetica', 'bold');
        pdf.text(tp.headerTitleCont, 20, 22);
        tempY = 45;
      }

      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...styles.colors.success);
      pdf.text(`${tp.resultLabel} ${phase.result}`, 25, tempY + 5);

      yPos = tempY + 15;
    });
  }

  yPos = checkPageSpace(yPos, 40);

  if (yPos < maxY - 35) {
    yPos += 10;

    pdf.setFillColor(245, 245, 245);
    pdf.roundedRect(20, yPos, pageWidth - 40, 30, 3, 3, 'F');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(...styles.colors.primary);
    pdf.text(`🎯 ${tp.successIndicatorsTitle}`, pageWidth/2, yPos + 10, { align: 'center' });

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.setTextColor(...styles.colors.black);

    const metricsText = tp.successIndicators.join('  |  ');
    const metricsLines = pdf.splitTextToSize(metricsText, pageWidth - 50);

    let metricY = yPos + 18;
    metricsLines.forEach((line: string) => {
      pdf.text(line, pageWidth/2, metricY, { align: 'center' });
      metricY += 5;
    });
  }

  pdf.setFontSize(9);
  pdf.setTextColor(...styles.colors.gray);
  pdf.text(tp.pageOf(5, 7), pageWidth - 20, pageHeight - 10, { align: 'right' });
}
