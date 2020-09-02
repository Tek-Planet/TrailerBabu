import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios'

//components
import Celebrity from '../components/Celebrity'
import Featured from '../components/Featured'
import Upcoming from '../components/Upcoming'
import Streaming from '../components/Streaming'

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    gallery: [
      {image: {uri: 'https://source.unsplash.com/random'}, title: 'Netflix',  key: '1'},
      { image:{uri:'https://source.unsplash.com/random'}, title: 'Amazon Prime Video',key: '2' },
      { image:{uri:'https://source.unsplash.com/random'}, title: 'Zee5',key: '3' },
    
    ],
    categories:[],
    actionList:[],
    celebrityList:[],
    featuredList:[],
    upcomingList:[],
    streamingList:[],
    isLoaded:false
    };
  }
  
  componentDidMount(){
    
   const getActionList = axios.get('https://trailerbabu.com/wp-json/wp/v2/movie?movie_cat=44');
   const getCategories = axios.get('https://trailerbabu.com/wp-json/wp/v2/movie_cat');
   const getCelebityList = axios.get('https://trailerbabu.com/wp-json/wp/v2/celebrity');
   const getFeaturedList = axios.get('https://trailerbabu.com/wp-json/wp/v2/movie?movie_cat=50');
   const getUpcomingList = axios.get('https://trailerbabu.com/wp-json/wp/v2/movie?movie_cat=51');
   const getStreaming = axios.get('https://trailerbabu.com/wp-json/wp/v2/movie?movie_cat=53');

   Promise.all([getCategories, getActionList,getCelebityList, getFeaturedList, getUpcomingList,getStreaming])
          .then(res => {
            this.setState({
              categories: res[0].data,
              actionList: res[1].data,
              celebrityList:res[2].data,
              featuredList:res[3].data,
              upcomingList:res[4].data,
              streamingList:res[5].data,
              isLoaded:true
            })
          })       
  
  }

  render() {
      const {actionList,categories, isLoaded, celebrityList, featuredList, upcomingList, streamingList} = this.state;
   
      if(isLoaded){ return (
        <ScrollView>
        {/* featured moviee zone */}
        <View>
                 <View style={{padding:20, flexDirection: 'row', justifyContent:'space-between'}}>
                     <Text style={{fontSize:22, fontWeight:'bold'}}>Featured</Text>                  
   
                     <Text style={{color: '#ff6200',fontSize:12, fontWeight:'bold'}}> View All</Text>     
                                  
                 </View>
                
           </View>
           <View style={{marginTop:-20}}>
               <FlatList 
               horizontal = {true}
               data = {featuredList}
               renderItem = {({item}) =>{
                 
                 return (
               <Featured feature = {item} key = {item.key} />
                 )
               }}
               />
           </View>
        {/* end of future moview */}
           
           {/* Start of upcoming movies */}
           
           <View>
                 <View style={{padding:20, flexDirection: 'row', justifyContent:'space-between'}}>
                     <Text style={{fontSize:22, fontWeight:'bold'}}> Upcoming</Text>                  
   
                     <Text style={{color: '#ff6200',fontSize:12, fontWeight:'bold'}}> View All</Text>                  
                 </View>
           </View>
           
           <View style={{marginTop:-20}}>
               <FlatList 
               horizontal = {true}
               data = {upcomingList}
               renderItem = {({item}) =>{
                 
                 return ( <Upcoming upcoming = {item} key = {item.key} />  )
               }}
               />
           </View>
           {/* end of upcmoing movies */}
           
           {/* Start of categories  section */}
           <View>
                 <View style={{padding:20, flexDirection: 'row', justifyContent:'space-between'}}>
                     <Text style={{fontSize:22, fontWeight:'bold'}}>Categories</Text>                  
   
                     <Text style={{color: '#ff6200',fontSize:12, fontWeight:'bold'}}> View All</Text>                  
                 </View>
           </View>
           {/* categorie name list */}
           <View style={{marginTop:-20}}>
               <FlatList 
               horizontal = {true}
               data = {categories}
               renderItem = {({item}) =>{
                 
                 return (
                 <View style={{paddingVertical:20, paddingLeft:16}}>
                     <TouchableOpacity style={styels.categoryList}>
                       <Text style={styels.categoryListText}>
                       {item.name}
                       </Text>
                     </TouchableOpacity>
                 </View>)
               }}
               />
           </View>
           {/* end of category list name */}
           
           <View style={{marginTop:-20}}>
               <FlatList 
               horizontal = {true}
               data = {actionList}
               renderItem = {({item}) =>{
                 
                 return (
                 <View style={{paddingVertical:20, paddingLeft:16}}>
                     <TouchableOpacity>
                         <Image source = { {uri: item._b2s_post_meta.og_image}}
                         style={{width:200, marginRight:8, height:150, borderRadius:10}}
                            />
                     </TouchableOpacity>
                     
                     <Text style={{margin:5, fontSize:20, fontWeight:'bold'}}>
                     {item.title.rendered}
                     </Text>
                    
                 </View>)
               }}
               />
           </View>
           {/* end of categories section*/}
           
           {/* Celebrity Section */}
           <View>
                 <View style={{padding:20, flexDirection: 'row', justifyContent:'space-between'}}>
                     <Text style={{fontSize:22, fontWeight:'bold'}}>Celebrities</Text>                  
   
                     <Text style={{color: '#ff6200',fontSize:12, fontWeight:'bold'}}> View All</Text>                  
                 </View>
           </View>
           
           <View style={{marginTop:-20}}>
               <FlatList 
               horizontal = {true}
               data = {celebrityList}
               
               renderItem = {({item}) =>{ 
                 return(
                  <Celebrity celebrity = {item}   key = {item.id} />
                 )                   
               }
               }
              
               />
           
           </View>
           {/* end of Celebity section */}
           
           {/* Start of streaming services */}
              <View>
                 <View style={{padding:20, flexDirection: 'row', justifyContent:'space-between'}}>
                     <Text style={{fontSize:22, fontWeight:'bold'}}>Streaming Services</Text>                  
   
                     <Text style={{color: '#ff6200',fontSize:12, fontWeight:'bold'}}> View All</Text>                  
                 </View>
           </View>
           {/* Streaming services list */}
           <View style={{marginTop:-20}}>
               <FlatList 
               horizontal = {true}
               data = {this.state.gallery}
               renderItem = {({item}) =>{
                 
                 return (
                 <View style={{paddingVertical:20, paddingLeft:16}}>
                     <TouchableOpacity style={styels.categoryList}>
                       <Text style={styels.categoryListText}>
                       {item.title}
                       </Text>
                     </TouchableOpacity>
                 </View>)
               }}
               />
           </View>
           {/* end of category list name */}
           
           <View style={{marginTop:-20}}>
               <FlatList 
               horizontal = {true}
               data = {streamingList}
               renderItem = {({item}) =>{
                return(
                  <Streaming streaming = {item}   key = {item.id} />
                 )    
               }}
               />
           </View>
           {/* end of streaming service */}
           
           
        </ScrollView>
       );}
      
      return <Text>Loading data</Text>   
  }
}



const styels = StyleSheet.create({
  categoryList: {
    padding:14,
    borderRadius:10,
    backgroundColor: '#ff6200' 
  },
  categoryListText:{
    color:'white',
    fontSize:14
  }
  
})
