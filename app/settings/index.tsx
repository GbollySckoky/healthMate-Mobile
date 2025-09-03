import React, { useCallback} from 'react';
import { NavHeader } from '@/components/Header/Header';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import Entypo from '@expo/vector-icons/Entypo';
import { Link, useRouter } from 'expo-router';
import {
  Card,
  Wrapper,
} from '@/components/typography/Typography';
import { settingsData } from './data';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { colors } from '@/lib/colors';
import useToggle from '@/hooks/useToggle';
import { useLinkTo } from '@react-navigation/native';


const SettingsPage = () => {
  const router = useRouter();
  const { isToggle, handleToggle } = useToggle();
  const linkTo = useLinkTo(); 

  // Optimized navigation handler
  const handlePress = useCallback(
    (url: string) => {
      linkTo(url);
    },
    [linkTo]
  );

  return (
    <ScreenLayout>
      <NavHeader
        title="Settings"
        _goBack={() => router.replace('/(profile)')}
        backIcon={<Entypo name="chevron-small-left" size={24} color="black" />}
      />
      <ScreenOverFlowLayout>
        <Wrapper>
          <View>
            <Text style={styles.lato}>Account Settings</Text>
            <Card>
              {settingsData.slice(0, 2).map((setting, index) => {
                const { icon, title, id, url, rightIcon } = setting;
                const isLastItem = index === settingsData.length - 1;
                return (
                  <View
                    key={index}
                    style={[
                      styles.enhancedItemContainer,
                      isLastItem && styles.lastItem,
                    ]}
                  >
                    <View style={styles.Flex}>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <Text>{icon}</Text>
                        <Text style={{ marginLeft: 7 }}>{title}</Text>
                      </View>
                     {url && <Pressable onPress={() => handlePress(url)}>{rightIcon}</Pressable>}  
                    </View>
                    {!isLastItem && <View style={styles.divider} />}
                  </View>
                );
              })}
            </Card>
          </View>
          {/* NOTIFICATION */}
          <View style={{ marginTop: 25 }}>
            <Text style={styles.lato}>Notifications</Text>
            <Card>
              {settingsData.slice(2, 4).map((setting, index) => {
                const { icon, title, id, toggleOn, toggleOff } = setting;
                const isLastItem = index === settingsData.length - 1;
                return (
                  <View
                    key={id}
                    style={[
                      styles.enhancedItemContainer,
                      isLastItem && styles.lastItem,
                    ]}
                  >
                    <View style={styles.Flex}>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <Text>{icon}</Text>
                        <Text style={styles.latoText}>{title}</Text>
                      </View>
                      <Pressable onPress={() => handleToggle(id)}>
                        {isToggle === id ? toggleOn : toggleOff}
                      </Pressable>
                    </View>
                    {!isLastItem && <View style={styles.divider} />}
                  </View>
                );
              })}
            </Card>
          </View>
          {/* Help & Support */}
          <View style={{ marginTop: 25 }}>
            <Text style={styles.lato}>Help & Support</Text>
            <Card>
              {settingsData.slice(4, 6).map((setting, index) => {
                const { icon, title, id, rightIcon } = setting;
                const isLastItem = index === settingsData.length - 1;
                return (
                  <View
                    key={id}
                    style={[
                      styles.enhancedItemContainer,
                      isLastItem && styles.lastItem,
                    ]}
                  >
                    <View style={styles.Flex}>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <Text>{icon}</Text>
                        <Text style={styles.latoText}>{title}</Text>
                      </View>
                      <Text>{rightIcon}</Text>
                    </View>
                    {!isLastItem && <View style={styles.divider} />}
                  </View>
                );
              })}
            </Card>
          </View>
        </Wrapper>
      </ScreenOverFlowLayout>
    </ScreenLayout>
  );
};

export default SettingsPage;

const styles = StyleSheet.create({
  lastItem: {
    borderBottomWidth: 0, // Remove border from last item
  },
  enhancedCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    marginVertical: 8,
  },
  enhancedItemContainer: {
    paddingVertical: 15,
    // borderBottomColor: colors.lightGray,
    // borderBottomWidth: 1
  },
  Flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divider: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginTop: 16,
    // marginHorizontal: -4, // Slight inset for visual appeal
  },
  lato: {
    fontFamily: 'Lato_400Regular',
    fontWeight: '400',
    color: colors.lightBlack,
    marginBottom: 10,
    fontSize: 14,
    // marginTop: 10
  },
  latoText: {
    fontFamily: 'Lato_700Bold',
    fontWeight: '600',
    fontSize: 14,
    color: colors.lightBlack,
    marginLeft: 7,
  },
});
