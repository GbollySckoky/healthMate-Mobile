import { Link } from 'expo-router'
import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { ScrollViewHorizontal } from '@/components/scrollView/ScrollViewHorizontal'
import { colors } from '@/lib/colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import {
    Card,
    SubTitle,
  } from '@/components/typography/Typography';
import { topRatedData } from '@/app/data'



const TopRated = () => {
    const profile = require('../../../assets/images/Ellipse 165.png')
  return (
    <View style={style.container}>
      <View style={style.header}>
        <SubTitle>Top Rated Doctors</SubTitle>
        <Link href="/(consult)/top-rated-doctors" >
          <Text style={style.viewAllText}>
            See All
            <AntDesign name="arrowright" size={15} />
          </Text>
        </Link>
      </View>
      
      <ScrollViewHorizontal>
        {topRatedData.map((rated) => {
            const {id, doctorName, type,address} = rated;
            return(
                <Card key={id}>
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
                                <Text style={style.smallText}>{address}</Text>
                            </View>
                            <Text style={style.rating}>⭐ 4.2(38)</Text>
                        </View>
                    </View>
                    <View style={style.ButtonRow}>
                        <Text style={[style.buttonTexts, { color: colors.green }]}>
                        ₦10,000
                        </Text>
                    <TouchableOpacity style={style.joinBtn}>
                        <Text style={[style.buttonText, { color: '#F2F2F2' }]}>
                        View Profile
                        </Text>
                    </TouchableOpacity>
                    </View>
              </Card>
            )
        })}
      
      </ScrollViewHorizontal>
    </View>
  )
}


export const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 6
    },
    viewAllText: {
        color: colors.lightRed,
        fontSize: 12,
        fontWeight: '400',
        flexDirection: 'row',
        alignItems: 'center',
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
      backgroundColor: '#0553',
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
      paddingTop: 10
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
    Card: {
        padding: 15,
        borderColor: '#F2F2F2',
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
    
    },
  });

export default TopRated