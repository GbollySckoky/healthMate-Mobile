import { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Animated } from "react-native";
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

const OverviewCardSkeleton = () => (
  <View style={style.MinCard}>
    <SkeletonBlock width={24} height={24} borderRadius={12} style={style.skeletonIcon} />
    <SkeletonBlock width="70%" height={13} />
    <View style={style.valueContainer}>
      <SkeletonBlock width="60%" height={18} style={{ marginBottom: 8 }} />
      <SkeletonBlock width="45%" height={12} />
    </View>
  </View>
);

export default OverviewCardSkeleton

export const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 5, // Small padding to prevent edge overflow
  },
  MinCard: {
    padding: 15,
    borderColor: '#F1F1F1',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
    width: '48%',
    minHeight: 120,
  },
  pressedCard: {
    opacity: 0.7,
    backgroundColor: '#F8F8F8',
    transform: [{ scale: 0.98 }],
  },
  iconContainer: {
    paddingBottom: 15,
    fontSize: 24,
  },
  skeletonIcon: {
    marginBottom: 15,
  },
  valueContainer: {
    paddingTop: 4,
    flex: 1,
    justifyContent: 'flex-end', // Pushes content to bottom
  },
  stateContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    borderColor: '#F1F1F1',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  stateText: {
    fontSize: 14,
    color: '#414651',
    fontFamily: 'Lato_400Regular',
    marginTop: 8,
    textAlign: 'center',
  },
  stateSubText: {
    fontSize: 12,
    color: '#717680',
    fontFamily: 'Lato_400Regular',
    marginTop: 4,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: '#B42318',
    fontFamily: 'Lato_400Regular',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#DD2590',
    borderRadius: 8,
    marginTop: 12,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  retryText: {
    color: '#fff',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 3,
    color: colors.black,
    fontFamily: 'LibreFranklin_600SemiBold',
  },
});