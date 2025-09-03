import React from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { colors } from '@/lib/colors';

interface SearchInputProps {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  onSearchPress?: () => void;
  editable?: boolean;
  autoFocus?: boolean;
  clearButtonMode?: 'never' | 'while-editing' | 'unless-editing' | 'always';
}

const SearchInput = ({
  value,
  onChangeText,
  placeholder,
  onSearchPress,
  editable = true,
  autoFocus = false,
  clearButtonMode = 'while-editing',
}: SearchInputProps) => {
  
  const handleSearchPress = () => {
    onSearchPress?.();
  };

  const handleSubmitEditing = () => {
    onSearchPress?.();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="default"
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.black}
          editable={editable}
          autoFocus={autoFocus}
          returnKeyType="search"
          onSubmitEditing={handleSubmitEditing}
          clearButtonMode={clearButtonMode}
          accessible={true}
          accessibilityLabel={`Search input: ${placeholder}`}
          accessibilityHint="Enter text to search"
        />
        
        <TouchableOpacity 
          style={styles.searchIconContainer}
          onPress={handleSearchPress}
          accessible={true}
          accessibilityLabel="Search button"
          accessibilityHint="Tap to search"
          disabled={!editable}
        >
          <EvilIcons 
            name="search" 
            size={22} 
            color={editable ? colors.black : colors.gray} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 7,
    flex: 1,
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
  },
  input: {
    width: '100%',
    height: 44,
    paddingVertical: 10,
    paddingHorizontal: 12,
    paddingLeft: 35,
    borderColor: '#D6D7DA',
    borderWidth: 1,
    borderRadius: 8,
    fontFamily: 'Inter_400Regular',
    fontWeight: '400',
    fontSize: 14,
    backgroundColor: '#FFFFFF',
    color: colors.black,
  },
  searchIconContainer: {
    position: 'absolute',
    left: 8,
    top: '50%',
    marginTop: -11,
    padding: 4,
    zIndex: 1,
  },
  text: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    fontWeight: '500',
    paddingBottom: 6,
    color: '#414651',
  },
});