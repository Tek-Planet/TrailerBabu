import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen'

import BottomTab from './BottomTabScreen'

const RootStack = createStackNavigator();

function OtherStackScreen ({navigation,  route}) {
    // if (route.state && route.state.index > 0){
    //     navigation.setOptions({tabBarVisisble:false})
    // }
    // else {
    //     navigation.setOptions({tabBarVisisble:true})
    // }
   return (
    <RootStack.Navigator initialRouteName="Home" headerMode='none'>
    
    <RootStack.Screen name="Home" component={BottomTab}/>
    <RootStack.Screen name="Splash" component={SplashScreen}/>

</RootStack.Navigator>
   )
};

export default OtherStackScreen;