import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { colors, theme } from '../../theme/colors';

interface CustomCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'elevated' | 'surface' | 'glass' | 'alert';
  onPress?: () => void;
  activeOpacity?: number;
}

export const CustomCard: React.FC<CustomCardProps> = ({
  children,
  style,
  variant = 'surface',
  onPress,
  activeOpacity = 0.85,
}) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'elevated':
        return colors.surfaceElevated;
      case 'alert':
        return 'rgba(239, 68, 68, 0.08)';
      case 'glass':
        return 'rgba(19, 29, 42, 0.7)';
      case 'surface':
      default:
        return colors.surface;
    }
  };

  const getBorderColor = () => {
    if (variant === 'alert') {
      return 'rgba(239, 68, 68, 0.25)';
    }
    return colors.border;
  };

  const cardStyle = [
    styles.card,
    {
      backgroundColor: getBackgroundColor(),
      borderColor: getBorderColor(),
    },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={activeOpacity}
        onPress={onPress}
        style={cardStyle}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1,
    padding: theme.spacing.lg,
    overflow: 'hidden',
  },
});
