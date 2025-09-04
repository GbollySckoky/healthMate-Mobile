import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { messageData } from '@/lib/data';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '@/lib/colors';

const ClosedChats = () => {
  
  return (
    <View style={styles.container}>
        {messageData?.map((message, index) => {
          const { name, profession, msg, time, count, img } = message;
          return (
            <View style={styles.Card} key={index}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', flex: 1}}>
                    <Image source={img} alt='Profile Image' style={{width: 60, height: 60, borderRadius: 30}}/>
                <View style={{marginLeft: 10, flex: 1}}>
                    <Text style={styles.name}>{name || 'No Name'}</Text>
                    <Text style={styles.profession}>{profession || 'No Profession'}</Text>
                    <View style={styles.messageRow}>
                        <Ionicons name="checkmark-done" size={15} color="#717680" />
                        <Text style={styles.message} numberOfLines={1} ellipsizeMode="tail">
                          {msg || 'No Message'}
                        </Text>
                    </View>
                </View>
                </View>
                <View style={styles.rightColumn}>
                      <View style={styles.countContainer}>
                        <Text style={styles.count}>{count}</Text>
                      </View>
                    <Text style={styles.time}>{time || 'No Time'}</Text>
                </View>
                </View>
            </View>
          );
        }) || <Text style={styles.debugText}>No messages to display</Text>}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  debugText: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 4,
    fontFamily: 'LibreFranklin_600SemiBold'
  },
  profession: {
    fontSize: 12,
    color: '#6938EF',
    paddingBottom: 3
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  message: {
    fontSize: 14,
    color: '#333',
    marginLeft: 6,
    flex: 1,
  },
  rightColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    minHeight: 60,
    paddingLeft: 10,
  },
  countContainer: {
    minWidth: 20,
    minHeight: 20,
    backgroundColor: 'red',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  count: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'Inter_400Regular',
    fontWeight: '600',
    textAlign: 'center',
  },
  time: {
    fontSize: 12,
    color: colors.lightRed,
    textAlign: 'right',
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  Card: {
    padding: 15,
    borderColor: '#F2F2F2',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 15
  },
});

export default ClosedChats;