import React, {
  ReactNode,
  createContext,
  useState,
  useContext,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import {
  Modal,
  Pressable,
  Text,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';

/**
 * PREREQUISITES (not covered by this file):
 * 1. yarn add @gorhom/bottom-sheet react-native-reanimated react-native-gesture-handler react-native-safe-area-context
 * 2. Wrap your app ROOT (App.tsx / _layout.tsx, above navigation) in:
 *      <GestureHandlerRootView style={{ flex: 1 }}>
 *        <SafeAreaProvider>
 *          ...your app...
 *        </SafeAreaProvider>
 *      </GestureHandlerRootView>
 * 3. react-native-reanimated needs its babel plugin — confirm
 *    'react-native-reanimated/plugin' is last in your babel.config.js plugins array.
 */

type Presentation = 'sheet' | 'center';

interface ModalOptions {
  title?: string;
  description?: string;
  onClose?: () => void;
  presentation?: Presentation; // 'sheet' (default) = draggable bottom sheet, 'center' = floating dialog
  dismissible?: boolean; // tap backdrop / swipe down to close
  snapPoints?: (string | number)[]; // sheet only — defaults to dynamic sizing
}

interface ModalContextType {
  openModal: (content: ReactNode, options?: ModalOptions) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  openModal: () => {},
  closeModal: () => {},
});

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const insets = useSafeAreaInsets();
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  const sheetRef = useRef<BottomSheetModal>(null);
  const [sheetContent, setSheetContent] = useState<ReactNode>(null);
  const [sheetConfig, setSheetConfig] = useState<ModalOptions>({});

  const [centerVisible, setCenterVisible] = useState(false);
  const [centerContent, setCenterContent] = useState<ReactNode>(null);
  const [centerConfig, setCenterConfig] = useState<ModalOptions>({});

  const openModal = useCallback((content: ReactNode, options: ModalOptions = {}) => {
    const presentation = options.presentation ?? 'sheet';
    const merged: ModalOptions = { dismissible: true, ...options };

    if (presentation === 'center') {
      setCenterContent(content);
      setCenterConfig(merged);
      setCenterVisible(true);
    } else {
      setSheetContent(content);
      setSheetConfig(merged);
      // present() runs after state commits so the sheet has content to size against
      requestAnimationFrame(() => sheetRef.current?.present());
    }
  }, []);

  const closeModal = useCallback(() => {
    // closes whichever is open; harmless no-op on the other
    sheetRef.current?.dismiss();
    setCenterVisible(false);
  }, []);

  const handleSheetDismiss = useCallback(() => {
    sheetConfig.onClose?.();
    setSheetContent(null);
    setSheetConfig({});
  }, [sheetConfig]);

  const handleCenterClose = useCallback(() => {
    setCenterVisible(false);
    centerConfig.onClose?.();
    setCenterContent(null);
    setCenterConfig({});
  }, [centerConfig]);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior={sheetConfig.dismissible === false ? 'none' : 'close'}
      />
    ),
    [sheetConfig.dismissible]
  );

  const snapPoints = useMemo(() => sheetConfig.snapPoints, [sheetConfig.snapPoints]);
  const maxCardWidth = 440;
  const keyboardBottomPadding = Math.max(insets.bottom, 100) + 24;

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      <BottomSheetModalProvider>
        {children}

        {/* ---------- Bottom sheet (default) ---------- */}
        <BottomSheetModal
          ref={sheetRef}
          index={0}
          snapPoints={snapPoints}
          enableDynamicSizing={!snapPoints}
          enablePanDownToClose={sheetConfig.dismissible !== false}
          onDismiss={handleSheetDismiss}
          backdropComponent={renderBackdrop}
          topInset={insets.top}
          bottomInset={insets.bottom}
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"
          android_keyboardInputMode="adjustResize"
          handleIndicatorStyle={styles.grabber}
          backgroundStyle={styles.sheetBackground}
          style={shadow}
        >
          {(sheetConfig.title || sheetConfig.description) && (
            <View style={styles.header}>
              <View style={styles.headerContent}>
                {sheetConfig.title ? (
                  <Text style={styles.title} numberOfLines={2}>
                    {sheetConfig.title}
                  </Text>
                ) : (
                  <View style={{ flex: 1 }} />
                )}
                <Pressable
                  style={({ pressed }) => [styles.closeButton, pressed && styles.closeButtonPressed]}
                  onPress={() => sheetRef.current?.dismiss()}
                  hitSlop={10}
                  accessibilityRole="button"
                  accessibilityLabel="Close modal"
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </Pressable>
              </View>
              {sheetConfig.description && (
                <Text style={styles.description}>{sheetConfig.description}</Text>
              )}
            </View>
          )}

          <BottomSheetScrollView
            style={styles.content}
            contentContainerStyle={[
              styles.contentInner,
              { paddingBottom: keyboardBottomPadding },
            ]}
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
          >
            {sheetContent}
          </BottomSheetScrollView>
        </BottomSheetModal>

        {/* ---------- Centered dialog (opt-in via presentation: 'center') ---------- */}
        {/* <Modal
          visible={centerVisible}
          transparent
          animationType="fade"
          onRequestClose={handleCenterClose}
          statusBarTranslucent
        >
          <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle="light-content" />
          <Pressable
            style={styles.centerBackdrop}
            onPress={() => centerConfig.dismissible !== false && handleCenterClose()}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top : 0}
              style={styles.centerKeyboardView}
            >
              <Pressable
                style={[
                  styles.centerContainer,
                  {
                    maxWidth: Math.min(maxCardWidth, windowWidth - 40),
                    maxHeight: windowHeight * 0.8,
                  },
                  shadow,
                ]}
                onPress={(e) => e.stopPropagation()}
              >
              {(centerConfig.title || centerConfig.description) && (
                <View style={styles.header}>
                  <View style={styles.headerContent}>
                    {centerConfig.title ? (
                      <Text style={styles.title} numberOfLines={2}>
                        {centerConfig.title}
                      </Text>
                    ) : (
                      <View style={{ flex: 1 }} />
                    )}
                    <Pressable
                      style={({ pressed }) => [styles.closeButton, pressed && styles.closeButtonPressed]}
                      onPress={handleCenterClose}
                      hitSlop={10}
                      accessibilityRole="button"
                      accessibilityLabel="Close modal"
                    >
                      <Text style={styles.closeButtonText}>✕</Text>
                    </Pressable>
                  </View>
                  {centerConfig.description && (
                    <Text style={styles.description}>{centerConfig.description}</Text>
                  )}
                </View>
              )}

              {centerContent && (
                <ScrollView
                  style={styles.content}
                  contentContainerStyle={[
                    styles.contentInner,
                    { paddingBottom: keyboardBottomPadding },
                  ]}
                  showsVerticalScrollIndicator={false}
                  bounces={false}
                  keyboardDismissMode="interactive"
                  keyboardShouldPersistTaps="handled"
                >
                  {centerContent}
                </ScrollView>
              )}
              </Pressable>
            </KeyboardAvoidingView>
          </Pressable>
        </Modal> */}
      </BottomSheetModalProvider>
    </ModalContext.Provider>
  );
};

const shadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  android: {
    elevation: 8,
  },
  default: {},
}) as object;

const styles = StyleSheet.create({
  sheetBackground: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  grabber: {
    backgroundColor: '#d9d9d9',
    width: 40,
    height: 4,
  },
  centerBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  centerKeyboardView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    width: '100%',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
    marginRight: 16,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonPressed: {
    backgroundColor: '#e8e8e8',
  },
  closeButtonText: {
    fontSize: 15,
    color: '#666666',
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginTop: 6,
    lineHeight: 20,
  },
  content: {
    paddingHorizontal: 20,
  },
  contentInner: {
    paddingVertical: 16,
  },
});
