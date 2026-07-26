import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import { Wrapper } from '@/components/typography/Typography';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/lib/colors';
import useGetSupport from '@/lib/hooks/useGetSupport';
import { SupportTicket } from '@/lib/interface/support';
import Nav from '@/components/Header/Nav';
import TicketCardSkeleton from '@/lib/components/SupportSkeleton';

const priorityStyles: Record<string, { bg: string; text: string; border: string }> = {
  LOW: { bg: '#F9FAFB', text: '#4B5563', border: '#E5E7EB' },
  MEDIUM: { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' },
  HIGH: { bg: '#FFF7ED', text: '#C2410C', border: '#FED7AA' },
  URGENT: { bg: '#FEF2F2', text: '#B91C1C', border: '#FECACA' },
};

const capitalize = (value?: string) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : '';

const PriorityBadge = ({ priority }: { priority: string }) => {
  const s = priorityStyles[priority] ?? priorityStyles.LOW;
  return (
    <View style={[styles.badge, { backgroundColor: s.bg, borderColor: s.border }]}>
      <Text style={[styles.badgeText, { color: s.text }]}>{capitalize(priority)}</Text>
    </View>
  );
};


const SupportListScreen = () => {
  const { supportData, isLoading, isError, error } = useGetSupport();
    console.log('support', supportData)
  const renderItem = ({ item }: { item: SupportTicket }) => (
    <Pressable
      style={styles.card}
      onPress={() => router.push(`/support/${item.id}`)}
    >
      <View style={styles.cardTop}>
        <Text style={styles.ticketNumber}>{item.ticketNumber}</Text>
        <PriorityBadge priority={item.priority} />
      </View>

      <Text style={styles.subject} numberOfLines={1}>
        {item.subject}
      </Text>

      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.cardFooter}>
        <Text style={styles.metaText}>{capitalize(item.category)}</Text>
        <View style={styles.dot} />
        <Text style={styles.metaText}>{capitalize(item.creatorType)}</Text>
        <View style={styles.dot} />
        <Text style={styles.metaText}>Appt #{item.appointmentId}</Text>
      </View>
    </Pressable>
  );

  return (
    <ScreenLayout>
        <Nav
            title="Support Tickets"
        />
        <ScreenOverFlowLayout>
            <Wrapper>
            {isLoading ? (
                <View style={{ paddingTop: 16, paddingBottom: 24 }}>
                {[1, 2, 3, 4, 5].map((key) => (
                    <View key={key} style={key !== 1 && { marginTop: 12 }}>
                    <TicketCardSkeleton />
                    </View>
                ))}
                </View>
            ) : isError ? (
                <View style={styles.centered}>
                <Text style={styles.errorText}>
                    {error?.message ?? 'Failed to load support tickets'}
                </Text>
                </View>
            ) : supportData.length === 0 ? (
                <View style={styles.centered}>
                <Text style={styles.emptyText}>
                    No recent support ticket found
                </Text>
                </View>
            ) : (
                <FlatList
                data={supportData}
                keyExtractor={(item: SupportTicket) => item.ticketNumber}
                renderItem={renderItem}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                contentContainerStyle={{ paddingTop: 16, paddingBottom: 24 }}
                />
            )}
            </Wrapper>
        </ScreenOverFlowLayout>
    </ScreenLayout>
  );
};

export default SupportListScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  errorText: {
    color: colors.lightRed,
    fontSize: 13,
  },
  emptyText: {
    color: '#9CA3AF',
    fontSize: 13,
  },
  card: {
    borderColor: colors.broderColor,
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ticketNumber: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '500',
  },
  subject: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Lato_700Bold',
    color: colors.black,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  metaText: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 6,
  },
});