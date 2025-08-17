import { useRouter } from 'expo-router';
import React from 'react';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import { Wrapper } from '@/components/typography/Typography';
import HealthOverview from './_components/HealthOverview';
import Nav from '@/components/Header/Nav';

const TrackPage = () => {
  const router = useRouter();
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
    </ScreenLayout>
  );
};

export default TrackPage;
