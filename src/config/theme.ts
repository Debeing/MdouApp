
// ========================================
// COULEURS
// Centralise toutes les couleurs, tailles, espacements de mon app.
// ========================================
export const COLORS = {
  // Couleur principale de l'app (vert = nature, propreté)
  primary: '#10B981',      // Vert
  primaryDark: '#059669',  // Vert foncé (pour les boutons pressés)

  // Couleurs de statut (pour les messages et badges)
  success: '#10B981',  // Vert - Succès
  warning: '#F59E0B',  // Orange - Attention
  error: '#EF4444',    // Rouge - Erreur
  info: '#3B82F6',     // Bleu - Information

  // Couleurs de texte
  text: '#1F2937',          // Texte principal (presque noir)
  textSecondary: '#6B7280', // Texte secondaire (gris moyen)
  textLight: '#9CA3AF',     // Texte clair (gris clair)

  // Couleurs de fond
  background: '#FFFFFF',          // Fond principal (blanc)
  backgroundSecondary: '#F9FAFB', // Fond secondaire (gris très clair)

  // Bordures
  border: '#E5E7EB',  // Gris pour les bordures

  // Basiques
  white: '#FFFFFF',
  black: '#000000',
};

// ========================================
// ESPACEMENTS (margins et paddings)
// ========================================
export const SPACING = {
  xs: 4,   // Extra small - Très petit espace
  sm: 8,   // Small - Petit espace
  md: 16,  // Medium - Espace moyen (le plus utilisé)
  lg: 24,  // Large - Grand espace
  xl: 32,  // Extra large - Très grand espace
  xxl: 48, // Extra extra large - Énorme espace
};

// ========================================
// TAILLES DE POLICE
// ========================================
export const FONT_SIZES = {
  xs: 12,   // Très petit (notes, labels)
  sm: 14,   // Petit (texte secondaire)
  md: 16,   // Moyen (texte normal)
  lg: 18,   // Grand (sous-titres)
  xl: 20,   // Très grand (titres de sections)
  xxl: 24,  // Énorme (titres de pages)
  xxxl: 32, // Géant (titres principaux)
};

// ========================================
// ARRONDIS DES COINS
// ========================================
export const BORDER_RADIUS = {
  sm: 4,      // Petit arrondi (badges)
  md: 8,      // Arrondi moyen (boutons, inputs)
  lg: 12,     // Grand arrondi (cartes)
  xl: 16,     // Très grand arrondi
  full: 9999, // Complètement rond (avatars, badges ronds)
};