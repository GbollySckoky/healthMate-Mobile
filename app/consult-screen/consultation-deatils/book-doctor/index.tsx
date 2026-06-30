import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SubTitle, Wrapper } from '@/components/typography/Typography';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { colors } from '@/lib/colors';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import { NavHeader } from '@/components/Header/Header';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import Booking from './Booking';
import SafeArea from '@/components/safeAreaView/SafeAreaView';

const BookDoctor = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const profile = require('../../../../assets/images/Ellipse 165.png');
  return (
    <SafeArea>
      <ScreenLayout>
        <NavHeader
          title="Book Doctor"
          _goBack={() => router.back()}
          backIcon={<Entypo name="chevron-small-left" size={24} color="black" />}
        />

        <ScreenOverFlowLayout>
          <Wrapper>
            <View style={styles.card}>
              <View style={styles.row}>
                <Image style={styles.image} source={profile} />

                <View style={styles.infoRow}>
                  <View style={{ flex: 1 }}>
                    <SubTitle>
                      Dr {params.firstName || '-'} {params.lastName || ''}
                    </SubTitle>

                    <Text style={styles.specialtyText}>
                      {params.specialization || 'General Practitioner'}
                    </Text>

                    <Text style={styles.smallText}>
                      <EvilIcons name="location" size={13} />{' '}
                      {params.hospitalName || '-'}
                    </Text>
                  </View>

                  <Text style={styles.rating}>⭐ 4.2(38)</Text>
                </View>
              </View>
            </View>

            <Booking/>
          </Wrapper>
        </ScreenOverFlowLayout>
      </ScreenLayout>
    </SafeArea>
  );
};

export default BookDoctor;

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderColor: '#F2F2F2',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    width: 50,
    height: 50,
    backgroundColor: '#0553',
    borderRadius: 100,
    marginRight: 10,
  },

  infoRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    gap: 8,
  },

  smallText: {
    fontFamily: 'LibreFranklin_400Regular',
    fontSize: 12,
    color: colors.gray,
    paddingTop: 4,
  },

  specialtyText: {
    fontFamily: 'LibreFranklin_400Regular',
    fontSize: 12,
    color: colors.purple,
    paddingTop: 4,
  },

  rating: {
    fontSize: 12,
    color: colors.gray,
    fontWeight: '400',
  },
});