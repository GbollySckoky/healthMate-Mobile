import {
  CardText,
  CardTitle,
  MinCard,
  SubTitle,
  Title,
} from '@/components/typography/Typography';
import React, { ReactNode, useCallback } from 'react';
import { ScrollViewHorizontal } from '@/components/scrollView/ScrollViewHorizontal';
import { Href, useRouter } from 'expo-router';
import {
  ActivityIndicator,
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
    <View style={style.stateCard}>
      <ActivityIndicator size="small" color="#DD2590" />
      <Text style={style.stateText}>Loading overview...</Text>
    </View>
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
