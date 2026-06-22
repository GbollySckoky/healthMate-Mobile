import React from 'react';
import { BarChart } from 'react-native-chart-kit';
import { StyleSheet, View, Text, Dimensions, ActivityIndicator } from 'react-native';
import { NavHeader } from '@/components/Header/Header';
import { router } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
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
import { sleepLogHistory } from '../../../lib/data';
import { Button } from '@/components/button/Button';
import SleepModal from './_components/SleepModal';
import { useModal } from '@/context/ModalContext';
import SafeArea from '@/components/safeAreaView/SafeAreaView';
import { patientService } from '@/service/patientService';
import { useQuery } from '@tanstack/react-query';



const screenWidth = Dimensions.get('window').width;

const datas = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};

const chartConfig = {
  backgroundColor: '#CC400C',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(185, 85, 45, ${opacity})`, // Orange-red color
  labelColor: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`, // Gray labels
  style: {
    borderRadius: 8,
  },
  barPercentage: 0.7,
  fillShadowGradient: '#B9552D', // Orange-red fill
  fillShadowGradientOpacity: 1,
  propsForBackgroundLines: {
    strokeDasharray: '5,5', // Dashed grid lines
    stroke: '#e0e0e0',
    strokeWidth: 1,
  },
  propsForLabels: {
    fontSize: 12,
    fontFamily: 'System',
  },
};

export default function MyBarChart() {
  const { openModal } = useModal();
   const {data, isLoading, isError, error} = useQuery({
    queryKey: ['sleep'],
    queryFn: () => patientService.getSleep(),
  })
  console.log('Data', data)

  if(isLoading){
      return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
      )
  }
  
  if (isError as unknown) {
    return(
       <div className="h-full flex items-center justify-center text-sm text-red-500">
        {(error as Error).message}
      </div>
    )
  }
  return (
    <SafeArea>
      <ScreenLayout>
        <NavHeader
          title="Sleep Tracker"
          _goBack={() => router.back()}
          backIcon={
            <Entypo name="chevron-small-left" size={24} color="black" />
          }
          text="Track your readings to monitor your sleep health"
        />
        <ScreenOverFlowLayout>
          <Wrapper>
            <DetailsContainer>
              <FontAwesome
                name="moon-o"
                size={24}
                color="#C11574"
                style={styles.icon}
              />
              <CardText>Today's sleep</CardText>
              <CardAmount>
                {latestSleep ? `${latestSleep.hours_slept} ${latestSleep.hours_slept == 1 ? 'hour' : 'hours'}` : '0 hours'}
              </CardAmount>
              <CardText>Recorded on: {latestSleep ? latestSleep.sleep_date : 'N/A'}</CardText>
              <Text style={{
                backgroundColor: latestSleepStatus ? latestSleepStatus.backgroundColor : '#F2F2F2',
                color: latestSleepStatus ? latestSleepStatus.textColor : '#717680',
                paddingHorizontal: 15,
                paddingVertical: 7,
                borderRadius: 30,
                fontFamily: 'Inter_500Medium',
              }}>{latestSleepStatus ? latestSleepStatus.status : 'No data'}</Text>
            </DetailsContainer>
            <View style={styles.container}>
              <View style={styles.chartContainer}>
                <SubTitle>Sleep Trends</SubTitle>
                <BarChart
                  style={styles.chart}
                  data={datas}
                  width={screenWidth - 45}
                  height={300}
                  yAxisLabel=""
                  yAxisSuffix=""
                  chartConfig={chartConfig}
                  verticalLabelRotation={0}
                  fromZero={true}
                  showValuesOnTopOfBars={false}
                  withHorizontalLabels={true}
                  withVerticalLabels={true}
                  segments={5}
                />
              </View>
            </View>
            {/* sleep log */}
            <View style={{ marginBottom: 40 }}>
              <Card>
                <SubTitle>Sleep Log History</SubTitle>
                {data?.data?.map((sleep: any) => {
                  const { icon, hour, date, status, time } = sleep;
                  const isLastItem = sleep.id === data?.data?.length - 1;
                  return (
                    <View
                      key={sleep.id}
                      style={[
                        styles.enhancedItemContainer,
                        isLastItem && styles.lastItem,
                      ]}
                    >
                      <View style={styles.flex}>
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                         {sleep.sleep.selectedEmoji && (
                          <Text
                            style={{
                              borderColor: '#f2f2f2',
                              borderWidth: 1,
                              padding: 6,
                              borderRadius: 5,
                            }}
                          >
                            {' '}
                            {sleep.sleep.selectedMood === 'Excellent' && '😴' || sleep.sleep.selectedMood === 'Average' && '😐' || sleep.sleep.selectedMood === 'Poor' && '😩' }{' '}
                          </Text>
                          )}
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
                              {sleep.sleep.selectedMood}
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
                              {new Date(sleep.recordedAt).toLocaleDateString()} . {new Date(sleep.recordedAt).toLocaleTimeString()}
                            </Text>
                          </View>
                        </View>
                        <Text
                          style={{
                            backgroundColor: `${(status === 'Excellent' && '#ECFDF3') || (status === 'Average' && '#FFFAEB') || (status === 'Low' && '#FEF3F2')}`,
                            color: `${(status === 'Excellent' && '#027A48') || (status === 'Average' && '#B54708') || (status === 'Low' && '#B42318')}`,
                            paddingHorizontal: 15,
                            paddingVertical: 7,
                            borderRadius: 30,
                            fontFamily: 'Inter_500Medium',
                          }}
                        >
                          {status}
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
            openModal(<SleepModal />, {
              title: 'Log Your Sleep',
              description: '',
              onClose: () => {},
              // btnText: 'Save Reading'
            })
          }
        >
          Log New Sleep
        </Button>
      </ScreenLayout>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 5,
    flex: 1,
  },
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
  emojiContainer: {
    borderColor: '#f2f2f2',
    borderWidth: 1,
    padding: 6,
    borderRadius: 5,
    fontSize: 24,
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#414651',
    marginBottom: 10,
    textAlign: 'left',
    paddingTop: 10,
    fontFamily: 'Libre-Franklin',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
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
  stateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  stateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#414651',
    marginTop: 12,
    fontFamily: 'Lato_400Regular',
  },
  stateSubText: {
    fontSize: 14,
    color: '#717680',
    marginTop: 6,
    textAlign: 'center',
    fontFamily: 'Lato_400Regular',
  },
  errorMessage: {
    fontSize: 12,
    color: '#B42318',
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'Lato_400Regular',
  },
});