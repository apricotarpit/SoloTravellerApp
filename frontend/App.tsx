import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { View, StyleSheet, Platform } from 'react-native';
import { store } from './src/store';
import { RootNavigator } from './src/navigation/RootNavigator';
import { colors } from './src/theme/colors';

const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    primary: colors.primary,
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <View style={styles.rootContainer}>
          <View style={styles.appContainer}>
            <NavigationContainer theme={customDarkTheme}>
              <RootNavigator />
            </NavigationContainer>
            <StatusBar style="light" backgroundColor={colors.background} />
          </View>
        </View>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#020408',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appContainer: {
    flex: 1,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 440 : '100%',
    maxHeight: Platform.OS === 'web' ? 920 : '100%',
    backgroundColor: colors.background,
    overflow: 'hidden',
    borderWidth: Platform.OS === 'web' ? 1 : 0,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: Platform.OS === 'web' ? 36 : 0,
    shadowColor: '#00E5FF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: Platform.OS === 'web' ? 0.15 : 0,
    shadowRadius: 30,
  },
});
