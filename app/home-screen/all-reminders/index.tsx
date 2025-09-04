import { NavHeader } from '@/components/Header/Header';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { router } from 'expo-router';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import { Wrapper } from '@/components/typography/Typography';
import RadioInput from '@/components/Input/RadioInput';
import { trackData } from '../../../lib/data';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import SafeArea from '@/components/safeAreaView/SafeAreaView';

const index = () => {
  const handleInput = () => {};
  return (
    <SafeArea>
      <ScreenLayout>
        <NavHeader
          title="All Reminders"
          _goBack={() => router.back()}
          _optionFn={() => router.back()}
          backIcon={
            <Entypo
              name="chevron-small-left"
              size={24}
              color="black"
              style={{ paddingRight: 90 }}
            />
          }
        />
        <ScreenOverFlowLayout>
          <Wrapper>
            {trackData.map((data, index) => {
              const { id, med, time, icon } = data;
              const isLastItem = index === trackData.length - 1;
              return (
                <View
                  key={id}
                  style={[style.container, isLastItem && style.lastItem]}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignContent: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View
                      style={{ flexDirection: 'row', alignContent: 'center' }}
                    >
                      <Text
                        style={{
                          backgroundColor: '#FDF2FA',
                          padding: 5,
                          borderRadius: 4,
                        }}
                      >
                        {icon}
                      </Text>
                      <View style={{ paddingLeft: 15 }}>
                        <Text
                          style={{
                            fontWeight: 500,
                            fontSize: 14,
                            fontFamily: 'Lato_400Regular',
                          }}
                        >
                          {med}
                        </Text>
                        <Text
                          style={{
                            color: '#717680',
                            fontWeight: 400,
                            fontSize: 12,
                            paddingTop: 3,
                            fontFamily: 'Lato_400Regular',
                          }}
                        >
                          {time}
                        </Text>
                      </View>
                    </View>
                    <RadioInput selected={true} onPress={handleInput} />
                  </View>
                </View>
              );
            })}
          </Wrapper>
        </ScreenOverFlowLayout>
      </ScreenLayout>
    </SafeArea>
  );
};

export default index;

const style = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  lastItem: {
    borderBottomWidth: 0, // Remove border from last item
  },
});
