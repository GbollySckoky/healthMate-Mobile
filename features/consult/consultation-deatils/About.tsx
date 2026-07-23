import { SubTitle } from '@/components/typography/Typography';
import { colors } from '@/lib/colors';
import React from 'react';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { ROUTES } from '@/lib/routes';
import { Consultation } from '@/lib/interface/consultation';

const getConsultationIcon = (type: string) => {
  if (type === 'video_call') {
    return <Feather name="video" size={14} color={colors.gray} />;
  }

  if (type === 'audio_call') {
    return <MaterialIcons name="multitrack-audio" size={14} color={colors.gray} />;
  }

  return <Ionicons name="walk" size={14} color={colors.gray} />;
};

const formatConsultationType = (type: string) => {
  if (type === 'video_call') return 'Video Call';
  if (type === 'audio_call') return 'Audio Call';
  if (type === 'in_person') return 'Physical Appointment';

  return type;
};

const About = ({ consultation }: { consultation: any }) => {
  return (
    <View
      style={{
        marginTop: 30,
        borderTopWidth: 1,
        borderTopColor: '#F2F2F2',
        paddingTop: 20,
        marginBottom: 50,
      }}
    >
      <MinCard title="About" value={consultation?.profile?.bio || 'No bio available'} />

      <View style={{ marginTop: 28 }}>
        <SubTitle>Availability</SubTitle>

        {consultation?.availability?.length > 0 ? (
          <View style={{ marginTop: 12, gap: 14 }}>
            {consultation.availability.map((item: Consultation) => (
              <View
                key={item.id}
                style={{
                  backgroundColor: colors.white,
                  borderWidth: 1,
                  borderColor: colors.broderColor,
                  borderRadius: 14,
                  padding: 14,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'LibreFranklin_600SemiBold',
                    color: colors.black,
                    marginBottom: 12,
                  }}
                >
                  {item.dayOfWeek}
                </Text>

                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'Inter_400Regular',
                    color: colors.gray,
                    marginBottom: 8,
                  }}
                >
                  Time Slots
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 8,
                    marginBottom: 14,
                  }}
                >
                  {item.availableTimeSlots?.map((slot: string) => (
                    <Chip key={slot} label={slot} />
                  ))}
                </View>

                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'Inter_400Regular',
                    color: colors.gray,
                    marginBottom: 8,
                  }}
                >
                  Consultation Types
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 8,
                  }}
                >
                  {item.consultationType?.map((type: string) => (
                    <IconChip
                      key={type}
                      label={formatConsultationType(type)}
                      icon={getConsultationIcon(type)}
                    />
                  ))}
                </View>
              </View>
            ))}
          </View>
        ) : (
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Inter_400Regular',
              marginTop: 8,
              color: colors.gray,
            }}
          >
            No availability added yet.
          </Text>
        )}
      </View>

      <View style={{ marginTop: 28 }}>
        <SubTitle>Consultation Fee</SubTitle>
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'LibreFranklin_600SemiBold',
            marginTop: 6,
            color: colors.green,
          }}
        >
          ₦{consultation?.profile?.consultationFee.toLocaleString() || '0'}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: '#DD2590',
          paddingVertical: 14,
          borderRadius: 12,
          marginTop: 28,
        }}
        activeOpacity={0.8}
        onPress={() => router.push(ROUTES.bookDoctors)}
      >
        <Text
          style={{
            color: colors.white,
            textAlign: 'center',
            fontFamily: 'LibreFranklin_600SemiBold',
            fontSize: 16,
          }}
        >
          Book Consultation
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default About;

const Chip = ({ label }: { label: string }) => (
  <View
    style={{
      backgroundColor: '#FAFAFA',
      borderWidth: 1,
      borderColor: colors.broderColor,
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 7,
    }}
  >
    <Text
      style={{
        fontSize: 13,
        fontFamily: 'Inter_400Regular',
        color: colors.black,
      }}
    >
      {label}
    </Text>
  </View>
);

const IconChip = ({ label, icon }: { label: string; icon: React.ReactNode }) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      backgroundColor: '#FAFAFA',
      borderWidth: 1,
      borderColor: colors.broderColor,
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 7,
    }}
  >
    {icon}

    <Text
      style={{
        fontSize: 13,
        fontFamily: 'Inter_400Regular',
        color: colors.black,
      }}
    >
      {label}
    </Text>
  </View>
);

const MinCard = ({
  title,
  value,
  text,
}: {
  title: string;
  value?: string;
  text?: string;
}) => (
  <View style={{ marginTop: 5 }}>
    <SubTitle>{title}</SubTitle>

    {text && (
      <Text
        style={{
          fontSize: 14,
          fontFamily: 'Inter_400Regular',
          marginTop: 6,
          color: colors.black,
        }}
      >
        {text}
      </Text>
    )}

    <Text
      style={{
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        marginTop: 6,
        color: colors.gray,
        lineHeight: 21,
      }}
    >
      {value}
    </Text>
  </View>
);