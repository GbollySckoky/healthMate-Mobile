import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Alert } from 'react-native'
import { colors } from '@/lib/colors'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

const MessageInput = ({  placeholder = "Type a message..." }) => {
  const [inputValue, setInputValue] = useState('')

  // const handleSend = () => {
  //   if (inputValue.trim()) {
  //     onSend?.(inputValue.trim())
  //     setInputValue('')
  //   }
  // }

  // const handleSearch = () => {
  //   onSearch?.(inputValue)
  // }

  // const handleMicPress = () => {
  //   onMicPress?.()
  // }

  const handleInputChange = (value: string) => {
    setInputValue(value)
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="default"
          onChangeText={handleInputChange}
          value={inputValue}
          placeholder={placeholder}
          placeholderTextColor={colors.black}
          accessible={true}
          accessibilityLabel="Message input field"
          multiline={false}
          returnKeyType="send"
          // onSubmitEditing={handleSend}
        />
        
        {/* Search Icon */}
        <TouchableOpacity 
          style={styles.searchIconContainer}
          // onPress={handleSearch}
          accessible={true}
          accessibilityLabel="Search"
        >
          <EvilIcons name="search" size={25} color={colors.black} />
        </TouchableOpacity>

        {/* Right Icons Container */}
        <View style={styles.rightIconsContainer}>
          {/* Microphone Icon */}
          <TouchableOpacity 
            style={styles.micIconContainer}
            // onPress={handleMicPress}
            accessible={true}
            accessibilityLabel="Voice input"
          >
            <Ionicons 
              name="mic-outline" 
              size={18} 
              color={colors.gray} 
            />
          </TouchableOpacity>

          {/* Send Button */}
          <TouchableOpacity 
            style={[
              styles.sendButton,
              { opacity: inputValue.trim() ? 1 : 0.5 }
            ]}
            // onPress={handleSend}
            disabled={!inputValue.trim()}
            accessible={true}
            accessibilityLabel="Send message"
          >
            <FontAwesome 
              name="send-o" 
              size={13} 
              color="white" 
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default MessageInput

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
  },
  input: {
    width: '100%',
    minHeight: 44,
    padding: 15,
    borderColor: '#D6D7DA',
    borderWidth: 1,
    borderRadius: 15,
    fontFamily: 'Inter_400Regular',
    fontWeight: '400',
    fontSize: 14,
    paddingLeft: 45,
    paddingRight: 80,
    backgroundColor: '#FFFFFF',
    color: colors.black,
  },
  searchIconContainer: {
    position: 'absolute',
    left: 12,
    top: '50%',
    marginTop: -12.5,
    zIndex: 1,
    padding: 2,
  },
  rightIconsContainer: {
    position: 'absolute',
    right: 8,
    top: '50%',
    marginTop: -18,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  micIconContainer: {
    padding: 6,
    marginRight: 4,
  },
  sendButton: {
    backgroundColor: colors.lightRed,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  text: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    fontWeight: '500',
    paddingBottom: 6,
    color: '#414651',
  },
});