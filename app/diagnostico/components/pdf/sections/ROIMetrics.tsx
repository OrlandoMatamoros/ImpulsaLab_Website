// app/diagnostico/components/pdf/sections/ROIMetrics.tsx
import jsPDF from 'jspdf';
import { PDFStyles } from '../utils/pdfStyles';

export async function generateROIMetrics(
  pdf: jsPDF,
  scores: any,
  clientInfo: any,
  styles: typeof PDFStyles,
  translations?: any
) {
  const tp = translations;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const maxY = pageHeight - 30; // Margen inferior seguro

  // Función helper para verificar espacio y agregar página si es necesario
  const checkPageSpace = (currentY: number, requiredSpace: number): number => {
    if (currentY + requiredSpace > maxY) {
      pdf.addPage();
      // Header en nueva página
      pdf.setFillColor(...styles.colors.primary);
      pdf.rect(0, 0, pageWidth, 35, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.text(tp?.headerTitleCont ?? 'MÉTRICAS DE ÉXITO Y ROI (Cont.)', 20, 22);

      // Actualizar número de página
      pdf.setFontSize(9);
      pdf.setTextColor(...styles.colors.gray);
      pdf.text(`${tp?.page ?? 'Página'} ${pdf.getCurrentPageInfo().pageNumber} de 7`, pageWidth - 20, pageHeight - 10, { align: 'right' });

      return 45; // Nueva posición Y después del header
    }
    return currentY;
  };

  // Header principal
  pdf.setFillColor(...styles.colors.primary);
  pdf.rect(0, 0, pageWidth, 35, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text(tp?.headerTitle ?? 'MÉTRICAS DE ÉXITO Y RETORNO DE INVERSIÓN', 20, 22);

  let yPos = 50;

  // Identificar el eje más débil para personalizar métricas
  const weakestAxis = Object.entries(scores).reduce<{ key: string; value: number }>(
    (min, [key, value]) =>
      (typeof value === 'number' && value < min.value) ? { key, value } : min,
    { key: 'finance', value: scores.finance as number }
  );

  const weakAxisLabel = weakestAxis.key === 'finance' ? (tp?.axisLabels?.finance ?? 'Finanzas') :
                       weakestAxis.key === 'operations' ? (tp?.axisLabels?.operations ?? 'Operaciones') : (tp?.axisLabels?.marketing ?? 'Marketing');

  // SECCIÓN 1: KPIs principales
  yPos = checkPageSpace(yPos, 20);

  pdf.setFillColor(...styles.colors.success);
  pdf.rect(15, yPos - 8, pageWidth - 30, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(tp?.kpiSectionTitle ?? 'INDICADORES CLAVE DE ÉXITO (KPIs)', 20, yPos);

  yPos += 15;

  // Tabla de KPIs con verificación de espacio
  const kpiTranslations = tp?.kpis;
  const kpis = [
    {
      metric: `Score ${tp?.axisLabels?.[weakestAxis.key] ?? weakAxisLabel}`,
      current: weakestAxis.value.toString(),
      target: Math.min(weakestAxis.value + 35, 100).toString(),
      timeline: `90 ${tp?.days ?? 'días'}`,
      impact: kpiTranslations?.[0]?.impact ?? 'ALTO'
    },
    kpiTranslations?.[1] ?? {
      metric: 'Eficiencia Operativa',
      current: '100%',
      target: '145%',
      timeline: '60 días',
      impact: 'ALTO'
    },
    kpiTranslations?.[2] ?? {
      metric: 'Tiempo en Tareas Manuales',
      current: '100%',
      target: '60%',
      timeline: '30 días',
      impact: 'MEDIO'
    },
    kpiTranslations?.[3] ?? {
      metric: 'Visibilidad de Datos',
      current: 'Reactiva',
      target: 'Proactiva',
      timeline: '45 días',
      impact: 'ALTO'
    },
    kpiTranslations?.[4] ?? {
      metric: 'Capacidad de Procesamiento',
      current: '1X',
      target: '2.5X',
      timeline: '90 días',
      impact: 'ALTO'
    },
    kpiTranslations?.[5] ?? {
      metric: 'Tiempo de Respuesta',
      current: '100%',
      target: '30%',
      timeline: '60 días',
      impact: 'MEDIO'
    }
  ];

  // Header de tabla
  yPos = checkPageSpace(yPos, 12);

  pdf.setFillColor(...styles.colors.lightGray);
  pdf.rect(20, yPos, pageWidth - 40, 10, 'F');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(...styles.colors.black);
  pdf.text(tp?.tableHeaders?.metric ?? 'Métrica', 25, yPos + 7);
  pdf.text(tp?.tableHeaders?.current ?? 'Actual', 70, yPos + 7);
  pdf.text(tp?.tableHeaders?.target ?? 'Objetivo', 100, yPos + 7);
  pdf.text(tp?.tableHeaders?.timeline ?? 'Plazo', 135, yPos + 7);
  pdf.text(tp?.tableHeaders?.impact ?? 'Impacto', 165, yPos + 7);

  yPos += 12;

  // Filas de KPIs con verificación de espacio para cada una
  kpis.forEach((kpi, index) => {
    yPos = checkPageSpace(yPos, 10);

    // Alternar color de fondo
    if (index % 2 === 0) {
      pdf.setFillColor(250, 250, 250);
      pdf.rect(20, yPos - 3, pageWidth - 40, 8, 'F');
    }

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(...styles.colors.black);
    pdf.text(kpi.metric, 25, yPos + 2);
    pdf.text(kpi.current, 70, yPos + 2);

    // Target en verde
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...styles.colors.success);
    pdf.text(kpi.target, 100, yPos + 2);

    // Timeline
    pdf.setTextColor(...styles.colors.black);
    pdf.setFont('helvetica', 'normal');
    pdf.text(kpi.timeline, 135, yPos + 2);

    // Impact con color
    const impactColor = kpi.impact === 'ALTO' ? styles.colors.success : styles.colors.warning;
    pdf.setTextColor(...impactColor);
    pdf.setFont('helvetica', 'bold');
    pdf.text(kpi.impact, 165, yPos + 2);

    yPos += 8;
  });

  yPos += 15;

  // SECCIÓN 2: ROI Proyectado
  yPos = checkPageSpace(yPos, 60);

  pdf.setFillColor(...styles.colors.secondary);
  pdf.rect(15, yPos - 8, pageWidth - 30, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(tp?.roiSectionTitle ?? 'RETORNO DE INVERSIÓN PROYECTADO', 20, yPos);

  yPos += 15;

  // Cards de ROI
  const roiCards = [
    {
      title: (tp?.roiCards?.[0] ?? { title: 'ROI Año 1' }).title,
      value: (tp?.roiCards?.[0] ?? { value: '250-350%' }).value,
      color: styles.colors.success,
      detail: (tp?.roiCards?.[0] ?? { detail: 'Recuperación total + ganancias' }).detail
    },
    {
      title: (tp?.roiCards?.[1] ?? { title: 'Payback' }).title,
      value: (tp?.roiCards?.[1] ?? { value: '3-4 meses' }).value,
      color: styles.colors.secondary,
      detail: (tp?.roiCards?.[1] ?? { detail: 'Tiempo de recuperación' }).detail
    },
    {
      title: (tp?.roiCards?.[2] ?? { title: 'Ahorro Anual' }).title,
      value: (tp?.roiCards?.[2] ?? { value: '$50-150K' }).value,
      color: styles.colors.purple,
      detail: (tp?.roiCards?.[2] ?? { detail: 'En eficiencias y automatización' }).detail
    }
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

  // SECCIÓN 3: Cálculo detallado del ROI
  yPos = checkPageSpace(yPos, 55);

  pdf.setFillColor(...styles.colors.lightGray);
  pdf.roundedRect(20, yPos, pageWidth - 40, 50, 3, 3, 'F');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  pdf.setTextColor(...styles.colors.primary);
  pdf.text(tp?.roiBreakdownTitle ?? 'DESGLOSE DEL RETORNO DE INVERSIÓN', 25, yPos + 10);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.setTextColor(...styles.colors.black);

  const roiBreakdown = tp?.roiBreakdown ?? [
    'Ahorro en horas laborales: 20-30 hrs/semana × $30/hr = $24,000-36,000/año',
    'Incremento en capacidad sin contratar: Equivalente a 2-3 empleados = $100,000-150,000/año',
    'Reducción de errores y reprocesos: 70-80% menos errores = $20,000-30,000/año',
    'Mejora en conversión de ventas: 20-30% más conversión = $50,000-100,000/año'
  ];

  let tempY = yPos + 18;
  roiBreakdown.forEach((item: string) => {
    // Verificar si la línea cabe
    const itemLines = pdf.splitTextToSize(`• ${item}`, pageWidth - 50);
    tempY = checkPageSpace(tempY, itemLines.length * 7);

    itemLines.forEach((line: string) => {
      pdf.text(line, 30, tempY);
      tempY += 6;
    });
    tempY += 1;
  });

  yPos = tempY + 10;

  // SECCIÓN 4: Beneficios intangibles
  yPos = checkPageSpace(yPos, 60);

  pdf.setFillColor(...styles.colors.primary);
  pdf.rect(15, yPos - 8, pageWidth - 30, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(tp?.benefitsTitle ?? 'BENEFICIOS INTANGIBLES', 20, yPos);

  yPos += 10;

  const benefits: string[] = tp?.benefits ?? [
    'Mayor agilidad para responder a cambios del mercado',
    'Mejora en la moral y productividad del equipo',
    'Posicionamiento como líder innovador en tu industria',
    'Capacidad de tomar decisiones basadas en datos reales',
    'Reducción del estrés operativo y burnout del equipo',
    'Preparación para oportunidades de inversión o expansión'
  ];

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.setTextColor(...styles.colors.black);

  benefits.forEach(benefit => {
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

  // SECCIÓN 5: Garantía de resultados (si hay espacio)
  const spaceNeeded = 30;
  if (yPos + spaceNeeded < maxY) {
    yPos += 10;

    pdf.setFillColor(220, 252, 231);
    pdf.setDrawColor(...styles.colors.success);
    pdf.setLineWidth(2);
    pdf.roundedRect(20, yPos, pageWidth - 40, 25, 3, 3, 'FD');

    pdf.setTextColor(...styles.colors.success);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.text(tp?.guaranteeTitle ?? 'GARANTÍA DE RESULTADOS IMPULSA LAB', pageWidth/2, yPos + 8, { align: 'center' });

    pdf.setTextColor(...styles.colors.black);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text(tp?.guaranteeLine1 ?? 'Si no alcanzas al menos 50% del ROI proyectado en 6 meses,', pageWidth/2, yPos + 15, { align: 'center' });
    pdf.text(tp?.guaranteeLine2 ?? 'te proporcionamos consultoría adicional sin costo hasta lograrlo.', pageWidth/2, yPos + 20, { align: 'center' });
  } else {
    // Si no hay espacio, agregar en nueva página
    pdf.addPage();
    yPos = 45;

    pdf.setFillColor(220, 252, 231);
    pdf.setDrawColor(...styles.colors.success);
    pdf.setLineWidth(2);
    pdf.roundedRect(20, yPos, pageWidth - 40, 25, 3, 3, 'FD');

    pdf.setTextColor(...styles.colors.success);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.text(tp?.guaranteeTitle ?? 'GARANTÍA DE RESULTADOS IMPULSA LAB', pageWidth/2, yPos + 8, { align: 'center' });

    pdf.setTextColor(...styles.colors.black);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text(tp?.guaranteeLine1 ?? 'Si no alcanzas al menos 50% del ROI proyectado en 6 meses,', pageWidth/2, yPos + 15, { align: 'center' });
    pdf.text(tp?.guaranteeLine2 ?? 'te proporcionamos consultoría adicional sin costo hasta lograrlo.', pageWidth/2, yPos + 20, { align: 'center' });
  }

  // Número de página
  pdf.setFontSize(9);
  pdf.setTextColor(...styles.colors.gray);
  pdf.text(`${tp?.page ?? 'Página'} 6 de 7`, pageWidth - 20, pageHeight - 10, { align: 'right' });
}
