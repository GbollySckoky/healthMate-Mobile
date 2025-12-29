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
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useState } from 'react';
const { width } = Dimensions.get('window');
import { Button } from '@/components/button/Button';
import MoodModal from './_components/MoodModal';
import { useModal } from '@/context/ModalContext';
import SafeArea from '@/components/safeAreaView/SafeAreaView';
import { useQuery } from '@tanstack/react-query';
import { patientService } from '@/service/patientService';
import { GetMood } from '@/lib/interface/get-mood-interface';
import AntDesign from '@expo/vector-icons/AntDesign';
import useDate from '@/hooks/useDate';

const Mood = () => {
  const { openModal } = useModal();
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['getMood'],
    queryFn: () => patientService.getMood(),
  });
  const { getReadableDate } = useDate();

  // Prepare chart data - you may want to map actual mood data here
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

  const getMoodStatus = (value: string) => {
    if (value === 'Angry') {
      return {
        status: 'High',
        backgroundColor: '#FEF3F2',
        textColor: '#B42318',
      };
    }

    if (value === 'Moody') {
      return {
        status: 'Medium',
        backgroundColor: '#FEF9E6',
        textColor: '#DC6803',
      };
    }

    if (value === 'Sad' || value === 'Sick' || value === 'Tired') {
      return {
        status: 'Low',
        backgroundColor: '#EFF8FF',
        textColor: '#175CD3',
      };
    }

    return {
      status: 'Normal',
      backgroundColor: '#ECFDF3',
      textColor: '#027A48',
    };
  };

  const getMoodEmoji = (value: string) => {
    if (value === 'Angry') return '😡';
    if (value === 'Moody') return '😒';
    if (value === 'Sad') return '😢';
    if (value === 'Sick') return '🤢';
    if (value === 'Tired') return '🥱';
    return '🙂'; // Normal/Happy
  };

  // Get the latest mood for the "Today's mood" section
  const latestMood = data && data.length > 0 ? data[0] : null;
  const latestMoodStatus = latestMood ? getMoodStatus(latestMood.mood) : null;

  // Render function for Mood content
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
          <Text style={styles.stateText}>Error loading moods</Text>
          <Text style={styles.errorMessage}>{error?.message}</Text>
        </View>
      );
    }

    if (!data || data.length === 0) {
      return (
        <View style={styles.stateContainer}>
          <AntDesign name="inbox" size={40} color="#717680" />
          <Text style={styles.stateText}>No mood readings yet</Text>
          <Text style={styles.stateSubText}>
            Add your first mood to start tracking
          </Text>
        </View>
      );
    }

    return data.map((moods: GetMood, index: number) => {
      const { mood, recorded_at } = moods;
      const isLastItem = index === data.length - 1;
      const statusInfo = getMoodStatus(mood);

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
              <Text style={styles.emojiContainer}>{getMoodEmoji(mood)}</Text>
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
                  {mood}
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
                  {getReadableDate(recorded_at)}
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
          title="How Are You Feeling Today?"
          _goBack={() => router.back()}
          backIcon={
            <Entypo name="chevron-small-left" size={24} color="black" />
          }
          text="Tracking your mood helps you understand your...."
        />
        <ScreenOverFlowLayout>
          <Wrapper>
            <DetailsContainer>
              <Text style={{ fontSize: 35, marginBottom: 3 }}>
                {latestMood ? getMoodEmoji(latestMood.mood) : '🙂'}
              </Text>
              <CardText>Today's mood</CardText>
              <CardAmount>{latestMood ? latestMood.mood : 'Happy'}</CardAmount>
              <CardText>
                {latestMood
                  ? `Recorded on: ${getReadableDate(latestMood.recorded_at)}`
                  : 'N/A'}
              </CardText>
              {latestMoodStatus && (
                <Text
                  style={[
                    styles.colorText,
                    {
                      backgroundColor: latestMoodStatus.backgroundColor,
                      color: latestMoodStatus.textColor,
                    },
                  ]}
                >
                  {latestMoodStatus.status}
                </Text>
              )}
            </DetailsContainer>

            {/* Chart */}
            <View style={styles.chartContainer}>
              <SubTitle>Mood Trends</SubTitle>
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

            <View style={{ marginBottom: 40 }}>
              <Card>
                <SubTitle>Recent Moods</SubTitle>
                {renderMoodsReadings()}
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
            })
          }
        >
          Log New Mood
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
  emojiContainer: {
    borderColor: '#f2f2f2',
    borderWidth: 1,
    padding: 6,
    borderRadius: 5,
    fontSize: 24,
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
