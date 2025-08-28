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
    icon: <AntDesign name="hearto" size={24} color="#DF0000" />,
    url: '/(track)/blood-pressure',
  },
  {
    title: 'Mood',
    value: 'Happy',
    text: 'Feeling Great',
    id: 2,
    icon: <Feather name="smile" size={24} color="#FFC847" />,
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
    icon: <FontAwesome name="balance-scale" size={24} color="blue" />,
    url: '/(track)/weight',
  },
  {
    title: 'Medications',
    value: '2/3 doses',
    text: 'Taken today',
    id: 5,
    icon: <MaterialCommunityIcons name="pill" size={24} color="#C11574" />,
    url: '/(track)/medication',
  },
];

export const allAppointmentData = [
  {
    id: 'dr-james-uche-june1',
    doctorName: 'Dr James Uche',
    date: 'June 15',
    time: '2:00pm',
    type: 'Video Call Consultation',
    status: 'Starts in 15mins',
  },
  {
    id: 'dr-james-uche-jun',
    doctorName: 'Dr James Uche',
    date: 'June 15',
    time: '2:00pm',
    type: 'Video Call Consultation',
    status: 'Starts in 15mins',
  },
  {
    id: 'dr-james-ucjune15',
    doctorName: 'Dr James Uche',
    date: 'June 15',
    time: '2:00pm',
    type: 'Video Call Consultation',
    status: 'Starts in 15mins',
  },
  {
    id: 'dr-es-uche-june15',
    doctorName: 'Dr James Uche',
    date: 'June 15',
    time: '2:00pm',
    type: 'Video Call Consultation',
    status: 'Starts in 15mins',
  },
  {
    id: 'dr-jaes-june15',
    doctorName: 'Dr James Uche',
    date: 'June 15',
    time: '2:00pm',
    type: 'Video Call Consultation',
    status: 'Starts in 15mins',
  },
];

export const trackData = [
  {
    med: 'Take Vitamin C',
    time: '10:55am',
    id: '1',
    icon: <MaterialCommunityIcons name="pill" size={24} color="black" />,
  },
  {
    med: 'Track Sleep',
    time: '10:55am',
    id: '2',
    icon: <Entypo name="moon" size={24} color="#FFC847" />,
  },
];

export const sleepLogHistory = [
  {
    icon: <Entypo name="moon" size={24} color="#FFC847" />,
    hour: '8.25h',
    date: 'Jun 22',
    status: 'Excellent',
    time: '22:45 - 07:00',
  },
  {
    icon: <Entypo name="moon" size={24} color="#FFC847" />,
    hour: '6.25h',
    date: 'Jun 22',
    status: 'Excellent',
    time: '22:45 - 07:00',
  },
  {
    icon: <Entypo name="moon" size={24} color="#FFC847" />,
    hour: '8.25h',
    date: 'Jun 22',
    status: 'Low',
    time: '22:45 - 07:00',
  },
  {
    icon: <Entypo name="moon" size={24} color="#FFC847" />,
    hour: '8.25h',
    date: 'Jun 22',
    status: 'Average',
    time: '22:45 - 07:00',
  },
];

export const recenntReadings = [
  {
    icon: <FontAwesome name="stethoscope" size={24} color="#DF0000" />,
    bloodRate: '120/80 mmHg',
    date: 'Jun 22 ',
    status: 'Normal',
    time: '09:45',
  },
  {
    icon: <FontAwesome name="stethoscope" size={24} color="#DF0000" />,
    bloodRate: '118/79 mmHg',
    date: 'Jun 23',
    status: 'High',
    time: '22:45 ',
  },
  {
    icon: <FontAwesome name="stethoscope" size={24} color="#DF0000" />,
    bloodRate: '118/93 mmHg',
    date: 'Jun 22',
    status: 'High',
    time: '7:00',
  },
  {
    icon: <FontAwesome name="stethoscope" size={24} color="#DF0000" />,
    bloodRate: '134/93 mmHg',
    hour: '120/80 mmHg',
    date: 'Jun 22',
    status: 'Normal',
    time: '22:45',
  },
];

