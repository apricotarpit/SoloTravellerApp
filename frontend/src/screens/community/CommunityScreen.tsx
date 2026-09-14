import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  connectMatch,
  skipMatch,
  requestCostShare,
  setActiveTab,
} from '../../store/matchingSlice';
import { TravelerMatchCard } from '../../components/matching/TravelerMatchCard';
import { CostShareCard } from '../../components/matching/CostShareCard';
import { colors, theme } from '../../theme/colors';

export const CommunityScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { matches, costShares, activeTab } = useAppSelector(
    (state) => state.matching
  );

  const activeMatches = matches.filter((m) => m.status !== 'skipped');

  const handleConnect = (id: string, name: string) => {
    dispatch(connectMatch(id));
    Alert.alert(
      '✨ Connection Sent!',
      `You sent a travel buddy invite to ${name}. You can now coordinate itineraries and split expenses.`,
      [{ text: 'Awesome' }]
    );
  };

  const handleSkip = (id: string) => {
    dispatch(skipMatch(id));
  };

  const handleRequestJoin = (id: string, title: string) => {
    dispatch(requestCostShare(id));
    Alert.alert(
      '🎉 Request Sent',
      `Your request to join "${title}" has been sent to the host.`,
      [{ text: 'Great' }]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={styles.screenTitle}>Solo Community</Text>

        {/* Tab Selector */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => dispatch(setActiveTab('matches'))}
            style={[
              styles.tabButton,
              activeTab === 'matches' && styles.activeTabButton,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'matches' && styles.activeTabText,
              ]}
            >
              Traveler Matches ({activeMatches.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => dispatch(setActiveTab('cost_sharing'))}
            style={[
              styles.tabButton,
              activeTab === 'cost_sharing' && styles.activeTabButton,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'cost_sharing' && styles.activeTabText,
              ]}
            >
              Cost Sharing ({costShares.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Matches View */}
        {activeTab === 'matches' && (
          <View style={styles.list}>
            {activeMatches.map((m) => (
              <TravelerMatchCard
                key={m.id}
                match={m}
                onConnect={() => handleConnect(m.id, m.name)}
                onSkip={() => handleSkip(m.id)}
              />
            ))}
            {activeMatches.length === 0 && (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyTitle}>All caught up!</Text>
                <Text style={styles.emptySub}>
                  No more pending matches for your upcoming trips.
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Cost Sharing View */}
        {activeTab === 'cost_sharing' && (
          <View style={styles.list}>
            {costShares.map((p) => (
              <CostShareCard
                key={p.id}
                post={p}
                onRequestJoin={() => handleRequestJoin(p.id, p.title)}
              />
            ))}
          </View>
        )}
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
    marginBottom: 20,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.full,
    padding: 4,
    marginBottom: theme.spacing.xl,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabButton: {
    backgroundColor: colors.primary,
  },
  tabText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#070B11',
    fontWeight: '700',
  },
  list: {
    gap: 4,
  },
  emptyBox: {
    paddingVertical: 40,
    alignItems: 'center',
    gap: 8,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  emptySub: {
    color: colors.textSecondary,
    fontSize: 13,
  },
});
