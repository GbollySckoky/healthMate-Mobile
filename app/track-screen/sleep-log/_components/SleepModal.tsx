import React, { useState } from 'react';
import CustomCalendar from '@/components/calendar/CustomCalendar';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { sleepExperienceData, sleepData } from '@/lib/data';
import DateInput from '@/components/Input/DateInput';
import { SubmitButton } from '@/components/typography/Typography';

type SleepQuality = {
  selectedMood: string;
  selectedEmoji: boolean;
};

type SleepInputType = {
  date?: string;
  sleep?: SleepQuality;
};

const SleepModal = () => {
  const [inputValue, setInputValue] = useState<SleepInputType>({
    date: new Date().toISOString().split('T')[0],
  });
  const [selectDatePicker, setSelectDatePicker] = useState(false);
  const [selectEmojiValue, setSelectEmojiValue] = useState('');

  const { date } = sleepData;

  const handleChange = (
    key: keyof SleepInputType,
    value: string | SleepQuality
  ) => {
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

  const handleSelectEmojiValue = (
    key: keyof SleepInputType,
    emoji: string,
    value: string
  ) => {
    setSelectEmojiValue(value);
    const sleepQuality: SleepQuality = {
      selectedMood: value,
      selectedEmoji: Boolean(emoji), // converts a string to a boolean if the string is empty is false
    };
    setInputValue((prev) => ({
      ...prev,
      [key]: sleepQuality,
    }));
  };

  const handleClick = () => {
    // Add your submit logic here
    console.log('Submitting sleep data:', inputValue);
  };

  console.log(inputValue);

  return (
    <View>
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
                onPress={() => handleSelectEmojiValue('sleep', emoji, value)}
              >
                <Text style={styles.text}>{emoji}</Text>
                <Text style={{ color: '#717680' }}>{value}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
      <SubmitButton _fn={handleClick}>Save Sleep Log</SubmitButton>
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
});
