import React from 'react'
import { healthData } from '../data'
import { View, Text, StyleSheet } from 'react-native';
import { NavHeader } from '@/components/Header/Header';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
import {
    Wrapper,
    Card
} from '@/components/typography/Typography';


const index = () => {
    const router = useRouter();
    
    const handleGoBack = () => {
        router.back(); 
    };
  return (
    <ScreenLayout>
        <NavHeader
            title="My Health Info" 
            _goBack={handleGoBack}
            backIcon={<Entypo name="chevron-small-left" size={24} color="black" />}
        />
        <ScreenOverFlowLayout>
            <Wrapper>
            </Wrapper>
        </ScreenOverFlowLayout>
    </ScreenLayout>
  )
}

export default index