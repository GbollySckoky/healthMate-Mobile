import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import CustomCalendar from '@/components/calendar/CustomCalendar';
import DateInput from '@/components/Input/DateInput';
import NumberInput from '@/components/Input/NumberInput';
import { SubmitButton } from '@/components/typography/Typography';
import { useModal } from '@/context/ModalContext';
import { bloodPressureData } from '@/lib/data';
import { BloodPressure } from '@/lib/interface/blood-pressure';
import { patientService } from '@/service/patientService';

type BloodPressureInputType = {
  date: string;
  systolic: string;
  diastolic: string;
};

type CalendarDay = {
  dateString: string;
};

const BloodPressureModal = () => {
  const { date, topNumber, lastNumber } = bloodPressureData;
  const { closeModal } = useModal();
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState<BloodPressureInputType>({
    date: new Date().toISOString(),
    systolic: '',
    diastolic: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (key: keyof BloodPressureInputType, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDateSelect = (day: CalendarDay) => {
    handleChange('date', day.dateString);
    setShowDatePicker(false);
  };

  const mutation = useMutation({
    mutationFn: (payload: BloodPressure) =>
      patientService.createBloodPressue(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['bloodPressure'] });
      closeModal();
    },
    onError: (error: AxiosError) => {
      console.log('Error!!', error);
      console.log('STATUS:', error.response?.status);
      console.log('ERROR DATA:', error.response?.data);
    },
  });

  const handleCreatePressure = async () => {
    const payload: BloodPressure = {
      systolic: inputValue.systolic.trim(),
      diastolic: inputValue.diastolic.trim(),
      recordedAt: inputValue.date,
    };

    await mutation.mutateAsync(payload);
  };

  return (
    <View style={styles.container}>
      <NumberInput
        {...topNumber}
        value={inputValue.systolic}
        onChangeText={(value) => handleChange('systolic', value)}
      />
      <NumberInput
        {...lastNumber}
        value={inputValue.diastolic}
        onChangeText={(value) => handleChange('diastolic', value)}
      />
      <DateInput
        {...date}
        value={
          inputValue.date ? new Date(inputValue.date).toLocaleDateString() : ''
        }
        _fn={() => setShowDatePicker(true)}
      />
      <CustomCalendar
        isOpen={showDatePicker}
        onChangeText={handleDateSelect}
        onClose={() => setShowDatePicker(false)}
      />
      <SubmitButton _fn={handleCreatePressure} disabled={mutation.isPending}>
        {mutation.isPending ? 'Saving...' : 'Save Reading'}
      </SubmitButton>
    </View>
  );
};

export default BloodPressureModal;

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingVertical: 8,
  },
});
