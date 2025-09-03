import DateInput from '@/components/Input/DateInput'
import Input from '@/components/Input/Input'
import CustomCalendar from '@/components/calendar/CustomCalendar'
import { Title,  SubmitButton, } from '@/components/typography/Typography'
import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import SafeArea from '@/components/safeAreaView/SafeAreaView';
import Entypo from '@expo/vector-icons/Entypo';
import { NavHeader } from '@/components/Header/Header'
import { useRouter } from 'expo-router'
import SelectInput from '@/components/Input/SelectInput'
import { useDisplayList } from '@/hooks/useDisplayList'
import { CountStep } from '@/lib/constant'
import Experience from './Experience'


export type InputValueFormType = Record<string, string>
const About = () => {
    const router = useRouter()
    const {goToNextStep, currentStep, goToPreviousStep} = useDisplayList()
    const formData = {
        fullName:{
            label: 'Full Name',
            placeholder: 'Mary Uche',
        },
        date: {
            label: 'Date',
            placeholder: '10/05/1997',
        },
        gender:{
            label: 'Gender',
            placeholder: 'Female',
            options: [
                'Male',
                'Female',
                'Others'
            ]
        }
    }

    const [inputValue, setInputValue] = useState<InputValueFormType>({
        // date: new Date().toISOString().split('T')[0],
    })
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleChangeInput = (key: string, value: string) => {
        setInputValue((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    console.log(inputValue)
  const handleDateSelect = (day: any) => {
    const selectedDate = day.dateString; // This will be in YYYY-MM-DD format
    handleChangeInput('date', selectedDate);
    // setSelectDatePicker(new Date(selectedDate))
    setShowDatePicker(false); // Close calendar after selection
  };

  const handleCloseCalendar = () => {
    setShowDatePicker(false);
  };

  return (
    <View style={{flex: 1}}>
        {currentStep === CountStep.ZERO && (
        <SafeArea>
            <NavHeader 
                _goBack={() => router.back()}
                backIcon={<Entypo name="chevron-small-left" size={24} color="black" />}

            />
            <View style={{ flex: 1,width: '92%',margin: 'auto',marginTop: 15, }}>
                <View style={{ flex: 1 }}>
                    <Title>Tell us about you</Title>
                    <Text style={{marginTop: 4, fontWeight: '400', fontFamily: 'Lato_400Regular', 
                        fontSize: 16, color: '#717680'}}>
                        We use this to tailor your experience.
                    </Text>
                    <View style={{marginTop: 20}}>
                        <Input 
                            {...formData.fullName}
                            value={inputValue.fullName}
                            onChangeText={(value) => handleChangeInput('fullName', value)}
                        />
                        <DateInput
                        {...formData.date}
                            value={
                            inputValue.date ? new Date(inputValue.date).toLocaleDateString() : ''} // Show formatted date safely
                            _fn={() => setShowDatePicker(true)} // Open calendar directly
                        />
                        <SelectInput 
                            {...formData.gender}
                            value={inputValue.gender}
                            onChangeText={(value) => handleChangeInput('gender', value)}
                        />
                        <CustomCalendar
                            isOpen={showDatePicker}
                            onChangeText={handleDateSelect}
                            onClose={handleCloseCalendar}
                        />
                         <View style={{marginTop: 'auto'}}>
                            <SubmitButton _fn={goToNextStep}>
                                Next
                            </SubmitButton>
                         </View>
                    </View>
                </View>
            </View>
        </SafeArea>
        )}
        {currentStep === CountStep.ONE && 
            <Experience 
                inputValue={inputValue} 
                handleChangeInput={handleChangeInput}
                goToNextStep={goToNextStep}
                goToPreviousStep={goToPreviousStep}
            />
        }
    </View>
  )
}

export default About;

const styles = StyleSheet.create({
    bottomBtnContainer: {
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        // marginTop: 20,
        // paddingVertical: 16,
        // gap: 15
        marginBottom: 40,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16, // Add horizontal padding if needed
        gap: 15,
        backgroundColor: 'white', // Add background color to avoid content showing through
    }
})