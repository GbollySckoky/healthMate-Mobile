import { Wrapper, Title, BtnFlex, SubmitButton } from '@/components/typography/Typography'
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Input from '@/components/Input/Input'
import { InputValueFormType } from './index'
import SafeArea from '@/components/safeAreaView/SafeAreaView';
import { NavHeader } from '@/components/Header/Header'
import { useRouter } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import { colors } from '@/lib/colors'
import { ROUTES } from '@/lib/routes'

interface experienceInputType{
    inputValue: InputValueFormType;
    handleChangeInput: (key: string, value: string) => void;
    goToNextStep: () => void;
    goToPreviousStep: () => void
}
const Experience = ({inputValue, handleChangeInput, goToNextStep, goToPreviousStep}: experienceInputType) => {
    const formData = {
        healthCondition:{
            label: 'Health Condition',
            placeholder: 'Mary Uche',
        },
        allergies:{
            label: 'Allergies',
            placeholder: 'Mary Uche',
            id: 1,
        },
    }
    const  router = useRouter()
  return (
    <SafeArea>
        <NavHeader 
            _goBack={goToPreviousStep}
            backIcon={<Entypo name="chevron-small-left" size={24} color="black" />}
        />
        <View style={{ flex: 1,width: '92%',margin: 'auto',marginTop: 15, }}>
            <Title>Let's personalize your experience</Title>
            <Text style={{
                marginTop: 4,
                fontWeight: '400',
                fontFamily: 'Lato_400Regular',
                fontSize: 16,
                color: '#717680',
            }}>
                These help us track your health more accurately.
            </Text>
    
            <View style={{marginTop: 20}}> 
                <Input
                    {...formData.healthCondition}
                    value={inputValue.healthIssue}
                    onChangeText={(value) => handleChangeInput('healthIssue', value)}
                />
                <Input
                    {...formData.allergies}
                    value={inputValue.allergies}
                    onChangeText={(value) => handleChangeInput('allergies', value)}
                />
            {/* </View> */}
        </View>
        
        {/* Buttons pinned at bottom */}
        <View style={styles.bottomBtnContainer}>
            <TouchableOpacity style={styles.outlineBtn} onPress={() => router.push(ROUTES.home)}>
                <Text>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.joinBtn} onPress={() => router.push(ROUTES.welcome)}>
                <Text style={styles.buttonText}>Finish</Text>
            </TouchableOpacity>
        </View>
        </View>
    </SafeArea>
  
  )
}

export default Experience

const styles = StyleSheet.create({
    bottomBtnContainer: {
        marginBottom: 40,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16, 
        gap: 15,
        backgroundColor: 'white', 
    },
    joinBtn: {
        flex: 1,
        paddingVertical: 12,
        backgroundColor: '#DD2591',
        borderRadius: 8,
        alignItems: 'center',
        // marginLeft: 12,
        color:'white'
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'Inter_600SemiBold',
        color: '#fff',
    },
    outlineBtn:{
        flex: 1,
        paddingVertical: 12,
        borderColor: colors.broderColor,
        borderWidth: 1,
        // backgroundColor: '#DD2591',
        borderRadius: 8,
        alignItems: 'center',
        // marginLeft: 12,
        color:'white'
    },
    outlineBtnText: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'Inter_600SemiBold',
        color: colors.black,
    },
})