import { NavHeader } from '@/components/Header/Header';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import {
  Card,
  CardAmount,
  CardText,
  DetailsContainer,
  SubTitle,
} from '@/components/typography/Typography';
import { router } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Animated,
  Easing,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/button/Button';
import BloodPressureModal from './BloodPressureModal';
import { useModal } from '@/context/ModalContext';
import SafeArea from '@/components/safeAreaView/SafeAreaView';
import { useQuery } from '@tanstack/react-query';
import { patientService } from '@/service/patientService';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type BloodPressureReading = {
  id: number | string;
  systolic: string | number;
  diastolic: string | number;
  createdAt?: string;
  recordedAt?: string;
};

const formatReadingDate = (date?: string) => {
  if (!date) return 'No date recorded';

  const readingDate = new Date(date);
  if (Number.isNaN(readingDate.getTime())) return 'No date recorded';

  return `${readingDate.toLocaleDateString()} at ${readingDate.toLocaleTimeString()}`;
};

// ---------- Skeleton primitives ----------

type SkeletonBoxProps = {
  width: number | string;
  height: number;
  borderRadius?: number;
  style?: object;
};

const SkeletonBox = ({ width, height, borderRadius = 6, style }: SkeletonBoxProps) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        { width, height, borderRadius, backgroundColor: '#E5E7EB', opacity },
        style,
      ]}
    />
  );
};

const ReadingSkeletonItem = ({ isLastItem }: { isLastItem: boolean }) => (
  <View
    style={[styles.enhancedItemContainer, isLastItem && styles.lastItem]}
  >
    <View style={styles.flex}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <SkeletonBox width={38} height={38} borderRadius={8} />
        <View style={{ paddingLeft: 16 }}>
          <SkeletonBox width={100} height={14} style={{ marginBottom: 6 }} />
          <SkeletonBox width={130} height={12} />
        </View>
      </View>
    </View>
  </View>
);

const BloodPressureSkeleton = ({
  chartWidth,
  chartHeight,
}: {
  chartWidth: number;
  chartHeight: number;
}) => (
  <View style={styles.contentWrapper}>
    <DetailsContainer>
      <SkeletonBox
        width={48}
        height={48}
        borderRadius={100}
        style={{ marginBottom: 10 }}
      />
      <SkeletonBox width={110} height={12} style={{ marginBottom: 8 }} />
      <SkeletonBox width={130} height={22} style={{ marginBottom: 10 }} />
      <SkeletonBox width={180} height={12} style={{ marginBottom: 10 }} />
      <SkeletonBox width={70} height={20} borderRadius={50} />
    </DetailsContainer>

    {/* Chart placeholder */}
    <View style={styles.chartContainer}>
      <SubTitle>BP Trends</SubTitle>
      <SkeletonBox
        width={chartWidth}
        height={chartHeight}
        borderRadius={8}
        style={{ marginVertical: 8, alignSelf: 'center' }}
      />
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <SkeletonBox width={12} height={12} borderRadius={6} style={{ marginRight: 8 }} />
          <SkeletonBox width={50} height={12} />
        </View>
        <View style={styles.legendItem}>
          <SkeletonBox width={12} height={12} borderRadius={6} style={{ marginRight: 8 }} />
          <SkeletonBox width={60} height={12} />
        </View>
      </View>
    </View>

    {/* Recent readings placeholder */}
    <View style={{ marginBottom: 40 }}>
      <Card>
        <SubTitle>Recent Readings</SubTitle>
        {Array.from({ length: 4 }).map((_, index) => (
          <ReadingSkeletonItem key={index} isLastItem={index === 3} />
        ))}
      </Card>
    </View>
  </View>
);

// ---------- Main screen ----------

const BloodPressure = () => {
  const { openModal } = useModal();
  const { width: screenWidth } = useWindowDimensions();
  const contentWidth = screenWidth * 0.92;
  const chartWidth = Math.max(contentWidth - 24, 1);
  const chartHeight = Math.max(190, Math.min(screenWidth * 0.55, 240));
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
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['bloodPressure'],
    queryFn: () => patientService.getBloodPressure(),
  });

  const bloodPressures: BloodPressureReading[] = data?.data ?? [];
  const latestBloodPressure = bloodPressures[0];

  const chartData = {
    labels: readings.map((r) => r.date.split(' ')[1]),
    datasets: [
      {
        data: readings.map((r) => r.systolic),
        color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
        strokeWidth: 3,
      },
      {
        data: readings.map((r) => r.diastolic),
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
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

  if (isError as unknown) {
    return (
      <SafeArea>
        <View style={styles.stateContainer}>
          <Text style={styles.errorText}>{(error as Error).message}</Text>
        </View>
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <ScreenLayout>
        <NavHeader
          title="Blood Pressure Tracker"
          _goBack={() => router.back()}
          backIcon={<Entypo name="chevron-small-left" size={24} color="black" />}
          text="Track your readings to monitor your heart health"
        />
        <ScreenOverFlowLayout>
          {isLoading ? (
            <BloodPressureSkeleton chartWidth={chartWidth} chartHeight={chartHeight} />
          ) : (
            <View style={styles.contentWrapper}>
              <DetailsContainer>
                <AntDesign
                  name="heart"
                  size={24}
                  color="#DF0000"
                  style={styles.icon}
                />
                <CardText>Today&apos;s Readings</CardText>
                <CardAmount>
                  {latestBloodPressure
                    ? `${latestBloodPressure.systolic}/${latestBloodPressure.diastolic} mmHg`
                    : '--/-- mmHg'}
                </CardAmount>
                <CardText>
                  Recorded on:{' '}
                  {formatReadingDate(
                    latestBloodPressure?.recordedAt ?? latestBloodPressure?.createdAt
                  )}
                </CardText>
                <Text style={styles.colorText}>Normal</Text>
              </DetailsContainer>

              <View style={styles.chartContainer}>
                <SubTitle>BP Trends</SubTitle>
                <LineChart
                  data={chartData}
                  width={chartWidth}
                  height={chartHeight}
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
                <View style={styles.legend}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
                    <Text style={styles.legendText}>Systolic</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#3B82F6' }]} />
                    <Text style={styles.legendText}>Diastolic</Text>
                  </View>
                </View>
              </View>

              <View style={{ marginBottom: 40 }}>
                <Card>
                  <SubTitle>Recent Readings</SubTitle>
                  {bloodPressures.map((recent, index) => {
                    const isLastItem = index === bloodPressures.length - 1;
                    return (
                      <View
                        key={recent.id}
                        style={[
                          styles.enhancedItemContainer,
                          isLastItem && styles.lastItem,
                        ]}
                      >
                        <View style={styles.flex}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                                {recent.systolic}/{recent.diastolic} mmHg
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
                                {formatReadingDate(recent.recordedAt ?? recent.createdAt)}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </Card>
              </View>
            </View>
          )}
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
  stateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  errorText: {
    color: '#EF4444',
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    textAlign: 'center',
  },
  contentWrapper: {
    alignSelf: 'center',
    width: '92%',
    paddingTop: 10,
    paddingBottom: 110,
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
  lastItem: {
    borderBottomWidth: 0,
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
  chartContainer: {
    backgroundColor: '#ffffff',
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
  legendText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});