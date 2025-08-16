import { ReactNode } from 'react';
import { ScrollView } from 'react-native';

export const ScreenOverFlowLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: '#ffffff' }}
    >
      {children}
    </ScrollView>
  );
};
