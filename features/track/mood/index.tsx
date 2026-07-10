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
import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useState } from 'react';
const { width } = Dimensions.get('window');
// import { recentMood } from '@/lib/data';
import { Button } from '@/components/button/Button';
import MoodModal from './_components/MoodModal';
import { useModal } from '@/context/ModalContext';
import SafeArea from '@/components/safeAreaView/SafeAreaView';
import { patientService } from '@/service/patientService';
import { useQuery } from '@tanstack/react-query';

type MoodValue = {
  selectedMood?: string;
  selectedEmoji?: boolean;
};

type MoodReading = {
  id: number | string;
  mood?: MoodValue;
  notes?: string;
  recordedAt?: string;
  createdAt?: string;
  status?: string;
};

const formatReadingDate = (date?: string) => {
  if (!date) return 'No date recorded';

  const readingDate = new Date(date);
  if (Number.isNaN(readingDate.getTime())) return 'No date recorded';

  return `${readingDate.toLocaleDateString()} at ${readingDate.toLocaleTimeString()}`;
};

const getMoodEmoji = (mood?: string) => {
  switch (mood) {
    case 'Happy':
      return '🙂';
    case 'Laughing':
      return '😂';
    case 'Angry':
      return '😡';
    case 'Sick':
      return '🤢';
    case 'Tired':
      return '🥱';
    default:
      return '🙂';
  }
};

const getMoodStatus = (mood?: string) => {
  if (mood === 'Happy' || mood === 'Laughing') return 'Positive';
  if (mood === 'Angry' || mood === 'Sick' || mood === 'Tired') return 'Low';
  return 'Logged';
};

const Mood = () => {
  const { openModal } = useModal();
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['mood'],
    queryFn: () => patientService.getMood(),
  })
  console.log("Data", data)
  const moodReadings: MoodReading[] = data?.data ?? [];
  const latestMood = moodReadings[0];
  const latestMoodName = latestMood?.mood?.selectedMood;
  const latestMoodStatus = latestMood?.status ?? getMoodStatus(latestMoodName);
  
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
          title="How Are You Feeling Today?"
          _goBack={() => router.back()}
          backIcon={<Entypo name="chevron-small-left" size={24} color="black" />}
          text="Tracking your mood helps you understand your...."
        />
        <ScreenOverFlowLayout>
          <Wrapper>
            <DetailsContainer>
              <Text style={{ fontSize: 35, marginBottom: 3 }}>
                {getMoodEmoji(latestMoodName)}
              </Text>
              <CardText>Today’s mood</CardText>
              <CardAmount>{latestMoodName ?? 'No mood logged'}</CardAmount>
              <CardText>
                Recorded on:{' '}
                {formatReadingDate(latestMood?.recordedAt ?? latestMood?.createdAt)}
              </CardText>
              <Text style={styles.colorText}>{latestMoodStatus}</Text>
            </DetailsContainer>
            {/* Chart */}
            <View style={styles.chartContainer}>
              <SubTitle>Mood Trends</SubTitle>
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
                // color={true}
                segments={6}
              />
            </View>
            <View style={{ marginBottom: 40 }}>
              <Card>
                <SubTitle>Recent Moods</SubTitle>
                {moodReadings.map((recent, index) => {
                  const moodName = recent.mood?.selectedMood;
                  const status = recent.status ?? getMoodStatus(moodName);
                  const isLastItem = index === moodReadings.length - 1;
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
                          {recent.mood?.selectedEmoji && (
                          <Text
                            style={{
                              borderColor: '#f2f2f2',
                              borderWidth: 1,
                              padding: 6,
                              borderRadius: 5,
                            }}
                          >
                            {' '}
                            {getMoodEmoji(moodName)}{' '}
                          </Text>
                          )}
                          
                          <View style={{ paddingLeft: 16 }}>
                            <Text
                              style={{
                                fontWeight: 500,
                                fontSize: 14,
                                fontFamily: 'Lato_400Regular',
                              }}
                            >
                              {moodName ?? 'No mood'}
                            </Text>
                            <Text
                              style={{
                                fontWeight: 500,
                                fontSize: 14,
                                fontFamily: 'Lato_400Regular',
                              }}
                            >
                              {recent.notes ?? 'No notes'}
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
                        <Text
                          style={{
                            backgroundColor: `${
                              (status === 'Positive' && '#ECFDF3') ||
                              (status === 'Low' && '#FEF3F2') ||
                              (status === 'Balanced' && '#FFFAEB') ||
                              (status === 'Logged' && '#F4F3FF')
                            }`,
                            color: `${(status === 'Positive' && '#027A48') || (status === 'Low' && '#B42318') || (status === 'Balanced' && '#B54708') || (status === 'Logged' && '#5924DC')}`,
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
            openModal(<MoodModal />, {
              title: 'Log New Mood',
              description: '',
              onClose: () => {},
              // btnText: 'Save Reading'
            })
          }
        >
          Log New Weight
        </Button>
      </ScreenLayout>
    </SafeArea>
  );
};

export default Mood;

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
  chart: {
    marginVertical: 8,
    borderRadius: 8,
    // backgroundColor: 'red'
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
