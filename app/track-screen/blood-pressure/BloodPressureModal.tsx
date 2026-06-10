import React from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { bloodPressureData } from '@/lib/data';
import NumberInput from '@/components/Input/NumberInput';
import { useState } from 'react';
import DateInput from '@/components/Input/DateInput';
import CustomCalendar from '@/components/calendar/CustomCalendar';
import { SubmitButton } from '@/components/typography/Typography';
import { useMutation } from '@tanstack/react-query';
import { patientService } from '@/service/patientService';
import { BloodPressure } from '@/lib/interface/blood-pressure';
import { AxiosError } from 'axios';

type BloodPressureInputType = Record<string, string>;

const BloodPressureModal = () => {
  const { date, time, topNumber, lastNumber } = bloodPressureData;
  const [inputValue, setInputValue] = useState<BloodPressureInputType>({
    date: new Date().toISOString().split('T')[0], // Initialize with today's date in YYYY-MM-DD format
    time: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
    systolic: '',
    diastolic: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const handleClick = () => {
    // Add your save logic here
    console.log('Saving blood pressure reading:', inputValue);
  };
  
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
    setShowDatePicker(false); // Close calendar after selection
  };

  const handleCloseCalendar = () => {
    setShowDatePicker(false);
  };
  const mutation = useMutation({
    mutationFn: (payload: BloodPressure) => patientService.createBloodPressue(payload),
    onSuccess: (response) => {
      console.log(response)
    },
    onError:(error: AxiosError) => {
      console.log("Error!!",error)
       console.log("STATUS:", error.response?.status);
  console.log("ERROR DATA:", error.response?.data);
    }
  })

  const handleCreatePressure = async () => {
    const data ={
      systolic: inputValue.systolic.trim(),
      diastolic: inputValue.diastolic.trim(),
      recordedAt: inputValue.date,
      // time: inputValue.time,
    }
    console.log("PAYLOAD:", data);
    await mutation.mutateAsync(data)
  }
  return (
      <ScrollView 
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <NumberInput
            {...topNumber}
            value={inputValue.systolic || ''} // Safe fallback
            onChangeText={(value) => handleChange('systolic', value)}
          />
          <NumberInput
            {...lastNumber}
            value={inputValue.diastolic || ''} // Safe fallback
            onChangeText={(value) => handleChange('diastolic', value)}
          />

          {/* Date Input - Text field that opens calendar when pressed */}
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
          />

          <SubmitButton _fn={handleCreatePressure}>{mutation.isPending ? "Saving..." : 'Save Reading'}</SubmitButton>
        </View>
      </ScrollView>
  );
};

export default BloodPressureModal;

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    gap: 16,
    padding: 16,
    flexGrow: 1,
  },
  listStyle: {
    padding: 16,
    gap: 16,
  },
  textInput: {
    width: 'auto',
    flexGrow: 1,
    flexShrink: 1,
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#d8d8d8',
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 8,
  },
});