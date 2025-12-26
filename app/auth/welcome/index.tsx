import { Title, Wrapper } from '@/components/typography/Typography'
import { colors } from '@/lib/colors'
import { ROUTES } from '@/lib/routes'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Feather from '@expo/vector-icons/Feather';


const WelcomePage = () => {
  return (
    <View style={{backgroundColor: 'white',flex: 1, }}>
        <View style={{ flex: 1,width: '92%',margin: 'auto',marginTop: 15,  }}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.iconWrapper}>
                    <Feather name="check" size={24} color={colors.lightRed} />
                </Text>
                <Title>Welcome Mary!</Title>
                <Text style={styles.description}>Set Up Completed. Go to home and start Tracking!</Text>
                <TouchableOpacity style={styles.bottomBtnContainer} onPress={() => router.replace(ROUTES.home)}>
                    <Text style={styles.buttonText}>
                        Go to home
                    </Text>
                </TouchableOpacity>
            </View>
        </View >
    </View>

  )
}

export default WelcomePage

const styles = StyleSheet.create({
    bottomBtnContainer: {
        marginBottom: 50,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        // justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16, 
        gap: 15,
        backgroundColor: colors.red,
        borderRadius: 10 
    },
    iconWrapper: {
        paddingBottom: 8,
        backgroundColor: colors.lightPurple,
        borderRadius: 40,
        padding: 10,
        marginTop: 10,
        marginBottom: 10
    },
    title:{
        fontWeight: '500',
        fontSize: 20,
        fontFamily: 'LibreFranklin_600SemiBold',
        color: colors.black,
    },
    description: {
        fontWeight: '400',
        fontSize: 16,
        fontFamily: 'LibreFranklin_400Regular',
        color: colors.gray,
        paddingTop: 8,
        textAlign: 'center'
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'Inter_600SemiBold',
        color: '#fff',
    },
})