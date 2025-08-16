import { router } from 'expo-router';
import React, {ReactElement} from 'react'
import { View, Text, StyleSheet, Dimensions, Modal, Pressable } from 'react-native';


const { width, height } = Dimensions.get('window');

interface optionsType {
    name: string;
    url: string 
}
interface ModalType {
    icon: ReactElement;
    isOpen: boolean;
    closeModal: () => void;
    options: optionsType[]
}

const ProfileModal = ({ icon, isOpen, closeModal, options }: ModalType) => {
    if (!isOpen) return null;

    const handleRoute = (route: string) => {
        router.push(route as any)
        closeModal()
    }
    return (
      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
        statusBarTranslucent={true}>
        <Pressable onPress={closeModal} style={styles.overlay}>
          <View style={styles.container}>
            {options.map((option, index) => (
                <View style={styles.optionRow} key={index}> 
                    {option.name === 'Logout' && <Text style={styles.logoutIcon}>{icon}</Text>}  
                    <Pressable onPress={() => handleRoute(option.url)}>
                        <Text style={[
                        styles.optionText,
                        { color: option.name === 'Logout' ? '#FD6868' : '#414651' }
                        ]}>
                        {option.name}
                        </Text>
                    </Pressable>   
                </View>
            ))}
          </View>
        </Pressable>
      </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      paddingTop: 110,
      paddingRight: 10,
    },
    container: {
      backgroundColor: '#ffffff',
      borderRadius: 10,
      minWidth: 150,
      maxWidth: 250,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      padding: 15,
    },
    optionRow: {
      flexDirection: 'row', 
      alignItems: 'center',
      paddingVertical: 4,
    },
    logoutIcon: {
      color: '#FD6868',
      marginRight: 5,
    },
    optionText: {
      fontSize: 12,
      paddingVertical: 4,
    },
});

export default ProfileModal