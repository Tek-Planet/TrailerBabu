import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import {useTheme} from 'react-native-paper';

// import { AuthContext } from '../components/context';

// import Users from '../model/users';

const SignInScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    email: '',
    website: '',
    firstname: '',
    lastname: '',
    nickname: '',
    about: '',
    check_textInputChange: false,
    check_mail: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidMail: true,
    isValidPassword: true,
  });

  const {colors} = useTheme();

  // const { signIn } = React.useContext(AuthContext);

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleEmailChange = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        email: val,
        check_mail: true,
        isValidMail: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_mail: false,
        isValidMail: false,
      });
    }
  };

  const handleFirstName = (val) => {
    setData({
      ...data,
      firstname: val,
    });
  };

  const handleLastName = (val) => {
    setData({
      ...data,
      lastname: val,
    });
  };

  const handleNickName = (val) => {
    setData({
      ...data,
      nickname: val,
    });
  };

  const handleAbout = (val) => {
    setData({
      ...data,
      about: val,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = (userName, password) => {
    // const foundUser = Users.filter( item => {
    //     return userName == item.username && password == item.password;
    // } );

    if (data.username.length == 0 || data.password.length == 0) {
      Alert.alert(
        'Wrong Input!',
        'Username or password field cannot be empty.',
        [{text: 'Okay'}],
      );
      return;
    }

    // if ( foundUser.length == 0 ) {
    //     Alert.alert('Invalid User!', 'Username or password is incorrect.', [
    //         {text: 'Okay'}
    //     ]);
    //     return;
    // }
    // signIn(foundUser);
    Alert.alert('Valid input');
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor='#009387' barStyle="light-content"/> */}

      <View style={styles.header}>
        <Image
          style={{width: 250, height: 30, marginTop: 15}}
          source={require('../img/logo.png')}
        />
        <Text style={styles.text_header}>Register New Account</Text>
      </View>

      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}>
        <ScrollView>
          <Text
            style={[
              styles.text_footer,
              {
                color: '#37018D',
              },
            ]}>
            Username
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="{colors.text}" size={20} />
            <TextInput
              placeholder="Your Username"
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
              onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {data.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Username must be 4 characters long.
              </Text>
            </Animatable.View>
          )}

          <Text
            style={[
              styles.text_footer,
              {
                color: '#37018D',
              },
            ]}>
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color={colors.text} size={20} />
            <TextInput
              placeholder="Your Password"
              placeholderTextColor="#666666"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {data.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Password must be 8 characters long.
              </Text>
            </Animatable.View>
          )}

          {/* Email textbox */}
          <Text
            style={[
              styles.text_footer,
              {
                color: '#37018D',
              },
            ]}>
            Email
          </Text>
          <View style={styles.action}>
            <FontAwesome name="envelope-o" color="{colors.text}" size={20} />
            <TextInput
              placeholder="eg johndoe@mail.com"
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => handleEmailChange(val)}
            />
            {data.check_mail ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {data.isValidMail ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>invalid mail format</Text>
            </Animatable.View>
          )}
          {/* end of email box */}

          {/* start of website */}

          <Text
            style={[
              styles.text_footer,
              {
                color: '#37018D',
              },
            ]}>
            Website
          </Text>
          <View style={styles.action}>
            <FontAwesome
              name="internet-explorer"
              color="{colors.text}"
              size={20}
            />
            <TextInput
              placeholder="eg. example.com"
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
            />
          </View>

          {/* End of webstite textbox */}

          {/* start of firstname */}

          <Text
            style={[
              styles.text_footer,
              {
                color: '#37018D',
              },
            ]}>
            Firstname
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="{colors.text}" size={20} />
            <TextInput
              placeholder="eg. John"
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => handleFirstName(val)}
            />
          </View>
          {/* end of firstname */}

          {/* start of lastname */}

          <Text
            style={[
              styles.text_footer,
              {
                color: '#37018D',
              },
            ]}>
            Lastname
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="{colors.text}" size={20} />
            <TextInput
              placeholder="eg. Doe"
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => handleLastName(val)}
            />
          </View>
          {/* end of lastname */}
          {/* start of nickname */}

          <Text
            style={[
              styles.text_footer,
              {
                color: '#37018D',
              },
            ]}>
            Nickname
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="{colors.text}" size={20} />
            <TextInput
              placeholder="eg. Niki"
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => handleNickName(val)}
            />
          </View>
          {/* end of nickname */}
          {/* start of about */}

          <Text
            style={[
              styles.text_footer,
              {
                color: '#37018D',
              },
            ]}>
            About
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="{colors.text}" size={20} />
            <TextInput
              placeholder="who are you"
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => handleAbout(val)}
            />
          </View>
          {/*end about text field */}

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                loginHandle(data.username, data.password);
              }}>
              <LinearGradient
                colors={['#08d4c4', '#37018D']}
                style={styles.signIn}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#fff',
                    },
                  ]}>
                  Sign Up
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('SignIn')}
              style={[
                styles.signIn,
                {
                  borderColor: '#37018D',
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#37018D',
                  },
                ]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    alignItems: 'center',
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 25,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
    marginTop: 15,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
