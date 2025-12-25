
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView, // Pour éviter que le clavier cache les inputs
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { COLORS, SPACING, FONT_SIZES } from '../../config/theme';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { useAuth } from '../../store/AuthContext';

// ========================================
// TYPE NAVIGATION
// ========================================
type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp
  AuthStackParamList,
  'Login'
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

// ========================================
// COMPOSANT
// ========================================
const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login } = useAuth(); // Fonction login du contexte

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Gérer la connexion
   */
  const handleLogin = async () => {
    // Validation de base
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email invalide');
      return;
    }

    try {
      setLoading(true);
      setError(''); // Réinitialiser l'erreur

      // Appel de la fonction login du contexte
      await login(email, password);

      // Si on arrive ici = succès !
      // Le contexte va automatiquement mettre à jour user
      // La navigation va se faire automatiquement (voir AppNavigator)
      console.log('✅ Login réussi');

    } catch (err: any) {
      // Erreur (mauvais mot de passe, etc.)
      console.error('❌ Erreur login:', err.message);
      setError(err.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled" // Permet de cliquer sur les boutons même avec clavier ouvert
      >
        <View style={styles.content}>
          {/* En-tête */}
          <Text style={styles.title}>Bienvenue</Text>
          <Text style={styles.subtitle}>Connectez-vous pour continuer</Text>

          {/* Message d'erreur */}
          {error ? <ErrorMessage message={error} /> : null}

          {/* Champ Email */}
          <Input
            label="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError(''); // Effacer l'erreur quand on tape
            }}
            placeholder="votre@email.com"
            keyboardType="email-address"  // Clavier optimisé pour email
            autoCapitalize="none"         // Pas de majuscule auto
            autoCorrect={false}           // Pas de correction auto
          />

          {/* Champ Mot de passe */}
          <Input
            label="Mot de passe"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setError('');
            }}
            placeholder="••••••••"
            secureTextEntry  // Masquer le texte
          />

          {/* Bouton de connexion */}
          <Button
            title="Se connecter"
            onPress={handleLogin}
            loading={loading}
            style={styles.loginButton}
          />

          {/* Lien vers inscription */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Pas encore de compte ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>S'inscrire</Text>
            </TouchableOpacity>
          </View>

          {/* Comptes de test (à supprimer en production) */}
          <View style={styles.testAccounts}>
            <Text style={styles.testTitle}>🎭 Mode TEST - Comptes disponibles :</Text>
            <Text style={styles.testText}>Citoyen : jean@example.com</Text>
            <Text style={styles.testText}>Agent : marie@example.com</Text>
            <Text style={styles.testText}>Mot de passe : n'importe quoi</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// ========================================
// STYLES
// ========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: SPACING.xl,
    justifyContent: 'center',
  },

  // En-tête
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
  },

  // Bouton
  loginButton: {
    marginTop: SPACING.md,
  },

  // Lien inscription
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.xl,
  },
  registerText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  registerLink: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
    fontWeight: '600',
  },

  // Comptes de test
  testAccounts: {
    marginTop: SPACING.xl,
    padding: SPACING.md,
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: 8,
  },
  testTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  testText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
});

export default LoginScreen;