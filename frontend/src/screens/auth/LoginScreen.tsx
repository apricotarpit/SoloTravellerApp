import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Compass, ChevronLeft } from 'lucide-react-native';
import { useAppDispatch } from '../../store';
import { login } from '../../store/authSlice';
import { GradientButton } from '../../components/common/GradientButton';
import { colors, theme } from '../../theme/colors';

interface LoginScreenProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onBack, onSuccess }) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('alex@example.com');
  const [password, setPassword] = useState('••••••••');

  const handleLogin = () => {
    dispatch(login({ name: 'Alex Rivera', email }));
    onSuccess();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Top Nav */}
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <ChevronLeft size={20} color={colors.textSecondary} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.logoRow}>
          <View style={styles.logoIconCircle}>
            <Compass size={18} color="#070B11" />
          </View>
          <Text style={styles.logoText}>WANDR SOLO</Text>
        </View>

        <View style={styles.headingSection}>
          <Text style={styles.title}>Welcome back.</Text>
          <Text style={styles.subtitle}>Sign in to continue your journey.</Text>
        </View>

        {/* Inputs */}
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>EMAIL</Text>
            <TextInput
              style={styles.input}
              placeholder="alex@example.com"
              placeholderTextColor={colors.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>PASSWORD</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={colors.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>

        <GradientButton
          title="Sign In"
          onPress={handleLogin}
          size="lg"
          style={{ marginTop: 24 }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingTop: 54,
    paddingHorizontal: 24,
    flex: 1,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 24,
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
    marginBottom: 24,
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
    marginBottom: 32,
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
  },
  formSection: {
    gap: 20,
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
  },
});
