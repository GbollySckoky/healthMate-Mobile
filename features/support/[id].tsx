import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import { SubmitButton, Wrapper } from '@/components/typography/Typography';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import {
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NavHeader } from '@/components/Header/Header';
import { router, useLocalSearchParams } from 'expo-router';
import { colors } from '@/lib/colors';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import SafeArea from '@/components/safeAreaView/SafeAreaView';
import {
  ReplyToTicket,
  SupportTicketDetail,
} from '@/lib/interface/support';
import { patientService } from '@/service/patientService';
import SupportTicketDetailSkeleton from '@/lib/components/SupportTicketDetailSkeleton';

type InputValue = {
  message: string;
  attachmentUrl: string;
  attachmentName: string;
};

const URL_REGEX = /^(https?:\/\/)[^\s$.?#].[^\s]*$/i;

const statusStyles: Record<string, { bg: string; text: string; border: string }> = {
  OPEN: { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' },
  IN_PROGRESS: { bg: '#FFFBEB', text: '#B45309', border: '#FDE68A' },
  RESOLVED: { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0' },
  CLOSED: { bg: '#F3F4F6', text: '#4B5563', border: '#E5E7EB' },
};

const priorityStyles: Record<string, { bg: string; text: string; border: string }> = {
  LOW: { bg: '#F9FAFB', text: '#4B5563', border: '#E5E7EB' },
  MEDIUM: { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' },
  HIGH: { bg: '#FFF7ED', text: '#C2410C', border: '#FED7AA' },
  URGENT: { bg: '#FEF2F2', text: '#B91C1C', border: '#FECACA' },
};

const Badge = ({
  text,
  styleMap,
}: {
  text: string;
  styleMap: Record<string, { bg: string; text: string; border: string }>;
}) => {
  const s = styleMap[text] ?? statusStyles.CLOSED;
  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: s.bg, borderColor: s.border },
      ]}
    >
      <Text style={[styles.badgeText, { color: s.text }]}>
        {text.replace('_', ' ')}
      </Text>
    </View>
  );
};