export const medicationDosage = [
  {
    icon: <MaterialCommunityIcons name="pill" size={24} color="#C11574" />,
    bloodRate: 'Metformin 1000mg',
    date: 'Jun 22 ',
    status: 'Taken',
    dosage: '1 dose',
    time: '9: 45am',
  },
  {
    icon: <MaterialCommunityIcons name="pill" size={24} color="#C11574" />,
    bloodRate: 'Metformin 5000mg',
    date: 'Jun 22 ',
    status: 'Missed',
    dosage: '2 dose',
    time: '9: 45am',
  },
];

export const recentWeight = [
  {
    icon: (
      <MaterialCommunityIcons name="weight-lifter" size={24} color="#C11574" />
    ),
    weight: '100kg',
    date: 'Jun 22 ',
    time: '09:45am',
  },
  {
    icon: (
      <MaterialCommunityIcons name="weight-lifter" size={24} color="#C11574" />
    ),
    weight: '500kg',
    date: 'Jun 22 ',
    time: '10:45am',
  },
];

export const recentMood = [
  {
    icon: '🙂',
    mood: 'Happy',
    date: 'Jun 22 ',
    time: '09:45am',
    status: 'Normal',
  },
  {
    icon: '😂',
    mood: 'Laughing',
    date: 'Jun 22 ',
    time: '10:45am',
    status: 'Balanced',
  },
  {
    icon: '😡',
    mood: 'Angry',
    date: 'Jun 22 ',
    time: '10:45am',
    status: 'Low',
  },
];

const image1 = require('../assets/images/adhy-savala-zbpgmGe27p8-unsplash (1).jpg')
const image2 = require('../assets/images/marcelo-leal-6pcGTJDuf6M-unsplash (1).jpg')
const image3 = require('../assets/images/martha-dominguez-de-gouveia-KF-h9HMxRKg-unsplash (1).jpg')
const image4 = require('../assets/images/stephen-andrews-GwgFPDXiSIs-unsplash.webp')


export const consultationData = [
  {
    image: image1,
    id: '1',
    hospital: 'Lagos General Hospital',
    address: '2 Olayinka Atiku St, Ajah, Lagos',
    text: 'Over 50 experienced Doctors',
    rating: '4.2(38)',
    linkText: 'View Doctors'
  },
  {
    image: image2,
    id: '2',
    hospital: 'Braithway Memorial Hospital',
    address: '2 Olayinka Atiku St, Ajah, Lagos',
    text: 'Over 50 experienced Doctors',
    rating: '4.2(38)',
    linkText: 'View Doctors'
  },
    {
    image: image3,
    id: '3',
    hospital: 'Lagos General Hospital',
    address: '2 Olayinka Atiku St, Ajah, Lagos',
    text: 'Over 50 experienced Doctors',
    rating: '4.2(38)',
    linkText: 'View Doctors'
  },
   {
    image: image4,
    id: '4',
    hospital: 'Lagos General Hospital',
    address: '2 Olayinka Atiku St, Ajah, Lagos',
    text: 'Over 50 experienced Doctors',
    rating: '4.2(38)',
    linkText: 'View Doctors'
  },
]

export const topRatedData = [
  {
    id: 'dr-james-uche-june15',
    doctorName: 'Dr James Uche',
    date: 'June 15',
    time: '2:00pm',
    type: 'General Practitioner',
    address: 'Lagos Health Hospital',
  },
  {
    id: 'dr-jame-uche-june15',
    doctorName: 'Dr James Uche',
    date: 'June 15',
    time: '2:00pm',
    type: 'General Practitioner',
    address: 'Lagos Health Hospital',
  },
  {
    id: 'dr-jmes-uche-june15',
    doctorName: 'Dr James Uche',
    date: 'June 15',
    time: '2:00pm',
    type: 'General Practitioner',
    address: 'Lagos Health Hospital',
  },
  {
    id: 'd-james-uche-june15',
    doctorName: 'Dr James Uche',
    date: 'June 15',
    time: '2:00pm',
    type: 'General Practitioner',
    address: 'Lagos Health Hospital',
  },
]

export const reportAnIssue = [
  'Appointment / Booking Problem',
  'Payment / Refund Issue',
  'Video Call Issue',
  'Prescription / Medical Record',
  'Others'
]