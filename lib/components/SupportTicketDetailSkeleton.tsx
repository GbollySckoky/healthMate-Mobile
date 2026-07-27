import { useEffect, useRef } from "react";
import { Animated, View, StyleSheet} from "react-native";
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

const SupportTicketDetailSkeleton = () => (
  <View>
    {/* Header */}
    <View style={styles.headerRow}>
      <View style={{ flex: 1 }}>
        <SkeletonBlock width={90} height={11} style={{ marginBottom: 6 }} />
        <SkeletonBlock width="75%" height={18} />
      </View>
    </View>
    <View style={styles.badgeRow}>
      <SkeletonBlock width={70} height={22} borderRadius={999} />
      <SkeletonBlock width={70} height={22} borderRadius={999} />
    </View>

    {/* Meta info */}
    <View style={styles.metaBox}>
      {[1, 2, 3].map((key) => (
        <View key={key} style={styles.metaItem}>
          <SkeletonBlock width={60} height={11} style={{ marginBottom: 6 }} />
          <SkeletonBlock width="80%" height={13} />
        </View>
      ))}
    </View>

    {/* Description */}
    <View style={styles.section}>
      <SkeletonBlock width={90} height={12} style={{ marginBottom: 10 }} />
      <SkeletonBlock width="100%" height={14} style={{ marginBottom: 6 }} />
      <SkeletonBlock width="90%" height={14} style={{ marginBottom: 6 }} />
      <SkeletonBlock width="60%" height={14} />
    </View>

    {/* Conversation */}
    <View style={styles.section}>
      <SkeletonBlock width={110} height={12} style={{ marginBottom: 10 }} />
      {[1, 2].map((key) => (
        <View key={key} style={styles.messageCard}>
          <View style={styles.messageHeader}>
            <SkeletonBlock width={70} height={12} />
            <SkeletonBlock width={90} height={11} />
          </View>
          <SkeletonBlock width="100%" height={13} style={{ marginBottom: 4 }} />
          <SkeletonBlock width="70%" height={13} />
        </View>
      ))}
    </View>

    {/* Reply form */}
    <View style={styles.section}>
      <SkeletonBlock width={140} height={12} style={{ marginBottom: 14 }} />
      <SkeletonBlock width="100%" height={90} borderRadius={10} />
      <SkeletonBlock width="100%" height={44} borderRadius={10} style={{ marginTop: 14 }} />
      <SkeletonBlock width="100%" height={44} borderRadius={10} style={{ marginTop: 14 }} />
      <SkeletonBlock width="100%" height={48} borderRadius={10} style={{ marginTop: 20 }} />
    </View>
  </View>
);

export default SupportTicketDetailSkeleton

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  ticketNumber: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  subject: {
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'Lato_700Bold',
    color: colors.black,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '500',
  },
  metaBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FAFBFF',
    borderColor: '#F3F4F6',
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginTop: 18,
  },
  metaItem: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.black,
  },
  section: {
    marginTop: 24,
  },
  sectionLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#374151',
  },
  messageCard: {
    borderColor: '#F3F4F6',
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  senderType: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },
  messageDate: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  messageText: {
    fontSize: 14,
    color: '#1F2937',
  },
  attachmentLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  attachmentText: {
    fontSize: 12,
    color: colors.lightRed,
  },
  emptyText: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  field: {
    marginTop: 14,
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 6,
  },
  input: {
    borderColor: colors.broderColor,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: colors.black,
  },
  inputError: {
    borderColor: colors.lightRed,
  },
  fieldErrorText: {
    color: colors.lightRed,
    fontSize: 11,
    marginTop: 6,
  },
  textArea: {
    minHeight: 90,
  },
  errorText: {
    color: colors.lightRed,
    fontSize: 13,
  },
});