import React, { Component } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios'

//components
import Celebrity from '../components/Celebrity'
import Featured from '../components/Featured'
import Upcoming from '../components/Upcoming'
import Streaming from '../components/Streaming'
import Category from '../components/Category'
import Icon from 'react-native-vector-icons/Ionicons';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
    
    categoryId:1000,
  
    streaming: [
      { title: 'Netflix',  id: '108'},
      { title: 'Amazon Prime Video', id: '2' },
      { title: 'Zee5', id: '115' },
    
    ],
    categories:[],
    actionList:[],
    celebrityList:[],
    featuredList:[],
    upcomingList:[],
    streamingList:[],
    isLoaded:false,
    
    //button color management
    backgroundColor1: 'black',
    backgroundColor2: 'black',
    pressed: false,
    };
  }
  
  componentDidMount(){
    
   const getActionList = axios.get('https://trailerbabu.com/wp-json/wp/v2/movie');
   const getCategories = axios.get('https://trailerbabu.com/wp-json/wp/v2/movie_cat');
   const getCelebityList = axios.get('https://trailerbabu.com/wp-json/wp/v2/celebrity?page=2');
   const getFeaturedList = axios.get('https://trailerbabu.com/wp-json/wp/v2/movie?movie_cat=50');
   const getUpcomingList = axios.get('https://trailerbabu.com/wp-json/wp/v2/movie?movie_cat=51');
   const getStreaming = axios.get('https://trailerbabu.com/wp-json/wp/v2/movie?movie_cat=115');

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
          .catch(err => {
            console.log('************************ Network error**********')
          })       
  
  }
  
  
  fetchSelectedCategoty(id, source){
    axios.get(`https://trailerbabu.com/wp-json/wp/v2/movie?movie_cat=${id}`)
    .then(res => {
      if (source === 0) {
        this.setState({
          actionList:res.data
        })
      }
      else{
        this.setState({
          streamingList:res.data
        })
      }  
    })
  }
  
  
  changeBg (id) {
   this.setState({categoryId:id})
  }  
    
  render() {
      const {streaming, actionList,categories, isLoaded, celebrityList, featuredList, upcomingList, streamingList} = this.state;
      const navigation = this.props.navigation
      const route = this.props.route
      if(isLoaded){ return (
        <SafeAreaView>
        <ScrollView>
        {/* featured moviee zone */}
             <View>
                 <View style={{padding:20, flexDirection: 'row', justifyContent:'space-between'}}>
                     <Text style={styels.heading}>Featured</Text>                  
                    <Image 
                        duraton="1500"
                        source={require('../img/logo.png')}
                    /> 
                </View>
                
           </View>
        {/* featured flat lis t */}
           <View style={{marginTop:-20}}>
               <FlatList 
               horizontal = {true}
               data = {featuredList}
               renderItem = {({item}) =>{
                 
                 return (
               <Featured feature = {item} key = {item.id.toString()}  navigation = {navigation}/>
                 )
               }}
               />
           </View>
        {/* end of future moview */}
           
           {/* Start of upcoming movies */}
           
           <View>
                 <View style={{padding:20, flexDirection: 'row', justifyContent:'space-between'}}>
                     <Text style={styels.heading}> Upcoming</Text>                  
                     <Icon name="ellipsis-horizontal-outline" size={22} color="#ffffff" />
                 </View>
           </View>
           {/* upcoming flatlist */}
           <View style={{marginTop:-20}}>
               <FlatList 
               horizontal = {true}
               data = {upcomingList}
               renderItem = {({item}) =>{
                 
                 return ( <Upcoming upcoming = {item} key = {item.id.toString()}  navigation = {navigation} />  )
               }}
               />
           </View>
           {/* end of upcmoing movies */}
           
           {/* Start of categories  section */}
           <View>
           <View>
                 <View style={{padding:20, flexDirection: 'row', justifyContent:'space-between'}}>
                     <Text style={styels.heading}> Categories </Text>                  
                     <Icon name="ellipsis-horizontal-outline" size={22} color="#ffffff" />
                 </View>
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
                     <TouchableOpacity 
                        onPress={()=>[this.fetchSelectedCategoty(item.id,0), this.changeBg(item.id)]}
                        style={[styels.categoryList, item.id === this.state.categoryId ? ({backgroundColor: '#bd10e0'}):(null)]}>
                       <Text style={styels.categoryListText}> 
                       {item.name}
                       </Text>
                     </TouchableOpacity>
                 </View>)
               }}
               />
           </View>
           {/* end of category list name */}
           {/* upcoming flat list */}
           <View style={{marginTop:-20}}>
               <FlatList 
               horizontal = {true}
               data = {actionList}
               renderItem = {({item}) =>{   
                 return ( <Category category = {item} key = {item.id.toString()}  navigation = {navigation} />  )
               }}
               />
           </View>
           {/* end of categories section*/}
           
           {/* Celebrity Section */}
           <View>
           <View>
                 <View style={{padding:20, flexDirection: 'row', justifyContent:'space-between'}}>
                     <Text style={styels.heading}> Celebities </Text>                  
                     <Icon name="ellipsis-horizontal-outline" size={22} color="#ffffff" />
                 </View>
           </View>
           </View>
           
           <View style={{marginTop:-20}}>
               <FlatList 
               horizontal = {true}
               data = {celebrityList}
               
               renderItem = {({item}) =>{ 
                 return(
                  <Celebrity celebrity = {item}   key = {item.id.toString()} navigation= {navigation}/>
                 )                   
               }
               }
              
               />
           
           </View>
           {/* end of Celebity section */}
           
           {/* Start of streaming services */}
              <View>
              <View>
                 <View style={{padding:20, flexDirection: 'row', justifyContent:'space-between'}}>
                     <Text style={styels.heading}> Streaming Services</Text>                  
                     <Icon name="ellipsis-horizontal-outline" size={22} color="#ffffff" />
                 </View>
           </View>
            </View>
           {/* Streaming services list */}
           <View style={{marginTop:-20}}>
               <FlatList 
               horizontal = {true}
               data = {streaming}
               renderItem = {({item}) =>{
                 
                 return (
                 <View style={{paddingVertical:20, paddingLeft:16}}>
                     <TouchableOpacity 
                       onPress={()=>[this.fetchSelectedCategoty(item.id,1), this.changeBg(item.id)]}
                       style={[styels.categoryList, item.id === this.state.categoryId ? ({backgroundColor: '#bd10e0'}):(null)]}>
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
                  <Streaming streaming = {item}   key = {item.id.toString()} navigation= {navigation}/>
                 )    
               }}
               />
           </View>
           {/* end of streaming service */}
           
           
        </ScrollView>
        </SafeAreaView>
       );}
      
      return ( 
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator color="#ffffff" size="large"/>  
      </View>) 
  }
}



const styels = StyleSheet.create({
  categoryList: {
    padding:14,
    borderRadius:10,
    backgroundColor: '#232323'
  },
  categoryListText:{
    color:'#ffffff',
    fontSize:14
  },
  
  heading: {color: '#ffffff', fontSize:22, fontWeight:'bold'}
  
})


