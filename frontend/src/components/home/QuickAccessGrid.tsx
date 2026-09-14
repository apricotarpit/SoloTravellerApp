import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Luggage, Compass, Shield, Users } from 'lucide-react-native';
import { colors, theme } from '../../theme/colors';

interface QuickAccessGridProps {
  onPressPacking: () => void;
  onPressItinerary: () => void;
  onPressSafety: () => void;
  onPressCommunity: () => void;
}

export const QuickAccessGrid: React.FC<QuickAccessGridProps> = ({
  onPressPacking,
  onPressItinerary,
  onPressSafety,
  onPressCommunity,
}) => {
  const items = [
    {
      label: 'Packing',
      icon: <Luggage size={22} color="#00E5FF" />,
      bg: '#083344',
      border: 'rgba(0, 229, 255, 0.25)',
      onPress: onPressPacking,
    },
    {
      label: 'Itinerary',
      icon: <Compass size={22} color="#00D2B4" />,
      bg: '#064E3B',
      border: 'rgba(0, 210, 180, 0.25)',
      onPress: onPressItinerary,
    },
    {
      label: 'Safety',
      icon: <Shield size={22} color="#818CF8" />,
      bg: '#1E1B4B',
      border: 'rgba(129, 140, 248, 0.25)',
      onPress: onPressSafety,
    },
    {
      label: 'Community',
      icon: <Users size={22} color="#C084FC" />,
      bg: '#3B0764',
      border: 'rgba(192, 132, 252, 0.25)',
      onPress: onPressCommunity,
    },
  ];

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionHeader}>QUICK ACCESS</Text>
      <View style={styles.grid}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={item.onPress}
            style={[
              styles.actionCard,
              { backgroundColor: item.bg, borderColor: item.border },
            ]}
          >
            <View style={styles.iconBox}>{item.icon}</View>
            <Text style={styles.actionLabel}>{item.label}</Text>
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
  grid: {
    flexDirection: 'row',
    gap: 10,
  },
  actionCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  iconBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
});
