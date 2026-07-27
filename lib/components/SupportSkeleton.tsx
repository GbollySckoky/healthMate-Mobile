import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { colors } from "../colors";

const useShimmer = () => {
  const opacity = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.35,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return opacity;
};

const SkeletonBlock = ({
  width,
  height,
  borderRadius = 6,
  style: extraStyle,
}: {
  width: number | `${number}%`;
  height: number;
  borderRadius?: number;
  style?: object;
}) => {
  const opacity = useShimmer();

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: '#E5E7EB',
          opacity,
        },
        extraStyle,
      ]}
    />
  );
};

const TicketCardSkeleton = () => (
  <View style={styles.card}>
    <View style={styles.cardTop}>
      <SkeletonBlock width={70} height={11} />
      <SkeletonBlock width={60} height={18} borderRadius={999} />
    </View>
    <SkeletonBlock width="80%" height={15} style={{ marginBottom: 8 }} />
    <SkeletonBlock width="100%" height={13} style={{ marginBottom: 4 }} />
    <SkeletonBlock width="60%" height={13} style={{ marginBottom: 10 }} />
    <View style={styles.cardFooter}>
      <SkeletonBlock width={50} height={11} />
      <View style={styles.dot} />
      <SkeletonBlock width={60} height={11} />
      <View style={styles.dot} />
      <SkeletonBlock width={70} height={11} />
    </View>
  </View>
);

export default TicketCardSkeleton

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  errorText: {
    color: colors.lightRed,
    fontSize: 13,
  },
  emptyText: {
    color: '#9CA3AF',
    fontSize: 13,
  },
  card: {
    borderColor: colors.broderColor,
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ticketNumber: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '500',
  },
  subject: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Lato_700Bold',
    color: colors.black,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  metaText: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 6,
  },
});