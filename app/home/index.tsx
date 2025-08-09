import { Texts, Title, Wrapper } from '@/components/typography/Typography'
import React from 'react'
import { View, StyleSheet  } from 'react-native'
import AppointmentCard from '@/app/home/_components/Appointment'
import Reminder from '@/app/home/_components/Reminder'
import Streak from '@/app/home/_components/Streak'
import Activities from '@/app/home/_components/Activities';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';


const HomePage = () => {

  return (
    <ScreenOverFlowLayout>
      <Wrapper>
        <View style={{borderBottomWidth: 1, borderColor: '#F2F2F2', paddingBottom: 20}}>
          <Title>
            Good Evening, Sarah 👋
          </Title>
          <Texts>
            Let's take a step toward a healthier you today.
          </Texts>
        </View>
          {/* Your Activities */}
            <Activities />
          {/* Recent Appointments */}
            <AppointmentCard />
          {/* Streak */}
            <Streak />
          {/* Reminder */}
          <Reminder />
      </Wrapper>
    </ScreenOverFlowLayout>
  )
}

export default HomePage

export const style = StyleSheet.create({
  Flex: {
    flexDirection: 'row',
    alignContent:'center',
    marginTop: 5,
    marginBottom: 2
  },
  flex: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 3
  },
  MinCard: {
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
    width: '100%',
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: '#0553',
    borderRadius: 100,
  },
  Flexs:{
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignContent: 'center'
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
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    borderColor:  '#D6D7DA',
    borderWidth: 1,
    marginTop: 14,
  },
  joinBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#DD2591',
    borderRadius: 8,
    marginTop: 14,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
 
});