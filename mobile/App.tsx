/**
 * TurnoYa - Sistema de Gestión de Turnos
 * Frontend React Native con TypeScript
 */

import React from 'react';
import 'react-native-gesture-handler';
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/AppNavigator';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
};

export default App;
