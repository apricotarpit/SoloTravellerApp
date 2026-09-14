import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronDown, ChevronUp, MapPin } from 'lucide-react-native';
import { useAppSelector } from '../../store';
import { colors, theme } from '../../theme/colors';

export const ItineraryTab: React.FC = () => {
  const days = useAppSelector((state) => state.trips.itineraryDays);
  const [expandedDayId, setExpandedDayId] = useState<string | null>('it_1');

  const toggleExpand = (id: string) => {
    setExpandedDayId(expandedDayId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      {days.map((item) => {
        const isExpanded = expandedDayId === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.85}
            onPress={() => toggleExpand(item.id)}
            style={styles.dayCard}
          >
            {/* Left Tag Column */}
            <View style={styles.leftColumn}>
              <Text style={styles.dayNumberText}>Day {item.dayNumber}</Text>
              <View style={styles.tagBadge}>
                <Text style={styles.tagText}>{item.tag}</Text>
              </View>
            </View>

            {/* Right Details Column */}
            <View style={styles.rightColumn}>
              <View style={styles.headerRow}>
                <Text style={styles.titleText}>{item.title}</Text>
                {isExpanded ? (
                  <ChevronUp size={18} color={colors.textSecondary} />
                ) : (
                  <ChevronDown size={18} color={colors.textMuted} />
                )}
              </View>

              <Text style={styles.descText}>{item.description}</Text>

              {/* Expanded Activities List */}
              {isExpanded && item.activities && item.activities.length > 0 && (
                <View style={styles.activitiesContainer}>
                  {item.activities.map((act, index) => (
                    <View key={index} style={styles.activityRow}>
                      <MapPin size={13} color={colors.primary} />
                      <Text style={styles.activityText}>{act}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    gap: 12,
  },
  dayCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    gap: 16,
  },
  leftColumn: {
    alignItems: 'flex-start',
    width: 65,
    gap: 6,
  },
  dayNumberText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
  },
  tagBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  tagText: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '500',
  },
  rightColumn: {
    flex: 1,
    gap: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  descText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
  },
  activitiesContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 6,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  activityText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '500',
  },
});
