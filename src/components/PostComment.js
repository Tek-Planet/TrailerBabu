import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export function PostComment() {
  return (
    <View>
      <View style={{}}>
        <View style={styles.inputContainer}>
          <TextInput
            multiline={true}
            numberOfLines={5}
            placeholder="Your Comment"
            placeholderTextColor="#666666"
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            style={styles.input}
          />
        </View>

        <TextInput
          placeholder="Name"
          placeholderTextColor="#666666"
          autoCapitalize="none"
          onChangeText={(val) => textInputChange(val)}
          style={styles.inputDetails}
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor="#666666"
          autoCapitalize="none"
          onChangeText={(val) => textInputChange(val)}
          style={styles.inputDetails}
        />

        <TouchableOpacity
          onPress={() => {
            // saveComment();
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