const SupportTicketDetailScreen = () => {
  const { id } = useLocalSearchParams();
   const appointmentId = Array.isArray(id) ? id[0] : id;
  const slug = String(id);
  console.log('SLUG!', slug)
  console.log('ID', appointmentId)
  const queryClient = useQueryClient();

  const [inputValue, setInputValue] = useState<InputValue>({
    message: '',
    attachmentUrl: '',
    attachmentName: '',
  });
  const [urlTouched, setUrlTouched] = useState(false);

  const { data, isLoading, isError, error } = useQuery<{
    data: SupportTicketDetail;
  }>({
    queryKey: ['getSupportDetails', id],
    queryFn: () => patientService.getSupportDetails(slug),
    enabled: !!id,
  });

  const replyMutation = useMutation({
    mutationFn: (payload: ReplyToTicket) => patientService.replyToTicket(slug, payload),
    onSuccess: () => {
      setInputValue({ message: '', attachmentUrl: '', attachmentName: '' });
      setUrlTouched(false);
      queryClient.invalidateQueries({ queryKey: ['getSupportDetails', id] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      console.error('Failed to send reply:', err.response?.data?.message);
    },
  });

  const handleChange = (key: keyof InputValue, value: string) => {
    setInputValue((prev) => ({ ...prev, [key]: value }));
  };

  const isUrlValid =
    inputValue.attachmentUrl === ''
      ? false
      : URL_REGEX.test(inputValue.attachmentUrl);

  const isDisabled =
    Object.values(inputValue).some((v) => v === '') || !isUrlValid;

  const handleReplySubmit = () => {
    const payload: ReplyToTicket = {
      message: inputValue.message,
      attachmentUrl: inputValue.attachmentUrl,
      attachmentName: inputValue.attachmentName,
    };
    replyMutation.mutate(payload);
  };

  if (isLoading) {
    return (
      <SafeArea>
        <ScreenLayout>
          <NavHeader
            title="Support Ticket Details"
            _goBack={() => router.back()}
            backIcon={
              <Entypo name="chevron-small-left" size={24} color="black" />
            }
          />
          <ScreenOverFlowLayout>
            <Wrapper>
              <SupportTicketDetailSkeleton />
            </Wrapper>
          </ScreenOverFlowLayout>
        </ScreenLayout>
      </SafeArea>
    );
  }

  if (isError) {
    return (
      <SafeArea>
        <ScreenLayout>
          <NavHeader
            title="Support Ticket Details"
            _goBack={() => router.back()}
            backIcon={
              <Entypo name="chevron-small-left" size={24} color="black" />
            }
          />
          <View style={styles.centered}>
            <Text style={styles.errorText}>
              {(error as AxiosError<{ message: string }>)?.response?.data
                ?.message ?? 'Failed to load support ticket'}
            </Text>
          </View>
        </ScreenLayout>
      </SafeArea>
    );
  }

  const ticket = data?.data;
  if (!ticket) return null;

  return (
    <SafeArea>
      <ScreenLayout>
        <NavHeader
          title="Support Ticket Details"
          _goBack={() => router.back()}
          backIcon={
            <Entypo name="chevron-small-left" size={24} color="black" />
          }
        />
        <ScreenOverFlowLayout>
          <Wrapper>
            {/* Header */}
            <View style={styles.headerRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.ticketNumber}>{ticket.ticketNumber}</Text>
                <Text style={styles.subject}>{ticket.subject}</Text>
              </View>
            </View>
            <View style={styles.badgeRow}>
              <Badge text={ticket.status} styleMap={statusStyles} />
              <Badge text={ticket.priority} styleMap={priorityStyles} />
            </View>

            {/* Meta info */}
            <View style={styles.metaBox}>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Category</Text>
                <Text style={styles.metaValue}>{ticket.category}</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Created by</Text>
                <Text style={styles.metaValue}>{ticket.creatorType}</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Created</Text>
                <Text style={styles.metaValue}>
                  {new Date(ticket.createdAt).toLocaleString()}
                </Text>
              </View>
            </View>

            {/* Description */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Description</Text>
              <Text style={styles.description}>{ticket.description}</Text>
            </View>

            {/* Conversation */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Conversation</Text>
              {ticket.messages?.length ? (
                ticket.messages.map((msg) => (
                  <View key={msg.id} style={styles.messageCard}>
                    <View style={styles.messageHeader}>
                      <Text style={styles.senderType}>{msg.senderType}</Text>
                      <Text style={styles.messageDate}>
                        {new Date(msg.createdAt).toLocaleString()}
                      </Text>
                    </View>
                    <Text style={styles.messageText}>{msg.message}</Text>
                    {msg.attachmentUrl && (
                      <Pressable
                        style={styles.attachmentLink}
                        onPress={() => Linking.openURL(msg.attachmentUrl!)}
                      >
                        <Feather
                          name="paperclip"
                          size={12}
                          color={colors.lightRed}
                        />
                        <Text style={styles.attachmentText}>
                          {msg.attachmentName ?? 'Attachment'}
                        </Text>
                      </Pressable>
                    )}
                  </View>
                ))
              ) : (
                <Text style={styles.emptyText}>No messages yet.</Text>
              )}
            </View>

            {/* Reply form */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Reply to this ticket</Text>

              <View style={styles.field}>
                <Text style={styles.label}>Message</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Type your reply..."
                  placeholderTextColor={colors.broderColor}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  value={inputValue.message}
                  onChangeText={(text) => handleChange('message', text)}
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Attachment URL</Text>
                <TextInput
                  style={[
                    styles.input,
                    urlTouched &&
                      inputValue.attachmentUrl !== '' &&
                      !isUrlValid &&
                      styles.inputError,
                  ]}
                  placeholder="https://example.com/file.pdf"
                  placeholderTextColor={colors.broderColor}
                  value={inputValue.attachmentUrl}
                  onChangeText={(text) => handleChange('attachmentUrl', text)}
                  onBlur={() => setUrlTouched(true)}
                  keyboardType="url"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {urlTouched &&
                  inputValue.attachmentUrl !== '' &&
                  !isUrlValid && (
                    <Text style={styles.fieldErrorText}>
                      Enter a valid URL (must start with http:// or https://)
                    </Text>
                  )}
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Attachment Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="report.pdf"
                  placeholderTextColor={colors.broderColor}
                  value={inputValue.attachmentName}
                  onChangeText={(text) =>
                    handleChange('attachmentName', text)
                  }
                />
              </View>

              <SubmitButton
                _fn={handleReplySubmit}
                disabled={isDisabled || replyMutation.isPending}
              >
                {replyMutation.isPending ? 'Sending...' : 'Send reply'}
              </SubmitButton>
            </View>
          </Wrapper>
        </ScreenOverFlowLayout>
      </ScreenLayout>
    </SafeArea>
  );
};

export default SupportTicketDetailScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  ticketNumber: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  subject: {
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'Lato_700Bold',
    color: colors.black,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '500',
  },
  metaBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FAFBFF',
    borderColor: '#F3F4F6',
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginTop: 18,
  },
  metaItem: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.black,
  },
  section: {
    marginTop: 24,
  },
  sectionLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#374151',
  },
  messageCard: {
    borderColor: '#F3F4F6',
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  senderType: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },
  messageDate: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  messageText: {
    fontSize: 14,
    color: '#1F2937',
  },
  attachmentLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  attachmentText: {
    fontSize: 12,
    color: colors.lightRed,
  },
  emptyText: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  field: {
    marginTop: 14,
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 6,
  },
  input: {
    borderColor: colors.broderColor,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: colors.black,
  },
  inputError: {
    borderColor: colors.lightRed,
  },
  fieldErrorText: {
    color: colors.lightRed,
    fontSize: 11,
    marginTop: 6,
  },
  textArea: {
    minHeight: 90,
  },
  errorText: {
    color: colors.lightRed,
    fontSize: 13,
  },
});