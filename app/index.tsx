// app/index.tsx
import { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const clearAndTest = async () => {
      // Clear storage for testing
      await AsyncStorage.removeItem('hasLaunched');
      console.log('Storage cleared - should go to onboarding now');
      
      const checkFirstLaunch = async () => {
        try {
          const hasLaunched = await AsyncStorage.getItem('hasLaunched');
          console.log('hasLaunched value:', hasLaunched);
  
          if (!hasLaunched) {
            console.log('First launch detected - navigating to onboarding');
            await AsyncStorage.setItem('hasLaunched', 'true');
            router.replace('/onboarding');
          } else {
            console.log('Not first launch - navigating to home');
            router.replace('/(tabs)/home');
          }
        } catch (error) {
          console.error('Error checking first launch:', error);
          router.replace('/onboarding');
        } finally {
          setIsLoading(false);
        }
      };
  
      checkFirstLaunch();
    };
  
    clearAndTest();
  }, [router]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#C11574" />
      </View>
    );
  }

  return null; 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
