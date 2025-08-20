import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import { Wrapper } from '@/components/typography/Typography';
import Nav from '@/components/Header/Nav';
import SearchInput from '@/components/Input/SearchInput';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text } from 'react-native';
import { useState } from 'react';
import { colors } from '@/lib/colors';
import Consultation from './components/Consultation';
import TopRated from './components/TopRated';


const ConsultationPage = () => {
    const [searchInput, setSearchInput] = useState("")
  return (
    <ScreenLayout>
    <Nav
      title="Book a Consultation"
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
            <Consultation />
            <TopRated />
      </Wrapper>
      </ScreenOverFlowLayout>
    </ScreenLayout>
  )
}

export default ConsultationPage