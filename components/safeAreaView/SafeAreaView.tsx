// SafeScreen.tsx
import React, { ReactNode } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SafeScreenProps {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
}

const SafeScreen = ({ children, style }: SafeScreenProps) => {
  return (
    <SafeAreaView style={[styles.container, style]} edges={["top", "left", "right"]}>
      {children}
    </SafeAreaView>
  );
};

export default SafeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", 
  },
});
