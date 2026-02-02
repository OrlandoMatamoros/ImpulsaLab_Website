// ============================================
// IMPULSA LAB - MAIN APP ENTRY POINT
// ============================================

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppNavigator } from './src/navigation';

// Enable NativeWind
import './global.css';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}
