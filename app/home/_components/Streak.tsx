import {
  SubTitle,
} from '@/components/typography/Typography';
import {
  View,
  StyleSheet,
  Text,
  Image
} from 'react-native';

const Streak = () => {
  
  const profile = require('../../../assets/images/Group 19153.png')
  return (
    <View style={style.SubCard}>
      <SubTitle>3 days Streak!</SubTitle>
      <SubTitle>Consistency is key – you're doing great!</SubTitle>
      <Text style={style.CardTitle}>Every log brings you closer to better health.</Text>
      <Image 
        source={profile}
        alt="Profile Image"
        style={style.backgroundImage}
        resizeMode="contain"
      />
    </View>
  );
};

export default Streak;

export const style = StyleSheet.create({
  SubCard: {
    padding: 15,
    borderColor: '#BAAEED',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#F4ECFF',
    marginRight: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginTop: 15,
    position: 'relative'
  },
  backgroundImage: {
    position: 'absolute',
    right: 0,
    width: 100,
    height: 100,
  },
  CardTitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#414651',
    fontStyle: 'normal',
    fontWeight: '400',
    marginTop: 3
  },
});