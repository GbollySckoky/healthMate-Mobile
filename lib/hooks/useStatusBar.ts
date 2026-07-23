// import { useFocusEffect } from '@react-navigation/native';
// import { StatusBar } from 'expo-status-bar';
// import { Platform } from 'react-native';
// import { useCallback } from 'react';

// export interface StatusBarConfig {
//   style?: 'light' | 'dark' | 'auto';
//   translucent?: boolean;
//   backgroundColor?: string;
//   hidden?: boolean;
// }

// export const useStatusBar = (config: StatusBarConfig = {}) => {
//   const {
//     style = 'dark',
//     translucent = false,
//     backgroundColor = 'transparent',
//     hidden = false
//   } = config;

//   useFocusEffect(
//     useCallback(() => {
//       if (hidden) {
//         StatusBar.setStatusBarHidden(true, 'fade');
//         return () => {
//           StatusBar.setStatusBarHidden(false, 'fade');
//         };
//       }

//       // Configure for both platforms
//       StatusBar.setStatusBarStyle(style, true);
      
//       if (Platform.OS === 'android') {
//         StatusBar.setStatusBarTranslucent(translucent);
//         StatusBar.setStatusBarBackgroundColor(backgroundColor, true);
//       }

//       // Cleanup function (optional)
//       return () => {
//         // Reset to app default if needed
//       };
//     }, [style, translucent, backgroundColor, hidden])
//   );
// };