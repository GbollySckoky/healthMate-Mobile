import * as React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AllChats from './_components/AllChats';
import OpenChats from './_components/OpenChats';
import ClosedChats from './_components/ClosedChats';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// const FirstRoute = () => (
//   <View style={styles.scene}>
//     <AllChats />
//   </View>
// );

// const SecondRoute = () => (
//   <View style={styles.scene}>
//     <OpenChats />
//   </View>
// );

// const ThirdRoute = () => (
//   <View style={styles.scene}>
//     <ClosedChats />
//   </View>
// );

// const renderScene = SceneMap({
//   first: FirstRoute,
//   second: SecondRoute,
//   third: ThirdRoute
// });

const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.label}
      activeColor="#007AFF"
      inactiveColor="#8E8E93"
    />
  );
  
  const routes = [
    { key: 'first', title: 'All Chats' },
    { key: 'second', title: 'Open Chats' },
    { key: 'third', title: 'Closed Chats' },
  ];
  

export default function TabViews() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'first':
        return (
          <View style={styles.scene}>
            <AllChats />
          </View>
        );
      case 'second':
        return (
          <View style={styles.scene}>
            <OpenChats />
          </View>
        );
      case 'third':
        return (
          <View style={styles.scene}>
            <ClosedChats />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: screenHeight - 100, // Force specific height
    // width: screenWidth,
    // backgroundColor: '#fff',
  },
  tabView: {
    flex: 1,
    height: '100%', // Ensure full height usage
  },
  scene: {
    flex: 1,
    // backgroundColor: '#f0f0f0',
    // padding: 20,
    marginTop: 30,
    minHeight: 500, // Force minimum height for scenes
  },
  debugText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: 'yellow',
    padding: 10,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
  tabBar: {
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  indicator: {
    backgroundColor: '#007AFF',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'none',
  },
});