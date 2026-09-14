import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useAppSelector } from '../../store';
import { EmergencySOSCard } from '../../components/safety/EmergencySOSCard';
import { EmergencyContactCard } from '../../components/safety/EmergencyContactCard';
import { SafetyEssentialsCard } from '../../components/safety/SafetyEssentialsCard';
import { SafetyPrinciplesList } from '../../components/safety/SafetyPrinciplesList';
import { colors } from '../../theme/colors';

export const SafetyHubScreen: React.FC = () => {
  const { activeDestination, emergencyContact, safetyPrinciples, localEmergency } =
    useAppSelector((state) => state.safety);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Safety Hub</Text>
          <Text style={styles.activeDestText}>
            Active: {activeDestination}
          </Text>
        </View>

        {/* Emergency SOS Hold Card */}
        <EmergencySOSCard />

        {/* Emergency Contact Card */}
        <EmergencyContactCard contact={emergencyContact} />

        {/* Country Essentials (110/119, Embassy) */}
        <SafetyEssentialsCard
          countryName="Japan"
          policeMedical={localEmergency.policeMedical}
          embassy={localEmergency.embassy}
        />

        {/* Safety Principles List */}
        <SafetyPrinciplesList principles={safetyPrinciples} />
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
  header: {
    gap: 4,
    marginBottom: 20,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  activeDestText: {
    color: colors.primaryTeal,
    fontSize: 13,
    fontWeight: '600',
  },
});
