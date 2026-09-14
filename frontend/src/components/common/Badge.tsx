import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, theme } from '../../theme/colors';

interface BadgeProps {
  label: string;
  variant?: 'cyan' | 'teal' | 'outline' | 'purple' | 'red' | 'gray';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'cyan',
  size = 'md',
  icon,
  style,
  textStyle,
}) => {
  const getBadgeColors = () => {
    switch (variant) {
      case 'outline':
        return {
          bg: 'rgba(0, 229, 255, 0.08)',
          border: 'rgba(0, 229, 255, 0.4)',
          text: colors.primary,
        };
      case 'teal':
        return {
          bg: 'rgba(0, 210, 180, 0.15)',
          border: 'rgba(0, 210, 180, 0.3)',
          text: colors.primaryTeal,
        };
      case 'purple':
        return {
          bg: 'rgba(139, 92, 246, 0.15)',
          border: 'rgba(139, 92, 246, 0.3)',
          text: colors.accentPurple,
        };
      case 'red':
        return {
          bg: 'rgba(239, 68, 68, 0.15)',
          border: 'rgba(239, 68, 68, 0.3)',
          text: colors.danger,
        };
      case 'gray':
        return {
          bg: 'rgba(255, 255, 255, 0.06)',
          border: 'rgba(255, 255, 255, 0.1)',
          text: colors.textSecondary,
        };
      case 'cyan':
      default:
        return {
          bg: 'rgba(0, 229, 255, 0.12)',
          border: 'rgba(0, 229, 255, 0.25)',
          text: colors.primary,
        };
    }
  };

  const badgeTheme = getBadgeColors();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: badgeTheme.bg,
          borderColor: badgeTheme.border,
          paddingVertical: size === 'sm' ? 3 : 6,
          paddingHorizontal: size === 'sm' ? 8 : 12,
        },
        style,
      ]}
    >
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text
        style={[
          styles.text,
          {
            color: badgeTheme.text,
            fontSize: size === 'sm' ? 11 : 12,
          },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontWeight: '600',
    letterSpacing: 0.1,
  },
});
