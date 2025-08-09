import { Card, CardText, CardTitle, MinCard, Status, SubTitle, Texts, Title, Wrapper } from '@/components/typography/Typography'
import { Text, View, ScrollView, TouchableOpacity, Pressable, StyleSheet  } from 'react-native'



const Streak = () => {
  return (
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
  )
}

export default Streak

export const style = StyleSheet.create({
    SubCard: {
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
        marginTop: 15
    },
})