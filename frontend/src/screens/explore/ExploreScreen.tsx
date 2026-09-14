import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import { Search } from 'lucide-react-native';
import { useAppDispatch, useAppSelector } from '../../store';
import { toggleBookmark } from '../../store/tripsSlice';
import { DestinationCard } from '../../components/explore/DestinationCard';
import { CategoryPills } from '../../components/explore/CategoryPills';
import { Destination } from '../../types';
import { colors, theme } from '../../theme/colors';

interface ExploreScreenProps {
  navigation: any;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const destinations = useAppSelector((state) => state.trips.destinations);
  const bookmarkedDestinations = useAppSelector((state) => state.trips.bookmarkedDestinations);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Asia', 'Europe', 'Americas', 'Hidden Gems'];

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      const matchesSearch =
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.tagline.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || dest.region === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [destinations, searchQuery, selectedCategory]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={styles.screenTitle}>Explore</Text>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Search size={18} color={colors.textMuted} />
          <TextInput
            placeholder="Search destinations..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>

        {/* Category Filter Pills */}
        <CategoryPills
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Destination Cards List */}
        <View style={styles.list}>
          {filteredDestinations.map((item) => (
            <DestinationCard
              key={item.id}
              destination={item}
              isBookmarked={bookmarkedDestinations.includes(item.id)}
              onToggleBookmark={() => dispatch(toggleBookmark(item.id))}
              onPress={() =>
                navigation.navigate('DestinationDetail', { destination: item })
              }
            />
          ))}

          {filteredDestinations.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No destinations found</Text>
              <Text style={styles.emptySubtitle}>
                Try searching for another city, country, or vibe.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingTop: 54,
    paddingHorizontal: 20,
    paddingBottom: 110,
  },
  screenTitle: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.6,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    paddingHorizontal: 16,
    height: 48,
    gap: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
  },
  list: {
    gap: 4,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    gap: 8,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  emptySubtitle: {
    color: colors.textSecondary,
    fontSize: 13,
  },
});
