import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { initLocalDatabase } from './src/database/localDb';

export default function App() {
  useEffect(() => {
    try {
      initLocalDatabase();
      console.log('Base de datos SQLite local inicializada correctamente');
    } catch (error) {
      console.error('Error al inicializar SQLite:', error);
    }
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#0A192F" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}