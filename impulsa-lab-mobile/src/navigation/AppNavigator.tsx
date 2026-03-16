// ============================================
// IMPULSA LAB - APP NAVIGATOR
// ============================================

import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LeadGateScreen, DiagnosticWizardScreen, ResultsScreen } from '../screens';
import { RootStackParamList } from './types';
import { useDiagnosticStore } from '../store/diagnosticStore';
import { loadDiagnosticProgress } from '../services/storage';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Loading Screen
const LoadingScreen: React.FC = () => (
  <View style={loadingStyles.container}>
    <ActivityIndicator size="large" color="white" />
    <Text style={loadingStyles.text}>Cargando...</Text>
  </View>
);

const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e3a5f',
  },
  text: {
    color: 'white',
    marginTop: 16,
    fontSize: 18,
  },
});

export const AppNavigator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList>('LeadGate');

  const setLeadData = useDiagnosticStore(state => state.setLeadData);
  const clearAnswers = useDiagnosticStore(state => state.clearAnswers);
  const addAnswer = useDiagnosticStore(state => state.addAnswer);
  const setCurrentQuestionIndex = useDiagnosticStore(state => state.setCurrentQuestionIndex);
  const setResult = useDiagnosticStore(state => state.setResult);
  const setHydrated = useDiagnosticStore(state => state.setHydrated);

  // Hydrate store from AsyncStorage
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const hydrateStore = async () => {
      try {
        const progress = await loadDiagnosticProgress();

        // If we have a completed result, go to Results
        if (progress.result) {
          if (progress.leadData) setLeadData(progress.leadData);
          setResult(progress.result);
          setInitialRoute('Results');
        }
        // If we have partial progress, continue from where we left
        else if (progress.leadData && progress.answers.length > 0) {
          setLeadData(progress.leadData);
          clearAnswers();
          progress.answers.forEach(answer => addAnswer(answer));
          setCurrentQuestionIndex(progress.currentIndex);
          setInitialRoute('DiagnosticWizard');
        }
        // If we just have lead data, go to wizard
        else if (progress.leadData) {
          setLeadData(progress.leadData);
          setInitialRoute('DiagnosticWizard');
        }

        setHydrated(true);
      } catch (error) {
        console.error('Error hydrating store:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fallback: if loading takes more than 3 seconds, show app anyway
    timeoutId = setTimeout(() => {
      if (isLoading) {
        console.warn('Hydration timeout - showing app');
        setHydrated(true);
        setIsLoading(false);
      }
    }, 3000);

    hydrateStore();

    return () => clearTimeout(timeoutId);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: '#f9fafb' },
        }}
      >
        <Stack.Screen
          name="LeadGate"
          component={LeadGateScreen}
          options={{
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="DiagnosticWizard"
          component={DiagnosticWizardScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Results"
          component={ResultsScreen}
          options={{
            animation: 'fade_from_bottom',
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
