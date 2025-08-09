import { NavHeader } from '@/constant/Header/Header'
import { useRouter } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { healthOverview } from '../data';
import { ScreenLayout } from '@/constant/ScreenLayout/ScreenLayout';
import { ScreenOverFlowLayout } from '@/constant/scrollView/ScreenOverFlowLayout';
import { Wrapper } from '@/constant/typography/Typography';
import HealthOverview from './_components/HealthOverview';

const TrackPage = () => {
    const router = useRouter()
  return (
    <ScreenLayout>
        <NavHeader 
            title="Track your Health"
            _goBack={() => router.push('/(tabs)/home')}
            _optionFn={() => router.push('/(tabs)/home')}
            backIcon={<Entypo name="chevron-small-left" size={24} color="black" />}
        />
         <ScreenOverFlowLayout>
            <Wrapper>
                {/* Cards */}
                <HealthOverview />
            </Wrapper>
        </ScreenOverFlowLayout>
    </ScreenLayout>
  )
}

export default TrackPage