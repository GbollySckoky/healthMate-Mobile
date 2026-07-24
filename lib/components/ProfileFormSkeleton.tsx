import React from 'react';
import { View, StyleSheet } from 'react-native';
import Skeleton from './Skeleton';

export default function ProfileFormSkeleton() {
  return (
    <View style={styles.wrapper}>
      <View style={{ alignItems: 'center', marginBottom: 24 }}>
        <Skeleton width={90} height={90} borderRadius={90} />
        <Skeleton width={80} height={12} style={{ marginTop: 8 }} />
      </View>

      {Array.from({ length: 5 }).map((_, i) => (
        <View key={i} style={{ marginBottom: 16 }}>
          <Skeleton width={90} height={12} style={{ marginBottom: 6 }} />
          <Skeleton height={44} borderRadius={10} />
        </View>
      ))}

      <Skeleton height={50} borderRadius={10} style={{ marginTop: 10 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { padding: 20 },
});