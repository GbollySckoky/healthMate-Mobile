// components/ProfileSkeleton.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '@/lib/colors';
import Skeleton from './Skeleton';

export default function ProfileSkeleton() {
  return (
    <View>
      {/* Avatar + name + age */}
      <View style={styles.header}>
        <Skeleton width={100} height={100} borderRadius={100} />
        <Skeleton width={140} height={18} style={{ marginTop: 12 }} />
        <Skeleton width={60} height={12} style={{ marginTop: 8 }} />
      </View>

      {/* Account Information label */}
      <Skeleton width={160} height={14} style={styles.sectionLabel} />

      {/* Account Info card */}
      <View style={styles.card}>
        {Array.from({ length: 4 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.row,
              i === 3 && { borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 },
            ]}
          >
            <Skeleton width={24} height={24} borderRadius={12} />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Skeleton width={70} height={10} />
              <Skeleton width="60%" height={14} style={{ marginTop: 6 }} />
            </View>
          </View>
        ))}
      </View>

      {/* Other label */}
      <Skeleton width={80} height={14} style={styles.sectionLabel} />

      {/* Other menu card */}
      <View style={styles.card}>
        {Array.from({ length: 3 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.menuRow,
              i === 2 && { borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 },
            ]}
          >
            <Skeleton width={22} height={22} borderRadius={6} />
            <Skeleton width="40%" height={14} style={{ marginLeft: 12 }} />
          </View>
        ))}
      </View>

      {/* Log out button */}
      <Skeleton height={50} borderRadius={10} style={{ marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  sectionLabel: {
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 12,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    paddingBottom: 15,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    paddingBottom: 15,
  },
});