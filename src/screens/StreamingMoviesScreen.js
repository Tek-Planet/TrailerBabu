import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Movie from '../components/MovieFull';

import axios from 'axios';
import CustomBottomNav from './CustomBottomNav';

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: 108,
      categoryList: [],
      movieList: [],
      isLoaded: false,
      streaming: [
        {title: 'Netflix', id: '108'},
        {title: 'Amazon Prime Video', id: '2'},
        {title: 'Zee5', id: '115'},
      ],
      alphalist: [
        {id: 'all', name: 'All'},
        {id: 'a', name: 'A'},
        {id: 'b', name: 'B'},
        {id: 'c', name: 'C'},
        {id: 'd', name: 'D'},
        {id: 'e', name: 'E'},
        {id: 'f', name: 'F'},
        {id: 'g', name: 'G'},
        {id: 'h', name: 'H'},
      ],
    };
  }

  changeBg(id) {
    this.setState({categoryId: id});
  }

  componentDidMount() {
    const getStreaming = axios.get(
      'https://trailerbabu.com/wp-json/wp/v2/movie?movie_cat=108',
    );

    Promise.all([getStreaming])
      .then((res) => {
        this.setState({
          movieList: res[0].data,
          isLoaded: true,
        });
      })
      .catch((err) => {
        console.log('************************ Network error**********');
      });
  }

  render() {
    const {isLoaded, streaming, movieList, categoryList} = this.state;
    const navigation = this.props.navigation;

    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 0.9}}>
          <View
            style={{
              padding: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.heading}> Streaming Services</Text>
            <Image duraton="1500" source={require('../img/logo.png')} />
          </View>

          <View style={{marginTop: -20}}>
            <FlatList
              horizontal={true}
              data={streaming}
              renderItem={({item}) => {
                return (
                  <View style={{paddingVertical: 20, paddingLeft: 10}}>
                    <TouchableOpacity
                      onPress={() => [this.changeBg(item.id)]}
                      style={[
                        styles.categoryList,
                        item.id === this.state.categoryId
                          ? {backgroundColor: '#bd10e0'}
                          : null,
                      ]}>
                      <Text style={styles.categoryListText}>{item.title}</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
          {isLoaded ? (
            <View style={{}}>
              <FlatList
                data={movieList}
                renderItem={({item}) => {
                  return (
                    <Movie
                      movie={item}
                      key={item.id.toString()}
                      navigation={navigation}
                    />
                  );
                }}
              />
            </View>
          ) : (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator color="#ffffff" size="large" />
            </View>
          )}

          {/* end of Celebity section */}
        </View>

        <CustomBottomNav navigation={navigation} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: 'row',
    backgroundColor: '#7a00ff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  categoryList: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#232323',
  },
  categoryListText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 14,
  },

  heading: {color: '#ffffff', fontSize: 20, fontWeight: 'bold'},
});
