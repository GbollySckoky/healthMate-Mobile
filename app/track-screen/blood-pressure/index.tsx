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
import AntDesign from '@expo/vector-icons/AntDesign';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LineChart } from 'react-native-chart-kit';
import { useState } from 'react';
import { Button } from '@/components/button/Button';
import BloodPressureModal from './BloodPressureModal';
import { useModal } from '@/context/ModalContext';
import SafeArea from '@/components/safeAreaView/SafeAreaView';
import { useQuery } from '@tanstack/react-query';
import { patientService } from '@/service/patientService';
import { GetBloodPressue } from '@/lib/interface/get-blood-pressure-interface';

const { width } = Dimensions.get('window');

const BloodPressure = () => {
  const { openModal } = useModal();
  const [readings, setReadings] = useState([
    { date: 'Jun 20', systolic: 82, diastolic: 62 },
    { date: 'Jun 21', systolic: 95, diastolic: 75 },
    { date: 'Jun 22', systolic: 118, diastolic: 105 },
    { date: 'Jun 23', systolic: 118, diastolic: 95 },
    { date: 'Jun 24', systolic: 140, diastolic: 82 },
    { date: 'Jun 25', systolic: 140, diastolic: 82 },
    { date: 'Jun 26', systolic: 140, diastolic: 82 },
    { date: 'Jun 27', systolic: 140, diastolic: 82 },
  ]);

  // Prepare chart data
  const chartData = {
    labels: readings.map((r) => r.date.split(' ')[1]), // Just day numbers
    datasets: [
      {
        data: readings.map((r) => r.systolic),
        color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`, // Red for systolic
        strokeWidth: 3,
      },
      {
        data: readings.map((r) => r.diastolic),
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`, // Blue for diastolic
        strokeWidth: 3,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '0',
    },
    propsForBackgroundLines: {
      strokeDasharray: '5,5',
      stroke: `rgba(229, 231, 235, 1)`,
      strokeWidth: 1,
    },
  };

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['getBloodPressure'],
    queryFn: () => patientService.getBloodPressure(),
  });
  console.log('12345', data);
  console.log('eijijdf', error);

  const getBloodPressureStatus = (systolic: number, diastolic: number) => {
    // High Blood Pressure (Hypertension Stage 2)
    if (systolic >= 140 || diastolic >= 90) {
      return {
        status: 'High',
        backgroundColor: '#FEF3F2',
        textColor: '#B42318',
      };
    }

    // Elevated/Medium (Hypertension Stage 1)
    if (systolic >= 130 || diastolic >= 80) {
      return {
        status: 'Medium',
        backgroundColor: '#FEF9E6',
        textColor: '#DC6803',
      };
    }

    // Low Blood Pressure (Hypotension)
    if (systolic < 90 || diastolic < 60) {
      return {
        status: 'Low',
        backgroundColor: '#EFF8FF',
        textColor: '#175CD3',
      };
    }

    // Normal
    return {
      status: 'Normal',
      backgroundColor: '#ECFDF3',
      textColor: '#027A48',
    };
  };

  // Render function for Recent Readings content
  const renderRecentReadings = () => {
    if (isLoading) {
      return (
        <View style={styles.stateContainer}>
          <ActivityIndicator size="large" color="#DF0000" />
          <Text style={styles.stateText}>Loading readings...</Text>
        </View>
      );
    }

    if (isError) {
      return (
        <View style={styles.stateContainer}>
          <Text style={styles.stateText}>Error loading readings</Text>
          <Text style={styles.errorMessage}>{error?.message}</Text>
        </View>
      );
    }

    if (!data || data.length === 0) {
      return (
        <View style={styles.stateContainer}>
          <AntDesign name="inbox" size={40} color="#717680" />
          <Text style={styles.stateText}>No blood pressure readings yet</Text>
          <Text style={styles.stateSubText}>
            Add your first reading to start tracking
          </Text>
        </View>
      );
    }

    return data.map((blood: GetBloodPressue, index: number) => {
      const { diastolic, date_recorded, systolic, time_recorded } = blood;
      const isLastItem = index === data.length - 1;

      // Get the status information
      const statusInfo = getBloodPressureStatus(systolic, diastolic);

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
              <Text
                style={{
                  borderColor: '#f2f2f2',
                  borderWidth: 1,
                  padding: 6,
                  borderRadius: 5,
                }}
              >
                <FontAwesome name="stethoscope" size={24} color="#DF0000" />
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
                  {systolic}/{diastolic} mmHg
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
                  {date_recorded} at {time_recorded}
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
  const latestReading = data?.[0];
  const status = latestReading
  ? getBloodPressureStatus(
      latestReading.systolic,
      latestReading.diastolic
    )
  : null;

  return (
    <SafeArea>
      <ScreenLayout>
        <NavHeader
          title="Blood Pressure Tracker"
          _goBack={() => router.back()}
          backIcon={
            <Entypo name="chevron-small-left" size={24} color="black" />
          }
          text="Track your readings to monitor your heart health"
        />
        <ScreenOverFlowLayout>
          <Wrapper>
            <DetailsContainer>
              <AntDesign
                name="heart"
                size={24}
                color="#DF0000"
                style={styles.icon}
              />
              <CardText>Today's Readings</CardText>
              {isLoading ? (
                <ActivityIndicator color="#DF0000" />
              ) : (
                <>
                <CardAmount>
                      {latestReading
                        ? `${latestReading.systolic}/${latestReading.diastolic} mmHg`
                        : '--/-- mmHg'}
                </CardAmount>

                <CardText>
                  Recorded on:{' '}
                  {latestReading
                    ? `${latestReading.date_recorded}, ${latestReading.time_recorded}`
                    : 'N/A'}
                </CardText>

                {status && (
                  <Text
                    style={[
                      styles.colorText,
                      {
                        backgroundColor: status.backgroundColor,
                        color: status.textColor,
                      },
                    ]}
                  >
                    {status.status}
                  </Text>
                )}
                </>
              )}
            </DetailsContainer>
            {/* Line Chart */}
            <View style={styles.chartContainer}>
              <SubTitle>BP Trends</SubTitle>
              <LineChart
                data={chartData}
                width={width - 48} // Adjust for card padding
                height={220}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
                withInnerLines={true}
                withOuterLines={false}
                yAxisSuffix=""
                yAxisInterval={1}
                fromZero={false}
                segments={6}
              />

              {/* Legend */}
              <View style={styles.legend}>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendDot, { backgroundColor: '#EF4444' }]}
                  />
                  <Text style={styles.legendText}>Systolic</Text>
                </View>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendDot, { backgroundColor: '#3B82F6' }]}
                  />
                  <Text style={styles.legendText}>Diastolic</Text>
                </View>
              </View>
            </View>
            {/* Recent Readings */}
            <View style={{ marginBottom: 40 }}>
              <Card>
                <SubTitle>Recent Readings</SubTitle>
                {renderRecentReadings()}
              </Card>
            </View>
          </Wrapper>
        </ScreenOverFlowLayout>
        <Button
          _fn={() =>
            openModal(<BloodPressureModal />, {
              title: 'Add Blood Pressure Reading',
              description: '',
              onClose: () => {},
            })
          }
        >
          Add New Reading
        </Button>
      </ScreenLayout>
    </SafeArea>
  );
};

export default BloodPressure;

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
  },
  container: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
  },
  chartContainer: {
    backgroundColor: '#fffff',
    marginBottom: 26,
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f2f2f2',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    gap: 30,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
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
