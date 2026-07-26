import { BtnFlex, Card } from "@/components/typography/Typography";
import { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { Animated } from "react-native";
import { View } from "react-native";

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

const AppointmentDetailsSkeleton = () => (
  <>
    <View style={styles.container}>
      <SkeletonBlock width={80} height={80} borderRadius={40} />
      <View style={styles.infoContainer}>
        <SkeletonBlock width="70%" height={18} />
        <SkeletonBlock width="45%" height={13} style={{ marginTop: 10 }} />
        <SkeletonBlock width="60%" height={13} style={{ marginTop: 10 }} />
      </View>
    </View>

    <Card>
      <View style={styles.detailRow}>
        <SkeletonBlock width={60} height={13} style={{ marginBottom: 5 }} />
        <SkeletonBlock width={80} height={22} borderRadius={20} />
      </View>
      <View style={styles.divider} />
      {[1, 2, 3, 4].map((key) => (
        <View
          key={key}
          style={[styles.enhancedItemContainer, key === 4 && styles.lastItem]}
        >
          <View style={styles.contentWrapper}>
            <SkeletonBlock width={90} height={13} style={{ marginBottom: 8 }} />
            <SkeletonBlock width="80%" height={13} />
          </View>
          {key !== 4 && <View style={styles.divider} />}
        </View>
      ))}
    </Card>

    <Card>
      {[1, 2, 3].map((key) => (
        <View key={key}>
          <View style={styles.actionRow}>
            <View style={{ gap: 6 }}>
              <SkeletonBlock width={120} height={14} />
              <SkeletonBlock width={160} height={12} />
            </View>
            <SkeletonBlock width={18} height={18} borderRadius={9} />
          </View>
          {key !== 3 && <View style={styles.divider} />}
        </View>
      ))}
    </Card>

    <BtnFlex>
      <SkeletonBlock width="47%" height={44} borderRadius={8} />
      <SkeletonBlock width="47%" height={44} borderRadius={8} />
    </BtnFlex>
  </>
);

export default AppointmentDetailsSkeleton

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    borderColor: '#F2F2F2',
    borderWidth: 1,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#E8E8E8',
  },
  infoContainer: {
    marginLeft: 16,
    flex: 1,
    justifyContent: 'center',
  },
  specialtyText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#C11574',
    marginVertical: 5,
    fontFamily: 'Inter_400Regular',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
    fontWeight: '400',
    fontFamily: 'LibreFranklin_400Regular',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  enhancedItemContainer: {
    paddingVertical: 8,
  },
  contentWrapper: {
    gap: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F5F5F5',
    marginTop: 12,
  },
  CardText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
    color: '#414651',
    fontStyle: 'normal',
    fontWeight: 400,
  },
  CardTitle: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    color: '#414651',
    fontWeight: '500',
    marginBottom: 5,
  },
  iconText: {
    marginRight: 6,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailRow: {
    alignItems: 'flex-start',
    gap: 8,
    paddingVertical: 8,
  },
  actionRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  disabledAction: {
    opacity: 0.5,
  },
  cancelActionTitle: {
    color: '#B42318',
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },
  cancelError: {
    color: '#B42318',
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
    marginTop: 8,
  },
  stateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  stateText: {
    color: '#414651',
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  errorText: {
    color: '#B42318',
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    textAlign: 'center',
  },
});