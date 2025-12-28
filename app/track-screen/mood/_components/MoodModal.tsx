import React, { useState } from 'react';
import { MoodData } from '@/lib/data';
import { View, StyleSheet, Text, Pressable, Keyboard } from 'react-native';
import TextAreaInput from '@/components/Input/TextAreaInput';
import DateInput from '@/components/Input/DateInput';
import CustomCalendar from '@/components/calendar/CustomCalendar';
import { useMutation } from '@tanstack/react-query';
import { patientService } from '@/service/patientService';
import { CreateMood } from '@/lib/interface/create-mood-interface';
import { useModal } from '@/context/ModalContext';
import Toast from 'react-native-toast-message';

type MoodInputType = {
  description?: string;
  key?: Record<string, string | boolean>;
  date: string;
  mood: string;
};

const moodDate = {
  date: {
    label: 'Date',
    placeholder: '10/05/1997',
  },
};

const MoodModal = () => {
  const [inputValue, setInputValue] = useState<MoodInputType>({
    date: new Date().toISOString(),
    mood: '',
  });
  const [selectEmoji, setSelectEmoji] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { closeModal } = useModal();
  console.log('SELECT!!', selectEmoji);
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

  const handleSelectEmoji = (value: string) => {
    setSelectEmoji(value); // Store the selected mood value
    // Store the emoji and value wrapped in an object with boolean conversion
    setInputValue((prev) => ({
      ...prev,
      // [key]: {
      mood: value,
      // selectedEmoji: Boolean(emoji), //coverts a string to a boolean if the stirng is empty is false
      // },
    }));
  };

  const handleDateSelect = (day: any) => {
    handleChange('date', day.dateString);
    setShowDatePicker(false);
  };

  const handleCloseCalendar = () => setShowDatePicker(false);

  const createMoodMutation = useMutation({
    mutationFn: (payload: CreateMood) => patientService.createMood(payload),
    onSuccess: (response) => {
      // console.log('LOGG', response.data);
      Toast.show({
        type: 'success',
        text1: response.data.success,
      });
      closeModal();
    },
    onError: (error: any) => {
      // console.log('Error:', error.response.data.error);
      Toast.show({
        type: 'error',
        text1: error.response.data.error,
      });
    },
  });

  const handleSubmit = async () => {
    Keyboard.dismiss();

    const credentials = {
      mood: inputValue.mood || '',
      reason: inputValue.description || '',
      recorded_at: inputValue.date || '',
    };
    console.log(credentials);
    await createMoodMutation.mutate(credentials);
  };

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
              onPress={() => handleSelectEmoji(value)}
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
      <View style={{ marginTop: 7 }}>
        {/* Date Input */}
        <DateInput
          {...moodDate.date}
          value={new Date(inputValue.date).toLocaleDateString()}
          _fn={() => setShowDatePicker(true)}
        />
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
            backgroundColor: createMoodMutation.isPending
              ? '#ec4899'
              : '#DD2590',
          },
        ]}
        onPress={handleSubmit}
        disabled={createMoodMutation.isPending}
      >
        <Text style={styles.buttonText}>
          {createMoodMutation.isPending ? 'Saving...' : 'Save Mood Log'}
        </Text>
      </Pressable>
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
