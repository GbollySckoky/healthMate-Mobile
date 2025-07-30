import { Card, CardText, CardTitle, MinCard, SubTitle, Texts, Title, Wrapper } from '@/components/typography/Typography'
import React from 'react'
import { Text, View, ScrollView, TouchableOpacity  } from 'react-native'
import { healthOverview } from './data'
import { StyleSheet } from 'react-native'
// import { Clock4 } from 'lucide-react';
import { Image } from 'expo-image'
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';



const Home = () => {
  return (
    <Wrapper>
        <Title>
          Good Evening, Sarah
        </Title>
        <Texts>
          Let's take a step toward a healthier you today.
        </Texts>
        {/* Your Activities */}
        <SubTitle>
          Your Health Overview
        </SubTitle>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={style.Flex}
          style={style.Flex}>
            {healthOverview.map((health) => {
              const {title, id,text, value} = health;
              return(
                <MinCard key={id} style={style.MinCard}>
                  <CardTitle>
                    {title}
                  </CardTitle>
                  <Title>
                    {value}
                  </Title>
                  <CardText>
                    {text}
                  </CardText>
                </MinCard>
              )
            })}
        </ScrollView >

        {/* Reacent Appointment */}
        <SubTitle>
        Recent Appointments
        </SubTitle>
        <Card>
          <View style={style.Flex}>
              <View style={{width: 50}}>
              <Image 
              style={style.image}
              source={{ uri: "https://picsum.photos/seed/696/3000/2000" }}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
              />
              </View>
              <View style={style.Flexs}>
                <View style={{marginLeft: 5}}>
                  <SubTitle>
                    Dr James Uche
                  </SubTitle>
                  <View style={[style.flex,{marginTop: 5}]}>
                    <View style={{marginRight: 6}}>
                      <Feather name="clock" size={16} color="#717680" />
                    </View>
                    <Texts>
                      2:00pm | June 15
                    </Texts>
                  </View>
                  <View style={[style.flex,{marginTop: 5}]}>
                    <View style={{marginRight: 6}}>
                      <Feather name="video" size={16} color="#717680" />
                    </View>
                    <Texts>
                      Video Call Consultation 
                    </Texts>
                  </View>
                </View>
                <Text 
                style={{color:'#5924DC', backgroundColor: '#F4F3FF', borderRadius: 10, padding: 5, fontWeight: 500, fontSize: 12}}>
                  Starts in 15mins
                </Text>
              </View>
          </View>
          <View style={style.ButtonRow}>
            <TouchableOpacity style={style.rescheduleBtn}>
              <Text style={style.buttonText}>Reschedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.joinBtn}>
              <Text style={style.buttonText}>Join Call</Text>
            </TouchableOpacity>
          </View>
        </Card>
        {/* Streak */}
        <View style={style.SubCard}>
          <SubTitle>
            3 days Streak! 
          </SubTitle>
          <SubTitle>
            Consistency is key – you're doing great!
          </SubTitle>
          <CardTitle>
          Every log brings you closer to better health.
          </CardTitle>
        </View>
    </Wrapper>
    
  )
}
export default Home

export const style = StyleSheet.create({
  Flex: {
    flexDirection: 'row',
    alignContent:'center'
  },
  flex: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 3
  },
  MinCard: {
    // width: 200,
    padding: 15,
    borderColor: '#F1F1F1',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginRight: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  SubCard: {
    // width: 200,
    padding: 15,
    borderColor: '#F1F1F1',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#F4ECFF',
    marginRight: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  image: {
    width: 45,
    height: 40,
    backgroundColor: '#0553',
    borderRadius: 100,
  },
  Flexs:{
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between'
  },
  Text: {
    fontFamily: 'Libre-Franklin',
    fontWeight: 500,
    fontSize: 12
  },
  ButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    borderTopColor: '#F8F8F8',
    borderTopWidth: 2,
    marginTop: 15
  },
  rescheduleBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#EEE',
    borderRadius: 8,
    borderColor: '#D6D7DA',
    borderWidth: 1,
    marginTop: 14,
  },
  joinBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F670C8',
    borderRadius: 8,
    marginTop: 14,
    color: '#FAFAFA'
  },
  buttonText: {
    color: '#252B37',
    fontSize: 14,
    fontWeight: '600',
    
  },
  
});
