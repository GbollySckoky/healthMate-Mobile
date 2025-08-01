import React from "react"
import { Text, ViewStyle, View, TouchableOpacity, StyleSheet } from "react-native"

export const Title = ({children}:{children: React.ReactNode}) => {
    return <Text style={style.Title}>{children}</Text>
}

export const MinTitle = ({children}:{children: React.ReactNode}) => {
    return <Text style={style.MinTitle}>{children}</Text>
}

export const Texts = ({children}:{children: React.ReactNode}) => (
    <Text  style={style.Text} className="bg-red-900">
        {children}
    </Text>
)

export const SubTitle = ({children}:{children: React.ReactNode}) => {
    return <Text style={style.SubTitle}>
        {children}
    </Text>
}   

export const SubTitles = ({children}:{children: React.ReactNode}) => {
    return <Text style={style.SubTitles}>
        {children}
    </Text>
}   

export const Card = ({children}: {children:React.ReactNode}) => (
    <View style={style.Card}>
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

export const ButtonFlex = ({children}:{children: React.ReactNode}) => ( 
    <View style={style.ButtonRow}>
        {children}
    </View>
)

export const BtnFlex = ({children}:{children: React.ReactNode}) => ( 
    <View style={style.ButtonFlex}>
        {children}
    </View>
)

export const RescheduleBtn = ({children}:{children: React.ReactNode}) => (
    <TouchableOpacity style={style.rescheduleBtn}>
    <Text style={[style.buttonText, {color: '#252B37'}]}>{children}</Text>
    </TouchableOpacity> 
)

export const JoinBtn = ({children}:{children: React.ReactNode}) => (
    <TouchableOpacity style={style.joinBtn}>
    <Text style={[style.buttonText, {color: 'white'}]}>{children}</Text>
    </TouchableOpacity>
)


export const style = StyleSheet.create({
    Title:{
        fontSize: 18,
        fontWeight: 600,
        marginBottom: 5,
        fontFamily: 'Libre-Franklin'
    },
    MinTitle:{
        fontSize: 18,
        fontWeight: 600,
        // marginBottom: 5,
        fontFamily: 'Libre-Franklin'
    },
    Wrapper:{
        width: '95%',
        marginLeft: 'auto',
        marginRight:'auto',
        marginTop: 15,
        color: '#414651',
        paddingBottom: 20,
    },
    Text: {
        // fontFamily: 'Libre-Franklin',
        fontSize: 14,
        color: '#717680',
        fontStyle: 'normal',
        fontWeight: 400
    },
    SubTitles: {
        // fontFamily: 'Libre-Franklin',
        fontSize: 14,
        color: '#414651',
        fontStyle: 'normal',
        fontWeight: 500,
        marginBottom: 10,
        marginTop: 10
    },
    SubTitle: {
        // fontFamily: 'Libre-Franklin',
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
        // backgroundColor: 'red'
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
        borderRadius: 10,
        backgroundColor: 'white'
    },
    ButtonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        gap: 10,
        borderTopColor: '#F8F8F8',
        borderTopWidth: 2,
        marginTop: 15
    },
    ButtonFlex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginTop: 45,
    },
    rescheduleBtn: {
        flex: 1,
        paddingVertical: 12,
        backgroundColor: '#FAFAFA',
        borderRadius: 8,
        borderColor: '#D6D7DA',
        borderWidth: 1,
        alignItems: 'center',
      },
      joinBtn: {
        flex: 1,
        paddingVertical: 12,
        backgroundColor: '#DD2591',
        borderRadius: 8,
        alignItems: 'center',
      },
      buttonText: {
        fontSize: 14,
        fontWeight: '600',
      },
})

