import { Heart,Moon, Pill, Scale, Smile } from 'lucide-react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export const healthOverview = [
    {
        title: 'Blood Pressure',
        value: '120/80 mmHg',
        text: 'Blood Pressure',
        id: 1,
        icon:  <AntDesign name="hearto" size={24} color="red" />
    },
    {
        title: 'Mood',
        value: 'Happy',
        text: 'Feeling Great',
        id: 2,
        icon: <Feather name="smile" size={24} color="#FFC847" />
    },
    {
        title: 'Sleep',
        value: '7h 30 mins',
        text: 'Quality: Good',
        id: 3,
        icon: <FontAwesome name="moon-o" size={24} color="black" />
    },
    {
        title: 'Weight',
        value: '765kg',
        text: 'Healthy range',
        id: 4,
        icon: <FontAwesome name="balance-scale" size={24} color="blue" />
    },
    {
        title: 'Medications',
        value: '2/3 doses',
        text: 'Taken today',
        id: 5,
        icon: <MaterialCommunityIcons name="pill" size={24} color="black" />
    },
]

export const appointmentData = []