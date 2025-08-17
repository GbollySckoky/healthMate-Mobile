import { NavHeader } from '@/components/Header/Header';
import { useRouter } from 'expo-router';
import React from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import { Wrapper } from '@/components/typography/Typography';
import HealthOverview from './_components/HealthOverview';

const TrackPage = () => {
  const router = useRouter();
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
  );
};

export default TrackPage;
