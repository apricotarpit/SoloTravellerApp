export const colors = {
  // Deep Dark Backgrounds
  background: '#070B11',
  backgroundSecondary: '#0A1118',
  surface: '#0F1722',
  surfaceElevated: '#131D2A',
  surfaceCard: '#111A26',
  surfaceHover: '#162334',
  
  // Borders & Dividers
  border: '#1E2C3D',
  borderLight: 'rgba(255, 255, 255, 0.08)',
  borderActive: '#00E5FF',
  
  // Primary Cyan & Turquoise Gradients
  primary: '#00E5FF',
  primaryDark: '#00BFA5',
  primaryTeal: '#00D2B4',
  primaryGradient: ['#00E5FF', '#00BFA5'] as const,
  primaryCyanGlow: 'rgba(0, 229, 255, 0.15)',
  
  // Accent Colors
  accentPurple: '#8B5CF6',
  accentPink: '#EC4899',
  accentOrange: '#F97316',
  accentYellow: '#FBBF24',
  accentBlue: '#38BDF8',
  accentGreen: '#10B981',
  accentRose: '#FF3B69',
  
  // Category Quick Action Tint Backgrounds
  quickPacking: '#083344',
  quickItinerary: '#064E3B',
  quickSafety: '#1E1B4B',
  quickCommunity: '#3B0764',
  
  // Text Colors
  text: '#FFFFFF',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  textDark: '#070B11',
  
  // Status Colors
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  dangerGlow: 'rgba(239, 68, 68, 0.2)',
  info: '#00E5FF',
};

export const theme = {
  colors,
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    full: 9999,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    '4xl': 40,
  },
};
