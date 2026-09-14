import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Settings, Bookmark, ChevronRight, Bell, Shield, Sliders, LogOut } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppDispatch, useAppSelector } from '../../store';
import { logout } from '../../store/authSlice';
import { Avatar } from '../../components/common/Avatar';
import { StatsRow } from '../../components/home/StatsRow';
import { colors, theme } from '../../theme/colors';

interface ProfileScreenProps {
  navigation: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const recentTrips = useAppSelector((state) => state.trips.recentTrips);

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: () => dispatch(logout()) },
    ]);
  };

  const accountItems = [
    {
      label: 'Notifications',
      icon: <Bell size={18} color={colors.primary} />,
      onPress: () => Alert.alert('Notifications', 'Trip alerts and community messages are enabled.'),
    },
    {
      label: 'Privacy & Safety',
      icon: <Shield size={18} color={colors.accentPurple} />,
      onPress: () => navigation.navigate('Safety'),
    },
    {
      label: 'Travel Preferences',
      icon: <Sliders size={18} color={colors.primaryTeal} />,
      onPress: () => Alert.alert('Travel Preferences', `Style: ${user.persona}\nLanguages: ${user.languages?.join(', ')}`),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner Backdrop */}
        <View style={styles.bannerContainer}>
          <LinearGradient
            colors={['#0F2027', '#203A43', '#2C5364']}
            style={styles.bannerGradient}
          >
            <TouchableOpacity
              style={styles.settingsBtn}
              onPress={() => Alert.alert('Settings', 'App version 1.0.0 (Production Build)')}
            >
              <Settings size={18} color={colors.text} />
            </TouchableOpacity>
          </LinearGradient>

          {/* Avatar and User Info */}
          <View style={styles.profileHeader}>
            <Avatar initials={user.avatarInitials} size={70} variant="cyan" />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.metaLocation}>
              📍 {user.location} • {user.persona} solo
            </Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsWrapper}>
          <StatsRow
            countries={user.countriesVisited}
            days={user.totalDays}
            trips={user.totalTrips}
          />
        </View>

        {/* Recent Trips Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>RECENT TRIPS</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tripsList}>
            {recentTrips.map((trip) => (
              <View key={trip.id} style={styles.tripCard}>
                <Image source={{ uri: trip.imageUrl }} style={styles.tripThumb} />
                <View style={styles.tripInfo}>
                  <Text style={styles.tripDest}>{trip.destination}</Text>
                  <Text style={styles.tripDates}>
                    {trip.startDate} • {trip.totalDays} days
                  </Text>
                </View>
                <Bookmark size={18} color={colors.textMuted} />
              </View>
            ))}
          </View>
        </View>

        {/* Account Settings Menu */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          <View style={styles.accountMenu}>
            {accountItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={item.onPress}
                style={styles.menuItem}
              >
                <View style={styles.menuLeft}>
                  {item.icon}
                  <Text style={styles.menuLabel}>{item.label}</Text>
                </View>
                <ChevronRight size={18} color={colors.textMuted} />
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleLogout}
              style={[styles.menuItem, styles.logoutItem]}
            >
              <View style={styles.menuLeft}>
                <LogOut size={18} color={colors.danger} />
                <Text style={styles.logoutLabel}>Sign Out</Text>
              </View>
              <ChevronRight size={18} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
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
    paddingBottom: 120,
  },
  bannerContainer: {
    marginBottom: 20,
  },
  bannerGradient: {
    height: 120,
    paddingTop: 54,
    paddingHorizontal: 20,
    alignItems: 'flex-end',
  },
  settingsBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(7, 11, 17, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: -35,
    gap: 6,
  },
  name: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  metaLocation: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  statsWrapper: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: theme.spacing.xl,
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  viewAllText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  tripsList: {
    gap: 10,
  },
  tripCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    padding: 12,
    gap: 12,
  },
  tripThumb: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  tripInfo: {
    flex: 1,
    gap: 3,
  },
  tripDest: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  tripDates: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  accountMenu: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuLabel: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '500',
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutLabel: {
    color: colors.danger,
    fontSize: 15,
    fontWeight: '600',
  },
});
