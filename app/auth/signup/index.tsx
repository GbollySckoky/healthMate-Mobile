import React, { useState, useCallback } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Keyboard, Pressable } from 'react-native'
import { Wrapper} from '@/components/typography/Typography';
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
import { signup } from '@/types/signup';
import { patientService } from '@/service/patientService';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import Input from '@/components/Input/Input';
import VerifyEmail from './VerifyCode';


export interface SignUpForm {
  email?: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string
}

type TabType = 'email' | 'phone'

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
    closeIcon: <Feather name="eye-off" size={20} color="black" />,
    openIcon: <FontAwesome5 name="eye" size={20} color="black" />,
  },
  confirmPassword: {
    label: 'Confirm Password',
    placeholder: '*********',
    closeIcon: <Feather name="eye-off" size={20} color="black" />,
    openIcon: <FontAwesome5 name="eye" size={20} color="black" />,
  },
}

const SignUpPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('email')
  const [inputValue, setInputValue] = useState<SignUpForm>({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  })
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false)
  const goggleLogo = require('../../../assets/images/google-logo.webp')
  const { openModal, handleDisplay } = useDisplay()
  const {currentStep, goToNextStep,} = useDisplayList()

  const handleChange = useCallback((key: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [key]: value
    }))
   
  },[])

  const handleToggleVisibility = useCallback((field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      setPasswordVisibility((prev) => !prev)
    } else {
      setConfirmPasswordVisibility((prev) => !prev)
    }
  }, [])

  const handleTabSwitch = useCallback((tab: TabType) => {
    setActiveTab(tab)
  }, [])

  const signupMutation = useMutation({
    mutationFn: (payload: signup) => patientService.signup(payload),
    onSuccess: (response: any) => {
      console.log('RESPONSE!!',response)
      goToNextStep()  
      Toast.show({
        type: 'success',
        text1: 'Account created successfully!',
        text2: 'Please verify your account'
      })
    },
    onError: (error: any) => {
      // Handle different error scenarios
      const errorMessage = error.response.data.message 
        || 'An error occurred during sign up. Please try again.';
      
      Toast.show({
        type: 'error',
        text1: errorMessage
      })
    }
  })

  const handleSignUp = async () => {
    Keyboard.dismiss()
  
    const credentials: signup = {
      email: inputValue[inputKey] || '',
      password: inputValue.password || '',
      firstName: inputValue.firstName || '',
      lastName: inputValue.lastName || '',
      role: 'patient',
      phoneNumber: "07075408887"
    }; 

    if(inputValue.password !== inputValue.confirmPassword){
      Toast.show({
        type: 'error',
        text1: 'Password and Confirm Password must be same'
      })
      return
    }

    signupMutation.mutate(credentials)

  }

  const inputKey = activeTab === 'email' ? 'email' : 'phone'
  const inputConfig = activeTab === 'email' ? inputData.email : inputData.phone

  return (
    <SafeArea>
      <Wrapper>
        {currentStep === CountStep.ZERO && (
          <View>
            <View style={styles.headerContainer}>
              <Text style={styles.welcomeTitle}>Create your HealthMate account</Text>
              <Text style={styles.welcomeSubtitle}>
                Sign up with your phone number or email to begin.
              </Text>
            </View>
            
            {/* Custom Tab Implementation */}
            <View style={styles.tabContainer}>
              <TouchableOpacity 
                style={[
                  styles.tabButton, 
                  activeTab === 'email' && styles.activeTabButton
                ]}
                onPress={() => handleTabSwitch('email')}
                accessibilityRole="tab"
                accessibilityState={{ selected: activeTab === 'email' }}
                accessibilityLabel="Email signup option"
              >
                <Text style={[
                  styles.tabText,
                  activeTab === 'email' && styles.activeTabText
                ]}>
                  Email
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.tabButton, 
                  activeTab === 'phone' && styles.activeTabButton
                ]}
                onPress={() => handleTabSwitch('phone')}
                accessibilityRole="tab"
                accessibilityState={{ selected: activeTab === 'phone' }}
                accessibilityLabel="Phone number signup option"
              >
                <Text style={[
                  styles.tabText,
                  activeTab === 'phone' && styles.activeTabText
                ]}>
                  Phone Number
                </Text>
              </TouchableOpacity>
            </View>

            {/* Form Content */}
            <View style={styles.formContainer}>
              <EmailInput
                {...inputConfig}
                value={inputValue[inputKey as keyof SignUpForm] || ''}
                onChangeText={(value) => handleChange(inputKey, value)}
              //   accessibilityLabel={`Enter your ${activeTab}`}
              />
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
              <View >
                <PasswordInput 
                  {...inputData.password}
                  value={inputValue.password}
                  onChangeText={(value) => handleChange('password', value)}
                  secureTextEntry={!passwordVisibility}
                  onToggleVisibility={() => handleToggleVisibility('password')}
                  isPasswordVisible={passwordVisibility}
                  // accessibilityLabel="Enter your password"
                />
                <View >
                  <PasswordInput 
                    {...inputData.confirmPassword}
                    value={inputValue.confirmPassword}
                    onChangeText={(value) => handleChange('confirmPassword', value)}
                    secureTextEntry={!confirmPasswordVisibility}
                    onToggleVisibility={() => handleToggleVisibility('confirmPassword')}
                    isPasswordVisible={confirmPasswordVisibility}
                  //   accessibilityLabel="Confirm your password"
                  />
                </View>
              </View>
            </View>

            {/* Sign up Button */}
            <Pressable 
              style={[
                styles.loginButton,
                signupMutation.isPending && styles.loginButtonDisabled
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
              <Image source={goggleLogo} alt='Google Logo' style={{ width: 20, height: 20 }} />
              <Text style={styles.googleButtonText}> Sign up with Google</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {currentStep === CountStep.ONE && (
          <VerifyEmail 
            inputValue={inputValue} 
            handleChange={handleChange} 
            handleNextComponent={goToNextStep}
            // isLoading={signupMutation.isPending}
            // resendTimer={resendTimer}
            openModal={openModal}
          />
        )}
      </Wrapper>
    </SafeArea>
  )
}



export default SignUpPage

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
    fontWeight: '500'
  },
  signUpLink: {
    fontSize: 14,
    color: colors.lightRed,
    fontFamily: 'LibreFranklin_400Regular',
    fontWeight: '500'
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
})