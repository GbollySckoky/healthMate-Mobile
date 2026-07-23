import React from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigation } from '@react-navigation/native'
import {
  Bell,
  Calendar,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react-native'
import useGetUnReadNotification from '@/lib/hooks/useGetUnReadNotification'
import useGetNotification from '@/lib/hooks/useGetNotification'
import { patientService } from '@/service/patientService'
import { Wrapper } from '@/components/typography/Typography'
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout'
import Nav from '@/components/Header/Nav'
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout'
// import { NavHeader } from '@/components/Header/Header'

type Notification = {
  id: string
  title: string
  body: string
  type: string
  isRead: boolean
  readAt: string | null
  createdAt: string
  supportTicketId: string | null
  appointmentId: string | null
  doctorId: string | null
  hospitalId: string | null
  patientId: string | null
}

const typeConfig: Record<
  string,
  { icon: React.ElementType; color: string; bg: string }
> = {
  SUPPORT_TICKET_CREATED: { icon: MessageSquare, color: '#2563eb', bg: '#eff6ff' },
  SUPPORT_TICKET_RESOLVED: { icon: CheckCircle2, color: '#16a34a', bg: '#f0fdf4' },
  APPOINTMENT: { icon: Calendar, color: '#9333ea', bg: '#faf5ff' },
  DEFAULT: { icon: Bell, color: '#6b7280', bg: '#f3f4f6' },
}

function getRelativeTime(dateString: string) {
  const diffMs = Date.now() - new Date(dateString).getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return new Date(dateString).toLocaleDateString()
}

function NotificationSkeleton() {
  return (
    <Wrapper>
      <Nav title="Notifications" />
      <View style={styles.skeletonWrap}>
        {[...Array(5)].map((_, i) => (
          <View key={i} style={styles.skeletonRow}>
            <View style={styles.skeletonAvatar} />
            <View style={{ flex: 1, gap: 6 }}>
              <View style={styles.skeletonLineShort} />
              <View style={styles.skeletonLineLong} />
            </View>
          </View>
        ))}
      </View>
    </Wrapper>
  )
}

const NotificationScreen = () => {
  const { notifications, isLoading, isError, error, refetch, isRefetching } =
    useGetNotification()
  const { unReadNotifications } = useGetUnReadNotification()

  const navigation = useNavigation<any>()
  const queryClient = useQueryClient()

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => patientService.markNotificationAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getNotifications'] })
    },
  })

  const markAllAsReadMutation = useMutation({
    mutationFn: () => patientService.markAllNotificationAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getNotifications'] })
    },
  })

  const handleNotificationPress = (notification: Notification) => {
    if (!notification.isRead) {
      markAsReadMutation.mutate(notification.id)
    }
    if (notification.supportTicketId) {
      navigation.navigate('SupportTicketDetail', {
        id: notification.supportTicketId,
      })
    } else if (notification.appointmentId) {
      navigation.navigate('AppointmentDetail', {
        id: notification.appointmentId,
      })
    }
  }

  const renderItem = ({ item }: { item: Notification }) => {
    const config = typeConfig[item.type] ?? typeConfig.DEFAULT
    const Icon = config.icon

    return (
      <ScreenLayout>
        <Nav title="Notifications" />
        <ScreenOverFlowLayout>
          <Wrapper>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleNotificationPress(item)}
              style={[
                styles.card,
                item.isRead ? styles.cardRead : styles.cardUnread,
              ]}
            >
              <View style={[styles.iconWrap, { backgroundColor: config.bg }]}>
                <Icon size={16} color={config.color} />
              </View>

              <View style={{ flex: 1 }}>
                <View style={styles.cardHeader}>
                  <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.time}>{getRelativeTime(item.createdAt)}</Text>
                </View>
                <Text style={styles.body} numberOfLines={2}>
                  {item.body}
                </Text>
              </View>

              {!item.isRead && <View style={styles.dot} />}
            </TouchableOpacity>
          </Wrapper>
        </ScreenOverFlowLayout>
      </ScreenLayout>
    )
  }

  if (isLoading) {
    return (
      <View style={styles.page}>
        <NotificationSkeleton />
      </View>
    )
  }

  if (isError) {
    return (
      <View style={styles.centerState}>
        <AlertCircle size={28} color="#f87171" />
        <Text style={styles.errorText}>
          {(error as Error)?.message ?? 'Failed to load notifications'}
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.page}>
      {unReadNotifications > 0 && (
        <View style={styles.headerRow}>
          <Text style={styles.unreadText}>
            {unReadNotifications} unread notification
            {unReadNotifications > 1 ? 's' : ''}
          </Text>
          <TouchableOpacity onPress={() => markAllAsReadMutation.mutate()}>
            <Text style={styles.markAllText}>Mark all as read</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={notifications ?? []}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 8, paddingBottom: 24 }}
        refreshControl={
          <RefreshControl refreshing={!!isRefetching} onRefresh={refetch} />
        }
        ListEmptyComponent={
          <View style={styles.centerState}>
            <Bell size={28} color="#d1d5db" />
            <Text style={styles.emptyText}>No notifications yet</Text>
          </View>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#ffffff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  unreadText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  markAllText: {
    fontSize: 12,
    color: '#991b1b',
    textDecorationLine: 'underline',
  },
  card: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  cardRead: {
    borderColor: '#f3f4f6',
    backgroundColor: '#ffffff',
  },
  cardUnread: {
    borderColor: '#dbeafe',
    backgroundColor: '#eff6ff66',
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  time: {
    fontSize: 11,
    color: '#9ca3af',
  },
  body: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3b82f6',
    marginTop: 6,
  },
  centerState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    gap: 8,
  },
  errorText: {
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 13,
    color: '#9ca3af',
  },
  skeletonWrap: {
    gap: 12,
  },
  skeletonRow: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    borderRadius: 12,
  },
  skeletonAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3f4f6',
  },
  skeletonLineShort: {
    height: 10,
    width: '30%',
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
  },
  skeletonLineLong: {
    height: 10,
    width: '70%',
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
  },
})

export default NotificationScreen