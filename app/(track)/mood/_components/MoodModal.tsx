import React, { useState } from 'react';
import { MoodData } from './data';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import TextAreaInput from '@/components/Input/TextAreaInput';
import { SubmitButton } from '@/components/typography/Typography';

type MoodInputType = {
  description?: string;
  key?: Record<string, string | boolean>;
};

const handleClick = () => {};

const MoodModal = () => {
  const [inputValue, setInputValue] = useState<MoodInputType>({});
  const [selectEmoji, setSelectEmoji] = useState('');

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
      <SubmitButton _fn={handleClick}>Save Mood</SubmitButton>
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
