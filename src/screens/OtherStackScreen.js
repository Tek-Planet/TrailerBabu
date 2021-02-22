import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen'
import BottomTab from './BottomTabScreen'
import MovieDetailsScreen from './MovieDetailsScreen'
import CelebrityDetailsScreen from './CelebrityDetailsScreen'
import StreamingMovieList  from './StreamingMoviesScreen'
import UpcomingListScreen  from './UpcomingListScreen'
import SignInScreen  from './SignInScreen'
import SignUpScreen  from './SignUpScreen'


const RootStack = createStackNavigator();

function OtherStackScreen () {
  
   return (

    <RootStack.Navigator initialRouteName="Home" headerMode='none'>
    <RootStack.Screen name="Home" component={BottomTab}/>
    <RootStack.Screen name="SignIn" component={SignInScreen}/>
    <RootStack.Screen name="SignUp" component={SignUpScreen}/>
    <RootStack.Screen name="Splash" component={SplashScreen}/>
    <RootStack.Screen name="MovieDetails"  component={MovieDetailsScreen} />
    <RootStack.Screen name="CelebrityDetails"  component={CelebrityDetailsScreen} />
    <RootStack.Screen name="StreamingMovieList"  component={StreamingMovieList} />
    <RootStack.Screen name="UpcomingListScreen"  component={UpcomingListScreen} />

</RootStack.Navigator>
   )
};

export default OtherStackScreen;