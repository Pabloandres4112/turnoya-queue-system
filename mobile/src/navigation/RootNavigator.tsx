import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {HomeScreen, QueueScreen, SettingsScreen} from '../screens';

type RootTabParamList = {
  Home: undefined;
  Queue: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export const RootNavigator: React.FC = () => {
  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarActiveTintColor: '#007AFF',
    tabBarInactiveTintColor: '#8E8E93',
    tabBarStyle: {
      borderTopWidth: 1,
      borderTopColor: '#E5E5EA',
      backgroundColor: '#FFFFFF',
    },
  };

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{tabBarLabel: 'Inicio'}}
        />
        <Tab.Screen
          name="Queue"
          component={QueueScreen}
          options={{tabBarLabel: 'Cola'}}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{tabBarLabel: 'Ajustes'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
