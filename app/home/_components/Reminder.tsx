import RadioInput from '@/components/Input/RadioInput';
import {
  SubTitle,
} from '@/components/typography/Typography';
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { trackData } from '../../data';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';

const Reminder = () => {
  const router = useRouter();
  const handleViewAllReminders = () => {
    router.push('/home/all-reminders');
  };
  const handleInput = () => {};
  return (
    <View style={{marginBottom: 25}}>
      <View style={style.flexs}>
        <SubTitle>Today's Reminders</SubTitle>
        <TouchableOpacity
          style={style.linkFlex}
          onPress={handleViewAllReminders}
        >
          <Text style={style.linkText}> View All </Text>
          <AntDesign name="arrowright" size={17} color="#DD2590" />
        </TouchableOpacity>
      </View>
      <View>
        {trackData.map((data) => {
          const { id, med, time, icon } = data;
          return (
            <View
              key={id}
              style={{
                paddingTop: 15,
                paddingBottom: 15,
                borderBottomWidth: 1,
                borderBottomColor: '#F2F2F2',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flexDirection: 'row', alignContent: 'center' }}>
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
                        fontWeight: '500',
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
      </View>
    </View>
  );
};

export default Reminder;

export const style = StyleSheet.create({
  flexs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  linkFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    color: '#DD2590',
    fontWeight: 400,
    fontSize: 12,
    // marginRight:3
  },
});
