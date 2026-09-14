import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PackingItem, PackingCategory } from '../types';
import { mockPackingItems } from '../api/mockData';

interface PackingState {
  items: PackingItem[];
  selectedCategory: PackingCategory | 'ALL';
}

const initialState: PackingState = {
  items: mockPackingItems,
  selectedCategory: 'ALL',
};

export const packingSlice = createSlice({
  name: 'packing',
  initialState,
  reducers: {
    togglePacked: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.isPacked = !item.isPacked;
      }
    },
    addItem: (state, action: PayloadAction<{ title: string; category: PackingCategory }>) => {
      const newItem: PackingItem = {
        id: `p_${Date.now()}`,
        title: action.payload.title,
        category: action.payload.category,
        isPacked: false,
        isCustom: true,
      };
      state.items.push(newItem);
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    setSelectedCategory: (state, action: PayloadAction<PackingCategory | 'ALL'>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { togglePacked, addItem, deleteItem, setSelectedCategory } = packingSlice.actions;
export default packingSlice.reducer;
