import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Comment from '../components/Comment';

import {LogBox} from 'react-native';

import Rating from '../components/Rating';

import YouTube from 'react-native-youtube';

import Icon from 'react-native-vector-icons/Ionicons';

import HTMLView from 'react-native-htmlview';

import CustomBottomNav from './CustomBottomNav';

import axios from 'axios';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

class MovieDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: [],
      content: '',
      status: '',
      apiKey: 'AIzaSyDXpWnVyISSysQZyK3PwA59obJQiu_Kaw8',
    };
  }
  // this method hides and show the moveie description
  changeStatus = () => {
    const {status} = this.state;
    if (status === 'open') this.setState({status: 'close'});
    else this.setState({status: 'open'});
  };

  fetchCategoryDetails = (category) => {
    const url = `https://trailerbabu.com/wp-json/wp/v2/movie_cat?search=${category}`;
    axios
      .get(url)
      .then((res) => {
        navigation.navigate('Movies', {
          categoryN: res.data[0].name,
          categoryId: res.data[0].id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const {status, apiKey} = this.state;
    const route = this.props.route;
    const navigation = this.props.navigation;
    const {movie} = route.params !== '' ? route.params : 'null';

    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 0.9}}>
          <ScrollView>
            <View
              style={{
                margin: 10,
                height: 40,
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
                backgroundColor: '#0037018D',
              }}>
              <Icon
                onPress={() => navigation.goBack()}
                name="arrow-back-outline"
                size={30}
                color="#FFF"
              />
            </View>
            {/* <ImageBackground
        source={{uri: imageUrl}}
        style = {styles.image}
        imageStyle ={{borderBottomRightRadius:250, borderBottomLeftRadius:35, }}
        /> */}

            {movie !== 'null' ? (
              <View>
                <YouTube
                  apiKey={apiKey}
                  videoId={
                    movie.themeum_movie_trailer_info[0].themeum_video_link
                  } // The YouTube video ID
                  play
                  loop // control whether the video should loop when ended
                  style={{alignSelf: 'stretch', height: 300, margin: 5}}
                />

                <View style={{alignItems: 'flex-end', margin: 5}}>
                  <View style={{alignItems: 'center'}}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#ffffff',
                      }}>
                      {movie.rating / 2}
                    </Text>
                    <Rating ratings={movie.rating / 2} />
                  </View>
                </View>

                <View style={[styles.row, {marginTop: 20, maxWidth: 200}]}>
                  <Text
                    style={{
                      fontFamily: 'Kanit-SemiBold',
                      fontSize: 20,
                      color: '#ffffff',
                      lineHeight: 27,
                      textAlign: 'justify',
                    }}>
                    {movie.title.rendered} ({movie.themeum_movie_release_year})
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.headers}>Release Date : </Text>
                  <Text style={styles.subheader}>
                    {' '}
                    {movie.themeum_release_date}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.headers}>Director : </Text>
                  <Text
                    style={[styles.subheader, {textTransform: 'capitalize'}]}>
                    {' '}
                    {movie.themeum_movie_director}{' '}
                  </Text>
                </View>

                <View style={styles.column}>
                  <Text style={styles.headers}>Actors : </Text>
                  <Text
                    style={[styles.subheader, {textTransform: 'capitalize'}]}>
                    {movie.themeum_movie_actor}{' '}
                  </Text>
                </View>

                <View style={styles.column}>
                  <Text style={styles.headers}>Genre : </Text>
                  <View style={{flexDirection: 'row'}}>
                    {movie.themeum_movie_type.split(', ').map((category, i) => (
                      <TouchableOpacity
                        onPress={() => fetchCategoryDetails(category)}
                        style={styles.categoryList}>
                        <Text style={styles.categoryListText}>{category}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={[]}>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                      elevation: 5,
                      height: 50,
                      marginBottom: 10,
                      marginTop: 10,
                      padding: 10,
                      backgroundColor: '#0037018D',
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: 'Kanit-SemiBold',
                        color: '#ffffff',
                        marginStart: 10,
                      }}>
                      Movie Descriptions :{' '}
                    </Text>
                    <TouchableOpacity onPress={() => this.changeStatus()}>
                      <Icon
                        name="ellipsis-horizontal-outline"
                        size={22}
                        color="#ffffff"
                      />
                    </TouchableOpacity>
                  </View>
                  {status === 'open' ? (
                    <HTMLView
                      addLineBreaks={false}
                      value={movie.content.rendered}
                      stylesheet={stylesC}
                    />
                  ) : null}

                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 24,
                      marginStart: 20,
                      color: '#ffffff',
                      textAlign: 'justify',
                      marginEnd: 10,
                      fontFamily: 'Roboto-Regular',
                    }}></Text>
                </View>

                <View>
                  {/* displays all comments 4186 */}
                  <Comment key={movie.id} postID={movie.id} />
                </View>
              </View>
            ) : (
              <Text>movie is null</Text>
            )}
          </ScrollView>
        </View>

        <CustomBottomNav navigation={navigation} />
      </SafeAreaView>
    );
  }
}

export default MovieDetailsScreen;

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

  headers: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Kanit-SemiBold',
  },
  subheader: {fontSize: 18, color: '#ffffff', fontFamily: 'Roboto-Regular'},
  categoryList: {
    padding: 10,
    margin: 3,
    borderRadius: 10,
    width: 80,
    backgroundColor: '#0037018D',
  },
  categoryListText: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
  },
});

const stylesC = StyleSheet.create({
  p: {
    marginBottom: -45,
    fontSize: 15,
    lineHeight: 26,
    padding: 10,
    textAlign: 'justify',
    fontFamily: 'Roboto-Regular',
    color: '#FFF', // make links coloured pink
  },
});
