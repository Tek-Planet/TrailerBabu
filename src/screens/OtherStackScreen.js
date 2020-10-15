import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';


import MovieDetailsScreen from './MovieDetailsScreen'
import CelebrityDetailsScreen from './CelebrityDetailsScreen'
import MovieListScreen from './MovieListScreen'
import CelebrityListScreen from './CelebrityListScreen'
import SplashScreen from './SplashScreen'

import BottomTab from './MainTabScreen'

const RootStack = createStackNavigator();

const OtherStackScreen = ({navigation}) => (
    <RootStack.Navigator initialRouteName="Home" headerMode='none'>
    
        <RootStack.Screen name="Home" component={BottomTab}/>
        <RootStack.Screen name="MovieDetails" component={MovieDetailsScreen}/>
        <RootStack.Screen name="MovieList" component={MovieListScreen}/>
        <RootStack.Screen name="CelebrityDetails" component={CelebrityDetailsScreen}/>
        <RootStack.Screen name="Splash" component={SplashScreen}/>
        
        {/* <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/> */}
    </RootStack.Navigator>
);

export default OtherStackScreen;