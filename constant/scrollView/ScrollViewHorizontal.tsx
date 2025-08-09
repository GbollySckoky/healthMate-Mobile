import { ReactNode } from "react";
import {ScrollView, StyleSheet} from 'react-native'


export const ScrollViewHorizontal = ({children}:{children: ReactNode}) => (
    <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.Flex}
        style={style.Flex}>
        {children}
    </ScrollView>
)

export const style = StyleSheet.create({
    Flex: {
      flexDirection: 'row',
      alignContent:'center',
      marginTop: 5,
      marginBottom: 2
    },
})