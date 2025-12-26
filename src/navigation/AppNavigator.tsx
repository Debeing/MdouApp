
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../store/AuthContext';
import { Loading } from '../components/common/Loading';
import { UserRole } from '../types';

// Import des navigateurs
import AuthNavigator from './AuthNavigator';
import CitizenNavigator from './CitizenNavigator';
import AgentNavigator from './AgentNavigator';

const Stack = createStackNavigator();

// ========================================
// NAVIGATEUR PRINCIPAL
// ========================================
const AppNavigator = () => {
  const { user, loading } = useAuth();

  // Pendant qu'on vérifie si l'utilisateur est connecté
  if (loading) {
    return <Loading text="Chargement..." />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          // Utilisateur non connecté → Écrans d'authentification
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : user.role === UserRole.CITIZEN ? (
          // Utilisateur connecté en tant que Citoyen
          <Stack.Screen name="Citizen" component={CitizenNavigator} />
        ) : user.role === UserRole.AGENT ? (
          // Utilisateur connecté en tant qu'Agent
          <Stack.Screen name="Agent" component={AgentNavigator} />
        ) : null}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;