import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import { colors } from '@/lib/colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

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
    url: '#',
  },
  {
    title: 'Contact Support',
    id: '6',
    rightIcon: (
      <Entypo name="chevron-small-right" size={24} color={colors.gray} />
    ),
    url: '#',
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
