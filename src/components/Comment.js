import React, {useContext, useState, useEffect} from 'react';
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
import mainContext from '../context/Context';

export default function Comment({postID}) {
  const {reloadComment, setReloadComment} = useContext(mainContext);

  const [state, setState] = useState({
    isLoading: false,
    comments: [],
  });

  useEffect(() => {
    fetchComments();
  });

  // if (reloadComment) {
  //   test();
  // }

  const test = () => {
    alert('mee');
  };

  const fetchComments = () => {
    axios
      .get(`https://trailerbabu.com/wp-json/wp/v2/comments?post=${postID}`)
      .then((res) => {
        setState({
          ...state,
          comments: res.data,
          isLoading: true,
        });
      });
  };

  dayjs.extend(relativeTime);

  let commentMarkup =
    state.comments.length !== 0 ? (
      <FlatList
        data={state.comments}
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

                  {/* <View style={{marginTop: -10, marginBottom: 10}}>
                    {item.rating ? (
                      <Rating ratings={item.rating} />
                    ) : (
                      <Rating ratings={0} />
                    )}
                  </View> */}
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

  let checkIfCommentIsLoaded = state.isLoading ? (
    commentMarkup
  ) : (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator color="#ffffff" size="large" />
    </View>
  );

  return (
    <View style={{padding: 20}}>
      <Text
        style={{
          fontSize: 22,
          marginBottom: 10,
          fontWeight: 'bold',
          color: '#ffffff',
        }}>
        Reviews
      </Text>

      {checkIfCommentIsLoaded}

      <PostComment postID={postID} />
    </View>
  );
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
