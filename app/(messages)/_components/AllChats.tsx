import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { messageData } from './data';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card } from '@/components/typography/Typography';
import { colors } from '@/lib/colors';

const AllChats = () => {
  
  return (
    <View style={styles.container}>
        {messageData?.map((message, index) => {
          const { name, profession, msg, time, count } = message;
          return (
            <Card key={index}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flex: 1}}>
                    <Text style={styles.name}>{name || 'No Name'}</Text>
                    <Text style={styles.profession}>{profession || 'No Profession'}</Text>
                    <View style={styles.messageRow}>
                        <Ionicons name="checkmark-done" size={15} color="#717680" />
                        <Text style={styles.message}>{msg || 'No Message'}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'column',justifyContent: 'space-between'}}>
                    <Text style={styles.count}>{count || 'No Count'}</Text>
                    <Text style={styles.time}>{time || 'No Time'}</Text>
                </View>
                </View>
            </Card>
          );
        }) || <Text style={styles.debugText}>No messages to display</Text>}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f5f5f5',
    // padding: 16,
  },
  debugText: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  messageItem: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  profession: {
    fontSize: 12,
    color: '#6938EF',
    paddingBottom: 3
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // flex: 1,
    marginTop: 2,
  },
  message: {
    fontSize: 14,
    color: '#333',
    marginLeft: 6,
    flex: 1,
    // text
  },
  time: {
    fontSize: 12,
    color: colors.lightRed,
    textAlign: 'right',
    fontFamily: 'Inter_400Regular',
  },
  count: {
    fontSize: 12,
    color: 'white',
    textAlign: 'right',
    fontFamily: 'Inter_400Regular',
    backgroundColor: 'red',
    borderRadius: 30,

  },
});

export default AllChats;