
import React from 'react';
import {
  View,
  TextInput,      // Champ de saisie natif
  Text,
  StyleSheet,
  TextInputProps,  // Type qui contient toutes les props de TextInput
  ViewStyle
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '../../config/theme';

// ========================================
// INTERFACE : Hérite de TextInputProps + nos props custom
// ========================================
interface InputProps extends TextInputProps {
  label?: string;          // Texte au-dessus du champ (optionnel)
  error?: string;          // Message d'erreur (optionnel)
  containerStyle?: ViewStyle;  // Style du conteneur
}

// ========================================
// COMPOSANT
// ========================================
export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  style,
  ...props  // Toutes les autres props de TextInput (placeholder, value, etc.)
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label (affiché seulement si fourni) */}
      {label && <Text style={styles.label}>{label}</Text>}

      {/* Champ de saisie */}
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,  // Bordure rouge si erreur
          style,
        ]}
        placeholderTextColor={COLORS.textLight}  // Couleur du placeholder
        {...props}  // Spread de toutes les autres props
      />

      {/* Message d'erreur (affiché seulement si fourni) */}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

// ========================================
// STYLES
// ========================================
const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,  // Espace entre les inputs
  },

  // Label au-dessus
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },

  // Champ de saisie
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    backgroundColor: COLORS.white,
  },

  // Bordure rouge si erreur
  inputError: {
    borderColor: COLORS.error,
  },

  // Message d'erreur en dessous
  error: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
});