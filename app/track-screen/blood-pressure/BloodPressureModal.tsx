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
import { SubTitle, SubmitButton } from '@/components/typography/Typography';
import { useMutation } from '@tanstack/react-query';
import { BloodPressure } from '@/lib/interface/create-blood-pressure.interface';
import { patientService } from '@/service/patientService';
import Toast from 'react-native-toast-message';
import { useModal } from '@/context/ModalContext';

type BloodPressureInputType = Record<string, string>;

const timeSlots = [
  { label: '12:00 AM', value: '00:00:00' },
  { label: '1:00 AM', value: '01:00:00' },
  { label: '2:00 AM', value: '02:00:00' },
  { label: '3:00 AM', value: '03:00:00' },
  { label: '4:00 AM', value: '04:00:00' },
  { label: '5:00 AM', value: '05:00:00' },
  { label: '6:00 AM', value: '06:00:00' },
  { label: '7:00 AM', value: '07:00:00' },
  { label: '8:00 AM', value: '08:00:00' },
  { label: '9:00 AM', value: '09:00:00' },
  { label: '10:00 AM', value: '10:00:00' },
  { label: '11:00 AM', value: '11:00:00' },
  { label: '12:00 PM', value: '12:00:00' },
  { label: '1:00 PM', value: '13:00:00' },
  { label: '2:00 PM', value: '14:00:00' },
  { label: '3:00 PM', value: '15:00:00' },
  { label: '4:00 PM', value: '16:00:00' },
  { label: '5:00 PM', value: '17:00:00' },
  { label: '6:00 PM', value: '18:00:00' },
  { label: '7:00 PM', value: '19:00:00' },
  { label: '8:00 PM', value: '20:00:00' },
  { label: '9:00 PM', value: '21:00:00' },
  { label: '10:00 PM', value: '22:00:00' },
  { label: '11:00 PM', value: '23:00:00' },
];

const BloodPressureModal = () => {
  const [inputValue, setInputValue] = useState<BloodPressureInputType>({
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    time: '00:00:00.000Z', // Default to midnight
    topNumber: '',
    lastNumber: '',
  });
  console.log('value', inputValue);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { closeModal } = useModal();
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

  const createBloodPressure = useMutation({
    mutationFn: (payload: BloodPressure) =>
      patientService.createBloodPressure(payload),
    onSuccess: (response) => {
      console.log('Saved:', response.data);
      Toast.show({
        type: 'success',
        text1: response.data.success,
      });
      closeModal()
    },
    onError: (error: any) => {
      console.log('Error:', error.response.data.error);
      Toast.show({
        type: 'error',
        text1: error.response.data.error,
      });
    },
  });

  const handleSubmit = () => {
    Keyboard.dismiss();
    const payload: BloodPressure = {
      systolic: Number(inputValue.topNumber),
      diastolic: Number(inputValue.lastNumber),
      date_recorded: inputValue.date,
      time_recorded: inputValue.time,
    };
    createBloodPressure.mutate(payload);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View>
        <NumberInput
          {...bloodPressureData.topNumber}
          value={inputValue.topNumber}
          onChangeText={(value) => handleChange('topNumber', value)}
        />
        <NumberInput
          {...bloodPressureData.lastNumber}
          value={inputValue.lastNumber}
          onChangeText={(value) => handleChange('lastNumber', value)}
        />

        {/* Date Input */}
        <DateInput
          {...bloodPressureData.date}
          value={new Date(inputValue.date).toLocaleDateString()}
          _fn={() => setShowDatePicker(true)}
        />

        {/* Time Input (shows selected slot) */}
        <DateInput
          {...bloodPressureData.time}
          value={
            timeSlots.find((slot) => slot.value === inputValue.time)?.value ||
            ''
          }
          _fn={() => {}}
        />

        {/* <SubTitle>Select Time</SubTitle> */}
        <View style={styles.timeContainer}>
          {timeSlots.map((slot) => {
            const isActive = inputValue.time === slot.value;
            return (
              <Pressable
                key={slot.value}
                onPress={() => handleChange('time', slot.value)}
                style={[styles.timeBox, isActive && styles.activeTime]}
              >
                <Text style={styles.timeText}>{slot.label}</Text>
              </Pressable>
            );
          })}
        </View>

        <CustomCalendar
          isOpen={showDatePicker}
          onChangeText={handleDateSelect}
          onClose={handleCloseCalendar}
        />

        <Pressable
          style={[
            styles.button,
            {
              backgroundColor: createBloodPressure.isPending
                ? '#ec4899'
                : '#DD2590',
            },
          ]}
          onPress={handleSubmit}
          disabled={createBloodPressure.isPending}
        >
          <Text style={styles.buttonText}>
            {createBloodPressure.isPending ? 'Saving...' : 'Save Pressure'}
          </Text>
        </Pressable>
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
