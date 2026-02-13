// ============================================
// IMPULSA LAB - ASYNC STORAGE SERVICE
// ============================================

import AsyncStorage from '@react-native-async-storage/async-storage';
import { LeadData, Answer, DiagnosticResult } from '../types';

// Storage keys
const STORAGE_KEYS = {
  LEAD_DATA: '@impulsalab_lead_data',
  ANSWERS: '@impulsalab_answers',
  CURRENT_INDEX: '@impulsalab_current_index',
  RESULT: '@impulsalab_result',
  LAST_SAVED: '@impulsalab_last_saved',
};

/**
 * Save lead data locally
 */
export const saveLeadDataLocally = async (leadData: LeadData): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.LEAD_DATA, JSON.stringify(leadData));
    await updateLastSaved();
  } catch (error) {
    console.error('Error saving lead data locally:', error);
  }
};

/**
 * Get locally saved lead data
 */
export const getLeadDataLocally = async (): Promise<LeadData | null> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.LEAD_DATA);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting lead data locally:', error);
    return null;
  }
};

/**
 * Save answers locally
 */
export const saveAnswersLocally = async (answers: Answer[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(answers));
    await updateLastSaved();
  } catch (error) {
    console.error('Error saving answers locally:', error);
  }
};

/**
 * Get locally saved answers
 */
export const getAnswersLocally = async (): Promise<Answer[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.ANSWERS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting answers locally:', error);
    return [];
  }
};

/**
 * Save current question index
 */
export const saveCurrentIndexLocally = async (index: number): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_INDEX, index.toString());
    await updateLastSaved();
  } catch (error) {
    console.error('Error saving current index locally:', error);
  }
};

/**
 * Get current question index
 */
export const getCurrentIndexLocally = async (): Promise<number> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_INDEX);
    return data ? parseInt(data, 10) : 0;
  } catch (error) {
    console.error('Error getting current index locally:', error);
    return 0;
  }
};

/**
 * Save diagnostic result locally
 */
export const saveResultLocally = async (result: DiagnosticResult): Promise<void> => {
  try {
    const resultToSave = {
      ...result,
      completedAt: result.completedAt.toISOString(),
    };
    await AsyncStorage.setItem(STORAGE_KEYS.RESULT, JSON.stringify(resultToSave));
    await updateLastSaved();
  } catch (error) {
    console.error('Error saving result locally:', error);
  }
};

/**
 * Get locally saved result
 */
export const getResultLocally = async (): Promise<DiagnosticResult | null> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.RESULT);
    if (data) {
      const parsed = JSON.parse(data);
      return {
        ...parsed,
        completedAt: new Date(parsed.completedAt),
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting result locally:', error);
    return null;
  }
};

/**
 * Update last saved timestamp
 */
const updateLastSaved = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.LAST_SAVED, new Date().toISOString());
  } catch (error) {
    console.error('Error updating last saved:', error);
  }
};

/**
 * Get last saved timestamp
 */
export const getLastSaved = async (): Promise<Date | null> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.LAST_SAVED);
    return data ? new Date(data) : null;
  } catch (error) {
    console.error('Error getting last saved:', error);
    return null;
  }
};

/**
 * Clear all diagnostic progress
 */
export const clearAllLocalData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
  } catch (error) {
    console.error('Error clearing local data:', error);
  }
};

/**
 * Load all saved diagnostic progress
 */
export const loadDiagnosticProgress = async (): Promise<{
  leadData: LeadData | null;
  answers: Answer[];
  currentIndex: number;
  result: DiagnosticResult | null;
}> => {
  try {
    const [leadData, answers, currentIndex, result] = await Promise.all([
      getLeadDataLocally(),
      getAnswersLocally(),
      getCurrentIndexLocally(),
      getResultLocally(),
    ]);

    return {
      leadData,
      answers,
      currentIndex,
      result,
    };
  } catch (error) {
    console.error('Error loading diagnostic progress:', error);
    return {
      leadData: null,
      answers: [],
      currentIndex: 0,
      result: null,
    };
  }
};

/**
 * Save complete diagnostic progress
 */
export const saveDiagnosticProgress = async (
  leadData: LeadData | null,
  answers: Answer[],
  currentIndex: number
): Promise<void> => {
  try {
    const promises: Promise<void>[] = [
      saveAnswersLocally(answers),
      saveCurrentIndexLocally(currentIndex),
    ];

    if (leadData) {
      promises.push(saveLeadDataLocally(leadData));
    }

    await Promise.all(promises);
  } catch (error) {
    console.error('Error saving diagnostic progress:', error);
  }
};
