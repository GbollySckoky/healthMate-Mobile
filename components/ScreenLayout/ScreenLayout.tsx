import { View } from "react-native";
import { ReactNode } from "react";


export const ScreenLayout = ({children}: {children: ReactNode}) => (
    <View style={{backgroundColor: 'white', paddingBottom: 30, marginBottom: 30}}>
        {children}
    </View>
)