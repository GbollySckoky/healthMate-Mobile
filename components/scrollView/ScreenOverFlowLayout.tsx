import { ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export const ScreenOverFlowLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 32,
  },
});
