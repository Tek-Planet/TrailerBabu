import Axios from 'axios';
import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios'
import mainContext from '../context/Context';

export function PostComment({postID}) {
  const {userProfile, isLogged} = useContext(
    mainContext,
  );

  const [state, setState] = useState({
    body: '',
    name: isLogged && userProfile ? userProfile.user_login : '',
    email: isLogged && userProfile ? userProfile.email : '',
  });

  const textInputChange = (val) => {

    if (val.trim().length > 0 ) {
      setState({
        ...state,
        body: val,
      });
    }
    else{
      setState({
        ...state,
        body: '',
      });
    }
  };

  const handleNameChange = (val) => {

    if (val.trim().length > 0 ) {
      setState({
        ...state,
        name: val,
      });
    }
    else{
      setState({
        ...state,
        name: '',
      });
    }
  };

  const handleMailChange = (val) => {

    if (val.trim().length > 0 ) {
      setState({
        ...state,
        email: val,
      });
    }
    else{
      setState({
        ...state,
        email: '',
      });
    }
  };

  const saveComment = () => {
    if (
      state.body.length > 0 &&
      state.name.trim().length > 0 &&
      state.email.length > 0
    ) {
      const newComments = {
        post: postID,
        author: 1,
        author_name: state.name,
        author_email: state.email,
        content: state.body
      };

     
      axios
        .post('https://trailerbabu.com/wp-json/wp/v2/comments', newComments)
        .then((res) => {
         
          setState({
            ...state,
            body:''

          })
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      alert('All field must not be empty');
    }
  };

  return (
    <View>
      <View style={{}}>
        <View style={styles.inputContainer}>
          <TextInput
            value =  {state.body}
            multiline={true}
            numberOfLines={5}
            placeholder="Your Comment"
            placeholderTextColor="#666666"
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            style={styles.input}
          />
        </View>
{/* show the username and password when user is not login */}
      { !isLogged ? (
        <View>
          <TextInput
          placeholder="Name"
          placeholderTextColor="#666666"
          autoCapitalize="none"
          onChangeText={(val) => handleNameChange(val)}
          style={styles.inputDetails}
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor="#666666"
          autoCapitalize="none"
          onChangeText={(val) => handleMailChange(val)}
          style={styles.inputDetails}
        />
        </View>
      ) : (null)}
       {/* <Text style={{color:'#fff'}}>{state.body}</Text>
       <Text style={{color:'#fff'}}>{state.email}</Text>
       <Text style={{color:'#fff'}}>{state.name}</Text> */}
        <TouchableOpacity
          onPress={() => {
            saveComment();
          }}
          style={[
            styles.signIn,
            {
              borderColor: '#23395d',
              borderWidth: 1,
              marginTop: 15,
            },
          ]}>
          <Text
            style={[
              styles.textSign,
              {
                color: '#23395d',
              },
            ]}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PostComment;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderWidth: 0,
  },

  input: {
    textAlignVertical: 'top',
    backgroundColor: '#fff',
  },

  inputDetails: {
    marginTop: 10,
    backgroundColor: '#fff',
  },

  signIn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

// Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvdHJhaWxlcmJhYnUuY29tIiwiaWF0IjoxNjE1Nzk1MDQ3LCJuYmYiOjE2MTU3OTUwNDcsImV4cCI6MTYxNjM5OTg0NywiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMTI5NCJ9fX0.1QP6gIis9MtWUPGnjSJKjkFuYeXME44aKu2lr5SBPE8
