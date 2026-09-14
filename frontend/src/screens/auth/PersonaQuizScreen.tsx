import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Compass, ChevronLeft, Mountain, Landmark, Coffee } from 'lucide-react-native';
import { useAppDispatch, useAppSelector } from '../../store';
import { setPersona, login } from '../../store/authSlice';
import { GradientButton } from '../../components/common/GradientButton';
import { SoloPersona } from '../../types';
import { colors, theme } from '../../theme/colors';

interface PersonaQuizScreenProps {
  onBack?: () => void;
  onNavigateToLogin?: () => void;
  onSuccess: () => void;
}

export const PersonaQuizScreen: React.FC<PersonaQuizScreenProps> = ({
  onBack,
  onNavigateToLogin,
  onSuccess,
}) => {
  const dispatch = useAppDispatch();
  const currentPersona = useAppSelector((state) => state.auth.selectedPersona);

  const [name, setName] = useState('Alex Rivera');
  const [email, setEmail] = useState('alex@example.com');
  const [selected, setSelected] = useState<SoloPersona>(currentPersona || 'Adventure');

  const personaOptions: { type: SoloPersona; label: string; icon: React.ReactNode }[] = [
    {
      type: 'Adventure',
      label: 'Adventure',
      icon: <Mountain size={22} color={selected === 'Adventure' ? colors.primary : colors.textSecondary} />,
    },
    {
      type: 'Culture',
      label: 'Culture',
      icon: <Landmark size={22} color={selected === 'Culture' ? colors.primary : colors.textSecondary} />,
    },
    {
      type: 'Slow Travel',
      label: 'Slow Travel',
      icon: <Coffee size={22} color={selected === 'Slow Travel' ? colors.primary : colors.textSecondary} />,
    },
  ];

  const handleSubmit = () => {
    dispatch(setPersona(selected));
    dispatch(login({ name, email }));
    onSuccess();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top Back Nav & Logo */}
        <View style={styles.topNav}>
          {onBack && (
            <TouchableOpacity onPress={onBack} style={styles.backBtn}>
              <ChevronLeft size={20} color={colors.textSecondary} />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
          )}

          <View style={styles.logoRow}>
            <View style={styles.logoIconCircle}>
              <Compass size={18} color="#070B11" />
            </View>
            <Text style={styles.logoText}>WANDR SOLO</Text>
          </View>
        </View>

        {/* Heading */}
        <View style={styles.headingSection}>
          <Text style={styles.title}>What kind of solo are you?</Text>
          <Text style={styles.subtitle}>We'll personalise your experience.</Text>
        </View>

        {/* Persona Option Cards */}
        <View style={styles.personaGrid}>
          {personaOptions.map((opt) => {
            const isSelected = selected === opt.type;
            return (
              <TouchableOpacity
                key={opt.type}
                activeOpacity={0.85}
                onPress={() => setSelected(opt.type)}
                style={[
                  styles.personaCard,
                  isSelected && styles.personaCardActive,
                ]}
              >
                <View style={styles.personaIconBox}>{opt.icon}</View>
                <Text
                  style={[
                    styles.personaLabel,
                    isSelected && styles.personaLabelActive,
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Inputs */}
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>YOUR NAME</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Alex Rivera"
              placeholderTextColor={colors.textMuted}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>EMAIL</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. alex@example.com"
              placeholderTextColor={colors.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Create Account Button */}
        <View style={styles.bottomSection}>
          <GradientButton
            title="Create my account"
            onPress={handleSubmit}
            size="lg"
          />

          <TouchableOpacity
            onPress={onNavigateToLogin}
            style={styles.switchAuthBtn}
          >
            <Text style={styles.switchAuthText}>
              Already have an account?{' '}
              <Text style={styles.switchAuthHighlight}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingTop: 54,
    paddingHorizontal: 24,
    paddingBottom: 40,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  topNav: {
    gap: 16,
    marginBottom: 20,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
  },
  backText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  headingSection: {
    gap: 8,
    marginBottom: 28,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: '400',
  },
  personaGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 32,
  },
  personaCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  personaCardActive: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(0, 229, 255, 0.08)',
  },
  personaIconBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  personaLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  personaLabelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  formSection: {
    gap: 20,
    marginBottom: 32,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    paddingVertical: 16,
    paddingHorizontal: 18,
    color: colors.text,
    fontSize: 15,
    fontWeight: '500',
  },
  bottomSection: {
    gap: 16,
    alignItems: 'center',
  },
  switchAuthBtn: {
    padding: 8,
  },
  switchAuthText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  switchAuthHighlight: {
    color: colors.primary,
    fontWeight: '600',
  },
});
