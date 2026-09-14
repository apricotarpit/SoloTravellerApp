import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Phone, Globe } from 'lucide-react-native';
import { colors, theme } from '../../theme/colors';

interface SafetyEssentialsCardProps {
  countryName: string;
  policeMedical: string;
  embassy: string;
}

export const SafetyEssentialsCard: React.FC<SafetyEssentialsCardProps> = ({
  countryName,
  policeMedical,
  embassy,
}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionHeader}>{countryName.toUpperCase()} ESSENTIALS</Text>

      <View style={styles.row}>
        {/* Emergency Call Card */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => Linking.openURL('tel:110')}
          style={styles.card}
        >
          <Phone size={18} color={colors.primary} />
          <View style={styles.cardContent}>
            <Text style={styles.label}>Emergency</Text>
            <Text style={styles.value}>{policeMedical}</Text>
          </View>
        </TouchableOpacity>

        {/* Embassy Card */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => Linking.openURL(`tel:${embassy}`)}
          style={styles.card}
        >
          <Globe size={18} color={colors.primary} />
          <View style={styles.cardContent}>
            <Text style={styles.label}>Embassy</Text>
            <Text style={styles.value} numberOfLines={1}>{embassy}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: theme.spacing.xl,
  },
  sectionHeader: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    padding: 16,
    gap: 12,
  },
  cardContent: {
    gap: 2,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  value: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
});
