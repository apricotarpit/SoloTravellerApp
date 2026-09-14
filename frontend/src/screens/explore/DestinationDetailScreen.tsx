import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { ChevronLeft, Heart, Shield, DollarSign, Calendar, MapPin } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../../store';
import { toggleBookmark } from '../../store/tripsSlice';
import { Badge } from '../../components/common/Badge';
import { GradientButton } from '../../components/common/GradientButton';
import { RootStackParamList } from '../../navigation/types';
import { colors, theme } from '../../theme/colors';

type DestinationDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'DestinationDetail'>;

export const DestinationDetailScreen: React.FC<DestinationDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { destination } = route.params;
  const dispatch = useAppDispatch();
  const bookmarkedDestinations = useAppSelector((state) => state.trips.bookmarkedDestinations);
  const isBookmarked = bookmarkedDestinations.includes(destination.id);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image Header */}
        <ImageBackground
          source={{ uri: destination.imageUrl }}
          style={styles.heroImage}
        >
          <LinearGradient
            colors={['rgba(7, 11, 17, 0.3)', 'rgba(7, 11, 17, 0.7)', '#070B11']}
            style={styles.heroGradient}
          >
            {/* Top Bar Navigation */}
            <View style={styles.topNav}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.navButton}
              >
                <ChevronLeft size={22} color={colors.text} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => dispatch(toggleBookmark(destination.id))}
                style={styles.navButton}
              >
                <Heart
                  size={20}
                  color={isBookmarked ? colors.accentRose : colors.text}
                  fill={isBookmarked ? colors.accentRose : 'transparent'}
                />
              </TouchableOpacity>
            </View>

            {/* Destination Titles */}
            <View style={styles.heroTitles}>
              <Badge label={destination.category} variant="cyan" size="sm" />
              <Text style={styles.destinationName}>{destination.name}</Text>
              <Text style={styles.countryName}>{destination.country}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>

        {/* Content Body */}
        <View style={styles.body}>
          {/* Metrics Row */}
          <View style={styles.metricsRow}>
            <View style={styles.metricBox}>
              <DollarSign size={18} color={colors.primaryTeal} />
              <Text style={styles.metricVal}>${destination.dailyCost}</Text>
              <Text style={styles.metricSub}>daily average</Text>
            </View>

            <View style={styles.metricBox}>
              <Shield size={18} color={colors.primary} />
              <Text style={styles.metricVal}>{destination.safetyScore}/100</Text>
              <Text style={styles.metricSub}>safety score</Text>
            </View>

            <View style={styles.metricBox}>
              <Calendar size={18} color={colors.accentPurple} />
              <Text style={styles.metricVal}>Oct–May</Text>
              <Text style={styles.metricSub}>best season</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ABOUT</Text>
            <Text style={styles.descText}>{destination.description}</Text>
          </View>

          {/* Popular Activities */}
          {destination.popularActivities && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>SOLO HIGHLIGHTS</Text>
              <View style={styles.activitiesList}>
                {destination.popularActivities.map((act, index) => (
                  <View key={index} style={styles.activityCard}>
                    <MapPin size={16} color={colors.primary} />
                    <Text style={styles.activityText}>{act}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Plan Trip CTA Button */}
          <GradientButton
            title={`Plan Trip to ${destination.name}`}
            onPress={() => {
              navigation.navigate('MainTabs');
            }}
            size="lg"
            style={{ marginTop: 12 }}
          />
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
    paddingBottom: 40,
  },
  heroImage: {
    width: '100%',
    height: 300,
  },
  heroGradient: {
    flex: 1,
    paddingTop: 54,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(7, 11, 17, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitles: {
    gap: 4,
  },
  destinationName: {
    color: colors.text,
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  countryName: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '500',
  },
  body: {
    paddingHorizontal: 20,
    gap: 24,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  metricBox: {
    flex: 1,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    padding: 14,
    alignItems: 'center',
    gap: 4,
  },
  metricVal: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  metricSub: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '500',
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  descText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
  },
  activitiesList: {
    gap: 8,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.lg,
    padding: 12,
    gap: 10,
  },
  activityText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
});
