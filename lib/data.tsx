import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { ROUTES } from '@/lib/routes';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors } from './colors';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';


export const healthOverview = [
  {
    title: 'Blood Pressure',
    value: '120/80 mmHg',
    text: 'Blood Pressure',
    id: 1,
    icon: <AntDesign name="heart" size={24} color="#DF0000" />,
    url: ROUTES.bloodPressure,
  },
  {
    title: 'Mood',
    value: 'Happy',
    text: 'Feeling Great',
    id: 2,
    icon: <Feather name="smile" size={24} color="#FFC847" />,
    url: ROUTES.mood,
  },
  {
    title: 'Sleep',
    value: '7h 30 mins',
    text: 'Quality: Good',
    id: 3,
    icon: <FontAwesome name="moon-o" size={24} color="black" />,
    url: ROUTES.sleep,
  },
  {
    title: 'Weight',
    value: '765kg',
    text: 'Healthy range',
    id: 4,
    icon: <FontAwesome name="balance-scale" size={24} color="blue" />,
    url: ROUTES.weight,
  },
  {
    title: 'Medications',
    value: '2/3 doses',
    text: 'Taken today',
    id: 5,
    icon: <MaterialCommunityIcons name="pill" size={24} color="#C11574" />,
    url: ROUTES.medication,
  }
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

export const slidesData = [
  {
    id: 1,
    image: require('../assets/images/Vector.png'),
    title: 'Welcome to HealthMate',
    subTitle: 'Track, Consult, and Stay Healthy.'
  },
  {
    id: 2,
    image: require('../assets/images/Vector1.png'),
    title: 'Health Tracking',
    subTitle: 'Log your BP, mood, weight, sleep & more.'
  },
  {
    id: 1,
    image: require('../assets/images/Vectors.png'),
    title: 'Book Consultations Easily',
    subTitle: 'Connect with verified doctors in just a tap'
  },
]

export const MedicationData = {
  name: {
    label: 'Medication Name',
    placeholder: 'e.g Panadol',
  },
  dosage: {
    label: 'Dosage Taken',
    placeholder: '2',
  },
  time: {
    label: 'Time Taken',
    placeholder: '10:00AM',
  },
};

const image = require('../assets/images/Mobile.png')

export const messageData = [
    {
        name: 'Dr James Uche',
        profession: 'General Practitioner',
        msg: 'Looking forward to our session',
        time:'10:55 AM',
        count: '2',
        img: image
    },
    {
        name: 'Dr James Uche',
        profession: 'Cardiologist',
        msg: 'Looking forward to our session',
        time:'10:55 AM',
        count: '2',
        img: image
    },
]

export const bloodPressureData = {
  topNumber: {
    label: 'Systolic (top number)',
    placeholder: '120',
  },
  lastNumber: {
    label: 'Diastolic (bottom number)',
    placeholder: '80',
  },
  date: {
    label: 'Date',
    placeholder: '10/05/1997',
  },
  time: {
    label: 'Time',
    placeholder: '10:00AM',
  },
};

export const MoodData = [
  {
    emoji: '😀',
    value: 'Happy',
    id: 1,
  },
  {
    emoji: '😢',
    value: 'Sad',
    id: 2,
  },
  {
    emoji: '😡',
    value: 'Angry',
    id: 3,
  },
  {
    emoji: '🤢',
    value: 'Sick',
    id: 4,
  },
  {
    emoji: '🥱',
    value: 'Tired',
    id: 5,
  },
  {
    emoji: '😒',
    value: 'Moody',
    id: 6,
  },
];

export const weightData = {
  weight: {
    label: 'Current Weight (kg)',
    placeholder: '65.6',
  },
  date: {
    label: 'Date',
    placeholder: '10/05/1997',
  },
};

export const sleepData = {
  weight: {
    label: 'Current Weight (kg)',
    placeholder: '65.6',
  },
  date: {
    label: 'Date',
    placeholder: '10/05/1997',
  },
};

export const sleepExperienceData = [
  {
    emoji: '😴',
    value: 'Excellent',
    id: 1,
  },
  {
    emoji: '😐',
    value: 'Average',
    id: 2,
  },
  {
    emoji: '😩',
    value: 'Poor',
    id: 3,
  },
];

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


export const healthOverviews = [
  {
    title: 'Blood Pressure',
    value: '120/80 mmHg',
    text: 'Blood Pressure',
    id: 1,
    icon: <AntDesign name="heart" size={18} color="#DF0000" />,
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

export const settingsData = [
  {
    icon: <Entypo name="lock-open" size={17} color={colors.lightRed} />,
    title: 'Change Password',
    id: '1',
    rightIcon: (
      <Entypo name="chevron-small-right" size={24} color={colors.gray} />
    ),
    url: '/settings/change-password',
  },
  {
    icon: <Feather name="phone" size={17} color={colors.lightRed} />,
    title: 'Change Phone Number',
    id: '2',
    rightIcon: (
      <Entypo name="chevron-small-right" size={24} color={colors.gray} />
    ),
    url: '/settings/change-phoneNumber',
  },
  {
    title: 'Appointments Reminders',
    id: '3',
    toggleOn: (
      <FontAwesome name="toggle-on" size={24} color={colors.lightRed} />
    ),
    toggleOff: (
      <FontAwesome5 name="toggle-off" size={24} color={colors.lightGray} />
    ),
  },
  {
    title: 'Medication Reminders',
    id: '4',
    toggleOn: (
      <FontAwesome name="toggle-on" size={24} color={colors.lightRed} />
    ),
    toggleOff: (
      <FontAwesome5 name="toggle-off" size={24} color={colors.lightGray} />
    ),
  },
  {
    title: 'FAQs',
    id: '5',
    rightIcon: (
      <Entypo name="chevron-small-right" size={24} color={colors.gray} />
    ),
    url: '/profile/',
  },
  {
    title: 'Contact Support',
    id: '6',
    rightIcon: (
      <Entypo name="chevron-small-right" size={24} color={colors.gray} />
    ),
    url: '/profile/',
  },
];

export const passwordData = {
  oldPassword: {
    label: 'Old Password',
    placeholder: '*******',
    closeIcon: <Feather name="eye-off" size={20} color="black" />,
    openIcon: <FontAwesome5 name="eye" size={20} color="black" />,
    id: '1',
  },
  newPassword: {
    label: 'New Password',
    placeholder: '*******',
    closeIcon: <Feather name="eye-off" size={20} color="black" />,
    openIcon: <FontAwesome5 name="eye" size={20} color="black" />,
    id: '2',
  },
  confirmPassword: {
    label: 'Confirm Password',
    placeholder: '*******',
    closeIcon: <Feather name="eye-off" size={20} color="black" />,
    openIcon: <FontAwesome5 name="eye" size={20} color="black" />,
    id: '3',
  },
};

export const profileData = [
  {
    title: 'Name',
    value: 'Sarah Daniels',
    id: 1,
    icon: <EvilIcons name="user" size={24} color={colors.lightRed} />,
    next: (
      <Entypo
        name="chevron-small-right"
        size={24}
        color={colors.lightBlack}
      />
    ),
  },
  {
    title: 'Email',
    value: 'gbolly@gmail.com',
    id: 2,
    icon: <Fontisto name="email" size={20} color={colors.lightRed} />,
  },
  {
    title: 'Phone Number',
    value: '+2349076536764',
    id: 3,
    icon: <Feather name="phone" size={20} color={colors.lightRed} />,
  },
  {
    title: 'Date Of Birth',
    value: 'Jan 20, 1996',
    id: 4,
    icon: <Feather name="calendar" size={20} color={colors.lightRed} />,
  }
];

export const otherMenuItems = [
  {
    title: 'My Health Info',
    id: 5,
    icon: (
      <MaterialIcons
        name="medical-services"
        size={20}
        color={colors.lightRed}
      />
    ),
    route: '/profile/health-info' as const
  },
  {
    title: 'My Reminders',
    id: 6,
    icon: (
      <Ionicons
        name="notifications-outline"
        size={20}
        color={colors.lightRed}
      />
    ),
    route: ROUTES.reminder  // Changed to a more appropriate route
  },
];