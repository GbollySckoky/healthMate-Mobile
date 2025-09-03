import { colors } from '@/lib/colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';



export const healthData = [
    {
        title: 'Chronic Condition',
        value: 'Hypertension',
        icon: <MaterialIcons name="edit" size={15} color={colors.gray} />,
        id: 1
    },
    {
        title: 'Medications',
        value: 'Amlodipine,5mg,daily',
        id: 2
    },
    {
        title: 'Allergies',
        value: 'Penicillin',
        icon: <MaterialIcons name="edit" size={15} color={colors.gray} />,
        id: 3
    },
    {
        title: 'Goal Weight',
        value: '65kg',
        icon: <MaterialIcons name="edit" size={15} color={colors.gray} />,
        id: 4
    },
]


export const healthOverview = [
    {
      title: 'Blood Pressure',
      value: '120/80 mmHg',
      text: 'Blood Pressure',
      id: 1,
      icon: <AntDesign name="hearto" size={18} color="#DF0000" />,
      url: '/(track)/blood-pressure',
    },
    {
      title: 'Mood',
      value: 'Happy',
      text: 'Feeling Great',
      id: 2,
      icon: <Feather name="smile" size={18} color="#FFC847" />,
      url: '/(track)/mood',
    },
    {
      title: 'Sleep',
      value: '7h 30 mins',
      text: 'Quality: Good',
      id: 3,
      icon: <FontAwesome name="moon-o" size={24} color="black" />,
      url: '/(track)/sleep-log',
    },
    {
      title: 'Weight',
      value: '765kg',
      text: 'Healthy range',
      id: 4,
      icon: <FontAwesome name="balance-scale" size={18} color="blue" />,
      url: '/(track)/weight',
    },
    {
      title: 'Medications',
      value: '2/3 doses',
      text: 'Taken today',
      id: 5,
      icon: <MaterialCommunityIcons name="pill" size={18} color="#C11574" />,
      url: '/(track)/medication',
    },
  ];

  export const reminderData = {
    title:{
      placeholder: 'e.g Medication',
      label: 'Title',
    },
    type:{
      placeholder:'Medication',
      label: 'Type',
      options:[
        'Medication',
        'BP Check',
        'Sleep',
        'Weight',
        'Mood',
        'Custom'
      ]
    },
    frequency:{
      placeholder:'Daily',
      label: 'Frequency',
      options:[
        'Daily',
        'Weekly',
      ]
    }
  }