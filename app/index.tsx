import { Link } from 'expo-router';
import { View} from 'react-native';
// import '../global.css'

export default function HomeScreen() {
  return (
    <View>
      <View className="bg-red-900">
        <Link href="/(tabs)/home">Homes</Link>
      </View>
      {/* </ScrollView> */}
    </View>
  );
}
