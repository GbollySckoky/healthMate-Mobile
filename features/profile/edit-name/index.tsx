// app/(routes)/edit-profile.tsx
import React from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import ProfileForm from '@/components/ProfileForm';
import { patientService } from '@/service/patientService';
import { SubTitle } from '@/components/typography/Typography';
import { ROUTES } from '@/lib/routes';
import { EditProfile } from '@/lib/interface/user';
import ProfileForm from './ProfileForm';

export default function EditProfileScreen() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: () => patientService.getMe(),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: Partial<EditProfile>) => patientService.editProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
      router.replace(ROUTES.profile);
    },
    onError: (err) => {
      console.log('editProfile error', err);
    },
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={{ padding: 20, paddingBottom: 0 }}>
        <SubTitle>Edit profile</SubTitle>
      </View>
      <ProfileForm
        initialValues={data}
        onSubmit={(values: any) => mutate(values)}
        submitting={isPending}
        submitLabel="Save changes"
      />
    </ScrollView>
  );
}