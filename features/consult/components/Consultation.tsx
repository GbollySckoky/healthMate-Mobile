import { Link } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { ScrollViewHorizontal } from '@/components/scrollView/ScrollViewHorizontal';
import { SubTitle } from '@/components/typography/Typography';
import { colors } from '@/lib/colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import useToggle from '@/hooks/useToggle';
import Feather from '@expo/vector-icons/Feather';
import { ROUTES } from '@/lib/routes';
import {
  GetHospital,
  GetHospitalsResponse,
} from '@/lib/interface/get-hospitals-interface';
import { consultationData } from '@/lib/data';

type ConsultationProps = {
  data: GetHospitalsResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  searchQuery?: string;
};

const defaultHospitalImage = consultationData[0]?.image;

const getHospitalImageSource = (profile?: string | null) => {
  return profile ? { uri: profile } : defaultHospitalImage;
};

const Consultation = ({
  data,
  isLoading,
  isError,
  error,
  searchQuery,
}: ConsultationProps) => {
  const { isToggle, handleToggle } = useToggle();
  const hospitals = data?.data ?? [];

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError as unknown) {
    return (
      <Text className="h-full flex items-center justify-center text-sm text-red-500">
        {(error as Error).message}
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SubTitle>Featured Hospitals</SubTitle>
        <Link href={ROUTES.allAppointments}>
          <Text style={styles.viewAllText}>
            View All
            <AntDesign name="arrow-right" size={15} />
          </Text>
        </Link>
      </View>

      {hospitals.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {searchQuery ? 'No hospitals found' : 'No hospitals available'}
          </Text>
        </View>
      ) : (
        <ScrollViewHorizontal>
          {hospitals.map((hospital: GetHospital) => {
            const { id, hospitalName, email, phoneNumber, profile } = hospital;
            const toggleId = String(id);

            return (
              <View key={id} style={styles.card}>
                <View style={styles.imageContainer}>
                  <Image
                    source={getHospitalImageSource(profile)}
                    alt="Hospital Image"
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <Pressable
                    style={styles.love}
                    onPress={() => handleToggle(toggleId)}
                  >
                    {isToggle === toggleId ? (
                      <AntDesign name="heart" size={24} color="#FF6760" />
                    ) : (
                      <Feather name="heart" size={24} color="black" />
                    )}
                  </Pressable>
                </View>
                <View style={styles.content}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View style={styles.hospitalInfo}>
                      <Text style={styles.hospitalName}>
                        {hospitalName || '-'}
                      </Text>
                      <Text style={styles.address}>
                        {email || 'Email unavailable'}
                      </Text>
                      <Text style={styles.description}>
                        {phoneNumber || 'Phone unavailable'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.footer}>
                    <Link
                      href={{
                        pathname: '/consult-screen/[id]',
                        params: {
                          id: String(id),
                          hospitalName: hospitalName || 'Hospital',
                        },
                      }}
                      style={styles.linkButton}
                    >
                      <Text style={styles.linkText}>View Doctors</Text>
                    </Link>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollViewHorizontal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
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
    padding: 10,
    borderColor: '#F2F2F2',
    borderWidth: 1,
  },
  imageContainer: {
    width: '100%',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  content: {
    padding: 6,
    marginTop: 10,
  },
  hospitalInfo: {
    marginBottom: 8,
  },
  hospitalName: {
    fontSize: 14,
    fontWeight: 'medium',
    color: '#1E1E1E',
    marginBottom: 4,
    fontFamily: 'Lato_400Regular',
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
    fontWeight: '400',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkButton: {
    borderColor: '#f2f2f2',
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 10,
    width: '100%',
    textAlign: 'center',
  },
  linkText: {
    color: colors.black,
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  love: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#E5EBED',
    padding: 5,
    borderRadius: 40,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  emptyText: {
    color: '#414651',
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
  },
});

export default Consultation;
