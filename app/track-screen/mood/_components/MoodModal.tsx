import React, { useState } from 'react';
import { MoodData } from '@/lib/data';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import TextAreaInput from '@/components/Input/TextAreaInput';
import { SubmitButton } from '@/components/typography/Typography';
import { useMutation } from '@tanstack/react-query';
import { Mood } from '@/lib/interface/mood';
import { patientService } from '@/service/patientService';
import { AxiosError } from 'axios';
import CustomCalendar from '@/components/calendar/CustomCalendar';
import DateInput from '@/components/Input/DateInput';

const date = {
  label: 'Date',
  placeholder: '10/05/1997',
}
const MoodModal = () => {
  const [inputValue, setInputValue] = useState({
    description: "",
    mood:{
      selectedMood: "",
      selectedEmoji: false
    },
    date: new Date().toISOString(),
  });
  const [selectEmoji, setSelectEmoji] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  console.log('12345', inputValue);

  const data = {
    mood: {
      label: "What's making you feel this way?",
      placeholder: 'Enter a description...',
    },
  };

  const handleChange = (key: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSelectEmoji = (key: string, emoji: string, value: string) => {
    setSelectEmoji(value); // Store the selected mood value
    // Store the emoji and value wrapped in an object with boolean conversion
    setInputValue((prev) => ({
      ...prev,
      [key]: {
        selectedMood: value,
        selectedEmoji: Boolean(emoji), //coverts a string to a boolean if the stirng is empty is false
      },
    }));
  };

  const handleDateSelect = (day: any) => {
    const selectedDate = day.dateString;
    handleChange('date', selectedDate);
    // setSelectDatePicker(new Date(selectedDate))
    setShowDatePicker(false); // Close calendar after selection
    console.log('select', selectedDate);
  };

  const handleCloseCalendar = () => {
    setShowDatePicker(false);
  }
   const mutation = useMutation({
    mutationFn: (payload: Mood) => patientService.createMood(payload),
    onSuccess: (response) => {
      console.log(response)
    },
    onError:(error: AxiosError) => {
      console.log("Error!!",error)
        console.log("STATUS:", error.response?.status);
    console.log("ERROR DATA:", error.response?.data);
    }
  })
      
  const handleCreateMood = async () => {
    const data ={
      notes: inputValue.description,
      mood: inputValue.mood,
      recordedAt: inputValue.date,
    }
    console.log("PAYLOAD:", data);
    await mutation.mutateAsync(data)
  }
  console.log('inputValue', inputValue);
  return (
    <View>
      <Text style={styles.title}>Select your Mood</Text>
      <View style={styles.container}>
        {MoodData.map((mood) => {
          const { id, emoji, value } = mood;
          return (
            <Pressable
              key={id}
              style={[
                styles.gridItem,
                selectEmoji === value && styles.selectedItem,
              ]}
              onPress={() => handleSelectEmoji('mood', emoji, value)}
            >
              <Text style={styles.text}>{emoji}</Text>
              <Text style={{ color: '#717680' }}>{value}</Text>
            </Pressable>
          );
        })}
      </View>
      <TextAreaInput
        {...data.mood}
        value={inputValue.description || ''}
        onChangeText={(value) => handleChange('description', value)}
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
        //     markedDates={{
        //     [inputValue.date]: {selected: true, disableTouchEvent: false, selectedColor: '#C11574'}
        // }}
      />
      <SubmitButton _fn={handleCreateMood}>Save Mood</SubmitButton>
    </View>
  );
};

export default MoodModal;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: '600', // Changed from number to string
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
    borderColor: '#C11574', // Add a selected border color
    backgroundColor: '#FDF2FA',
  },
  text: {
    fontSize: 38,
    paddingBottom: 6,
  },
});
