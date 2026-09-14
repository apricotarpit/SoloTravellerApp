import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TravelerMatch, CostSharePost } from '../types';
import { mockTravelerMatches, mockCostSharePosts } from '../api/mockData';

interface MatchingState {
  matches: TravelerMatch[];
  costShares: CostSharePost[];
  activeTab: 'matches' | 'cost_sharing';
}

const initialState: MatchingState = {
  matches: mockTravelerMatches,
  costShares: mockCostSharePosts,
  activeTab: 'matches',
};

export const matchingSlice = createSlice({
  name: 'matching',
  initialState,
  reducers: {
    connectMatch: (state, action: PayloadAction<string>) => {
      const match = state.matches.find((m) => m.id === action.payload);
      if (match) {
        match.status = 'connected';
      }
    },
    skipMatch: (state, action: PayloadAction<string>) => {
      const match = state.matches.find((m) => m.id === action.payload);
      if (match) {
        match.status = 'skipped';
      }
    },
    requestCostShare: (state, action: PayloadAction<string>) => {
      const post = state.costShares.find((p) => p.id === action.payload);
      if (post && !post.hasRequested) {
        post.hasRequested = true;
        post.spotsTaken += 1;
      }
    },
    setActiveTab: (state, action: PayloadAction<'matches' | 'cost_sharing'>) => {
      state.activeTab = action.payload;
    },
  },
});

export const { connectMatch, skipMatch, requestCostShare, setActiveTab } = matchingSlice.actions;
export default matchingSlice.reducer;
