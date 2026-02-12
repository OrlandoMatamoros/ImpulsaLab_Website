import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { es, en, TranslationKeys } from './translations';

export type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
}

const translations: Record<Language, TranslationKeys> = {
  es,
  en,
};

const LANGUAGE_STORAGE_KEY = '@impulsalab_language';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('es');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved language on mount with timeout fallback
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
          setLanguageState(savedLanguage);
        }
      } catch (error) {
        console.error('Error loading language:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    // Fallback: if loading takes more than 2 seconds, show app anyway
    timeoutId = setTimeout(() => {
      if (!isLoaded) {
        setIsLoaded(true);
      }
    }, 2000);

    loadLanguage();

    return () => clearTimeout(timeoutId);
  }, []);

  // Save language when it changes
  const setLanguage = useCallback(async (lang: Language) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      setLanguageState(lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  }, []);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  // Show loading screen while language is being loaded
  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1e3a5f" />
      </View>
    );
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
});

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
