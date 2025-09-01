import React, { ReactElement } from 'react';
import { TextInput, View, StyleSheet, Text, Pressable } from 'react-native';
import { colors } from '@/lib/colors';


interface PasswordInputProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  secureTextEntry: boolean;
  openIcon: ReactElement;
  closeIcon: ReactElement;
  isPasswordVisible: boolean; // Changed from string to boolean
  onToggleVisibility: () => void; // Simplified the type
}

const PasswordInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  openIcon,
  closeIcon,
  isPasswordVisible,
  onToggleVisibility,
}: PasswordInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={colors.black}
        />
        <Pressable style={styles.eyeButton} onPress={onToggleVisibility}>
          {isPasswordVisible ? openIcon : closeIcon}
        </Pressable>
      </View>
    </View>
  );
};

export default PasswordInput;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 7,
  },
  label: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    fontWeight: '500',
    paddingBottom: 6,
    color: '#414651',
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: 10,
    paddingRight: 50,
    borderColor: '#D6D7DA',
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: 'Inter_400Regular',
    fontWeight: '400',
    fontSize: 14,
  },
  eyeButton: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -18 }],
    padding: 5,
  },
});
