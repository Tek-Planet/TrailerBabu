import React, { Component } from 'react';
import { View, Text, Image, ImageBackground , StyleSheet, SafeAreaView, ScrollView} from 'react-native';

import Comment from '../components/Comment'

import { LogBox } from 'react-native'

import Rating from '../components/Rating'

import YouTube from 'react-native-youtube';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
])




export default function MovieDetailsScreen({ route, navigation }) {
  /* 2. Get the param */
  const { imageUrl } = route.params;
  const { movie } = route.params;
  const regex = /(<([^>]+)>)/ig;
  const content = movie.content.rendered.replace(regex, '');
  return (
<ScrollView style={{flex: 1}}>
      <View >
      {/* <ImageBackground
      source={{uri: imageUrl}}
      style = {styles.image}
      imageStyle ={{borderBottomRightRadius:250, borderBottomLeftRadius:35, }}
      /> */}
      
      <YouTube
        apiKey = "AIzaSyDXpWnVyISSysQZyK3PwA59obJQiu_Kaw8"
        videoId={movie.themeum_movie_trailer_info[0].themeum_video_link} // The YouTube video ID
        play // control playback of video with true/false
        // fullscreen // control whether the video should play in fullscreen or inline
        loop // control whether the video should loop when ended
        // onReady={e => this.setState({ isReady: true })}
        // onChangeState={e => this.setState({ status: e.state })}
        // onChangeQuality={e => this.setState({ quality: e.quality })}
        // onError={e => this.setState({ error: e.error })}
        style={{ alignSelf: 'stretch', height: 300, margin:5}}
        />
      <View style={{position:"absolute", right:5, top:330, alignItems: 'center', justifyContent: 'center' }}>                           
          <Text style={{fontSize:20, fontWeight:"bold", color:"#ffffff"}}>{movie.rating}</Text>  
          <Rating ratings = {movie.rating} />   
      </View>
      
     <View style={[styles.row, {marginTop: 25,}]}>
           <Text style={{fontSize:20, fontWeight:"bold", color:"#ffffff", }}>{movie.title.rendered } ({movie.themeum_movie_release_year})</Text> 
     </View>
     
     <View style={styles.row  }>
          <Text style={{fontSize:20, fontWeight:"bold", color:"#ffffff"}}>Release Date : </Text>   
  <Text style={{fontSize:20, fontWeight:"normal", color:"#ffffff"}}> { movie.themeum_release_date}</Text>                  
     </View>
     
     <View style={styles.row}>
          <Text style={{fontSize:20, fontWeight:"bold", color:"#ffffff"}}>Director : </Text>   
          <Text style={{fontSize:20, fontWeight:"normal", color:"#ffffff"}}> { movie.themeum_movie_director} </Text>                  
     </View>
     
     <View style={styles.column}>
          <Text style={{fontSize:20, fontWeight:"bold", color:"#ffffff"}}>Actors : </Text>   
          <Text style={{fontSize:20, fontWeight:"normal", color:"#ffffff"}}>{movie.themeum_movie_actor} </Text>                  
     </View>
     
     <View style={styles.column}>
          <Text style={{fontSize:20, fontWeight:"bold", color:"#ffffff"}}>Genre : </Text>   
          <Text style={{fontSize:20, fontWeight:"normal", color:"#ffffff"}}>{movie.themeum_movie_type} </Text>                  
     </View>
     
     <View style={styles.column}>
          <Text style={{fontSize:20, fontWeight:"bold", color:"#ffffff"}}>Movie Descriptions : </Text>   
          <Text style={{fontSize:20, fontWeight:"normal", color:"#ffffff"}}>{content}</Text>      
     </View>
     {/* AIzaSyDXpWnVyISSysQZyK3PwA59obJQiu_Kaw8 */}
     {/* <YouTube
        videoId="ZvpdN4VltKY" // The YouTube video ID
        play // control playback of video with true/false
        fullscreen // control whether the video should play in fullscreen or inline
        loop // control whether the video should loop when ended
        onReady={e => this.setState({ isReady: true })}
        onChangeState={e => this.setState({ status: e.state })}
        onChangeQuality={e => this.setState({ quality: e.quality })}
        onError={e => this.setState({ error: e.error })}
        style={{ alignSelf: 'stretch', height: 300 }}
          /> */}
     <View>
        {/* displays all comments */}
        <Comment key={movie.id}  postID = {movie.id}/>
     </View>
     
    </View>
  
 </ScrollView>
 );
}



const styles = StyleSheet.create({
  categoryList: {
    padding:14,
    borderRadius:10,
    backgroundColor: '#310F5B' 
  },
  categoryListText:{
    color:'#ffffff',
    fontSize:14
  },
    
  image:{
    height:380, 
    justifyContent: 'flex-end',
  },
  row:{
    flexDirection:'row',
    maxWidth:300, marginStart:20, marginTop:15
  },
  
  column:{
    marginStart:20, marginTop:15
  }
    
})
