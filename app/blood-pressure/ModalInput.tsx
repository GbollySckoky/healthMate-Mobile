import React from 'react'
import { View, Pressable, Text, StyleSheet } from 'react-native'
import { bloodPressureData } from './data'
import NumberInput from '@/constant/Input/NumberInput'
import { useState } from 'react'
import DateInput from '@/constant/Input/DateInput'
import CustomCalendar from '@/constant/calendar/CustomCalendar'

type BloodPressureInputType = Record<string, string>

const ModalInput = () => {
  const {date, time, topNumber, lastNumber} = bloodPressureData
  const [inputValue, setInputValue] = useState<BloodPressureInputType>({
    date: new Date().toISOString().split('T')[0], // Initialize with today's date in YYYY-MM-DD format
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    topNumber: '',
    lastNumber: ''
  })
  const [showDatePicker, setShowDatePicker] = useState(false)
  
  console.log('📊 Input Values:', inputValue)

  const handleChange = (key: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [key]: value 
    }))
  }

  const handleDateSelect = (day: any) => {
    const selectedDate = day.dateString // This will be in YYYY-MM-DD format
    handleChange('date', selectedDate)
    // setSelectDatePicker(new Date(selectedDate))
    setShowDatePicker(false) // Close calendar after selection
  }

  const handleCloseCalendar = () => {
    setShowDatePicker(false)
  }

  return (
    <View>
      <NumberInput 
        {...topNumber}
        value={inputValue.topNumber || ''} // Safe fallback
        onChangeText={(value) => handleChange('topNumber', value)}
      />
      <NumberInput 
        {...lastNumber}
        value={inputValue.lastNumber || ''} // Safe fallback
        onChangeText={(value) => handleChange('lastNumber', value)}
      />
      
      {/* Date Input - Text field that opens calendar when pressed */}
      <DateInput 
        {...date}
        value={inputValue.date ? new Date(inputValue.date).toLocaleDateString() : ''} // Show formatted date safely
        _fn={() => setShowDatePicker(true)} // Open calendar directly
      />

      {/* Time Input - Text field for time */}
      <DateInput 
        {...time}
        value={inputValue.time}
        _fn={() => {
          // You could add separate time picker here
          setShowDatePicker(true) // For now, opens date picker
        }}
      />
      
      <CustomCalendar 
        isOpen={showDatePicker}
        onChangeText={handleDateSelect}
        onClose={handleCloseCalendar}
        markedDates={{
          [inputValue.date]: {selected: true, disableTouchEvent: false, selectedColor: '#007AFF'}
        }}
      />

      <Pressable style={styles.closeBtn} >
        <Text style={styles.closeBtnText}>Save Reading</Text>
      </Pressable>
    </View>
  )
}

export default ModalInput

const styles = StyleSheet.create({
    closeBtn: {
    width: '95%',
    borderRadius: 10,
    backgroundColor: '#C11574',
    padding: 13,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    marginVertical: 15
  },
  closeBtnText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
    fontFamily: 'Inter'
  },
})