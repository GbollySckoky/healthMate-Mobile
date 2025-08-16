import React, { useState } from 'react';
import { NavHeader } from '@/components/Header/Header';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
import { SubmitButton, Wrapper } from '@/components/typography/Typography';
import { passwordData } from '../data';
import PasswordInput from '@/components/Input/PasswordInput';
import useDisplay from '@/hooks/useDisplay';
import Modal from '@/components/modal/Modal';
import { colors } from '@/lib/colors';
import Ionicons from '@expo/vector-icons/Ionicons';

type ChangePasswordInputType = Record<string, string>;
type PasswordVisibilityType = Record<string, boolean>;

const ChangePassword = () => {
  const router = useRouter();
  const { oldPassword, newPassword, confirmPassword } = passwordData;
  const [inputValue, setInputValue] = useState<ChangePasswordInputType>({});
  const { openModal, handleDisplay } = useDisplay();
  const [passwordVisibility, setPasswordVisibility] =
    useState<PasswordVisibilityType>({
      oldPassword: false,
      newPassword: false,
      confirmPassword: false,
    });

  const handleInputChange = (key: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleToggleVisibility = (fieldId: string) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [fieldId]: !prev[fieldId],
    }));
  };

  const handleClick = () => {
    handleDisplay();
  };
  return (
    <ScreenLayout>
      <NavHeader
        title="Change Password"
        _goBack={() => router.replace('/(profile)/settings')}
        backIcon={<Entypo name="chevron-small-left" size={24} color="black" />}
      />
      <ScreenOverFlowLayout>
        <Wrapper>
          <PasswordInput
            {...oldPassword}
            value={inputValue.oldPassword || ''}
            onChangeText={(value) => handleInputChange('oldPassword', value)}
            secureTextEntry={!passwordVisibility.oldPassword}
            onToggleVisibility={() => handleToggleVisibility('oldPassword')}
            isPasswordVisible={passwordVisibility.oldPassword}
          />
          <PasswordInput
            {...newPassword}
            value={inputValue.newPassword || ''}
            onChangeText={(value) => handleInputChange('newPassword', value)}
            secureTextEntry={!passwordVisibility.newPassword}
            onToggleVisibility={() => handleToggleVisibility('newPassword')}
            isPasswordVisible={passwordVisibility.newPassword}
          />
          <PasswordInput
            {...confirmPassword}
            value={inputValue.confirmPassword || ''}
            onChangeText={(value) =>
              handleInputChange('confirmPassword', value)
            }
            secureTextEntry={!passwordVisibility.confirmPassword}
            onToggleVisibility={() => handleToggleVisibility('confirmPassword')}
            isPasswordVisible={passwordVisibility.confirmPassword}
          />
          <SubmitButton _fn={handleClick}>Update Password</SubmitButton>
          <Modal
            icon={
              <Ionicons name="checkmark" size={24} color={colors.lightRed} />
            }
            title="Password Updated"
            text="Your password has been updated successfully. You can change at any time."
            closeModal={handleDisplay}
            isOpen={openModal}
          />
        </Wrapper>
      </ScreenOverFlowLayout>
    </ScreenLayout>
  );
};

export default ChangePassword;
