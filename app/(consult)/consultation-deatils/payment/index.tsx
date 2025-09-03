import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import { Wrapper, SubTitle, Card } from '@/components/typography/Typography';
import { NavHeader } from '@/components/Header/Header'
import { useRouter } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import { Text, View } from 'react-native';
import { Image , StyleSheet, TouchableOpacity} from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { colors } from '@/lib/colors';
import Summary from './_components/summary';
import SafeArea from '@/components/safeAreaView/SafeAreaView';

const PaymentPage = () => {
    const router = useRouter()
    const profile = require('../../../../assets/images/Ellipse 165.png')
  return (
    <SafeArea>
      <ScreenLayout>
        <NavHeader
          title="Payment"
          _goBack={() => router.back()}
          backIcon={<Entypo name="chevron-small-left" size={24} color="black" />}
        />
        <ScreenOverFlowLayout>
        <Wrapper>
          <Card>
              <Text style={{fontSize: 16, fontWeight: '600', fontFamily: 'LibreFranklin_600SemiBold'}}>
                Booking Summary</Text>
              <View style={style.Card}>
              <View style={style.Flex}>
                  <View style={{ width: 50 }}>
                      <Image
                      style={style.image}
                      source={profile}
                      />
                  </View>
                  <View style={style.Flexs}>
                      <View style={{ marginLeft: 5 }}>
                          <SubTitle>Dr James Uche</SubTitle>
                          <Text style={style.Text}>General Practitioner</Text>                      
                          <Text style={style.smallText}>
                            <EvilIcons name="location" size={13} style={{paddingRight:10}} />
                            Lagos Health Hospital
                          </Text>
                      </View>
                      <Text style={style.rating}>⭐ 4.2(38)</Text>
                  </View>
              </View>
            </View>
            <Summary />
          </Card>
          <TouchableOpacity 
                  style={{
                      backgroundColor: '#DD2590',
                      paddingVertical: 12,
                      borderRadius: 10,
                      marginTop: 30
                  }}
                  activeOpacity={0.8}
                  onPress={() => router.push(`/(consult)/consultation-deatils/payment`)}
              >
                  <Text style={{
                      color: 'white',
                      textAlign: 'center',
                      fontWeight: '600',
                      fontSize: 16
                  }}>
                      Pay Now
                  </Text>
              </TouchableOpacity>
        </Wrapper>
        </ScreenOverFlowLayout>
      </ScreenLayout>
    </SafeArea>
  )
}

export default PaymentPage

const style = StyleSheet.create({
    Card: {
      padding: 15,
      borderColor: '#F2F2F2',
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: '#fff',
      marginBottom: 20,
      marginTop: 15   
    },
  Flex: {
      flexDirection: 'row',
      alignContent: 'center',
      marginTop: 5,
      marginBottom: 2,
    },
    image: {
      width: 50,
      height: 50,
      backgroundColor: '#0553',
      borderRadius: 100,
    },
    Flexs: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-between',
    //   alignContent: 'center',
    },
    smallText: {
      fontFamily: 'Libre-Franklin',
      fontSize: 12,
      color: colors.gray,
      fontStyle: 'normal',
      fontWeight: 400,
      paddingTop: 4
  },
  Text: {
      fontFamily: 'Libre-Franklin',
      fontSize: 12,
      color: colors.purple,
      fontStyle: 'normal',
      fontWeight: 400,
      paddingTop: 4
  },
  rating: {
      fontSize: 12,
      color: colors.gray,
      fontWeight: '400',
  },
  })