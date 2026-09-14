import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmergencyContact, SafetyPrinciple } from '../types';
import { mockEmergencyContact, mockSafetyPrinciples } from '../api/mockData';

interface SafetyState {
  activeDestination: string;
  isSOSActive: boolean;
  isLocationSharing: boolean;
  emergencyContact: EmergencyContact;
  safetyPrinciples: SafetyPrinciple[];
  localEmergency: {
    policeMedical: string;
    embassy: string;
  };
}

const initialState: SafetyState = {
  activeDestination: 'Kyoto, Japan',
  isSOSActive: false,
  isLocationSharing: false,
  emergencyContact: mockEmergencyContact,
  safetyPrinciples: mockSafetyPrinciples,
  localEmergency: {
    policeMedical: '110 / 119',
    embassy: '+81 3-3224-5000',
  },
};

export const safetySlice = createSlice({
  name: 'safety',
  initialState,
  reducers: {
    triggerSOS: (state, action: PayloadAction<boolean>) => {
      state.isSOSActive = action.payload;
    },
    toggleLocationSharing: (state) => {
      state.isLocationSharing = !state.isLocationSharing;
    },
    updateEmergencyContact: (state, action: PayloadAction<Partial<EmergencyContact>>) => {
      state.emergencyContact = { ...state.emergencyContact, ...action.payload };
    },
  },
});

export const { triggerSOS, toggleLocationSharing, updateEmergencyContact } = safetySlice.actions;
export default safetySlice.reducer;
