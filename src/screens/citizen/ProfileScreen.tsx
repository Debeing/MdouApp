// src/screens/citizen/ProfileScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../../config/theme';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../store/AuthContext';

const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Déconnexion', 'Voulez-vous vraiment vous déconnecter ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Déconnexion', onPress: logout, style: 'destructive' },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      <Text style={styles.name}>
        {user?.firstName} {user?.lastName}
      </Text>
      <Text style={styles.email}>{user?.email}</Text>
      <Text style={styles.role}>Rôle: {user?.role}</Text>

      <Button
        title="Déconnexion"
        onPress={handleLogout}
        variant="secondary"
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundSecondary,
    padding: SPACING.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xl,
  },
  name: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  email: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  role: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
    marginBottom: SPACING.xxl,
  },
  button: {
    width: '80%',
  },
});

export default ProfileScreen;