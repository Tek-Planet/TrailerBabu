import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import Rating from '../components/Rating';
import Icon from 'react-native-vector-icons/Ionicons';
import PostComment from './PostComment';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      comments: [],
    };
  }

  static propTypes = {
    postID: PropTypes.number.isRequired,
  };

  componentDidMount() {
    const {postID} = this.props;

    axios
      .get(`https://trailerbabu.com/wp-json/wp/v2/comments?post=${postID}`)
      .then((res) => {
        this.setState({
          comments: res.data,
          isLoading: true,
        });
      });
  }

  render() {
    dayjs.extend(relativeTime);
    const {isLoading, comments} = this.state;

    let commentMarkup =
      comments.length !== 0 ? (
        <FlatList
          data={comments}
          renderItem={({item}) => {
            const regex = /(<([^>]+)>)/gi;
            const content = item.content.rendered.replace(regex, '');
            return (
              <View>
                <View style={{flexDirection: 'row'}}>
                  <View stywi>
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 100,
                      }}
                      source={require('../img/background/noImage.png')}
                    />
                  </View>
                  <View
                    style={{
                      marginStart: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: 'Roboto-Regular',
                        color: '#ffffff',
                      }}>
                      {item.author_name}
                    </Text>

                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: 'Roboto-Regular',
                        color: '#ffffff',
                      }}>
                      {dayjs(item.date).format('DD/MM/YYYY')}
                    </Text>

                    {/* <Text style={{fontSize:20, fontWeight:"bold", color:"#ffffff"}}>Rating</Text>               */}

                    <Text
                      style={{
                        lineHeight: 26,
                        marginTop: 5,
                        textAlign: 'justify',
                        fontSize: 15,
                        fontFamily: 'Roboto-Regular',
                        color: '#ffffff',
                      }}>
                      {content}
                    </Text>

                    <View style={{marginTop: -10, marginBottom: 10}}>
                      {item.rating ? (
                        <Rating ratings={item.rating} />
                      ) : (
                        <Rating ratings={0} />
                      )}
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: 'normal', color: '#ffffff'}}>
            {' '}
            No review for this movie yet{' '}
          </Text>
        </View>
      );

    let checkIfCommentIsLoaded = isLoading ? (
      commentMarkup
    ) : (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator color="#ffffff" size="large" />
      </View>
    );

    return (
      <View style={{padding: 20}}>
        <Text style={{fontSize: 22, fontWeight: 'bold', color: '#ffffff'}}>
          Reviews
        </Text>

        {checkIfCommentIsLoaded}

        <PostComment />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
});
