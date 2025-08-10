import { NavHeader } from '@/components/Header/Header';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import { Card, CardAmount, CardText, DetailsContainer, SubTitle, Wrapper } from '@/components/typography/Typography';
import { router } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from 'react-native';
import { medicationDosage } from '../../data';
import { Button } from '@/components/button/Button';
import MedicationModal from './MedicationModal';
import { useModal } from '@/context/ModalContext';




const Medication = () => {
  const {openModal} = useModal()

  return (
    <ScreenLayout>
    <NavHeader 
      title='Medication Log'
      _goBack={() => router.push('/(tabs)/home')}
      backIcon={<Entypo name="chevron-small-left" size={24} color="black"   />}
      text="Tracking your meds ensures better treatment..."
    />
    <ScreenOverFlowLayout>
      <Wrapper>
        <DetailsContainer>
            <MaterialCommunityIcons name="pill" size={24} color="#C11574" style={styles.icon} />
          <CardText>
            Today Dose
          </CardText>
          <CardAmount>
            2/3 doses
          </CardAmount>
          <CardText>
            Recorded on: Jun 22, 09:45
          </CardText>
          <Text style={styles.colorText}>
            Taken
          </Text>
        </DetailsContainer>
        <View style={{marginBottom: 40}}>
          <Card>
              <SubTitle>Medication History</SubTitle>
              {medicationDosage.map((recent, index) => {
                const {icon, bloodRate, date, status, time} = recent;
                const isLastItem = index === medicationDosage.length - 1;
                return(
                  <View 
                    key={index}
                    style={[
                      styles.enhancedItemContainer,
                      isLastItem && styles.lastItem
                    ]}>
                    <View style={styles.flex}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{borderColor: '#f2f2f2', borderWidth: 1, padding: 6, borderRadius: 5}}> {icon} </Text>
                        <View style={{paddingLeft: 16}}>
                          <Text style={{fontWeight: '500', fontSize: 14, color: '#414651', paddingTop: 2, fontFamily: 'Lato_400Regular'}}>{bloodRate}</Text>
                          <Text style={{fontWeight: '400', fontSize: 12, color: '#717680', paddingTop: 2, fontFamily: 'Lato_400Regular'}}>{date} at {time}</Text>
                        </View>
                      </View>
                      <Text 
                        style={{backgroundColor: `${status === 'Taken' &&  '#ECFDF3' || status === 'Missed' && '#FEF3F2'}`,
                        color: `${status === 'Taken' && '#027A48' ||  status === 'Missed' && '#B42318'}`,
                        paddingHorizontal: 15, paddingVertical: 7, borderRadius: 30, fontFamily: 'Inter_500Medium'   }}>
                          {status}</Text>
                    </View>
                  </View>
                )
              })}
          </Card>
        </View>
        </Wrapper>
      </ScreenOverFlowLayout>
        <Button _fn={() =>
         openModal(<MedicationModal />, {
          title: 'Log Medication',
          description: '',
          onClose: () => {},
          // btnText: 'Save Reading'
        })}>
          Log New Medication
        </Button>
    </ScreenLayout>
  )
}

export default Medication

const styles = StyleSheet.create({
    icon:{
        backgroundColor: '#FDF2FA',
        paddingHorizontal:15, 
        paddingVertical: 13, 
        borderRadius:100, 
        marginBottom: 10
    },
    colorText:{
        color: '#027A48', 
        backgroundColor: "#ECFDF3", 
        borderRadius: 50, 
        paddingHorizontal: 10, 
        paddingVertical: 5, 
        fontFamily: 'Inter_500Medium', 
        marginTop: 7
    },
    lastItem: {
        borderBottomWidth: 0, // Remove border from last item
    },
    enhancedItemContainer: {
        paddingTop: 5,
        borderColor: '#F2F2F2',
        borderBottomWidth: 1
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 18,
        // backgroundColor: 'red'
    },
})