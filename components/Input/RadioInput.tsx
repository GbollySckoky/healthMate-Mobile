import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

interface RadioInputProps {
  selected: boolean;
  onPress: () => void;
  style?: object;
}

const RadioInput = ({ selected, onPress, style }: RadioInputProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.radio, style]}>
        {selected && <View style={styles.innerCircle} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#717680',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#C11574',
    fontFamily: 'Inter_400Regular',
    fontWeight: '400',
    fontSize: 14,
  },
});

export default RadioInput;
