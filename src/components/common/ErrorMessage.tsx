

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '../../config/theme';

// ========================================
// INTERFACE
// ========================================
interface ErrorMessageProps {
  message: string;  // Message d'erreur à afficher
}

// ========================================
// COMPOSANT
// ========================================
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

// ========================================
// STYLES
// ========================================
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.error + '15',  // Rouge très clair (opacité 15%)
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginVertical: SPACING.md,
    borderLeftWidth: 4,  // Barre rouge à gauche
    borderLeftColor: COLORS.error,
  },
  text: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.error,
  },
});