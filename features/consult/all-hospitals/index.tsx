'use client';
import { NavHeader } from '@/components/Header/Header';
import React, { useEffect, useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import { Wrapper } from '@/components/typography/Typography';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import SearchInput from '@/components/Input/SearchInput';
import { colors } from '@/lib/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { consultationData } from '@/lib/data';
import { Link } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import useToggle from '@/hooks/useToggle';
import SafeArea from '@/components/safeAreaView/SafeAreaView';
import { useQuery } from '@tanstack/react-query';
import { patientService } from '@/service/patientService';
import { GetHospital } from '@/lib/interface/get-hospitals-interface';

const defaultHospitalImage = consultationData[0]?.image;

const getHospitalImageSource = (profile?: string | null) => {
  return profile ? { uri: profile } : defaultHospitalImage;
};

const AllHospitalsPage = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const [searchDebounceQuery, setSearchDebounceQuery] = useState('');
  const { isToggle, handleToggle } = useToggle();
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchDebounceQuery(searchInput);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getAllHospitals', page, limit, searchDebounceQuery],
    queryFn: () =>
      patientService.getHospitals(page, limit, searchDebounceQuery),
  });

  const hospitals = data?.data ?? [];
  const meta = data?.meta;
  const canGoPrevious = meta ? meta.page > 1 : page > 1;
  const canGoNext = meta ? meta.page < meta.totalPages : false;

  return (
    <SafeArea>
      <ScreenLayout>
        <NavHeader
          title="All Hospitals"
          _goBack={() => router.back()}
          backIcon={
            <Entypo name="chevron-small-left" size={24} color="black" />
          }
        />
        <ScreenOverFlowLayout>
          <Wrapper>
            <View style={styles.searchRow}>
              <SearchInput
                placeholder="Search for a hospital"
                value={searchInput}
                onChangeText={(value) => setSearchInput(value)}
              />
              <Text style={styles.filterButton}>
                <Ionicons name="filter-outline" size={20} color="black" />
              </Text>
            </View>

            <View>
              {isLoading && (
                <View style={styles.stateContainer}>
                  <ActivityIndicator size="large" color="#DD2590" />
                  <Text style={styles.stateText}>Loading hospitals...</Text>
                </View>
              )}

              {isError && (
                <View style={styles.stateContainer}>
                  <Text style={styles.errorText}>
                    {(error as Error).message || 'Unable to load hospitals'}
                  </Text>
                </View>
              )}

              {!isLoading && !isError && hospitals.length === 0 && (
                <View style={styles.stateContainer}>
                  <Text style={styles.stateText}>No hospitals found</Text>
                </View>
              )}

              {!isLoading &&
                !isError &&
                hospitals.map((hospital: GetHospital) => {
                  const {
                    id,
                    hospitalName,
                    email,
                    phoneNumber,
                    profile,
                    dateOfEstablishment,
                  } = hospital;
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
                            <AntDesign
                              name="heart"
                              size={24}
                              color={colors.red}
                            />
                          ) : (
                            <Feather name="heart" size={24} color="black" />
                          )}
                        </Pressable>
                      </View>

                      <View style={styles.content}>
                        <View style={styles.cardHeader}>
                          <View style={styles.hospitalInfo}>
                            <Text style={styles.hospitalName}>
                              {hospitalName || '-'}
                            </Text>
                            <Text style={styles.address}>
                              {email || 'Email unavailable'}
                            </Text>
                            <Text style={styles.address}>
                              {phoneNumber || 'Phone unavailable'}
                            </Text>
                            <Text style={styles.description}>
                              Established {dateOfEstablishment || '-'}
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

              {!isLoading && !isError && meta && (
                <View style={styles.paginationRow}>
                  <TouchableOpacity
                    style={[
                      styles.paginationButton,
                      !canGoPrevious && styles.paginationButtonDisabled,
                    ]}
                    disabled={!canGoPrevious}
                    onPress={() =>
                      setPage((currentPage) => Math.max(currentPage - 1, 1))
                    }
                  >
                    <Text style={styles.paginationText}>Previous</Text>
                  </TouchableOpacity>
                  <Text style={styles.paginationMeta}>
                    Page {meta.page} of {Math.max(meta.totalPages, 1)}
                    {'\n'}
                    {meta.total} hospitals
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.paginationButton,
                      !canGoNext && styles.paginationButtonDisabled,
                    ]}
                    disabled={!canGoNext}
                    onPress={() => setPage((currentPage) => currentPage + 1)}
                  >
                    <Text style={styles.paginationText}>Next</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </Wrapper>
        </ScreenOverFlowLayout>
      </ScreenLayout>
    </SafeArea>
  );
};

export default AllHospitalsPage;

const styles = StyleSheet.create({
  searchRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    borderColor: colors.broderColor,
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 10,
    padding: 9,
  },
  card: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 10,
    borderColor: '#f2f2f2',
    borderWidth: 1,
    marginBottom: 20,
  },
  love: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#E5EBED',
    padding: 5,
    borderRadius: 40,
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
  content: {
    padding: 6,
    marginTop: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hospitalInfo: {
    marginBottom: 8,
  },
  hospitalName: {
    fontSize: 14,
    fontWeight: '500',
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
  stateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  stateText: {
    color: '#414651',
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  errorText: {
    color: '#B42318',
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    textAlign: 'center',
  },
  paginationRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  paginationButton: {
    backgroundColor: '#DD2591',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  paginationButtonDisabled: {
    backgroundColor: '#D6D7DA',
  },
  paginationText: {
    color: '#ffffff',
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
  },
  paginationMeta: {
    color: '#717680',
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    textAlign: 'center',
  },
});
