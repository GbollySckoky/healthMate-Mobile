import { colors } from '@/lib/colors';
import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';

interface NumberInputType {
  // label: string;
  value: string;
  onChangeText: (value: string) => void;
  // placeholder: string
}
const Inputs = ({ value, onChangeText }: NumberInputType) => {
  return (
    <TextInput
      style={styles.input}
      keyboardType="numeric"
      onChangeText={onChangeText}
      value={value}
      // placeholder={placeholder}
      placeholderTextColor={colors.black}
    />
  );
};

export default Inputs;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: 500,
    paddingBottom: 6,
    color: '#414651',
  },
  input: {
    width: 40,
    height: 40,
    // padding: 10,
    borderColor: '#D6D7DA',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
    fontWeight: '400',
    fontSize: 14,
  },
});
