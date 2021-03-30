import React, {Component} from 'react';
import {Text, View} from 'react-native';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

// const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvdHJhaWxlcmJhYnUuY29tIiwiaWF0IjoxNjE1Nzk1MDQ3LCJuYmYiOjE2MTU3OTUwNDcsImV4cCI6MTYxNjM5OTg0NywiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMTI5NCJ9fX0.1QP6gIis9MtWUPGnjSJKjkFuYeXME44aKu2lr5SBPE8';
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) 
   console.log('not expired')
  else 
    console.log('expired')
  
}

export class TestScreen extends Component {


 fetchToken (){
    const loginDetals = {
      username: "TekPlanet",
      password: "QuidProQuo@1012"
    };
  
    axios
    .post('https://trailerbabu.com/wp-json/jwt-auth/v1/token', loginDetals)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err.message);
    });
  
  }

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
        console.log(res.data);
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
    // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvdHJhaWxlcmJhYnUuY29tIiwiaWF0IjoxNjE2ODM5NjI0LCJuYmYiOjE2MTY4Mzk2MjQsImV4cCI6MTYxNzQ0NDQyNCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMTI5NCJ9fX0.sbHvmRiHkV9kMTD7j1T4scEdMPvm3sjkX3xdpIN_QK8';
  //  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvdHJhaWxlcmJhYnUuY29tIiwiaWF0IjoxNjE1Nzk1MDQ3LCJuYmYiOjE2MTU3OTUwNDcsImV4cCI6MTYxNjM5OTg0NywiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMTI5NCJ9fX0.1QP6gIis9MtWUPGnjSJKjkFuYeXME44aKu2lr5SBPE8';
    this.doLogin()
    // if (token) {
    //   const decodedToken = jwtDecode(token);
    //   if (decodedToken.exp * 1000 < Date.now()) 
    // {  
     
    //    console.log('token expired')
      
    //   }
    //   else 
    //    { 
    //    console.log('token valid')}
      
    // }
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
