import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BudgetCategoryExpense } from '../types';
import { mockBudgetSummary } from '../api/mockData';

interface ExpenseItem {
  id: string;
  title: string;
  category: 'Flights' | 'Accommodation' | 'Food & Drink' | 'Transport' | 'Activities' | 'Other';
  amount: number;
  date: string;
}

interface BudgetState {
  totalBudget: number;
  currency: string;
  expenses: ExpenseItem[];
}

const initialExpenses: ExpenseItem[] = [
  { id: 'exp_1', title: 'Tokyo to Kyoto Shinkansen bullet train', category: 'Transport', amount: 35, date: 'Sept 22' },
  { id: 'exp_2', title: 'Ryokan Gion deposit (2 nights)', category: 'Accommodation', amount: 124, date: 'Sept 22' },
  { id: 'exp_3', title: 'Roundtrip Flight to Osaka/KIX', category: 'Flights', amount: 210, date: 'Sept 20' },
  { id: 'exp_4', title: 'Nishiki market lunch & matcha desserts', category: 'Food & Drink', amount: 68, date: 'Sept 23' },
];

const initialState: BudgetState = {
  totalBudget: mockBudgetSummary.totalBudget,
  currency: '$',
  expenses: initialExpenses,
};

export const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<{ title: string; category: ExpenseItem['category']; amount: number }>) => {
      state.expenses.unshift({
        id: `exp_${Date.now()}`,
        title: action.payload.title,
        category: action.payload.category,
        amount: action.payload.amount,
        date: 'Today',
      });
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter((e) => e.id !== action.payload);
    },
    updateBudget: (state, action: PayloadAction<number>) => {
      state.totalBudget = action.payload;
    },
  },
});

export const { addExpense, deleteExpense, updateBudget } = budgetSlice.actions;
export default budgetSlice.reducer;
