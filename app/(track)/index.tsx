import React from 'react';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import { Wrapper } from '@/components/typography/Typography';
import HealthOverview from './_components/HealthOverview';
import Nav from '@/components/Header/Nav';
import { Pressable, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors } from '@/lib/colors';

const TrackPage = () => {
  return (
    <ScreenLayout>
      <Nav
        title="Track your Health"
      />
      <ScreenOverFlowLayout>
        <Wrapper>
          {/* Cards */}
          <HealthOverview />
        </Wrapper>
      </ScreenOverFlowLayout>
      <Pressable 
        style={{
          backgroundColor: colors.lightRed, 
          width: 'auto', 
          borderRadius: 40,
          padding: 15, 
          position: 'absolute', 
          bottom: 20,
          right: 20,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <AntDesign name="plus" size={24} color="white" />
      </Pressable>
    </ScreenLayout>
  );
};

export default TrackPage;