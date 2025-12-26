
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../config/theme';

// Import des écrans
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

// ========================================
// TYPES DE NAVIGATION
// Définit tous les écrans et leurs paramètres
// ========================================
export type AuthStackParamList = {
  Onboarding: undefined;  // undefined = pas de paramètres
  Login: undefined;
  Register: undefined;
};

// Créer le navigateur Stack
const Stack = createStackNavigator<AuthStackParamList>();

// ========================================
// COMPOSANT AUTHNAVIGATOR
// ========================================
const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"  // Premier écran affiché
      screenOptions={{
        // Style par défaut pour tous les écrans
        headerStyle: {
          backgroundColor: COLORS.primary,  // Barre verte
        },
        headerTintColor: COLORS.white,  // Texte et flèche blancs
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {/* Écran Onboarding (sans header) */}
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{
          headerShown: false  // Pas de barre en haut
        }}
      />

      {/* Écran Login */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Connexion',  // Titre dans la barre
          headerLeft: () => null,  // Pas de bouton retour (on ne peut pas revenir à l'onboarding)
        }}
      />

      {/* Écran Register */}
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: 'Inscription'
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;