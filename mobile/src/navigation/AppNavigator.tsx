import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';

// Screens
import HomeScreen from '../screens/HomeScreen';
import QueueScreen from '../screens/QueueScreen';
import AddClientScreen from '../screens/AddClientScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2563eb',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'TurnoYa',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Queue"
          component={QueueScreen}
          options={{
            title: 'Cola de Turnos',
          }}
        />
        <Stack.Screen
          name="AddClient"
          component={AddClientScreen}
          options={{
            title: 'Agregar Cliente',
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Configuración',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
