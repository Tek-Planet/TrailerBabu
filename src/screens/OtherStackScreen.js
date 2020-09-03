import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

// import SplashScreen from './SplashScreen';
// import SignInScreen from './SignInScreen';
// import SignUpScreen from './SignUpScreen';

import MovieDetailsScreen from './MovieDetailsScreen'

import BottomTab from './MainTabScreen'

const RootStack = createStackNavigator();

const OtherStackScreen = ({navigation}) => (
    <RootStack.Navigator initialRouteName="Home" headerMode='none'>
    
        <RootStack.Screen name="Home" component={BottomTab}/>
        <RootStack.Screen name="MovieDetails" component={MovieDetailsScreen}/>
        {/* <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/> */}
    </RootStack.Navigator>
);

export default OtherStackScreen;