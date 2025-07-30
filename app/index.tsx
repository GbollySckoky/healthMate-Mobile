import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import '../global.css'

export default function HomeScreen() {
  return (
      <View style={styles.container} className='bg-red-900'>
      <Text>
        <Link href='/(tabs)/home'>
        Homes
        </Link>
       
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red'
  },
});
