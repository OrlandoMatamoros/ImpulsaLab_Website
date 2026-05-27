'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button, Card, CardContent, CardHeader, CardTitle, Progress } from '@/components/ui/index';
import { useDiagnosticStore } from '@/store/diagnosticStore';
import { useLanguage } from '@/contexts/LanguageContext';
import { InitialLeadCapture } from './InitialLeadCapture';
import { PreAssessment } from './PreAssessment';
import { AdaptiveQuestions } from './AdaptiveQuestions';
import { AutoProcessing } from './AutoProcessing';
import dynamic from 'next/dynamic';

// ResultsDashboard loads recharts (~200 KiB) + jsPDF (~300 KiB) — only needed at step 6.
// Lazy-load to keep initial diagnostico bundle lean.
const ResultsDashboard = dynamic(
  () => import('./ResultsDashboard').then((mod) => ({ default: mod.ResultsDashboard })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center py-24">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#002D62]" />
      </div>
    ),
  }
);
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { ChevronLeft, ChevronRight, RotateCcw, Home } from 'lucide-react';

// Configuración de links
const LINKS = {
  calendly: 'https://calendly.com/orlando-tuimpulsalab/30min',
  email: 'contacto@tuimpulsalab.com',
};

interface DiagnosticWizardProps {
  consultantId: string;
  isInternalMode?: boolean;
}

