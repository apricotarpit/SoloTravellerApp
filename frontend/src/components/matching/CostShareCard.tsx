import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Users, Calendar, Check, DollarSign } from 'lucide-react-native';
import { CostSharePost } from '../../types';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';
import { colors, theme } from '../../theme/colors';

interface CostShareCardProps {
  post: CostSharePost;
  onRequestJoin: () => void;
}

export const CostShareCard: React.FC<CostShareCardProps> = ({
  post,
  onRequestJoin,
}) => {
  const isFull = post.spotsTaken >= post.spotsTotal;
  const isRequested = !!post.hasRequested;

  return (
    <View style={styles.card}>
      {/* Top Destination & Price Badge */}
      <View style={styles.topRow}>
        <View style={styles.destInfo}>
          <Text style={styles.destinationTitle}>{post.title}</Text>
          <Text style={styles.destSub}>{post.destination}</Text>
        </View>

        <View style={styles.pricePill}>
          <Text style={styles.priceValue}>${post.costPerPerson}</Text>
          <Text style={styles.priceSub}>/person</Text>
        </View>
      </View>

      {/* Dates & Host Info */}
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Calendar size={14} color={colors.primary} />
          <Text style={styles.metaText}>{post.dates}</Text>
        </View>

        <View style={styles.metaItem}>
          <Users size={14} color={colors.accentPurple} />
          <Text style={styles.metaText}>
            {post.spotsTaken}/{post.spotsTotal} spots filled
          </Text>
        </View>
      </View>

      {/* Description */}
      <Text style={styles.descText}>{post.description}</Text>

      {/* Tags */}
      <View style={styles.tagsRow}>
        {post.tags.map((t, idx) => (
          <Badge key={idx} label={t} variant="gray" size="sm" />
        ))}
      </View>

      {/* Host info & action button */}
      <View style={styles.bottomRow}>
        <View style={styles.hostRow}>
          <Avatar initials={post.hostAvatar} size={32} variant="purple" />
          <Text style={styles.hostName}>Hosted by {post.hostName}</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          disabled={isFull || isRequested}
          onPress={onRequestJoin}
          style={[
            styles.joinBtn,
            isRequested && styles.requestedBtn,
            isFull && styles.fullBtn,
          ]}
        >
          {isRequested ? (
            <>
              <Check size={14} color="#10B981" />
              <Text style={styles.requestedText}>Requested</Text>
            </>
          ) : (
            <Text style={[styles.joinText, isFull && styles.fullText]}>
              {isFull ? 'Filled' : 'Request to Split'}
            </Text>
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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  destInfo: {
    flex: 1,
    gap: 2,
  },
  destinationTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  destSub: {
    color: colors.primaryTeal,
    fontSize: 12,
    fontWeight: '600',
  },
  pricePill: {
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    borderColor: 'rgba(0, 229, 255, 0.3)',
    borderWidth: 1,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  priceValue: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '800',
  },
  priceSub: {
    color: colors.textSecondary,
    fontSize: 10,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceElevated,
    padding: 10,
    borderRadius: theme.borderRadius.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  descText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  hostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hostName: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  joinBtn: {
    backgroundColor: colors.primary,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: 8,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  requestedBtn: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: '#10B981',
    borderWidth: 1,
  },
  fullBtn: {
    backgroundColor: colors.surfaceElevated,
  },
  joinText: {
    color: '#070B11',
    fontSize: 13,
    fontWeight: '700',
  },
  requestedText: {
    color: '#10B981',
    fontSize: 13,
    fontWeight: '700',
  },
  fullText: {
    color: colors.textMuted,
  },
});
