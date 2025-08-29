import { SmallText } from '@/components/typography/Typography'
import { colors } from '@/lib/colors'
import React from 'react'
import { Text, View } from 'react-native'

const Summary = () => {
    const data = [
        {
            text: 'Date',
            value: '30/10/2025'
        },
        {
            text: 'Time',
            value: '2:00pm'
        },
        {
            text: 'Type',
            value: 'Audio Call'
        },
    ]
  return (
    <View style={{marginBottom: 30}}>
        <View style={{
            backgroundColor: colors.white, 
            borderWidth: 1, 
            borderColor: colors.broderColor, 
            borderRadius: 5, 
            padding: 10
        }}>
            <View style={{paddingBottom: 10}}>
                {data.map((data, index) => (
                    <View key={index} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 4}}>
                        <SmallText>{data.text}</SmallText>
                        <Text style={{fontWeight: '500', fontFamily: 'LibreFranklin_400Regular', fontSize: 14}}>
                            {data.value}
                        </Text>
                    </View>
                ))}
            </View>
            <View style={{
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                borderTopWidth: 1, 
                borderTopColor: colors.broderColor, 
                // borderStyle: 'dashed',
                paddingVertical: 10
            }}>
                <SmallText>Total</SmallText>
                <Text style={{fontWeight: '500', fontFamily: 'LibreFranklin_400Regular', fontSize: 14}}>
                    NGN 10,000  
                </Text>
            </View>
        </View>
        {/* Health Concern */}
        <View style={{
            backgroundColor: colors.white, 
            borderWidth: 1, 
            borderColor: colors.broderColor, 
            borderRadius: 5, 
            padding: 10,
            marginTop: 25
        }}>
        <Text style={{fontWeight: '500', fontFamily: 'Lato_400Regular', fontSize: 14, color: colors.black, marginTop: 7}}>
            Health Concern
        </Text>
        <Text style={{fontWeight: '400', fontFamily: 'Lato_400Regular', fontSize: 14, color: colors.gray, marginTop: 7}}>
            I am have been having pains on my lower abdomen for weeks now, i have taken medications prescribed 
            by a Pharmacist but it has gotten worser. when i try to urinate i feel a sharp pain.
        </Text>
        </View>
    </View>
  )
}

export default Summary