import React from 'react';
import {
    View,
    ActivityIndicator,  // Composant pour afficher un spinner de chargement
    Text,
    StyleSheet,} from 'react-native';

    import {COLORS, SPACING, FONT_SIZES} from '../../config/theme';

    // ========================================
    // Interfaces laoding
    // ========================================

    interface LoadingProps {
        text?: string; // Texte optionnel à afficher sous le spinner
        size?: 'small' | 'large'; // Taille du spinner
        color?: string; // Couleur du spinner
    }

    // ========================================
    // Composant Loading
    // ========================================

    export const Loading: React.FC<LoadingProps> = ({
        text,
        size = 'large' // Taille par défaut
    ,
        color = COLORS.primary // Couleur par défaut
    }) => {
        return (
            <View style={styles.container}>
                <ActivityIndicator size={size} color={COLORS.primary} // Couleur vert de l'app
            />
                {text && <Text style={styles.text}>{text}</Text>}
            </View>
        );
    };

    // ========================================
    // Styles
    // ========================================

    const styles = StyleSheet.create({
        container: {
            flex: 1, // Prend tout l'espace disponible
            justifyContent: 'center', // Centre verticalement
            alignItems: 'center', // Centre horizontalement
            padding: SPACING.xl,
            backgroundColor: COLORS.background, // Fond blanc
            },
        text: {
            marginTop: SPACING.md,// Espace entre le spinner et le texte
            fontSize: FONT_SIZES.md,
            color: COLORS.textSecondary, // Couleur du texte
            textAligne: 'center',
            },
        });