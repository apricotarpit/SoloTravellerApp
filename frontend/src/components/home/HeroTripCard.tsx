import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock } from 'lucide-react-native';
import { Trip } from '../../types';
import { Badge } from '../common/Badge';
import { colors, theme } from '../../theme/colors';

interface HeroTripCardProps {
  trip: Trip;
  onPress?: () => void;
}

export const HeroTripCard: React.FC<HeroTripCardProps> = ({ trip, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.container}
    >
      <ImageBackground
        source={{ uri: trip.imageUrl }}
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <LinearGradient
          colors={['rgba(7, 11, 17, 0.2)', 'rgba(7, 11, 17, 0.85)', '#070B11']}
          locations={[0, 0.6, 1]}
          style={styles.gradientOverlay}
        >
          {/* Top Pill Badge */}
          <View style={styles.topRow}>
            <Badge
              label={`Next trip • ${trip.daysRemaining} days`}
              variant="outline"
              size="sm"
            />
          </View>

          {/* Bottom Title & Date Details */}
          <View style={styles.bottomContent}>
            <Text style={styles.destinationTitle}>
              {trip.destination}, {trip.country}
            </Text>
            <View style={styles.dateRow}>
              <Clock size={14} color={colors.textSecondary} />
              <Text style={styles.dateText}>
                {trip.startDate} — {trip.endDate}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius['2xl'],
    overflow: 'hidden',
    height: 180,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  image: {
    borderRadius: theme.borderRadius['2xl'],
  },
  gradientOverlay: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomContent: {
    gap: 4,
  },
  destinationTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
});
