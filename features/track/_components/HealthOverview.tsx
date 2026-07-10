import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import { ReactNode, useCallback } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { CardText, CardTitle } from '@/components/typography/Typography';
import { Href, useRouter } from 'expo-router';
import { colors } from '@/lib/colors';
import { useOverview } from '@/context/getOverviewContext';
import useDate from '@/hooks/useDate';
import { ROUTES } from '@/lib/routes';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type HealthOverviewItem = {
  id: number | string;
  title: string;
  text: string;
  value: string;
  icon: ReactNode;
  url: string;
};

const HealthOverview = () => {
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

  const handlePress = useCallback(
    (url: string) => {
      router.push(url as Href);
    },
    [router]
  );

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

  if (isLoading) {
    return (
      <View style={style.stateContainer}>
        <ActivityIndicator size="small" color="#DD2590" />
        <Text style={style.stateText}>Loading overview...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={style.stateContainer}>
        <Text style={style.errorText}>
          {error?.message || 'Unable to load health overview'}
        </Text>
        <Pressable style={style.retryButton} onPress={refetch}>
          <Text style={style.retryText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  if (!hasOverviewData) {
    return (
      <View style={style.stateContainer}>
        <Text style={style.stateText}>No health overview yet</Text>
        <Text style={style.stateSubText}>
          Track your health activities to see them here.
        </Text>
      </View>
    );
  }

  return (
    <View style={style.container}>
      {healthOverview.map((health) => {
        const { title, id, text, value, icon, url } = health;
        return (
          <Pressable
            onPress={() => handlePress(url)}
            key={id}
            style={({ pressed }) => [
              style.MinCard,
              pressed && style.pressedCard,
            ]}
            accessible={true}
            accessibilityLabel={`${title}: ${value}`}
            accessibilityRole="button"
            accessibilityHint={`Navigate to ${title} details`}
          >
            <Text style={style.iconContainer}>{icon}</Text>
            <CardTitle>{title}</CardTitle>
            <View style={style.valueContainer}>
              <Text style={style.title} numberOfLines={1} ellipsizeMode="tail">
                {value}
              </Text>
              <CardText>{text}</CardText>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default HealthOverview;

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
