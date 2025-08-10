import React, { useState } from 'react'
import { NavHeader } from '@/components/Header/Header';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
import {  SubmitButton, Wrapper } from '@/components/typography/Typography';




const HealthInfo = () => {
    const router = useRouter()
  return (
    <ScreenLayout>
    <NavHeader 
      title='Settings'
      _goBack={() => router.replace('/(profile)')}
      backIcon={<Entypo name="chevron-small-left" size={24} color="black"  />}
    />
      <ScreenOverFlowLayout>
        <Wrapper>
        </Wrapper>
        </ScreenOverFlowLayout>
    </ScreenLayout>
  )
}

export default HealthInfo