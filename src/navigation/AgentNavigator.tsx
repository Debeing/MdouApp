
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../config/theme';
import { Ionicons } from '@expo/vector-icons';

// Import des écrans agents (placeholders pour l'instant)
import DashboardScreen from '../screens/agent/DashboardScreen';
import TaskListScreen from '../screens/agent/TaskListScreen';
import TaskDetailScreen from '../screens/agent/TaskDetailScreen';
import TaskMapScreen from '../screens/agent/TaskMapScreen';
import StatsScreen from '../screens/agent/StatsScreen';

// ========================================
// TYPES DE NAVIGATION
// ========================================
export type AgentStackParamList = {
  Dashboard: undefined;
  TaskList: undefined;
  TaskDetail: { taskId: string };  // Prend un paramètre taskId
  TaskMap: undefined;
  Stats: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<AgentStackParamList>();

// ========================================
// STACK POUR L'ONGLET "ACCUEIL"
// ========================================
const DashboardStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: COLORS.primary },
      headerTintColor: COLORS.white,
      headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <Stack.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{ title: 'Tableau de bord' }}
    />
    <Stack.Screen
      name="TaskDetail"
      component={TaskDetailScreen}
      options={{ title: 'Détail de la tâche' }}
    />
  </Stack.Navigator>
);

// ========================================
// STACK POUR L'ONGLET "TÂCHES"
// ========================================
const TaskStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: COLORS.primary },
      headerTintColor: COLORS.white,
      headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <Stack.Screen
      name="TaskList"
      component={TaskListScreen}
      options={{ title: 'Mes tâches' }}
    />
    <Stack.Screen
      name="TaskDetail"
      component={TaskDetailScreen}
      options={{ title: 'Détail de la tâche' }}
    />
  </Stack.Navigator>
);

// ========================================
// NAVIGATEUR À ONGLETS
// ========================================
const AgentNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'DashboardTab') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'TasksTab') {
            iconName = focused ? 'checkbox' : 'checkbox-outline';
          } else if (route.name === 'MapTab') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'StatsTab') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        headerShown: false,
      })}
    >
      {/* Onglet 1 : Tableau de bord */}
      <Tab.Screen
        name="DashboardTab"
        component={DashboardStack}
        options={{ title: 'Accueil' }}
      />

      {/* Onglet 2 : Tâches */}
      <Tab.Screen
        name="TasksTab"
        component={TaskStack}
        options={{ title: 'Tâches' }}
      />

      {/* Onglet 3 : Carte */}
      <Tab.Screen
        name="MapTab"
        component={TaskMapScreen}
        options={{
          title: 'Carte',
          headerShown: true,
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: COLORS.white,
        }}
      />

      {/* Onglet 4 : Stats */}
      <Tab.Screen
        name="StatsTab"
        component={StatsScreen}
        options={{
          title: 'Stats',
          headerShown: true,
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: COLORS.white,
        }}
      />
    </Tab.Navigator>
  );
};

export default AgentNavigator;
```

**💡 Architecture Agent :**
```
Bottom Tabs (4 onglets)
├─ DashboardTab (Stack)
│  ├─ Dashboard
│  └─ TaskDetail
├─ TasksTab (Stack)
│  ├─ TaskList
│  └─ TaskDetail
├─ MapTab (Écran unique)
│  └─ TaskMap
└─ StatsTab (Écran unique)
   └─ Stats
```

**Fichier sauvegardé ?** ✅

---

### 10.5 - AppNavigator Principal (`src/navigation/AppNavigator.tsx`)

**🎯 Rôle :** Le cerveau de la navigation. Décide quel navigateur afficher selon l'état d'authentification.

**Logique :**
```
Si user = null        → AuthNavigator (Onboarding, Login, Register)
Si user.role = CITIZEN → CitizenNavigator
Si user.role = AGENT  → AgentNavigator