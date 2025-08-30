import { View } from 'react-native'
import OnboardingScreen from './index'
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreenLayout () {
    const insets = useSafeAreaInsets();
    return(
        <View style={{ flex: 1,  }}>
            <StatusBar style="dark" translucent backgroundColor="transparent" />
            <OnboardingScreen />
        </View>
    )
}