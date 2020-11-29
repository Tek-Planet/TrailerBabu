import React from 'react';
import {  Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


import HomeScreen from './HomeScreen'
import MoviesScreen from './MoviesScreen'
import CelebrityScreen from './CelebrityListScreen'
import SearchScreen from './SearchScreen'
import SettingsScreen from './SettingsScreen'


// const Tab = createMaterialBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();

const   activeTintColor = '#bd10e0'
const   inactiveTintColor = 'gray'

const MainTabScreen = () => (
    <Tab.Navigator
    activeColor="#FFC0CB"
    inactiveColor="#A9A9A9"
    initialRouteName="Home"
    labeled = {false}
    barStyle={{ backgroundColor: '#222222', }}
 

    screenOptions={({ route }) => ({    
    // tabBarLabel: ({ focused }) => {
    //     let labelName;
    //     if (route.name === 'Home') {
    //         labelName = 'Home'
    //     }
    //     else if (route.name === 'Movies') {
    //         labelName = 'Movies'
    //       }
    //     else if (route.name === 'Celebrity') {
    //     labelName = 'Celebrity'
    //       }
    //     else if (route.name === 'Search') {
    //         labelName = 'Search'
    //           }
    //     else if (route.name === 'Settings') {
    //     labelName = 'Settings'
    //         }
    //     return  <Text style={{ fontSize: 11, 
    //     color: focused ? activeTintColor : inactiveTintColor       
    // }}>  {labelName}  </Text>
    // },
      tabBarIcon: ({ focused, color }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused
            ? 'ios-play'
            : 'ios-play-outline';
        } else if (route.name === 'Movies') {
          iconName = focused ? 'videocam' : 'videocam-outline';
        }
        else if (route.name === 'Celebrity') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
          }
          else if (route.name === 'Search') {
            iconName = focused ? 'ios-search' : 'ios-search-outline';
          }
          else if (route.name === 'Settings') {
            iconName = focused ? 'ios-settings' : 'ios-settings-outline';
          }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={26} color={color} />;
      },
    })}
    

  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Movies" component={MoviesScreen} />
    <Tab.Screen name="Celebrity" component={CelebrityScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
    
);

export default MainTabScreen;





  