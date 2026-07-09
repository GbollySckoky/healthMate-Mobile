import Input from '@/components/Input/Input'
import TextAreaInput from '@/components/Input/TextAreaInput'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import Image from './Image'

export type ReportIssueFormType = Record<string, string>
const Report = () => {
    const [inputValue, setInputValue] = useState<ReportIssueFormType>({})

    const handleChange = (key: string, value: string) => {
        setInputValue((prev) => ({
            ...prev,
            [key]: value
        }))
    }
  return (
    <View style={{marginTop: 20}}>
       <Input
            label="Subject"
            placeholder='Doctor didn’t show up'
            value={inputValue.subject}  
            onChangeText={(value) => handleChange('subject', value)}
       />
       <TextAreaInput 
            placeholder='Describe your issue'
            value={inputValue.description}
            onChangeText={(value) => handleChange('description', value)}
       />
       <Image inputValue={inputValue} setInputValue={setInputValue} />
    </View>
  )
}

export default Report