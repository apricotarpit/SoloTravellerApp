import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ShieldCheck, Calendar, Sparkles, UserPlus, Check } from 'lucide-react-native';
import { TravelerMatch } from '../../types';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';
import { colors, theme } from '../../theme/colors';

interface TravelerMatchCardProps {
  match: TravelerMatch;
  onConnect: () => void;
  onSkip: () => void;
}

export const TravelerMatchCard: React.FC<TravelerMatchCardProps> = ({
  match,
  onConnect,
  onSkip,
}) => {
  const isConnected = match.status === 'connected';

  return (
    <View style={styles.card}>
      {/* Header with Avatar, Details, and Compatibility Badge */}
      <View style={styles.header}>
        <Avatar initials={match.avatarInitials} size={50} variant="cyan" />

        <View style={styles.profileInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{match.name}, {match.ageRange}</Text>
            {match.isVerified && (
              <ShieldCheck size={16} color={colors.primary} />
            )}
          </View>
          <Text style={styles.countryText}>{match.country} • {match.travelStyle} solo</Text>
        </View>

        <View style={styles.compatibilityBadge}>
          <Sparkles size={13} color="#070B11" />
          <Text style={styles.compatibilityScore}>{match.compatibilityScore}%</Text>
        </View>
      </View>

      {/* Trip Dates Row */}
      <View style={styles.datesRow}>
        <Calendar size={14} color={colors.primary} />
        <Text style={styles.datesText}>{match.travelDates}</Text>
      </View>

      {/* Bio */}
      <Text style={styles.bioText} numberOfLines={2}>
        {match.bio}
      </Text>

      {/* Interests Badges */}
      <View style={styles.interestsRow}>
        {match.interests.map((interest, i) => (
          <Badge key={i} label={interest} variant="gray" size="sm" />
        ))}
        <Badge label={match.approxBudget} variant="outline" size="sm" />
      </View>

      {/* Actions */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onSkip}
          style={styles.skipBtn}
        >
          <Text style={styles.skipBtnText}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onConnect}
          disabled={isConnected}
          style={[styles.connectBtn, isConnected && styles.connectedBtn]}
        >
          {isConnected ? (
            <>
              <Check size={16} color="#10B981" />
              <Text style={styles.connectedText}>Connected</Text>
            </>
          ) : (
            <>
              <UserPlus size={16} color="#070B11" />
              <Text style={styles.connectText}>Connect</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    marginBottom: 14,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileInfo: {
    flex: 1,
    gap: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  countryText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  compatibilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primary,
    borderRadius: theme.borderRadius.full,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  compatibilityScore: {
    color: '#070B11',
    fontSize: 12,
    fontWeight: '800',
  },
  datesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0, 229, 255, 0.06)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: theme.borderRadius.md,
  },
  datesText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  bioText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  interestsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  skipBtn: {
    flex: 1,
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipBtnText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  connectBtn: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  connectedBtn: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: '#10B981',
    borderWidth: 1,
  },
  connectText: {
    color: '#070B11',
    fontSize: 14,
    fontWeight: '700',
  },
  connectedText: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '700',
  },
});
