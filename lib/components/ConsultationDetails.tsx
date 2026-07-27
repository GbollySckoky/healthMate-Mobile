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

const ConsultationDetailsSkeleton = () => (
  <View>
    <View style={styles.imageContainer}>
      <SkeletonBlock width="100%" height={180} borderRadius={10} />
      <View style={styles.profileImage}>
        <SkeletonBlock width={80} height={80} borderRadius={40} />
      </View>
    </View>

    <View style={styles.flexContainer}>
      <View style={{ flex: 1 }}>
        <SkeletonBlock width="55%" height={17} />
        <SkeletonBlock width="40%" height={12} style={{ marginTop: 8 }} />
        <SkeletonBlock width="50%" height={12} style={{ marginTop: 8 }} />
      </View>
      <SkeletonBlock width={50} height={12} />
    </View>

    <View style={styles.skeletonAboutSection}>
      {/* About / bio */}
      <SkeletonBlock width={60} height={16} />
      <SkeletonBlock width="100%" height={13} style={{ marginTop: 10 }} />
      <SkeletonBlock width="100%" height={13} style={{ marginTop: 6 }} />
      <SkeletonBlock width="65%" height={13} style={{ marginTop: 6 }} />

      {/* Availability */}
      <View style={{ marginTop: 28 }}>
        <SkeletonBlock width={90} height={16} />

        <View style={{ marginTop: 12, gap: 14 }}>
          {[1, 2].map((key) => (
            <View key={key} style={styles.skeletonAvailabilityCard}>
              <SkeletonBlock width={100} height={15} style={{ marginBottom: 12 }} />

              <SkeletonBlock width={70} height={13} style={{ marginBottom: 8 }} />
              <View style={styles.skeletonChipRow}>
                <SkeletonBlock width={60} height={28} borderRadius={20} />
                <SkeletonBlock width={60} height={28} borderRadius={20} />
                <SkeletonBlock width={60} height={28} borderRadius={20} />
              </View>

              <SkeletonBlock
                width={130}
                height={13}
                style={{ marginBottom: 8, marginTop: 14 }}
              />
              <View style={styles.skeletonChipRow}>
                <SkeletonBlock width={90} height={28} borderRadius={20} />
                <SkeletonBlock width={90} height={28} borderRadius={20} />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Consultation fee */}
      <View style={{ marginTop: 28 }}>
        <SkeletonBlock width={130} height={16} />
        <SkeletonBlock width={70} height={20} style={{ marginTop: 8 }} />
      </View>

      {/* Book button */}
      <SkeletonBlock width="100%" height={48} borderRadius={12} style={{ marginTop: 28 }} />
    </View>
  </View>
);

export default ConsultationDetailsSkeleton

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    gap: 10,
  },

  hospitalText: {
    fontFamily: 'LibreFranklin_400Regular',
    fontSize: 12,
    color: colors.gray,
    paddingTop: 4,
  },

  specialtyText: {
    fontFamily: 'LibreFranklin_400Regular',
    fontSize: 12,
    color: colors.lightRed,
    paddingTop: 4,
  },

  rating: {
    fontSize: 12,
    color: colors.gray,
    fontWeight: '400',
  },

  imageContainer: {
    width: '100%',
    height: 180,
    position: 'relative',
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },

  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    bottom: -30,
    left: 25,
  },

  love: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#E5EBED',
    padding: 5,
    borderRadius: 40,
  },

  skeletonAboutSection: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F2',
    paddingTop: 20,
    marginBottom: 50,
  },

  skeletonAvailabilityCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.broderColor,
    borderRadius: 14,
    padding: 14,
  },

  skeletonChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  centerState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: colors.gray,
    fontFamily: 'LibreFranklin_400Regular',
  },

  errorText: {
    fontSize: 14,
    color: colors.lightRed,
    fontFamily: 'LibreFranklin_400Regular',
    textAlign: 'center',
    marginBottom: 16,
  },

  retryButton: {
    backgroundColor: '#DD2590',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  retryText: {
    color: colors.white,
    fontSize: 14,
    fontFamily: 'LibreFranklin_600SemiBold',
  },
});