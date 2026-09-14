import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, theme } from '../../theme/colors';

interface AvatarProps {
  initials: string;
  size?: number;
  style?: ViewStyle;
  variant?: 'cyan' | 'purple' | 'gray';
}

export const Avatar: React.FC<AvatarProps> = ({
  initials,
  size = 40,
  style,
  variant = 'cyan',
}) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'purple':
        return colors.accentPurple;
      case 'gray':
        return '#334155';
      case 'cyan':
      default:
        return colors.primary;
    }
  };

  const getTextColor = () => {
    if (variant === 'cyan') return '#070B11';
    return '#FFFFFF';
  };

  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: getBackgroundColor(),
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: getTextColor(),
            fontSize: size * 0.38,
          },
        ]}
      >
        {initials}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  text: {
    fontWeight: '800',
    letterSpacing: -0.5,
  },
});
