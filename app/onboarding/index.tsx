// OnboardingScreen (index.tsx)
import React, {useCallback} from 'react'
import { Dimensions, FlatList, Image, View, Text, StyleSheet } from 'react-native'
import { slidesData } from '@/app/data'
import { colors } from '@/lib/colors'


const { width, height } = Dimensions.get('screen') // Changed to 'screen' to get full device dimensions

// Define the type for slide data
interface SlideItem {
  image: any; // or ImageSourcePropType for better typing
  title: string;
  subTitle: string;
  id: number
}

// useFocusEffect(
//   useCallback(() => {
//     // Set status bar for this screen
//     StatusBar.setStatusBarStyle('dark-content', true);
//     if (Platform.OS === 'android') {
//       StatusBar.setBackgroundColor('transparent', true);
//       StatusBar.setTranslucent(true);
//     }
//   }, [])
// );

const OnboardingScreen = () => {
  const renderSlide = ({ item }: { item: SlideItem }) => <Slide item={item} />

  return (
    <View style={styles.container}>
      <FlatList 
        data={slidesData}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        renderItem={renderSlide}
        keyExtractor={(item, index) => index.toString()}
        style={{ flex: 1 }}
      />
    </View>
  )
}

export default OnboardingScreen

const Slide = ({ item }: { item: SlideItem }) => {
  return (
    <View style={styles.slideContainer}>
      <View style={styles.imageContainer}>
        <Image 
          source={item.image} 
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.subTitle}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  slideContainer: {
    width: width,
    height: height,
    justifyContent: 'flex-end',
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.7, 
    zIndex: 1,
    backgroundColor: 'red'
  },
  image: {
    width: width,
    // height: '100%',
    resizeMode: 'cover', // Changed to cover for better fullscreen effect
  },
  textContainer: {
    // backgroundColor: 'white',
    // paddingHorizontal: 20,
    // paddingVertical: 30,
    // borderTopLeftRadius: 25,
    // borderTopRightRadius: 25,
    // zIndex: 2,
    // minHeight: height * 0.3,
    justifyContent: 'center',
  },
  title: {
    color: colors.black,
    fontWeight: '600', 
    fontSize: 23,
    fontFamily: 'Lato_700Bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  text: {
    fontFamily: 'Lato_400Regular',
    color: colors.gray,
    fontWeight: 'normal',
    fontSize: 16,
    textAlign: 'center',
    // lineHeight: 22,
  }
})