import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './authSlice';
import tripsReducer from './tripsSlice';
import packingReducer from './packingSlice';
import budgetReducer from './budgetSlice';
import safetyReducer from './safetySlice';
import matchingReducer from './matchingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trips: tripsReducer,
    packing: packingReducer,
    budget: budgetReducer,
    safety: safetyReducer,
    matching: matchingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
