import React, { useState } from 'react';
import { View } from 'react-native';
import DateInput from '@/components/Input/DateInput';
import { weightData } from '@/lib/data';
import CustomCalendar from '@/components/calendar/CustomCalendar';
import DecimalInput from '@/components/Input/DecimalInput';
import { SubmitButton } from '@/components/typography/Typography';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patientService } from '@/service/patientService';
// import { AxiosError } from 'axios';
import { Weight } from '@/lib/interface/weight';
import { useModal } from '@/context/ModalContext';
import Toast from 'react-native-toast-message';

type WeightInputType = Record<string, string>;
const WeightModal = () => {
  const { date, weight } = weightData;
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  const [inputValue, setInputValue] = useState<WeightInputType>({
    weight: '',
    date: new Date().toISOString(), // Initialize with today's date in YYYY-MM-DD format split date from time
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  // const { closeModal } = useModal();
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
     onSuccess: async () => {
        Toast.show({
          type: 'success',
          text1: 'Weight created successfully',
        });
        await queryClient.invalidateQueries({ queryKey: ['weight'] });
        closeModal()
      },
      onError:(error: any) => {
        Toast.show({
          type: 'error',
          text1: error.response.data.message,
        });
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
        value={inputValue.weight} // Safe fallback
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

