import React from 'react'
import { trackData } from '@/lib/data';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { NavHeader } from '@/components/Header/Header';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
import {
    Card,
    Wrapper,
} from '@/components/typography/Typography';
import SafeArea from '@/components/safeAreaView/SafeAreaView';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors } from '@/lib/colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ROUTES } from '@/lib/routes';
import useTracker from '@/hooks/useTrackers';
import EditModal from './EditModal';


const index = () => {
    const router = useRouter();
    const {displayComponents, handleDisplayComponent} = useTracker()
    const handleGoBack = () => {
        router.back(); 
    };
  return (
    <SafeArea>
    <ScreenLayout>
      <NavHeader
        title="My Reminders"
        _goBack={handleGoBack}
        backIcon={<Entypo name="chevron-small-left" size={24} color="black" />}
      />
      <ScreenOverFlowLayout>
        <Wrapper>
          <View style={{ marginBottom: 35 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                fontFamily: 'Lato_400Regular',
                color: colors.black,
                marginBottom: 7,
              }}
            >
              Recent Logs Snapshot
            </Text>
            <Card>
              {trackData.map((data, index) => {
                const { id, med, time, icon } = data;
                const isLastItem = index === trackData.length - 1;
                return (
                  <View
                    key={id}
                    style={[styles.card, isLastItem && styles.lastItem]}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignContent: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                        <Text
                          style={{
                            backgroundColor: '#FDF2FA',
                            padding: 5,
                            borderRadius: 4,
                          }}
                        >
                          {icon}
                        </Text>
                        <View style={{ paddingLeft: 15 }}>
                          <Text
                            style={{
                              fontWeight: '500',
                              fontSize: 14,
                              fontFamily: 'Lato_400Regular',
                            }}
                          >
                            {med}
                          </Text>
                          <Text
                            style={{
                              color: '#717680',
                              fontWeight: '400',
                              fontSize: 12,
                              paddingTop: 3,
                              fontFamily: 'Lato_400Regular',
                            }}
                          >
                            {time}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity onPress={() => handleDisplayComponent('1')}>
                        <MaterialIcons name="edit" size={15} color={colors.gray} />
                      </TouchableOpacity>
                      
                    </View>
                  </View>
                );
              })}
            </Card>
          </View>
        </Wrapper>
      </ScreenOverFlowLayout>
  

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push(ROUTES.addReminder)}
      >
        <AntDesign name="plus" size={20} color="white" />
        <Text style={styles.addButtonText}>Add New Reminder</Text>
      </TouchableOpacity>
    </ScreenLayout>
    {displayComponents === '1' &&(
        <EditModal handleDisplayComponent={handleDisplayComponent}/>
    )}
  </SafeArea>
  
  )
}

export default index

const styles = StyleSheet.create({
    card:
        {
            paddingTop: 15,
            paddingBottom: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#F2F2F2',
        },
        lastItem: {
            borderBottomWidth: 0, // Remove border from last item
        },
        addButton: {
            position: 'absolute',
            bottom: 20,
            right: 20,
            backgroundColor: '#DD2590',
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 12,
            paddingHorizontal: 16,
            elevation: 3, // shadow for Android
            shadowColor: '#000', // shadow for iOS
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
        },
        addButtonText: {
            color: 'white',
            fontFamily: 'Inter_600SemiBold',
            fontSize: 14,
            fontWeight: '600',
            marginLeft: 6,
        },
    })