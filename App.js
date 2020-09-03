import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer,
  DefaultTheme as NavigationDefaultTheme, } from '@react-navigation/native';
import OtherStackScreen from './src/screens/OtherStackScreen'

const CustomDefaultTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    background: '#37018D',
    text: '#fff'
  }
}

export default function App() {

  return (
    <NavigationContainer theme={CustomDefaultTheme}>
  
     <OtherStackScreen />
    
    </NavigationContainer>
  );
}