import React, { useState } from 'react';
import { View } from 'react-native';
import DateInput from '@/components/Input/DateInput';
import { weightData } from './data';
import CustomCalendar from '@/components/calendar/CustomCalendar';
import DecimalInput from '@/components/Input/DecimalInput';
import { SubmitButton } from '@/components/typography/Typography';

type WeightInputType = Record<string, string>;
const WeightModal = () => {
  const { date, weight } = weightData;
  const [inputValue, setInputValue] = useState<WeightInputType>({
    weight: '',
    date: new Date().toISOString().split('T')[0], // Initialize with today's date in YYYY-MM-DD format split date from time
  });
  console.log('WEIGHT', inputValue);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (key: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDateSelect = (day: any) => {
    const selectedDate = day.dateString;
    handleChange('date', selectedDate);
    // setSelectDatePicker(new Date(selectedDate))
    setShowDatePicker(false); // Close calendar after selection
    console.log('select', selectedDate);
  };

  const handleCloseCalendar = () => {
    setShowDatePicker(false);
  };
  console.log(handleDateSelect);
  const handleClick = () => {};
  return (
    <View>
      <DecimalInput
        {...weight}
        value={inputValue.weight || ''} // Safe fallback
        onChangeText={(value) => handleChange('weight', value)}
      />
      <DateInput
        {...date}
        value={
          inputValue.date ? new Date(inputValue.date).toLocaleDateString() : ''
        } // Show formatted date safely
        _fn={() => setShowDatePicker(true)} // Open calendar directly
      />

      <CustomCalendar
        isOpen={showDatePicker}
        onChangeText={handleDateSelect}
        onClose={handleCloseCalendar}
        //     markedDates={{
        //     [inputValue.date]: {selected: true, disableTouchEvent: false, selectedColor: '#C11574'}
        // }}
      />
      <SubmitButton _fn={handleClick}>Save Weight Log</SubmitButton>
    </View>
  );
};

export default WeightModal;
