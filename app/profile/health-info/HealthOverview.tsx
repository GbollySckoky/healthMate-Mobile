import React from 'react'
import { View,Text, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { healthOverviews } from '@/lib/data'
import {
    Card
} from '@/components/typography/Typography';
import { colors } from '@/lib/colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ROUTES } from '@/lib/routes';



const HealthOverview = () => {

  return (
    <View style={{marginTop: 30}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 14}}>
            <Text style={{fontSize: 14, fontWeight: '400', fontFamily: 'Lato_400Regular', color: colors.black}}>Recent Logs Snapshot</Text>
            <Link href={ROUTES.track} style={{color: colors.lightRed}}>
                View All 
                <AntDesign name="arrowright" size={15} />
            </Link>
        </View>
        <Card>
            {healthOverviews.map((health, index) => {
                const { id, title, value, icon } = health;
                const isLastItem = index === healthOverviews.length - 1;
                
                return (
                    <View 
                        key={id} 
                        style={[
                            styles.enhancedItemContainer,
                            isLastItem && styles.lastItem,
                        ]}
                    >
                    <View style={styles.textContainer}>
                        <Text style={styles.iconText}>{icon}</Text>
                        <View>
                            <Text style={styles.titleText}>{title}</Text>
                            <Text style={styles.valueText}>{value}</Text>
                        </View>
                    </View> 
                    </View>
                );
            })}
        </Card>
    </View>
  )
}

export default HealthOverview

const styles = StyleSheet.create({
    enhancedItemContainer: {
        paddingVertical: 15,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1, // Added border width
        borderBottomColor: colors.lightGray , // Better border color
        borderRadius: 2,
    },
    lastItem: {
        borderBottomWidth: 0, // Remove border from last item
    },
    textContainer: {
       flexDirection: 'row',

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
    iconText:{
        marginRight:10
    }
});