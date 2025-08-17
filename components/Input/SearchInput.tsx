import React from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { colors } from '@/lib/colors';

interface NumberInputType {
//   label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
}
const SearchInput = ({
//   label,
  value,
  onChangeText,
  placeholder,
}: NumberInputType) => {
  return (
    <View style={{ paddingVertical: 7, flex:1 }}>
      <TextInput
        style={styles.input}
        keyboardType="default"
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={colors.black}
      />
      <Text style={{position: 'absolute',top: 18, left: 3 }}> 
        <EvilIcons name="search" size={25} color={colors.black} /> 
      </Text>
    </View>
  );
};

export default SearchInput;

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
    position: 'relative',
    paddingLeft: 30,
  },
});
