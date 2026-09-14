export type SoloPersona = 'Adventure' | 'Culture' | 'Slow Travel';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarInitials: string;
  location: string;
  persona: SoloPersona;
  countriesVisited: number;
  totalDays: number;
  totalTrips: number;
  bio?: string;
  languages?: string[];
  isVerified?: boolean;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  tagline: string;
  category: string; // 'City' | 'Nature' | 'Food' | 'Wine & Art' | 'Adventure'
  dailyCost: number;
  safetyScore: number;
  imageUrl: string;
  region: 'Asia' | 'Europe' | 'Americas' | 'Africa' | 'Oceania' | 'Hidden Gems';
  description: string;
  bestTimeToVisit?: string;
  popularActivities?: string[];
  isBookmarked?: boolean;
}

export interface Trip {
  id: string;
  destination: string;
  country: string;
  startDate: string;
  endDate: string;
  daysRemaining: number;
  totalDays: number;
  imageUrl: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  safetyAttentionCount?: number;
}

export type PackingCategory = 'DOCUMENTS' | 'TECH' | 'GEAR' | 'HEALTH' | 'FINANCE' | 'CLOTHING';

export interface PackingItem {
  id: string;
  title: string;
  category: PackingCategory;
  isPacked: boolean;
  isCustom?: boolean;
}

export interface ItineraryDay {
  id: string;
  dayNumber: number;
  tag: string; // 'Free' | 'Full day' | 'Early start' | 'Flexible'
  title: string;
  description: string;
  activities?: string[];
}

export interface BudgetCategoryExpense {
  category: 'Flights' | 'Accommodation' | 'Food & Drink' | 'Transport' | 'Activities' | 'Other';
  amount: number;
  color: string;
  percentage: number;
}

export interface BudgetSummary {
  totalBudget: number;
  totalSpent: number;
  currency: string;
  categories: BudgetCategoryExpense[];
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  avatarInitials: string;
}

export interface SafetyPrinciple {
  id: string;
  icon: 'shield' | 'wifi' | 'phone' | 'map-pin';
  title: string;
  description: string;
}

export interface TravelerMatch {
  id: string;
  name: string;
  ageRange: string;
  country: string;
  avatarInitials: string;
  destination: string;
  travelDates: string;
  travelStyle: SoloPersona;
  interests: string[];
  approxBudget: string;
  compatibilityScore: number;
  isVerified: boolean;
  bio: string;
  status?: 'pending' | 'connected' | 'skipped';
}

export interface CostSharePost {
  id: string;
  title: string;
  destination: string;
  dates: string;
  hostName: string;
  hostAvatar: string;
  description: string;
  totalExpense: number;
  costPerPerson: number;
  spotsTotal: number;
  spotsTaken: number;
  tags: string[];
  hasRequested?: boolean;
}
