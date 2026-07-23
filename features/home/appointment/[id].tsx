import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import {
  BtnFlex,
  Card,
  JoinBtn,
  MinTitle,
  RescheduleBtn,
  Wrapper,
} from '@/components/typography/Typography';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Image } from 'expo-image';
import Feather from '@expo/vector-icons/Feather';
import { NavHeader } from '@/components/Header/Header';
import useDisplay from '@/lib/hooks/useDisplay';
import ProfileModal from '@/components/modal/Profile';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ROUTES } from '@/lib/routes';
import SafeArea from '@/components/safeAreaView/SafeAreaView';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { useQuery } from '@tanstack/react-query';
import { patientService } from '@/service/patientService';
import { GetAppointment } from '@/lib/interface/get-appointments-interface';

const getDoctorName = (doctor: GetAppointment['doctor']) => {
  if (!doctor) return 'Doctor unavailable';
  if (doctor.fullName) return doctor.fullName;
  if (doctor.name) return doctor.name;

  const name = [doctor.firstName, doctor.lastName].filter(Boolean).join(' ');
  return name || 'Doctor unavailable';
};

const getDoctorSpecialty = (doctor: GetAppointment['doctor']) => {
  return doctor?.specialty || doctor?.specialization || 'Doctor';
};

const getDoctorImage = (doctor: GetAppointment['doctor']) => {
  return doctor?.profileImage || doctor?.image || null;
};

const formatAppointmentDate = (date?: string, time?: string) => {
  if (!date && !time) return 'N/A';

  const appointmentDate = date ? new Date(date) : null;
  const formattedDate =
    appointmentDate && !Number.isNaN(appointmentDate.getTime())
      ? appointmentDate.toLocaleDateString()
      : date;

  return [formattedDate, time].filter(Boolean).join(' at ');
};

