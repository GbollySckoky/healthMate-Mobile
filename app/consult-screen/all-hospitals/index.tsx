"use client"
import { NavHeader } from '@/components/Header/Header'
import React, {useState} from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import { Wrapper } from '@/components/typography/Typography';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import SearchInput from '@/components/Input/SearchInput';
import { colors } from '@/lib/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { consultationData } from '@/lib/data'
import { Image } from 'react-native';
import { Link } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import useToggle from '@/hooks/useToggle';
import SafeArea from '@/components/safeAreaView/SafeAreaView';


const AllHospitalsPage = () => {
    const router = useRouter()
    const [searchInput, setSearchInput] = useState("")
    const {isToggle, handleToggle} = useToggle()
  return (
    <SafeArea>
      <ScreenLayout>
      <NavHeader
        title="All Hospitals"
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
              {/* Hospitals */}
              <View>
                  {consultationData.map((consult) => {
                      const {id, image, hospital, address, text, rating, linkText} = consult;
                      return(
                          <View key={id} style={styles.card} >
                          <View  style={styles.imageContainer}>
                              <Image 
                              source={image} 
                              alt='Hospital Image' 
                              style={styles.image}
                              resizeMode="cover"
                              />
                              <Pressable style={styles.love} onPress={() => handleToggle(id)}>
                                {isToggle === id ? <AntDesign name="heart" size={24} color={colors.red} />  :
                                <Feather name="heart" size={24} color="black" /> 
                                }
                              </Pressable>
                          </View>
                          
                          <View style={styles.content}>
                              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                              <View style={styles.hospitalInfo}>
                                  <Text style={styles.hospitalName}>{hospital}</Text>
                                  <Text style={styles.address}>{address}</Text>
                                  <Text style={styles.description}>{text}</Text>
                              </View>
                              <Text style={styles.rating}>⭐ {rating}</Text>
                              </View>
                              <View style={styles.footer}>
                              
                              <Link href={`/consult-screen/consultation-deatils/${id}`} style={styles.linkButton}>
                                  <Text style={styles.linkText}>{linkText}</Text>
                              </Link>
                              </View>
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

export default AllHospitalsPage

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FAFAFA',
        borderRadius: 12,
        padding: 10,
        borderColor: '#f2f2f2',
        borderWidth: 1,
        marginBottom: 20
    },
    love:{
        position: "absolute",
        right: 10,
        top: 10,
        backgroundColor: '#E5EBED',
        padding: 5,
        borderRadius: 40
    },
    imageContainer: {
        width: '100%',
        height: 180,
        position: 'relative'
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    content: {
        padding: 6,
        marginTop: 10
      },
      hospitalInfo: {
        marginBottom: 8,
      },
      hospitalName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1E1E1E',
        marginBottom: 4,
        fontFamily: 'Lato_400Regular'
      },
      address: {
        fontSize: 12,
        color: colors.gray,
        fontWeight: 'normal',
        paddingTop: 3,
      },
      description: {
        fontSize: 12,
        color: colors.lightRed,
        lineHeight: 20,
        marginBottom: 12,
        paddingTop: 3,
        fontFamily: 'LibreFranklin_400Regular',
        fontWeight: '400'
      },
      footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      rating: {
        fontSize: 12,
        color: colors.gray,
        fontWeight: '400',
      },
      linkButton: {
        borderColor: '#f2f2f2',
        borderWidth: 1,
        paddingVertical: 12,
        borderRadius: 10,
        width: '100%',
        textAlign: 'center'
      },
      linkText: {
        color: colors.black,
        fontSize: 12,
        fontWeight: '600',
        fontFamily: 'Inter_600SemiBold'
      },
})