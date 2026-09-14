import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { PackingTab } from '../../components/planner/PackingTab';
import { ItineraryTab } from '../../components/planner/ItineraryTab';
import { BudgetTab } from '../../components/planner/BudgetTab';
import { colors, theme } from '../../theme/colors';

type PlannerSubTab = 'packing' | 'itinerary' | 'budget';

interface TripPlannerScreenProps {
  route?: { params?: { initialTab?: PlannerSubTab } };
}

export const TripPlannerScreen: React.FC<TripPlannerScreenProps> = ({ route }) => {
  const [activeTab, setActiveTab] = useState<PlannerSubTab>(
    route?.params?.initialTab || 'packing'
  );

  useEffect(() => {
    if (route?.params?.initialTab) {
      setActiveTab(route?.params?.initialTab);
    }
  }, [route?.params?.initialTab]);

  const tabs: { key: PlannerSubTab; label: string }[] = [
    { key: 'packing', label: 'Packing' },
    { key: 'itinerary', label: 'Itinerary' },
    { key: 'budget', label: 'Budget' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Screen Header */}
        <Text style={styles.screenTitle}>Trip Planner</Text>

        {/* 3 Sub-Tabs Segmented Control */}
        <View style={styles.tabBar}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                activeOpacity={0.8}
                onPress={() => setActiveTab(tab.key)}
                style={[styles.tabButton, isActive && styles.activeTabButton]}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    isActive && styles.activeTabText,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Tab View Contents */}
        {activeTab === 'packing' && <PackingTab />}
        {activeTab === 'itinerary' && <ItineraryTab />}
        {activeTab === 'budget' && <BudgetTab />}
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
  tabButtonText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#070B11',
    fontWeight: '700',
  },
});
