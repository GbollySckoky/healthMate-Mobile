import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Feather from '@expo/vector-icons/Feather';

import Input from '@/components/Input/Input';
import NumberInput from '@/components/Input/NumberInput';

import { colors } from '@/lib/colors';
import { EditProfile } from '@/lib/interface/user';

type ProfileFormState = EditProfile;

interface Props {
  initialValues: EditProfile;
  onSubmit: (values: EditProfile) => void;
  submitting?: boolean;
  submitLabel?: string;
}

const GENDERS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

const DEFAULT_FORM_STATE: EditProfile = {
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
  initialValues,
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
    value: ProfileFormState[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) return;

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

    if (!result.canceled) {
      updateField(
        'profilePicture',
        result.assets[0].uri,
      );
    }
  };

  const handleDateChange = (_: any, date?: Date) => {
    setShowDatePicker(false);

    if (date) {
      updateField(
        'dateOfBirth',
        date.toISOString().split('T')[0],
      );
    }
  };

  return (
    <View style={styles.wrapper}>
      <Pressable
        style={styles.imagePicker}
        onPress={pickImage}>
        {form.profilePicture ? (
          <Image
            source={{ uri: form.profilePicture }}
            style={styles.image}
          />
        ) : (
          <View
            style={[
              styles.image,
              styles.imagePlaceholder,
            ]}>
            <Feather
              name="camera"
              size={22}
              color={colors.lightBlack}
            />
          </View>
        )}

        <Text style={styles.imagePickerText}>
          Change photo
        </Text>
      </Pressable>

      <Input
        label="First name"
        value={form.firstName}
        onChangeText={(v) =>
          updateField('firstName', v)
        }
        placeholder='Gbolahan'
      />

      <Input
        label="Last name"
        value={form.lastName}
        onChangeText={(v) =>
          updateField('lastName', v)
        }
        placeholder="Coker"
      />

      <NumberInput
        label="Phone number"
        value={form.phoneNumber}
        onChangeText={(v) =>
          updateField('phoneNumber', v)
        }
        placeholder='09075431712'
      />

      <Text style={styles.label}>Date of birth</Text>

      <Pressable
        style={styles.dateInput}
        onPress={() => setShowDatePicker(true)}>
        <Text>
          {form.dateOfBirth || 'Select date'}
        </Text>
      </Pressable>

      {showDatePicker && (
        <DateTimePicker
          value={
            form.dateOfBirth
              ? new Date(form.dateOfBirth)
              : new Date(2000, 0, 1)
          }
          mode="date"
          maximumDate={new Date()}
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Gender</Text>

      <View style={styles.genderRow}>
        {GENDERS.map((gender) => (
          <Pressable
            key={gender.value}
            style={[
              styles.genderPill,
              form.gender === gender.value &&
                styles.genderPillActive,
            ]}
            onPress={() =>
              updateField(
                'gender',
                gender.value,
              )
            }>
            <Text
              style={[
                styles.genderText,
                form.gender === gender.value &&
                  styles.genderTextActive,
              ]}>
              {gender.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <Input
        label="Health condition"
        value={form.healthCondition}
        onChangeText={(v) =>
          updateField(
            'healthCondition',
            v,
          )
        }
        placeholder='Lack of sleep'
      />

      <Input
        label="Allergies"
        value={form.allergies}
        onChangeText={(v) =>
          updateField('allergies', v)
        }
        placeholder='Fish'
      />

      <Pressable
        style={[
          styles.submitButton,
          submitting && {
            opacity: 0.6,
          },
        ]}
        onPress={() => onSubmit(form)}
        disabled={submitting}>
        <Text style={styles.submitText}>
          {submitting
            ? 'Saving...'
            : submitLabel}
        </Text>
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
    borderWidth: 1,
    borderColor: colors.lightBlack,
    borderRadius: 50,
  },
  imagePickerText: { marginTop: 8, fontSize: 13, fontWeight: '600' },
  label: {
    fontFamily: 'Lato_700Bold',
    fontSize: 13,
    color: colors.lightBlack,
    marginBottom: 6,
    paddingTop: 10,
  },
  input: {
    paddingBottom: 10,
    // paddingTop: 12,
    fontSize: 14,
    color: colors.lightBlack,
  },
  genderRow: { flexDirection: 'row', marginBottom: 10 },
  genderPill: {
    borderColor: '#D6D7DA',
    borderWidth: 1,
    // borderRadius: 5,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
  },
  genderPillActive: { backgroundColor: colors.lightRed, borderColor: colors.lightRed },
  genderText: { color: colors.lightBlack, fontSize: 13 },
  genderTextActive: { color: 'white', fontWeight: '600' },
  submitButton: {
    backgroundColor: colors.red,
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