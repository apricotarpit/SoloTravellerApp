import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile, SoloPersona } from '../types';
import { mockUser } from '../api/mockData';

interface AuthState {
  user: UserProfile;
  isOnboarded: boolean;
  isAuthenticated: boolean;
  selectedPersona: SoloPersona;
}

const initialState: AuthState = {
  user: mockUser,
  isOnboarded: true,
  isAuthenticated: true,
  selectedPersona: 'Adventure',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPersona: (state, action: PayloadAction<SoloPersona>) => {
      state.selectedPersona = action.payload;
      state.user.persona = action.payload;
    },
    setOnboarded: (state, action: PayloadAction<boolean>) => {
      state.isOnboarded = action.payload;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      state.user = { ...state.user, ...action.payload };
    },
    login: (state, action: PayloadAction<{ name: string; email: string }>) => {
      state.user.name = action.payload.name || state.user.name;
      state.user.email = action.payload.email || state.user.email;
      const initials = action.payload.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
      state.user.avatarInitials = initials || 'AR';
      state.isAuthenticated = true;
      state.isOnboarded = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.isOnboarded = false;
    },
  },
});

export const { setPersona, setOnboarded, setAuthenticated, updateProfile, login, logout } = authSlice.actions;
export default authSlice.reducer;
