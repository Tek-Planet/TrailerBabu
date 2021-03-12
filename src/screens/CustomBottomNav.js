import React from 'react';

import {View, TouchableOpacity} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

function CustomBottomNav({navigation}) {
  return (
    <View
      style={{
        flex: 0.1,
        flexDirection: 'row',
        backgroundColor: '#222222',
        height: 60,
        justifyContent: 'space-evenly',
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home', {screen: 'Home'})}>
        <Ionicons
          style={{marginTop: 15}}
          name="ios-play-outline"
          size={22}
          color="#ffffff"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Home', {screen: 'Movies'})}>
        <Ionicons
          style={{marginTop: 15}}
          name="videocam-outline"
          size={22}
          color="#ffffff"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Home', {screen: 'Celebrity'})}>
        <Ionicons
          style={{marginTop: 15}}
          name="ios-person-outline"
          size={22}
          color="#ffffff"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Home', {screen: 'Search'})}>
        <Ionicons
          style={{marginTop: 15}}
          name="ios-search-outline"
          size={22}
          color="#ffffff"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Home', {screen: 'Settings'})}>
        <Ionicons
          style={{marginTop: 15}}
          name="ios-settings-outline"
          size={22}
          color="#ffffff"
        />
      </TouchableOpacity>
    </View>
  );
}

export default CustomBottomNav;
