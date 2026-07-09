import {
  CardText,
  CardTitle,
  MinCard,
  SubTitle,
  Title,
} from '@/components/typography/Typography';
import React, { useCallback } from 'react';
<<<<<<< HEAD:features/home/_components/Activities.tsx
import { healthOverview } from '@/lib/data';
=======
>>>>>>> 85b4f92abddf59638fbd73e8b0c2b730e21f410a:app/home-screen/_components/Activities.tsx
import { ScrollViewHorizontal } from '@/components/scrollView/ScrollViewHorizontal';
import { Href, useRouter } from 'expo-router';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { ROUTES } from '@/lib/routes';
import AntDesign from '@expo/vector-icons/AntDesign';
import { patientService } from '@/service/patientService';
import { useQuery } from '@tanstack/react-query';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import useDate from '@/hooks/useDate';

const Activities = () => {
<<<<<<< HEAD:features/home/_components/Activities.tsx
  const router = useRouter();
=======
  const linkTo = useLinkTo();
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['getOverview'],
    queryFn: () => patientService.getOverview(),
  });
  const { getReadableDate } = useDate();
  console.log(data);
  const healthOverview = [
    {
      title: 'Blood Pressure',
      value: `${data?.latest_blood_pressure ? `${data?.latest_blood_pressure.systolic}/${data?.latest_blood_pressure.diastolic}mmHg` : 'N/A'} `,
      text: `${getReadableDate(data?.latest_blood_pressure?.date_recorded) || 'N/A'}`,
      id: 1,
      icon: <AntDesign name="heart" size={24} color="#DF0000" />,
      url: ROUTES.bloodPressure,
    },
    {
      title: 'Mood',
      value: `${data?.latest_mood ? data?.latest_mood.mood : 'Happy'} `,
      text: `${getReadableDate(data?.latest_mood?.recorded_at) || 'N/A'}`,
      id: 2,
      icon: <Feather name="smile" size={24} color="#FFC847" />,
      url: ROUTES.mood,
    },
    {
      title: 'Sleep',
      value: `${data?.latest_sleep ? data?.latest_sleep.quanlity : 'N/A'}`,
      text: `${getReadableDate(data?.latest_sleep?.sleep_date) || 'N/A'}`,
      id: 3,
      icon: <FontAwesome name="moon-o" size={24} color="black" />,
      url: ROUTES.sleep,
    },
    {
      title: 'Weight',
      value: `${data?.latest_weight ? data?.latest_weight.weight : 'N/A'}`,
      text: `${getReadableDate(data?.latest_weight?.recorded_at)}`,
      id: 4,
      icon: <FontAwesome name="balance-scale" size={24} color="blue" />,
      url: ROUTES.weight,
    },
    {
      title: 'Medications',
      value: '2/3 doses',
      text: 'Taken today',
      id: 5,
      icon: <MaterialCommunityIcons name="pill" size={24} color="#C11574" />,
      url: ROUTES.medication,
    },
  ];
>>>>>>> 85b4f92abddf59638fbd73e8b0c2b730e21f410a:app/home-screen/_components/Activities.tsx

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
