import React from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { BtnFlex, Card, CardTitle, JoinBtn, MinTitle, RescheduleBtn, SubTitles, Title, Wrapper } from '@/components/typography/Typography';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Image } from 'expo-image';
import Feather from '@expo/vector-icons/Feather';
import {NavHeader}  from '@/components/Header/Header';

const AppointmentDetails = () => {
    const {id} = useLocalSearchParams()
    const profile = require(('../../../assets/images/Mobile.png'))
    const data = [
      {
        text: 'I am a General Practitioner with over 8years experience. I help patients manage chronic migraines and sleep issues with comprehensive care approaches.',
        title: 'About'
      },
      {
        text: 'In Progress',
        title: 'Status'
      },
      {
        text: 'Jun 23 at 09:45',
        title: 'Date & Time'
      },
      {
        text: 'Video Call Consultation ',
        title: 'Consultation Type',
        icon: <Feather name="video" size={13} color="#717680" style={styles.iconText} />
      },
      {
        text: 'I am have been having pains on my lower abdomen for weeks now, i have taken medications prescribed by a Pharmacist but it has gotten worser. when i try to urinate i feel a sharp pain.',
        title: 'Health Concern'
      },
    ]
  console.log(id)
  return (
    <View style={{backgroundColor: 'white'}}>
      <NavHeader
        title='Appointment Details'
        _goBack={() => router.push('/(tabs)/home')}
        _optionFn={() => router.push('/(tabs)/home')}
        backIcon={<Entypo name="chevron-small-left" size={24} color="black"  />}
        optionIcon={<Entypo name="dots-three-vertical" size={15} color="black" />}
       />
       <ScrollView 
       contentContainerStyle={{ flexGrow: 1 }} 
       showsVerticalScrollIndicator={false} 
       style={{backgroundColor: '#ffffff'}}> 
        <Wrapper>
          <View style={styles.container}>
            <Image source={profile} style={styles.profileImage} />
            <View style={styles.infoContainer}>
              <MinTitle>Dr James Uche</MinTitle>
              <Text style={styles.specialtyText}>
                General Practitioner
              </Text>
              <View style={styles.locationContainer}>
                <EvilIcons name="location" size={16} color="#666" />
                <Text style={styles.locationText}>
                  Lagos Health Hospital
                </Text>
              </View>
            </View>
          </View>
          {/* Card */}
          <Card>
            {data.map((item, index) => {
              const { text, title, icon } = item;
              const isLastItem = index === data.length - 1;
              
              return (
                <View 
                  key={index} 
                  style={[
                    styles.enhancedItemContainer,
                    isLastItem && styles.lastItem
                  ]}
                >
                  <View style={styles.contentWrapper}>
                    <Text style={styles.CardTitle}>{title}</Text>
                    <Text>
                      {icon && <Text style={styles.iconText}>{icon}</Text>}
                      <Text style={styles.CardText}>{text}</Text>
                    </Text>
                  </View>
                  {!isLastItem && <View style={styles.divider} />}
                </View>
              );
            })}
          </Card>
          <BtnFlex>
              <RescheduleBtn _fn={() => router.push('/')}> Reschedule</RescheduleBtn>
              <JoinBtn _fn={() => router.push('/')}>Join Call</JoinBtn>
          </BtnFlex>
        </Wrapper>
      </ScrollView>
    </View>
  )
}

export default AppointmentDetails

const styles =  StyleSheet.create({
  container: {
    marginBottom: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    // marginTop: 10,

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
    fontFamily: 'Inter_400Regular'
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
    fontFamily: 'LibreFranklin_400Regular'
  },
  lastItem: {
    borderBottomWidth: 0, // Remove border from last item
  },
  enhancedCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    marginVertical: 8,
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
    fontWeight: 400
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
