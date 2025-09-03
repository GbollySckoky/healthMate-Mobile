"use client"
import { NavHeader } from '@/components/Header/Header'
import React, {useState} from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import { Wrapper, SubTitle } from '@/components/typography/Typography';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import SearchInput from '@/components/Input/SearchInput';
import { colors } from '@/lib/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'react-native';
import { topRatedData } from '@/app/data'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import SafeArea from '@/components/safeAreaView/SafeAreaView';

const index = () => {
    const router = useRouter()
    const [searchInput, setSearchInput] = useState("")
    const profile = require('../../../assets/images/Ellipse 165.png')
  return (
    <SafeArea>
      <ScreenLayout>
      <NavHeader
        title="Lagos General Hospital"
        _goBack={() => router.back()}
        backIcon={<Entypo name="chevron-small-left" size={24} color="black" />}
      />
      <ScreenOverFlowLayout>
          <Wrapper>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
                  <SearchInput 
                      placeholder='Search for a doctor, specialty, or ho...'
                      value={searchInput}
                      onChangeText={(value) => setSearchInput(value)}
                  />
                  <Text style={{borderWidth: 1, borderColor: colors.broderColor, padding: 9, borderRadius: 5, marginLeft: 10}}>
                      <Ionicons name="filter-outline" size={20} color="black" />
                  </Text>
              </View>
              <View style={{marginBottom: 50}}>  
                  {topRatedData.map((rated) => {
                      const {id, doctorName, type,address} = rated;
                      return(
                          <View style={style.Card} key={id}>
                              <View style={style.Flex}>
                                  <View style={{ width: 50 }}>
                                      <Image
                                      style={style.image}
                                      source={profile}
                                      />
                                  </View>
                                  <View style={style.Flexs}>
                                      <View style={{ marginLeft: 5 }}>
                                          <SubTitle>{doctorName}</SubTitle>
                                          <Text style={style.Text}>{type}</Text>                      
                                          <Text style={style.smallText}>
                                            <EvilIcons name="location" size={13} style={{paddingRight:10}} />
                                            {address}
                                          </Text>
                                      </View>
                                      <Text style={style.rating}>⭐ 4.2(38)</Text>
                                  </View>
                              </View>
                              <View style={style.ButtonRow}>
                                  <Text style={[style.buttonTexts, { color: colors.green }]}>
                                  ₦10,000
                                  </Text>
                              <TouchableOpacity 
                                style={style.joinBtn}
                                onPress={() => router.push(`/(consult)/consultation-deatils/${id}`)}>
                                  <Text style={[style.buttonText, { color: '#F2F2F2' }]}>
                                  View Profile
                                  </Text>
                              </TouchableOpacity>
                              </View>
                          </View>
                      )
                  })}
              </View>
          </Wrapper>
        </ScreenOverFlowLayout>
      </ScreenLayout>
    </SafeArea>
  )
}

export default index

const style = StyleSheet.create({
    Card: {
        padding: 15,
        borderColor: '#F2F2F2',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 20
      },
    Flex: {
        flexDirection: 'row',
        alignContent: 'center',
        marginTop: 5,
        marginBottom: 2,
      },
      image: {
        width: 50,
        height: 50,
        borderRadius: 100,
      },
      Flexs: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
      //   alignContent: 'center',
      },
      flex: {
        flexDirection: 'row',
        alignContent: 'center',
        marginTop: 3,
      },
      joinBtn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: colors.lightRed,
        borderRadius: 8,
      },
      buttonText: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'Inter_600SemiBold',
      },
      buttonTexts: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'LibreFranklin_600SemiBold',
      },
      ButtonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      //   gap: 10,
        borderTopColor: '#F8F8F8',
        borderTopWidth: 2,
        marginTop: 15,
        paddingTop: 15
      },
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
        fontFamily: 'LibreFranklin_400Regular',
        fontSize: 12,
        fontWeight: '400',
      },
      linkText: {
        color: '#DD2590',
        fontWeight: 400,
        fontSize: 12,
        // marginRight:3
      },
      smallText: {
          fontFamily: 'Libre-Franklin',
          fontSize: 12,
          color: colors.gray,
          fontStyle: 'normal',
          fontWeight: 400,
          paddingTop: 4
      },
      Text: {
          fontFamily: 'Libre-Franklin',
          fontSize: 12,
          color: colors.purple,
          fontStyle: 'normal',
          fontWeight: 400,
          paddingTop: 4
      },
      rating: {
          fontSize: 12,
          color: colors.gray,
          fontWeight: '400',
      },
    
})