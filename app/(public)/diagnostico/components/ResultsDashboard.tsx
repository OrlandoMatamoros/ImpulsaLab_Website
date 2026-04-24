
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/index';
import { Button } from '@/components/ui/button';
import { TrendingUp, Download, Calendar, ArrowRight, Share2, Award, Target, AlertTriangle, CheckCircle, Clock, DollarSign, FileText, Lock, Users, Building2 } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { ProfessionalRecommendations } from './ProfessionalRecommendations';
import Link from 'next/link';
import { PDFGenerator } from './pdf/PDFGenerator';
import { useAuth } from '@/contexts/FirebaseAuthContext';
import {
  getIndustryComparison,
  getIndustryRecommendations,
  getStrengthAreas,
  getImprovementAreas,
  getIndustryDescription,
  getBenchmarkThreshold,
  type IndustryType
} from '@/lib/industry-benchmarks';
import {
  getCompanySizeProfile,
  getSizeSpecificRecommendations,
  getGrowthStageMessage,
  compareToMaturityLevel,
  getPriorityActions,
  getSizeBenchmarkMessage
} from '@/lib/company-size';
import { useLanguage } from '@/contexts/LanguageContext';

interface ResultsDashboardProps {
  scores: {
    finance: number;
    operations: number;
    marketing: number;
  };
  responses: any[];
  clientInfo: any;
  onScheduleConsultation: () => void;
  isInternalMode?: boolean;
}

