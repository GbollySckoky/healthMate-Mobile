import DateInput from '@/components/Input/DateInput'
import Input from '@/components/Input/Input'
import CustomCalendar from '@/components/calendar/CustomCalendar'
import { Title } from '@/components/typography/Typography'
import React, { useState } from 'react'
import { Text, View } from 'react-native'

type InputValueFormType = Record<string, string>
const Form = () => {
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
        }
    }
    const [inputValue, setInputValue] = useState<InputValueFormType>({})
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleChangeInput = (key: string, value: string) => {
        setInputValue((prev) => ({
            ...prev,
            [key]: value
        }))
    }


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
    <View>
        <Title>Tell us about you</Title>
        <Text>We use this to tailor your experience.</Text>
        <View>
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
            <CustomCalendar
                isOpen={showDatePicker}
                onChangeText={handleDateSelect}
                onClose={handleCloseCalendar}
            />
        </View>
    </View>
  )
}

export default Form