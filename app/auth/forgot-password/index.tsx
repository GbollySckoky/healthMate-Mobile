import React, { useState } from 'react'
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import { SubmitButton, Title, Wrapper } from '@/components/typography/Typography';
import { router, useRouter} from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import { NavHeader } from '@/components/Header/Header';
import { Text, View } from 'react-native';
import { colors } from '@/lib/colors';
import Input from '@/components/Input/Input';
import useTracker from '@/hooks/useTrackers';
import { FormStep } from '@/lib/constant';
import Inputs from '@/components/Input/Inputs';
import PasswordInput from '@/components/Input/PasswordInput';
import { passwordData } from '@/app/settings/data'; 
import useDisplay from '@/hooks/useDisplay';
import Modal from '@/components/modal/Modal';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ROUTES } from '@/lib/routes';


type ForgotPasswordType = Record<string, string>
type PasswordVisibilityType = Record<string, boolean>;


const ForgotPassword = () => {
    const router = useRouter()
    const [inputValue, setInputValue] = useState<ForgotPasswordType>({})
    const { displayComponents, handleDisplayComponent} = useTracker()

    const email = {
        label: 'Email or Phone Number',
        placeholder: 'Enter email',
    }

    const handleChange = (key: string, value: string) => {
        setInputValue((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    const handleNext = () => {
        if(displayComponents === FormStep.ZERO){
            handleDisplayComponent(FormStep.ONE)
        } else{
            handleDisplayComponent(FormStep.TWO)
        }

    }

    const handleVerify = () => {
        // Handle verification logic here
        console.log('Verifying code...')
    }

  return (
    <ScreenLayout>
        <NavHeader
            title="Forgot Password"
            _goBack={() => router.back()}
            backIcon={<Entypo name="chevron-small-left" size={24} color="black" />}
        />
        <ScreenOverFlowLayout>
            <Wrapper>
                {displayComponents === FormStep.ZERO && (
                    <View>
                        <Title>Forgot Password?</Title>
                        <Text style={{fontFamily: 'LibreFranklin_400Regular', fontWeight: '400', fontSize: 16, marginTop: 4, marginBottom: 10,color: colors.gray}}>
                            Enter your email or phone number. We'll send you a reset code.
                        </Text>
                        <Input 
                            {...email}
                            value={inputValue.info || ''}
                            onChangeText={(value) => handleChange('info', value)}
                        />
                        <Text style={{color: colors.red, fontFamily: 'Inter_400Regular', fontWeight: '400',fontSize: 12}}>
                            We couldn't find an account with that email
                        </Text>
                        <SubmitButton _fn={handleNext}>
                            Reset Password
                        </SubmitButton>
                    </View>
                )}
                {displayComponents === FormStep.ONE && (
                    <VerifyCode 
                        inputValue={inputValue} 
                        handleChange={handleChange}
                        handleNext={handleNext}
                    />
                )}
                {displayComponents === FormStep.TWO && (
                    <ChangePassword
                        inputValue={inputValue} 
                        handleChange={handleChange}
                        handleNext={handleNext}
                    />
                )}
            </Wrapper>
        </ScreenOverFlowLayout>
    </ScreenLayout>
  )
}

// Fixed VerifyCode component with proper props typing
const VerifyCode = ({
    inputValue, 
    handleChange, 
    handleNext
}: {
    inputValue: ForgotPasswordType, 
    handleChange: (key: string, value: string) => void,
    handleNext: () => void
}) => (
    <View style={{alignItems: 'center'}}>
        <Title>Verify Reset Code</Title>
        <Text style={{
            fontFamily: 'Lato_400Regular', 
            fontSize: 16, 
            fontWeight: '400',
            color: colors.gray, 
            marginTop: 4,
            textAlign: 'center'
        }}>
            Enter the 6-digit code sent to your email/phone.
        </Text>
        
        {/* Code input fields */}
        <View 
            style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 10,
                  marginTop: 25
            }}>
            {[0, 1, 2, 3].map((index) => (
                <Inputs
                    key={index}
                    value={inputValue[`code${index}`] || ''}
                    onChangeText={(value) => handleChange(`code${index}`, value)}
                />
            ))}
        </View>
        
        <Text style={{
            marginTop: 30,
            fontWeight: '500',
            fontSize: 14,
            fontFamily: 'Lato_400Regular',
            textAlign: 'center'
        }}>
            Didn't receive it? Resend code in 30s
        </Text>
        
        <SubmitButton _fn={handleNext}>
            Verify
        </SubmitButton>
    </View>
)


// Change Password
const ChangePassword = ({
    inputValue, 
    handleChange, 
    handleNext
}: {
    inputValue: ForgotPasswordType, 
    handleChange: (key: string, value: string) => void,
    handleNext: () => void
}) => {
    const {  newPassword, confirmPassword } = passwordData;
    const [passwordVisibility, setPasswordVisibility] =
    useState<PasswordVisibilityType>({
      newPassword: false,
      confirmPassword: false,
    });
    const { openModal, handleDisplay } = useDisplay();


    const handleToggleVisibility = (fieldId: string) => {
        setPasswordVisibility((prev) => ({
          ...prev,
          [fieldId]: !prev[fieldId],
        }));
      };
    
      const handleClick = () => {
        handleDisplay();
      };

    return(
    <View >
        <Title>Set New Password</Title>
        <Text style={{
            fontFamily: 'Lato_400Regular', 
            fontSize: 16, 
            fontWeight: '400',
            color: colors.gray, 
            marginTop: 4,
            marginBottom: 10
        }}>
            Choose a strong password to protect your account.
        </Text>
        
        <PasswordInput
            {...newPassword}
            value={inputValue.newPassword || ''}
            onChangeText={(value) => handleChange('newPassword', value)}
            secureTextEntry={!passwordVisibility.newPassword}
            onToggleVisibility={() => handleToggleVisibility('newPassword')}
            isPasswordVisible={passwordVisibility.newPassword}
          />
          <PasswordInput
            {...confirmPassword}
            value={inputValue.confirmPassword || ''}
            onChangeText={(value) =>
              handleChange('confirmPassword', value)
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
            route={() => router.push(ROUTES.login)}
            submitText='Done'
          />
    </View>
)
}

export default ForgotPassword