export function ResultsDashboard({ 
  scores: rawScores, 
  responses, 
  clientInfo, 
  onScheduleConsultation,
  isInternalMode = false
}: ResultsDashboardProps) {
  const { t } = useLanguage();
  const tp = t.resultsDashboard;
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [recommendations, setRecommendations] = useState<any>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  
  // Referencias para los gráficos
  const radarChartRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const barChartRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  
  // Obtener usuario actual
  const { userData } = useAuth();
  
  // Debug info
  console.log('ClientInfo en ResultsDashboard:', clientInfo);
  console.log('User Role:', userData?.role);
  
  // Aplicar ponderaciones finales
  const finalScores = {
    finance: Math.round(rawScores.finance),
    operations: Math.round(rawScores.operations),
    marketing: Math.round(rawScores.marketing)
  };

  const averageScore = Math.round((finalScores.finance + finalScores.operations + finalScores.marketing) / 3);

  // Obtener datos de industria y tamaño de empresa
  const industryName = (clientInfo?.industry || 'Otro') as IndustryType;
  const employeeCount = clientInfo?.employeeCount || 0;

  // Obtener benchmarks de la industria usando helper
  const benchmarks = {
    finance: getBenchmarkThreshold('finance', industryName, 'average'),
    operations: getBenchmarkThreshold('operations', industryName, 'average'),
    marketing: getBenchmarkThreshold('marketing', industryName, 'average')
  };

  // Obtener perfil de tamaño de empresa
  const companyProfile = employeeCount > 0 ? getCompanySizeProfile(employeeCount) : null;

  // Obtener comparaciones de industria
  const industryComparisons = {
    finance: getIndustryComparison(finalScores.finance, 'finance', industryName),
    operations: getIndustryComparison(finalScores.operations, 'operations', industryName),
    marketing: getIndustryComparison(finalScores.marketing, 'marketing', industryName)
  };

  // Obtener recomendaciones específicas de industria y tamaño
  const industryRecs = getIndustryRecommendations(finalScores, industryName);
  const sizeRecs = employeeCount > 0 ? getSizeSpecificRecommendations(employeeCount, finalScores) : [];
  const priorityActions = employeeCount > 0 ? getPriorityActions(employeeCount, finalScores) : [];

  // Obtener áreas de fortaleza y mejora
  const strengthAreas = getStrengthAreas(finalScores, industryName);
  const improvementAreas = getImprovementAreas(finalScores, industryName);

  // Determinar el estado general
  const getBusinessStage = (avg: number) => {
    if (avg >= 70) return { stage: tp.stages.expansion.stage, color: 'text-green-600', bg: 'bg-green-50 border-green-200', description: tp.stages.expansion.description };
    if (avg >= 40) return { stage: tp.stages.growth.stage, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200', description: tp.stages.growth.description };
    return { stage: tp.stages.survival.stage, color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200', description: tp.stages.survival.description };
  };

  const businessStage = getBusinessStage(averageScore);

  // Datos para el gráfico de radar
  const radarData = [
    { axis: tp.axisLabels.finance, value: finalScores.finance, fullMark: 100 },
    { axis: tp.axisLabels.operations, value: finalScores.operations, fullMark: 100 },
    { axis: tp.axisLabels.marketing, value: finalScores.marketing, fullMark: 100 },
  ];

  // Datos para el gráfico de barras con benchmarks reales
  const barData = [
    { name: tp.axisLabels.finance, score: finalScores.finance, benchmark: benchmarks.finance, color: '#3B82F6' },
    { name: tp.axisLabels.operations, score: finalScores.operations, benchmark: benchmarks.operations, color: '#10B981' },
    { name: tp.axisLabels.marketing, score: finalScores.marketing, benchmark: benchmarks.marketing, color: '#8B5CF6' }
  ];

  // Identificar fortalezas y debilidades
  const weakestAxis = Object.entries(finalScores).reduce((min, [key, value]) => 
    value < min.value ? { key, value } : min, 
    { key: 'finance', value: finalScores.finance }
  );

  const strongestAxis = Object.entries(finalScores).reduce((max, [key, value]) => 
    value > max.value ? { key, value } : max, 
    { key: 'finance', value: finalScores.finance }
  );

  // Calcular el potencial de mejora
  const improvementPotential = {
    finance: 100 - finalScores.finance,
    operations: 100 - finalScores.operations,
    marketing: 100 - finalScores.marketing
  };

  const totalImprovementPotential = improvementPotential.finance + improvementPotential.operations + improvementPotential.marketing;

  // Cargar recomendaciones de IA al montar el componente
  useEffect(() => {
    const fetchAIRecommendations = async () => {
      setLoadingAI(true);
      try {
        const response = await fetch('/api/ai/generate-recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            scores: finalScores,
            clientInfo,
            responses
          })
        });

        const data = await response.json();
        if (data.success) {
          setRecommendations(data.recommendations);
        }
      } catch (error) {
        console.error('Error fetching AI recommendations:', error);
      } finally {
        setLoadingAI(false);
      }
    };

    fetchAIRecommendations();
  }, []);

  // RETURN PRINCIPAL DEL COMPONENTE
  return (
    <div className="space-y-8 animate-fadeIn pb-20 md:pb-8">
      {/* Header mejorado sin scroll horizontal */}
      <div className="relative overflow-hidden rounded-xl p-4 md:p-6 border-2 border-gray-200 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-500/20 to-blue-500/30"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="w-full md:w-auto">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg">
                {tp.headerTitle}
              </h2>
              <p className="text-white/90 text-sm md:text-base mt-1">
                {clientInfo?.companyName || clientInfo?.name || tp.defaultCompany} • {new Date().toLocaleDateString()}
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs md:text-sm font-semibold border border-white/30 mt-2">
                <Award className="w-4 h-4" />
                <span className="truncate">{businessStage.stage}: {businessStage.description}</span>
              </div>
            </div>
            <div className="text-left md:text-right">
              <div className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
                {averageScore}
              </div>
              <div className="text-xs md:text-sm text-white/80 uppercase tracking-wider">{tp.globalScore}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Profile & Industry Context */}
      {companyProfile && (
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Size Profile */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{tp.companyProfileTitle}</h3>
                    <p className="text-sm text-gray-600">{tp.companyProfileSubtitle}</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{tp.clasificacion}</span>
                    <span className="font-bold text-blue-600">{companyProfile.icon} {companyProfile.label}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{tp.empleados}</span>
                    <span className="font-semibold text-gray-800">{employeeCount} ({companyProfile.employeeRange})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{tp.industria}</span>
                    <span className="font-semibold text-gray-800">{industryName}</span>
                  </div>
                </div>
                <div className="bg-blue-100 rounded-lg p-3">
                  <p className="text-sm text-blue-900">{getGrowthStageMessage(employeeCount)}</p>
                </div>
              </div>

              {/* Priority Actions */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{tp.priorityTitle}</h3>
                    <p className="text-sm text-gray-600">{tp.prioritySubtitle}</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 space-y-3">
                  {priorityActions.slice(0, 3).map((action, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`mt-0.5 px-2 py-0.5 rounded text-xs font-bold ${
                        action.priority === 'alta' ? 'bg-red-100 text-red-700' :
                        action.priority === 'media' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {action.priority.toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-500 font-semibold">{action.axis}</div>
                        <div className="text-sm text-gray-700">{action.action}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-purple-100 rounded-lg p-3">
                  <p className="text-xs text-purple-900 font-semibold">
                    {getSizeBenchmarkMessage(employeeCount, averageScore)}
                  </p>
                </div>
              </div>
            </div>

            {/* Strengths & Improvement Areas */}
            {(strengthAreas.length > 0 || improvementAreas.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-blue-200">
                {strengthAreas.length > 0 && (
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      {tp.strengthsTitle} {industryName}
                    </h4>
                    <div className="space-y-1">
                      {strengthAreas.map((area, idx) => (
                        <div key={idx} className="text-sm text-green-700">{area}</div>
                      ))}
                    </div>
                  </div>
                )}
                {improvementAreas.length > 0 && (
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      {tp.improvementTitle}
                    </h4>
                    <div className="space-y-1">
                      {improvementAreas.map((area, idx) => (
                        <div key={idx} className="text-sm text-orange-700">{area}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Tabs de navegación mejorados para móvil */}
      <div className="flex gap-1 md:gap-2 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3 py-2 font-medium transition-colors whitespace-nowrap text-sm md:text-base ${
            activeTab === 'overview' 
              ? 'border-b-2 border-blue-600 text-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {tp.tabOverview}
        </button>
        <button
          onClick={() => setActiveTab('details')}
          className={`px-3 py-2 font-medium transition-colors whitespace-nowrap text-sm md:text-base ${
            activeTab === 'details'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {tp.tabDetails}
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`px-3 py-2 font-medium transition-colors whitespace-nowrap text-sm md:text-base ${
            activeTab === 'recommendations'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {tp.tabRecommendations}
        </button>
      </div>

      {/* Contenido según la pestaña activa */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Gráficos principales */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de Radar */}
            <Card className="overflow-hidden border-gray-200">
              <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
                <CardTitle className="text-white text-lg md:text-xl">{tp.radarTitle}</CardTitle>
              </CardHeader>
              <CardContent className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-2 md:p-4">
                <div ref={radarChartRef} className="h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <defs>
                        <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
                          <stop offset="50%" stopColor="#8B5CF6" stopOpacity={0.6} />
                          <stop offset="100%" stopColor="#EC4899" stopOpacity={0.4} />
                        </linearGradient>
                      </defs>
                      <PolarGrid 
                        gridType="polygon" 
                        radialLines={true}
                        stroke="#9333ea"
                        strokeOpacity={0.3}
                      />
                      <PolarAngleAxis 
                        dataKey="axis" 
                        tick={{ fill: '#1e293b', fontSize: 12, fontWeight: 600 }}
                      />
                      <PolarRadiusAxis 
                        domain={[0, 100]} 
                        tick={{ fill: '#475569', fontSize: 10 }}
                        tickCount={6}
                      />
                      <Radar
                        name={tp.radarName} 
                        dataKey="value" 
                        stroke="#7c3aed" 
                        fill="url(#radarGradient)" 
                        strokeWidth={3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-2 md:gap-4 text-center p-2 md:p-4 bg-white/70 rounded-lg">
                  <div>
                    <div className="text-xl md:text-3xl font-bold text-blue-600">{finalScores.finance}</div>
                    <div className="text-xs md:text-sm text-gray-700 font-medium">{tp.axisLabels.finance}</div>
                  </div>
                  <div>
                    <div className="text-xl md:text-3xl font-bold text-green-600">{finalScores.operations}</div>
                    <div className="text-xs md:text-sm text-gray-700 font-medium">{tp.axisLabels.operations}</div>
                  </div>
                  <div>
                    <div className="text-xl md:text-3xl font-bold text-purple-600">{finalScores.marketing}</div>
                    <div className="text-xs md:text-sm text-gray-700 font-medium">{tp.axisLabels.marketing}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comparación con Benchmark */}
            <Card className="border-gray-200">
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-lg md:text-xl text-gray-800">
                  {clientInfo?.companyName || tp.defaultCompany} {tp.vsIndustry} {industryName}
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-white">
                <div ref={barChartRef} className="h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: '#374151', fontSize: 12 }}
                      />
                      <YAxis 
                        domain={[0, 100]} 
                        tick={{ fill: '#374151', fontSize: 12 }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="score" name={clientInfo?.companyName || tp.radarName}>
                        {barData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                      <Bar dataKey="benchmark" name={`${tp.avgPrefix} ${industryName}`} fill="#E5E7EB" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Insights clave mejorados */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-2 border-orange-200 bg-orange-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-base md:text-lg text-gray-800">{tp.criticalArea}</h3>
                </div>
                <p className="text-gray-700 text-sm md:text-base">
                  {tp.weakestMsg} <span className="font-bold text-orange-700">
                    {tp.axisLabels[weakestAxis.key as keyof typeof tp.axisLabels]}
                  </span> {tp.withPoints} {weakestAxis.value} {tp.points}.
                </p>
                <p className="text-xs md:text-sm text-gray-600 mt-2">
                  {benchmarks[weakestAxis.key as keyof typeof benchmarks] - weakestAxis.value} {tp.belowAvg} {industryName}.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Target className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-base md:text-lg text-gray-800">{tp.improvementPotential}</h3>
                </div>
                <p className="text-gray-700 text-sm md:text-base">
                  {tp.improvementHave} <span className="font-bold text-blue-700">{Math.round(totalImprovementPotential/3)}%</span> {tp.improvementMsg}
                </p>
                <p className="text-xs md:text-sm text-gray-600 mt-2">
                  {tp.improvementAdvice}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-base md:text-lg text-gray-800">{tp.strengthCard}</h3>
                </div>
                <p className="text-gray-700 text-sm md:text-base">
                  {tp.strengthMsg} <span className="font-bold text-green-700">
                    {tp.axisLabels[strongestAxis.key as keyof typeof tp.axisLabels]}
                  </span> {tp.withPoints} {strongestAxis.value} {tp.points}.
                </p>
                <p className="text-xs md:text-sm text-gray-600 mt-2">
                  {strongestAxis.value > benchmarks[strongestAxis.key as keyof typeof benchmarks] ?
                    `${strongestAxis.value - benchmarks[strongestAxis.key as keyof typeof benchmarks]} ${tp.aboveAvg}` :
                    tp.solidBase}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'details' && (
        <div className="space-y-6">
          {/* Análisis detallado mejorado */}
          <Card className="border-gray-200">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-xl md:text-2xl text-gray-800">
                {tp.detailsTitle} {industryName}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
              {/* Finanzas */}
              <div className="border-l-4 border-blue-600 pl-4 md:pl-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2 flex items-center gap-2 text-gray-800">
                      <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                      {tp.axisLabels.finance} - {finalScores.finance} {tp.points}
                    </h3>
                    <div className="flex items-center gap-4 text-sm md:text-base">
                      <span className="text-gray-600">{tp.benchmark} {industryName}: {benchmarks.finance}</span>
                      <span className={finalScores.finance >= benchmarks.finance ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                        {finalScores.finance >= benchmarks.finance ? tp.aboveLabel : tp.belowLabel}
                        ({finalScores.finance >= benchmarks.finance ? '+' : ''}{finalScores.finance - benchmarks.finance})
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Industry Comparison */}
                  <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-4 rounded-lg border-2 border-blue-300">
                    <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      {tp.comparisonWith} {industryName}
                    </h4>
                    <p className="text-blue-800 text-sm md:text-base font-medium">
                      {industryComparisons.finance}
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">{tp.diagnostico}</h4>
                    <p className="text-gray-700 text-sm md:text-base">
                      {finalScores.finance >= 80 ?
                        tp.financeDiag.excellent(clientInfo?.companyName || tp.defaultCompany, benchmarks.finance, industryName) :
                        finalScores.finance >= 60 ?
                        tp.financeDiag.good(finalScores.finance, benchmarks.finance) :
                        finalScores.finance >= 40 ?
                        tp.financeDiag.medium(finalScores.finance, industryName, benchmarks.finance) :
                        tp.financeDiag.low(finalScores.finance, benchmarks.finance)
                      }
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">{tp.industryContext}</h4>
                    <p className="text-gray-700 text-sm md:text-base">
                      {(tp.financeContext as any)[industryName] || `En ${industryName}, ${tp.financeContext.default}`}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-blue-800">{tp.roiPotencial}</p>
                      <p className="text-lg md:text-xl font-bold text-blue-900">
                        {finalScores.finance < 60 ? '250-400%' : '150-200%'}
                      </p>
                      <p className="text-xs text-blue-700">{tp.inMonths}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-blue-800">{tp.implTime}</p>
                      <p className="text-lg md:text-xl font-bold text-blue-900">
                        {finalScores.finance < 60 ? '30-45' : '15-30'} {tp.days}
                      </p>
                      <p className="text-xs text-blue-700">{tp.toSeeResults}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Operaciones */}
              <div className="border-l-4 border-green-600 pl-4 md:pl-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2 flex items-center gap-2 text-gray-800">
                      <Clock className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                      {tp.axisLabels.operations} - {finalScores.operations} {tp.points}
                    </h3>
                    <div className="flex items-center gap-4 text-sm md:text-base">
                      <span className="text-gray-600">{tp.benchmark} {industryName}: {benchmarks.operations}</span>
                      <span className={finalScores.operations >= benchmarks.operations ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                        {finalScores.operations >= benchmarks.operations ? tp.aboveLabel : tp.belowLabel}
                        ({finalScores.operations >= benchmarks.operations ? '+' : ''}{finalScores.operations - benchmarks.operations})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Industry Comparison */}
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-lg border-2 border-green-300">
                    <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      {tp.comparisonWith} {industryName}
                    </h4>
                    <p className="text-green-800 text-sm md:text-base font-medium">
                      {industryComparisons.operations}
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">{tp.diagnostico}</h4>
                    <p className="text-gray-700 text-sm md:text-base">
                      {finalScores.operations >= 80 ?
                        tp.opsDiag.excellent(finalScores.operations, benchmarks.operations, industryName) :
                        finalScores.operations >= 60 ?
                        tp.opsDiag.good(finalScores.operations, benchmarks.operations) :
                        finalScores.operations >= 40 ?
                        tp.opsDiag.medium(finalScores.operations, benchmarks.operations, industryName) :
                        tp.opsDiag.low(finalScores.operations, benchmarks.operations)
                      }
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">{tp.bestPractices} {industryName}:</h4>
                    <p className="text-gray-700 text-sm md:text-base">
                      {(tp.opsContext as any)[industryName] || `En ${industryName}, ${tp.opsContext.default}`}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-green-800">{tp.savingPotential}</p>
                      <p className="text-lg md:text-xl font-bold text-green-900">
                        {finalScores.operations < 60 ? '20-30' : '10-15'} {tp.hrsWeek}
                      </p>
                      <p className="text-xs text-green-700">{tp.inManualTasks}</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-green-800">{tp.capacityIncrease}</p>
                      <p className="text-lg md:text-xl font-bold text-green-900">
                        {finalScores.operations < 60 ? '2-3X' : '1.5-2X'}
                      </p>
                      <p className="text-xs text-green-700">{tp.noMoreHiring}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Marketing */}
              <div className="border-l-4 border-purple-600 pl-4 md:pl-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2 flex items-center gap-2 text-gray-800">
                      <Target className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                      {tp.axisLabels.marketing} - {finalScores.marketing} {tp.points}
                    </h3>
                    <div className="flex items-center gap-4 text-sm md:text-base">
                      <span className="text-gray-600">{tp.benchmark} {industryName}: {benchmarks.marketing}</span>
                      <span className={finalScores.marketing >= benchmarks.marketing ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                        {finalScores.marketing >= benchmarks.marketing ? tp.aboveLabel : tp.belowLabel}
                        ({finalScores.marketing >= benchmarks.marketing ? '+' : ''}{finalScores.marketing - benchmarks.marketing})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Industry Comparison */}
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg border-2 border-purple-300">
                    <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      {tp.comparisonWith} {industryName}
                    </h4>
                    <p className="text-purple-800 text-sm md:text-base font-medium">
                      {industryComparisons.marketing}
                    </p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">{tp.diagnostico}</h4>
                    <p className="text-gray-700 text-sm md:text-base">
                      {finalScores.marketing >= 80 ?
                        tp.mktDiag.excellent(finalScores.marketing, benchmarks.marketing, industryName) :
                        finalScores.marketing >= 60 ?
                        tp.mktDiag.good(finalScores.marketing, benchmarks.marketing) :
                        finalScores.marketing >= 40 ?
                        tp.mktDiag.medium(finalScores.marketing, benchmarks.marketing, industryName) :
                        tp.mktDiag.low(finalScores.marketing, benchmarks.marketing)
                      }
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">{tp.trends} {industryName}:</h4>
                    <p className="text-gray-700 text-sm md:text-base">
                      {(tp.mktContext as any)[industryName] || `En ${industryName}, ${tp.mktContext.default}`}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-purple-800">{tp.leadsIncrease}</p>
                      <p className="text-lg md:text-xl font-bold text-purple-900">
                        {finalScores.marketing < 60 ? '3-5X' : '2-3X'}
                      </p>
                      <p className="text-xs text-purple-700">{tp.inSixMonths}</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-purple-800">{tp.cacReduction}</p>
                      <p className="text-lg md:text-xl font-bold text-purple-900">
                        {finalScores.marketing < 60 ? '40-60%' : '20-30%'}
                      </p>
                      <p className="text-xs text-purple-700">{tp.withAutomation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'recommendations' && (
        <div className="space-y-6">
          {/* Mostrar loading mientras carga IA */}
          {loadingAI ? (
            <Card className="border-gray-200">
              <CardContent className="py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">{tp.aiLoading}</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <ProfessionalRecommendations 
              scores={finalScores} 
              clientInfo={clientInfo}
              responses={responses}
            />
          )}
        </div>
      )}

      {/* Call to Action mejorado con PDFGenerator integrado */}
      <Card className="relative overflow-hidden border-2 border-gray-200">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        <CardContent className="relative z-10 py-6 md:py-8">
          <div className="text-center space-y-4">
            <h3 className="text-xl md:text-2xl font-bold text-white">
              {tp.ctaTitle}
            </h3>
            <p className="text-blue-100 max-w-2xl mx-auto text-sm md:text-base px-4">
              {userData?.role === 'client' || userData?.role === 'consultant' || userData?.role === 'admin' ?
                tp.ctaDescPremium : tp.ctaDescPublic
              }
            </p>
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center pt-2 md:pt-4 px-4">
              <Link 
                href="https://calendly.com/orlando-tuimpulsalab/30min"
                target="_blank"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-lg 
                         font-semibold text-base md:text-lg transition-all duration-300 
                         hover:scale-105 hover:bg-gray-100 hover:shadow-xl group w-full md:w-auto"
              >
                {tp.ctaButton}
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              {/* Integración del PDFGenerator */}
              <PDFGenerator
                scores={finalScores}
                responses={responses}
                clientInfo={clientInfo}
                aiAnalysis={recommendations}
                chartRefs={{
                  radar: radarChartRef,
                  bar: barChartRef
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}