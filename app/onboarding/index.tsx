
import React, { useRef, useState } from 'react'


import { 
  Dimensions, 
  FlatList, 
  Image, 
  View, 
  Text, 
  StyleSheet, 
  ImageSourcePropType, 
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent
} from 'react-native'
import { slidesData } from '@/lib/data'
import { colors } from '@/lib/colors'
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout'
import { useRouter } from 'expo-router'
import { ROUTES } from '@/lib/routes'


const { width, height } = Dimensions.get('screen')

interface SlideItem {
  image: ImageSourcePropType;
  title: string;
  subTitle: string;
  id: number
}

const OnboardingScreen = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const flatListRef = useRef<FlatList>(null)
  const router = useRouter()
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideWidth = event.nativeEvent.layoutMeasurement.width
    const currentIndex = event.nativeEvent.contentOffset.x / slideWidth
    const roundIndex = Math.round(currentIndex)
    
    if (roundIndex !== currentSlideIndex) {
      setCurrentSlideIndex(roundIndex)
    }
  }

  const goToNextSlide = () => {
    if (currentSlideIndex < slidesData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentSlideIndex + 1,
        animated: true
      })
    }
  }

  const goToPrevSlide = () => {
    if (currentSlideIndex > 0) {
      flatListRef.current?.scrollToIndex({
        index: currentSlideIndex - 1,
        animated: true
      })
    }
  }

  const handleGetStarted = () => {
    console.log('Get Started pressed')
    router.replace(ROUTES.signup) 
  }

  const handleSkip = () => {
    console.log('Skip pressed')
    // router.replace('/(tabs)') // Uncomment when router is available
  }

  return (
    <ScreenOverFlowLayout>
      <View style={styles.container}>
        <FlatList 
          ref={flatListRef}
          data={slidesData}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          renderItem={({ item }: { item: SlideItem }) => <Slide item={item} />}
          keyExtractor={(item, index) => index.toString()}
          onScroll={handleScroll}
          scrollEventThrottle={50}
          bounces={false}
          style={styles.flatList}
        />
        <Footer 
          currentSlideIndex={currentSlideIndex}
          totalSlides={slidesData.length}
          onNext={goToNextSlide}
          onPrev={goToPrevSlide}
          onGetStarted={handleGetStarted}
          onSkip={handleSkip}
        />
      </View>
    </ScreenOverFlowLayout>
  )
}

export default OnboardingScreen

// Slide Component
const Slide = ({ item }: { item: SlideItem }) => {
  return (
    <View style={styles.slideContainer}>
      <Image 
        source={item.image} 
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.subTitle}</Text>
      </View>
    </View>
  )
}

interface FooterProps {
  currentSlideIndex: number
  totalSlides: number
  onNext: () => void
  onPrev: () => void
  onGetStarted: () => void
  onSkip: () => void
}

// Footer Component
const Footer = ({ 
  currentSlideIndex, 
  totalSlides, 
  onNext, 
  onPrev, 
  onGetStarted, 
  onSkip 
}: FooterProps) => {
  const isFirstSlide = currentSlideIndex === 0
  const isLastSlide = currentSlideIndex === totalSlides - 1

  return (
    <View style={styles.footerContainer}>
      {/* Page Indicators */}
      <View style={styles.indicatorsContainer}>
        {Array.from({ length: totalSlides }).map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.indicator, 
              currentSlideIndex === index && styles.activeIndicator
            ]}
          />
        ))}
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        {isFirstSlide ? (
          <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.backButton} onPress={onPrev}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}

        {isLastSlide ? (
          <TouchableOpacity style={styles.getStartedButton} onPress={onGetStarted}>
            <Text style={styles.getStartedButtonText} numberOfLines={1}>Get Started</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.nextButton} onPress={onNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width,
    alignItems: "center",
    justifyContent: "center",
    // flex: 1,
   
  },
  flatList: {
    flex: 1,
  },
  slideContainer: {
    justifyContent: 'flex-end',
  },
  image: {
    width: width,
    resizeMode: 'cover',
  },
  textContainer: {
    // paddingHorizontal: 20,
    paddingVertical: 20,
    // borderTopLeftRadius: 25,
    // borderTopRightRadius: 25,
    // zIndex: 2,
    // minHeight: height * 0.35,
    // justifyContent: 'center',
  },
  title: {
    color: colors.black,
    fontWeight: '600', 
    fontSize: 23,
    fontFamily: 'Lato_700Bold',
    textAlign: 'center',
    // marginBottom: 12,
  },
  text: {
    fontFamily: 'Lato_400Regular',
    color: colors.gray,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '400',
    marginTop: 10
  },

  // Footer Styles
  footerContainer: {
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    paddingHorizontal: 20,
    // paddingVertical: 25,
    // paddingBottom: 35, // Safe area padding
  },
  indicatorsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  indicator: {
    height: 3,
    width: 4,
    backgroundColor: '#FCCEEE' ,
    marginHorizontal: 3,
    borderRadius: 2,
  },
  activeIndicator: {
    backgroundColor: colors.lightRed,
    width: 20,
    height: 5,
    borderRadius: 10
  },

  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
    marginRight: 15
  },
  backButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.broderColor ,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    // minWidth: 80,
    alignItems: 'center',
    width: '50%'
  },
  skipButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    // minWidth: 80,
    alignItems: 'center',
    width: '50%',
    borderWidth: 1,
    borderColor: colors.broderColor ,
  },
  nextButton: {
    backgroundColor: colors.red,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    width: '50%',
    alignItems: 'center',

  },
  getStartedButton: {
    backgroundColor: '#DD2590',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: '50%'
  },

  // Button Texts
  backButtonText: {
    color: colors.black,
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    fontWeight: '600',
  },
  skipButtonText: {
    color: colors.black,
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    fontWeight: '600'
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    fontWeight: '600'
  },
  getStartedButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    fontWeight: '600'
  },
})