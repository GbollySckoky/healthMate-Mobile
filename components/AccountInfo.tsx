import { colors } from '@/lib/colors'
import { ROUTES } from '@/lib/routes'
import { Link, LinkProps } from 'expo-router'
import React, { ReactElement } from 'react'
import { StyleSheet, View, Text } from 'react-native'

const AccountInfo = ({title, value, subValue, icon,next}:
     {title: string, value: string, icon:ReactElement, subValue?:string
    next?:ReactElement}) => {
  return (
    <View
    style={[styles.container, ]}
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
            {value} {subValue}
          </Text>
        </View>
      </View>
      <Link href={ROUTES.editProfileName}>
        {next ? next : null}
      </Link>
    </View>
  </View>
  )
}

export default AccountInfo

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