import React, { ReactElement, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Modal, TouchableOpacity } from 'react-native';
import { SubmitButton, Title } from '@/components/typography/Typography';
import { colors } from '@/lib/colors';
import Input from '@/components/Input/Input';
import useTracker from '@/hooks/useTrackers';
import { router } from 'expo-router';
import { ROUTES } from '@/lib/routes';


const { height } = Dimensions.get('window');

interface ModalType {
    handleDisplayComponent: (id: string) => void
}

export type EditReminderInputType = Record<string, string>

const title = {
    placeholder: 'e.g Medication',
    label: 'Title',
}
const EditModal = ({handleDisplayComponent}: ModalType) => {
  const [inputValue, setInputValue] = useState<EditReminderInputType>({})

  const handleInputValue = (key: string, value: string) => {
    setInputValue((prev) => ({
        ...prev,
        [key]: value
    }))
  }
  
  const handleSubmit = ( ) => {
    handleDisplayComponent('')
    router.push(ROUTES.profile)
    
  }
  return (
    <Modal
    // visible={isOpen}
    transparent={true}
    // animationType={modalConfig.animationType || 'fade'}
    onRequestClose={() => handleDisplayComponent('')}
    statusBarTranslucent={true}>
      <View style={styles.overlay}>
        <View style={styles.container}>
            <View style={styles.flex}>
                <Title>Edit Reminder</Title>
                <TouchableOpacity onPress={() => handleDisplayComponent('')}>
                    <Text style={{color: colors.gray, fontSize: 20}}>x</Text>
                </TouchableOpacity>
            </View>
            <Input 
                {...title}
                value={inputValue.title}
                onChangeText={(value) => handleInputValue('title', value)}
            />
            <View style={styles.btnFlex}>
                <TouchableOpacity style={styles.outlineBtn} onPress={() => handleDisplayComponent('')}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.joinBtn} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: '100%',
    padding:20,
  },
  flex:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  btnFlex:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10
  },
  outlineBtn:{
    flex: 1,
    paddingVertical: 12,
    borderColor: colors.broderColor,
    borderWidth: 1,
    // backgroundColor: '#DD2591',
    borderRadius: 8,
    alignItems: 'center',
    // marginLeft: 12,
    color:'white'
},
outlineBtnText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
    color: colors.black,
},
joinBtn: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#DD2591',
    borderRadius: 8,
    alignItems: 'center',
    // marginLeft: 12,
    color:'white'
},
buttonText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
    color: '#fff',
},
});

export default EditModal;
