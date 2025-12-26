import React, { useState } from 'react';
import { NavHeader } from '@/components/Header/Header';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import Entypo from '@expo/vector-icons/Entypo';
import { SubmitButton, Wrapper } from '@/components/typography/Typography';
import { useRouter } from 'expo-router';
import Input from '@/components/Input/Input';
import SafeArea from '@/components/safeAreaView/SafeAreaView';
import { ROUTES } from '@/lib/routes';



type EditInputType = Record<string, string>;
const EditName = () => {
  const router = useRouter();
  const data = {
    firstName: {
      label: 'First Name',
      placeholder: 'Sarah',
    },
    lastName: {
      label: 'Surname',
      placeholder: 'Daniels',
    },
  };
  const [inputValue, setInputValue] = useState<EditInputType>({});

  const handleInput = (key: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleClick = () => {};
  console.log(inputValue);
  return (
    <SafeArea>
      <ScreenLayout>
        <NavHeader
          title="Edit Name"
          _goBack={() => router.back()}
          backIcon={<Entypo name="chevron-small-left" size={24} color="black" />}
        />
        <Wrapper>
          <Input
            {...data.firstName}
            value={inputValue.firstName}
            onChangeText={(value) => handleInput('firstName', value)}
          />
          <Input
            {...data.lastName}
            value={inputValue.lastName}
            onChangeText={(value) => handleInput('lastName', value)}
          />
          <SubmitButton _fn={handleClick}>Save Changes</SubmitButton>
        </Wrapper>
      </ScreenLayout>
    </SafeArea>
  );
};

export default EditName;
