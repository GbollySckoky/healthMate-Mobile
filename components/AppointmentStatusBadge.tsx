import React from 'react';
import { StyleSheet, Text } from 'react-native';

type AppointmentStatusBadgeProps = {
  status?: string | null;
};

export const AppointmentStatusBadge = ({ status }: AppointmentStatusBadgeProps) => {
  const normalizedStatus = status?.trim().toUpperCase().replaceAll(' ', '_') || 'PENDING';
  const badgeStyle = statusStyles[normalizedStatus as keyof typeof statusStyles] || styles.pending;
  const label = normalizedStatus.charAt(0) + normalizedStatus.slice(1).toLocaleLowerCase().replaceAll('_', ' ');

  return <Text style={[styles.badge, badgeStyle]}>{label}</Text>;
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 10,
    padding: 10,
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    fontWeight: '500',
    height: 35,
    overflow: 'hidden',
  },
  pending: {
    backgroundColor: '#FFFAEB',
    color: '#B54708',
  },
  upcoming: {
    backgroundColor: '#F4F3FF',
    color: '#5924DC',
  },
  completed: {
    backgroundColor: '#EBFEF3',
    color: '#027A48',
  },
  cancelled: {
    backgroundColor: '#FEF3F2',
    color: '#B42318',
  },
});

const statusStyles = {
  PENDING: styles.pending,
  UPCOMING: styles.upcoming,
  COMPLETED: styles.completed,
  CANCELLED: styles.cancelled,
} as const;
