import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import { NavigationContainer,
  DefaultTheme as NavigationDefaultTheme, } from '@react-navigation/native';

import OtherStackScreen from './src/screens/OtherStackScreen'
import SplashScreen from './src/screens/SplashScreen'
import { StatusBar } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './src/components/DrawerContent';


const CustomDefaultTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    background: '#37018D',
    text: '#000'
  }
}

const Drawer = createDrawerNavigator();

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
            {/* <OtherStackScreen />    */}
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={OtherStackScreen} />
            <Drawer.Screen name="Article" component={SplashScreen} />
          </Drawer.Navigator>
      </NavigationContainer>
  );
}

export default App