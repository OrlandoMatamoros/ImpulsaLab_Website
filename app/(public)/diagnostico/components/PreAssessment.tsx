'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/index';
import { useLanguage } from '@/contexts/LanguageContext';

interface PreAssessmentProps {
  onComplete: (scores: { finance: number; operations: number; marketing: number }) => void;
}

export function PreAssessment({ onComplete }: PreAssessmentProps) {
  const { t } = useLanguage();
  const tp = t.preAssessment;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({
    finance: 0,
    operations: 0,
    marketing: 0
  });

  const icons = ['💰', '⚙️', '📈'];
  const ids = ['finance', 'operations', 'marketing'] as const;
  const values = [20, 50, 80];

  const questions = tp.questions.map((q: any, i: number) => ({
    id: ids[i],
    title: `${icons[i]} ${q.title}`,
    question: q.question,
    options: q.options.map((label: string, j: number) => ({
      label,
      value: values[j],
    })),
  }));

  const handleAnswer = (value: number) => {
    const question = questions[currentQuestion];
    setAnswers(prev => ({
      ...prev,
      [question.id]: value
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Completar evaluación
      onComplete({
        finance: answers.finance || value,
        operations: currentQuestion === 1 ? value : answers.operations,
        marketing: currentQuestion === 2 ? value : answers.marketing
      });
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto px-4">
      {/* Progress Bar - Mobile Optimized */}
      <div className="mb-6 sm:mb-8">
        <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
          <span>{tp.pregunta} {currentQuestion + 1} {tp.de} {questions.length}</span>
          <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
          <div 
            className="bg-blue-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card - Responsive */}
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{currentQ.title}</div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 px-2">
            {currentQ.question}
          </h3>
        </div>

        {/* Options - Touch Friendly */}
        <div className="space-y-3 sm:space-y-4">
          {currentQ.options.map((option: { label: string; value: number }) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className="w-full text-left p-4 sm:p-5 lg:p-6 border-2 rounded-lg hover:border-blue-500 
                       hover:bg-blue-50 transition-all duration-200 group
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                       active:scale-98 min-h-[60px] sm:min-h-[70px]"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-3">
                  <p className="text-sm sm:text-base lg:text-lg font-medium text-gray-900 
                             group-hover:text-blue-700 leading-relaxed">
                    {option.label}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-gray-300 rounded-full 
                                group-hover:border-blue-500 flex items-center justify-center">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full opacity-0 
                                  group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Navigation - Mobile Optimized */}
        {currentQuestion > 0 && (
          <div className="mt-6 sm:mt-8 flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(prev => prev - 1)}
              className="text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
            >
              {tp.anterior}
            </Button>
            <span className="text-xs sm:text-sm text-gray-500">
              {currentQuestion + 1}/{questions.length}
            </span>
          </div>
        )}
      </div>

      {/* Mobile Indicator */}
      <div className="mt-4 sm:mt-6 flex justify-center sm:hidden">
        <div className="flex space-x-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                index <= currentQuestion ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}