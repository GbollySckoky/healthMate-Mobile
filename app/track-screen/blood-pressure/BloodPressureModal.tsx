import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Keyboard,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { colors } from '@/lib/colors';
import { bloodPressureData } from '@/lib/data';
import NumberInput from '@/components/Input/NumberInput';
import DateInput from '@/components/Input/DateInput';
import CustomCalendar from '@/components/calendar/CustomCalendar';
import { SubmitButton } from '@/components/typography/Typography';
import { useMutation } from '@tanstack/react-query';
import { patientService } from '@/service/patientService';
import { BloodPressure } from '@/lib/interface/blood-pressure';
import { AxiosError } from 'axios';
import { useModal } from '@/context/ModalContext';

type BloodPressureInputType = Record<string, string>;

type ShowPickerState = {
  datePicker: boolean;
  timePicker: boolean;
};

const BloodPressureModal = () => {
  const { date, topNumber, lastNumber } = bloodPressureData;
  const [inputValue, setInputValue] = useState<BloodPressureInputType>({
    date: new Date().toISOString(), // Initialize with today's date in YYYY-MM-DD format
    systolic: '',
    diastolic: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { closeModal } = useModal();
  const handleChange = (key: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClick = (type: keyof ShowPickerState) => {
    setShowPicker((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleDateSelect = (day: any) => {
    handleChange('date', day.dateString);
    handleClick('datePicker');
  };

  const mutation = useMutation({
    mutationFn: (payload: BloodPressure) => patientService.createBloodPressue(payload),
    onSuccess: (response) => {
      console.log(response)
      closeModal()
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

  const handleSubmit = () => {
    Keyboard.dismiss();
    const payload: BloodPressure = {
      systolic: Number(inputValue.topNumber),
      diastolic: Number(inputValue.lastNumber),
      date_recorded: inputValue.date,
      time_recorded: time,
    };
    createBloodPressure.mutate(payload);
  };

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
  container: {
    gap: 16,
    padding: 16,
    flexGrow: 1,
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
    // gap: 12,
    // marginVertical: 15,
  },
  timeBox: {
    // width: '22%',
    padding: 8,
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.broderColor,
    alignItems: 'center',
  },
  activeTime: {
    borderColor: colors.lightRed,
    backgroundColor: colors.lightPurple,
  },
  timeText: {
    fontSize: 12,
  },
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
