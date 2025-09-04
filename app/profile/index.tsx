import { NavHeader } from '@/components/Header/Header';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import Entypo from '@expo/vector-icons/Entypo';
import { Wrapper } from '@/components/typography/Typography';
import { useRouter } from 'expo-router';
import Profile from './_components/Profile';
import SafeArea from '@/components/safeAreaView/SafeAreaView';

const ProfilePage = () => {
  const router = useRouter();
  return (
    <SafeArea>
      <ScreenLayout>
        <NavHeader
          title="My Profile"
          _goBack={() => router.back()}
          backIcon={<Entypo name="chevron-small-left" size={24} color="black" />}
        />
        <ScreenOverFlowLayout>
          <Wrapper>
            <Profile />
          </Wrapper>
        </ScreenOverFlowLayout>
      </ScreenLayout>
    </SafeArea>
  );
};

export default ProfilePage;
