import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';


import MovieDetailsScreen from './MovieDetailsScreen'
import CelebrityDetailsScreen from './CelebrityDetailsScreen'
import MovieListScreen from './MovieListScreen'
import UpcomingListScreen from './UpcomingListScreen'
import HomeScreen from './HomeScreen'


const RootStack = createStackNavigator();

const OtherStackScreen = ({navigation}) => (
    <RootStack.Navigator     headerMode='none'> 
        <RootStack.Screen name="Index" component={HomeScreen} />
        <RootStack.Screen name="MovieDetails" component={MovieDetailsScreen}/>
        <RootStack.Screen name="MovieList" component={MovieListScreen}/>
        <RootStack.Screen name="UpcomingList" component={UpcomingListScreen}/>
        <RootStack.Screen name="CelebrityDetails" component={CelebrityDetailsScreen}/>
       
    </RootStack.Navigator>
);

export default OtherStackScreen;