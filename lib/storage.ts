// lib/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export const STORAGE_KEYS = {
  HAS_LAUNCHED: 'app.hasLaunched',    
  AUTH_TOKEN: 'app.authToken',      
  USER_DATA: 'app.userData',          
  REFRESH_TOKEN: 'app.refreshToken',
} as const;

export const storageService = {
  // First launch (use AsyncStorage - not sensitive)
  hasLaunched: async (): Promise<boolean> => {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.HAS_LAUNCHED);
    return value !== null;
  },

  setHasLaunched: async (): Promise<void> => {
    await AsyncStorage.setItem(STORAGE_KEYS.HAS_LAUNCHED, 'true');
  },

  // Auth Token (use SecureStore - sensitive data)
  getAuthToken: async (): Promise<string | null> => {
    return await SecureStore.getItemAsync(STORAGE_KEYS.AUTH_TOKEN);
  },

  setAuthToken: async (token: string): Promise<void> => {
    await SecureStore.setItemAsync(STORAGE_KEYS.AUTH_TOKEN, token);
  },

  removeAuthToken: async (): Promise<void> => {
    await SecureStore.deleteItemAsync(STORAGE_KEYS.AUTH_TOKEN);
  },

  // Check if user is authenticated
  isAuthenticated: async (): Promise<boolean> => {
    const token = await SecureStore.getItemAsync(STORAGE_KEYS.AUTH_TOKEN);
    return token !== null;
  },

//   // User Data (use AsyncStorage - not as sensitive)
//   getUserData: async (): Promise<any | null> => {
//     const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
//     return data ? JSON.parse(data) : null;
//   },

//   setUserData: async (userData: any): Promise<void> => {
//     await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
//   },

  // Clear all auth data on logout
  clearAuthData: async (): Promise<void> => {
    await Promise.all([
      SecureStore.deleteItemAsync(STORAGE_KEYS.AUTH_TOKEN),
      AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA),
    ]);
  },

  // Dev/Testing utilities
  clearAll: async (): Promise<void> => {
    if (__DEV__) {
      await Promise.all([
        AsyncStorage.clear(),
        SecureStore.deleteItemAsync(STORAGE_KEYS.AUTH_TOKEN).catch(() => {}),
      ]);
    }
  },
};