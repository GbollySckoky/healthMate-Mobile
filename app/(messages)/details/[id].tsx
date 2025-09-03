import React from 'react'
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { MessageHeader } from '@/components/Header/MessageHeader';
import Entypo from '@expo/vector-icons/Entypo';
import {
    Wrapper,
  } from '@/components/typography/Typography';
import { useRouter } from 'expo-router';
import MessageInput from './MessageInput';
import SafeArea from '@/components/safeAreaView/SafeAreaView';


const MessageDetails = () => {
    const image = require('../../../assets/images/Mobile.png')
    const router = useRouter()
    const handleBack = () => {
        router.back()
    }
  return (
    <SafeArea>
      <ScreenLayout>
          <MessageHeader 
              title="Dr James Uche"
              text="General Practitioner"
              image={image}
              backIcon={<Entypo name="chevron-small-left" size={24} color="black" />}
              _goBack={handleBack}
              alt='profile image'
              status='Active'
          />
          <ScreenOverFlowLayout>
              <Wrapper>
                  <MessageInput />
              </Wrapper>
          </ScreenOverFlowLayout>
      </ScreenLayout>
    </SafeArea>
  )
}

export default MessageDetails