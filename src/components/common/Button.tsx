
import React from 'react';
import {
  TouchableOpacity,  // Bouton cliquable avec effet de feedback
  Text,
  StyleSheet,
  ActivityIndicator,  // Spinner de chargement
  ViewStyle,          // Type pour le style
  TextStyle
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '../../config/theme';

// ========================================
// INTERFACE : Définit les props acceptées
// ========================================
interface ButtonProps {
  title: string;                    // Texte du bouton (OBLIGATOIRE)
  onPress: () => void;              // Fonction appelée au clic (OBLIGATOIRE)
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';  // Type de bouton (optionnel)
  size?: 'small' | 'medium' | 'large';  // Taille du bouton (optionnel)
  loading?: boolean;                // Affiche un spinner au lieu du texte
  disabled?: boolean;               // Désactive le bouton
  style?: ViewStyle;                // Styles personnalisés supplémentaires
  textStyle?: TextStyle;            // Styles personnalisés pour le texte
}

// ========================================
// COMPOSANT
// ========================================
export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',      // Valeur par défaut
  size = 'medium',          // Valeur par défaut
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  // Si loading ou disabled, on empêche le clic
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      // Combinaison de plusieurs styles :
      // 1. Style de base (button)
      // 2. Style selon la variante (primary, secondary, etc.)
      // 3. Style selon la taille (small, medium, large)
      // 4. Style si désactivé
      // 5. Styles personnalisés passés en props
      style={[
        styles.button,
        styles[variant],           // styles.primary ou styles.secondary
        styles[size],              // styles.small ou styles.medium
        isDisabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}  // Opacité quand on appuie (feedback visuel)
    >
      {loading ? (
        // Si loading, on affiche un spinner
        <ActivityIndicator
          color={variant === 'outline' ? COLORS.primary : COLORS.white}
        />
      ) : (
        // Sinon, on affiche le texte
        <Text
          style={[
            styles.text,
            styles[`${variant}Text`],  // styles.primaryText ou styles.secondaryText
            styles[`${size}Text`],     // styles.smallText ou styles.mediumText
            textStyle
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

// ========================================
// STYLES
// ========================================
const styles = StyleSheet.create({
  // Style de base (commun à tous les boutons)
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.md,
  },

  // ===== VARIANTES (couleurs) =====
  primary: {
    backgroundColor: COLORS.primary,  // Vert
  },
  secondary: {
    backgroundColor: COLORS.textSecondary,  // Gris
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  danger: {
    backgroundColor: COLORS.error,  // Rouge
  },

  // ===== TAILLES (padding) =====
  small: {
    paddingVertical: SPACING.xs,    // 4px haut/bas
    paddingHorizontal: SPACING.md,  // 16px gauche/droite
  },
  medium: {
    paddingVertical: SPACING.sm,    // 8px
    paddingHorizontal: SPACING.lg,  // 24px
  },
  large: {
    paddingVertical: SPACING.md,    // 16px
    paddingHorizontal: SPACING.xl,  // 32px
  },

  // ===== TEXTE =====
  text: {
    fontWeight: '600',  // Semi-gras
  },

  // Couleurs de texte selon la variante
  primaryText: {
    color: COLORS.white,
  },
  secondaryText: {
    color: COLORS.white,
  },
  outlineText: {
    color: COLORS.primary,  // Texte vert pour bouton transparent
  },
  dangerText: {
    color: COLORS.white,
  },

  // Tailles de texte selon la taille du bouton
  smallText: {
    fontSize: FONT_SIZES.sm,  // 14px
  },
  mediumText: {
    fontSize: FONT_SIZES.md,  // 16px
  },
  largeText: {
    fontSize: FONT_SIZES.lg,  // 18px
  },

  // État désactivé (opacité réduite)
  disabled: {
    opacity: 0.5,
  },
});