import { SubTitle } from '@/components/typography/Typography';
import { colors } from '@/lib/colors';
import React, { FormEvent, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DateInput from '@/components/Input/DateInput';
import CustomCalendar from '@/components/calendar/CustomCalendar';
import TextAreaInput from '@/components/Input/TextAreaInput';
import { useRouter } from 'expo-router';
import { ROUTES } from '@/lib/routes';
import { useMutation } from '@tanstack/react-query';
import { patientService } from '@/service/patientService';
import { Appointment } from '@/lib/interface/createAppointment';
import Toast from 'react-native-toast-message';

const date = {
  label: 'Date',
  placeholder: '10/05/1997',
};

const Booking = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState({
    date: new Date().toISOString().split('T')[0], // Initialize with today's date in YYYY-MM-DD format
    time: '',
    consultationType: '',
    healthConcern: '',
    doctorId: '',
    hospitalId: '',
    amount: ''
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (key: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDateSelect = (day: any) => {
    const selectedDate = day.dateString; // This will be in YYYY-MM-DD format
    handleChange('date', selectedDate);
    // setSelectDatePicker(new Date(selectedDate))
    setShowDatePicker(false); // Close calendar after selection
  };

  const handleCloseCalendar = () => {
    setShowDatePicker(false);
  };
  console.log(inputValue);
  const time = [
    '10:00am',
    '11:00am',
    '12:00pm',
    '1:00pm',
    '2:00pm',
    '3:00pm',
    '4:00pm',
    '5:00pm',
  ];
  const consultationType = ['Video Call', 'Audio Call', 'Physical Appointment'];
  
  const mutation = useMutation({
    mutationKey: ['createConsultation'],
    mutationFn: (payload: Appointment) => patientService.createConsultation(payload),
    onSuccess: (response) => {
      console.log('19292',response)
      router.push(ROUTES.consultationPayment)
    },
    onError: (error: any) => {
      Toast.show({
          type: 'error',
          text1: error.response.data.message
      })
      console.log('TEMA',error.response.data.message)
    }
  })

  const handleSubmit = async () => {
    const data = {
      date: inputValue.date,
      time: inputValue.time,
      consultationType: inputValue.consultationType,
      healthConcern: inputValue.healthConcern,
      doctorId: 3,
      hospitalId: 1,
      amount: 100000
    }
    console.log("submit_daata", data)
    await mutation.mutate(data)
  }
  return (
    <View style={{ marginBottom: 50 }}>
      <View style={{ marginBottom: 15 }}>
        <DateInput
          {...date}
          value={
            inputValue.date
              ? new Date(inputValue.date).toLocaleDateString()
              : ''
          } // Show formatted date safely
          _fn={() => setShowDatePicker(true)} // Open calendar directly
        />
        <CustomCalendar
          isOpen={showDatePicker}
          onChangeText={handleDateSelect}
          onClose={handleCloseCalendar}
        />
      </View>

      <SubTitle>Select Time</SubTitle>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 12,
          marginTop: 5,
          marginBottom: 20,
        }}
      >
        {time.map((timeSlot, index) => (
          <View
            key={index}
            style={{
              width: '22%',
              minWidth: 70,
            }}
          >
            <Pressable onPress={() => handleChange('time', timeSlot)}>
              <Text
                style={{
                  padding: 8,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor:
                    inputValue.time === timeSlot
                      ? colors.lightRed
                      : colors.broderColor,
                  textAlign: 'center',
                  fontSize: 12,
                  backgroundColor:
                    inputValue.time === timeSlot ? colors.lightPurple : '',
                }}
              >
                {timeSlot}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
      <SubTitle>Consultation Types</SubTitle>
      <View
        style={{
          gap: 12,
          marginTop: 7,
          marginBottom: 20,
        }}
      >
        {consultationType.map((consult, index) => (
          <View key={index}>
            <Pressable
              onPress={() => handleChange('consultationType', consult)}
            >
              <Text
                style={{
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor:
                    inputValue.consultationType === consult
                      ? colors.lightRed
                      : colors.broderColor,
                  fontSize: 12,
                  backgroundColor:
                    inputValue.consultationType === consult
                      ? colors.lightPurple
                      : '',
                }}
              >
                {consult}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
      <TextAreaInput
        value={inputValue.healthConcern}
        onChangeText={(value) => handleChange('healthConcern', value)}
        placeholder="Describe your issue..."
        label="Health Concern"
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 10,
        }}
      >
        <SubTitle>Total</SubTitle>
        <Text style={[style.buttonTexts, { color: colors.green }]}>
          ₦10,000
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#DD2590',
          paddingVertical: 12,
          borderRadius: 10,
          marginTop: 25,
        }}
        activeOpacity={0.8}
        onPress={handleSubmit}
      >
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 16,
          }}
        >
         {mutation.isPending ? "proceeding..." : " Proceed to payment"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Booking;

const style = StyleSheet.create({
  buttonTexts: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'LibreFranklin_600SemiBold',
  },
});
