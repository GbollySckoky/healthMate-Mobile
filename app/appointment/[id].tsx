import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';


const AppointmentDetails = () => {
    const {id} = useLocalSearchParams()
  console.log(id)
  return (
    <View>
        <Text>jjss877</Text>
    </View>
  )
}

export default AppointmentDetails