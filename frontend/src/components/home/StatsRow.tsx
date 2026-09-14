import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, theme } from '../../theme/colors';

interface StatsRowProps {
  countries: number;
  days: number;
  trips: number;
}

export const StatsRow: React.FC<StatsRowProps> = ({ countries, days, trips }) => {
  const stats = [
    { label: 'Countries', value: countries },
    { label: 'Days', value: days },
    { label: 'Trips', value: trips },
  ];

  return (
    <View style={styles.container}>
      {stats.map((item, index) => (
        <View key={index} style={styles.statCard}>
          <Text style={styles.valueText}>{item.value}</Text>
          <Text style={styles.labelText}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: theme.spacing.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueText: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  labelText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
});
