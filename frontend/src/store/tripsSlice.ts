import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Trip, Destination, ItineraryDay } from '../types';
import { mockUpcomingTrip, mockRecentTrips, mockTrendingDestinations, mockItineraryDays } from '../api/mockData';

interface TripsState {
  upcomingTrip: Trip;
  recentTrips: Trip[];
  destinations: Destination[];
  selectedRegion: string;
  searchQuery: string;
  bookmarkedDestinations: string[];
  itineraryDays: ItineraryDay[];
}

const initialState: TripsState = {
  upcomingTrip: mockUpcomingTrip,
  recentTrips: mockRecentTrips,
  destinations: mockTrendingDestinations,
  selectedRegion: 'All',
  searchQuery: '',
  bookmarkedDestinations: ['dest_kyoto'],
  itineraryDays: mockItineraryDays,
};

export const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    toggleBookmark: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.bookmarkedDestinations.includes(id)) {
        state.bookmarkedDestinations = state.bookmarkedDestinations.filter((dId) => dId !== id);
      } else {
        state.bookmarkedDestinations.push(id);
      }
    },
    setSelectedRegion: (state, action: PayloadAction<string>) => {
      state.selectedRegion = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    addItineraryDay: (state, action: PayloadAction<Omit<ItineraryDay, 'id' | 'dayNumber'>>) => {
      const newDay: ItineraryDay = {
        id: `it_${Date.now()}`,
        dayNumber: state.itineraryDays.length + 1,
        ...action.payload,
      };
      state.itineraryDays.push(newDay);
    },
  },
});

export const { toggleBookmark, setSelectedRegion, setSearchQuery, addItineraryDay } = tripsSlice.actions;
export default tripsSlice.reducer;
