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
import { useMutation } from '@tanstack/react-query';
import { BloodPressure } from '@/lib/interface/create-blood-pressure.interface';
import { patientService } from '@/service/patientService';
import Toast from 'react-native-toast-message';
import { useModal } from '@/context/ModalContext';
import { TimerPickerModal } from 'react-native-timer-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { formatTime } from '@/app/utils/formatTime';

type BloodPressureInputType = Record<string, string>;

type ShowPickerState = {
  datePicker: boolean;
  timePicker: boolean;
};

const BloodPressureModal = () => {
  const [inputValue, setInputValue] = useState<BloodPressureInputType>({
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    topNumber: '',
    lastNumber: '',
  });
  const [time, setTime] = useState<string>('');
 
  const [showPicker, setShowPicker] = useState<ShowPickerState>({
    datePicker: false,
    timePicker: false,
  });
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

  const createBloodPressure = useMutation({
    mutationFn: (payload: BloodPressure) =>
      patientService.createBloodPressure(payload),
    onSuccess: (response) => {
      // console.log('Saved:', response.data);
      Toast.show({
        type: 'success',
        text1: response.data.success,
      });
      closeModal();
    },
    onError: (error: any) => {
      console.log('Error:', error.response.data);
      Toast.show({
        type: 'error',
        text1: error.response.data.error[0],
      });
    },
  });

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
          _fn={() => handleClick('datePicker')}
        />

        <CustomCalendar
          isOpen={showPicker.datePicker}
          onChangeText={handleDateSelect}
          onClose={() => handleClick('datePicker')}
        />
        {/* Time */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleClick('timePicker')}
        >
          <View style={{ alignItems: 'center' }}>
            {time !== null ? (
              <Text style={{ color: '#000000', fontSize: 20, marginTop: 10 }}>
                {time}
              </Text>
            ) : null}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleClick('timePicker')}
            >
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 18,
                    borderWidth: 1,
                    borderRadius: 10,
                    fontSize: 16,
                    overflow: 'hidden',
                    borderColor: '#C2C2C2',
                    color: '#C2C2C2',
                  }}
                >
                  {'Set your Time 🔔'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <TimerPickerModal
          closeOnOverlayPress
          LinearGradient={LinearGradient}
          modalProps={{
            overlayOpacity: 0.2,
          }}
          modalTitle="Time"
          onCancel={() => handleClick('timePicker')}
          onConfirm={(pickedDuration) => {
            setTime(formatTime(pickedDuration));
            handleClick('timePicker');
          }}
          setIsVisible={() => setShowPicker(showPicker)}
          styles={{
            theme: 'dark',
          }}
          visible={showPicker.timePicker}
        />
        {/* Button */}
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
