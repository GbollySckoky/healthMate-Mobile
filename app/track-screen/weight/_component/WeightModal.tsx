import React, { useState } from 'react';
import { View } from 'react-native';
import DateInput from '@/components/Input/DateInput';
import { weightData } from '@/lib/data';
import CustomCalendar from '@/components/calendar/CustomCalendar';
import DecimalInput from '@/components/Input/DecimalInput';
import { SubmitButton } from '@/components/typography/Typography';
import { useMutation } from '@tanstack/react-query';
import { patientService } from '@/service/patientService';
import { AxiosError } from 'axios';
import { Weight } from '@/lib/interface/weight';

type WeightInputType = Record<string, string>;
const WeightModal = () => {
  const { date, weight } = weightData;
  const [inputValue, setInputValue] = useState<WeightInputType>({
    weight: '',
    date: new Date().toISOString(), // Initialize with today's date in YYYY-MM-DD format split date from time
  });
  console.log('WEIGHT', inputValue);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (key: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  console.log(inputValue)
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
  const mutation = useMutation({
        mutationFn: (payload: Weight) => patientService.createWeight(payload),
        onSuccess: (response) => {
          console.log(response)
        },
        onError:(error: AxiosError) => {
          console.log("Error!!",error)
           console.log("STATUS:", error.response?.status);
      console.log("ERROR DATA:", error.response?.data);
        }
      })
    
      const handleCreateWeight = async () => {
        const data ={
          weight: inputValue.weight,
          recordedAt: inputValue.date,
        }
        console.log("PAYLOAD:", data);
        await mutation.mutateAsync(data)
      }
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
      <SubmitButton _fn={handleCreateWeight}>{mutation.isPending ? "Saving..." : "Save Weight Log"}</SubmitButton>
    </View>
  );
};

export default WeightModal;
