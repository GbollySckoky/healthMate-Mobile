import React from 'react'
import { View, Text } from 'react-native'
import { Title} from '@/components/typography/Typography';


interface navType{
    title: string;
    text?: string;
}
const Nav = ({title, text}: navType) => {
  return (
    <View
          style={{
            borderBottomWidth: 1,
            borderColor: '#F2F2F2',
            paddingTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 18
          }}
        >
          <View>
            <Title>{title}</Title>
            <Text
              style={{
                fontFamily: 'LibreFranklin_400Regular',
                fontWeight: '400',
                fontSize: 12,
                
              }}
            >
             {text}
            </Text>
          </View>
        </View>
  )
}

export default Nav