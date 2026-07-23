import {
  SmallText,
  SubTitle,
} from '@/components/typography/Typography';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'expo-image';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ROUTES } from '@/lib/routes';
import { patientService } from '@/service/patientService';
import { useQuery } from '@tanstack/react-query';
import { GetAppointment } from '@/lib/interface/get-appointments-interface';
import { AppointmentStatusBadge } from '@/components/AppointmentStatusBadge';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const getDoctorName = (doctor: GetAppointment['doctor']) => {
  if (!doctor) return 'Doctor unavailable';
  if (doctor.fullName) return doctor.fullName;
  if (doctor.name) return doctor.name;

  const name = [doctor.firstName, doctor.lastName]
    .filter((value): value is string => Boolean(value))
    .map((value) => value.charAt(0).toUpperCase() + value.slice(1).toLocaleLowerCase())
    .join(' ');
  return name || 'Doctor unavailable';
};

const getDoctorImage = (doctor: GetAppointment['doctor']) => {
  return doctor?.profileImage || doctor?.image || 'https://picsum.photos/seed/696/3000/2000';
};

const formatAppointmentDate = (date: string, time: string) => {
  const appointmentDate = new Date(date);
  const formattedDate = Number.isNaN(appointmentDate.getTime())
    ? date
    : appointmentDate.toLocaleDateString();

  return `${time} | ${formattedDate}`;
};

const AppointmentCard = () => {
  const router = useRouter();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['getAppointments', 1, 1],
    queryFn: () =>
    patientService.getAppointments(1, 1),
   });

  const appointments = data?.data ?? [];
  const latestAppointment = appointments[0] ?? null;
  console.log(latestAppointment)

  const handleAppointmentPress = (id: number) => {
    router.push({
      pathname: '/home-screen/appointment/[id]',
      params: { id },
    });
  };

  const renderAppointments = () => {
    if (isLoading) {
      return (
        <View style={style.stateContainer}>
          <ActivityIndicator size="large" color="#DF0000" />
          <Text style={style.stateText}>Loading appointment...</Text>
        </View>
      );
    }

    if (isError) {
      return (
        <View style={style.stateContainer}>
          <Text style={style.stateText}>Error loading appointment</Text>
          <Text style={style.errorMessage}>{error?.message}</Text>
        </View>
      );
    }

    if (appointments.length === 0) {
      return (
        <View style={style.stateContainer}>
          <AntDesign name="inbox" size={40} color="#717680" />
          <Text style={style.stateText}>No appointment yet</Text>
          <Text style={style.stateSubText}>Create an appointment</Text>
        </View>
      );
    }

    if (!latestAppointment) {
      return null;
    }

    return (
      <TouchableOpacity
        onPress={() => handleAppointmentPress(latestAppointment.id)}
        activeOpacity={0.7}
      >
        <View style={style.Card}>
          <View style={style.Flex}>
            <View style={{ width: 50 }}>
              <Image
                style={style.image}
                source={{
                  uri: getDoctorImage(latestAppointment.doctor),
                }}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
              />
            </View>
            <View style={style.Flexs}>
              <View style={{ marginLeft: 5 }}>
                <SubTitle>{getDoctorName(latestAppointment.doctor)}</SubTitle>
                <View style={[style.flex, { marginTop: 5 }]}>
                  <View style={{ marginRight: 3 }}>
                    <Feather name="clock" size={13} color="#717680" />
                  </View>
                  <SmallText>
                    {formatAppointmentDate(
                      latestAppointment.date,
                      latestAppointment.time
                    )}
                  </SmallText>
                </View>
                <View style={[style.flex, { marginTop: 5, marginBottom: 5 }]}>
                  <View style={{ marginRight: 3 }}>
                    <Feather name="video" size={13} color="#717680" />
                  </View>
                  <SmallText> {latestAppointment.consultationType.charAt(0).toUpperCase() + latestAppointment.consultationType.slice(1).toLocaleLowerCase().replaceAll('_', " ")}</SmallText>
                </View>
                {/* <SmallText>
                  Health Concern: {latestAppointment.healthConcern}
                </SmallText> */}
              </View>
              <AppointmentStatusBadge status={latestAppointment.status} />
            </View>
          </View>
          <View style={style.ButtonRow}>
            <TouchableOpacity style={style.rescheduleBtn}>
              <Text style={[style.buttonText, { color: '#252B37' }]}>
                Reschedule
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.joinBtn}
              onPress={() => router.push(ROUTES.home)}
            >
              <Text style={[style.buttonText, { color: '#F2F2F2' }]}>
                Join Call
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleSeeAllAppointments = () => {
    router.push(ROUTES.allApointments);
  };
  return (
    <View>
      <View style={style.flexs}>
        <SubTitle>Recent Appointments</SubTitle>
        <TouchableOpacity
          style={style.linkFlex}
          onPress={handleSeeAllAppointments}
        >
          <Text style={style.linkText}> See All </Text>
          <AntDesign name="arrow-right" size={17} color="#DD2590" />
        </TouchableOpacity>
      </View>
      {renderAppointments()}
    </View>
  );
};

export default AppointmentCard;

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
