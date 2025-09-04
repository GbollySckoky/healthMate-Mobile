// app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ModalProvider } from '@/context/ModalContext';
import '../global.css';

// Fonts
import {
  Inter_600SemiBold,
  Inter_400Regular,
  Inter_500Medium,
} from '@expo-google-fonts/inter';
import {
  Lato_700Bold,
  Lato_400Regular,
} from '@expo-google-fonts/lato';
import {
  LibreFranklin_600SemiBold,
  LibreFranklin_400Regular,
} from '@expo-google-fonts/libre-franklin';

// Keep splash visible
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = useState(false);

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
    <SafeAreaProvider style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <ModalProvider>
        <Stack screenOptions={{ headerShown: false, }}>
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </ModalProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
