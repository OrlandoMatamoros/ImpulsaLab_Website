// ============================================
// IMPULSA LAB - ZUSTAND STORE
// ============================================

import { create } from 'zustand';
import { Answer, DiagnosticResult, LeadData } from '../types';

interface DiagnosticState {
  // Lead data
  leadData: LeadData | null;
  setLeadData: (data: LeadData) => void;

  // Diagnostic answers
  answers: Answer[];
  addAnswer: (answer: Answer) => void;
  updateAnswer: (questionId: string, answer: Answer) => void;
  clearAnswers: () => void;

  // Current question tracking
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;

  // Results
  result: DiagnosticResult | null;
  setResult: (result: DiagnosticResult) => void;

  // Loading state
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // Complete reset
  resetDiagnostic: () => void;

  // Hydration from AsyncStorage
  hydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
}

const initialState = {
  leadData: null,
  answers: [],
  currentQuestionIndex: 0,
  result: null,
  isLoading: false,
  hydrated: false,
};

export const useDiagnosticStore = create<DiagnosticState>((set, get) => ({
  ...initialState,

  setLeadData: (data: LeadData) => set({ leadData: data }),

  addAnswer: (answer: Answer) =>
    set(state => {
      // Check if answer for this question already exists
      const existingIndex = state.answers.findIndex(
        a => a.questionId === answer.questionId
      );

      if (existingIndex >= 0) {
        // Update existing answer
        const newAnswers = [...state.answers];
        newAnswers[existingIndex] = answer;
        return { answers: newAnswers };
      }

      // Add new answer
      return { answers: [...state.answers, answer] };
    }),

  updateAnswer: (questionId: string, answer: Answer) =>
    set(state => ({
      answers: state.answers.map(a =>
        a.questionId === questionId ? answer : a
      ),
    })),

  clearAnswers: () => set({ answers: [], currentQuestionIndex: 0 }),

  currentQuestionIndex: 0,
  setCurrentQuestionIndex: (index: number) => set({ currentQuestionIndex: index }),

  nextQuestion: () =>
    set(state => ({ currentQuestionIndex: state.currentQuestionIndex + 1 })),

  previousQuestion: () =>
    set(state => ({
      currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
    })),

  result: null,
  setResult: (result: DiagnosticResult) => set({ result }),

  isLoading: false,
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),

  resetDiagnostic: () =>
    set({
      ...initialState,
      hydrated: true,
    }),

  hydrated: false,
  setHydrated: (hydrated: boolean) => set({ hydrated }),
}));

// Selectors for better performance
export const selectLeadData = (state: DiagnosticState) => state.leadData;
export const selectAnswers = (state: DiagnosticState) => state.answers;
export const selectCurrentIndex = (state: DiagnosticState) => state.currentQuestionIndex;
export const selectResult = (state: DiagnosticState) => state.result;
export const selectIsLoading = (state: DiagnosticState) => state.isLoading;
