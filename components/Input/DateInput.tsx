import React from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';
import { colors } from '@/lib/colors';


interface DateInputType {
  label: string;
  value: string;
  _fn: () => void;
  placeholder: string;
}

const DateInput = ({ label, value, _fn, placeholder }: DateInputType) => {
  return (
    <View style={{ paddingVertical: 7 }}>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onPress={_fn}
        value={value}
        placeholder={placeholder}
        editable={false}
        showSoftInputOnFocus={false}
        placeholderTextColor={colors.black}
      />
    </View>
  );
};

export default DateInput;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Inter_500Medium',
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
    fontFamily: 'Inter_400Regular',
    fontWeight: '400',
    fontSize: 14,
  },
});
