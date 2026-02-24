'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/index';
import { Progress } from '@/components/ui/index';
import { selectAdaptiveQuestions } from '../lib/questions-data';
import { ChevronLeft, ChevronRight, Info, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AdaptiveQuestionsProps {
  axis: 'finance' | 'operations' | 'marketing';
  onComplete: (score: number, responses?: any[]) => void;
  initialScore?: number;
}

export function AdaptiveQuestions({ axis, onComplete, initialScore = 50 }: AdaptiveQuestionsProps) {
  const { t } = useLanguage();
  const tp = t.adaptiveQuestions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [previousAxis, setPreviousAxis] = useState(axis);

  useEffect(() => {
    // Detectar cambio de eje
    if (axis !== previousAxis) {
      // RESETEAR TODO cuando cambia el eje
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setAnswers({}); // Limpiar respuestas anteriores del eje anterior
      setPreviousAxis(axis);
    }
    
    // Cargar preguntas basadas en el eje y el score inicial
    const axisTranslations = t.questionsData?.[axis];
    const loadedQuestions = selectAdaptiveQuestions(axis, initialScore, 5, axisTranslations);
    setQuestions(loadedQuestions);
  }, [axis, initialScore, previousAxis, t]);

  const handleAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Si no hay opción seleccionada para preguntas de multiple choice
    if (currentQuestion.type === 'multiple-choice' && !selectedOption) {
      return; // No hacer nada si no hay selección
    }

    // Obtener el score basado en la opción seleccionada
    let score = 50; // Default para slider
    if (currentQuestion.type === 'multiple-choice' && selectedOption) {
      const option = currentQuestion.options.find((opt: any) => opt.value === selectedOption);
      score = option ? option.score : 50;
    } else if (currentQuestion.type !== 'multiple-choice') {
      // Para preguntas tipo slider (si las hay en el futuro)
      score = answers[currentQuestion.id] || 50;
    }

    // Guardar respuesta
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: score
    }));

    // Avanzar o completar
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null); // Reset selection for next question
    } else {
      // Calcular score final con ponderación
      const allAnswers = { ...answers, [currentQuestion.id]: score };
      calculateFinalScore(allAnswers);
    }
  };

  const calculateFinalScore = (allAnswers: { [key: string]: number }) => {
    // Calcular score ponderado basado en el weight de cada pregunta
    let totalWeight = 0;
    let weightedSum = 0;
    const detailedResponses: any[] = [];

    questions.forEach(question => {
      const answerScore = allAnswers[question.id] || 50;
      const weight = question.weight || 1;
      weightedSum += answerScore * weight;
      totalWeight += weight;
      
      // Guardar respuesta detallada
      detailedResponses.push({
        questionId: question.id,
        question: question.text || question.question,
        score: answerScore,
        weight: weight,
        category: question.category,
        axis: axis
      });
    });

    const finalScore = totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 50;
    
    // Pasar tanto el score como las respuestas detalladas
    onComplete(finalScore, detailedResponses);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      // Cargar la opción previamente seleccionada si existe
      const prevQuestion = questions[currentQuestionIndex - 1];
      if (prevQuestion.type === 'multiple-choice') {
        const prevAnswer = answers[prevQuestion.id];
        if (prevAnswer) {
          const option = prevQuestion.options.find((opt: any) => opt.score === prevAnswer);
          setSelectedOption(option?.value || null);
        }
      }
    }
  };

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{tp.cargando}</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const hasAnswer = currentQuestion.type === 'multiple-choice' ? selectedOption !== null : true;

  const axisIcons = { finance: '💰', operations: '⚙️', marketing: '📈' };
  const currentAxisInfo = {
    icon: axisIcons[axis],
    title: tp.axisInfo[axis].title,
    description: tp.axisInfo[axis].description,
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      {/* Header con título del eje */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <span className="text-3xl">{currentAxisInfo.icon}</span>
          {currentAxisInfo.title}
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          {currentAxisInfo.description}
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
          <span>{tp.pregunta} {currentQuestionIndex + 1} {tp.de} {questions.length}</span>
          <span>{Math.round(progress)}% {tp.completado}</span>
        </div>
        <Progress value={progress} className="h-2 sm:h-3" />
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-6">
        {/* Category Badge */}
        {currentQuestion?.category && (
          <div className="mb-4">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              ${currentQuestion.category === 'critical' ? 'bg-red-100 text-red-800' : 
                currentQuestion.category === 'important' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-blue-100 text-blue-800'}`}>
              {currentQuestion.category === 'critical' ? `🔴 ${tp.categoryLabels.critical}` :
               currentQuestion.category === 'important' ? `🟡 ${tp.categoryLabels.important}` :
               `🔵 ${tp.categoryLabels.relevant}`}
            </span>
          </div>
        )}

        {/* Question */}
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
            {currentQuestion?.text || currentQuestion?.question}
          </h3>
          
          {(currentQuestion?.helpText || currentQuestion?.description) && (
            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700">
                {currentQuestion.helpText || currentQuestion.description}
              </p>
            </div>
          )}
        </div>

        {/* Response Options */}
        {currentQuestion?.type === 'multiple-choice' && currentQuestion?.options ? (
          <div className="space-y-3">
            {currentQuestion.options.map((option: any) => (
              <button
                key={option.value}
                onClick={() => setSelectedOption(option.value)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200
                  ${selectedOption === option.value 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center
                      ${selectedOption === option.value 
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-gray-300'}`}>
                      {selectedOption === option.value && (
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{option.label}</p>
                      {/* Mostrar score como indicador visual */}
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-20 bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-1.5 rounded-full"
                            style={{ width: `${option.score}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{option.score}pts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          // Fallback para preguntas tipo slider (si las hay)
          <div className="space-y-6">
            <div className="px-2">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{tp.sliderDesacuerdo}</span>
                <span>{tp.sliderAcuerdo}</span>
              </div>
              
              <input
                type="range"
                min="0"
                max="100"
                step="10"
                value={answers[currentQuestion?.id] || 50}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setAnswers(prev => ({
                    ...prev,
                    [currentQuestion.id]: value
                  }));
                }}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              
              <div className="flex justify-between mt-2">
                {[0, 25, 50, 75, 100].map((val) => (
                  <span key={val} className="text-xs text-gray-500">{val}</span>
                ))}
              </div>
            </div>

            <div className="text-center py-4 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600">
                {answers[currentQuestion?.id] || 50}
              </p>
              <p className="text-sm text-gray-600 mt-1">{tp.puntuacionActual}</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">{tp.anterior}</span>
        </Button>

        <span className="text-sm text-gray-500">
          {currentQuestionIndex + 1} / {questions.length}
        </span>

        <Button
          onClick={handleAnswer}
          disabled={!hasAnswer}
          className="flex items-center gap-2"
        >
          <span className="hidden sm:inline">
            {currentQuestionIndex === questions.length - 1 ? tp.completar : tp.siguiente}
          </span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Helper text */}
      {currentQuestion?.type === 'multiple-choice' && !selectedOption && (
        <p className="text-center text-sm text-gray-500 mt-4">
          {tp.seleccionaOpcion}
        </p>
      )}
    </div>
  );
}