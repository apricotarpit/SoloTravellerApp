import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Heart } from 'lucide-react-native';
import { Destination } from '../../types';
import { Badge } from '../common/Badge';
import { colors, theme } from '../../theme/colors';

interface DestinationCardProps {
  destination: Destination;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onPress: () => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  isBookmarked,
  onToggleBookmark,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.card}
    >
      <Image source={{ uri: destination.imageUrl }} style={styles.thumbnail} />

      <View style={styles.detailsContainer}>
        {/* Top title and bookmark */}
        <View style={styles.titleRow}>
          <Text style={styles.nameText} numberOfLines={1}>
            {destination.name}, {destination.country}
          </Text>
          <TouchableOpacity
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            onPress={onToggleBookmark}
          >
            <Heart
              size={18}
              color={isBookmarked ? colors.accentRose : colors.textMuted}
              fill={isBookmarked ? colors.accentRose : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        {/* Subtitle tagline */}
        <Text style={styles.taglineText} numberOfLines={1}>
          {destination.tagline}
        </Text>

        {/* Bottom row with Tag, Cost, and Safety Score */}
        <View style={styles.footerRow}>
          <Badge
            label={destination.category}
            variant="cyan"
            size="sm"
            style={styles.categoryBadge}
          />

          <View style={styles.metricsRow}>
            <Text style={styles.costText}>${destination.dailyCost}/day</Text>
            <Text style={styles.safetyScoreText}>{destination.safetyScore}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    marginBottom: 12,
    padding: 10,
    alignItems: 'center',
    gap: 12,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.lg,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
    marginRight: 8,
  },
  taglineText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '400',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  categoryBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  costText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  safetyScoreText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
  },
});
