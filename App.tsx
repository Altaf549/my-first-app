import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CountryList from './src/screens/CountryList';
import ProfileScreen from './src/screens/profile';
import TouristScreen from './src/screens/TouristScreen';
import HotelScreen from './src/screens/HotelScreen';
import SettingsScreen from './src/screens/SettingsScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  CountryList: undefined;
  Profile: undefined;
  Tourist: undefined;
  Hotel: undefined;
  Settings: undefined;
};

export type TabParamList = {
  Home: undefined;
  Profile: undefined;
  Tourist: undefined;
  Hotel: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'home';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Tourist') {
            iconName = focused ? 'airplane' : 'airplane-outline';
          } else if (route.name === 'Hotel') {
            iconName = focused ? 'bed' : 'bed-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={CountryList} 
        options={{ title: 'Home' }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: 'Profile' }} 
      />
      <Tab.Screen 
        name="Tourist" 
        component={TouristScreen} 
        options={{ title: 'Tourist' }} 
      />
      <Tab.Screen 
        name="Hotel" 
        component={HotelScreen} 
        options={{ title: 'Hotels' }} 
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ title: 'Settings' }} 
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator>
        <Stack.Screen 
          name="MainTabs" 
          component={HomeTabs} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="CountryList" component={CountryList} options={{ title: 'Countries' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Tourist" component={TouristScreen} />
        <Stack.Screen name="Hotel" component={HotelScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
