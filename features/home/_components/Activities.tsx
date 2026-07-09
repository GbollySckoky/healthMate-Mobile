import {
  CardText,
  CardTitle,
  MinCard,
  SubTitle,
  Title,
} from '@/components/typography/Typography';
import React, { useCallback } from 'react';
import { healthOverview } from '@/lib/data';
import { ScrollViewHorizontal } from '@/components/scrollView/ScrollViewHorizontal';
import { Href, useRouter } from 'expo-router';
import { Text, View, Pressable, StyleSheet } from 'react-native';

const Activities = () => {
  const router = useRouter();

  const handlePress = useCallback(
    (url: string) => {
      router.push(url as Href);
    },
    [router]
  );
  return (
    <View>
      <SubTitle>Your Health Overview</SubTitle>
      <ScrollViewHorizontal>
        {healthOverview.map((health) => {
          const { title, id, text, value, icon, url } = health;
          return (
            <Pressable onPress={() => handlePress(url)} key={id}>
              <MinCard style={style.MinCard}>
                <Text style={{ paddingBottom: 15 }}>{icon}</Text>
                <CardTitle>{title}</CardTitle>
                <View style={{ paddingTop: 4 }}>
                  <Title>{value}</Title>
                  <CardText>{text}</CardText>
                </View>
              </MinCard>
            </Pressable>
          );
        })}
      </ScrollViewHorizontal>
    </View>
  );
};

export default Activities;

export const style = StyleSheet.create({
  MinCard: {
    padding: 15,
    borderColor: '#F1F1F1',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    width: 200,
  },
});
