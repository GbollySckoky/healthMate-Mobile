import SafeArea from '@/components/safeAreaView/SafeAreaView';
import { Link } from 'expo-router';
import { View} from 'react-native';
// import '../global.css'

export default function HomeScreen() {
  return (
    <SafeArea>
      <View style={{backgroundColor: 'red', flex: 1}}>
        <Link href="/(tabs)/home">Homes</Link>
        <Link href="/onboarding">Homs</Link>
        <Link href="/onboarding">Homs</Link>
        <Link href="/onboarding">Homs</Link>
        <Link href="/onboarding">Homs</Link>
        <Link href="/(tabs)/home">Homes</Link>
        <Link href="/(tabs)/home">Homes</Link>
        <Link href="/(tabs)/home">Homes</Link>
      </View>
      {/* </ScrollView> */}
    </SafeArea>
  );
}
