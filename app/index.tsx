import { Link } from 'expo-router';
import { View, Dimensions, StyleSheet, ScrollView } from 'react-native';
// import '../global.css'

export default function HomeScreen() {
 
  return (
      <View style={styles.container} className='bg-red-900'>
  
          <View>
        <Link href='/(tabs)/home' className='bg-red-900'>
        Homes
        </Link>
       
        </View>
          {/* </ScrollView> */}
     
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
