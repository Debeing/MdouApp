
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,        // Pour le carousel horizontal
  Dimensions,      // Pour obtenir la largeur de l'écran
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../config/theme';
import { Button } from '../../components/common/Button';

// ========================================
// TYPE NAVIGATION
// ========================================
type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
};

type OnboardingScreenNavigationProp = StackNavigationProp
  AuthStackParamList,
  'Onboarding'
>;

interface Props {
  navigation: OnboardingScreenNavigationProp;
}

// ========================================
// DONNÉES DES SLIDES
// ========================================
const { width } = Dimensions.get('window'); // Largeur de l'écran

const slides = [
  {
    id: '1',
    title: 'Signalez les problèmes',
    description: 'Photographiez et signalez facilement les déchets, caniveaux bouchés et zones insalubres',
    emoji: '📸', // Emoji = simple et universel (pas besoin d'images)
  },
  {
    id: '2',
    title: 'Suivi en temps réel',
    description: 'Suivez l\'état de vos signalements et recevez des notifications à chaque étape',
    emoji: '🔔',
  },
  {
    id: '3',
    title: 'Ville plus propre',
    description: 'Ensemble, rendons Moundou plus propre et plus saine pour tous',
    emoji: '🌱',
  },
];

// ========================================
// COMPOSANT
// ========================================
const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Slide actuel
  const flatListRef = useRef<FlatList>(null); // Référence pour contrôler le FlatList

  /**
   * Passer au slide suivant ou aller au login
   */
  const goToNext = () => {
    if (currentIndex < slides.length - 1) {
      // Pas encore au dernier slide → aller au suivant
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true, // Animation smooth
      });
    } else {
      // Dernier slide → aller au login
      navigation.navigate('Login');
    }
  };

  /**
   * Passer directement au login (bouton "Passer")
   */
  const skip = () => {
    navigation.navigate('Login');
  };

  /**
   * Rendu d'un slide
   */
  const renderItem = ({ item }: { item: typeof slides[0] }) => (
    <View style={styles.slide}>
      <Text style={styles.emoji}>{item.emoji}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Bouton "Passer" en haut à droite */}
      <TouchableOpacity style={styles.skipButton} onPress={skip}>
        <Text style={styles.skipText}>Passer</Text>
      </TouchableOpacity>

      {/* Carousel horizontal (FlatList) */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal              // Défilement horizontal
        pagingEnabled          // Snap à chaque slide
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}

        // Détecter le changement de slide
        onMomentumScrollEnd={(event) => {
          // Calculer l'index du slide actuel
          const index = Math.floor(
            event.nativeEvent.contentOffset.x / width
          );
          setCurrentIndex(index);
        }}
      />

      {/* Footer : Pagination + Bouton */}
      <View style={styles.footer}>
        {/* Indicateurs de pagination (points) */}
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex && styles.activeDot, // Point actif = allongé
              ]}
            />
          ))}
        </View>

        {/* Bouton Suivant / Commencer */}
        <Button
          title={currentIndex === slides.length - 1 ? 'Commencer' : 'Suivant'}
          onPress={goToNext}
          style={styles.button}
        />
      </View>
    </View>
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

  // Bouton "Passer" en haut à droite
  skipButton: {
    position: 'absolute',
    top: 50,
    right: SPACING.lg,
    zIndex: 10, // Au-dessus du FlatList
  },
  skipText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
    fontWeight: '600',
  },

  // Chaque slide
  slide: {
    width,  // Largeur de l'écran (ex: 375px sur iPhone)
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },

  // Emoji (icône du slide)
  emoji: {
    fontSize: 80,
    marginBottom: SPACING.xl,
  },

  // Titre du slide
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },

  // Description du slide
  description: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24, // Espacement entre les lignes
  },

  // Footer (pagination + bouton)
  footer: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xl,
  },

  // Conteneur des points de pagination
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },

  // Point de pagination inactif
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.xs,
  },

  // Point de pagination actif (allongé)
  activeDot: {
    backgroundColor: COLORS.primary,
    width: 24, // Plus large
  },

  // Bouton "Suivant" / "Commencer"
  button: {
    width: '100%',
  },
});

export default OnboardingScreen;