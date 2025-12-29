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
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useState, useMemo } from 'react';
const { width } = Dimensions.get('window');
import Feather from '@expo/vector-icons/Feather';
import { Button } from '@/components/button/Button';
import WeightModal from './_component/WeightModal';
import { useModal } from '@/context/ModalContext';
import SafeArea from '@/components/safeAreaView/SafeAreaView';
import { patientService } from '@/service/patientService';
import { useQuery } from '@tanstack/react-query';
import { GetWeight } from '@/lib/interface/get-weight-interface';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import useDate from '@/hooks/useDate';
import AntDesign from '@expo/vector-icons/AntDesign';

const Weight = () => {
  const { openModal } = useModal();
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['getWeight'],
    queryFn: () => patientService.getWeight(),
  });
  const { getReadableDate } = useDate();

  // Prepare chart data from actual weight data
  const chartData = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        labels: [],
        datasets: [{ data: [0] }],
      };
    }

    // Sort by date and take last 7-8 readings for chart
    const sortedData = [...data]
      .sort((a, b) => new Date(a.recorded_at).getTime() - new Date(b.recorded_at).getTime())
      .slice(-8);

    return {
      labels: sortedData.map((item) => {
        const date = new Date(item.recorded_at);
        return `${date.getMonth() + 1}/${date.getDate()}`;
      }),
      datasets: [
        {
          data: sortedData.map((item) => parseFloat(item.weight)),
          color: (opacity = 1) => `rgba(193, 21, 116, ${opacity})`,
          strokeWidth: 3,
        },
      ],
    };
  }, [data]);

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 1,
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

  // Get current (most recent) weight
  const currentWeight = useMemo(() => {
    if (!data || data.length === 0) return null;
    const sorted = [...data].sort(
      (a, b) => new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime()
    );
    return sorted[0];
  }, [data]);

  const renderWeightReadings = () => {
    if (isLoading) {
      return (
        <View style={styles.stateContainer}>
          <ActivityIndicator size="large" color="#DF0000" />
          <Text style={styles.stateText}>Loading weight...</Text>
        </View>
      );
    }

    if (isError) {
      return (
        <View style={styles.stateContainer}>
          <Text style={styles.stateText}>Error loading weights</Text>
          <Text style={styles.errorMessage}>{error?.message}</Text>
        </View>
      );
    }

    if (!data || data.length === 0) {
      return (
        <View style={styles.stateContainer}>
          <AntDesign name="inbox" size={40} color="#717680" />
          <Text style={styles.stateText}>No weight readings yet</Text>
          <Text style={styles.stateSubText}>
            Add your first weight to start tracking
          </Text>
        </View>
      );
    }

    return data.map((recent: GetWeight, index: number) => {
      const { recorded_at, weight } = recent;
      const isLastItem = index === data.length - 1;
      return (
        <View
          key={index}
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
                <MaterialCommunityIcons
                  name="weight-lifter"
                  size={24}
                  color="#C11574"
                />
              </Text>
              <View style={{ paddingLeft: 16 }}>
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 14,
                    fontFamily: 'Lato_400Regular',
                  }}
                >
                  {weight} kg
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
          </View>
        </View>
      );
    });
  };

  return (
    <SafeArea>
      <ScreenLayout>
        <NavHeader
          title="Track Your Weight"
          _goBack={() => router.back()}
          backIcon={
            <Entypo name="chevron-small-left" size={24} color="black" />
          }
          text="Tracking your weight helps you monitor your health progress"
        />
        <ScreenOverFlowLayout>
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
                {currentWeight ? `${currentWeight.weight} kg` : '--'}
              </CardAmount>
              <CardText>
                {currentWeight
                  ? `Recorded on: ${getReadableDate(currentWeight.recorded_at)}`
                  : 'No readings yet'}
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
            {data && data.length > 0 && (
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
                  yAxisSuffix=" kg"
                  yAxisInterval={1}
                  fromZero={false}
                  segments={6}
                />
              </View>
            )}
            
            {/* Weight History */}
            <View style={{ marginBottom: 40 }}>
              <Card>
                <SubTitle>Weight History</SubTitle>
                {renderWeightReadings()}
              </Card>
            </View>
          </Wrapper>
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
    fontWeight: '400',
    fontSize: 12,
    marginBottom: 4,
    fontFamily: 'Lato_400Regular',
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