import React, { useState } from 'react';
import { View, Text, Keyboard, Pressable, StyleSheet } from 'react-native';
import NumberInput from '@/components/Input/NumberInput';
import { MedicationData } from '@/lib/data';
import Input from '@/components/Input/Input';
import { SubmitButton } from '@/components/typography/Typography';
import { useMutation } from '@tanstack/react-query';
import { patientService } from '@/service/patientService';
import { CreateMedication } from '@/lib/interface/create-medication-interface';
import Toast from 'react-native-toast-message';
import { useModal } from '@/context/ModalContext';
import CustomCalendar from '@/components/calendar/CustomCalendar';
import DateInput from '@/components/Input/DateInput';

type MedicationInputType = Record<string, string>;

const medicationDate = {
  date: {
    label: 'Date',
    placeholder: '10/05/1997',
  },
};
const MedicationModal = () => {
  const [inputValue, setInputValue] = useState<MedicationInputType>({
    date: new Date().toISOString().split('T')[0],
  });
  console.log(inputValue);
  const { name, dosage, time } = MedicationData;
  const { closeModal } = useModal();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleChange = (key: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDateSelect = (day: any) => {
    handleChange('date', day.dateString);
    setShowDatePicker(false);
  };

  const handleCloseCalendar = () => setShowDatePicker(false);

  const createMedicationMutation = useMutation({
    mutationFn: (payload: CreateMedication) =>
      patientService.createMedication(payload),
    onSuccess: (response) => {
      console.log('LOGG', response.data);
      Toast.show({
        type: 'success',
        text1: response.data.success,
      });
      closeModal();
    },
    onError: (error: any) => {
      console.log('Error:', error.response.data.error);
      Toast.show({
        type: 'error',
        text1: error.response.data.error,
      });
    },
  });

  const handleSubmit = async () => {
    Keyboard.dismiss();

    const credentials = {
      medication_name: inputValue.name || '',
      dosage: inputValue.dosage || '',
      date_taken: inputValue.date || '',
    };
    console.log(credentials);
    await createMedicationMutation.mutate(credentials);
  };

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
      {/* Date Input */}
      <DateInput
          {...medicationDate.date}
          value={new Date(inputValue.date).toLocaleDateString()}
          _fn={() => setShowDatePicker(true)}
        />
      <CustomCalendar
        isOpen={showDatePicker}
        onChangeText={handleDateSelect}
        onClose={handleCloseCalendar}
      />
      <Pressable
        style={[
          styles.button,
          {
            backgroundColor: createMedicationMutation.isPending
              ? '#ec4899'
              : '#DD2590',
          },
        ]}
        onPress={handleSubmit}
        disabled={createMedicationMutation.isPending}
      >
        <Text style={styles.buttonText}>
          {createMedicationMutation.isPending
            ? 'Saving...'
            : 'Save Medication Log'}
        </Text>
      </Pressable>
    </View>
  );
};

export default MedicationModal;

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
