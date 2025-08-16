import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';

interface NumberInputType {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
}
const TextAreaInput = ({
  label,
  value,
  onChangeText,
  placeholder,
}: NumberInputType) => {
  return (
    <View style={{ paddingVertical: 7 }}>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        style={styles.input}
        keyboardType="default"
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        multiline={true}
        numberOfLines={6}
        textAlignVertical="top" // for andriod it takes the text to the top
      />
    </View>
  );
};

export default TextAreaInput;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: 500,
    paddingBottom: 6,
    color: '#414651',
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#D6D7DA',
    borderWidth: 1,
    borderRadius: 5,
  },
});
