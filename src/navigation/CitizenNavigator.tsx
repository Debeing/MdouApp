
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../config/theme';
import { Ionicons } from '@expo/vector-icons';

// Import des écrans (on va créer des placeholders)
import HomeScreen from '../screens/citizen/HomeScreen';
import CreateReportScreen from '../screens/citizen/CreateReportScreen';
import ReportListScreen from '../screens/citizen/ReportListScreen';
import ReportDetailScreen from '../screens/citizen/ReportDetailScreen';
import ProfileScreen from '../screens/citizen/ProfileScreen';

// ========================================
// TYPES DE NAVIGATION
// ========================================
export type CitizenStackParamList = {
  Home: undefined;
  CreateReport: undefined;
  ReportList: undefined;
  ReportDetail: { reportId: string };  // Prend un paramètre reportId
  Profile: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<CitizenStackParamList>();

// ========================================
// STACK POUR L'ONGLET "CARTE"
// ========================================
const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: COLORS.primary },
      headerTintColor: COLORS.white,
      headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: 'Carte' }}
    />
    <Stack.Screen
      name="CreateReport"
      component={CreateReportScreen}
      options={{ title: 'Nouveau signalement' }}
    />
    <Stack.Screen
      name="ReportDetail"
      component={ReportDetailScreen}
      options={{ title: 'Détail du signalement' }}
    />
  </Stack.Navigator>
);

// ========================================
// STACK POUR L'ONGLET "SIGNALEMENTS"
// ========================================
const ReportStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: COLORS.primary },
      headerTintColor: COLORS.white,
      headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <Stack.Screen
      name="ReportList"
      component={ReportListScreen}
      options={{ title: 'Mes signalements' }}
    />
    <Stack.Screen
      name="ReportDetail"
      component={ReportDetailScreen}
      options={{ title: 'Détail du signalement' }}
    />
  </Stack.Navigator>
);

// ========================================
// NAVIGATEUR À ONGLETS (BOTTOM TABS)
// ========================================
const CitizenNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Icônes dynamiques selon l'onglet
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'HomeTab') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'ReportsTab') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        // Couleurs des onglets
        tabBarActiveTintColor: COLORS.primary,      // Couleur de l'onglet actif
        tabBarInactiveTintColor: COLORS.textSecondary,  // Couleur des onglets inactifs
        headerShown: false,  // Pas de header au niveau des tabs (déjà dans les stacks)
      })}
    >
      {/* Onglet 1 : Carte */}
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: 'Carte' }}
      />

      {/* Onglet 2 : Signalements */}
      <Tab.Screen
        name="ReportsTab"
        component={ReportStack}
        options={{ title: 'Signalements' }}
      />

      {/* Onglet 3 : Profil (pas de stack, juste un écran) */}
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          title: 'Profil',
          headerShown: true,  // Afficher le header pour cet onglet
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: COLORS.white,
        }}
      />
    </Tab.Navigator>
  );
};

export default CitizenNavigator;
```

**💡 Architecture :**
```
Bottom Tabs (3 onglets)
├─ HomeTab (Stack)
│  ├─ Home (Carte)
│  ├─ CreateReport
│  └─ ReportDetail
├─ ReportsTab (Stack)
│  ├─ ReportList
│  └─ ReportDetail
└─ ProfileTab (Écran unique)
   └─ Profile