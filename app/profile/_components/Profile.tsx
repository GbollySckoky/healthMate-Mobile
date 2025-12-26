import {
  Card,
  LatoText,
  SubTitle,
} from '@/components/typography/Typography';
import { colors } from '@/lib/colors';
import { Image } from 'expo-image';
import React from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import useDisplay from '@/hooks/useDisplay';
import LogoutModal from '@/components/modal/LogoutModal';
import { ROUTES } from '@/lib/routes';
import { otherMenuItems } from '@/lib/data';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery } from '@tanstack/react-query';
import { patientService } from '@/service/patientService';
import AccountInfo from '@/components/AccountInfo';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';

const Profile = () => {
  const profileImage = require('@/assets/images/Ellipse 165.png');
 
  const navigate = () => {
    router.push(ROUTES.editProfileName);
  };

  const navigateToSettings = () => {
    router.push('/settings');
  };

  const handleMenuNavigation = (route: string) => {
    router.push(route as any); // Type assertion for dynamic navigation
  };

  const {openModal, handleDisplay} = useDisplay()
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['getUser'],
    queryFn: () => patientService.getUser()
  })
  console.log('12345',data)

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (isError) {
    console.error('Error fetching user:', error)
  }

  return (
    <View>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{ position: 'relative' }}>
          <Image
            source={profileImage}
            alt="profileimage"
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              marginBottom: 5,
            }}
          />
          <Pressable
            style={{
              position: 'absolute',
              right: 0,
              top: 70,
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 5,
            }}
            onPress={navigate}
          >
            <MaterialIcons name="mode-edit" size={20} color="black" />
          </Pressable>
        </View>
        <SubTitle>{data.firstName || '-'} {data.lastName}</SubTitle>
        <Text
          style={{
            color: colors.purple,
            fontWeight: '400',
            fontSize: 12,
            marginTop: 5,
            fontFamily: 'LibreFranklin_400Regular',
          }}
        >
          38 years
        </Text>
      </View>

      {/* Account Info */}
      <View>
        <LatoText>Account Information</LatoText>
        <Card>
          <AccountInfo  
          icon={<EvilIcons name="user" size={24} color={colors.lightRed} />} 
          title='Name' value={data.firstName} subValue={data.lastName} 
          next={<Entypo name="chevron-small-right" size={24} color={colors.lightBlack}/>} />
          <AccountInfo  icon={<Fontisto name="email" size={20} color={colors.lightRed} />} title='Email' value={data.email }/>
          <AccountInfo  icon={<Feather name="phone" size={20} color={colors.lightRed} />} title='Phone Number' value={data.phoneNumber }/>
          <AccountInfo  icon={<Feather name="calendar" size={20} color={colors.lightRed} />} title='Date of birth' value={data.email }/>
        </Card>
      </View>

      {/* Other */}
      <View>
        <LatoText>Other</LatoText>
        <Card>
          {otherMenuItems.map((item, index) => {
            const { title, id, icon, route } = item;
            const isLastItem = index === otherMenuItems.length - 1;
            return (
              <View
                key={id}
                style={[styles.container, isLastItem && styles.lastItem]}
              >
                <Pressable onPress={() => handleMenuNavigation(route)}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text>{icon}</Text>
                    <View style={{ marginLeft: 10 }}>
                      <Text
                        style={{
                          fontFamily: 'Lato_700Bold',
                          fontWeight: '600',
                          color: colors.lightBlack,
                        }}
                      >
                        {title}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </View>
            );
          })}
        </Card>
      </View>

      {/*Log out */}
      <Pressable style={styles.settingsContainer} onPressIn={handleDisplay}>
        <MaterialIcons name="logout" size={17} color={colors.lightRed} />
        <Text style={styles.settingsText}>Log out</Text>
      </Pressable>
      <LogoutModal
            icon={
              <Ionicons name="alert-circle-outline" size={24} color="#D92D20" />
            }
            title="Are you sure you want to log out?"
            text="You'll need to sign in again to access your health dashboard."
            closeModal={handleDisplay}
            isOpen={openModal}
          />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  lastItem: {
    borderBottomWidth: 0, // Remove border from last item
  },
  container: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    paddingBottom: 20,
  },
  settingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 10,
    marginVertical: 20
  },
  settingsText: {
    marginLeft: 10,
    fontFamily: 'Lato_700Bold',
    fontWeight: '600',
    color: colors.lightRed
  },
});