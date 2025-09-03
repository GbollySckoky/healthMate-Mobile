import { View } from 'react-native'
import OnboardingScreen from './index'
import { StatusBar } from 'expo-status-bar';


export default function HomeScreenLayout () {
    
    return(
        <View style={{  flex: 1}}>
            <StatusBar style="dark" translucent backgroundColor="transparent" />
            <OnboardingScreen />
        </View>
    )
}