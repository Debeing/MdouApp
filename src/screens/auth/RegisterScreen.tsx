
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../config/theme';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { useAuth } from '../../store/AuthContext';
import { UserRole } from '../../types';

// ========================================
// TYPE NAVIGATION
// ========================================
type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
};

type RegisterScreenNavigationProp = StackNavigationProp
  AuthStackParamList,
  'Register'
>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

// ========================================
// COMPOSANT
// ========================================
const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const { register } = useAuth();

  // État du formulaire
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.CITIZEN); // Par défaut : Citoyen

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Valider le formulaire
   */
  const validateForm = (): boolean => {
    // Champs obligatoires
    if (!firstName || !lastName || !email || !password) {
      setError('Veuillez remplir tous les champs obligatoires');
      return false;
    }

    // Email valide
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email invalide');
      return false;
    }

    // Téléphone valide (si fourni)
    if (phone) {
      const phoneRegex = /^(\+237)?[0-9]{9}$/;
      if (!phoneRegex.test(phone)) {
        setError('Numéro de téléphone invalide (ex: +237670123456)');
        return false;
      }
    }

    // Mot de passe suffisamment long
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }

    // Confirmation du mot de passe
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return false;
    }

    return true;
  };

  /**
   * Gérer l'inscription
   */
  const handleRegister = async () => {
    // Valider
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Appel API
      await register({
        firstName,
        lastName,
        email,
        phone,
        password,
        role,
      });

      // Succès ! Le contexte redirige automatiquement
      console.log('✅ Inscription réussie');

    } catch (err: any) {
      console.error('❌ Erreur register:', err.message);
      setError(err.message || 'Erreur d\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* En-tête */}
          <Text style={styles.title}>Créer un compte</Text>

          {/* Message d'erreur */}
          {error ? <ErrorMessage message={error} /> : null}

          {/* Sélecteur de rôle */}
          <View style={styles.roleSelector}>
            <TouchableOpacity
              style={[
                styles.roleButton,
                role === UserRole.CITIZEN && styles.roleButtonActive,
              ]}
              onPress={() => setRole(UserRole.CITIZEN)}
            >
              <Text
                style={[
                  styles.roleButtonText,
                  role === UserRole.CITIZEN && styles.roleButtonTextActive,
                ]}
              >
                👤 Citoyen
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleButton,
                role === UserRole.AGENT && styles.roleButtonActive,
              ]}
              onPress={() => setRole(UserRole.AGENT)}
            >
              <Text
                style={[
                  styles.roleButtonText,
                  role === UserRole.AGENT && styles.roleButtonTextActive,
                ]}
              >
                🚛 Agent
              </Text>
            </TouchableOpacity>
          </View>

          {/* Formulaire */}
          <Input
            label="Prénom *"
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
              setError('');
            }}
            placeholder="Jean"
          />

          <Input
            label="Nom *"
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
              setError('');
            }}
            placeholder="Dupont"
          />

          <Input
            label="Email *"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError('');
            }}
            placeholder="votre@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Input
            label="Téléphone"
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              setError('');
            }}
            placeholder="+237 670 12 34 56"
            keyboardType="phone-pad"
          />

          <Input
            label="Mot de passe *"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setError('');
            }}
            placeholder="••••••••"
            secureTextEntry
          />

          <Input
            label="Confirmer le mot de passe *"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setError('');
            }}
            placeholder="••••••••"
            secureTextEntry
          />

          {/* Bouton */}
          <Button
            title="S'inscrire"
            onPress={handleRegister}
            loading={loading}
            style={styles.registerButton}
          />
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
  },

  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xl,
  },

  // Sélecteur de rôle
  roleSelector: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  roleButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  roleButtonActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '10', // 10% d'opacité
  },
  roleButtonText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  roleButtonTextActive: {
    color: COLORS.primary,
  },

  registerButton: {
    marginTop: SPACING.lg,
    marginBottom: SPACING.xl,
  },
});

export default RegisterScreen;