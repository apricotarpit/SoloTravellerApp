import { Destination } from '../types';

export type RootStackParamList = {
  Onboarding: undefined;
  PersonaQuiz: undefined;
  Login: undefined;
  MainTabs: undefined;
  DestinationDetail: { destination: Destination };
};

export type BottomTabParamList = {
  Home: undefined;
  Explore: undefined;
  Planner: { initialTab?: 'packing' | 'itinerary' | 'budget' } | undefined;
  Community: undefined;
  Safety: undefined;
  Profile: undefined;
};
