import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import OtherStackScreen from './src/screens/OtherStackScreen';
import SplashScreen from './src/screens/SplashScreen';
import {StatusBar} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './src/components/DrawerContent';
import mainContext, {doSome} from './src/context/Context';
import {loginUrl} from './src/const/const';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// axios.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvdHJhaWxlcmJhYnUuY29tIiwiaWF0IjoxNjE1Nzk1MDQ3LCJuYmYiOjE2MTU3OTUwNDcsImV4cCI6MTYxNjM5OTg0NywiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMTI5NCJ9fX0.1QP6gIis9MtWUPGnjSJKjkFuYeXME44aKu2lr5SBPE8';

const CustomDefaultTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    background: '#37018D',
    text: '#000',
  },
};

const Drawer = createDrawerNavigator();

const App = ({navigation}) => {
  const [isLogged, setIsLogged] = useState(false); //True if the user is logged in
  const [userToken, setUserToken] = useState(null); //User token, maybe a useless state
  const [userProfile, setUserProfile] = useState(null); //userProfile object, it contains token too
  const [loggingIn, setloggingIn] = useState(false); //True when user is waiting for auth
  const [error, setError] = useState(null); //Error texts from the app or serve
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('userProfile').then((value) => {
      if (value !== null) {
        setUserProfile(JSON.parse(value));
        setIsLoading(false);
        setIsLogged(true);
        console.log('From login async storage');
        console.log(value);
      } else {
        setIsLoading(false);
        setIsLogged(false);
      }
    });
  }, []);

  // logout function
  const doLogout = async () => {
    try {
      await AsyncStorage.removeItem('userProfile');
      setloggingIn(true);
      setUserProfile(null);
      setloggingIn(false);
      setIsLogged(false);
      return true;
    } catch (exception) {
      setError('Error deleting data');
      return false;
    }
  };

  //login function
  const doLogin = async (email, password) => {
    //console.log(email + '...' + password);
    setloggingIn(true);
    setError(null);
    let formData = new FormData();
    formData.append('type', 'login');
    formData.append('email', email);
    formData.append('password', password);
    try {
      let response = await fetch(loginUrl, {
        method: 'POST',
        body: formData,
      });
      let json = await response.json();
      if (json.status != false) {
        setError(null);
        try {
          await AsyncStorage.setItem(
            'userProfile',
            JSON.stringify({
              isLoggedIn: json.status,
              authToken: json.token,
              id: json.data.id,
              user_login: json.data.user_login,
              avatar: json.avatar,
            }),
          );
          console.log('Profile stored');
        } catch {
          setError('Error storing data on device');
        }
        setUserProfile({
          isLoggedIn: json.status,
          authToken: json.token,
          id: json.data.id,
          user_login: json.data.user_login,
          avatar: json.avatar,
        });
        setIsLogged(true);
        setUserProfile(json); 
        setUserToken(json.token);
      } else {
        setIsLogged(false);
        setError('Login Failed');
        console.log(json);
      }
      setloggingIn(false);
    } catch (error) {
      console.log(error);
      setError('Error connecting to server');
      setloggingIn(false);
    }
  };

  // context stuff

  const wContext = {
    userProfile: userProfile,
    loggingIn: loggingIn,
    error: error,
    isLogged: isLogged,

    doSome: () => {
      doSome();
    },
    doLogin: (email, password) => {
      doLogin(email, password);
    },
    doLogout: () => {
      doLogout();
    },
  };

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <mainContext.Provider value={wContext}>
      <NavigationContainer theme={CustomDefaultTheme}>
        <OtherStackScreen />
        {/* <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
    //     <Drawer.Screen name="Home" component={OtherStackScreen} />
    //     <Drawer.Screen name="Article" component={SplashScreen} />
    //   </Drawer.Navigator> */}
      </NavigationContainer>
    </mainContext.Provider>

    //   <mainContext.Provider value={wContext}> //WRAP IN CONTEXT
    //   <StatusBar style="dark" />
    //   <NavigationContainer>
    //     <AppStack.Navigator initialRouteName="Login">
    //       {isLogged == false ? ( //SHOWING TO LOGGED OUT USER
    //         <>
    //           <AppStack.Screen name="Login to Wordpress" component={Login} />
    //         </>
    //       ) : (
    //         <>
    //           <AppStack.Screen name="Home" component={Home} /> //SHOWING TO LOGGED IN USER
    //         </>
    //       )}
    //     </AppStack.Navigator>
    //   </NavigationContainer>
    // </mainContext.Provider>
  );
};

export default App;
