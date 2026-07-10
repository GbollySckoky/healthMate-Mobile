import {
  CardText,
  CardTitle,
  MinCard,
  SubTitle,
  Title,
} from '@/components/typography/Typography';
import React, { useCallback } from 'react';
import { ScrollViewHorizontal } from '@/components/scrollView/ScrollViewHorizontal';
import { Href, useRouter } from 'expo-router';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { ROUTES } from '@/lib/routes';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import useDate from '@/hooks/useDate';
import { useOverview } from '@/context/getOverviewContext';

const Activities = () => {
  const router = useRouter();
  const { data } = useOverview();
  const { getReadableDate } = useDate();
  const overview = data?.data ?? null;
  console.log('OVERVIEW!!', overview)
  const readableDate = (value?: string | null) =>
    value ? getReadableDate(value) : 'N/A';

  const healthOverview = [
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
      value: overview?.weight
        ? `${overview.weight.weight}kg`
        : 'N/A',
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
  return (
    <View>
      <SubTitle>Your Health Overview</SubTitle>
      <ScrollViewHorizontal>
        {healthOverview.map((health) => {
          const { title, id, text, value, icon, url } = health;
          return (
            <Pressable onPress={() => handlePress(url)} key={id}>
              <MinCard style={style.MinCard}>
                <Text style={{ paddingBottom: 15 }}>{icon}</Text>
                <CardTitle>{title}</CardTitle>
                <View style={{ paddingTop: 4 }}>
                  <Title>{value}</Title>
                  <CardText>{text}</CardText>
                </View>
              </MinCard>
            </Pressable>
          );
        })}
      </ScrollViewHorizontal>
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
});
