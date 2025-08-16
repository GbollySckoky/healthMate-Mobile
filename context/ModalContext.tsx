import React, { ReactNode, createContext, useState, useContext } from 'react';
import {
  Modal,
  Pressable,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';

const { height } = Dimensions.get('window');

interface ModalContextType {
  openModal: (
    content: ReactNode,
    options?: {
      title?: string;
      description?: string;
      buttonName?: string;
      onClose?: () => void;
      animationType?: 'slide' | 'fade' | 'none';
      // btnText?: string
    }
  ) => void;
  closeModal: () => void;
}

// Create the context
const ModalContext = createContext<ModalContextType>({
  openModal: () => {},
  closeModal: () => {},
});

// Custom hook to use the modal
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [modalConfig, setModalConfig] = useState<{
    title?: string;
    description?: string;
    buttonName?: string;
    onClose?: () => void;
    animationType?: 'slide' | 'fade' | 'none';
    // btnText?: string
  }>({});

  const openModal = (
    content: ReactNode,

    options: {
      title?: string;
      description?: string;
      buttonName?: string;
      onClose?: () => void;
      animationType?: 'slide' | 'fade' | 'none';
    } = {}
  ) => {
    setModalContent(content);
    setModalConfig({ animationType: 'fade', ...options });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
    modalConfig.onClose?.();
    setModalConfig({});
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      <Modal
        visible={isOpen}
        transparent={true}
        animationType={modalConfig.animationType || 'fade'}
        onRequestClose={closeModal}
        statusBarTranslucent={true}
      >
        {/* Backdrop */}
        <Pressable style={styles.backdrop} onPress={closeModal}>
          <StatusBar
            backgroundColor="rgba(0,0,0,0.5)"
            barStyle="light-content"
          />

          {/* Modal Container */}
          <Pressable
            style={styles.modalContainer}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {(modalConfig.title || modalConfig.description) && (
              <View style={styles.header}>
                <View style={styles.headerContent}>
                  {modalConfig.title && (
                    <Text style={styles.title}>{modalConfig.title}</Text>
                  )}

                  <Pressable style={styles.closeButton} onPress={closeModal}>
                    <Text style={styles.closeButtonText}>✕</Text>
                  </Pressable>
                </View>

                {modalConfig.description && (
                  <Text style={styles.description}>
                    {modalConfig.description}
                  </Text>
                )}
              </View>
            )}

            {/* Content */}
            {modalContent && (
              <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                bounces={false}
              >
                {modalContent}
              </ScrollView>
            )}

            {/* Btn close */}
            {/* {modalConfig.btnText &&(
              <Pressable style={styles.closeBtn} onPress={closeModal}>
                <Text style={styles.closeBtnText}>{modalConfig.btnText}</Text>
              </Pressable>
            )} */}
          </Pressable>
        </Pressable>
      </Modal>
    </ModalContext.Provider>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#414651',
    flex: 1,
    marginRight: 16,
    fontFamily: 'Libre-Franklin',
    // fontStyle: ''
  },
  closeButton: {
    width: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  closeBtn: {
    width: '95%',
    borderRadius: 10,
    backgroundColor: '#C11574',
    padding: 13,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    // marginHorizontal: 10
  },
  closeBtnText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
    lineHeight: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    maxHeight: height * 0.6,
  },
});
