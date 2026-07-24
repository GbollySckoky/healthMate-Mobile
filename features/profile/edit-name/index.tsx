import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import SafeArea from '@/components/safeAreaView/SafeAreaView';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import Nav from '@/components/Header/Nav';

import { ROUTES } from '@/lib/routes';
import { EditProfile } from '@/lib/interface/user';
import { patientService } from '@/service/patientService';
import useGetMe from '@/lib/hooks/useGetMe';
import ProfileForm from './ProfileForm';

export default function EditProfileScreen() {
  const queryClient = useQueryClient();

  const { patient, isLoading, refetch } = useGetMe();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: EditProfile) =>
      patientService.editProfile(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
      refetch();
      router.replace(ROUTES.profile);
    },

    onError: (err: AxiosError) => {
      console.log(err.response?.data);
    },
  });

  if (isLoading || !patient) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const initialValues: EditProfile = {
    firstName: patient.firstName,
    lastName: patient.lastName,
    phoneNumber: '',
    dateOfBirth: patient.profile.dateOfBirth,
    gender: patient.profile.gender,
    healthCondition: patient.profile.healthCondition,
    allergies: patient.profile.allergies,
    profilePicture: patient.profile.profilePicture,
  };

  return (
    <SafeArea>
      <ScreenLayout>
        <Nav title="Edit Profile" />
        <ScreenOverFlowLayout>
          <ProfileForm
            initialValues={initialValues}
            onSubmit={mutate}
            submitting={isPending}
            submitLabel="Save changes"
          />
        </ScreenOverFlowLayout>
      </ScreenLayout>
    </SafeArea>
  );
}