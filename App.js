import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import { NavigationContainer,
  DefaultTheme as NavigationDefaultTheme, } from '@react-navigation/native';

import OtherStackScreen from './src/screens/OtherStackScreen'
import SplashScreen from './src/screens/SplashScreen'
import { StatusBar } from 'react-native';

const CustomDefaultTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    background: '#37018D',
    text: '#fff'
  }
}



const  App = () => {

const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout( () => {
      setIsLoading(false)
    },
     500);
  }, []);

  if(isLoading)
  {
    return(   <SplashScreen />   )
  }
  return (
       <NavigationContainer theme={CustomDefaultTheme}>
           <OtherStackScreen />   
      </NavigationContainer>
  );
}

export default App