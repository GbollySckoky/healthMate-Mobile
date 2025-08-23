import { Link } from 'expo-router'
import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { consultationData } from '@/app/data'
import { ScrollViewHorizontal } from '@/components/scrollView/ScrollViewHorizontal'
import { SubTitle } from '@/components/typography/Typography'
import { colors } from '@/lib/colors'
import AntDesign from '@expo/vector-icons/AntDesign';

const Consultation = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SubTitle>Featured Hospitals</SubTitle>
        <Link href="/(consult)/all-hospitals" >
          <Text style={styles.viewAllText}>
            View All
            <AntDesign name="arrowright" size={15} />
          </Text>
        </Link>
      </View>
      
      <ScrollViewHorizontal>
        {consultationData.map((consult) => {
          const {id, image, hospital, address, text, rating, linkText} = consult;
          return(
            <View key={id} style={styles.card}>
              <View style={styles.imageContainer}>
                <Image 
                  source={image} 
                  alt='Hospital Image' 
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.content}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <View style={styles.hospitalInfo}>
                    <Text style={styles.hospitalName}>{hospital}</Text>
                    <Text style={styles.address}>{address}</Text>
                    <Text style={styles.description}>{text}</Text>
                  </View>
                <Text style={styles.rating}>⭐ {rating}</Text>
                </View>
                <View style={styles.footer}>
                 
                  <Link href={'/(consult)/doctors-hospitals'} style={styles.linkButton}>
                    <Text style={styles.linkText}>{linkText}</Text>
                  </Link>
                </View>
              </View>
            </View>
          )
        })}
      </ScrollViewHorizontal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  viewAllText: {
    color: colors.lightRed,
    fontSize: 12,
    fontWeight: '400',
    flexDirection: 'row',
    alignItems: 'center',

  },
  card: {
    width: 300,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
    padding: 10,
    borderColor: '#D6D7D8',
    borderWidth: 1,
  },
  imageContainer: {
    width: '100%',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10
  },
  content: {
    padding: 6,
    marginTop: 10
  },
  hospitalInfo: {
    marginBottom: 8,
  },
  hospitalName: {
    fontSize: 14,
    fontWeight: 'medium',
    color: '#1E1E1E',
    marginBottom: 4,
    fontFamily: 'Lato_400Regular'
  },
  address: {
    fontSize: 12,
    color: colors.gray,
    fontWeight: 'normal',
    paddingTop: 3,
  },
  description: {
    fontSize: 12,
    color: colors.lightRed,
    lineHeight: 20,
    marginBottom: 12,
    paddingTop: 3,
    fontFamily: 'LibreFranklin_400Regular',
    fontWeight: '400'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: colors.gray,
    fontWeight: '400',
  },
  linkButton: {
    borderColor: colors.broderColor,
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 10,
    width: '100%',
    textAlign: 'center'
  },
  linkText: {
    color: colors.black,
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold'
  },
})

export default Consultation