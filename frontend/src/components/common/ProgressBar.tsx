import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, theme } from '../../theme/colors';

interface ProgressBarProps {
  progress: number; // 0 to 1
  height?: number;
  color?: string;
  useGradient?: boolean;
  style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 6,
  color = colors.primary,
  useGradient = true,
  style,
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  return (
    <View style={[styles.track, { height, borderRadius: height / 2 }, style]}>
      {clampedProgress > 0 && (
        <View
          style={[
            styles.fillContainer,
            { width: `${clampedProgress * 100}%`, height },
          ]}
        >
          {useGradient ? (
            <LinearGradient
              colors={['#00E5FF', '#00BFA5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.gradientFill, { height, borderRadius: height / 2 }]}
            />
          ) : (
            <View
              style={[
                styles.solidFill,
                { backgroundColor: color, height, borderRadius: height / 2 },
              ]}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
  },
  fillContainer: {
    overflow: 'hidden',
  },
  gradientFill: {
    width: '100%',
  },
  solidFill: {
    width: '100%',
  },
});
