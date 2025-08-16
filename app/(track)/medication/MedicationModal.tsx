import React, { useState } from 'react';
import { View, Text } from 'react-native';
import NumberInput from '@/components/Input/NumberInput';
import { MedicationData } from './data';
import Input from '@/components/Input/Input';
import { SubmitButton } from '@/components/typography/Typography';

type MedicationInputType = Record<string, string>;
const MedicationModal = () => {
  const [inputValue, setInputValue] = useState<MedicationInputType>({});
  console.log(inputValue);
  const { name, dosage, time } = MedicationData;
  const handleChange = (key: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClick = () => {};

  return (
    <View>
      <Input
        {...name}
        value={inputValue.name || ''} // Safe fallback
        onChangeText={(value) => handleChange('name', value)}
      />
      <NumberInput
        {...dosage}
        value={inputValue.dosage || ''} // Safe fallback
        onChangeText={(value) => handleChange('dosage', value)}
      />
      <SubmitButton _fn={handleClick}>Save Medication Log</SubmitButton>
    </View>
  );
};

export default MedicationModal;
