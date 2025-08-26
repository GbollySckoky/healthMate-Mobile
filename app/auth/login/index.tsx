import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout'
import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import { Wrapper } from '@/components/typography/Typography';
import { colors } from '@/lib/colors';
import EmailInput from '@/components/Input/EmailInput';
import PasswordInput from '@/components/Input/PasswordInput';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Image } from 'react-native';
import { router } from 'expo-router';
import { ROUTES } from '@/lib/routes';


type LoginType = Record<string, string>
type TabType = 'email' | 'phone'

const inputData = {
  email: {
    label: 'Email',
    placeholder: 'Enter email',
  },
  phone: {
    label: 'Phone number', 
    placeholder: 'Enter phone number',
  },
  password: {
    label: 'Password',
    placeholder: 'Enter password',
    closeIcon: <Feather name="eye-off" size={20} color="black" />,
    openIcon: <FontAwesome5 name="eye" size={20} color="black" />,
  }
}

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('email')
  const [inputValue, setInputValue] = useState<LoginType>({})
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const goggleLogo = require('../../../assets/images/google-logo.webp')
  console.log(inputValue)
  const handleChange = (key: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  const handleToggleVisibility = () => {
    setPasswordVisibility((prev) => !prev)
  }

  const inputKey = activeTab === 'email' ? 'email' : 'phone'
  const inputConfig = activeTab === 'email' ? inputData.email : inputData.phone

  return (
    <ScreenLayout>
      <ScreenOverFlowLayout>
        <Wrapper>
          <View style={styles.headerContainer}>
            <Text style={styles.welcomeTitle}>Welcome Back</Text>
            <Text style={styles.welcomeSubtitle}>
              Log in to access your HealthMate account.
            </Text>
          </View>
          
          {/* Custom Tab Implementation matching the design */}
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[
                styles.tabButton, 
                activeTab === 'email' && styles.activeTabButton
              ]}
              onPress={() => setActiveTab('email')}
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
              onPress={() => setActiveTab('phone')}
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
              value={inputValue[inputKey]}
              onChangeText={(value) => handleChange(inputKey, value)}
            />
            <View style={{marginTop: 7}}>
              <PasswordInput 
                {...inputData.password}
                value={inputValue.password}
                onChangeText={(value) => handleChange('password', value)}
                secureTextEntry={!passwordVisibility}
                onToggleVisibility={handleToggleVisibility}
                isPasswordVisible={passwordVisibility}
              />
            </View>
          </View>
          
          {/* Remember Me and Forgot Password Row */}
          <View style={styles.optionsRow}>
            <TouchableOpacity 
              style={styles.rememberMeContainer}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[
                styles.checkbox, 
                rememberMe && styles.checkedCheckbox
              ]}>
                {rememberMe && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.rememberMeText}>Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push(ROUTES.forgotPassword)}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Dont have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Google Sign In */}
          <TouchableOpacity style={styles.googleButton}>
            <Image source={goggleLogo} alt='Goggle Logo' style={{width: 20,height:20}} />
            <Text style={styles.googleButtonText}> Sign in with Google</Text>
          </TouchableOpacity>
        </Wrapper>
      </ScreenOverFlowLayout>
    </ScreenLayout>
  )
}

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
  
  // Custom tab styling to match design
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
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: '#d1d5db',
    borderRadius: 3,
    marginRight: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCheckbox: {
    backgroundColor: '#ec4899',
    borderColor: '#ec4899',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  rememberMeText: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Lato_400Regular',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: colors.lightRed,
    fontFamily: 'LibreFranklin_400Regular',
  },
  loginButton: {
    backgroundColor: '#ec4899',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
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
})

export default LoginPage