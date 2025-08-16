import React, { ReactElement } from 'react';
import { View, Text, StyleSheet, Dimensions, Modal } from 'react-native';
import {
  CardAmount,
  SubmitButton,
  Wrapper,
} from '@/components/typography/Typography';
import { colors } from '@/lib/colors';

const { height } = Dimensions.get('window');

interface ModalType {
  icon: ReactElement;
  title: string;
  text: string;
  isOpen: boolean;
  _fn: () => void;
}

const Modals = ({ icon, title, text, isOpen, _fn }: ModalType) => {
  if (!isOpen) return null;
  return (
    <Modal>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.iconWrapper}>{icon}</Text>
          <CardAmount>{title}</CardAmount>
          <Text style={styles.description}>{text}</Text>
          <SubmitButton _fn={_fn}>Back to home</SubmitButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
  },
  iconWrapper: {
    paddingBottom: 8,
    backgroundColor: colors.lightPurple,
    borderRadius: 40,
    padding: 10,
  },
  description: {
    fontWeight: '400',
    fontSize: 16,
    fontFamily: 'LibreFranklin_400Regular',
    color: colors.gray,
    paddingTop: 8,
  },
});

export default Modals;
