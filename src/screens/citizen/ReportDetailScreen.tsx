
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { CitizenStackParamList } from '../../navigation/CitizenNavigator';
import { COLORS, SPACING, FONT_SIZES } from '../../config/theme';

type ReportDetailScreenRouteProp = RouteProp<CitizenStackParamList, 'ReportDetail'>;

interface Props {
  route: ReportDetailScreenRouteProp;
}

const ReportDetailScreen: React.FC<Props> = ({ route }) => {
  const { reportId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Détail du signalement</Text>
      <Text style={styles.id}>ID: {reportId}</Text>
      <Text style={styles.subtitle}>(À implémenter)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  text: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  id: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
    marginTop: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
  },
});

export default ReportDetailScreen;