import React from 'react'
import { healthData } from '@/lib/data'
import { View, Text, StyleSheet } from 'react-native';
import { NavHeader } from '@/components/Header/Header';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
import {
    Wrapper,
    Card
} from '@/components/typography/Typography';
import { colors } from '@/lib/colors';
import HealthOverview from './HealthOverview';
import SafeArea from '@/components/safeAreaView/SafeAreaView';


const HealthDataScreen = () => {
    const router = useRouter();
    
    const handleGoBack = () => {
        router.back(); 
    };

    return (
        <SafeArea>
            <ScreenLayout>
                <NavHeader
                    title="My Health Info" 
                    _goBack={handleGoBack}
                    backIcon={<Entypo name="chevron-small-left" size={24} color="black" />}
                />
                <ScreenOverFlowLayout>
                    <Wrapper>
                        <Card>
                            {healthData.map((health, index) => {
                                const { id, title, value, icon } = health;
                                const isLastItem = index === healthData.length - 1;
                                
                                return (
                                    <View 
                                        key={id} 
                                        style={[
                                            styles.enhancedItemContainer,
                                            isLastItem && styles.lastItem,
                                        ]}
                                    >
                                        <View style={styles.textContainer}>
                                            <Text style={styles.titleText}>{title}</Text>
                                            <Text style={styles.valueText}>{value}</Text>
                                        </View>
                                        <Text style={styles.iconText}>{icon}</Text>
                                    </View>
                                );
                            })}
                        </Card>
                        {/* Health Overview */}
                        <HealthOverview />
                    </Wrapper>
                </ScreenOverFlowLayout>
            </ScreenLayout>
        </SafeArea>
    );
};

export default HealthDataScreen;

const styles = StyleSheet.create({
    enhancedItemContainer: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1, // Added border width
        borderBottomColor: colors.lightGray , // Better border color
        borderRadius: 2,
    },
    lastItem: {
        borderBottomWidth: 0, // Remove border from last item
    },
    textContainer: {
        flex: 1, // Allow text to take available space
    },
    titleText: {
        color: colors.lightBlack,
        fontWeight: '600',
        fontFamily: 'Lato_700Bold',
        fontSize: 14,
    },
    valueText: {
        fontWeight: '400',
        fontSize: 14,
        marginTop: 4,
        fontFamily: 'Lato_400Regular',
        color: colors.gray,
    },
    iconText: {
        marginLeft: 10, // Add some spacing from text
    },
});