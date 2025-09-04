import { SubTitle } from '@/components/typography/Typography'
import { colors } from '@/lib/colors'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollViewHorizontal } from '@/components/scrollView/ScrollViewHorizontal';
import { router } from 'expo-router';
import { ROUTES } from '@/lib/routes';

const About = () => {
    const data = {
        about: 'I am a General Practitioner with over 8 years experience. I help patients manage chronic migraines and sleep issues with comprehensive care approaches.',
        time: 'Available: Monday–Friday',
        request: 'Usually available within 24 hours of request',
        fee: '₦10,000',
        consultationTypes: [
            {
                id: 'video',
                icon: <Feather name="video" size={13} color={colors.gray}/>,
                type: 'Video Call'
            },
            {
                id: 'audio',
                icon: <MaterialIcons name="multitrack-audio" size={13} color={colors.gray} />,
                type: 'Audio Call'
            },
            {
                id: 'physical',
                icon: <Ionicons name="walk" size={13} color={colors.gray} />,
                type: 'Physical Appointment'
            },
        ]
    }
    const id = '1'
    return (
        <View style={{ marginTop: 30, borderTopWidth: 1, borderTopColor: '#F2F2F2', marginBottom: 50 }}>
            <MinCard
                title="About"
                value={data.about}
            />
            <MinCard
                title="Availability"
                text={data.time}
                value={data.request}
            />
            <View style={{ marginTop: 20 }}>
                <SubTitle>Consultation Types</SubTitle>
                <ScrollViewHorizontal>
                    <View style={{ 
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        gap: 10,
                        paddingVertical: 5 
                    }}>
                        {data.consultationTypes.map((consult) => (
                            <View 
                                key={consult.id} 
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: colors.white,
                                    padding: 10,
                                    borderWidth: 1,
                                    borderColor: colors.broderColor,
                                    borderRadius: 8,
                                    gap: 6
                                }}
                            >
                                {consult.icon}
                                <Text style={{
                                    fontSize: 14,
                                    fontFamily: 'LibreFranklin_400Regular',
                                    color: colors.black
                                }}>
                                    {consult.type}
                                </Text>
                            </View>
                        ))}
                    </View>
                </ScrollViewHorizontal>
            </View>
            <View style={{ marginTop: 20 }}>
                <SubTitle>Consultation Fee</SubTitle>
                <Text style={{
                    fontSize: 18,
                    fontFamily: 'LibreFranklin_600SemiBold',
                    marginTop: 6,
                    color: colors.green
                }}>
                    {data.fee}
                </Text>
            </View>
            <TouchableOpacity 
                style={{
                    backgroundColor: '#DD2590',
                    paddingVertical: 12,
                    borderRadius: 10,
                    marginTop: 25
                }}
                activeOpacity={0.8}
                onPress={() => router.push(ROUTES.bookDoctors)}
            >
                <Text style={{
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: '600',
                    fontSize: 16
                }}>
                    Book Consultation
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default About

const MinCard = ({ title, value, text }: { title: string, value: string, text?: string }) => (
    <View style={{ marginTop: 20 }}>
        <SubTitle>{title}</SubTitle>
        {text && (
            <Text style={{
                fontSize: 14,
                fontFamily: 'Inter_400Regular',
                marginTop: 6,
                color: colors.black
            }}>
                {text}
            </Text>
        )}
        <Text style={{
            fontSize: 14,
            fontFamily: 'Inter_400Regular',
            marginTop: 6,
            color: colors.gray
        }}>
            {value}
        </Text>
    </View>
)