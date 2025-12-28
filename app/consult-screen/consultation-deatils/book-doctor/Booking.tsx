import { SubTitle } from '@/components/typography/Typography';
import { colors } from '@/lib/colors';
import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import DateInput from '@/components/Input/DateInput';
import CustomCalendar from '@/components/calendar/CustomCalendar';
import TextAreaInput from '@/components/Input/TextAreaInput';
import { useRouter } from 'expo-router';
import { ROUTES } from '@/lib/routes';
import { useMutation } from '@tanstack/react-query';
import { patientService } from '@/service/patientService';
import { CreateAppointmet } from '@/lib/interface/create-appointment-interface';
import Toast from 'react-native-toast-message';

const date = {
  label: 'Date',
  placeholder: '10/05/1997',
};

const Booking = () => {
  const router = useRouter();

  const [inputValue, setInputValue] = useState({
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    time: '', // ✅ STRING
    consultationType: '',
    healthConcern: '',
    about: '',
  });

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

  // ISO TIME STRINGS
  const timeSlots = [
    { label: '10:00:00', value: '10:00:00.000Z' },
    { label: '11:00:00', value: '11:00:00.000Z' },
    { label: '12:00:00', value: '12:00:00.000Z' },
    { label: '13:00:00', value: '13:00:00.000Z' },
    { label: '14:00:00', value: '14:00:00.000Z' },
    { label: '15:00:00', value: '15:00:00.000Z' },
    { label: '16:00:00', value: '16:00:00.000Z' },
    { label: '17:00:00', value: '17:00:00.000Z' },
  ];

  const consultationType = ['video call', 'audio', 'in-person'];

  const createAppointmentMutation = useMutation({
    mutationFn: (payload: CreateAppointmet) =>
      patientService.createAppointment(payload),
    onSuccess: (response) => {
      console.log(response.data);
      Toast.show({
        type: 'success',
        text1: response.data.message,
      });
      router.push(ROUTES.consultationPayment);
    },
    onError: (error: any) => {
      console.log('ERROR', error.response.data);
      Toast.show({
        type: 'error',
        text1: error.response.data,
      });
    },
  });

  const handleSubmit = async () => {
    Keyboard.dismiss();

    const payload: CreateAppointmet = {
      doctor: 'doctor@gmail.com',
      appointment_date: inputValue.date,
      appointment_time: inputValue.time,
      consultation_type: inputValue.consultationType,
      health_concerns: inputValue.healthConcern,
      about: inputValue.about,
    };

    console.log(payload);
    await createAppointmentMutation.mutate(payload);
  };

  return (
    <View style={{ marginBottom: 50 }}>
      <View style={{ marginBottom: 15 }}>
        <DateInput
          {...date}
          value={
            inputValue.date
              ? new Date(inputValue.date).toLocaleDateString()
              : ''
          }
          _fn={() => setShowDatePicker(true)}
        />
        <CustomCalendar
          isOpen={showDatePicker}
          onChangeText={handleDateSelect}
          onClose={() => setShowDatePicker(false)}
        />
      </View>

      <SubTitle>Select Time</SubTitle>
      <View style={styles.timeContainer}>
        {timeSlots.map((slot) => (
          <Pressable
            key={slot.value}
            onPress={() => handleChange('time', slot.value)}
            style={[
              styles.timeBox,
              inputValue.time === slot.value && styles.activeTime,
            ]}
          >
            <Text style={styles.timeText}>{slot.label}</Text>
          </Pressable>
        ))}
      </View>

      <SubTitle>Consultation Types</SubTitle>
      <View style={{ gap: 12, marginVertical: 15 }}>
        {consultationType.map((type) => (
          <Pressable
            key={type}
            onPress={() => handleChange('consultationType', type)}
            style={[
              styles.consultBox,
              inputValue.consultationType === type && styles.activeConsult,
            ]}
          >
            <Text style={{ fontSize: 12 }}>{type}</Text>
          </Pressable>
        ))}
      </View>

      <TextAreaInput
        value={inputValue.healthConcern}
        onChangeText={(value) => handleChange('healthConcern', value)}
        placeholder="Describe your issue..."
        label="Health Concern"
      />

      <TextAreaInput
        value={inputValue.about}
        onChangeText={(value) => handleChange('about', value)}
        placeholder="Any Note"
        label="Note"
      />

      <Pressable
        style={[
            styles.button,
            {
            backgroundColor: createAppointmentMutation.isPending
                ? '#ec4899'
                : '#DD2590',
            },
        ]}

        onPress={handleSubmit}
        disabled={createAppointmentMutation.isPending}
      >
        <Text style={styles.buttonText}>
          {createAppointmentMutation.isPending
            ? 'Processing...'
            : 'Proceed to payment'}
        </Text>
      </Pressable>
    </View>
  );
};

export default Booking;

const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginVertical: 15,
  },
  timeBox: {
    width: '22%',
    padding: 8,
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
  consultBox: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.broderColor,
  },
  activeConsult: {
    borderColor: colors.lightRed,
    backgroundColor: colors.lightPurple,
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
