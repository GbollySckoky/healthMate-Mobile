import React, { useState } from 'react'
import { NavHeader } from '@/components/Header/Header';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import Entypo from '@expo/vector-icons/Entypo';
import SafeArea from '@/components/safeAreaView/SafeAreaView';
import {
    SubmitButton,
    Wrapper,
} from '@/components/typography/Typography';
import { useRouter } from 'expo-router';
import { reminderData } from '../../data';
import Input from '@/components/Input/Input';
import SelectInput from '@/components/Input/SelectInput';
import useDisplay from '@/hooks/useDisplay';
import Modal from '@/components/modal/Modal';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ROUTES } from '@/lib/routes';
import { colors } from '@/lib/colors';


export type ReminderInputType = Record<string, string>
const AddReminderPage = () => {
    const router = useRouter()
    const {title, frequency, type} = reminderData;
    const {openModal, handleDisplay} = useDisplay()
    const [inputValue, setInputValue] = useState<ReminderInputType>({})

    const handleInputValue = (key: string, value: string) => {
        setInputValue((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    const handleSubmit = () => {
        handleDisplay()
    }
  return (
    <SafeArea>
    <ScreenLayout>
        <NavHeader
            title="Add New Reminder" 
            _goBack={() => router.back()}
            backIcon={<Entypo name="chevron-small-left" size={24} color="black" />}
        />
            <Wrapper>
                <Input 
                    {...title}
                    value={inputValue.title}
                    onChangeText={(value) => handleInputValue('title', value)}
                />
                <SelectInput 
                    {...type}
                    value={inputValue.type}
                    onChangeText={(value) => handleInputValue('type', value)}
                />
                <SelectInput 
                    {...frequency}
                    value={inputValue.frequency}
                    onChangeText={(value) => handleInputValue('frequency', value)}
                />
                <SubmitButton _fn={handleSubmit}>
                    Save Reminder
                </SubmitButton>
                <Modal
                    icon={
                    <Ionicons name="checkmark" size={24} color={colors.lightRed} />
                    }
                    title="Successful!"
                    text="You’ve set a reminder for Taking a Walk"
                    closeModal={handleDisplay}
                    isOpen={openModal}
                    route={() => router.push(ROUTES.profile)}
                    submitText="Done"
                />
            </Wrapper>
        </ScreenLayout>
    </SafeArea>
  )
}

export default AddReminderPage