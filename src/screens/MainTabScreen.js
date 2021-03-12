import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import MoviesScreen from './MoviesScreen';
import ProfileScreen from './CelebrityListScreen';
import SearchScreen from './SearchScreen';
import SettingsScreen from './SettingsScreen';

const HomeStack = createStackNavigator();
const MoviesStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator initialRouteName="Home" activeColor="#fff">
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#333333',
        tabBarIcon: ({color}) => (
          <Icon name="play-outline" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Movies"
      component={MoviesScreen}
      options={{
        tabBarLabel: 'Movies',
        tabBarColor: '#1f65ff',
        tabBarIcon: ({color}) => (
          <Icon name="videocam-outline" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="CelebrityList"
      component={ProfileScreen}
      options={{
        tabBarLabel: <Text>Celebrity</Text>,
        tabBarColor: '#694fad',
        tabBarIcon: ({color}) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchScreen}
      options={{
        tabBarLabel: 'Search',
        tabBarColor: '#d02860',
        tabBarIcon: ({color}) => (
          <Icon name="search-outline" color={color} size={26} />
        ),
      }}
    />

    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        tabBarLabel: 'Settings',
        tabBarColor: '#d02860',
        tabBarIcon: ({color}) => (
          <Icon name="settings-outline" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;
