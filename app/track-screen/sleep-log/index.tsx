import React from 'react';
import { BarChart } from 'react-native-chart-kit';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
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
import { useQuery } from '@tanstack/react-query';
import useDate from '@/hooks/useDate';
import { patientService } from '@/service/patientService';
import { GetSleep } from '@/lib/interface/get-sleep-interface';
import AntDesign from '@expo/vector-icons/AntDesign';

const screenWidth = Dimensions.get('window').width;

const data = {
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

  const {
    data: datas,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['getSleep'],
    queryFn: () => patientService.getSleep(),
  });

  const { getReadableDate } = useDate();

  const getSleepStatus = (value: string) => {
    if (value === 'Poor') {
      return {
        status: 'High',
        backgroundColor: '#FEF3F2',
        textColor: '#B42318',
      };
    }

    if (value === 'Average') {
      return {
        status: 'Medium',
        backgroundColor: '#FEF9E6',
        textColor: '#DC6803',
      };
    }

    return {
      status: 'Excellent',
      backgroundColor: '#ECFDF3',
      textColor: '#027A48',
    };
  };

  const getMoodEmoji = (value: string) => {
    if (value === 'Excellent') return '😴';
    if (value === 'Average') return '😐';
    if (value === 'Poor') return '😩';
    return '😴'; // Normal/Happy
  };

  const latestSleep = datas && datas.length > 0 ? datas[0] : null;
  const latestSleepStatus = latestSleep
    ? getSleepStatus(latestSleep.quanlity)
    : null;

  const renderMoodsReadings = () => {
    if (isLoading) {
      return (
        <View style={styles.stateContainer}>
          <ActivityIndicator size="large" color="#DF0000" />
          <Text style={styles.stateText}>Loading mood...</Text>
        </View>
      );
    }

    if (isError) {
      return (
        <View style={styles.stateContainer}>
          <Text style={styles.stateText}>Error loading sleep</Text>
          <Text style={styles.errorMessage}>{error?.message}</Text>
        </View>
      );
    }

    if (!datas || datas.length === 0) {
      return (
        <View style={styles.stateContainer}>
          <AntDesign name="inbox" size={40} color="#717680" />
          <Text style={styles.stateText}>No mood readings yet</Text>
          <Text style={styles.stateSubText}>
            Add your first sleep to start tracking
          </Text>
        </View>
      );
    }

    return datas.map((sleep: GetSleep, index: number) => {
      const { quanlity, hours_slept, sleep_date } = sleep;
      const isLastItem = index === datas.length - 1;
      const statusInfo = getSleepStatus(quanlity);

      return (
        <View
          key={index}
          style={[styles.enhancedItemContainer, isLastItem && styles.lastItem]}
        >
          <View style={styles.flex}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text style={styles.emojiContainer}>
                {getMoodEmoji(quanlity)}
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
                  {quanlity}
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
                  {getReadableDate(sleep_date)} at{' '}
                  {hours_slept == 1
                    ? `${hours_slept} hour`
                    : `${hours_slept} hours`}
                </Text>
              </View>
            </View>
            <Text
              style={{
                backgroundColor: statusInfo.backgroundColor,
                color: statusInfo.textColor,
                paddingHorizontal: 15,
                paddingVertical: 7,
                borderRadius: 30,
                fontFamily: 'Inter_500Medium',
              }}
            >
              {statusInfo.status}
            </Text>
          </View>
        </View>
      );
    });
  };

  return (
    <SafeArea>
      <ScreenLayout>
        <NavHeader
          title="Track Your Sleep"
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
                  data={data}
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
                {renderMoodsReadings()}
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