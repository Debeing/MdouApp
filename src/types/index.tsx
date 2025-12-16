//=============================
// C'est le "dictionnaire" de mon application.
// Il définit la forme de toutes les données que je vais manipuler.
//=============================

// Les 2 roles possibles dans l'application

export enum UserRole {
    CITOYEN = 'CITOYEN',
    AGENT = 'AGENT',
    }

// Les catégories de problèmes qu'on peut signaler
export enum ProblemCategory {
    DEPOT_DECHETS = 'DEPOT_DECHETS',
    CANIVEAUX_BOUCHES = 'CANIVEAUX_BOUCHES',
    ZONES_INSALUBRES = 'ZONES_INSALUBRES',
    AUTRES = 'AUTRES',
    }
// Le niveau d'urgence du problèmes
export enum UrgencyLevel {
    ATTENDRE = 'ATTENDRE',
    EIMPORTANT = 'IMPORTANT',
    URGENT = 'URGENT',
    }

// ========================================
// INTERFACES (Forme des objets)
// ========================================

// Un utilisateur (citoyen ou agent)
export interface User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone?: string;
    role: UserRole;
    createdAt: string;
    }

// Une position géographique
export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

// Un signalement fait par un citoyen
export interface Report {
  id: string;
  userId: string;
  category: ReportCategory;
  Niveau_urgence: UrgencyLevel;
  status: ReportStatus;
  titre: string;
  description: string;
  location: Location;
  photos: string[];
  createdAt: string;
  updatedAt: string;
}

// ========================================
// CONTEXTES (pour l'authentification)
// ========================================

// Ce que le contexte d'authentification doit fournir
export interface AuthContextType {
  user: User | null;              // L'utilisateur connecté (null si pas connecté)
  token: string | null;           // Le token JWT pour les requêtes API
  loading: boolean;               // Est-ce qu'on est en train de charger ?

  // Fonctions disponibles
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterDto) => Promise<void>;
  logout: () => Promise<void>;
}

// Les données nécessaires pour s'inscrire
export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  role: UserRole;
}