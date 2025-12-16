// src/utils/constants.ts

// ========================================
// TRADUCTIONS DES CATÉGORIES
// ========================================
// On convertit les valeurs techniques (WASTE, BLOCKED_DRAIN)
// en texte lisible pour l'utilisateur
export const REPORT_CATEGORIES = {
  WASTE: 'Dépôt de déchets',
  BLOCKED_DRAIN: 'Caniveau bouché',
  UNSANITARY_AREA: 'Zone insalubre',
  OTHER: 'Autre',
};
// Utilisation : REPORT_CATEGORIES['WASTE'] → "Dépôt de déchets"

// ========================================
// TRADUCTIONS DES NIVEAUX D'URGENCE
// ========================================
export const URGENCY_LEVELS = {
  LOW: 'Faible',
  MEDIUM: 'Moyen',
  HIGH: 'Élevé',
};

// ========================================
// TRADUCTIONS DES STATUTS
// ========================================
export const REPORT_STATUS = {
  PENDING: 'En attente',
  ASSIGNED: 'Assigné',
  IN_PROGRESS: 'En cours',
  COMPLETED: 'Terminé',
  REJECTED: 'Rejeté',
};

// ========================================
// CONFIGURATION DE LA CARTE
// ========================================
export const MAP_CONFIG = {
  // Position initiale de la carte (Moundou, Tchad)
  INITIAL_REGION: {
    latitude: 8.6167,      // Centre de Moundou
    longitude: 16.0833,
    latitudeDelta: 0.0922,  // Niveau de zoom (plus petit = plus zoomé)
    longitudeDelta: 0.0421,
  },

  // Distance minimum pour regrouper les markers (en pixels)
  MARKER_CLUSTER_RADIUS: 50,
};

// ========================================
// Traductions et configurations qui ne changent jamais.
// CONFIGURATION DES IMAGES
// ========================================
export const IMAGE_CONFIG = {
  MAX_WIDTH: 1024,      // Largeur max après compression
  MAX_HEIGHT: 1024,     // Hauteur max après compression
  QUALITY: 0.8,         // Qualité JPEG (0.8 = 80%)
  MAX_SIZE_MB: 2,       // Taille max du fichier (2 MB)
};

// ========================================
// RÈGLES DE VALIDATION
// ========================================
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 6,  // Minimum 6 caractères

  // Regex pour valider le numéro de téléphone tchadien
  // Accepte : +237670123456 ou 670123456
  PHONE_REGEX: /^(\+237)?[0-9]{9}$/,

  // Regex pour valider l'email
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};