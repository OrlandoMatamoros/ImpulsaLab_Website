// ============================================
// IMPULSA LAB - PERSISTENCE HOOK
// ============================================

import { useEffect, useCallback } from 'react';
import { useDiagnosticStore } from '../store/diagnosticStore';
import {
  saveDiagnosticProgress,
  saveResultLocally,
  clearAllLocalData,
} from '../services/storage';

/**
 * Hook to handle automatic persistence of diagnostic progress
 */
export const usePersistence = () => {
  const leadData = useDiagnosticStore(state => state.leadData);
  const answers = useDiagnosticStore(state => state.answers);
  const currentIndex = useDiagnosticStore(state => state.currentQuestionIndex);
  const result = useDiagnosticStore(state => state.result);

  // Auto-save progress when answers or index change
  useEffect(() => {
    if (leadData && answers.length > 0) {
      saveDiagnosticProgress(leadData, answers, currentIndex);
    }
  }, [answers, currentIndex, leadData]);

  // Save result when it's set
  useEffect(() => {
    if (result) {
      saveResultLocally(result);
    }
  }, [result]);

  // Clear all saved data
  const clearSavedData = useCallback(async () => {
    await clearAllLocalData();
  }, []);

  return { clearSavedData };
};

export default usePersistence;
