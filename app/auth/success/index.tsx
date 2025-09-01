import { SubmitButton, Wrapper } from '@/components/typography/Typography'
import { useDisplayList } from '@/hooks/useDisplayList'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import Form from './Form'
import { CountStep } from '@/lib/constant'
import { router } from 'expo-router'
import { ROUTES } from '@/lib/routes'

const Success = () => {
  const image = require('../../../assets/images/ChatGPT_Image_Jul_17__2025__02_53_49_AM-removebg-preview 1.png')
  const {goToNextStep, goToPreviousStep, currentStep} = useDisplayList() 
  return (
    <View style={{ flex: 1, backgroundColor: '#C11574' }}>
      <View 
        style={{ 
            flex: 1,
            width: '92%',
            marginLeft: 'auto',
            marginRight: 'auto', }}>
        {/* Top content */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={image} />
          <Text
            style={{
              fontFamily: 'LibreFranklin_600SemiBold',
              fontWeight: '600',
              color: 'white',
              marginTop: 25,
              textAlign: 'center',
              fontSize: 24,
            }}
          >
            Hey there!
          </Text>
          <Text
            style={{
              fontFamily: 'LibreFranklin_600SemiBold',
              fontWeight: '600',
              color: 'white',
              textAlign: 'center',
              fontSize: 24,
            }}
          >
            lets set you up in a few steps
          </Text>
        </View>

        {/* Bottom button */}
        <TouchableOpacity
          style={{
            marginBottom: 40, // adds some spacing from bottom
            backgroundColor: 'white',
            borderRadius: 10,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => router.push(ROUTES.about)}
          >
          <Text
            style={{
              color: '#C11574',
              fontSize: 16,
              fontWeight: '600',
              fontFamily: 'Inter_600SemiBold',
              paddingVertical: 10,
            }}
          >
            Next
          </Text>
        </TouchableOpacity>
        {/* {currentStep === CountStep.ONE && <Form />} */}
      </View>
    </View>
  )
}

export default Success
