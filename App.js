import 'react-native-gesture-handler';
import React, {useEffect, useState, useRef} from 'react';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import OtherStackScreen from './src/screens/OtherStackScreen';
import SplashScreen from './src/screens/SplashScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import mainContext, {doSome} from './src/context/Context';
import {loginUrl} from './src/const/const';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import analytics from '@react-native-firebase/analytics';
import OneSignal from 'react-native-onesignal';
import jwtDecode from 'jwt-decode';

// axios.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvdHJhaWxlcmJhYnUuY29tIiwiaWF0IjoxNjE2ODM5NjI0LCJuYmYiOjE2MTY4Mzk2MjQsImV4cCI6MTYxNzQ0NDQyNCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMTI5NCJ9fX0.sbHvmRiHkV9kMTD7j1T4scEdMPvm3sjkX3xdpIN_QK8';

AsyncStorage.getItem('token').then((token) => {
  if (token !== null) {
    //  if we have token stored then check if it has expired
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      // if tooken has expired make request for new token
      console.log('token expired');

      const loginDetals = {
        username: 'TekPlanet',
        password: 'QuidProQuo@1012',
      };

      axios
        .post('https://trailerbabu.com/wp-json/jwt-auth/v1/token', loginDetals)
        .then((res) => {
          // save it in the asyncstorage
          console.log(res.data.token);
          try {
            AsyncStorage.setItem('token', res.data.token);
            console.log('token stored');
            axios.defaults.headers.common['Authorization'] =
              'Bearer ' + res.data.token;
          } catch {
            setError('Error storing data on device');
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    // if token is still valid
    else {
      console.log('Token is still valid');
      console.log(token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
  } else {
    // if we dont have token stored
    const loginDetals = {
      username: 'TekPlanet',
      password: 'QuidProQuo@1012',
    };
    // make request for new token
    axios
      .post('https://trailerbabu.com/wp-json/jwt-auth/v1/token', loginDetals)
      .then((res) => {
        // save it in the asyncstorage
        console.log(res.data.token);
        try {
          AsyncStorage.setItem('token', res.data.token);
          console.log('token stored');
          axios.defaults.headers.common['Authorization'] =
            'Bearer ' + res.data.token;
        } catch {
          setError('Error storing data on device');
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
});

const CustomDefaultTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    background: '#37018D',
    text: '#000',
  },
};

const App = ({navigation}) => {
  const navigationRef = useRef();
  const routeNameRef = useRef();

  const [isLogged, setIsLogged] = useState(false); //True if the user is logged in
  const [userToken, setUserToken] = useState(null); //User token, maybe a useless state
  const [userProfile, setUserProfile] = useState(null); //userProfile object, it contains token too
  const [loggingIn, setloggingIn] = useState(false); //True when user is waiting for auth
  const [error, setError] = useState(null); //Error texts from the app or serve
  const [isLoading, setIsLoading] = useState(true);
  const [reloadComment, setReloadComment] = useState(false);

  useEffect(() => {
    OneSignal.setAppId('01706cc8-b5df-4482-9f3c-66981f781739');
    OneSignal.setLogLevel(6, 0);
    OneSignal.setRequiresUserPrivacyConsent(false);

    // OneSignal.promptForPushNotificationsWithUserResponse((response) => {
    //   this.OSLog('Prompt response:', response);
    // });

    AsyncStorage.getItem('userProfile').then((value) => {
      if (value !== null) {
        setUserProfile(JSON.parse(value));
        setIsLoading(false);
        setIsLogged(true);
        // console.log('From login async storage');
        // console.log(value);
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
    console.log(email + '...' + password);
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
              email: email,
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
          email: email,
          isLoggedIn: json.status,
          authToken: json.token,
          id: json.data.id,
          user_login: json.data.user_login,
          avatar: json.avatar,
        };

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
    reloadComment: reloadComment,
    setReloadComment: setReloadComment,

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
      <NavigationContainer
        theme={CustomDefaultTheme}
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
              screen_class: currentRouteName,
            });
          }

          // Save the current route name for later comparison
          routeNameRef.current = currentRouteName;
        }}>
        <OtherStackScreen />
      </NavigationContainer>
    </mainContext.Provider>
  );
};

export default App;
