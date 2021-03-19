import 'react-native-gesture-handler';
import React, {useEffect, useState, useRef} from 'react';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import OtherStackScreen from './src/screens/OtherStackScreen';
import SplashScreen from './src/screens/SplashScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './src/components/DrawerContent';
import mainContext, {doSome} from './src/context/Context';
import {loginUrl} from './src/const/const'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import analytics from '@react-native-firebase/analytics';
import OneSignal from  'react-native-onesignal'

 axios.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvdHJhaWxlcmJhYnUuY29tIiwiaWF0IjoxNjE1Nzk1MDQ3LCJuYmYiOjE2MTU3OTUwNDcsImV4cCI6MTYxNjM5OTg0NywiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMTI5NCJ9fX0.1QP6gIis9MtWUPGnjSJKjkFuYeXME44aKu2lr5SBPE8';

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

  const navigationRef = useRef();
  const routeNameRef = useRef();

  const [isLogged, setIsLogged] = useState(false); //True if the user is logged in
  const [userToken, setUserToken] = useState(null); //User token, maybe a useless state
  const [userProfile, setUserProfile] = useState(null); //userProfile object, it contains token too
  const [loggingIn, setloggingIn] = useState(false); //True when user is waiting for auth
  const [error, setError] = useState(null); //Error texts from the app or serve
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    OneSignal.setAppId("01706cc8-b5df-4482-9f3c-66981f781739");
    OneSignal.setLogLevel(6, 0);
    OneSignal.setRequiresUserPrivacyConsent(false);
    OneSignal.promptForPushNotificationsWithUserResponse(response => {
        this.OSLog("Prompt response:", response);
    });

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
              email:email,
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
        const userDetails = {
          email:email,
          isLoggedIn: json.status,
          authToken: json.token,
          id: json.data.id,
          user_login: json.data.user_login,
          avatar: json.avatar,
        }

        setUserProfile(userDetails);
        
        setIsLogged(true);
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
      <NavigationContainer theme={CustomDefaultTheme}
      // setting of screens 
      ref={navigationRef}
      onReady={() =>
        (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
      }
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          // The line below uses the expo-firebase-analytics tracker
          // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
          // Change this line to use another Mobile analytics SDK
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName
          });
        
        }

        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}
      
      
      >
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

// some app data

// Your App ID: 01706cc8-b5df-4482-9f3c-66981f781739