import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import { AlertTriangle, ShieldCheck } from 'lucide-react-native';
import { colors, theme } from '../../theme/colors';

interface EmergencySOSCardProps {
  onSOSActivated?: () => void;
}

export const EmergencySOSCard: React.FC<EmergencySOSCardProps> = ({
  onSOSActivated,
}) => {
  const [isHolding, setIsHolding] = useState(false);
  const [sosSent, setSosSent] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    setIsHolding(true);
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        setSosSent(true);
        setIsHolding(false);
        if (onSOSActivated) onSOSActivated();
        Alert.alert(
          '🚨 Emergency SOS Activated',
          'Your emergency coordinates and itinerary have been broadcasted to your trusted contact (María Rivera) and local authorities.',
          [{ text: 'Dismiss', onPress: () => setSosSent(false) }]
        );
      }
    });
  };

  const handlePressOut = () => {
    if (!sosSent) {
      setIsHolding(false);
      Animated.timing(progressAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.container,
        sosSent && styles.containerActivated,
        isHolding && styles.containerHolding,
      ]}
    >
      {/* Background fill progress */}
      <Animated.View
        style={[
          styles.progressFill,
          { width: progressWidth },
        ]}
      />

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          {sosSent ? (
            <ShieldCheck size={28} color="#10B981" />
          ) : (
            <AlertTriangle size={28} color={colors.accentRose} />
          )}
        </View>

        <Text style={styles.title}>
          {sosSent ? 'SOS TRANSMITTED' : 'Emergency SOS'}
        </Text>

        <Text style={styles.subtitle}>
          {isHolding
            ? 'Keep holding to alert emergency services...'
            : sosSent
            ? 'Alert sent to María Rivera & Local Police'
            : 'Hold to alert emergency services'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 59, 105, 0.08)',
    borderColor: 'rgba(255, 59, 105, 0.25)',
    borderWidth: 1,
    borderRadius: theme.borderRadius['2xl'],
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
    overflow: 'hidden',
    position: 'relative',
  },
  containerHolding: {
    borderColor: colors.accentRose,
    backgroundColor: 'rgba(255, 59, 105, 0.15)',
  },
  containerActivated: {
    borderColor: colors.success,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  progressFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 59, 105, 0.3)',
  },
  content: {
    alignItems: 'center',
    gap: 8,
    zIndex: 2,
  },
  iconContainer: {
    marginBottom: 2,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
});
