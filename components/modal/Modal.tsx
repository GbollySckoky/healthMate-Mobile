import React, { ReactElement } from 'react';
import { View, Text, StyleSheet, Dimensions, Modal } from 'react-native';
import { SubmitButton } from '@/components/typography/Typography';
import { colors } from '@/lib/colors';

const { height } = Dimensions.get('window');

interface ModalType {
  icon: ReactElement;
  title: string;
  text: string;
  isOpen: boolean;
  closeModal: () => void;
  route: () => void;
  submitText: string
}

const Modals = ({ icon, title, text, isOpen, closeModal, route, submitText }: ModalType) => {
  if (!isOpen) return null;
  const handleRoute = () => {
    closeModal()
    route()

  }
  return (
    <Modal
    // visible={isOpen}
    transparent={true}
    // animationType={modalConfig.animationType || 'fade'}
    onRequestClose={closeModal}
    statusBarTranslucent={true}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.iconWrapper}>{icon}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{text}</Text>
          <SubmitButton _fn={handleRoute}>{submitText}</SubmitButton>
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
    maxHeight: height * 0.8,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding:20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconWrapper: {
    paddingBottom: 8,
    backgroundColor: colors.lightPurple,
    borderRadius: 40,
    padding: 10,
    marginTop: 10,
    marginBottom: 10
  },
  title:{
    fontWeight: '500',
    fontSize: 20,
    fontFamily: 'Lato_400Regular',
    color: colors.black,
  },
  description: {
    fontWeight: '500',
    fontSize: 14,
    fontFamily: 'Lato_400Regular',
    color: colors.gray,
    paddingTop: 8,
    textAlign: 'center'
  },
});

export default Modals;
