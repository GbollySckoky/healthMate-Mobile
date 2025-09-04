import React from 'react';
import { Text, View } from 'react-native';
import TrackPage from '../track-screen/index';
import SafeArea from '@/components/safeAreaView/SafeAreaView';
const Track = () => {
  return (
    <SafeArea>
      <TrackPage />
    </SafeArea>
  );
};

export default Track;
