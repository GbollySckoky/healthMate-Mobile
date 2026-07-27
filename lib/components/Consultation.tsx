import { StyleSheet, View, Animated  } from "react-native";
import { colors } from "../colors";
import { useEffect, useRef } from "react";

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

const DoctorCardSkeleton = () => (
  <View style={style.Card}>
    <View style={style.Flex}>
      <View style={{ width: 50 }}>
        <SkeletonBlock width={50} height={50} borderRadius={100} />
      </View>
      <View style={style.Flexs}>
        <View style={{ marginLeft: 10, flex: 1 }}>
          <SkeletonBlock width="60%" height={16} />
          <SkeletonBlock width="70%" height={12} style={{ marginTop: 8 }} />
          <SkeletonBlock width="45%" height={12} style={{ marginTop: 6 }} />
        </View>
        <SkeletonBlock width={50} height={12} />
      </View>
    </View>
    <View style={style.ButtonRow}>
      <SkeletonBlock width={60} height={16} />
      <SkeletonBlock width={110} height={34} borderRadius={8} />
    </View>
  </View>
);

export default DoctorCardSkeleton;

const style = StyleSheet.create({
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: colors.broderColor,
    padding: 9,
    borderRadius: 5,
    marginLeft: 10,
  },
  listWrapper: {
    marginBottom: 50,
  },
  Card: {
    padding: 15,
    borderColor: '#F2F2F2',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  Flex: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 5,
    marginBottom: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  Flexs: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  joinBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.lightRed,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  buttonTexts: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'LibreFranklin_600SemiBold',
  },
  ButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: '#F8F8F8',
    borderTopWidth: 2,
    marginTop: 15,
    paddingTop: 15,
  },
  smallText: {
    fontFamily: 'LibreFranklin_400Regular',
    fontSize: 12,
    color: colors.gray,
    fontStyle: 'normal',
    fontWeight: '400',
    paddingTop: 4,
  },
  Text: {
    fontFamily: 'LibreFranklin_400Regular',
    fontSize: 12,
    color: colors.purple,
    fontStyle: 'normal',
    fontWeight: '400',
    paddingTop: 4,
  },
  rating: {
    fontSize: 12,
    color: colors.gray,
    fontWeight: '400',
  },
  stateContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  stateText: {
    color: '#414651',
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
  },
  errorText: {
    color: '#B42318',
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#DD2591',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  retryText: {
    color: colors.white,
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
  },
});