import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { allAppointmentData } from '../../data';
import {
  SmallText,
  SubTitle,
  Wrapper,
} from '@/components/typography/Typography';
import Feather from '@expo/vector-icons/Feather';
import { Image } from 'expo-image';
import { NavHeader } from '@/components/Header/Header';
import { router } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const AllApointments = () => {
  return (
    <ScreenLayout>
      <NavHeader
        title="All Appointments"
        _goBack={() => router.back()}
        _optionFn={() => router.back()}
        backIcon={<Entypo name="chevron-small-left" size={24} color="black" />}
      />
      <ScreenOverFlowLayout>
        <Wrapper>
          {allAppointmentData.map((all) => {
            const { id, doctorName, date, time, status, type } = all;
            return (
              <View key={id} style={style.Card}>
                <View style={style.Flex}>
                  <View style={{ width: 50 }}>
                    <Image
                      style={style.image}
                      source={{
                        uri: 'https://picsum.photos/seed/696/3000/2000',
                      }}
                      placeholder={{ blurhash }}
                      contentFit="cover"
                      transition={1000}
                    />
                  </View>
                  <View style={style.Flexs}>
                    <View style={{ marginLeft: 5 }}>
                      <SubTitle>{doctorName}</SubTitle>
                      <View style={[style.flex, { marginTop: 5 }]}>
                        <View style={{ marginRight: 3 }}>
                          <Feather name="clock" size={13} color="#717680" />
                        </View>
                        <SmallText>
                          {' '}
                          {time} | {date}{' '}
                        </SmallText>
                      </View>
                      <View style={[style.flex, { marginTop: 5 }]}>
                        <View style={{ marginRight: 3 }}>
                          <Feather name="video" size={13} color="#717680" />
                        </View>
                        <SmallText> {type}</SmallText>
                      </View>
                    </View>
                    <Text
                      style={{
                        color: '#5924DC',
                        backgroundColor: '#F4F3FF',
                        borderRadius: 10,
                        padding: 10,
                        fontWeight: 500,
                        fontSize: 12,
                        height: 30,
                        fontFamily: 'Inter_500Medium',
                      }}
                    >
                      {status}
                    </Text>
                  </View>
                </View>
                <View style={style.ButtonRow}>
                  <TouchableOpacity style={style.rescheduleBtn}>
                    <Text style={[style.buttonText, { color: '#252B37' }]}>
                      Reschedule
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={style.joinBtn}>
                    <Text style={[style.buttonText, { color: '#F2F2F2' }]}>
                      Join Call
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </Wrapper>
      </ScreenOverFlowLayout>
    </ScreenLayout>
  );
};

export default AllApointments;

export const style = StyleSheet.create({
  Flex: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 5,
    marginBottom: 2,
  },
  flex: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 3,
  },
  Flexs: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: '#0553',
    borderRadius: 100,
  },
  Card: {
    padding: 15,
    borderColor: '#F1F1',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    overflow: 'hidden',
    marginBottom: 20,
  },
  ButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    borderTopColor: '#F8F8F8',
    borderTopWidth: 2,
    marginTop: 15,
  },
  rescheduleBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    borderColor: '#D6D7DA',
    borderWidth: 1,
    marginTop: 14,
  },
  joinBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#DD2591',
    borderRadius: 8,
    marginTop: 14,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
