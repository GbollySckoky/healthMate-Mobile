import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';


export const healthOverview = [
    {
        title: 'Blood Pressure',
        value: '120/80 mmHg',
        text: 'Blood Pressure',
        id: 1,
        icon:  <AntDesign name="hearto" size={24} color="#DF0000" />,
        url: '/blood-pressure'
    },
    {
        title: 'Mood',
        value: 'Happy',
        text: 'Feeling Great',
        id: 2,
        icon: <Feather name="smile" size={24} color="#FFC847" />,
        url: "/"
    },
    {
        title: 'Sleep',
        value: '7h 30 mins',
        text: 'Quality: Good',
        id: 3,
        icon: <FontAwesome name="moon-o" size={24} color="black" />,
        url: '/sleep-log'
    },
    {
        title: 'Weight',
        value: '765kg',
        text: 'Healthy range',
        id: 4,
        icon: <FontAwesome name="balance-scale" size={24} color="blue" />,
        url: "/"
    },
    {
        title: 'Medications',
        value: '2/3 doses',
        text: 'Taken today',
        id: 5,
        icon: <MaterialCommunityIcons name="pill" size={24} color="#C11574" />,
        url: "/medication"
    },
]

export const allAppointmentData = [
    {
        id: 'dr-james-uche-june1',
        doctorName: 'Dr James Uche',
        date: 'June 15',
        time: '2:00pm',
        type: 'Video Call Consultation',
        status: 'Starts in 15mins'
    },
    {
        id: 'dr-james-uche-jun',
        doctorName: 'Dr James Uche',
        date: 'June 15',
        time: '2:00pm',
        type: 'Video Call Consultation',
        status: 'Starts in 15mins'
    },
    {
        id: 'dr-james-ucjune15',
        doctorName: 'Dr James Uche',
        date: 'June 15',
        time: '2:00pm',
        type: 'Video Call Consultation',
        status: 'Starts in 15mins'
    },
    {
        id: 'dr-es-uche-june15',
        doctorName: 'Dr James Uche',
        date: 'June 15',
        time: '2:00pm',
        type: 'Video Call Consultation',
        status: 'Starts in 15mins'
    },
    {
        id: 'dr-jaes-june15',
        doctorName: 'Dr James Uche',
        date: 'June 15',
        time: '2:00pm',
        type: 'Video Call Consultation',
        status: 'Starts in 15mins'
    },
]

export const trackData = [
    {
      med: 'Take Vitamin C',
      time: '10:55am',
      id: '1',
      icon: <MaterialCommunityIcons name="pill" size={24} color="black" />
    },
    {
      med: 'Track Sleep',
      time: '10:55am',
      id: '2',
      icon: <Entypo name="moon" size={24} color="#FFC847" />
    },
]

export const sleepLogHistory = [
    {
        icon: <Entypo name="moon" size={24} color="#FFC847" />,
        hour: '8.25h',
        date: 'Jun 22',
        status: 'Excellent',
        time: '22:45 - 07:00'
    },
    {
        icon: <Entypo name="moon" size={24} color="#FFC847" />,
        hour: '6.25h',
        date: 'Jun 22',
        status: 'Excellent',
        time: '22:45 - 07:00'
    },
    {
        icon: <Entypo name="moon" size={24} color="#FFC847" />,
        hour: '8.25h',
        date: 'Jun 22',
        status: 'Low',
        time: '22:45 - 07:00'
    },
    {
        icon: <Entypo name="moon" size={24} color="#FFC847" />,
        hour: '8.25h',
        date: 'Jun 22',
        status: 'Average',
        time: '22:45 - 07:00'
    },
]

export const recenntReadings = [
    {
        icon: <FontAwesome name="stethoscope" size={24} color="#DF0000" />,
        bloodRate: '120/80 mmHg',
        date: 'Jun 22 ',
        status: 'Normal',
        time: '09:45'
    },
    {
        icon: <FontAwesome name="stethoscope" size={24} color="#DF0000" />,
        bloodRate: '118/79 mmHg',
        date: 'Jun 23',
        status: 'High',
        time: '22:45 '
    },
    {
        icon: <FontAwesome name="stethoscope" size={24} color="#DF0000" />,
        bloodRate: '118/93 mmHg',
        date: 'Jun 22',
        status: 'High',
        time: '7:00'
    },
    {
        icon: <FontAwesome name="stethoscope" size={24} color="#DF0000" />,
        hour: '120/80 mmHg',
        date: 'Jun 22',
        status: 'Normal',
        time: '22:45'
    },
]

export const medicationDosage = [
    {
        icon: <MaterialCommunityIcons name="pill" size={24} color="#C11574"  />,
        bloodRate: 'Metformin 1000mg',
        date: 'Jun 22 ',
        status: 'Taken',
        dosage: '1 dose',
        time: '9: 45am'
    },
    {
        icon: <MaterialCommunityIcons name="pill" size={24} color="#C11574"  />,
        bloodRate: 'Metformin 5000mg',
        date: 'Jun 22 ',
        status: 'Missed',
        dosage: '2 dose',
        time: '9: 45am'
    },
]