export default function DiagnosticWizard({ consultantId, isInternalMode = false }: DiagnosticWizardProps) {
  const { t } = useLanguage();
  const tp = t.diagnosticWizard;
  const searchParams = useSearchParams();
  const showResults = searchParams.get('showResults') === 'true';

  const [currentStep, setCurrentStep] = useState(0);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [canNavigate, setCanNavigate] = useState(true);

  // Estado para datos capturados al inicio (Lead Gate)
  const [initialLeadData, setInitialLeadData] = useState<{
    nombre: string;
    email: string;
    telefono?: string;
    negocio: string;
    industria: string;
    empleados: number;
  } | null>(null);
  
  const {
    clientInfo,
    setClientInfo,
    diagnosticResults,
    setDiagnosticResults,
    clearDiagnostic,
  } = useDiagnosticStore();

  const [localClientInfo, setLocalClientInfo] = useState(clientInfo);
  const [financeScore, setFinanceScore] = useState(50);
  const [operationsScore, setOperationsScore] = useState(50);
  const [marketingScore, setMarketingScore] = useState(50);

  // BUG FIX 2: Estado para acumular TODAS las respuestas
  const [allResponses, setAllResponses] = useState({
    clientInfo: {},
    preAssessment: {},
    finance: [] as any[],
    operations: [] as any[],
    marketing: [] as any[]
  });

  const steps = [
    { id: 0, name: tp.steps.registro, icon: '📝' },
    { id: 1, name: tp.steps.evaluacionInicial, icon: '🎯' },
    { id: 2, name: tp.steps.finanzas, icon: '💰' },
    { id: 3, name: tp.steps.operaciones, icon: '⚙️' },
    { id: 4, name: tp.steps.marketing, icon: '📈' },
    { id: 5, name: tp.steps.procesando, icon: '⚡' },
    { id: 6, name: tp.steps.resultados, icon: '📊' },
  ];

  // Función para guardar progreso en localStorage
  const saveProgress = useCallback(() => {
    const progress = {
      currentStep,
      completedSteps: Array.from(completedSteps),
      scores: {
        finance: financeScore,
        operations: operationsScore,
        marketing: marketingScore,
      },
      allResponses: allResponses, // Guardar respuestas también
      initialLeadData: initialLeadData, // Guardar datos de lead capture
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('diagnosticProgress', JSON.stringify(progress));
  }, [currentStep, completedSteps, financeScore, operationsScore, marketingScore, allResponses, initialLeadData]);

  // Guardar progreso en localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('diagnosticProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);

      // Si viene con parámetro showResults=true, ir directo al paso 6 (Resultados)
      if (showResults && progress.scores) {
        setCurrentStep(6);
        setCompletedSteps(new Set([0, 1, 2, 3, 4, 5]));
      } else {
        setCurrentStep(progress.currentStep || 0);
        setCompletedSteps(new Set(progress.completedSteps || []));
      }

      if (progress.scores) {
        setFinanceScore(progress.scores.finance || 50);
        setOperationsScore(progress.scores.operations || 50);
        setMarketingScore(progress.scores.marketing || 50);
      }
      // Restaurar respuestas si existen
      if (progress.allResponses) {
        setAllResponses(progress.allResponses);
      }
      // Restaurar initialLeadData si existe
      if (progress.initialLeadData) {
        setInitialLeadData(progress.initialLeadData);
      }
    }
  }, [showResults]);

  // Guardar automáticamente cuando initialLeadData cambie
  useEffect(() => {
    if (initialLeadData) {
      saveProgress();
    }
  }, [initialLeadData, saveProgress]);

  const handleNext = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      saveProgress();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      saveProgress();
    }
  };

  const handleJumpToStep = (stepIndex: number) => {
    // Solo permitir saltar a pasos completados o al siguiente paso
    if (completedSteps.has(stepIndex) || stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
      saveProgress();
    }
  };

  const handleReset = () => {
    // Limpiar todo el estado
    clearDiagnostic();
    setCurrentStep(0);
    setCompletedSteps(new Set());
    setLocalClientInfo({});
    setFinanceScore(50);
    setOperationsScore(50);
    setMarketingScore(50);
    setInitialLeadData(null); // Limpiar datos de lead capture
    setAllResponses({
      clientInfo: {},
      preAssessment: {},
      finance: [],
      operations: [],
      marketing: []
    });
    localStorage.removeItem('diagnosticProgress');
    setShowResetDialog(false);
  };

  // BUG FIX 2: Funciones actualizadas para guardar respuestas
  const handleFinanceComplete = (score: number, responses?: any[]) => {
    setFinanceScore(score);
    setAllResponses(prev => ({ 
      ...prev, 
      finance: responses || [] 
    }));
    handleNext();
  };

  const handleOperationsComplete = (score: number, responses?: any[]) => {
    setOperationsScore(score);
    setAllResponses(prev => ({ 
      ...prev, 
      operations: responses || [] 
    }));
    handleNext();
  };

  const handleMarketingComplete = (score: number, responses?: any[]) => {
    setMarketingScore(score);
    setAllResponses(prev => ({ 
      ...prev, 
      marketing: responses || [] 
    }));
    const results = {
      finance: financeScore,
      operations: operationsScore,
      marketing: score, // Usar el score actual, no el anterior
      overall: (financeScore + operationsScore + score) / 3,
      date: new Date().toISOString(),
    };
    setDiagnosticResults(results);
    handleNext();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <InitialLeadCapture
            onComplete={(leadData) => {
              console.log('✅ Lead capturado:', leadData);
              // Guardar datos del lead para usar al final
              setInitialLeadData(leadData);
              // También guardar en clientInfo para compatibilidad
              setLocalClientInfo({
                contactName: leadData.nombre,
                email: leadData.email,
                phone: leadData.telefono,
                companyName: leadData.negocio,
                industry: leadData.industria,
                employeeCount: leadData.empleados,
              });
              setClientInfo({
                contactName: leadData.nombre,
                email: leadData.email,
                phone: leadData.telefono,
                companyName: leadData.negocio,
                industry: leadData.industria,
                employeeCount: leadData.empleados,
              });
              // Guardar en allResponses
              setAllResponses(prev => ({
                ...prev,
                clientInfo: {
                  contactName: leadData.nombre,
                  email: leadData.email,
                  phone: leadData.telefono,
                  companyName: leadData.negocio,
                  industry: leadData.industria,
                  employeeCount: leadData.empleados,
                }
              }));
              // Avanzar al siguiente step
              handleNext();
            }}
          />
        );
      case 1:
        return (
          <PreAssessment
            onComplete={(scores) => {
              setFinanceScore(scores.finance);
              setOperationsScore(scores.operations);
              setMarketingScore(scores.marketing);
              // Guardar scores iniciales
              setAllResponses(prev => ({ 
                ...prev, 
                preAssessment: scores 
              }));
              handleNext();
            }}
          />
        );
      case 2:
        return (
          <AdaptiveQuestions
            axis="finance"
            onComplete={handleFinanceComplete}
            initialScore={financeScore}
          />
        );
      case 3:
        return (
          <AdaptiveQuestions
            axis="operations"
            onComplete={handleOperationsComplete}
            initialScore={operationsScore}
          />
        );
      case 4:
        return (
          <AdaptiveQuestions
            axis="marketing"
            onComplete={handleMarketingComplete}
            initialScore={marketingScore}
          />
        );
      case 5:
        // AutoProcessing: Procesamiento automático al terminar el quiz
        if (!initialLeadData) {
          return (
            <div className="text-center py-20">
              <p className="text-red-600 font-semibold">
                {tp.errorNoLead}
              </p>
            </div>
          );
        }
        return (
          <AutoProcessing
            leadData={initialLeadData}
            scores={{
              finance: financeScore,
              operations: operationsScore,
              marketing: marketingScore,
            }}
            responses={[
              ...allResponses.finance,
              ...allResponses.operations,
              ...allResponses.marketing
            ]}
          />
        );
      case 6:
        return (
          <ResultsDashboard
            scores={{
              finance: financeScore,
              operations: operationsScore,
              marketing: marketingScore,
            }}
            responses={[
              ...allResponses.finance,
              ...allResponses.operations,
              ...allResponses.marketing
            ]} // BUG FIX 3: Pasar TODAS las respuestas acumuladas
            clientInfo={localClientInfo}
            onScheduleConsultation={() => {
              window.open(LINKS.calendly, '_blank');
            }}
            isInternalMode={isInternalMode}
          />
        );
      default:
        return null;
    }
  };

  // Guardar progreso cada vez que cambie algo importante
  useEffect(() => {
    saveProgress();
  }, [currentStep, completedSteps, financeScore, operationsScore, marketingScore, allResponses]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 sm:py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header con controles */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                {tp.title}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                {tp.subtitle}
              </p>
            </div>
            
            {/* Botones de control */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">{tp.inicio}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowResetDialog(true)}
                className="flex items-center gap-2 text-orange-600 hover:text-orange-700"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">{tp.reiniciar}</span>
              </Button>
            </div>
          </div>

          {/* Progress Steps - Mejorado para móvil */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">
                {tp.pasoNDeTotal} {currentStep + 1} {tp.de} {steps.length}
              </span>
              <span className="text-sm font-semibold text-blue-600">
                {Math.round(((currentStep + 1) / steps.length) * 100)}% {tp.completado}
              </span>
            </div>
            
            {/* Progress bar */}
            <Progress 
              value={((currentStep + 1) / steps.length) * 100} 
              className="mb-4 h-2"
            />
            
            {/* Steps navigation - Scrollable en móvil */}
            <div className="overflow-x-auto pb-2">
              <div className="flex space-x-2 min-w-max">
                {steps.map((step, index) => {
                  const isCompleted = completedSteps.has(index);
                  const isCurrent = index === currentStep;
                  const isClickable = isCompleted || index <= currentStep;
                  
                  return (
                    <button
                      key={step.id}
                      onClick={() => isClickable && handleJumpToStep(index)}
                      disabled={!isClickable}
                      className={`
                        flex items-center gap-2 px-3 py-2 rounded-lg transition-all
                        ${isCurrent 
                          ? 'bg-blue-600 text-white shadow-md scale-105' 
                          : isCompleted
                          ? 'bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer'
                          : isClickable
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer'
                          : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                        }
                      `}
                    >
                      <span className="text-lg">{step.icon}</span>
                      <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                        {step.name}
                      </span>
                      {isCompleted && (
                        <span className="text-green-500">✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <Card className="shadow-xl">
          <CardContent className="p-4 sm:p-6 lg:p-8">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between items-center">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0 || currentStep === 5}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{tp.anterior}</span>
          </Button>

          <div className="flex gap-2">
            {currentStep < steps.length - 1 && currentStep !== 5 && ![2, 3, 4].includes(currentStep) && (
              <Button
                onClick={() => handleJumpToStep(steps.length - 1)}
                disabled={!completedSteps.has(steps.length - 2)}
                variant="outline"
                className="hidden sm:flex items-center gap-2"
              >
                {tp.irAResultados}
              </Button>
            )}

            {currentStep < steps.length - 1 && currentStep !== 5 && ![2, 3, 4].includes(currentStep) && (
              <Button
                onClick={handleNext}
                className="flex items-center gap-2"
              >
                <span className="hidden sm:inline">{tp.siguiente}</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}

            {currentStep === 5 && (
              <div className="text-sm text-gray-500 italic">
                {tp.procesamientoEnCurso}
              </div>
            )}
          </div>
        </div>

        {/* Indicador de progreso guardado */}
        {completedSteps.size > 0 && (
          <div className="mt-4 text-center text-sm text-gray-500">
            {tp.progresoGuardado}
          </div>
        )}
      </div>

      {/* Dialog de confirmación para reiniciar */}
      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{tp.resetDialogTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {tp.resetDialogDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{tp.cancelar}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReset}
              className="bg-red-600 hover:bg-red-700"
            >
              {tp.siReiniciar}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}