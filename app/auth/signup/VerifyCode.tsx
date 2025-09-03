import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Title, SubmitButton, } from '@/components/typography/Typography';
import { colors } from '@/lib/colors';
import React, {  useRef, useCallback } from 'react'
import { router } from 'expo-router';
import { ROUTES } from '@/lib/routes';
import { Ionicons } from '@expo/vector-icons';
import { SignUpForm } from './index';
import Modal from '@/components/modal/Modal';

interface FormErrors {
    [key: string]: string;
}


export const VerifyCode = ({
    inputValue, 
    handleChange, 
    handleNextComponent,
    isLoading,
    resendTimer,
    openModal,
    errors
  }: {
    inputValue: SignUpForm, 
    handleChange: (key: string, value: string) => void,
    handleNextComponent: () => void,
    isLoading: boolean,
    resendTimer: number,
    openModal: boolean,
    errors: FormErrors
  }) => {
    const inputRefs = useRef<(TextInput | null)[]>([])
    const handleCodeChange = useCallback((index: number, value: string) => {
      if (value.length <= 1) {
        handleChange(`code${index}`, value)
        
        // Auto-focus next input if value is entered
        if (value && index < 5 && inputRefs.current[index + 1]) {
          inputRefs.current[index + 1]?.focus()
        }
      }
    }, [handleChange])
  
    const handleKeyPress = useCallback((index: number, key: string) => {
      // Focus previous input on backspace if current input is empty
      if (key === 'Backspace' && !inputValue[`code${index}` as keyof SignUpForm] && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    }, [inputValue])
  
  
    return (
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Title>Verify Your Account</Title>
        <Text style={styles.verifySubtitle}>
          We've sent a 6-digit verification code to your phone/email.
        </Text>
        
        {/* Code input fields */}
        <View style={styles.codeInputContainer}>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <TextInput
              key={index}
              // ref={(ref) => inputRefs.current[index] = ref}
              style={[
                styles.codeInput,
                errors.code && styles.codeInputError
              ]}
              value={inputValue[`code${index}` as keyof SignUpForm] || ''}
              onChangeText={(value) => handleCodeChange(index, value)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
              keyboardType="numeric"
              maxLength={1}
              textAlign="center"
              accessibilityLabel={`Verification code digit ${index + 1}`}
            />
          ))}
        </View>
        {/*  */}
        {/* {errors.code && <Text style={styles.errorText}>{errors.code}</Text>} */}
        
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>
            Didn't receive it? 
          </Text>
          <TouchableOpacity 
            // onPress={onResendCode} 
            disabled={resendTimer > 0}
            accessibilityRole="button"
            accessibilityLabel="Resend verification code"
          >
            <Text style={[
              styles.resendLink,
              resendTimer > 0 && styles.resendLinkDisabled
            ]}>
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend code'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <SubmitButton 
          _fn={handleNextComponent}
          // disabled={isLoading}/
          // accessibilityLabel="Verify account"
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </SubmitButton>
        
        <Modal
          icon={<Ionicons name="checkmark" size={24} color={colors.lightRed} />}
          title="Successful!"
          text="Account successfully Verified"
          closeModal={handleNextComponent}
          isOpen={openModal}
          route={() => router.push(ROUTES.signUpSuccess)}
          submitText="Continue"
        />
      </View>
    )
  }

  const styles = StyleSheet.create({
    // Verification code styles
  verifySubtitle: {
    fontFamily: 'Lato_400Regular', 
    fontSize: 16, 
    fontWeight: '400',
    color: colors.gray, 
    marginTop: 4,
    textAlign: 'center',
    marginBottom: 25,
  },
  
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 3,
    marginBottom: 20,
    marginHorizontal: 20
  },
  
  codeInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    fontSize: 18,
    fontWeight: '600',
    backgroundColor: 'white',
  },
  
  codeInputError: {
    borderColor: '#ef4444',
  },
  
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  
  resendText: {
    fontWeight: '500',
    fontSize: 14,
    fontFamily: 'Lato_400Regular',
    color: colors.gray,
  },
  
  resendLink: {
    fontWeight: '500',
    fontSize: 14,
    fontFamily: 'Lato_400Regular',
    color: colors.lightRed,
    marginLeft: 4,
  },
  
  resendLinkDisabled: {
    color: '#9ca3af',
  },
  
  // Error text style
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    fontFamily: 'Lato_400Regular',
    marginTop: 4,
    marginLeft: 4,
  },
  })