import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import { Wrapper, SubTitle } from '@/components/typography/Typography';
import { NavHeader } from '@/components/Header/Header';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import { Image, View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { colors } from '@/lib/colors';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import About from './About';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import useToggles from '@/hooks/useToggles';
import SafeArea from '@/components/safeAreaView/SafeAreaView';
import { useQuery } from '@tanstack/react-query';
import { patientService } from '@/service/patientService';

const ConsultationDetails = () => {
  const router = useRouter();
  const { toggle, handleToggle } = useToggles();
  const { id } = useLocalSearchParams();

  const image1 = require('@/assets/images/adhy-savala-zbpgmGe27p8-unsplash (1).jpg');
  const profile = require('@/assets/images/Ellipse 165.png');

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['getDoctorById', id],
    queryFn: () => patientService.getDoctorById(String(id)),
    enabled: !!id,
  });

  const consultation = data?.data;

  if (isLoading) {
    return (
      <SafeArea>
        <ScreenLayout>
          <NavHeader
            title="Doctor's Profile"
            _goBack={() => router.back()}
            backIcon={<Entypo name="chevron-small-left" size={24} color="black" />}
          />

          <View style={styles.centerState}>
            <ActivityIndicator size="large" color="#DD2590" />
            <Text style={styles.loadingText}>Loading doctor profile...</Text>
          </View>
        </ScreenLayout>
      </SafeArea>
    );
  }

  if (isError) {
    return (
      <SafeArea>
        <ScreenLayout>
          <NavHeader
            title="Doctor's Profile"
            _goBack={() => router.back()}
            backIcon={<Entypo name="chevron-small-left" size={24} color="black" />}
          />

          <View style={styles.centerState}>
            <Text style={styles.errorText}>Failed to load doctor profile.</Text>

            <Pressable style={styles.retryButton} onPress={() => refetch()}>
              <Text style={styles.retryText}>Try Again</Text>
            </Pressable>
          </View>
        </ScreenLayout>
      </SafeArea>
    );
  }

  return (
    <SafeArea>
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
                  accessibilityLabel="Doctor profile picture"
                />

                <Pressable style={styles.love} onPress={handleToggle}>
                  {toggle ? (
                    <AntDesign name="heart" size={24} color="#FF6760" />
                  ) : (
                    <Feather name="heart" size={24} color="black" />
                  )}
                </Pressable>
              </View>

              <View style={styles.flexContainer}>
                <View style={{ flex: 1 }}>
                  <SubTitle>
                    Dr {consultation?.firstName.charAt(0).toUpperCase() + consultation?.firstName.slice(1) || '-'} {consultation?.lastName.charAt(0).toUpperCase() + consultation?.lastName.slice(1)  || ''}
                  </SubTitle>

                  <Text style={styles.specialtyText}>
                    {consultation?.profile?.specialization || 'General Practitioner'}
                  </Text>

                  <Text style={styles.hospitalText}>
                    <EvilIcons name="location" size={13} />
                    {' '}
                    {consultation?.hospital?.hospitalName || '-'}
                  </Text>
                </View>

                <Text style={styles.rating}>⭐ 4.2(38)</Text>
              </View>
            </View>

            <About consultation={consultation} />
          </Wrapper>
        </ScreenOverFlowLayout>
      </ScreenLayout>
    </SafeArea>
  );
};

export default ConsultationDetails;

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    gap: 10,
  },

  hospitalText: {
    fontFamily: 'LibreFranklin_400Regular',
    fontSize: 12,
    color: colors.gray,
    paddingTop: 4,
  },

  specialtyText: {
    fontFamily: 'LibreFranklin_400Regular',
    fontSize: 12,
    color: colors.lightRed,
    paddingTop: 4,
  },

  rating: {
    fontSize: 12,
    color: colors.gray,
    fontWeight: '400',
  },

  imageContainer: {
    width: '100%',
    height: 180,
    position: 'relative',
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },

  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    bottom: -30,
    left: 25,
  },

  love: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#E5EBED',
    padding: 5,
    borderRadius: 40,
  },

  centerState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: colors.gray,
    fontFamily: 'LibreFranklin_400Regular',
  },

  errorText: {
    fontSize: 14,
    color: colors.lightRed,
    fontFamily: 'LibreFranklin_400Regular',
    textAlign: 'center',
    marginBottom: 16,
  },

  retryButton: {
    backgroundColor: '#DD2590',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  retryText: {
    color: colors.white,
    fontSize: 14,
    fontFamily: 'LibreFranklin_600SemiBold',
  },
});
