import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './src/screens/MainTabScreen'

export default function App() {
  return (
    <NavigationContainer>
    {
    <BottomTab />
    }
    </NavigationContainer>
  );
}