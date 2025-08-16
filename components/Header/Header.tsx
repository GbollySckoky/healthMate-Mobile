import { ReactElement } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Title } from '../typography/Typography';

export const NavHeader = ({
  title,
  _goBack,
  text,
  backIcon,
  optionIcon,
  _optionFn,
}: {
  title: string;
  text?: string;
  _goBack: () => void;
  _optionFn?: () => void;
  backIcon: ReactElement;
  optionIcon?: ReactElement;
}) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Pressable onPress={_goBack}>
          <Text>{backIcon}</Text>
        </Pressable>
        <View style={{ paddingLeft: 10 }}>
          <Title>{title}</Title>
          {text && (
            <Text
              style={{
                paddingVertical: 2,
                fontFamily: 'LibreFranklin_400Regular',
                fontSize: 12,
                fontWeight: '400',
              }}
            >
              {text}
            </Text>
          )}
        </View>
      </View>
      <Pressable onPress={_optionFn}>
        <Text>{optionIcon}</Text>
      </Pressable>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
    paddingVertical: 20,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    // paddingVertical: 10
  },
});
