import React, { Component } from 'react';
import { View, Text, Image, ImageBackground , StyleSheet, SafeAreaView, ScrollView} from 'react-native';

import Comment from '../components/Comment'

import { LogBox } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'; 

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
        {
          imageUrl !== 'noImage' ? (<ImageBackground
            source={{uri: imageUrl}}
            style = {styles.image}
            imageStyle ={{borderBottomRightRadius:230, borderBottomLeftRadius:50, }}
            />):(
              <ImageBackground
              source={require('../img/background/noImage.png')}
              style = {styles.image}
              imageStyle ={{borderBottomRightRadius:230, borderBottomLeftRadius:50, }}
      />
            )
        }
      
      
      <View style={{position:"absolute", right:3, top:350, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{fontSize:20, fontWeight:"bold", color:"#ffffff"}}>Follow On</Text>                         
          <View style={{flexDirection:'row'}}>
          <Icon name="youtube" style = {styles.icon} color={'#fff'} size={20} />
          <Icon name="facebook" style = {styles.icon} color={'#fff'} size={20} />
          <Icon name="twitter" style = {styles.icon} color={'#fff'} size={20} />
          <Icon name="instagram" style = {styles.icon} color={'#fff'} size={20} />
          
         
          </View>
      </View>
       
     <View style={[styles.row, {marginTop:40}]}>
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
  },
  
  icon:{
    margin: 5,
  }
    
})
