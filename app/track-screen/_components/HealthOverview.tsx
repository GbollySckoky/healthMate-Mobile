import { Text, View, StyleSheet, Pressable } from 'react-native';
import { useCallback } from 'react';
import { healthOverview } from '../../../lib/data';
import {
  CardText,
  CardTitle,
} from '@/components/typography/Typography';
import { useLinkTo } from '@react-navigation/native';
import { colors } from '@/lib/colors';

const HealthOverview = () => {
  const linkTo = useLinkTo();

  // Optimized navigation handler
  const handlePress = useCallback(
    (url: string) => {
      linkTo(url);
    },
    [linkTo]
  );

  // Handle empty data
  if (!healthOverview || healthOverview.length === 0) {
    return (
      <View style={style.emptyContainer}>
        <Text style={style.emptyText}>No health data available</Text>
      </View>
    );
  }

  return (
    <View style={style.container}>
      {healthOverview.map((health) => {
        const { title, id, text, value, icon, url } = health;
        return (
          <Pressable
            onPress={() => handlePress(url)}
            key={id}
            style={({ pressed }) => [
              style.MinCard,
              pressed && style.pressedCard,
            ]}
            accessible={true}
            accessibilityLabel={`${title}: ${value}`}
            accessibilityRole="button"
            accessibilityHint={`Navigate to ${title} details`}
          >
            <Text style={style.iconContainer}>{icon}</Text>
            <CardTitle>{title}</CardTitle>
            <View style={style.valueContainer}>
              <Text style={style.title} numberOfLines={1} ellipsizeMode="tail">{value}</Text>
              <CardText>{text}</CardText>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default HealthOverview;

export const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 5, // Small padding to prevent edge overflow
  },
  MinCard: {
    padding: 15,
    borderColor: '#F1F1F1',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
    width: '48%',
    minHeight: 120, 
  },
  pressedCard: {
    opacity: 0.7,
    backgroundColor: '#F8F8F8',
    transform: [{ scale: 0.98 }],
  },
  iconContainer: {
    paddingBottom: 15,
    fontSize: 24,
  },
  valueContainer: {
    paddingTop: 4,
    flex: 1, 
    justifyContent: 'flex-end', // Pushes content to bottom
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  title:{
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 3,
    color: colors.black,
    fontFamily: 'LibreFranklin_600SemiBold',
  }
});
