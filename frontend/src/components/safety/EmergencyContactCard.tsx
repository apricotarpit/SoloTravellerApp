import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { Phone } from 'lucide-react-native';
import { EmergencyContact } from '../../types';
import { Avatar } from '../common/Avatar';
import { colors, theme } from '../../theme/colors';

interface EmergencyContactCardProps {
  contact: EmergencyContact;
}

export const EmergencyContactCard: React.FC<EmergencyContactCardProps> = ({
  contact,
}) => {
  const handleCall = () => {
    Alert.alert(
      `Call ${contact.name}?`,
      `Dial ${contact.phone} directly on your device.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call',
          onPress: () => Linking.openURL(`tel:${contact.phone}`),
        },
      ]
    );
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionHeader}>EMERGENCY CONTACT</Text>

      <View style={styles.card}>
        <Avatar initials={contact.avatarInitials} size={46} variant="cyan" />

        <View style={styles.info}>
          <Text style={styles.name}>{contact.name}</Text>
          <Text style={styles.phoneMeta}>
            {contact.phone} • {contact.relationship}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleCall}
          style={styles.callButton}
        >
          <Phone size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: theme.spacing.xl,
  },
  sectionHeader: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: theme.spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    padding: 14,
    gap: 14,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  phoneMeta: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '400',
  },
  callButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    borderColor: 'rgba(0, 229, 255, 0.3)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
