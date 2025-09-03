import React from 'react';
import { Text, View } from 'react-native';
import ConsultationPage from '../(consult)';
import SafeArea from '@/components/safeAreaView/SafeAreaView';
const Consultation = () => {
  return (
    <SafeArea>
    <ConsultationPage />
    </SafeArea>
  );
};

export default Consultation;
