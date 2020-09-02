import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer,
  DefaultTheme as NavigationDefaultTheme, } from '@react-navigation/native';
import BottomTab from './src/screens/MainTabScreen'

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
    {
    <BottomTab />
    }
    </NavigationContainer>
  );
}