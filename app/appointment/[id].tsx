import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { BtnFlex, Card, CardTitle, JoinBtn, MinTitle, RescheduleBtn, SubTitles, Title, Wrapper } from '@/components/typography/Typography';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Image } from 'expo-image';


const AppointmentDetails = () => {
    const {id} = useLocalSearchParams()
    const profile = require(('../../assets/images/Mobile.png'))
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
        title: 'Consultation Type'
      },
      {
        text: 'I am have been having pains on my lower abdomen for weeks now, i have taken medications prescribed by a Pharmacist but it has gotten worser. when i try to urinate i feel a sharp pain.',
        title: 'Health Concern'
      },
    ]
  console.log(id)
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} style={{backgroundColor: '#ffffff'}}> 

      <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#f2f2f2', paddingVertical: 16, paddingHorizontal: 8}}>
        <View style={{flexDirection: 'row', alignContent: 'center'}}>
          <Entypo name="chevron-small-left" size={24} color="black" style={{paddingRight: 15}} />
          <Title>Appointment Details</Title>
        </View>
        <Entypo name="dots-three-vertical" size={15} color="black" />
      </View>
      <Wrapper>
        <View style={{marginVertical: 20, flexDirection: 'row', alignContent:  'center'}}>
          <Image source={profile} style={{width: 100, height: 100, borderRadius: 50}}/>
          <View style={{marginLeft:20}}>
            <MinTitle> Dr James Uche </MinTitle>
            <Text 
              style={{fontSize: 12, fontWeight: 400, color: '#C11574', paddingTop: 3, marginBottom: 5}}>General Practitioner</Text>
            {/* <CardTitle> */}
              <Text style={{flexDirection:'row', alignContent: 'center'}}>
                <EvilIcons name="location" size={15} color="black" style={{marginRight: 5}}/>
                Lagos Health Hospital
              </Text>
             
            {/* </CardTitle> */}
          </View>
          
        </View>
        {/* Card */}
        <Card>
          {data.map((data, index) => {
            const {text, title} = data
            return(
              <View key={index} style={{borderBottomWidth: 1, borderColor: '#F2F2F2', padding: 10}}>
                <SubTitles>{title}</SubTitles>
                <CardTitle>{text}</CardTitle>
              </View>
            )
          })}
        </Card>
        <BtnFlex>
            <RescheduleBtn> Reschedule</RescheduleBtn>
            <JoinBtn>Join Call</JoinBtn>
        </BtnFlex>
      </Wrapper>
    </ScrollView>
  )
}

export default AppointmentDetails