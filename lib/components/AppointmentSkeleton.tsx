import { useEffect, useRef } from "react";
import { StyleSheet, View, Animated   } from "react-native";

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

const AppointmentCardSkeleton = () => {
  return (
    <View style={style.Card}>
      <View style={style.Flex}>
        <View style={{ width: 50 }}>
          <SkeletonBlock width={50} height={50} borderRadius={100} />
        </View>
        <View style={style.Flexs}>
          <View style={{ marginLeft: 5, flex: 1 }}>
            <SkeletonBlock width="60%" height={16} />
            <View style={[style.flex, { marginTop: 10 }]}>
              <SkeletonBlock width={90} height={12} />
            </View>
            <View style={[style.flex, { marginTop: 8, marginBottom: 5 }]}>
              <SkeletonBlock width={110} height={12} />
            </View>
          </View>
          <SkeletonBlock width={70} height={22} borderRadius={20} />
        </View>
      </View>
      <View style={style.ButtonRow}>
        <SkeletonBlock
          width={100}
          height={34}
          borderRadius={8}
          style={{ marginTop: 14 }}
        />
        <SkeletonBlock
          width={100}
          height={34}
          borderRadius={8}
          style={{ marginTop: 14 }}
        />
      </View>
    </View>
  );
};

export default AppointmentCardSkeleton

export const style = StyleSheet.create({
  Flex: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 5,
    marginBottom: 2,
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: '#0553',
    borderRadius: 100,
  },
  Flexs: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  flex: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 3,
  },
  rescheduleBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    borderColor: '#D6D7DA',
    borderWidth: 1,
    marginTop: 14,
  },
  joinBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#DD2591',
    borderRadius: 8,
    marginTop: 14,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  ButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    borderTopColor: '#F8F8F8',
    borderTopWidth: 2,
    marginTop: 15,
  },
  flexs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  linkFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'LibreFranklin_400Regular',
    fontSize: 12,
    fontWeight: '400',
  },
  linkText: {
    color: '#DD2590',
    fontWeight: 400,
    fontSize: 12,
    // marginRight:3
  },
  stateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  stateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#414651',
    marginTop: 12,
    fontFamily: 'Lato_400Regular',
  },
  stateSubText: {
    fontSize: 14,
    color: '#717680',
    marginTop: 6,
    textAlign: 'center',
    fontFamily: 'Lato_400Regular',
  },
  errorMessage: {
    fontSize: 12,
    color: '#B42318',
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'Lato_400Regular',
  },
  Card: {
    padding: 15,
    borderColor: '#F2F2F2',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
});