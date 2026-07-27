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
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View, Dimensions, Animated, Easing } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useEffect, useRef, useState } from 'react';
const { width } = Dimensions.get('window');
import Feather from '@expo/vector-icons/Feather';
import { Button } from '@/components/button/Button';
import WeightModal from './_component/WeightModal';
import { useModal } from '@/context/ModalContext';
import SafeArea from '@/components/safeAreaView/SafeAreaView';
import { useQuery } from '@tanstack/react-query';
import { patientService } from '@/service/patientService';

type WeightReading = {
  id: number | string;
  weight: string | number;
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

const WeightHistorySkeletonItem = ({ isLastItem }: { isLastItem: boolean }) => (
  <View
    style={[styles.enhancedItemContainer, isLastItem && styles.lastItem]}
  >
    <View style={styles.flex}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <SkeletonBox width={30} height={30} borderRadius={8} />
        <View style={{ paddingLeft: 16 }}>
          <SkeletonBox width={70} height={14} style={{ marginBottom: 6 }} />
          <SkeletonBox width={130} height={12} />
        </View>
      </View>
    </View>
  </View>
);

const WeightSkeleton = () => (
  <Wrapper>
    <DetailsContainer>
      <SkeletonBox
        width={48}
        height={48}
        borderRadius={100}
        style={{ marginBottom: 10 }}
      />
      <SkeletonBox width={110} height={12} style={{ marginBottom: 8 }} />
      <SkeletonBox width={90} height={22} style={{ marginBottom: 10 }} />
      <SkeletonBox width={180} height={12} />
    </DetailsContainer>

    {/* Weight Goal placeholder */}
    <Card>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 9 }}
      >
        <SkeletonBox width={20} height={20} borderRadius={4} style={{ marginRight: 5 }} />
        <SkeletonBox width={130} height={14} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 6,
        }}
      >
        <SkeletonBox width={90} height={12} />
        <SkeletonBox width={30} height={12} />
      </View>
      <SkeletonBox width="100%" height={12} borderRadius={40} />
    </Card>

    {/* Chart placeholder */}
    <View style={styles.chartContainer}>
      <SkeletonBox width={120} height={14} style={{ marginBottom: 10 }} />
      <SkeletonBox width={width - 48} height={220} borderRadius={8} />
    </View>

    {/* Weight history placeholder */}
    <View style={{ marginBottom: 40 }}>
      <Card>
        <SkeletonBox width={140} height={14} style={{ marginBottom: 15 }} />
        {Array.from({ length: 4 }).map((_, index) => (
          <WeightHistorySkeletonItem key={index} isLastItem={index === 3} />
        ))}
      </Card>
    </View>
  </Wrapper>
);

// ---------- Main screen ----------

const Weight = () => {
  const { openModal } = useModal();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['weight'],
    queryFn: () => patientService.getWeight(),
  });

  const weightReadings: WeightReading[] = data?.data ?? [];
  const latestWeight = weightReadings[0];
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
      <Text className="h-full flex items-center justify-center text-sm text-red-500">
        {(error as Error).message}
      </Text>
    );
  }

  return (
    <SafeArea>
      <ScreenLayout>
        <NavHeader
          title="Track Your Weight"
          _goBack={() => router.back()}
          backIcon={<Entypo name="chevron-small-left" size={24} color="black" />}
          text="Tracking your mood helps you understand your...."
        />
        <ScreenOverFlowLayout>
          {isLoading ? (
            <WeightSkeleton />
          ) : (
            <Wrapper>
              <DetailsContainer>
                <FontAwesome
                  name="balance-scale"
                  size={24}
                  color="#C11574"
                  style={styles.icon}
                />
                <CardText>Current Weight</CardText>
                <CardAmount>
                  {latestWeight ? `${latestWeight.weight} kg` : '-- kg'}
                </CardAmount>
                <CardText>
                  Recorded on:{' '}
                  {formatReadingDate(latestWeight?.createdAt ?? latestWeight?.recordedAt)}
                </CardText>
              </DetailsContainer>
              {/* Weight Goal */}
              <Card>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 9,
                  }}
                >
                  <Feather
                    name="target"
                    size={20}
                    color="#05A505"
                    style={{ marginRight: 5 }}
                  />
                  <SubTitle>Goal Weight: 60Kg</SubTitle>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 2,
                  }}
                >
                  <Text style={styles.text}>Progress to Goal</Text>
                  <Text style={styles.text}>70%</Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#05A5051F',
                    width: '100%',
                    borderRadius: 40,
                    padding: 3,
                    marginTop: 2,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: '#05A505',
                      width: '70%',
                      borderRadius: 40,
                      padding: 3,
                    }}
                  />
                </View>
              </Card>
              {/* Chart */}
              <View style={styles.chartContainer}>
                <SubTitle>Weight Trends</SubTitle>
                <LineChart
                  data={chartData}
                  width={width - 48}
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
              </View>
              {/* Weight */}
              <View style={{ marginBottom: 40 }}>
                <Card>
                  <SubTitle>Weight History</SubTitle>
                  {weightReadings.map((weightReading, index) => {
                    const isLastItem = index === weightReadings.length - 1;
                    return (
                      <View
                        key={weightReading.id}
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
                              <FontAwesome
                                name="balance-scale"
                                size={16}
                                color="#C11574"
                                style={styles.icon}
                              />
                            </Text>
                            <View style={{ paddingLeft: 16 }}>
                              <Text
                                style={{
                                  fontWeight: 500,
                                  fontSize: 14,
                                  fontFamily: 'Lato_400Regular',
                                }}
                              >
                                {weightReading.weight} kg
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
                                {formatReadingDate(
                                  weightReading.createdAt ?? weightReading.recordedAt
                                )}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </Card>
              </View>
            </Wrapper>
          )}
        </ScreenOverFlowLayout>
        <Button
          _fn={() =>
            openModal(<WeightModal />, {
              title: 'Log New Weight',
              description: '',
              onClose: () => {},
            })
          }
        >
          Log New Weight
        </Button>
      </ScreenLayout>
    </SafeArea>
  );
};

export default Weight;

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
    fontFamily: 'Inter',
    marginTop: 7,
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
    marginTop: 25,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'left',
    paddingTop: 10,
    fontFamily: 'Libre-Franklin',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
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
  text: {
    fontWeight: 400,
    fontSize: 12,
    marginBottom: 4,
    fontFamily: 'Lato_400Regular',
  },
});