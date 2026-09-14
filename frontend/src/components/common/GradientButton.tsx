import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, theme } from '../../theme/colors';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  size?: 'sm' | 'md' | 'lg';
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  icon,
  rightIcon,
  loading = false,
  disabled = false,
  style,
  textStyle,
  size = 'md',
}) => {
  const getGradientColors = () => {
    switch (variant) {
      case 'danger':
        return ['#FF3B69', '#DC2626'] as const;
      case 'secondary':
        return ['#1E2C3D', '#131D2A'] as const;
      case 'primary':
      default:
        return ['#00E5FF', '#00BFA5'] as const;
    }
  };

  const getHeight = () => {
    switch (size) {
      case 'sm':
        return 40;
      case 'lg':
        return 56;
      case 'md':
      default:
        return 50;
    }
  };

  if (variant === 'ghost') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[
          styles.ghostButton,
          { height: getHeight() },
          disabled && styles.disabled,
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={colors.primary} size="small" />
        ) : (
          <View style={styles.contentRow}>
            {icon && <View style={styles.iconLeft}>{icon}</View>}
            <Text style={[styles.ghostText, textStyle]}>{title}</Text>
            {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
          </View>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
      style={[
        styles.container,
        { height: getHeight() },
        disabled && styles.disabled,
        style,
      ]}
    >
      <LinearGradient
        colors={getGradientColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradient, { height: getHeight() }]}
      >
        {loading ? (
          <ActivityIndicator color={variant === 'primary' ? '#070B11' : '#FFFFFF'} size="small" />
        ) : (
          <View style={styles.contentRow}>
            {icon && <View style={styles.iconLeft}>{icon}</View>}
            <Text
              style={[
                styles.primaryText,
                variant === 'secondary' && styles.secondaryText,
                variant === 'danger' && styles.dangerText,
                textStyle,
              ]}
            >
              {title}
            </Text>
            {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    width: '100%',
  },
  gradient: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: theme.borderRadius.xl,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: '#070B11',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  secondaryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  dangerText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  ghostButton: {
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  ghostText: {
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: '600',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  disabled: {
    opacity: 0.5,
  },
});
