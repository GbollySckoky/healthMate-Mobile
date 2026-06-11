// components/LoadingState/LoadingState.tsx

import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

type LoadingStateProps = {
  text?: string;
  size?: 'small' | 'large';
};

const LoadingState = ({
  text = 'Loading...',
  size = 'large',
}: LoadingStateProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color="#C11574" />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default LoadingState;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 14,
    color: '#717680',
    fontFamily: 'Inter_500Medium',
  },
});