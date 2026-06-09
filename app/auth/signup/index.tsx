import React, { useState, useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Pressable,
} from 'react-native';
import { Wrapper } from '@/components/typography/Typography';
import { colors } from '@/lib/colors';
import EmailInput from '@/components/Input/EmailInput';
import PasswordInput from '@/components/Input/PasswordInput';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Image } from 'react-native';
import { router } from 'expo-router';
import { ROUTES } from '@/lib/routes';
import { CountStep } from '@/lib/constant';
import useDisplay from '@/hooks/useDisplay';
import SafeArea from '@/components/safeAreaView/SafeAreaView';
import { useDisplayList } from '@/hooks/useDisplayList';
import { patientService } from '@/service/patientService';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import VerifyEmail from './VerifyCode';
import { Signup } from '@/lib/interface/signup-interface';
import Input from '@/components/Input/Input';


const inputData = {
  email: {
    label: 'Email',
    placeholder: 'Enter email',
  },
  phone: {
    label: 'Phone Number',
    placeholder: 'Enter phone number',
  },
  firstName: {
    label: 'First Name',
    placeholder: 'Gbolly',
  },
  lastName: {
    label: 'Last Name',
    placeholder: 'Sckoky',
  },
  password: {
    label: 'Password',
    placeholder: '*********',
    closeIcon: <Feather name="eye-off" size={16} color="black" />,
    openIcon: <FontAwesome5 name="eye" size={16} color="black" />,
  },
  confirmPassword: {
    label: 'Confirm Password',
    placeholder: '*********',
    closeIcon: <Feather name="eye-off" size={16} color="black" />,
    openIcon: <FontAwesome5 name="eye" size={16} color="black" />,
  },
};

const SignUpPage = () => {
  const [inputValue, setInputValue] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    email: '',
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);
  const goggleLogo = require('../../../assets/images/google-logo.webp');
  const { openModal, handleDisplay } = useDisplay();
  const { currentStep, goToNextStep } = useDisplayList();

  const handleChange = useCallback((key: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const handleToggleVisibility = useCallback(
    (field: 'password' | 'confirmPassword') => {
      if (field === 'password') {
        setPasswordVisibility((prev) => !prev);
      } else {
        setConfirmPasswordVisibility((prev) => !prev);
      }
    },
    []
  );


  const signupMutation = useMutation({
    mutationFn: (payload: Signup) => patientService.signup(payload),
    onSuccess: (response: any) => {
      console.log('RESPONSE!!', response);
      goToNextStep();
      Toast.show({
        type: 'success',
        text1: 'Account created successfully!',
        text2: 'Please verify your account',
      });
    },
    onError: (error: any) => {
      console.log(error); // look into the error response
      const errorMessage = error.response.data; //Look into the error response
      // || 'An error occurred during sign up. Please try again.';

      Toast.show({
        type: 'error',
        text1: errorMessage,
      });
    },
  });

  const handleSignUp = async () => {
    Keyboard.dismiss();

    // Validate passwords match
    if (inputValue.password !== inputValue.confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Password and Confirm Password must be same',
      });
      return;
    }

    // Map form state to API payload format
    const credentials: Signup = {
      email: inputValue.email,
      password: inputValue.password,
      confirmPassword: inputValue.confirmPassword,
      firstName: inputValue.firstName,
      lastName: inputValue.lastName,
    };

    console.log(credentials);
    await signupMutation.mutate(credentials);
  };

  return (
    <SafeArea>
      <Wrapper>
        {currentStep === CountStep.ZERO && (
          <View>
            <View style={styles.headerContainer}>
              <Text style={styles.welcomeTitle}>
                Create your HealthMate account
              </Text>
              <Text style={styles.welcomeSubtitle}>
                Sign up with your phone number or email to begin.
              </Text>
            </View>


            {/* Form Content */}
            <View style={styles.formContainer}>
               <Input
                {...inputData.firstName}
                value={inputValue.firstName || ''}
                onChangeText={(value) => handleChange('firstName', value)}
              />
              <Input
                {...inputData.lastName}
                value={inputValue.lastName || ''}
                onChangeText={(value) => handleChange('lastName', value)}
              />
              <EmailInput
                label={inputData.email.label}
                placeholder={inputData.email.placeholder}
                value={inputValue.email}
                onChangeText={(value) => handleChange('email', value)}
              />
             
              <View>
                <PasswordInput
                  {...inputData.password}
                  value={inputValue.password}
                  onChangeText={(value) => handleChange('password', value)}
                  secureTextEntry={!passwordVisibility}
                  onToggleVisibility={() => handleToggleVisibility('password')}
                  isPasswordVisible={passwordVisibility}
                />
                <PasswordInput
                  {...inputData.confirmPassword}
                  value={inputValue.confirmPassword}
                  onChangeText={(value) => handleChange('confirmPassword', value)}
                  secureTextEntry={!confirmPasswordVisibility}
                  onToggleVisibility={() => handleToggleVisibility('confirmPassword')}
                  isPasswordVisible={confirmPasswordVisibility}
                />
              </View>
            </View>

            {/* Sign up Button */}
            <Pressable
              style={[
                styles.loginButton,
                signupMutation.isPending && styles.loginButtonDisabled,
              ]}
              onPress={handleSignUp}
              disabled={signupMutation.isPending}
              accessibilityRole="button"
              accessibilityLabel="Create account"
            >
              <Text style={styles.loginButtonText}>
                {signupMutation.isPending ? 'Creating Account...' : 'Sign Up'}
              </Text>
            </Pressable>

            {/* Login Link */}
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => router.push(ROUTES.login)}
                accessibilityRole="link"
                accessibilityLabel="Go to login page"
              >
                <Text style={styles.signUpLink}>Login</Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Google Sign In */}
            <TouchableOpacity
              style={styles.googleButton}
              accessibilityRole="button"
              accessibilityLabel="Sign up with Google"
            >
              <Image
                source={goggleLogo}
                alt="Google Logo"
                style={{ width: 20, height: 20 }}
              />
              <Text style={styles.googleButtonText}> Sign up with Google</Text>
            </TouchableOpacity>
          </View>
        )}

        {currentStep === CountStep.ONE && (
          <VerifyEmail
            inputValue={inputValue}
            handleChange={handleChange}
            handleNextComponent={goToNextStep}
            openModal={openModal}
          />
        )}
      </Wrapper>
    </SafeArea>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 32,
  },
  welcomeTitle: {
    fontFamily: 'Lato_700Bold',
    fontSize: 20,
    fontWeight: '600',
    color: colors.black,
  },
  welcomeSubtitle: {
    fontFamily: 'Lato_400Regular',
    fontSize: 16,
    fontWeight: '400',
    color: colors.gray,
    marginTop: 3,
    lineHeight: 24,
  },

  // Custom tab styling
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 4,
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Lato_500Medium',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#1f2937',
    fontWeight: '600',
  },

  formContainer: {
    marginBottom: 16,
  },

  loginButton: {
    backgroundColor: '#ec4899',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Lato_600SemiBold',
  },

  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  signUpText: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'LibreFranklin_400Regular',
    fontWeight: '500',
  },
  signUpLink: {
    fontSize: 14,
    color: colors.lightRed,
    fontFamily: 'LibreFranklin_400Regular',
    fontWeight: '500',
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#9ca3af',
    fontFamily: 'Lato_400Regular',
  },

  googleButton: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  googleButtonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },

  // Error text style
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    fontFamily: 'Lato_400Regular',
    marginTop: 4,
    marginLeft: 4,
  },
});
