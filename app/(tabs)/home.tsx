import { Card, CardText, CardTitle, MinCard, Status, SubTitle, Texts, Title, Wrapper } from '@/constant/typography/Typography'
import React from 'react'
import { Text, View, ScrollView, TouchableOpacity, Pressable, StyleSheet  } from 'react-native'
import { healthOverview,trackData } from '../data'
import { Image } from 'expo-image'
import Feather from '@expo/vector-icons/Feather';
import RadioInput from '@/constant/Input/RadioInput'
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router'
import { useLinkTo } from '@react-navigation/native';
import { ScrollViewHorizontal } from '@/constant/scrollView/ScrollViewHorizontal'


const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const HomePage = () => {

  const handleInput = () => {
        
  }

  // Define appointment data
  const appointmentData = {
    id: 'dr-james-uche-june15',
    doctorName: 'Dr James Uche',
    date: 'June 15',
    time: '2:00pm',
    type: 'Video Call Consultation',
    status: 'Starts in 15mins'
  }

  const handleAppointmentPress = () => {
    router.push(`/home/appointment/${appointmentData.id}`)
  }

  const handleSeeAllAppointments = () => {
    router.push('/home/all-apointments')
  }
  
  const handleViewAllReminders = () => {
    router.push('/home/all-reminders')
  }
  const linkTo = useLinkTo();
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} style={{backgroundColor: 'white'}}>
    <Wrapper>
      <View style={{borderBottomWidth: 1, borderColor: '#F2F2F2', paddingBottom: 20}}>
        <Title>
          Good Evening, Sarah 👋
        </Title>
        <Texts>
          Let's take a step toward a healthier you today.
        </Texts>
      </View>

        {/* Your Activities */}
        <View style={{marginTop: 20}}>
          <SubTitle>
            Your Health Overview
          </SubTitle>
          <ScrollViewHorizontal>
              {healthOverview.map((health) => {
                const {title, id,text, value, icon, url} = health;
                return(
                  <Pressable onPress={() => linkTo(url)} key={id} >
                    <MinCard  style={style.MinCard} >
                      <Text style={{paddingBottom: 15}}>
                        {icon}
                      </Text>
                      <CardTitle>
                        {title}
                      </CardTitle>
                      <View style={{paddingTop: 4}}>
                        <Title>
                          {value}
                        </Title>
                        <CardText>
                          {text}
                        </CardText>
                      </View>
                    </MinCard>
                  </Pressable>
                )
              })}
          </ScrollViewHorizontal >
        </View>
        
        {/* Recent Appointments - Fixed Header */}
        <View style={style.flexs}>
          <SubTitle>
            Recent Appointments
          </SubTitle>
          <TouchableOpacity style={style.linkFlex} onPress={handleSeeAllAppointments}>
            <Text style={style.linkText}> See All </Text>
             <AntDesign name="arrowright" size={17} color="#DD2590" />
          </TouchableOpacity>
        </View>

        {/* Clickable Appointment Card */}
        <TouchableOpacity onPress={handleAppointmentPress} activeOpacity={0.7}>
          <Card>
            <View style={style.Flex}>
                <View style={{width: 50}}>
                <Image 
                style={style.image}
                source={{ uri: "https://picsum.photos/seed/696/3000/2000" }}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
                />
                </View>
                <View style={style.Flexs}>
                  <View style={{marginLeft: 5}}>
                    <SubTitle>
                      {appointmentData.doctorName}
                    </SubTitle>
                    <View style={[style.flex,{marginTop: 5}]}>
                      <View style={{marginRight: 6}}>
                        <Feather name="clock" size={16} color="#717680" />
                      </View>
                      <Texts>
                        {appointmentData.time} | {appointmentData.date}
                      </Texts>
                    </View>
                    <View style={[style.flex,{marginTop: 5}]}>
                      <View style={{marginRight: 6}}>
                        <Feather name="video" size={16} color="#717680" />
                      </View>
                      <Texts>
                        {appointmentData.type}
                      </Texts>
                    </View>
                  </View>
                  <Status>
                    {appointmentData.status}
                  </Status>
                </View>
            </View>
            <View style={style.ButtonRow}>
              <TouchableOpacity style={style.rescheduleBtn}>
                <Text style={[style.buttonText, {color: '#252B37'}]}>Reschedule</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.joinBtn}>
                <Text style={[style.buttonText, { color: '#F2F2F2'}]}>Join Call</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </TouchableOpacity>

        {/* Streak */}
        <View style={style.SubCard}>
          <SubTitle>
            3 days Streak! 
          </SubTitle>
          <SubTitle>
            Consistency is key – you're doing great!
          </SubTitle>
          <CardTitle>
          Every log brings you closer to better health.
          </CardTitle>
        </View>
       
       {/* Reminder */}
       <View style={style.flexs}>
          <SubTitle>
            Today's Reminders
          </SubTitle>
          <TouchableOpacity style={style.linkFlex} onPress={handleViewAllReminders}>
            <Text style={style.linkText}> View All </Text>
             <AntDesign name="arrowright" size={17} color="#DD2590" />
          </TouchableOpacity>
        </View>
        <View>
            {trackData.map((data) => {
              const {id, med, time, icon} = data;
              return(
                <View key={id} style={{paddingTop: 15, paddingBottom: 15 ,borderBottomWidth: 1, borderBottomColor:'#F2F2F2'}}>
                  <View style={{flexDirection: 'row', alignContent: 'center',justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignContent:'center'}}>
                      <Text style={{backgroundColor: '#FDF2FA', padding:5, borderRadius: 4}}>
                        {icon}
                      </Text>
                      <View style={{paddingLeft: 15}}>
                        <Text style={{fontWeight: 500, fontSize: 14}}>{med}</Text>
                        <Text style={{color: '#717680', fontWeight: 400, fontSize: 12, paddingTop: 3}}>{time}</Text>
                      </View>
                    </View>
                    <RadioInput 
                    selected={true}
                    onPress={handleInput}
                    />
                  </View>
                </View>
              )
            })}
        </View>
    </Wrapper>
    </ScrollView>
  )
}

export default HomePage

export const style = StyleSheet.create({
  Flex: {
    flexDirection: 'row',
    alignContent:'center',
    marginTop: 5,
    marginBottom: 2
  },
  flex: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 3
  },
  MinCard: {
    padding: 15,
    borderColor: '#F1F1F1',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginRight: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    width: '100%',
  },
  SubCard: {
    padding: 15,
    borderColor: '#F1F1F1',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#F4ECFF',
    marginRight: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginTop: 15
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: '#0553',
    borderRadius: 100,
  },
  Flexs:{
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  Text: {
    fontFamily: 'Libre-Franklin',
    fontWeight: 500,
    fontSize: 12
  },
  ButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    borderTopColor: '#F8F8F8',
    borderTopWidth: 2,
    marginTop: 15
  },
  rescheduleBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    borderColor:  '#D6D7DA',
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
  flexs:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  linkFlex:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  linkText: {
    color: '#DD2590', 
    fontWeight: 400, 
    fontSize: 12,
    // marginRight:3
  }
});