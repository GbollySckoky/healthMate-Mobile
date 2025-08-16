import React, { useState } from 'react';
import { NavHeader } from '@/components/Header/Header';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
import {
  CardAmount,
  SubmitButton,
  Wrapper,
} from '@/components/typography/Typography';
import NumberInput from '@/components/Input/NumberInput';
import { Text, View } from 'react-native';
import { colors } from '@/lib/colors';
import Inputs from '@/components/Input/Inputs';
import Ionicons from '@expo/vector-icons/Ionicons';

type PhoneNumberInputType = Record<string, string>;

enum inputCount {
  ZERO,
  ONE,
  TWO,
  THREE,
}
const index = () => {
  const router = useRouter();
  const [isCount, setIsCount] = useState(inputCount.ZERO);
  const data = {
    phoneNumber: {
      label: 'Phone Number',
      placeholder: '228292',
    },
  };
  const [inputValue, setInputValue] = useState<PhoneNumberInputType>({});

  const handleInput = (key: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClick = () => {
    setIsCount(inputCount.ONE);
  };

  const handleNext = () => {
    setIsCount(inputCount.TWO);
  };
  const handleBackHome = () => {};
  return (
    <ScreenLayout>
      <NavHeader
        title="Edit Phone Number"
        _goBack={() => router.replace('/(profile)/settings')}
        backIcon={<Entypo name="chevron-small-left" size={24} color="black" />}
      />
      <ScreenOverFlowLayout>
        <Wrapper>
          {isCount === inputCount.ZERO && (
            <>
              <NumberInput
                {...data.phoneNumber}
                value={inputValue.phoneNumber}
                onChangeText={(value) => handleInput('phoneNumber', value)}
              />
              <SubmitButton _fn={handleClick}>Verify Number</SubmitButton>
            </>
          )}
          {isCount === inputCount.ONE && (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 15,
                }}
              >
                <Text
                  style={{
                    color: colors.lightBlack,
                    paddingBottom: 4,
                    fontWeight: '600',
                    fontSize: 20,
                  }}
                >
                  Verify Reset Code
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Lato_400Regular',
                    fontWeight: '400',
                    color: colors.gray,
                  }}
                >
                  Enter the 6-digit code sent to your email/phone.
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 10,
                }}
              >
                {[1, 2, 3, 4].map((number, index) => (
                  <Inputs
                    {...data.phoneNumber}
                    value={inputValue.phoneNumber}
                    onChangeText={(value) => handleInput('phoneNumber', value)}
                    key={index}
                  />
                ))}
              </View>
              <Text
                style={{
                  marginTop: 15,
                  fontWeight: '500',
                  fontSize: 14,
                  fontFamily: 'Lato_400Regular',
                }}
              >
                Didn’t receive it? Resend code in 30s
              </Text>
              <SubmitButton _fn={handleNext}>Verify</SubmitButton>
            </View>
          )}
          {isCount === inputCount.TWO && (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={{
                  paddingBottom: 8,
                  backgroundColor: colors.lightPurple,
                  borderRadius: 40,
                  padding: 10,
                }}
              >
                <Ionicons name="checkmark" size={24} color={colors.lightRed} />
              </Text>
              <CardAmount>Successful!</CardAmount>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 16,
                  fontFamily: 'LibreFranklin_400Regular',
                  color: colors.gray,
                  paddingTop: 8,
                }}
              >
                Phone number has been updated
              </Text>
              <SubmitButton _fn={handleBackHome}>Back to home</SubmitButton>
            </View>
          )}
        </Wrapper>
      </ScreenOverFlowLayout>
    </ScreenLayout>
  );
};

export default index;
