import React, { Component } from 'react';
import { View, Text, Image, ImageBackground , StyleSheet } from 'react-native';



export default function MovieDetailsScreen({ route, navigation }) {
  /* 2. Get the param */
  const { imageUrl } = route.params;
  const { movie } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
      source={{uri: imageUrl}}
      style = {styles.image}
      imageStyle ={{borderBottomRightRadius:200, borderBottomLeftRadius:30, }}
      />
      
      <View style={{position:"absolute", right:5, top:310, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{fontSize:30, fontWeight:"bold", color:"#ffffff"}}>5.0</Text>                         
        <Text style={{fontSize:20, fontWeight:"bold", color:"#ffffff"}}>Rating</Text>  
      </View>
      
     <View style={{maxWidth:200, padding:20}}>
     <Text style={{fontSize:20, fontWeight:"bold", color:"#ffffff", }}>{movie.title.rendered}</Text> 
     </View>
     
    
     
    
    
    </View>
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
}
  
})