const AppointmentDetails = () => {
  const { id } = useLocalSearchParams();
  const appointmentId = Array.isArray(id) ? Number(id[0]) : Number(id);
  const profile = require('@/assets/images/Mobile.png');
  const { openModal, handleDisplay } = useDisplay();
  const {
    data: appointmentResponse,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['getAppointmentById', appointmentId],
    queryFn: () => patientService.getAppointmentById(appointmentId),
    enabled: Number.isFinite(appointmentId),
  });

  const appointmentDetails = appointmentResponse?.data ?? null;
  const doctorImage = appointmentDetails
    ? getDoctorImage(appointmentDetails.doctor)
    : null;

  const data = [
    {
      text:
        appointmentDetails?.note ||
        'No consultation note added yet for this appointment.',
      title: 'About',
    },
    {
      text: appointmentDetails?.status || 'N/A',
      title: 'Status',
    },
    {
      text: formatAppointmentDate(
        appointmentDetails?.date,
        appointmentDetails?.time
      ),
      title: 'Date & Time',
    },
    {
      text: appointmentDetails?.consultationType || 'N/A',
      title: 'Consultation Type',
      icon: (
        <Feather
          name="video"
          size={13}
          color="#717680"
          style={styles.iconText}
        />
      ),
    },
    {
      text: appointmentDetails?.healthConcern || 'No health concern provided.',
      title: 'Health Concern',
    },
  ];

  const options = [
    {
      name: 'View Profile',
      url: '/(profile)',
    },
    {
      name: 'Cancel Booking',
      url: '/settings',
    },
    {
      name: 'Chat Doctor',
      url: '/',
    },
    {
      name: 'Report Issue',
      url: ROUTES.reportIssue,
    },
  ];
  return (
    <SafeArea>
      <ScreenLayout>
        <NavHeader
          title="Appointment Details"
          _goBack={() => router.back()}
          _optionFn={() => handleDisplay()}
          backIcon={
            <Entypo name="chevron-small-left" size={24} color="black" />
          }
          optionIcon={
            <Entypo name="dots-three-vertical" size={15} color="black" />
          }
        />
        <ScreenOverFlowLayout>
          <Wrapper>
            {isLoading && (
              <View style={styles.stateContainer}>
                <ActivityIndicator size="large" color="#DD2590" />
                <Text style={styles.stateText}>Loading appointment...</Text>
              </View>
            )}

            {isError && (
              <View style={styles.stateContainer}>
                <Text style={styles.errorText}>
                  {(error as Error).message || 'Unable to load appointment'}
                </Text>
              </View>
            )}

            {!isLoading && !isError && !appointmentDetails && (
              <View style={styles.stateContainer}>
                <Text style={styles.stateText}>Appointment not found</Text>
              </View>
            )}

            {!isLoading && !isError && appointmentDetails && (
              <>
                <View style={styles.container}>
                  <Image
                    source={doctorImage ? { uri: doctorImage } : profile}
                    style={styles.profileImage}
                  />
                  <View style={styles.infoContainer}>
                    <MinTitle>
                      {getDoctorName(appointmentDetails.doctor)}
                    </MinTitle>
                    <Text style={styles.specialtyText}>
                      {getDoctorSpecialty(appointmentDetails.doctor)}
                    </Text>
                    <View style={styles.locationContainer}>
                      <EvilIcons name="location" size={16} color="#666" />
                      <Text style={styles.locationText}>
                        {appointmentDetails.hospital?.hospitalName ||
                          'Hospital unavailable'}
                      </Text>
                    </View>
                  </View>
                </View>
                <Card>
                  {data.map((item, index) => {
                    const { text, title, icon } = item;
                    const isLastItem = index === data.length - 1;

                    return (
                      <View
                        key={title}
                        style={[
                          styles.enhancedItemContainer,
                          isLastItem && styles.lastItem,
                        ]}
                      >
                        <View style={styles.contentWrapper}>
                          <Text style={styles.CardTitle}>{title}</Text>
                          <Text>
                            {icon && (
                              <Text style={styles.iconText}>{icon}</Text>
                            )}
                            <Text style={styles.CardText}>{text}</Text>
                          </Text>
                        </View>
                        {!isLastItem && <View style={styles.divider} />}
                      </View>
                    );
                  })}
                </Card>
                <BtnFlex>
                  <RescheduleBtn _fn={() => router.push(ROUTES.home)}>
                    Reschedule
                  </RescheduleBtn>
                  <JoinBtn _fn={() => router.push(ROUTES.home)}>
                    Join Call
                  </JoinBtn>
                </BtnFlex>
              </>
            )}
          </Wrapper>
        </ScreenOverFlowLayout>
        <ProfileModal
          isOpen={openModal}
          closeModal={handleDisplay}
          options={options}
          icon={
            <MaterialIcons
              name="report-gmailerrorred"
              size={15}
              color="#FD6868"
            />
          }
          values="Report Issue"
        />
      </ScreenLayout>
    </SafeArea>
  );
};

export default AppointmentDetails;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    borderColor: '#F2F2F2',
    borderWidth: 1,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#E8E8E8',
  },
  infoContainer: {
    marginLeft: 16,
    flex: 1,
    justifyContent: 'center',
  },
  specialtyText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#C11574',
    marginVertical: 5,
    fontFamily: 'Inter_400Regular',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
    fontWeight: '400',
    fontFamily: 'LibreFranklin_400Regular',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  enhancedItemContainer: {
    padding: 4,
  },
  contentWrapper: {
    gap: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F5F5F5',
    marginTop: 16,
    // marginHorizontal: -4, // Slight inset for visual appeal
  },
  CardText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
    color: '#414651',
    fontStyle: 'normal',
    fontWeight: 400,
    // backgroundColor: 'red'
  },
  CardTitle: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    color: '#414651',
    fontWeight: '500',
    marginBottom: 5,
    // marginTop: 10
  },
  iconText: {
    paddingRight: 58,
    // backgroundColor: 'red'
  },
  stateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  stateText: {
    color: '#414651',
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  errorText: {
    color: '#B42318',
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    textAlign: 'center',
  },
});
