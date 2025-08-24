import React from 'react';
import { View } from 'react-native';
import { bloodPressureData } from './data';
import NumberInput from '@/components/Input/NumberInput';
import { useState } from 'react';
import DateInput from '@/components/Input/DateInput';
import CustomCalendar from '@/components/calendar/CustomCalendar';
import { SubmitButton } from '@/components/typography/Typography';

type BloodPressureInputType = Record<string, string>;

const BloodPressureModal = () => {
  const { date, time, topNumber, lastNumber } = bloodPressureData;
  const [inputValue, setInputValue] = useState<BloodPressureInputType>({
    date: new Date().toISOString().split('T')[0], // Initialize with today's date in YYYY-MM-DD format
    time: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
    topNumber: '',
    lastNumber: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleClick = () => {};
  console.log('📊 Input Values:', inputValue);

  const handleChange = (key: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDateSelect = (day: any) => {
    const selectedDate = day.dateString; // This will be in YYYY-MM-DD format
    handleChange('date', selectedDate);
    // setSelectDatePicker(new Date(selectedDate))
    setShowDatePicker(false); // Close calendar after selection
  };

  const handleCloseCalendar = () => {
    setShowDatePicker(false);
  };

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
        value={
          inputValue.date ? new Date(inputValue.date).toLocaleDateString() : ''
        } // Show formatted date safely
        _fn={() => setShowDatePicker(true)} // Open calendar directly
      />

      {/* Time Input - Text field for time */}
      <DateInput
        {...time}
        value={inputValue.time}
        _fn={() => {
          // You could add separate time picker here
          setShowDatePicker(true); // For now, opens date picker
        }}
      />

      <CustomCalendar
        isOpen={showDatePicker}
        onChangeText={handleDateSelect}
        onClose={handleCloseCalendar}
      />

      <SubmitButton _fn={handleClick}>Save Reading</SubmitButton>
    </View>
  );
};

export default BloodPressureModal;
