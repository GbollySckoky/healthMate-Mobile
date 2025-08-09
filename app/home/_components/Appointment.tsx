import { Card, Status, SubTitle, Texts } from '@/components/typography/Typography'
import { useRouter } from 'expo-router'
import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet  } from 'react-native'
import { Image } from 'expo-image'
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign'


const AppointmentCard = () => {
    const router = useRouter()
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
  return (
    <View>
      <View style={style.flexs}>
      <SubTitle>
        Recent Appointments
      </SubTitle>
      <TouchableOpacity style={style.linkFlex} onPress={handleSeeAllAppointments}>
        <Text style={style.linkText}> See All </Text>
        <AntDesign name="arrowright" size={17} color="#DD2590" />
      </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleAppointmentPress} activeOpacity={0.7}>
      <Card>
        <View style={style.Flex}>
            <View style={{width: 50}}>
            <Image 
            style={style.image}
            source={{ uri: "https://picsum.photos/seed/696/3000/2000" }}
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
    </View>
  )
}

export default AppointmentCard

export const style = StyleSheet.create({
    Flex: {
        flexDirection: 'row',
        alignContent:'center',
        marginTop: 5,
        marginBottom: 2
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
    flex: {
        flexDirection: 'row',
        alignContent: 'center',
        marginTop: 3
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
    ButtonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        borderTopColor: '#F8F8F8',
        borderTopWidth: 2,
        marginTop: 15
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
})