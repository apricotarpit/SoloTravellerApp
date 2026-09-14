import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Shield, Wifi, PhoneCall, MapPin, ChevronRight } from 'lucide-react-native';
import { SafetyPrinciple } from '../../types';
import { colors, theme } from '../../theme/colors';

interface SafetyPrinciplesListProps {
  principles: SafetyPrinciple[];
}

export const SafetyPrinciplesList: React.FC<SafetyPrinciplesListProps> = ({
  principles,
}) => {
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'wifi':
        return <Wifi size={18} color="#38BDF8" />;
      case 'phone':
        return <PhoneCall size={18} color="#00E5FF" />;
      case 'map-pin':
        return <MapPin size={18} color="#FBBF24" />;
      case 'shield':
      default:
        return <Shield size={18} color="#00E5FF" />;
    }
  };

  const handleAction = (item: SafetyPrinciple) => {
    Alert.alert(
      item.title,
      `${item.description}\n\nThis feature helps solo travelers ensure independence and quick emergency routing.`,
      [{ text: 'Got it' }]
    );
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionHeader}>SAFETY PRINCIPLES</Text>

      <View style={styles.list}>
        {principles.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            onPress={() => handleAction(item)}
            style={styles.card}
          >
            <View style={styles.iconCircle}>{renderIcon(item.icon)}</View>

            <View style={styles.details}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>

            <ChevronRight size={18} color={colors.textMuted} />
          </TouchableOpacity>
        ))}
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
  list: {
    gap: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    padding: 14,
    gap: 12,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    flex: 1,
    gap: 3,
  },
  title: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  description: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
  },
});
