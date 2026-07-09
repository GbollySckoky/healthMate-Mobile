// app/_layout.tsx
import 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ModalProvider } from '@/context/ModalContext';
import '../global.css';

import {
  QueryClient,
  QueryClientProvider,
  // useQuery,
} from '@tanstack/react-query';

// Fonts
import {
  Inter_600SemiBold,
  Inter_400Regular,
  Inter_500Medium,
} from '@expo-google-fonts/inter';
import { Lato_700Bold, Lato_400Regular } from '@expo-google-fonts/lato';
import {
  LibreFranklin_600SemiBold,
  LibreFranklin_400Regular,
} from '@expo-google-fonts/libre-franklin';
import Toast from 'react-native-toast-message';

// Keep splash visible
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = useState(false);
  const queryClient = new QueryClient();

  const [fontsLoaded, fontError] = useFonts({
    Inter_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
    Lato_700Bold,
    LibreFranklin_600SemiBold,
    LibreFranklin_400Regular,
    Lato_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      setIsAppReady(true);
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!isAppReady) {
    return (
      <SafeAreaProvider style={styles.container}>
        <StatusBar style="dark" translucent backgroundColor="transparent" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#C11574" />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaProvider style={styles.container}>
          <StatusBar style="dark" translucent backgroundColor="transparent" />
          <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={0}
          >
            <ModalProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="onboarding" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="profile" />
                <Stack.Screen name="settings" />
                <Stack.Screen name="auth" />
              </Stack>
              <Toast
                ref={(ref) => Toast.setRef(ref)}
                style={{ paddingTop: 10 }}
              />
            </ModalProvider>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
