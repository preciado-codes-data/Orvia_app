import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

import { LoginScreen } from '../screens/auth/LoginScreen';
// Vistas principales (se pueden crear como componentes placeholder por ahora)
import { DashboardGerenteScreen } from '../screens/gerencial/DashboardGerenteScreen';
import { DashboardCalidadScreen } from '../screens/calidad/DashboardCalidadScreen';
import { SeleccionZonaScreen } from '../screens/calidad/SeleccionZonaScreen';
import { CapturaInventarioScreen } from '../screens/calidad/CapturaInventarioScreen';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#0A192F' },
          headerTintColor: '#00D2FF',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="DashboardGerente" 
          component={DashboardGerenteScreen} 
          options={{ title: 'Panel Gerencial' }} 
        />
        <Stack.Screen 
          name="DashboardCalidad" 
          component={DashboardCalidadScreen} 
          options={{ title: 'Control de Calidad' }} 
        />
        <Stack.Screen
            name="DashboardCalidades"
            component={SeleccionZonaScreen}
            options={{title: 'Seleccion de Zona'}}
        />
        <Stack.Screen
            name="CapturaInventario"
            component={CapturaInventarioScreen}
            options={{title: 'Captura de Inventario'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};