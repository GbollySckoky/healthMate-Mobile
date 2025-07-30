import { Heart,Moon, Pill, Scale, Smile } from 'lucide-react';


export const healthOverview = [
    {
        title: 'Blood Pressure',
        value: '120/80 mmHg',
        text: 'Blood Pressure',
        id: 1,
        icon:  <Heart />
    },
    {
        title: 'Mood',
        value: 'Happy',
        text: 'Feeling Great',
        id: 2,
        icon: <Smile />
    },
    {
        title: 'Sleep',
        value: '7h 30 mins',
        text: 'Quality: Good',
        id: 3,
        icon: <Moon />
    },
    {
        title: 'Weight',
        value: '765kg',
        text: 'Healthy range',
        id: 4,
        icon: <Scale />
    },
    {
        title: 'Medications',
        value: '2/3 doses',
        text: 'Taken today',
        id: 5,
        icon: <Pill />
    },
]

export const appointmentData = []