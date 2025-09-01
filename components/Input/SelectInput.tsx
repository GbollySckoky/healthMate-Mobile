import React from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import useToggles from '@/hooks/useToggles';
import { colors } from '@/lib/colors';

interface SelectInputType {
  options: string[];
  value: string;
  onChangeText: (value: string) => void;
  label: string;
}

const SelectInput = ({ options, value, onChangeText, label }: SelectInputType) => {
  const { toggle, handleToggle } = useToggles();
  const icon = toggle ? <AntDesign name="up" size={15} color="black" /> : <AntDesign name="down" size={15} color="black" />;

  return (
    <View style={{ marginTop: 10 }}>
      <Text>{label}</Text>

      <Pressable style={styles.input} onPress={handleToggle}>
        <Text>{value || 'Select option'}</Text>
        {icon}
      </Pressable>

      {toggle && (
        <View style={styles.borderOptions}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => {
                onChangeText(option);
                handleToggle(); 
              }}
            >
              <Text style={{ fontWeight: '300', color: value === option ? colors.red : colors.black,
                // backgroundColor: value === option ? colors.lightRed : ''
                 }}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default SelectInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#D6D7DA',
    borderRadius: 5,
    height: 40,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Inter_400Regular',
    fontWeight: '400',
    fontSize: 14,
  },
  option: {
    padding: 4,
  },
  borderOptions: {
    borderColor: '#F2F2F2',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
    padding: 5,
  },
});
