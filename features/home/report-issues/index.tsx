import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import {
  SubmitButton,
  Wrapper,
} from '@/components/typography/Typography';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import Entypo from '@expo/vector-icons/Entypo';
import {
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
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Modal from '@/components/modal/Modal';
import Ionicons from '@expo/vector-icons/Ionicons';
import useDisplay from '@/lib/hooks/useDisplay';
import { ROUTES } from '@/lib/routes';
import SafeArea from '@/components/safeAreaView/SafeAreaView';
// import { APPOINTMENT_DETAILS } from '@/lib/interface/appointment-details';
import { SUPPORT_TICKET } from '@/lib/interface/support';
import { patientService } from '@/service/patientService';
// import { SUPPORT_TICKET } from '@/lib/interface/support';
// import { Doctor } from '@/lib/constant/service';

type InputValue = {
  subject: string;
  description: string;
  category: string;
  message: string;
  attachmentUrl: string;
  attachmentName: string;
};

const CATEGORY_OPTIONS = [
  'ACCOUNT',
  'APPOINTMENT',
  'BILLING',
  'TECHNICAL',
  'MEDICAL',
  'OTHER',
];

const URL_REGEX = /^(https?:\/\/)[^\s$.?#].[^\s]*$/i;

const CreateSupportTicket = () => {
  const { openModal, handleDisplay } = useDisplay();
  const { id } = useLocalSearchParams();
  const appointmentId = Array.isArray(id) ? id[0] : id;
  const [inputValue, setInputValue] = useState<InputValue>({
    subject: '',
    description: '',
    category: '',
    message: '',
    attachmentUrl: '',
    attachmentName: '',
  });

  const [urlTouched, setUrlTouched] = useState(false);

  const {
      data: appointmentResponse
      } = useQuery({
      queryKey: ['getAppointmentById', appointmentId],
      queryFn: () => patientService.getAppointmentById(appointmentId as string),
      enabled: !!appointmentId,
    });
  
    const appointmentDetails = appointmentResponse?.data ?? null;
    console.log('DETAILS!!!', appointmentDetails)
  const handleChange = (key: keyof InputValue, value: string) => {
    setInputValue((prev) => ({ ...prev, [key]: value }));
  };

  const handleSelectCategory = (option: string) => {
    setInputValue((prev) => ({
      ...prev,
      category: prev.category === option ? '' : option,
    }));
  };

  const mutation = useMutation({
    mutationFn: (payload: SUPPORT_TICKET) =>
      patientService.createSupportTicket(payload),
    onSuccess: () => {
      handleDisplay();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.error(
        'Error creating support ticket:',
        error.response?.data?.message,
      );
    },
  });

  const handleSubmit = async () => {
    const payload: SUPPORT_TICKET = {
      subject: inputValue.subject,
      category: inputValue.category,
      description: inputValue.description,
      message: inputValue.message,
      doctorId: String(appointmentDetails?.user?.id),
      appointmentId: String(appointmentDetails?.id) ?? '', 
      hospitalId: String(appointmentDetails?.hospital?.id) ?? '',
      attachmentUrl: inputValue.attachmentUrl,
      attachmentName: inputValue.attachmentName,
    };

    await mutation.mutateAsync(payload);
  };

  const isUrlValid =
    inputValue.attachmentUrl === '' ? false : URL_REGEX.test(inputValue.attachmentUrl);

  const isValid =
    Object.values(inputValue).every((v) => v !== '') && isUrlValid;

  return (
    <SafeArea>
      <ScreenLayout>
        <NavHeader
          title="Create Support Ticket"
          _goBack={() => router.back()}
          backIcon={
            <Entypo name="chevron-small-left" size={24} color="black" />
          }
        />
        <ScreenOverFlowLayout>
          <Wrapper>
            <View style={styles.field}>
              <Text style={styles.label}>Subject</Text>
              <TextInput
                style={styles.input}
                placeholder="Felt Disappointed"
                placeholderTextColor={colors.broderColor}
                value={inputValue.subject}
                onChangeText={(text) => handleChange('subject', text)}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                placeholder="Briefly describe the issue"
                placeholderTextColor={colors.broderColor}
                value={inputValue.description}
                onChangeText={(text) => handleChange('description', text)}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Message</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Give us more details"
                placeholderTextColor={colors.broderColor}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                value={inputValue.message}
                onChangeText={(text) => handleChange('message', text)}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Attachment Name</Text>
              <TextInput
                style={styles.input}
                placeholder="medical-report.pdf"
                placeholderTextColor={colors.broderColor}
                value={inputValue.attachmentName}
                onChangeText={(text) => handleChange('attachmentName', text)}
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
                placeholder="https://example.com/attachments/report.pdf"
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
                  <Text style={styles.errorText}>
                    Enter a valid URL (must start with http:// or https://)
                  </Text>
                )}
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Category</Text>
              <View style={styles.optionsContainer}>
                {CATEGORY_OPTIONS.map((option) => (
                  <Pressable
                    style={[
                      styles.border,
                      inputValue.category === option && styles.activeBorder,
                    ]}
                    key={option}
                    onPress={() => handleSelectCategory(option)}
                  >
                    <View style={styles.radio}>
                      {inputValue.category === option && (
                        <View style={styles.innerCircle} />
                      )}
                    </View>
                    <Text style={styles.optionText}>{option}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <SubmitButton
              _fn={handleSubmit}
              disabled={!isValid || mutation.isPending}
            >
              {mutation.isPending ? 'Saving...' : 'Save'}
            </SubmitButton>

            <Modal
              icon={
                <Ionicons
                  name="checkmark"
                  size={24}
                  color={colors.lightRed}
                />
              }
              title="Ticket Created!"
              text="Our support team has received your request.
                        You’ll receive an update soon via in-app message or email."
              closeModal={handleDisplay}
              isOpen={openModal}
              route={() => router.push(ROUTES.home)}
              submitText="Go to home"
            />
          </Wrapper>
        </ScreenOverFlowLayout>
      </ScreenLayout>
    </SafeArea>
  );
};

export default CreateSupportTicket;

const styles = StyleSheet.create({
  field: {
    marginTop: 20,
  },
  label: {
    fontWeight: '600',
    fontSize: 15,
    fontFamily: 'Lato_700Bold',
    marginBottom: 8,
    color: colors.black,
  },
  input: {
    borderColor: colors.broderColor,
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 15,
    color: colors.black,
  },
  inputError: {
    borderColor: colors.lightRed,
  },
  errorText: {
    color: colors.lightRed,
    fontSize: 12,
    marginTop: 6,
  },
  textArea: {
    minHeight: 120,
  },
  optionsContainer: {
    gap: 13,
  },
  border: {
    borderColor: colors.broderColor,
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    gap: 10,
    flexDirection: 'row',
  },
  activeBorder: {
    borderColor: colors.lightRed,
    backgroundColor: colors.lightPurple,
  },
  optionText: {
    fontSize: 15,
    color: colors.black,
    fontWeight: '500',
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#717680',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#C11574',
  },
});