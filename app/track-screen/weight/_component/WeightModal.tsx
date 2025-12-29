import React, { useState } from 'react';
import { Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';
import DateInput from '@/components/Input/DateInput';
import { weightData } from '@/lib/data';
import CustomCalendar from '@/components/calendar/CustomCalendar';
import DecimalInput from '@/components/Input/DecimalInput';
import { SubmitButton } from '@/components/typography/Typography';
import { useMutation } from '@tanstack/react-query';
import { patientService } from '@/service/patientService';
import { CreateWeight } from '@/lib/interface/create-weight-interface';
import { useModal } from '@/context/ModalContext';
import Toast from 'react-native-toast-message';

type WeightInputType = Record<string, string>;
const WeightModal = () => {
  const { date, weight } = weightData;
  const { closeModal } = useModal();
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

  const createWeightMutation = useMutation({
    mutationFn: (payload: CreateWeight) => patientService.createWeight(payload),
    onSuccess: (response) => {
      console.log(response.data.success);
      Toast.show({
        type: 'success',
        text1: response.data.success,
      });
      closeModal();
    },
    onError: (error: any) => {
      console.log(error.response.data);
      Toast.show({
        type: 'error',
        text1: error.response.data,
      });
    },
  });
  const handleSubmit = async () => {
    Keyboard.dismiss();

    const credentials = {
      weight: Number(inputValue.weight),
      recorded_at: inputValue.date,
    };
    console.log('OMO!!', credentials);
    await createWeightMutation.mutate(credentials);
  };

  const disableBtn = !inputValue.weight || !inputValue.date;

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
      <Pressable
        style={[
          styles.button,
          {
            backgroundColor:
              createWeightMutation.isPending || disableBtn
                ? '#ec4899'
                : '#DD2590',
          },
        ]}
        onPress={handleSubmit}
        disabled={createWeightMutation.isPending || disableBtn}
      >
        <Text style={styles.buttonText}>
          {createWeightMutation.isPending ? 'Saving...' : 'Save Weight Log'}
        </Text>
      </Pressable>
    </View>
  );
};

export default WeightModal;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#DD2590',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 25,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});
