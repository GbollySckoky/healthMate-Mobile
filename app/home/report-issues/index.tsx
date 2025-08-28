import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import { SubmitButton, Wrapper } from '@/components/typography/Typography';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout'
import Entypo from '@expo/vector-icons/Entypo';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NavHeader } from '@/components/Header/Header';
import { router } from 'expo-router';
import { colors } from '@/lib/colors';
import { reportAnIssue } from '@/app/data';
import { useState } from 'react';
import { useDisplayList } from '@/hooks/useDisplayList';
import { CountStep } from '@/lib/constant';
import Report from './Report';

const ReportIssue = () => {
    const [selectValue, setSelectValue] = useState('')
    const {currentStep, goToNextStep, goToPreviousStep} = useDisplayList()
    
    const handleClick = (value: string) => {
        setSelectValue(value)
    }
    
    // Simplified validation - no need for Boolean()
    const isValid = selectValue !== ''
    
    return (
        <ScreenLayout>
            <ScreenOverFlowLayout>
                <NavHeader 
                    title='Report an Issue'
                    _goBack={() => router.back()}
                    backIcon={<Entypo name="chevron-small-left" size={24} color="black" />}
                />
                <Wrapper>
                    <Text style={styles.title}>
                        What do you need help with?
                    </Text>
                    {currentStep === CountStep.ZERO && (
                        <View style={styles.optionsContainer}>
                            {reportAnIssue.map((issue, index) => (
                                <Pressable 
                                    style={[
                                        styles.border, 
                                        selectValue === issue && styles.activeBorder
                                    ]} 
                                    key={index}
                                    onPress={() => handleClick(issue)}
                                >
                                     <View style={[styles.radio]}>
                                        {selectValue === issue && <View style={styles.innerCircle} />}
                                    </View>
                                    <Text style={[
                                        styles.optionText,
                                    ]}>
                                        {issue}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    )}
                    {currentStep === CountStep.ONE && <Report />}
                    <SubmitButton _fn={goToNextStep} disabled={!isValid}>
                    {currentStep === CountStep.ONE ? 'Submit' : 'Next' }
                    </SubmitButton>
                </Wrapper>
            </ScreenOverFlowLayout>
        </ScreenLayout>
    )
}

export default ReportIssue

const styles = StyleSheet.create({
    title: {
        fontWeight: '600',
        fontSize: 17,
        fontFamily: 'Lato_700Bold'
    },
    optionsContainer: {
        gap: 13, 
        marginTop: 25
    },
    border: {
        borderColor: colors.broderColor,
        borderWidth: 1, 
        borderRadius: 10, 
        padding: 15, 
        gap: 10,
        flexDirection: 'row'
    },
    activeBorder: {
        borderColor: colors.lightRed,
        backgroundColor: colors.lightPurple
        // Remove duplicate properties - they inherit from border
    },
    optionText: {
        fontSize: 15,
        color: colors.black,
        fontWeight: '500',

    },
    radio: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#717680',
        alignItems: 'center',
        justifyContent: 'center',
      },
      innerCircle: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#C11574',
      },
})