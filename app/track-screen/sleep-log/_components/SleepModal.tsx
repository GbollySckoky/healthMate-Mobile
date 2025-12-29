import React, { useState } from 'react';
import CustomCalendar from '@/components/calendar/CustomCalendar';
import { Pressable, Text, View, StyleSheet, Keyboard } from 'react-native';
import { sleepExperienceData, sleepData } from '@/lib/data';
import DateInput from '@/components/Input/DateInput';
import Toast from 'react-native-toast-message';
import { useMutation } from '@tanstack/react-query';
import { patientService } from '@/service/patientService';
import { CreateSleep } from '@/lib/interface/create-sleep-interface';
import { useModal } from '@/context/ModalContext';
import NumberInput from '@/components/Input/NumberInput';

// type SleepQuality = {
//   selectedMood: string;
//   selectedEmoji: boolean;
// };

type SleepInputType = {
  date?: string;
  sleep?: string;
  hours?: string;
};

const SleepModal = () => {
  const [inputValue, setInputValue] = useState({
    date: new Date().toISOString().split('T')[0],
    sleep: '',
    hours: '',
  });
  const [selectDatePicker, setSelectDatePicker] = useState(false);
  const [selectEmojiValue, setSelectEmojiValue] = useState('');
  const { closeModal } = useModal();
  console.log(inputValue);

  const { date, sleep } = sleepData;

  const handleChange = (key: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSelectDate = (day: any) => {
    const selectedDate = day.dateString;
    handleChange('date', selectedDate); // Fixed: was 'code', should be 'date'
    setSelectDatePicker(false);
    console.log('select', selectedDate);
  };

  const handleCloseCalendar = () => {
    setSelectDatePicker(false);
  };

  const handleSelectEmojiValue = (value: string) => {
    setSelectEmojiValue(value);
    setInputValue((prev) => ({
      ...prev,
      sleep: value,
    }));
  };


  const createSleepMutation = useMutation({
    mutationFn: (payload: CreateSleep) => patientService.createSleep(payload),
    onSuccess: (response) => {
      Toast.show({
        type: 'success',
        text1: response.data.success,
      });
      closeModal();
    },
    onError: (error: any) => {
      Toast.show({
        type: 'error',
        text1: error.response.data,
      });
    },
  });

  const handleSubmit = async () => {
    Keyboard.dismiss();

    const credentials = {
      hours_slept: Number(inputValue.hours),
      sleep_date: inputValue.date,
      quanlity: inputValue.sleep
    };
    
    await createSleepMutation.mutate(credentials);
  };

  return (
    <View>
      <NumberInput
        {...sleep}
        value={inputValue.hours}
        onChangeText={(value) => handleChange('hours', value)}
      />
      <DateInput
        {...date}
        value={
          inputValue.date ? new Date(inputValue.date).toLocaleDateString() : ''
        }
        _fn={() => setSelectDatePicker(true)}
      />
      <CustomCalendar
        isOpen={selectDatePicker}
        onChangeText={handleSelectDate}
        onClose={handleCloseCalendar}
      />
      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            marginBottom: 7,
            fontWeight: '500',
            fontSize: 14,
            fontFamily: 'Inter',
          }}
        >
          Sleep Quality (Optional)
        </Text>
        <View style={styles.container}>
          {sleepExperienceData.map((sleep) => {
            const { emoji, value, id } = sleep;
            return (
              <Pressable
                key={id}
                style={[
                  styles.gridItem,
                  selectEmojiValue === value && styles.selectedItem,
                ]}
                onPress={() => handleSelectEmojiValue(value)}
              >
                <Text style={styles.text}>{emoji}</Text>
                <Text style={{ color: '#717680' }}>{value}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
        <Pressable
        style={[
          styles.button,
          {
            backgroundColor: createSleepMutation.isPending
              ? '#ec4899'
              : '#DD2590',
          },
        ]}
        onPress={handleSubmit}
        disabled={createSleepMutation.isPending}
      >
        <Text style={styles.buttonText}>
          {createSleepMutation.isPending ? 'Saving...' : 'Save Sleep Log'}
        </Text>
      </Pressable>
    </View>
  );
};

export default SleepModal;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Libre-Franklin',
    color: '#414651',
    paddingBottom: 15,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  gridItem: {
    width: '31%',
    height: 100,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: '#F1F1F1',
    borderWidth: 1,
  },
  selectedItem: {
    borderColor: '#C11574',
    backgroundColor: '#FDF2FA',
  },
  text: {
    fontSize: 38,
    paddingBottom: 6,
  },
  button: {
    backgroundColor: '#DD2590',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 25,
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});
