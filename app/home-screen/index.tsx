import { Title, Wrapper } from '@/components/typography/Typography';
import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import AppointmentCard from '@/app/home-screen/_components/Appointment';
import Reminder from '@/app/home-screen/_components/Reminder';
import Streak from '@/app/home-screen/_components/Streak';
import Activities from '@/app/home-screen/_components/Activities';
import { ScreenOverFlowLayout } from '@/components/scrollView/ScreenOverFlowLayout';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import useDisplay from '@/hooks/useDisplay';
import ProfileModal from '@/components/modal/Profile';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { ROUTES } from '@/lib/routes';

const HomePage = () => {
  const { openModal, handleDisplay } = useDisplay();
  
  const options = [
    {
      name: "View my Profile",
      url: ROUTES.profile,
    },
    {
      name: "Settings",
      url: '/settings'
    },
    {
      name: "Logout",
      url: ROUTES.login
    }
  ];

  // Dynamic greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <ScreenLayout>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View>
          <Title>{getGreeting()}, Sarah 👋</Title>
          <Text style={styles.subGreeting}>
            Let's take a step toward a healthier you today.
          </Text>
        </View>
        
        <View style={styles.headerIcons}>
          <Pressable 
            style={styles.notificationButton}
            accessibilityLabel="View notifications"
            accessibilityRole="button"
          >
            <MaterialIcons
              name="notifications-none"
              size={22}
              color="#717680"
            />
          </Pressable>
          
          <Pressable
            onPress={handleDisplay}
            style={styles.profileButton}
            accessibilityLabel="Open profile menu"
            accessibilityRole="button"
          >
            <Text style={styles.profileInitial}>S</Text> 
          </Pressable>
        </View>
      </View>

      {/* Main Content */}
      <ScreenOverFlowLayout>
        <Wrapper>
          <Activities />
          <AppointmentCard />
          <Streak />
          <Reminder />
          
          <ProfileModal 
            isOpen={openModal}
            closeModal={handleDisplay}
            options={options}
            icon={<MaterialIcons name="logout" size={17} />}
            values='Logout'
          />
        </Wrapper>
      </ScreenOverFlowLayout>
    </ScreenLayout>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  // Header Styles
  headerContainer: {
    borderBottomWidth: 1,
    borderColor: '#F2F2F2',
    paddingBottom: 20,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  subGreeting: {
    fontFamily: 'LibreFranklin_400Regular',
    fontWeight: '400',
    fontSize: 12,
    color: '#717680',
    marginTop: 2,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  notificationButton: {
    padding: 8,
    borderRadius: 8,
  },
  profileButton: {
    backgroundColor: '#F45A42',
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'LibreFranklin_600SemiBold', 
    fontWeight: '600',
  },

  // Card Styles (keeping your existing styles but organized better)
  cardContainer: {
    padding: 16,
    borderColor: '#F1F1F1',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  
  // Flex Utilities
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  // Button Styles
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    borderTopColor: '#F8F8F8',
    borderTopWidth: 1,
    paddingTop: 16,
    marginTop: 16,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    borderColor: '#D6D7DA',
    borderWidth: 1,
    alignItems: 'center',
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#DD2591',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryButtonText: {
    color: 'white',
  },
  secondaryButtonText: {
    color: '#333',
  },
});