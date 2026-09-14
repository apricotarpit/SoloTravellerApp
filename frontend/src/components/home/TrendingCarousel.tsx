import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Destination } from '../../types';
import { colors, theme } from '../../theme/colors';

interface TrendingCarouselProps {
  destinations: Destination[];
  onSelectDestination: (destination: Destination) => void;
  onSeeAll?: () => void;
}

export const TrendingCarousel: React.FC<TrendingCarouselProps> = ({
  destinations,
  onSelectDestination,
  onSeeAll,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionHeader}>TRENDING FOR SOLOS</Text>
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {destinations.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.85}
            onPress={() => onSelectDestination(item)}
            style={styles.card}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.cityName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.costText}>${item.dailyCost}/day</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.xl,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionHeader: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  seeAllText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  scrollContent: {
    gap: 12,
  },
  card: {
    width: 140,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 90,
  },
  cardContent: {
    padding: 10,
    gap: 2,
  },
  cityName: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  costText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
});
