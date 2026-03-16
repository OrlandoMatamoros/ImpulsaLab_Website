// app/diagnostico/components/pdf/PDFGenerator.tsx
import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button } from '@/components/ui/button';
import { FileText, Lock, Download, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/FirebaseAuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserRole } from '@/types/user';
import {
  generateCoverPage,
  generateExecutiveSummary,
  generateDetailedAnalysis,
  generateActionPlan,
  generateRoadmap,
  generateROIMetrics,
  generateConclusions
} from './sections';
import { PDFStyles } from './utils/pdfStyles';

interface PDFGeneratorProps {
  scores: {
    finance: number;
    operations: number;
    marketing: number;
  };
  responses: any[];
  clientInfo: any;
  aiAnalysis?: any;
  chartRefs?: {
    radar?: React.RefObject<HTMLDivElement>;
    bar?: React.RefObject<HTMLDivElement>;
  };
}

export function PDFGenerator({
  scores,
  responses,
  clientInfo,
  aiAnalysis,
  chartRefs
}: PDFGeneratorProps) {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const { userData } = useAuth();
  const { t } = useLanguage();
  const tp = t.pdfGenerator;

  // Verificar si el usuario puede descargar el PDF
  const canDownloadPDF = userData && [
    UserRole.CLIENT,
    UserRole.CONSULTANT,
    UserRole.ADMIN
  ].includes(userData.role as UserRole);

  const handleGeneratePDF = async () => {
    // Si no puede descargar, redirigir a Calendly
    if (!canDownloadPDF) {
      window.open('https://calendly.com/orlando-tuimpulsalab/30min', '_blank');
      return;
    }

    setGenerating(true);
    setProgress(0);

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const styles = PDFStyles;

      // Progreso: 10%
      setProgress(10);

      // 1. PORTADA
      await generateCoverPage(pdf, clientInfo, scores, styles, t.pdfCoverPage);

      // Progreso: 20%
      setProgress(20);
      pdf.addPage();

      // 2. RESUMEN EJECUTIVO con gráficos
      let chartImages: any = {};

      // Capturar gráficos si existen
      if (chartRefs?.radar?.current) {
        const radarCanvas = await html2canvas(chartRefs.radar.current, {
          backgroundColor: '#ffffff',
          scale: 2
        });
        chartImages.radar = radarCanvas.toDataURL('image/png');
      }

      if (chartRefs?.bar?.current) {
        const barCanvas = await html2canvas(chartRefs.bar.current, {
          backgroundColor: '#ffffff',
          scale: 2
        });
        chartImages.bar = barCanvas.toDataURL('image/png');
      }

      // Progreso: 40%
      setProgress(40);

      await generateExecutiveSummary(pdf, scores, clientInfo, chartImages, styles, t.pdfExecutiveSummary);

      // Progreso: 50%
      setProgress(50);
      pdf.addPage();

      // 3. ANÁLISIS DETALLADO
      await generateDetailedAnalysis(pdf, scores, responses, clientInfo, styles, t.pdfDetailedAnalysis);

      // Progreso: 60%
      setProgress(60);
      pdf.addPage();

      // 4. PLAN DE ACCIÓN CON IA
      await generateActionPlan(pdf, scores, aiAnalysis, clientInfo, styles, t.pdfActionPlan);

      // Progreso: 70%
      setProgress(70);
      pdf.addPage();

      // 5. ROADMAP 90 DÍAS
      await generateRoadmap(pdf, aiAnalysis?.roadmap90Days || [], styles, t.pdfRoadmap);

      // Progreso: 80%
      setProgress(80);
      pdf.addPage();

      // 6. MÉTRICAS Y ROI
      await generateROIMetrics(pdf, scores, clientInfo, styles, t.pdfROIMetrics);

      // Progreso: 90%
      setProgress(90);
      pdf.addPage();

      // 7. CONCLUSIONES Y PRÓXIMOS PASOS
      await generateConclusions(pdf, scores, clientInfo, userData, styles, t.pdfConclusions);

      // Progreso: 100%
      setProgress(100);

      // Generar nombre del archivo
      const companyName = (clientInfo?.companyName || (tp?.defaultCompany ?? 'Empresa'))
        .replace(/[^a-zA-Z0-9]/g, '-')
        .substring(0, 30);
      const date = new Date().toISOString().split('T')[0];
      const fileName = `Diagnostico-3D-${companyName}-${date}.pdf`;

      // Guardar PDF
      pdf.save(fileName);

      // Guardar metadata en localStorage
      const pdfMetadata = {
        fileName,
        companyName: clientInfo?.companyName || (tp?.defaultCompany ?? 'Empresa'),
        scores,
        generatedAt: new Date().toISOString(),
        generatedBy: userData?.email
      };

      const history = JSON.parse(localStorage.getItem('pdf-history') || '[]');
      history.unshift(pdfMetadata);
      if (history.length > 10) history.pop();
      localStorage.setItem('pdf-history', JSON.stringify(history));

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(tp?.errorGenerating ?? 'Hubo un error al generar el PDF. Por favor intenta de nuevo.');
    } finally {
      setGenerating(false);
      setProgress(0);
    }
  };

  return (
    <div className="relative">
      {/* Botón principal */}
      <Button
        size="lg"
        onClick={handleGeneratePDF}
        disabled={generating}
        className={`
          ${canDownloadPDF
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
            : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
          }
          text-white font-semibold transition-all duration-300 transform hover:scale-105
          shadow-lg hover:shadow-xl px-6 py-3 rounded-lg
        `}
      >
        {generating ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            {tp?.generatingPdf ?? 'Generando PDF...'} {progress}%
          </>
        ) : (
          <>
            {canDownloadPDF ? (
              <>
                <Download className="w-5 h-5 mr-2" />
                {tp?.downloadFull ?? 'Descargar PDF Completo'}
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                <FileText className="w-5 h-5 mr-2" />
                {tp?.pdfAvailable ?? 'PDF Disponible (Agenda Consultoría)'}
              </>
            )}
          </>
        )}
      </Button>

      {/* Barra de progreso */}
      {generating && (
        <div className="absolute -bottom-8 left-0 right-0">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Mensaje para usuarios sin acceso */}
      {!canDownloadPDF && !generating && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          {userData ?
            (tp?.scheduleConsultation ?? 'Agenda tu consultoría gratuita para obtener el PDF completo') :
            (tp?.loginForMore ?? 'Inicia sesión para acceder a más funciones')
          }
        </p>
      )}
    </div>
  );
}
