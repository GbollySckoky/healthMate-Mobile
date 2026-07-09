import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ReactNode } from 'react';
import Entypo from '@expo/vector-icons/Entypo';

export const Button = ({
  children,
  _fn,
}: {
  children: ReactNode;
  _fn: () => void;
}) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.fixedButton} onPress={_fn}>
      <Entypo name="plus" size={20} color="white" style={{ marginRight: 5 }} />
      <Text style={styles.btnText}>{children}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'box-none',
  },
  fixedButton: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    backgroundColor: '#DD2590',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: 200,
  },
  btnText: {
    color: 'white',
    fontWeight: '600',
    fontFamily: 'Inter',
    fontSize: 14,
  },
});
