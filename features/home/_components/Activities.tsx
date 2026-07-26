import {
  CardText,
  CardTitle,
  MinCard,
  SubTitle,
  Title,
} from '@/components/typography/Typography';
import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import { ScrollViewHorizontal } from '@/components/scrollView/ScrollViewHorizontal';
import { Href, useRouter } from 'expo-router';
import {
  Animated,
  Text,
  View,
  Pressable,
  StyleSheet,
} from 'react-native';
import { ROUTES } from '@/lib/routes';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import useDate from '@/lib/hooks/useDate';
import { useOverview } from '@/context/getOverviewContext';

type HealthOverviewItem = {
  id: number;
  title: string;
  value: string;
  text: string;
  icon: ReactNode;
  url: string;
};

// ---------- Skeleton primitives ----------

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
  <MinCard style={style.MinCard}>
    <SkeletonBlock width={24} height={24} borderRadius={12} style={style.skeletonIcon} />
    <SkeletonBlock width="70%" height={13} />
    <View style={style.valueWrapper}>
      <SkeletonBlock width="50%" height={20} style={{ marginBottom: 8 }} />
      <SkeletonBlock width="40%" height={12} />
    </View>
  </MinCard>
);

const Activities = () => {
  const router = useRouter();
  const { data, isError, isLoading, error, refetch } = useOverview();
  const { getReadableDate } = useDate();
  const overview = data?.data ?? null;
  const hasOverviewData = Boolean(
    overview?.bloodPressure ||
      overview?.mood ||
      overview?.sleep ||
      overview?.weight ||
      overview?.medication
  );

  const readableDate = (value?: string | null) =>
    value ? getReadableDate(value) : 'N/A';

  const healthOverview: HealthOverviewItem[] = [
    {
      title: 'Blood Pressure',
      value: overview?.bloodPressure
        ? `${overview.bloodPressure.systolic || '-'}/${overview.bloodPressure.diastolic || '-'}mmHg`
        : 'N/A',
      text: readableDate(overview?.bloodPressure?.recordedAt),
      id: 1,
      icon: <AntDesign name="heart" size={24} color="#DF0000" />,
      url: ROUTES.bloodPressure,
    },
    {
      title: 'Mood',
      value: overview?.mood?.mood.selectedMood || 'N/A',
      text: readableDate(overview?.mood?.recordedAt),
      id: 2,
      icon: <Feather name="smile" size={24} color="#FFC847" />,
      url: ROUTES.mood,
    },
    {
      title: 'Sleep',
      value: overview?.sleep?.sleep.selectedMood || 'N/A',
      text: readableDate(overview?.sleep?.recordedAt),
      id: 3,
      icon: <FontAwesome name="moon-o" size={24} color="black" />,
      url: ROUTES.sleep,
    },
    {
      title: 'Weight',
      value: overview?.weight ? `${overview.weight.weight}kg` : 'N/A',
      text: readableDate(overview?.weight?.recordedAt),
      id: 4,
      icon: <FontAwesome name="balance-scale" size={24} color="blue" />,
      url: ROUTES.weight,
    },
    {
      title: 'Medications',
      value: overview?.medication?.name || 'N/A',
      text: overview?.medication
        ? readableDate(overview.medication.recordedAt)
        : 'No medication',
      id: 5,
      icon: <MaterialCommunityIcons name="pill" size={24} color="#C11574" />,
      url: ROUTES.medication,
    },
  ];

  const handlePress = useCallback(
    (url: string) => {
      router.push(url as Href);
    },
    [router]
  );

  const renderLoadingState = () => (
    <ScrollViewHorizontal>
      {[1, 2, 3, 4, 5].map((key) => (
        <OverviewCardSkeleton key={key} />
      ))}
    </ScrollViewHorizontal>
  );

  const renderErrorState = () => (
    <View style={style.stateCard}>
      <Text style={style.errorText}>
        {error?.message || 'Unable to load health overview'}
      </Text>
      <Pressable style={style.retryButton} onPress={refetch}>
        <Text style={style.retryText}>Retry</Text>
      </Pressable>
    </View>
  );

  const renderEmptyState = () => (
    <View style={style.stateCard}>
      <Text style={style.stateText}>No health overview yet</Text>
      <Text style={style.stateSubText}>
        Track your health activities to see them here.
      </Text>
    </View>
  );

  const renderOverviewCards = () => (
    <ScrollViewHorizontal>
      {healthOverview.map((health) => {
        const { title, id, text, value, icon, url } = health;
        return (
          <Pressable
            onPress={() => handlePress(url)}
            key={id}
            style={({ pressed }) => pressed && style.pressedCard}
            accessibilityRole="button"
            accessibilityLabel={`${title}: ${value}`}
            accessibilityHint={`Navigate to ${title} tracker`}
          >
            <MinCard style={style.MinCard}>
              <Text style={style.iconText}>{icon}</Text>
              <CardTitle>{title}</CardTitle>
              <View style={style.valueWrapper}>
                <Title>{value}</Title>
                <CardText>{text}</CardText>
              </View>
            </MinCard>
          </Pressable>
        );
      })}
    </ScrollViewHorizontal>
  );

  return (
    <View>
      <SubTitle>Your Health Overview</SubTitle>
      {isLoading && renderLoadingState()}
      {isError && renderErrorState()}
      {!isLoading && !isError && !hasOverviewData && renderEmptyState()}
      {!isLoading && !isError && hasOverviewData && renderOverviewCards()}
    </View>
  );
};

export default Activities;

export const style = StyleSheet.create({
  MinCard: {
    padding: 15,
    borderColor: '#F1F1F1',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    width: 200,
  },
  pressedCard: {
    opacity: 0.75,
  },
  iconText: {
    paddingBottom: 15,
  },
  skeletonIcon: {
    marginBottom: 15,
  },
  valueWrapper: {
    paddingTop: 4,
  },
  stateCard: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    padding: 16,
    borderColor: '#F1F1F1',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginTop: 10,
    marginBottom: 10,
  },
  stateText: {
    color: '#414651',
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  stateSubText: {
    color: '#717680',
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  errorText: {
    color: '#B42318',
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
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
});