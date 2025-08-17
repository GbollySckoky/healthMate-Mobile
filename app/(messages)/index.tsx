import Nav from '@/components/Header/Nav'
import React, { useState } from 'react'
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import { Wrapper } from '@/components/typography/Typography';
import { View, Text } from 'react-native';
import SearchInput from '@/components/Input/SearchInput';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '@/lib/colors';
import TabViews from './Tab';


const MessagePage = () => {
    const [searchInput, setSearchInput] = useState("")
    console.log(searchInput)
  return (
    <ScreenLayout>
      <Nav
        title="Your Conversations"
      />
      <ScreenOverFlowLayout>
        <Wrapper>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10}}>
                <SearchInput 
                    placeholder='Search for a doctor, specialty, or ho...'
                    value={searchInput}
                    onChangeText={(value) => setSearchInput(value)}
                />
                <Text style={{borderWidth: 1, borderColor: colors.broderColor, padding: 9, borderRadius: 5, marginLeft: 10}}>
                    <Ionicons name="filter-outline" size={20} color="black" />
                </Text>
                
            </View>
            <TabViews />
        </Wrapper>
      </ScreenOverFlowLayout>
    </ScreenLayout>
  )
}

export default MessagePage