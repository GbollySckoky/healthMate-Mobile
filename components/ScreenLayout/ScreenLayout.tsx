import { View } from 'react-native';
import { ReactNode } from 'react';

export const ScreenLayout = ({ children }: { children: ReactNode }) => (
  <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
    {children}
  </View>
);
