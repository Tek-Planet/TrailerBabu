import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Linking,
  BackHandler,
} from 'react-native';

import Comment from '../components/Comment';

import {LogBox} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import HTMLView from 'react-native-htmlview';
import {TouchableOpacity} from 'react-native-gesture-handler';

import CustomBottomNav from './CustomBottomNav';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

export default function CelebrityDetailsScreen({route, navigation}) {
  /* 2. Get the param */
  const {imageUrl} = route.params;
  const {celebrity} = route.params;
  const content = celebrity.content.rendered;
  const insta = celebrity.themeum_instagram_url;
  const fb = celebrity.themeum_facebook_url;
  const youtube = celebrity.themeum_youtube_url;
  const twitter = celebrity.themeum_twitter_url;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 0.9}}>
        <ScrollView>
          {imageUrl !== 'noImage' ? (
            <ImageBackground
              source={{uri: imageUrl}}
              style={styles.image}
              imageStyle={{
                borderBottomRightRadius: 250,
                borderBottomLeftRadius: 120,
              }}
            />
          ) : (
            <ImageBackground
              source={require('../img/background/noImage.png')}
              style={styles.image}
              imageStyle={{
                borderBottomRightRadius: 230,
                borderBottomLeftRadius: 50,
              }}
            />
          )}

          <View
            style={{
              position: 'absolute',
              right: 3,
              top: 350,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#ffffff'}}>
              Follow On
            </Text>

            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                right: 5,
                top: 30,
              }}>
              {youtube !== '' ? (
                <TouchableOpacity onPress={() => Linking.openURL(youtube)}>
                  <Icon
                    name="youtube"
                    style={styles.icon}
                    color={'#dddddd'}
                    size={20}
                  />
                </TouchableOpacity>
              ) : null}

              {fb !== '' ? (
                <TouchableOpacity onPress={() => Linking.openURL(fb)}>
                  <Icon
                    name="facebook"
                    style={styles.icon}
                    color={'#dddddd'}
                    size={20}
                  />
                </TouchableOpacity>
              ) : null}

              {twitter !== '' ? (
                <TouchableOpacity onPress={() => Linking.openURL(twitter)}>
                  <Icon
                    name="twitter"
                    style={styles.icon}
                    color={'#fff'}
                    size={20}
                  />
                </TouchableOpacity>
              ) : null}

              {insta !== '' ? (
                <TouchableOpacity onPress={() => Linking.openURL(insta)}>
                  <Icon
                    name="instagram"
                    style={styles.icon}
                    color={'#fff'}
                    size={20}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>

          <View style={[styles.row, {marginTop: 40}]}>
            <Text style={styles.headers}>{celebrity.title.rendered}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.miniheaders}>Birthday Date : </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'normal',
                color: '#ffffff',
              }}></Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.miniheaders}>Height : </Text>
            <Text
              style={{fontSize: 20, fontWeight: 'normal', color: '#ffffff'}}>
              {celebrity.celebrity_info.themeum_info_description}
            </Text>
          </View>

          {/* <View style={styles.row}>
          <Text style={{fontSize:20, fontWeight:"bold", color:"#ffffff"}}>Director : </Text>   
          <Text style={{fontSize:20, fontWeight:"normal", color:"#ffffff"}}> { movie.themeum_movie_director} </Text>                  
     </View> */}

          {/* <View style={styles.column}>
          <Text style={{fontSize:20, fontWeight:"bold", color:"#ffffff"}}>Actors : </Text>   
          <Text style={{fontSize:20, fontWeight:"normal", color:"#ffffff"}}>{movie.themeum_movie_actor} </Text>                  
     </View> */}

          {/* <View style={styles.column}>
          <Text style={{fontSize:20, fontWeight:"bold", color:"#ffffff"}}>Genre : </Text>   
          <Text style={{fontSize:20, fontWeight:"normal", color:"#ffffff"}}>{movie.themeum_movie_type} </Text>                  
     </View> */}

          <View style={styles.column}>
            <Text style={styles.miniheaders}>Biography : </Text>
          </View>

          <HTMLView
            addLineBreaks={false}
            value={content}
            stylesheet={stylesC}
          />

          <View style={styles.column}>
            <Text style={styles.miniheaders}>Filmography : </Text>

            <Text
              style={{
                fontSize: 18,
                marginTop: 10,
                marginBottom: 10,
                fontWeight: 'normal',
                color: '#ffffff',
              }}>
              Do your API has an end point to generate film by the celebrity
              because I cant find it{' '}
            </Text>
          </View>
        </ScrollView>
      </View>

      <CustomBottomNav navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  categoryList: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#310F5B',
  },
  categoryListText: {
    color: '#ffffff',
    fontSize: 14,
  },

  image: {
    height: 380,
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    maxWidth: 300,
    marginStart: 20,
    marginTop: 15,
  },

  column: {
    marginStart: 20,
    marginTop: 15,
  },

  icon: {
    margin: 5,
  },
  headers: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Kanit-SemiBold',
  },
  miniheaders: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Kanit-SemiBold',
  },
  subheader: {
    fontSize: 15,
    marginTop: 10,
    marginEnd: 10,
    lineHeight: 26,
    color: '#ffffff',
    fontFamily: 'Roboto-Regular',
  },
});

const stylesC = StyleSheet.create({
  p: {
    marginBottom: -45,
    fontSize: 15,
    lineHeight: 26,
    padding: 10,
    marginStart: 10,
    textAlign: 'justify',
    fontFamily: 'Roboto-Regular',
    color: '#FFF', // make links coloured pink
  },
});
