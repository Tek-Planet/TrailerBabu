import React from 'react';
import {Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import MoviesScreen from './MoviesScreen';
import CelebrityScreen from './CelebrityListScreen';
import SearchScreen from './SearchScreen';
import SettingsScreen from './SettingsScreen';

import StreamingMovieScreen from './StreamingMoviesScreen';
import UpcomingListScreen from './UpcomingListScreen';

// const Tab = createMaterialBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const activeTintColor = '#bd10e0';
const inactiveTintColor = 'gray';

const MainTabScreen = () => (
  <Tab.Navigator
    activeColor="#FFC0CB"
    inactiveColor="#A9A9A9"
    initialRouteName="Home"
    labeled={false}
    barStyle={{backgroundColor: '#222222', height: 60}}
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color}) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused ? 'ios-play' : 'ios-play-outline';
        } else if (route.name === 'Movies') {
          iconName = focused ? 'videocam' : 'videocam-outline';
        } else if (route.name === 'Celebrity') {
          iconName = focused ? 'ios-person' : 'ios-person-outline';
        } else if (route.name === 'Search') {
          iconName = focused ? 'ios-search' : 'ios-search-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'ios-settings' : 'ios-settings-outline';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={26} color={color} />;
      },
    })}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Movies" component={MoviesScreen} />
    <Tab.Screen name="Celebrity" component={CelebrityScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

export default MainTabScreen;

function MovieStack({route, navigation}) {
  if (
    route.state &&
    route.state.routeNames[route.state.index] === 'StreamingMovieList'
  ) {
    navigation.setOptions({tabBarVisisble: false});
  } else {
    navigation.setOptions({tabBarVisisble: true});
  }

  return (
    <Stack.Navigator initialRouteName="MoviesList" headerMode="none">
      <Stack.Screen name="MoviesList" component={MoviesScreen} />
      <Stack.Screen
        name="StreamingMovieList"
        component={StreamingMovieScreen}
      />
      <Stack.Screen
        name="UpcomingListScreenUpcomingListScreen"
        component={UpcomingListScreen}
      />
    </Stack.Navigator>
  );
}
