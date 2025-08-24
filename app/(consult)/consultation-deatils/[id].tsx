import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import { Wrapper, SubTitle } from '@/components/typography/Typography';
import { NavHeader } from '@/components/Header/Header'
import { useRouter } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import { Image, View, Text, StyleSheet } from 'react-native';
import { colors } from '@/lib/colors';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import About from './About';



const ConsultationDetails = () => {
  const router = useRouter()
  const image1 = require('../../../assets/images/adhy-savala-zbpgmGe27p8-unsplash (1).jpg')
  const profile = require('../../../assets/images/Ellipse 165.png')
  
  return (
    <ScreenLayout>
      <NavHeader
        title="Doctor's Profile"
        _goBack={() => router.back()}
        backIcon={<Entypo name="chevron-small-left" size={24} color="black" />}
      />
      <ScreenOverFlowLayout>
        <Wrapper>
          <View>
            <View style={styles.imageContainer}>
              <Image 
                source={image1} 
                style={styles.image} 
                accessibilityLabel="Doctor's background image" 
              />
              <Image 
                source={profile} 
                style={styles.profileImage}
                accessibilityLabel="Dr James Uche profile picture" 
              />
            </View>
            <View>
              <View style={styles.flexContainer}>
                <View>
                  <SubTitle>Dr James Uche</SubTitle>
                  <Text style={styles.specialtyText}>General Practitioner</Text>                      
                  <Text style={styles.hospitalText}>
                  <EvilIcons name="location" size={13} style={{paddingRight:10}} />
                    Lagos Health Hospital
                    </Text>
                </View>
                <Text style={styles.rating}>⭐ 4.2(38)</Text>
              </View>
            </View>
          </View>
          <About />
        </Wrapper>
      </ScreenOverFlowLayout>
    </ScreenLayout>
  )
}

export default ConsultationDetails

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 40
  },
  hospitalText: {
    fontFamily: 'Libre-Franklin',
    fontSize: 12,
    color: colors.gray,
    fontStyle: 'normal',
    fontWeight: '400',
    paddingTop: 4
  },
  specialtyText: {
    fontFamily: 'Libre-Franklin',
    fontSize: 12,
    color: colors.lightRed,
    fontStyle: 'normal',
    fontWeight: '400',
    paddingTop: 4
  },
  rating: {
    fontSize: 12,
    color: colors.gray,
    fontWeight: '400',
  },
  imageContainer: {
    width: '100%',
    height: 180,
    position: 'relative'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10
  },
  profileImage: {
    width: 80, 
    height: 80, 
    borderRadius: 30, 
    position: 'absolute',
    bottom: -30,
    left: 25, 
  }
})