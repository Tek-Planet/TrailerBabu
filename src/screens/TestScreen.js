import React, {Component} from 'react';
import {Text, View} from 'react-native';

export class TestScreen extends Component {
  validate() {
    let formData = new FormData();
    formData.append('type', 'login');
    formData.append('email', 'techplanet49@gmail.com');
    formData.append('password', 'QuidProQuo@1012');

    return fetch('https://trailerbabu.com/authentication.php', {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        console.log(res);
      })

      .catch((error) => {
        console.error(error);
      });
  }

  doLogin = async () => {

// short wordpress login scipt

    // const loginDetails = {
    //   username: 'tekplanet',
    //   password: 'QuidProQuo@1012'
    // };

    // axios
    // .post('https://trailerbabu.com/wp-json/jwt-auth/v1/token', loginDetails)
    // .then((res) => {
     
    //     console.log(res.data);
      
    // })
    // .catch((err) => {
    //   console.log(err.message);
    // });


    let formData = new FormData();
    formData.append('type', 'login');
    formData.append('email', 'techplanet9@gmail.com');
    formData.append('password', 'QuidProQuo@1012');
    try {
      let response = await fetch('https://trailerbabu.com/wp-react-login.php', {
        method: 'POST',
        body: formData,
      });
      let json = await response.json();
      //console.log(json);
      if (json.status != false) {
        console.log(json);
      } else {
        console.log('Trouble');
      }
    } catch (error) {
      console.error(error);
      // setError('Error connecting to server');
      // setloggingIn(false);
    }
  };

  componentDidMount() {
    this.doLogin();
  }
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

export default TestScreen;
