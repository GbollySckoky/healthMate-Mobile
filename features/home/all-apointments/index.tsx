import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  SmallText,
  SubTitle,
  Wrapper,
} from '@/components/typography/Typography';
import Feather from '@expo/vector-icons/Feather';
import { Image } from 'expo-image';
import { NavHeader } from '@/components/Header/Header';
import { router } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import SafeArea from '@/components/safeAreaView/SafeAreaView';
import { patientService } from '@/service/patientService';
import { useQuery } from '@tanstack/react-query';
import SearchInput from '@/components/Input/SearchInput';
import { GetAppointment } from '@/lib/interface/get-appointments-interface';
import { AppointmentStatusBadge } from '@/components/AppointmentStatusBadge';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const formatAppointmentDate = (date: string, time: string) => {
  const appointmentDate = new Date(date);
  const formattedDate = Number.isNaN(appointmentDate.getTime())
    ? date
    : appointmentDate.toLocaleDateString();

  return `${time} | ${formattedDate}`;
};

const getDoctorName = (doctor: GetAppointment['doctor']) => {
  if (!doctor) return 'Doctor unavailable';
  if (doctor.fullName) return doctor.fullName;
  if (doctor.name) return doctor.name;

  const name = [doctor.firstName, doctor.lastName].filter((value): value is string => Boolean(value))
    .map((value) => value.charAt(0).toUpperCase() + value.slice(1).toLocaleLowerCase())
    .join(' ');
  return name || 'Doctor unavailable';
};

const getDoctorImage = (doctor: GetAppointment['doctor']) => {
  return doctor?.profileImage || doctor?.image || 'https://picsum.photos/seed/696/3000/2000';
};

const AllApointments = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [searchInput, setSearchInput] = useState('');
  const [searchDebounceQuery, setSearchDebounceQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchDebounceQuery(searchInput);
      setPage(1);
    },500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['getAppointments', page, limit, searchDebounceQuery],
    queryFn: () =>
      patientService.getAppointments(page, limit, searchDebounceQuery),
  });

  const appointments = data?.data ?? [];
  const meta = data?.meta;
  const canGoPrevious = meta ? meta.page > 1 : page > 1;
  const canGoNext = meta ? meta.page < meta.totalPages : false;

  const handleAppointmentPress = (id: number) => {
    router.push({
      pathname: '/home-screen/appointment/[id]',
      params: { id: id},
    });
  };
  return (
    <SafeArea>
      <ScreenLayout>
        <NavHeader
          title="All Appointments"
          _goBack={() => router.back()}
          _optionFn={() => router.back()}
          backIcon={
            <Entypo name="chevron-small-left" size={24} color="black" />
          }
        />
        <ScreenOverFlowLayout>
          <Wrapper>
            <SearchInput
              placeholder="Search for a doctor"
              value={searchInput}
              onChangeText={(value) => setSearchInput(value)}
            />
            <View style={{ marginBottom: 30 }}>
              {isLoading && (
                <View style={style.stateContainer}>
                  <ActivityIndicator size="large" color="#DD2590" />
                  <Text style={style.stateText}>Loading appointments...</Text>
                </View>
              )}

              {isError && (
                <View style={style.stateContainer}>
                  <Text style={style.errorText}>
                    {(error as Error).message || 'Unable to load appointments'}
                  </Text>
                </View>
              )}

              {!isLoading && !isError && appointments.length === 0 && (
                <View style={style.stateContainer}>
                  <Text style={style.stateText}>No appointments found</Text>
                </View>
              )}

              {!isLoading && !isError && appointments.map((appointment) => {
                const {
                  id,
                  doctor,
                  date,
                  time,
                  status,
                  consultationType,
                } = appointment;
                return (
                  <TouchableOpacity 
                    key={id} 
                    style={style.Card} 
                    onPress={() => handleAppointmentPress(id)}>
                    <View style={style.Flex}>
                      <View style={{ width: 50 }}>
                        <Image
                          style={style.image}
                          source={{ uri: getDoctorImage(doctor) }}
                          placeholder={{ blurhash }}
                          contentFit="cover"
                          transition={1000}
                        />
                      </View>
                      <View style={style.Flexs}>
                        <View style={{ marginLeft: 5 }}>
                          <SubTitle>{getDoctorName(doctor)}</SubTitle>
                          <View style={[style.flex, { marginTop: 5 }]}>
                            <View style={{ marginRight: 3 }}>
                              <Feather name="clock" size={13} color="#717680" />
                            </View>
                            <SmallText>
                              {formatAppointmentDate(date, time)}
                            </SmallText>
                          </View>
                          <View style={[style.flex, { marginTop: 5 }]}>
                            <View style={{ marginRight: 3 }}>
                              <Feather name="video" size={13} color="#717680" />
                            </View>
                            <SmallText>{consultationType.charAt(0).toUpperCase() + consultationType.slice(1).toLocaleLowerCase().replaceAll('_', " ")}</SmallText>
                          </View>
                        </View>
                        <AppointmentStatusBadge status={status} />
                      </View>
                    </View>
                    <View style={style.ButtonRow}>
                      <TouchableOpacity style={style.rescheduleBtn}>
                        <Text style={[style.buttonText, { color: '#252B37' }]}>
                          Reschedule
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={style.joinBtn}>
                        <Text style={[style.buttonText, { color: '#F2F2F2' }]}>
                          Join Call
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                );
              })}

              {!isLoading && !isError && meta && (
                <View style={style.paginationRow}>
                  <TouchableOpacity
                    style={[
                      style.paginationButton,
                      !canGoPrevious && style.paginationButtonDisabled,
                    ]}
                    disabled={!canGoPrevious}
                    onPress={() =>
                      setPage((currentPage) => Math.max(currentPage - 1, 1))
                    }
                  >
                    <Text style={style.paginationText}>Previous</Text>
                  </TouchableOpacity>
                  <Text style={style.paginationMeta}>
                    Page {meta.page} of {Math.max(meta.totalPages, 1)}
                    {'\n'}
                    {meta.total} appointments
                  </Text>
                  <TouchableOpacity
                    style={[
                      style.paginationButton,
                      !canGoNext && style.paginationButtonDisabled,
                    ]}
                    disabled={!canGoNext}
                    onPress={() => setPage((currentPage) => currentPage + 1)}
                  >
                    <Text style={style.paginationText}>Next</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </Wrapper>
        </ScreenOverFlowLayout>
      </ScreenLayout>
    </SafeArea>
  );
};

export default AllApointments;

export const style = StyleSheet.create({
  Flex: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 5,
    marginBottom: 2,
  },
  flex: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 3,
  },
  Flexs: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: '#0553',
    borderRadius: 100,
  },
  Card: {
    padding: 15,
    borderColor: '#F2F2F2',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    marginTop: 10,
  },
  ButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    borderTopColor: '#F8F8F8',
    borderTopWidth: 2,
    marginTop: 15,
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
  },
  stateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  stateText: {
    color: '#414651',
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    marginTop: 8,
  },
  errorText: {
    color: '#B42318',
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    textAlign: 'center',
  },
  paginationRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  paginationButton: {
    backgroundColor: '#DD2591',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  paginationButtonDisabled: {
    backgroundColor: '#D6D7DA',
  },
  paginationText: {
    color: '#ffffff',
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
  },
  paginationMeta: {
    color: '#717680',
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
  },
});
