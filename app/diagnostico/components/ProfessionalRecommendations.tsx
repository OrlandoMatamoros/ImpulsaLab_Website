'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/index';
import { TrendingUp, Clock, Target, AlertCircle, CheckCircle, ArrowRight, Loader2, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface RecommendationProps {
  scores: {
    finance: number;
    operations: number;
    marketing: number;
  };
  clientInfo: any;
  responses?: any[];
}

export function ProfessionalRecommendations({ scores, clientInfo, responses = [] }: RecommendationProps) {
  const { t } = useLanguage();
  const tp = t.professionalRecommendations;
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    generateAIRecommendations();
  }, [scores, clientInfo]);

  const generateAIRecommendations = async () => {
    if (retryCount >= maxRetries) {
      setDefaultRecommendations();
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log('=== INICIANDO GENERACIÓN DE RECOMENDACIONES ===');
      console.log('Scores:', scores);
      console.log('Client Info:', clientInfo);

      const response = await fetch('/api/ai/generate-recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scores,
          clientInfo,
          responses
        }),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (data.success) {
        setRecommendations(data.recommendations);
      } else {
        setError(tp.errorGenerar);
        console.error('Error en la respuesta:', data.error);
        setDefaultRecommendations();
      }
    } catch (err) {
      console.error('Error en catch:', err);
      setRetryCount(prev => prev + 1);
      setTimeout(() => {
        generateAIRecommendations();
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const setDefaultRecommendations = () => {
    const weakestAxis = Object.entries(scores).reduce((min, [key, value]) => 
      value < min.value ? { key, value } : min, 
      { key: 'finance', value: scores.finance }
    );

    const axisLabel = tp.axisLabels[weakestAxis.key as keyof typeof tp.axisLabels];
    setRecommendations({
      primaryRecommendation: {
        title: `${tp.defaults.titlePrefix} ${axisLabel}`,
        why: tp.defaults.why,
        impact: tp.defaults.impact,
        actions: tp.defaults.actions,
        timeline: tp.defaults.timeline,
        tools: tp.defaults.tools,
        quickWin: tp.defaults.quickWin,
      },
      roadmap90Days: tp.defaults.roadmap,
    });
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (loading) {
    return (
      <Card className="border-2 border-blue-200">
        <CardContent className="py-8 sm:py-12">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-blue-600" />
            <p className="text-base sm:text-lg font-medium text-center">{tp.loadingTitle}</p>
            <p className="text-xs sm:text-sm text-gray-600">{tp.loadingSubtitle}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!recommendations) {
    return null;
  }

  const { primaryRecommendation, secondaryRecommendations, roadmap90Days, warningMessage, successMetrics } = recommendations;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Recomendación Principal con IA - Responsive */}
      <Card className="border-2 border-blue-200 shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              <span className="text-responsive-lg">{tp.mainTitle}</span>
            </CardTitle>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full whitespace-nowrap">
              {error ? tp.badgeStandard : tp.badgeAI}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mt-2">{primaryRecommendation.title}</h3>
        </CardHeader>
        
        <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Quick Win - Responsive */}
          {primaryRecommendation.quickWin && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 flex gap-2 sm:gap-3">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <h4 className="font-semibold text-yellow-900 text-sm sm:text-base mb-1">{tp.quickWinTitle}</h4>
                <p className="text-yellow-800 text-xs sm:text-sm break-words">{primaryRecommendation.quickWin}</p>
              </div>
            </div>
          )}

          {/* Secciones colapsables en móvil */}
          {/* Por qué es crítico */}
          <div className="border-b sm:border-0 pb-4 sm:pb-0">
            <button
              onClick={() => toggleSection('why')}
              className="flex items-center justify-between w-full sm:cursor-default"
            >
              <div className="flex gap-3 sm:gap-4 items-start">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mt-1 flex-shrink-0" />
                <h4 className="font-semibold text-base sm:text-lg text-left">{tp.whyTitle}</h4>
              </div>
              <div className="sm:hidden">
                {expandedSections.why ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>
            <div className={`mt-2 sm:mt-1 pl-7 sm:pl-9 ${!expandedSections.why && 'hidden sm:block'}`}>
              <p className="text-gray-700 text-sm sm:text-base">{primaryRecommendation.why}</p>
            </div>
          </div>

          {/* Impacto esperado */}
          <div className="border-b sm:border-0 pb-4 sm:pb-0">
            <button
              onClick={() => toggleSection('impact')}
              className="flex items-center justify-between w-full sm:cursor-default"
            >
              <div className="flex gap-3 sm:gap-4 items-start">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-1 flex-shrink-0" />
                <h4 className="font-semibold text-base sm:text-lg text-left">{tp.impactTitle}</h4>
              </div>
              <div className="sm:hidden">
                {expandedSections.impact ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>
            <div className={`mt-2 sm:mt-1 pl-7 sm:pl-9 ${!expandedSections.impact && 'hidden sm:block'}`}>
              <p className="text-gray-700 text-sm sm:text-base">{primaryRecommendation.impact}</p>
            </div>
          </div>

          {/* Plan de acción - Siempre visible */}
          <div className="flex gap-3 sm:gap-4">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold text-base sm:text-lg mb-3">{tp.actionPlanTitle}</h4>
              <ol className="space-y-2">
                {primaryRecommendation.actions.map((action: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="bg-blue-100 text-blue-700 rounded-full w-5 h-5 sm:w-6 sm:h-6 
                                   flex items-center justify-center text-xs sm:text-sm font-semibold flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 text-sm sm:text-base">{action}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Timeline y herramientas - Responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4 border-t">
            <div className="flex gap-3 sm:gap-4">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-sm sm:text-base mb-1">{tp.timelineTitle}</h4>
                <p className="text-gray-700 text-sm">{primaryRecommendation.timeline}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base mb-2">{tp.toolsTitle}</h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {primaryRecommendation.tools.map((tool: string, index: number) => (
                  <span key={index} className="bg-gray-100 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advertencia si existe - Responsive */}
      {warningMessage && (
        <Card className="border-2 border-red-200 bg-red-50">
          <CardContent className="py-3 sm:py-4">
            <div className="flex gap-2 sm:gap-3">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
              <div className="min-w-0">
                <h4 className="font-semibold text-red-900 text-sm sm:text-base mb-1">⚠️ {tp.warningTitle}</h4>
                <p className="text-red-800 text-xs sm:text-sm break-words">{warningMessage}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Roadmap de 90 días - Responsive */}
      <Card className="overflow-hidden">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">{tp.roadmapTitle}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-4 sm:space-y-6">
            {roadmap90Days.map((phase: any, index: number) => (
              <div key={index} className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                <div className={`${
                  index === 0 ? 'bg-blue-600' : 
                  index === 1 ? 'bg-purple-600' : 
                  'bg-green-600'
                } text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 
                  flex items-center justify-center font-bold flex-shrink-0 text-sm sm:text-base`}>
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm sm:text-base">{phase.phase}: {phase.focus}</h4>
                  <ul className="text-xs sm:text-sm text-gray-600 mt-1 space-y-0.5 sm:space-y-1">
                    {phase.keyActions.map((action: string, i: number) => (
                      <li key={i}>• {action}</li>
                    ))}
                  </ul>
                  <p className="text-xs sm:text-sm font-medium text-green-700 mt-2">
                    {tp.expectedOutcome} {phase.expectedOutcome}
                  </p>
                </div>
                <div className="hidden sm:block">
                  {index < roadmap90Days.length - 1 ? (
                    <ArrowRight className="w-5 h-5 text-gray-400 mt-2" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-500 mt-2" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Métricas de éxito - Responsive */}
      {successMetrics && successMetrics.length > 0 && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">📊 {tp.metricsTitle}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {successMetrics.map((metric: string, index: number) => (
                <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-xs sm:text-sm font-medium text-gray-700">{metric}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recomendaciones secundarias - Responsive grid */}
      {secondaryRecommendations && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {Object.entries(secondaryRecommendations).map(([axis, rec]: [string, any]) => (
            <Card key={axis} className="border-gray-200 overflow-hidden">
              <CardHeader className={`${
                axis === 'finance' ? 'bg-blue-50' :
                axis === 'operations' ? 'bg-green-50' :
                'bg-purple-50'
              } py-3 sm:py-4 px-4`}>
                <CardTitle className="text-sm sm:text-base">
                  {axis === 'finance' ? '💰' : axis === 'operations' ? '⚙️' : '📈'}{' '}
                  {tp.axisLabels[axis as keyof typeof tp.axisLabels]}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-3 sm:pt-4 px-4">
                <h4 className="font-semibold text-xs sm:text-sm mb-2">{rec.title}</h4>
                <p className="text-xs text-gray-600 mb-2">{rec.action}</p>
                <p className="text-xs font-medium text-green-700">→ {rec.impact}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Debug info - eliminar en producción */}
      {error && (
        <div className="text-xs text-gray-500 text-center mt-4">
          {tp.errorNote} {error}
        </div>
      )}
    </div>
  );
}