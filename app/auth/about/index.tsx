import DateInput from '@/components/Input/DateInput'
import Input from '@/components/Input/Input'
import CustomCalendar from '@/components/calendar/CustomCalendar'
import { Title, Wrapper } from '@/components/typography/Typography'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import SafeArea from '@/components/safeAreaView/SafeAreaView';
import Entypo from '@expo/vector-icons/Entypo';
import { NavHeader } from '@/components/Header/Header'
import { useRouter } from 'expo-router'
import SelectInput from '@/components/Input/SelectInput'



type InputValueFormType = Record<string, string>
const About = () => {
    const router = useRouter()
    const formData = {
        fullName:{
            label: 'Full Name',
            placeholder: 'Mary Uche',
        },
        date: {
            label: 'Date',
            placeholder: '10/05/1997',
        },
        lastName:{
            label: 'Full Name',
            placeholder: 'Mary Uche',
            id: 1,
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
    <SafeArea>
        <NavHeader 
            _goBack={() => router.back()}
            backIcon={<Entypo name="chevron-small-left" size={24} color="black" />}

        />
        <Wrapper>
            <Title>Tell us about you</Title>
            <Text style={{marginTop: 4, fontWeight: '400', fontFamily: 'Lato_400Regular', fontSize: 16, color: '#717680'}}>
                We use this to tailor your experience.</Text>
            <View style={{marginTop: 20}}>
                <Input 
                    {...formData.fullName}
                    value={inputValue.fullName}
                    onChangeText={(value) => handleChangeInput('fullName', value)}
                />
                <DateInput
                {...formData.date}
                    value={
                    inputValue.date ? new Date(inputValue.date).toLocaleDateString() : ''
                    } // Show formatted date safely
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
            </View>
        </Wrapper>
    </SafeArea>
  )
}

export default About;