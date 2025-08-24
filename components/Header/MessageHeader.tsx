import { ReactElement } from 'react';
import { View, Text, Pressable, StyleSheet, ImageSourcePropType, Image } from 'react-native';
import { Title } from '../typography/Typography';
import { colors } from '@/lib/colors';

export const MessageHeader = ({
  title,
  _goBack,
  text,
  backIcon,
  image,
  alt,
  status
}: {
  title: string;
  text?: string;
  _goBack: () => void;
  backIcon: ReactElement;
  image: ImageSourcePropType,
  alt: string, 
  status: string
}) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between',flex: 1 }}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between',}}>
            <Pressable onPress={_goBack}>
            <Text>{backIcon}</Text>
            </Pressable>
            <View style={{ paddingLeft: 10 , flexDirection: 'row',}}>
                <Image source={image} alt={alt} style={{width: 40, height: 40, borderRadius: 30}} />
                <View style={{ paddingLeft: 10, }}>
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
        </View>
        <Text 
            style={{
            backgroundColor: colors.lightGreen, 
            fontSize: 12,
            fontWeight: '500',
            color: colors.green,
            fontFamily: 'Inter_500Medium',
            padding: 7,
            borderRadius: 30}}>
            {status}
        </Text>
      </View>
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
