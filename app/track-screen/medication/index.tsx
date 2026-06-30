import { NavHeader } from '@/components/Header/Header';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import {
  Card,
  CardAmount,
  CardText,
  DetailsContainer,
  SubTitle,
  Wrapper,
} from '@/components/typography/Typography';
import { router } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';;
import { Button } from '@/components/button/Button';
import MedicationModal from './MedicationModal';
import { useModal } from '@/context/ModalContext';
import SafeArea from '@/components/safeAreaView/SafeAreaView';
import { useQuery } from '@tanstack/react-query';
import { patientService } from '@/service/patientService';


const Medication = () => {
  const { openModal } = useModal();
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['medication'],
    queryFn: () => patientService.getMedication(),
  })
  console.log(data)

  if(isLoading){
    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
    )
  }
  
  if (isError as unknown) {
    return(
       <Text className="h-full flex items-center justify-center text-sm text-red-500">
        {(error as Error).message}
      </Text>
    )
  }
  return (
    <SafeArea>
      <ScreenLayout>
        <NavHeader
          title="Medication Log"
          _goBack={() => router.back()}
          backIcon={<Entypo name="chevron-small-left" size={24} color="black" />}
          text="Tracking your meds ensures better treatment..."
        />
        <ScreenOverFlowLayout>
          <Wrapper>
            <DetailsContainer>
              <MaterialCommunityIcons
                name="pill"
                size={24}
                color="#C11574"
                style={styles.icon}
              />
              <CardText>Today Dose</CardText>
              <CardAmount>2/3 doses</CardAmount>
              <CardText>Recorded on: Jun 22, 09:45</CardText>
              <Text style={styles.colorText}>Taken</Text>
            </DetailsContainer>
            <View style={{ marginBottom: 40 }}>
              <Card>
                <SubTitle>Medication History</SubTitle>
                {data?.data.map((recent: any) => {
                  const { icon, bloodRate, date, status, time } = recent;
                  const isLastItem = recent.id === data?.data?.length - 1;
                  return (
                    <View
                      key={recent.id}
                      style={[
                        styles.enhancedItemContainer,
                        isLastItem && styles.lastItem,
                      ]}
                    >
                      <View style={styles.flex}>
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                          <Text
                            style={{
                              borderColor: '#f2f2f2',
                              borderWidth: 1,
                              padding: 6,
                              borderRadius: 5,
                            }}
                          >
                            <MaterialCommunityIcons name="pill" size={24} color="#C11574" />
                          </Text>
                          <View style={{ paddingLeft: 16 }}>
                            <Text
                              style={{
                                fontWeight: '500',
                                fontSize: 14,
                                color: '#414651',
                                paddingTop: 2,
                                fontFamily: 'Lato_400Regular',
                              }}
                            >
                              {recent.name}
                            </Text>
                            <Text
                              style={{
                                fontWeight: '400',
                                fontSize: 12,
                                color: '#717680',
                                paddingTop: 2,
                                fontFamily: 'Lato_400Regular',
                              }}
                            >
                              {new Date(recent.recordedAt).toLocaleDateString()} {" "} at
                              {new Date(recent.recordedAt).toLocaleTimeString()}
                            </Text>
                          </View>
                        </View>
                        <Text
                          style={{
                            backgroundColor: `${(status === 'Taken' && '#ECFDF3') || (status === 'Missed' && '#FEF3F2')}`,
                            color: `${(status === 'Taken' && '#027A48') || (status === 'Missed' && '#B42318')}`,
                            paddingHorizontal: 15,
                            paddingVertical: 7,
                            borderRadius: 30,
                            fontFamily: 'Inter_500Medium',
                          }}
                        >
                          {status}
                        </Text>
                        <Text
                          style={{
                            backgroundColor: `${(status === 'Taken' && '#ECFDF3') || (status === 'Missed' && '#FEF3F2')}`,
                            color: `${(status === 'Taken' && '#027A48') || (status === 'Missed' && '#B42318')}`,
                            paddingHorizontal: 15,
                            paddingVertical: 7,
                            borderRadius: 30,
                            fontFamily: 'Inter_500Medium',
                          }}
                        >
                          {recent.dosage}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </Card>
            </View>
          </Wrapper>
        </ScreenOverFlowLayout>
        <Button
          _fn={() =>
            openModal(<MedicationModal />, {
              title: 'Log Medication',
              description: '',
              onClose: () => {},
              // btnText: 'Save Reading'
            })
          }
        >
          Log New Medication
        </Button>
      </ScreenLayout>
    </SafeArea>
  );
};

export default Medication;

const styles = StyleSheet.create({
  icon: {
    backgroundColor: '#FDF2FA',
    paddingHorizontal: 15,
    paddingVertical: 13,
    borderRadius: 100,
    marginBottom: 10,
  },
  colorText: {
    color: '#027A48',
    backgroundColor: '#ECFDF3',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontFamily: 'Inter_500Medium',
    marginTop: 7,
  },
  lastItem: {
    borderBottomWidth: 0, // Remove border from last item
  },
  enhancedItemContainer: {
    paddingTop: 5,
    borderColor: '#F2F2F2',
    borderBottomWidth: 1,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    // backgroundColor: 'red'
  },
});
