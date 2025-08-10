import { CardText, CardTitle, MinCard, SubTitle, Title } from '@/components/typography/Typography'
import React, {useCallback} from 'react'
import { healthOverview } from '../../data'
import { ScrollViewHorizontal } from '@/components/scrollView/ScrollViewHorizontal'
import { useLinkTo } from '@react-navigation/native';
import { Text, View, Pressable, StyleSheet  } from 'react-native'




const Activities = () => {
    const linkTo = useLinkTo()
    
    // Optimized navigation handler
    const handlePress = useCallback((url: string) => {
        linkTo(url)
    }, [linkTo])
  return (
    <View style={{marginTop: 20}}>
    <SubTitle>
      Your Health Overview
    </SubTitle>
    <ScrollViewHorizontal>
        {healthOverview.map((health) => {
          const {title, id,text, value, icon, url} = health;
          return(
            <Pressable onPress={() => linkTo(url)} key={id} >
              <MinCard  style={style.MinCard} >
                <Text style={{paddingBottom: 15}}>
                  {icon}
                </Text>
                <CardTitle>
                  {title}
                </CardTitle>
                <View style={{paddingTop: 4}}>
                  <Title>
                    {value}
                  </Title>
                  <CardText>
                    {text}
                  </CardText>
                </View>
              </MinCard>
            </Pressable>
          )
        })}
    </ScrollViewHorizontal >
    </View>
  )
}

export default Activities

export const style = StyleSheet.create({
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
})