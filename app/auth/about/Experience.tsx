import {
    Wrapper,
    Title,
    BtnFlex,
    SubmitButton,
  } from '@/components/typography/Typography';
  import React, { useState } from 'react';
  import { View, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
  import Input from '@/components/Input/Input';
  import SafeArea from '@/components/safeAreaView/SafeAreaView';
  import { NavHeader } from '@/components/Header/Header';
  import { useRouter } from 'expo-router';
  import Entypo from '@expo/vector-icons/Entypo';
  import { colors } from '@/lib/colors';
  import { ROUTES } from '@/lib/routes';
  import { useMutation } from '@tanstack/react-query';
  import { patientService } from '@/service/patientService';
  import Toast from 'react-native-toast-message';
  import { CreateHealth } from '@/lib/interface/create-health-interface';
  
  interface experienceInputType {
    goToNextStep: () => void;
    goToPreviousStep: () => void;
  }
  
  export type InputValueFormType = Record<string, string>;
  
  const Experience = ({
    goToNextStep,
    goToPreviousStep,
  }: experienceInputType) => {
    const [inputValue, setInputValue] = useState<InputValueFormType>({});
    const router = useRouter();
  
    const handleChangeInput = (key: string, value: string) => {
      setInputValue((prev) => ({
        ...prev,
        [key]: value,
      }));
    };
  
    const formData = {
      healthCondition: {
        label: 'Health Condition',
        placeholder: 'Enter your health condition',
      },
      allergies: {
        label: 'Allergies',
        placeholder: 'Enter any allergies',
        id: 1,
      },
    };
  
    const createHealthMutation = useMutation({
      mutationFn: (payload: CreateHealth) => patientService.createHealth(payload),
      onSuccess: (response: any) => {
        console.log('RESPONSE!!', response);
        Toast.show({
          type: 'success',
          text1: 'Health information saved successfully!',
          text2: 'Welcome to the app',
        });
        // Navigate to welcome page after success
        router.push(ROUTES.welcome);
      },
      onError: (error: any) => {
        console.log('ERROR:', error.response);
        const errorMessage = 
          error.response?.data?.message || 
          error.response?.data || 
          error.message ||
          'An error occurred while saving your health information. Please try again.';
  
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: String(errorMessage),
        });
      },
    });
  
    const handleFinish = async () => {
      Keyboard.dismiss();
  
      // Validate that at least one field is filled
      if (!inputValue.healthCondition && !inputValue.allergies) {
        Toast.show({
          type: 'error',
          text1: 'Required fields',
          text2: 'Please fill in at least one field',
        });
        return;
      }
  
      // Map form state to API payload format
      const credentials: CreateHealth = {
        health_condition: inputValue.healthCondition || '',
        allergies: inputValue.allergies || '',
      };
  
      console.log('Submitting health data:', credentials);
      createHealthMutation.mutate(credentials);
    };
  
    const handleSkip = () => {
      router.push(ROUTES.welcome);
    };
  
    return (
      <SafeArea>
        <NavHeader
          _goBack={goToPreviousStep}
          backIcon={<Entypo name="chevron-small-left" size={24} color="black" />}
        />
        <View style={{ flex: 1, width: '92%', margin: 'auto', marginTop: 15 }}>
          <Title>Let's personalize your experience</Title>
          <Text
            style={{
              marginTop: 4,
              fontWeight: '400',
              fontFamily: 'Lato_400Regular',
              fontSize: 16,
              color: '#717680',
            }}
          >
            These help us track your health more accurately.
          </Text>
  
          <View style={{ marginTop: 20 }}>
            <Input
              {...formData.healthCondition}
              value={inputValue.healthCondition}
              onChangeText={(value) => handleChangeInput('healthCondition', value)}
            />
            <Input
              {...formData.allergies}
              value={inputValue.allergies}
              onChangeText={(value) => handleChangeInput('allergies', value)}
            />
          </View>
  
          {/* Buttons pinned at bottom */}
          <View style={styles.bottomBtnContainer}>
            <TouchableOpacity
              style={styles.outlineBtn}
              onPress={handleSkip}
              disabled={createHealthMutation.isPending}
            >
              <Text style={styles.outlineBtnText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.joinBtn,
                createHealthMutation.isPending && styles.joinBtnDisabled
              ]}
              onPress={handleFinish}
              disabled={createHealthMutation.isPending}
            >
              <Text style={styles.buttonText}>
                {createHealthMutation.isPending ? 'Saving...' : 'Finish'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeArea>
    );
  };
  
  export default Experience;
  
  const styles = StyleSheet.create({
    bottomBtnContainer: {
      marginBottom: 40,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      paddingHorizontal: 16,
      gap: 15,
      backgroundColor: 'white',
    },
    joinBtn: {
      flex: 1,
      paddingVertical: 12,
      backgroundColor: '#DD2591',
      borderRadius: 8,
      alignItems: 'center',
      color: 'white',
    },
    joinBtnDisabled: {
      opacity: 0.6,
    },
    buttonText: {
      fontSize: 14,
      fontWeight: '600',
      fontFamily: 'Inter_600SemiBold',
      color: '#fff',
    },
    outlineBtn: {
      flex: 1,
      paddingVertical: 12,
      borderColor: colors.broderColor,
      borderWidth: 1,
      borderRadius: 8,
      alignItems: 'center',
      color: 'white',
    },
    outlineBtnText: {
      fontSize: 14,
      fontWeight: '600',
      fontFamily: 'Inter_600SemiBold',
      color: colors.black,
    },
  });