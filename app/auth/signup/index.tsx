import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout'
import React, { useState, useRef, useCallback } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Alert, Keyboard } from 'react-native'
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import { Wrapper, Title, SubmitButton, } from '@/components/typography/Typography';
import { colors } from '@/lib/colors';
import EmailInput from '@/components/Input/EmailInput';
import PasswordInput from '@/components/Input/PasswordInput';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Image } from 'react-native';
import { router } from 'expo-router';
import { ROUTES } from '@/lib/routes';
import useTracker from '@/hooks/useTrackers';
import { FormStep } from '@/lib/constant';
import Nav from '@/components/Header/Nav';
import Modal from '@/components/modal/Modal';
import Ionicons from '@expo/vector-icons/Ionicons';
import useDisplay from '@/hooks/useDisplay';

// Improved type definitions
interface SignUpForm {
  email?: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  code0?: string;
  code1?: string;
  code2?: string;
  code3?: string;
  code4?: string;
  code5?: string;
}

type TabType = 'email' | 'phone'

interface FormErrors {
  [key: string]: string;
}

const inputData = {
  email: {
    label: 'Email',
    placeholder: 'Enter email',
  },
  phone: {
    label: 'Phone Number', 
    placeholder: 'Enter phone number',
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
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)
  const { displayComponents, handleDisplayComponent } = useTracker()
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false)
  const goggleLogo = require('../../../assets/images/google-logo.webp')
  const { handleDisplay } = useDisplay()

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  }

  const validatePassword = (password: string): boolean => {
    return password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)
  }

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {}

    // Validate email or phone
    if (activeTab === 'email') {
      if (!inputValue.email) {
        newErrors.email = 'Email is required'
      } else if (!validateEmail(inputValue.email)) {
        newErrors.email = 'Please enter a valid email address'
      }
    } else {
      if (!inputValue.phone) {
        newErrors.phone = 'Phone number is required'
      } else if (!validatePhone(inputValue.phone)) {
        newErrors.phone = 'Please enter a valid phone number'
      }
    }

    // Validate password
    if (!inputValue.password) {
      newErrors.password = 'Password is required'
    } else if (!validatePassword(inputValue.password)) {
      newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number'
    }

    // Validate confirm password
    if (!inputValue.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (inputValue.password !== inputValue.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [activeTab, inputValue])

  const validateVerificationCode = useCallback((): boolean => {
    const code = [0, 1, 2, 3, 4, 5].map(i => inputValue[`code${i}` as keyof SignUpForm] || '').join('')
    if (code.length !== 6) {
      setErrors({ code: 'Please enter the complete 6-digit code' })
      return false
    }
    setErrors({})
    return true
  }, [inputValue])

  const handleChange = useCallback((key: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [key]: value
    }))
    
    // Clear specific error when user starts typing
    if (errors[key]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[key]
        return newErrors
      })
    }
  }, [errors])

  const handleToggleVisibility = useCallback((field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      setPasswordVisibility((prev) => !prev)
    } else {
      setConfirmPasswordVisibility((prev) => !prev)
    }
  }, [])

  const handleTabSwitch = useCallback((tab: TabType) => {
    setActiveTab(tab)
    setErrors({}) // Clear errors when switching tabs
  }, [])

  const handleSignUp = async () => {
    Keyboard.dismiss()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      if (displayComponents === FormStep.ZERO) {
        handleDisplayComponent(FormStep.ONE)
        // Start resend timer
        setResendTimer(30)
        const timer = setInterval(() => {
          setResendTimer(prev => {
            if (prev <= 1) {
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = () => {
    handleDisplay()
  }

  const handleResendCode = async () => {
    if (resendTimer > 0) return
    
    try {
      // Simulate resend API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setResendTimer(30)
      const timer = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      
      Alert.alert('Success', 'Verification code sent!')
    } catch (error) {
      Alert.alert('Error', 'Failed to resend code. Please try again.')
    }
  }

  const inputKey = activeTab === 'email' ? 'email' : 'phone'
  const inputConfig = activeTab === 'email' ? inputData.email : inputData.phone

  return (
    <ScreenLayout>
      <ScreenOverFlowLayout>
        <Nav />
        <Wrapper>
          {displayComponents === FormStep.ZERO && (
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
                {errors[inputKey] && <Text style={styles.errorText}>{errors[inputKey]}</Text>}
                
                <View style={{ marginTop: 16 }}>
                  <PasswordInput 
                    {...inputData.password}
                    value={inputValue.password}
                    onChangeText={(value) => handleChange('password', value)}
                    secureTextEntry={!passwordVisibility}
                    onToggleVisibility={() => handleToggleVisibility('password')}
                    isPasswordVisible={passwordVisibility}
                    // accessibilityLabel="Enter your password"
                  />
                  {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                  
                  <View style={{ marginTop: 12 }}>
                    <PasswordInput 
                      {...inputData.confirmPassword}
                      value={inputValue.confirmPassword}
                      onChangeText={(value) => handleChange('confirmPassword', value)}
                      secureTextEntry={!confirmPasswordVisibility}
                      onToggleVisibility={() => handleToggleVisibility('confirmPassword')}
                      isPasswordVisible={confirmPasswordVisibility}
                    //   accessibilityLabel="Confirm your password"
                    />
                    {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
                  </View>
                </View>
              </View>

              {/* Sign up Button */}
              <TouchableOpacity 
                style={[
                  styles.loginButton,
                  isLoading && styles.loginButtonDisabled
                ]} 
                onPress={handleSignUp}
                disabled={isLoading}
                accessibilityRole="button"
                accessibilityLabel="Create account"
              >
                <Text style={styles.loginButtonText}>
                  {isLoading ? 'Creating Account...' : 'Sign Up'}
                </Text>
              </TouchableOpacity>

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
          
          {displayComponents === FormStep.ONE && (
            <VerifyCode 
              inputValue={inputValue} 
              handleChange={handleChange} 
              handleNextComponent={handleVerifyCode}
              isLoading={isLoading}
              resendTimer={resendTimer}
              onResendCode={handleResendCode}
              errors={errors}
            />
          )}
        </Wrapper>
      </ScreenOverFlowLayout>
    </ScreenLayout>
  )
}

const VerifyCode = ({
  inputValue, 
  handleChange, 
  handleNextComponent,
  isLoading,
  resendTimer,
  onResendCode,
  errors
}: {
  inputValue: SignUpForm, 
  handleChange: (key: string, value: string) => void,
  handleNextComponent: () => void,
  isLoading: boolean,
  resendTimer: number,
  onResendCode: () => void,
  errors: FormErrors
}) => {
  const { openModal, handleDisplay } = useDisplay()
  console.log(openModal)
  const inputRefs = useRef<(TextInput | null)[]>([])
  const { displayComponents } = useTracker()
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

//   const handleNext = () => {
//     if (displayComponents === FormStep.ONE) {
//         handleDisplay()
//       }
//   }

  return (
    <View style={{ alignItems: 'center' }}>
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
      
      {errors.code && <Text style={styles.errorText}>{errors.code}</Text>}
      
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>
          Didn't receive it? 
        </Text>
        <TouchableOpacity 
          onPress={onResendCode} 
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
        text="Account verification successful. You can now log in"
        closeModal={handleNextComponent}
        isOpen={openModal}
        route={() => router.push(ROUTES.login)}
        submitText="Go to Login"
      />
    </View>
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
    gap: 10,
    marginBottom: 20,
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