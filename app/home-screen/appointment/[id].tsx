import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
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
import useDisplay from '@/hooks/useDisplay';
import ProfileModal from '@/components/modal/Profile';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ROUTES } from '@/lib/routes';
import SafeArea from '@/components/safeAreaView/SafeAreaView';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { patientService } from '@/service/patientService';
import { useQuery } from '@tanstack/react-query';
import { useRoute } from '@react-navigation/native';
import { GetAppointments } from '@/lib/interface/get-appointments-interface';

const AppointmentDetails = () => {
  const route = useRoute();
  const { id } = route.params as { id: number };
  const profile = require('../../../assets/images/Mobile.png');
  const { openModal, handleDisplay } = useDisplay();
  console.log(id);
  console.log(id);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getAppointmentDetails', id],
    queryFn: () => patientService.getAppointmentDetails(id),
    enabled: !!id,
  });

  if (isError) {
    return (
      <div style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {error.message}
      </div>
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!data || data.length < 0) {
    return (
      <div
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 500,
          fontSize: 12,
        }}
      >
        No appointment details
      </div>
    );
  }
  const appointment = data && data[0];

  const dataArray = appointment
    ? [
        {
          text: appointment.about || 'N/A',
          title: 'About',
        },
        {
          text: appointment.status || 'N/A',
          title: 'Status',
        },
        {
          text:
            `${appointment.appointment_date} at ${appointment.appointment_time}` ||
            'N/A',
          title: 'Date & Time',
        },
        {
          text: appointment.consultation_type || 'N/A',
          title: 'Consultation Type',
          icon: (
            <Feather
              name="video"
              size={13}
              color="#717680"
              // style={styles.iconText}
            />
          ),
        },
        {
          text: appointment.health_concerns || 'No health concern provided',
          title: 'Health Concern',
        },
        {
          text: appointment.approved === true ? "Yes" : 'No',
          title: 'Approved Appointment',
        },
      ]
    : [];

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
  console.log(id);
  console.log(dataArray);
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
            <View style={styles.container}>
              <Image source={profile} style={styles.profileImage} />
              <View style={styles.infoContainer}>
                <MinTitle>Dr James Uche</MinTitle>
                <Text style={styles.specialtyText}>General Practitioner</Text>
                <View style={styles.locationContainer}>
                  <EvilIcons name="location" size={16} color="#666" />
                  <Text style={styles.locationText}>Lagos Health Hospital</Text>
                </View>
              </View>
            </View>
            {/* Card */}
            <Card>
              {dataArray.map((item: any, index: number) => {
                const { text, title, icon } = item;
                const isLastItem = index === dataArray.length - 1;

                return (
                  <View
                    key={index}
                    style={[
                      styles.enhancedItemContainer,
                      isLastItem && styles.lastItem,
                    ]}
                  >
                    <View style={styles.contentWrapper}>
                      <Text style={styles.CardTitle}>{title}</Text>
                      <Text>
                        {icon && (
                          <Text style={{ paddingRight: 10 }}>{icon}</Text>
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
              <RescheduleBtn _fn={() => router.push('/')}>
                Reschedule
              </RescheduleBtn>
              <JoinBtn _fn={() => router.push('/')}>Join Call</JoinBtn>
            </BtnFlex>
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
});
