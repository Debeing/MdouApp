

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../../config/theme';

// ========================================
// INTERFACE
// ========================================
interface CardProps {
  children: React.ReactNode;  // Contenu de la carte
  style?: ViewStyle;          // Styles personnalisés
  noPadding?: boolean;        // Enlever le padding interne
}

// ========================================
// COMPOSANT
// ========================================
export const Card: React.FC<CardProps> = ({
  children,
  style,
  noPadding = false
}) => {
  return (
    <View style={[
      styles.card,
      noPadding && styles.noPadding,  // Enlève le padding si demandé
      style
    ]}>
      {children}
    </View>
  );
};

// ========================================
// STYLES
// ========================================

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,

    // Ombre (marche sur iOS et Android)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,  // Ombre Android
  },
  noPadding: {
    padding: 0,
  },
});