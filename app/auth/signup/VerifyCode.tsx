import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Title, SubmitButton } from '@/components/typography/Typography';
import { colors } from '@/lib/colors';
import React, { useRef, useCallback, useState, useEffect } from 'react';
import { router } from 'expo-router';
import { ROUTES } from '@/lib/routes';
import { Ionicons } from '@expo/vector-icons';
import Modal from '@/components/modal/Modal';
import { useMutation } from '@tanstack/react-query';
import { verifyEmail } from '@/types/verifyEmail';
import { patientService } from '@/service/patientService';
import Toast from 'react-native-toast-message';
import { Signup } from '@/lib/interface/signup-interface';

interface FormErrors {
  [key: string]: string;
}

const VerifyEmail = ({
  inputValue,
  handleChange,
  handleNextComponent,
  openModal,
}: {
  inputValue: Signup; // Changed from string to Signup
  handleChange: (key: string, value: string) => void;
  handleNextComponent: () => void;
  openModal: boolean;
}) => {
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [resendTimer, setResendTimer] = useState(60); // Start with 60 seconds
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Timer countdown effect
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleCodeChange = useCallback(
    (index: number, value: string) => {
      if (value.length <= 1) {
        handleChange(`code${index}`, value);

        // Auto-focus next input if value is entered
        if (value && index < 5 && inputRefs.current[index + 1]) {
          inputRefs.current[index + 1]?.focus();
        }
      }
    },
    [handleChange]
  );

  const handleKeyPress = useCallback(
    (index: number, key: string) => {
      // Focus previous input on backspace if current input is empty
      if (
        key === 'Backspace' &&
        !inputValue[`code${index}` as keyof Signup] &&
        index > 0
      ) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [inputValue]
  );

  const verifyEmailMutation = useMutation({
    mutationFn: (payload: verifyEmail) =>
      patientService.verifyEmail(inputValue.email, payload),
    onSuccess: (response: any) => {
      console.log('RESPONSE!!', response);
      Toast.show({
        type: 'success',
        text1: 'Account verified successfully!',
        text2: 'You can now access your account',
      });
      // Open modal or navigate to next step
      setIsModalOpen(true);
    },
    onError: (error: any) => {
      console.log('ERROR!!!', error.response);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'An error occurred during verification. Please try again.';
      Toast.show({
        type: 'error',
        text1: errorMessage,
      });
      console.log('ERROR!!!', errorMessage, error);
    },
  });

  const handleVerifyCode = () => {
    // Concatenate all 6 code digits
    const otp = [0, 1, 2, 3, 4, 5]
      .map((i) => inputValue[`code${i}` as keyof Signup] || '')
      .join('');
    
    console.log('OTP:', otp);
    
    // Validate OTP length
    if (otp.length !== 6) {
      Toast.show({
        type: 'error',
        text1: 'Invalid code',
        text2: 'Please enter all 6 digits',
      });
      return;
    }

    const credentials: verifyEmail = {
      'otp_code': otp, // Changed from otp_code to 'otp-code'
    };

    console.log('Verifying with:', credentials);
    verifyEmailMutation.mutate(credentials);
  };

  const handleResendCode = () => {
    // Reset timer
    setResendTimer(60);

    // TODO: Call resend API
    Toast.show({
      type: 'info',
      text1: 'Code resent',
      text2: 'Check your email for the new verification code',
    });
  };

  return (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <Title>Verify Your Account</Title>
      <Text style={styles.verifySubtitle}>
        We've sent a 6-digit verification code to{' '}
        {inputValue.email || 'your email'}.
      </Text>

      {/* Code input fields */}
     <View style={styles.codeInputContainer}>
  {[0, 1, 2, 3, 4, 5].map((index) => (
    <TextInput
      key={index}
      ref={(ref) => {
        inputRefs.current[index] = ref;
      }}
      style={styles.codeInput}
      value={String(inputValue[`code${index}` as keyof Signup] || '')} // Convert to string
      onChangeText={(value) => handleCodeChange(index, value)}
      onKeyPress={({ nativeEvent }) =>
        handleKeyPress(index, nativeEvent.key)
      }
      keyboardType="numeric"
      maxLength={1}
      textAlign="center"
      accessibilityLabel={`Verification code digit ${index + 1}`}
    />
  ))}
</View>

      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn't receive it?</Text>
        <TouchableOpacity
          onPress={handleResendCode}
          disabled={resendTimer > 0}
          accessibilityRole="button"
          accessibilityLabel="Resend verification code"
        >
          <Text
            style={[
              styles.resendLink,
              resendTimer > 0 && styles.resendLinkDisabled,
            ]}
          >
            {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend code'}
          </Text>
        </TouchableOpacity>
      </View>

      <SubmitButton
        _fn={handleVerifyCode}
        disabled={verifyEmailMutation.isPending}
      >
        {verifyEmailMutation.isPending ? 'Verifying...' : 'Verify'}
      </SubmitButton>

      <Modal
        icon={<Ionicons name="checkmark" size={24} color={colors.lightRed} />}
        title="Successful!"
        text="Account successfully Verified"
        closeModal={() => setIsModalOpen(false)}
        isOpen={isModalOpen || openModal}
        route={() => router.push(ROUTES.signUpSuccess)}
        submitText="Continue"
      />
    </View>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({
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
    marginHorizontal: 20,
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

  errorText: {
    color: '#ef4444',
    fontSize: 12,
    fontFamily: 'Lato_400Regular',
    marginTop: 4,
    marginLeft: 4,
  },
});