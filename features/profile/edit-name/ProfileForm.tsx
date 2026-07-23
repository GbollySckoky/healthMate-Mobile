import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';
import { colors } from '@/lib/colors';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Feather from '@expo/vector-icons/Feather';
import { EditProfile } from '@/lib/interface/user';
import Input from '@/components/Input/Input';

type ProfileFormState = EditProfile;

interface Props {
  initialValues?: Partial<EditProfile>;
  onSubmit: (values: EditProfile) => void;
  submitting?: boolean;
  submitLabel?: string;
}

const GENDERS = ['Male', 'Female', 'Other'];

const DEFAULT_FORM_STATE: ProfileFormState = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  dateOfBirth: '',
  gender: '',
  healthCondition: '',
  allergies: '',
  profilePicture: '',
};

export default function ProfileForm({
  initialValues = {},
  onSubmit,
  submitting = false,
  submitLabel = 'Save',
}: Props) {
  const [form, setForm] = useState<ProfileFormState>({
    ...DEFAULT_FORM_STATE,
    ...initialValues,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const updateField = <K extends keyof ProfileFormState>(
    key: K,
    value: ProfileFormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      updateField('profilePicture', result.assets[0].uri);
    }
  };

  const handleDateChange = (_event: any, selected?: Date) => {
    setShowDatePicker(false);
    if (selected) {
      updateField('dateOfBirth', selected.toISOString().split('T')[0]); // YYYY-MM-DD
    }
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  return (
    <View style={styles.wrapper}>
      <Pressable style={styles.imagePicker} onPress={pickImage}>
        {form.profilePicture ? (
          <Image source={{ uri: form.profilePicture }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]}>
            <Feather name="camera" size={22} color={colors.lightBlack} />
          </View>
        )}
        <Text style={styles.imagePickerText}>Change photo</Text>
      </Pressable>

      <Input
        label="First name"
        value={form.firstName}
        onChangeText={(v) => updateField('firstName', v)}
        placeholder='Gbolahan'
      />
      <Input
        label="Last name"
        value={form.lastName}
        onChangeText={(v) => updateField('lastName', v)}
        placeholder='Coker'
      />
      <Input
        label="Phone number"
        value={form.phoneNumber}
        onChangeText={(v) => updateField('phoneNumber', v)}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Date of birth</Text>
      <Pressable style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateInput}>
          {form.dateOfBirth || 'Select date'}
        </Text>
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={form.dateOfBirth ? new Date(form.dateOfBirth) : new Date(2000, 0, 1)}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={handleDateChange}
        //   style={styles.dateInput}
        />
      )}

      <Text style={styles.label}>Gender</Text>
      <View style={styles.genderRow}>
        {GENDERS.map((g) => (
          <Pressable
            key={g}
            onPress={() => updateField('gender', g)}
            style={[styles.genderPill, form.gender === g && styles.genderPillActive]}
          >
            <Text style={[styles.genderText, form.gender === g && styles.genderTextActive]}>
              {g}
            </Text>
          </Pressable>
        ))}
      </View>

      <Input
        label="Health condition"
        value={form.healthCondition}
        onChangeText={(v) => updateField('healthCondition', v)}
        placeholder='Good'
        // multiline
      />
      <Input
        label="Allergies"
        value={form.allergies}
        onChangeText={(v) => updateField('allergies', v)}
        placeholder='Don&apos;t like milk'
      />

      <Pressable
        style={[styles.submitButton, submitting && { opacity: 0.6 }]}
        onPress={handleSubmit}
        disabled={submitting}
      >
        <Text style={styles.submitText}>{submitting ? 'Saving...' : submitLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { padding: 20 },
  imagePicker: { alignItems: 'center', marginBottom: 24 },
  image: { width: 90, height: 90, borderRadius: 90 },
  imagePlaceholder: {
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePickerText: { marginTop: 8, color: colors.purple, fontSize: 13, fontWeight: '600' },
  label: {
    fontFamily: 'Lato_700Bold',
    fontSize: 13,
    color: colors.lightBlack,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 10,
    paddingBottomg: 14,
    // paddingVertical: 12,
    fontSize: 14,
    color: colors.lightBlack,
  },
  genderRow: { flexDirection: 'row', marginBottom: 16 },
  genderPill: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
  },
  genderPillActive: { backgroundColor: colors.purple, borderColor: colors.purple },
  genderText: { color: colors.lightBlack, fontSize: 13 },
  genderTextActive: { color: 'white', fontWeight: '600' },
  submitButton: {
    backgroundColor: colors.purple,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: { color: 'white', fontWeight: '700', fontSize: 15 },
   dateInput: {
    width: '100%',
    padding: 10,
    borderColor: '#D6D7DA',
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: 'Inter_400Regular',
    fontWeight: '400',
    fontSize: 14,
  },
});