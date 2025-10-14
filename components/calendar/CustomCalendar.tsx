import React, { useState } from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

interface CalendarType {
  isOpen: boolean;
  onChangeText: (day: any) => void;
  onClose: () => void;
  // markedDates: any;
}

export default function CustomCalendar({
  isOpen,
  onChangeText,
  onClose,
}: CalendarType) {
  const [selected, setSelected] = useState('');

  LocaleConfig.locales['en'] = {
    monthNames: [
      'January',
      'February', // Fixed typo: was 'Feburary'
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthNamesShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    dayNames: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
    today: 'Today', // Changed from French to English
  };
  LocaleConfig.defaultLocale = 'en';

  const handleDayPress = (day: any) => {
    setSelected(day.dateString);
    onChangeText(day); // Pass the entire day object to parent
  };

  console.log('Selected:', selected);
  console.log('IS_OPEN:', isOpen);

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType={'fade'}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={styles.backdrop}>
        <View style={styles.calendarContainer}>
          {/* Close button */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <Calendar
            onDayPress={handleDayPress}
            markedDates={{
              // ...markedDates,
              [selected]: {
                selected: true,
                disableTouchEvent: false,
                selectedColor: '#C11574',
              },
            }}
            style={styles.calendar}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: '#007AFF',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#ffffff',
              todayBackgroundColor: '#FDF2FA',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: '#007AFF',
              disabledArrowColor: '#d9e1e8',
              monthTextColor: '#2d4150',
              indicatorColor: '#007AFF',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 13,
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#666',
    fontWeight: 'bold',
  },
  calendar: {
    paddingBottom: 15,
  },
});
