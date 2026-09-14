import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Bell, Shield, ChevronRight } from 'lucide-react-native';
import { useAppSelector } from '../../store';
import { HeroTripCard } from '../../components/home/HeroTripCard';
import { StatsRow } from '../../components/home/StatsRow';
import { QuickAccessGrid } from '../../components/home/QuickAccessGrid';
import { TrendingCarousel } from '../../components/home/TrendingCarousel';
import { Avatar } from '../../components/common/Avatar';
import { Destination } from '../../types';
import { colors, theme } from '../../theme/colors';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const user = useAppSelector((state) => state.auth.user);
  const upcomingTrip = useAppSelector((state) => state.trips.upcomingTrip);
  const destinations = useAppSelector((state) => state.trips.destinations);

  const handleSelectDestination = (destination: Destination) => {
    navigation.navigate('DestinationDetail', { destination });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header Bar */}
        <View style={styles.headerBar}>
          <View>
            <Text style={styles.greetingText}>Good morning</Text>
            <Text style={styles.userNameText}>{user.name} 👋</Text>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.bellButton}
              onPress={() => {}}
            >
              <Bell size={19} color={colors.text} />
              <View style={styles.bellDot} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Profile')}
            >
              <Avatar initials={user.avatarInitials} size={38} variant="cyan" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Upcoming Trip Card */}
        <HeroTripCard
          trip={upcomingTrip}
          onPress={() => navigation.navigate('Planner', { screen: 'Itinerary' })}
        />

        {/* Stats Row */}
        <StatsRow
          countries={user.countriesVisited}
          days={user.totalDays}
          trips={user.totalTrips}
        />

        {/* Quick Access Grid */}
        <QuickAccessGrid
          onPressPacking={() => navigation.navigate('Planner', { initialTab: 'packing' })}
          onPressItinerary={() => navigation.navigate('Planner', { initialTab: 'itinerary' })}
          onPressSafety={() => navigation.navigate('Safety')}
          onPressCommunity={() => navigation.navigate('Community')}
        />

        {/* Trending Destinations Carousel */}
        <TrendingCarousel
          destinations={destinations}
          onSelectDestination={handleSelectDestination}
          onSeeAll={() => navigation.navigate('Explore')}
        />

        {/* Pre-Trip Safety Check Banner */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Safety')}
          style={styles.safetyBanner}
        >
          <View style={styles.safetyIconCircle}>
            <Shield size={18} color={colors.primary} />
          </View>

          <View style={styles.safetyContent}>
            <Text style={styles.safetyTitle}>Pre-trip safety check</Text>
            <Text style={styles.safetySubtitle}>
              {upcomingTrip.safetyAttentionCount || 2} items need attention for {upcomingTrip.destination}
            </Text>
          </View>

          <ChevronRight size={18} color={colors.textSecondary} />
        </TouchableOpacity>
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
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greetingText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  userNameText: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bellButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bellDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: colors.primary,
  },
  safetyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: 'rgba(0, 229, 255, 0.25)',
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    padding: 14,
    gap: 12,
  },
  safetyIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safetyContent: {
    flex: 1,
    gap: 2,
  },
  safetyTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  safetySubtitle: {
    color: colors.textSecondary,
    fontSize: 12,
  },
});
