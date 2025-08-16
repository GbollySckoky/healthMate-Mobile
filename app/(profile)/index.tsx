import { NavHeader } from '@/components/Header/Header';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import Entypo from '@expo/vector-icons/Entypo';
import { Wrapper } from '@/components/typography/Typography';
import { useRouter } from 'expo-router';
import Profile from './_components/Profile';

const ProfilePage = () => {
  const router = useRouter();
  return (
    <ScreenLayout>
      <NavHeader
        title="My Profile"
        _goBack={() => router.replace('/(tabs)/home')}
        backIcon={<Entypo name="chevron-small-left" size={24} color="black" />}
      />
      <ScreenOverFlowLayout>
        <Wrapper>
          <Profile />
        </Wrapper>
      </ScreenOverFlowLayout>
    </ScreenLayout>
  );
};

export default ProfilePage;
