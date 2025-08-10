import { NavHeader } from '@/components/Header/Header';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import Entypo from '@expo/vector-icons/Entypo';
import { Card, CardAmount, CardText, DetailsContainer, SubTitle, Wrapper } from '@/components/typography/Typography';
import { useRouter } from 'expo-router';



const ProfilePage = () => {
    const router = useRouter()
  return (
    <ScreenLayout>
    <NavHeader 
      title='My Profile'
      _goBack={() => router.replace('/(tabs)/home')}
      backIcon={<Entypo name="chevron-small-left" size={24} color="black"  />}
    />
    <ScreenOverFlowLayout>
      <Wrapper>
    
      </Wrapper>
      </ScreenOverFlowLayout>
    </ScreenLayout>
  )
}

export default ProfilePage