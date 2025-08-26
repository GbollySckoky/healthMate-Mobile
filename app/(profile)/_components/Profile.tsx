import {
  Card,
  LatoText,
  SubTitle,
  Texts,
} from '@/components/typography/Typography';
import { colors } from '@/lib/colors';
import { Image } from 'expo-image';
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { Link, router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

const Profile = () => {
  const profileImage = require('../../../assets/images/Ellipse 165.png');
  const profileData = [
    {
      title: 'Name',
      value: 'Sarah Daniels',
      id: 1,
      icon: <EvilIcons name="user" size={24} color={colors.lightRed} />,
      next: (
        <Entypo
          name="chevron-small-right"
          size={24}
          color={colors.lightBlack}
        />
      ),
    },
    {
      title: 'Email',
      value: 'gbolly@gmail.com',
      id: 2,
      icon: <Fontisto name="email" size={20} color={colors.lightRed} />,
    },
    {
      title: 'Phone Number',
      value: '+2349076536764',
      id: 3,
      icon: <Feather name="phone" size={20} color={colors.lightRed} />,
    },
    {
      title: 'Date Of Birth',
      value: 'Jan 20, 1996',
      id: 4,
      icon: <Feather name="calendar" size={20} color={colors.lightRed} />,
    }
  ];

  const otherMenuItems = [
    {
      title: 'My Health Info',
      id: 5,
      icon: (
        <MaterialIcons
          name="medical-services"
          size={20}
          color={colors.lightRed}
        />
      ),
      route: '/(profile)/health-info' as const
    },
    {
      title: 'My Reminders',
      id: 6,
      icon: (
        <Ionicons
          name="notifications-outline"
          size={20}
          color={colors.lightRed}
        />
      ),
      route: '/(profile)/reminders' as const // Changed to a more appropriate route
    },
  ];

  const navigate = () => {
    router.push('/(profile)/edit-name');
  };

  const navigateToSettings = () => {
    router.push('/settings');
  };

  const handleMenuNavigation = (route: string) => {
    router.push(route as any); // Type assertion for dynamic navigation
  };

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
        <SubTitle>Dr James Uche</SubTitle>
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
          {profileData.map((profile, index) => {
            const { title, value, id, icon, next } = profile;
            const isLastItem = index === profileData.length - 1;
            return (
              <View
                key={id}
                style={[isLastItem && styles.lastItem, styles.container]}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
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
                      <Text
                        style={{
                          fontFamily: 'Lato_400Regular',
                          fontWeight: '400',
                          color: colors.gray,
                          paddingTop: 3,
                        }}
                      >
                        {value}
                      </Text>
                    </View>
                  </View>
                  <Link href={'/(profile)/edit-name'}>
                    {next ? next : null}{' '}
                  </Link>
                </View>
              </View>
            );
          })}
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
                style={[isLastItem && styles.lastItem, styles.container]}
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
      <Pressable onPress={navigateToSettings} style={styles.settingsContainer}>
        <MaterialIcons name="logout" size={17} color={colors.lightRed} />
        <Text style={styles.settingsText}>Log out</Text>
      </Pressable>
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
    marginTop: 20
  },
  settingsText: {
    marginLeft: 10,
    fontFamily: 'Lato_700Bold',
    fontWeight: '600',
    color: colors.lightRed
  },
});