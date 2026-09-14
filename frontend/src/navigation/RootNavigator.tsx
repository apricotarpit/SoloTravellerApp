import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from '../store';
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';
import { PersonaQuizScreen } from '../screens/auth/PersonaQuizScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { DestinationDetailScreen } from '../screens/explore/DestinationDetailScreen';
import { BottomTabs } from './BottomTabs';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const { isOnboarded, isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      {!isOnboarded ? (
        <>
          <Stack.Screen name="Onboarding">
            {(props) => (
              <OnboardingScreen
                onComplete={() => props.navigation.navigate('PersonaQuiz')}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="PersonaQuiz">
            {(props) => (
              <PersonaQuizScreen
                onBack={() => props.navigation.goBack()}
                onNavigateToLogin={() => props.navigation.navigate('Login')}
                onSuccess={() => {}}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen
                onBack={() => props.navigation.goBack()}
                onSuccess={() => {}}
              />
            )}
          </Stack.Screen>
        </>
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={BottomTabs} />
          <Stack.Screen
            name="DestinationDetail"
            component={DestinationDetailScreen}
            options={{
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen name="PersonaQuiz">
            {(props) => (
              <PersonaQuizScreen
                onBack={() => props.navigation.goBack()}
                onNavigateToLogin={() => props.navigation.navigate('Login')}
                onSuccess={() => props.navigation.goBack()}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen
                onBack={() => props.navigation.goBack()}
                onSuccess={() => props.navigation.goBack()}
              />
            )}
          </Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
};
