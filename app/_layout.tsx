import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { ModalProvider } from '@/context/ModalContext';
import '../global.css';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium';
import { Lato_700Bold } from '@expo-google-fonts/lato/700Bold';
import { Lato_400Regular } from '@expo-google-fonts/lato/400Regular';
import { LibreFranklin_600SemiBold } from '@expo-google-fonts/libre-franklin/600SemiBold';
import { LibreFranklin_400Regular } from '@expo-google-fonts/libre-franklin/400Regular';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
    Lato_700Bold,
    LibreFranklin_600SemiBold,
    LibreFranklin_400Regular,
    Lato_400Regular,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (fontsLoaded) {
      // Hide splash screen after app is ready
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Show nothing while fonts load
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 180 : 0}
    >
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
        <StatusBar style= {Platform.OS === 'ios' ? 'light' : "dark" }/>
        <ModalProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </ModalProvider>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});