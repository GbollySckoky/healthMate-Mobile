import React, { useState } from 'react';
import { View, Text } from 'react-native';
import NumberInput from '@/components/Input/NumberInput';
import { MedicationData } from '@/lib/data';
import Input from '@/components/Input/Input';
import { SubmitButton } from '@/components/typography/Typography';
import { AxiosError } from 'axios';
import { Medication } from '@/lib/interface/medication';
import { patientService } from '@/service/patientService';
import { useMutation } from '@tanstack/react-query';
import DateInput from '@/components/Input/DateInput';
import CustomCalendar from '@/components/calendar/CustomCalendar';

type MedicationInputType = Record<string, string>;
const date = {
  label: 'Date',
  placeholder: '10/05/1997',
}
const MedicationModal = () => {
  const [inputValue, setInputValue] = useState<MedicationInputType>({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  console.log(inputValue);
  const { name, dosage, time } = MedicationData;
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
      mutationFn: (payload: Medication) => patientService.createMedication(payload),
      onSuccess: (response) => {
        console.log(response)
      },
      onError:(error: AxiosError) => {
        console.log("Error!!",error)
         console.log("STATUS:", error.response?.status);
    console.log("ERROR DATA:", error.response?.data);
      }
    })
  
    const handleCreateMedication = async () => {
      const data ={
        name: inputValue.systolic.trim(),
        dosage: inputValue.diastolic.trim(),
        recordedAt: inputValue.date,
        // time: inputValue.time,
      }
      console.log("PAYLOAD:", data);
      await mutation.mutateAsync(data)
    }

  return (
    <View>
      <Input
        {...name}
        value={inputValue.name || ''} // Safe fallback
        onChangeText={(value) => handleChange('name', value)}
      />
      <NumberInput
        {...dosage}
        value={inputValue.dosage || ''} // Safe fallback
        onChangeText={(value) => handleChange('dosage', value)}
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
        />
      <SubmitButton _fn={handleCreateMedication}>{mutation.isPending ? "Saving..." : "Save Medication Log"}</SubmitButton>
    </View>
  );
};

export default MedicationModal;
