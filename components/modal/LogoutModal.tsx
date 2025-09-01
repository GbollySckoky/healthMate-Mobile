import React, { ReactElement } from 'react';
import { View, Text, StyleSheet, Dimensions, Modal, TouchableOpacity } from 'react-native';
import { SubmitButton } from '@/components/typography/Typography';
import { colors } from '@/lib/colors';
import { useRouter } from 'expo-router';
import { ROUTES } from '@/lib/routes';

const { height } = Dimensions.get('window');

interface ModalType {
  icon: ReactElement;
  title: string;
  text: string;
  isOpen: boolean;
  closeModal: () => void;
}

const LogoutModal = ({ icon, title, text, isOpen, closeModal }: ModalType) => {
  if (!isOpen) return null;
  const handleRoute = () => {
    closeModal()
    router.push(ROUTES.login)
  }
  const router = useRouter()
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
          {/* <SubmitButton _fn={handleRoute}>{submitText}</SubmitButton> */}
          <View style={styles.bottomBtnContainer}>
            <TouchableOpacity style={styles.outlineBtn} onPress={closeModal}>
                <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.joinBtn} onPress={handleRoute}>
                <Text style={styles.buttonText}>Log Out</Text>
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
    padding: 10,
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
    backgroundColor: '#FEF3F2',
    borderRadius: 40,
    padding: 10,
    marginTop: 10,
    marginBottom: 10
  },
  title:{
    fontWeight: '500',
    fontSize: 20,
    fontFamily: 'Inter_500Medium',
    color: colors.black,
    textAlign: 'center'
  },
  description: {
    fontWeight: '500',
    fontSize: 14,
    fontFamily: 'Lato_400Regular',
    color: colors.gray,
    paddingTop: 8,
    textAlign: 'center'
  },
  joinBtn: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#D92D20',
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
bottomBtnContainer: {
    marginTop: 20,
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16, 
    gap: 15,
    // backgroundColor: 'white', 
},
});

export default LogoutModal;
