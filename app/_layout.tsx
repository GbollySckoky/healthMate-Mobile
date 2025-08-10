import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ModalProvider } from '@/context/ModalContext';
import '../global.css'
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium';
import { Lato_700Bold } from '@expo-google-fonts/lato/700Bold';
import { Lato_400Regular } from '@expo-google-fonts/lato/400Regular';
import { LibreFranklin_600SemiBold } from '@expo-google-fonts/libre-franklin/600SemiBold';
import { LibreFranklin_400Regular } from '@expo-google-fonts/libre-franklin/400Regular';



SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Libre-Franklin': require('../assets/fonts/LibreFranklin-Regular.ttf'),
    'Inter': require('../assets/fonts/Inter_28pt-Regular.ttf'),
    Inter_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
    Lato_700Bold,
    LibreFranklin_600SemiBold,
    LibreFranklin_400Regular,
    Lato_400Regular
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Show nothing while fonts load
  }

  return (
    <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar style="light" />
      <ModalProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      </ModalProvider>
    </SafeAreaView>
  );
}