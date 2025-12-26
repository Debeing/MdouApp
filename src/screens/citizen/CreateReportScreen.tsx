
import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CitizenStackParamList } from '../../navigation/CitizenNavigator';
import { COLORS, SPACING, FONT_SIZES } from '../../config/theme';
import { Button } from '../../components/common/Button';

type CreateReportScreenNavigationProp = StackNavigationProp
  CitizenStackParamList,
  'CreateReport'
>;

interface Props {
  navigation: CreateReportScreenNavigationProp;
}

const CreateReportScreen: React.FC<Props> = ({ navigation }) => {
  const handleCreate = () => {
    Alert.alert('Succès', 'Signalement créé (placeholder)', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un signalement</Text>
      <Text style={styles.subtitle}>(Formulaire à implémenter)</Text>

      <Button
        title="Créer (test)"
        onPress={handleCreate}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
  },
  button: {
    width: '100%',
  },
});

export default CreateReportScreen;