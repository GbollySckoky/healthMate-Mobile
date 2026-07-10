'use client';
import { NavHeader } from '@/components/Header/Header';
import React, { useMemo, useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import { Wrapper, SubTitle } from '@/components/typography/Typography';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Pressable,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import SearchInput from '@/components/Input/SearchInput';
import { colors } from '@/lib/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import SafeArea from '@/components/safeAreaView/SafeAreaView';
import { useQuery } from '@tanstack/react-query';
import { patientService } from '@/service/patientService';
import { GetDoctor } from '@/lib/interface/get-doctors-interface';

const profileFallback = require('@/assets/images/Ellipse 165.png');

const getParamValue = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) return value[0];
  return value;
};

const getDoctorName = (doctor: GetDoctor) => {
  if (doctor.fullName) return doctor.fullName;

  const name = [doctor.firstName, doctor.lastName].filter(Boolean).join(' ');
  return name || 'Doctor unavailable';
};

const getDoctorImageSource = (doctor: GetDoctor) => {
  const image =
    doctor.profileImage || doctor.image || doctor.profile?.profileImage;

  return image ? { uri: image } : profileFallback;
};

const getConsultationFee = (doctor: GetDoctor) => {
  const fee = doctor.profile?.consultationFee;
  return fee ? `₦ ${fee}` : '₦ 0';
};

const doctorMatchesSearch = (doctor: GetDoctor, query: string) => {
  if (!query) return true;

  const normalizedQuery = query.toLowerCase();
  const searchableText = [
    getDoctorName(doctor),
    doctor.email,
    doctor.profile?.specialization,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return searchableText.includes(normalizedQuery);
};

const ConsultationId = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const { id, hospitalName } = useLocalSearchParams<{
    id?: string;
    hospitalName?: string;
  }>();
  const hospitalId = Number(getParamValue(id));
  const routeHospitalName = getParamValue(hospitalName);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['getAllDoctors', hospitalId],
    queryFn: () => patientService.getDoctors(hospitalId),
    enabled: Number.isFinite(hospitalId),
  });

  const doctors = data?.data ?? [];
  const apiHospitalName = doctors.find(
    (doctor) => doctor.hospital?.hospitalName
  )?.hospital?.hospitalName;
  const title = routeHospitalName || apiHospitalName || 'Hospital Doctors';
  const searchQuery = searchInput.trim();
  const filteredDoctors = useMemo(
    () => doctors.filter((doctor) => doctorMatchesSearch(doctor, searchQuery)),
    [doctors, searchQuery]
  );

  const renderState = (content: React.ReactNode) => (
    <SafeArea>
      <ScreenLayout>
        <NavHeader
          title={title}
          _goBack={() => router.back()}
          backIcon={
            <Entypo name="chevron-small-left" size={24} color="black" />
          }
        />
        <View style={style.stateContainer}>{content}</View>
      </ScreenLayout>
    </SafeArea>
  );

  if (isLoading) {
    return renderState(
      <>
        <ActivityIndicator size="large" color="#DD2590" />
        <Text style={style.stateText}>Loading doctors...</Text>
      </>
    );
  }

  if (isError) {
    return renderState(
      <>
        <Text style={style.errorText}>
          {(error as Error).message || 'Unable to load doctors'}
        </Text>
        <Pressable style={style.retryButton} onPress={() => refetch()}>
          <Text style={style.retryText}>Try Again</Text>
        </Pressable>
      </>
    );
  }

  return (
    <SafeArea>
      <ScreenLayout>
        <NavHeader
          title={title}
          _goBack={() => router.back()}
          backIcon={
            <Entypo name="chevron-small-left" size={24} color="black" />
          }
        />
        <ScreenOverFlowLayout>
          <Wrapper>
            <View style={style.searchRow}>
              <SearchInput
                placeholder="Search for a doctor or specialty"
                value={searchInput}
                onChangeText={(value) => setSearchInput(value)}
              />
              <Text style={style.filterButton}>
                <Ionicons name="filter-outline" size={20} color="black" />
              </Text>
            </View>

            <View style={style.listWrapper}>
              {filteredDoctors.length === 0 && (
                <View style={style.emptyContainer}>
                  <Text style={style.stateText}>
                    {searchQuery ? 'No doctors found' : 'No doctors available'}
                  </Text>
                </View>
              )}

              {filteredDoctors.map((doctor) => {
                const specialization =
                  doctor.profile?.specialization || 'General Practitioner';

                return (
                  <View style={style.Card} key={doctor.id}>
                    <View style={style.Flex}>
                      <View style={{ width: 50 }}>
                        <Image
                          style={style.image}
                          source={getDoctorImageSource(doctor)}
                        />
                      </View>
                      <View style={style.Flexs}>
                        <View style={{ marginLeft: 10, flex: 1 }}>
                          <SubTitle>{getDoctorName(doctor)}</SubTitle>
                          <Text style={style.smallText}>
                            {doctor.email || 'Email unavailable'}
                          </Text>
                          <Text style={style.Text}>{specialization}</Text>
                        </View>
                        <Text style={style.rating}>⭐ 4.2(38)</Text>
                      </View>
                    </View>
                    <View style={style.ButtonRow}>
                      <Text
                        style={[style.buttonTexts, { color: colors.green }]}
                      >
                        {getConsultationFee(doctor)}
                      </Text>
                      <TouchableOpacity
                        style={style.joinBtn}
                        onPress={() =>
                          router.push({
                            pathname:
                              '/consult-screen/consultation-deatils/[id]',
                            params: { id: String(doctor.id) },
                          })
                        }
                      >
                        <Text style={[style.buttonText, { color: '#F2F2F2' }]}>
                          View Profile
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          </Wrapper>
        </ScreenOverFlowLayout>
      </ScreenLayout>
    </SafeArea>
  );
};

export default ConsultationId;

const style = StyleSheet.create({
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: colors.broderColor,
    padding: 9,
    borderRadius: 5,
    marginLeft: 10,
  },
  listWrapper: {
    marginBottom: 50,
  },
  Card: {
    padding: 15,
    borderColor: '#F2F2F2',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  Flex: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 5,
    marginBottom: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  Flexs: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  joinBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.lightRed,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  buttonTexts: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'LibreFranklin_600SemiBold',
  },
  ButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: '#F8F8F8',
    borderTopWidth: 2,
    marginTop: 15,
    paddingTop: 15,
  },
  smallText: {
    fontFamily: 'LibreFranklin_400Regular',
    fontSize: 12,
    color: colors.gray,
    fontStyle: 'normal',
    fontWeight: '400',
    paddingTop: 4,
  },
  Text: {
    fontFamily: 'LibreFranklin_400Regular',
    fontSize: 12,
    color: colors.purple,
    fontStyle: 'normal',
    fontWeight: '400',
    paddingTop: 4,
  },
  rating: {
    fontSize: 12,
    color: colors.gray,
    fontWeight: '400',
  },
  stateContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  stateText: {
    color: '#414651',
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
  },
  errorText: {
    color: '#B42318',
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#DD2591',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  retryText: {
    color: colors.white,
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
  },
});
