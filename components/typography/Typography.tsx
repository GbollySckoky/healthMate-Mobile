import React from "react"
import { Text, ViewStyle, View } from "react-native"
import { StyleSheet } from "react-native"

export const Title = ({children}:{children: React.ReactNode}) => {
    return <Text style={style.Title}> {children}</Text>
}

export const Texts = ({children}:{children: React.ReactNode}) => (
    <Text  style={style.Text} className="bg-red-900">
        {children}
    </Text>
)

export const SubTitle = ({children}:{children: React.ReactNode}) => {
    return <Text className="font-semibold text-[14px] text-[#414651]">
        {children}
    </Text>
}   

export const Card = ({children}: {children:React.ReactNode}) => (
    <View style={style.Card} >
        {children}
    </View>
)

export const Wrapper = ({children}: {children:React.ReactNode}) => (
    <View style={style.Wrapper}>
        {children}
    </View>
)

export const CardTitle = ({children}: {children:React.ReactNode}) => (
    <Text style={style.CardTitle}>
        {children}
    </Text>
)

export const CardText = ({children}: {children:React.ReactNode}) => (
    <Text style={style.CardText}>
        {children}
    </Text>
)

export const MinCard = ({children, style}: {children:React.ReactNode, style: ViewStyle}) => (
    <View style={style}>
        {children}
    </View>
)

export const style = StyleSheet.create({
    Title:{
        fontSize: 18,
        fontWeight: 600,
        marginBottom: 5,
        fontFamily: 'Libre-Franklin'
    },
    Wrapper:{
        width: '95%',
        marginLeft: 'auto',
        marginRight:'auto',
        marginTop: 15,
        color: '#414651',
    },
    Text: {
        // fontFamily: 'Libre-Franklin',
        fontSize: 14,
        color: '#717680',
        fontStyle: 'normal',
        fontWeight: 400
    },
    SubTitle: {
        fontFamily: 'Libre-Franklin',
        fontSize: 14,
        color: '#414651',
        fontWeight: 600
    },
    CardTitle: {
        fontFamily: 'Inter',
        fontSize: 12,
        color: '#414651',
        fontStyle: 'normal',
        fontWeight: 400
    },
    CardText: {
        fontFamily: 'Inter',
        fontSize: 10,
        color: '#717680',
        fontWeight: 400
    },
    Card: {
        padding: 15,
        borderColor: '#F1F1',
        borderWidth: 1,
        borderRadius: 10 ,
    }
})

