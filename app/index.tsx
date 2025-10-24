// app/index.tsx
import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { storageService } from '@/lib/storage';
import { ROUTES } from '@/lib/routes';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const initializeApp = async () => {
      try {
        const [hasLaunched, isAuthenticated] = await Promise.all([
          storageService.hasLaunched(),
          storageService.isAuthenticated(),
        ]);

        if (!isMounted) return;

        if (!hasLaunched) {
          // First time opening the app
          await storageService.setHasLaunched();
          router.replace(ROUTES.onnBoarding);
        } else if (isAuthenticated) {
          // User is logged in
          router.replace(ROUTES.home);
        } else {
          // User needs to login
          router.replace(ROUTES.login);
        }
      } catch (error) {
        console.error('Error during app initialization:', error);
        
        if (!isMounted) return;
        
        router.replace(ROUTES.onnBoarding);
      }
    };

    initializeApp();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#C11574" />
      {/* Optional: Add your app logo here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});