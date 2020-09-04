import React, { Component } from 'react';
import { View, Text, Image, ImageBackground , StyleSheet, SafeAreaView, ScrollView} from 'react-native';

import Comment from '../components/Comment'

import { LogBox } from 'react-native'

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
])




export default function CelebrityDetailsScreen({ route, navigation }) {
  /* 2. Get the param */
  const { imageUrl } = route.params;
  const { celebrity} = route.params;
  const regex = /(<([^>]+)>)/ig;
  const content = celebrity.content.rendered.replace(regex, '');
  return (
<ScrollView style={{flex: 1}}>
      <View >
      <ImageBackground
      source={{uri: imageUrl}}
      style = {styles.image}
      imageStyle ={{borderBottomRightRadius:200, borderBottomLeftRadius:30, }}
      />
      
      {/* <View style={{position:"absolute", right:5, top:310, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{fontSize:30, fontWeight:"bold", color:"#ffffff"}}>{movie.rating}</Text>                         
          <Text style={{fontSize:20, fontWeight:"bold", color:"#ffffff"}}>Rating</Text>  
      </View> */}
      
     <View style={styles.row}>
           <Text style={{fontSize:20, fontWeight:"bold", color:"#ffffff", }}>{celebrity.title.rendered }</Text> 
     </View>
     
     <View style={styles.row  }>
          <Text style={{fontSize:20, fontWeight:"bold", color:"#ffffff"}}>Birthday Date : </Text>   
          <Text style={{fontSize:20, fontWeight:"normal", color:"#ffffff"}}></Text>                  
     </View>
     
     <View style={styles.row  }>
          <Text style={{fontSize:20, fontWeight:"bold", color:"#ffffff"}}>Height : </Text>   
          <Text style={{fontSize:20, fontWeight:"normal", color:"#ffffff"}}>
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
          <Text style={{fontSize:20, fontWeight:"bold", color:"#ffffff"}}>Biography : </Text>   
          <Text style={{fontSize:20, fontWeight:"normal", color:"#ffffff"}}>{content}</Text>      
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
