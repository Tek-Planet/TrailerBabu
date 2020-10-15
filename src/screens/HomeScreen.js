import React, { Component } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, FlatList, 
  Image, ImageBackground,
  TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios'

//components
import Celebrity from '../components/Celebrity'
import Featured from '../components/Featured'
import Upcoming from '../components/Upcoming'
import Streaming from '../components/Streaming'
import Category from '../components/Category'
import Icon from 'react-native-vector-icons/Ionicons';
import Splash from './SplashScreen'

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
    // changing background of categories
    categoryId:1000,
    categoryName:'',
    isLoadedCategory:true,

    // changing background of streaming category
    streamingId:1000,
    streamingName:'',
    isLoadedStreaming:true,

    streaming: [
      { name: 'Netflix',  id: '108'},
      { name: 'Amazon Prime Video', id: '2' },
      { name: 'Zee5', id: '115' },
    
    ],
    categories:[],
    actionList:[],
    celebrityList:[],
    featuredList:[],
    upcomingList:[],
    streamingList:[],
    isLoaded:false,
    
    
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
          actionList:res.data,
          isLoadedCategory:true
        })
      }
      else{
        this.setState({
          streamingList:res.data,
          isLoadedStreaming:true
        })
      }  
    })
  }
  
  
  changeBg (item, source) {
  if(source === 0){
    this.setState({categoryId:item.id,categoryName:item.name, isLoadedCategory:false})
  }
  else{
    this.setState({streamingId:item.id,streamingName:item.name, isLoadedStreaming:false})
  }
  }  
    
  render() {
      const {streaming, actionList,categories, categoryName, streamingName, isLoaded, isLoadedStreaming, isLoadedCategory, celebrityList, featuredList, upcomingList, streamingList} = this.state;
      const navigation = this.props.navigation
    
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
                     <TouchableOpacity
                        onPress={()=> navigation.navigate('MovieList')}
                     >
                     <Icon name="ellipsis-horizontal-outline" size={22} color="#ffffff" />
                     </TouchableOpacity> 
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
                     <TouchableOpacity
                        onPress={()=> navigation.navigate('Movies')}
                     >
                     <Icon name="ellipsis-horizontal-outline" size={22} color="#ffffff" />
                     </TouchableOpacity> 
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
                        onPress={()=>[this.fetchSelectedCategoty(item.id,0), this.changeBg(item, 0)]}
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
           {/* Categoty flat list */}
           {
             //fecth data while the bottons are clicked
             isLoadedCategory ? (
              //  after fetching data check if the list is empty
              actionList.length !== 0 ? (<View style={{marginTop:-20}}>
                <FlatList 
                horizontal = {true}
                data = {actionList}
                renderItem = {({item}) =>{   
                  return ( <Category category = {item} key = {item.id.toString()}  navigation = {navigation} />  )
                }}
                />
            </View>):( <View style={{height:170, alignItems:'center', justifyContent:'center'}}>   
              <Text style={{color:'#fff', fontSize:18, textAlign:'center'}}>No result found for {categoryName}</Text>
              </View>)
              
             ) :(
              <View style={{height:170, alignItems:'center', justifyContent:'center'}}>   
                 <ActivityIndicator color="#ffffff" size="large"/>  
              </View>
            )
           }
          
           {/* end of categories section*/}
           
           {/* Celebrity Section */}
           <View>
           <View>
                 <View style={{padding:20, flexDirection: 'row', justifyContent:'space-between'}}>
                     <Text style={styels.heading}> Celebities </Text> 
                     <TouchableOpacity
                        onPress={()=> navigation.navigate('CelebrityList')}
                     >
                     <Icon name="ellipsis-horizontal-outline" size={22} color="#ffffff" />
                     </TouchableOpacity>                 
                     
                    
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
                     <TouchableOpacity
                        onPress={()=> navigation.navigate('MovieList')}
                     >
                     <Icon name="ellipsis-horizontal-outline" size={22} color="#ffffff" />
                     </TouchableOpacity> 
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
                       onPress={()=>[this.fetchSelectedCategoty(item.id,1), this.changeBg(item, 1)]}
                       style={[styels.categoryList, item.id === this.state.streamingId ? ({backgroundColor: '#bd10e0'}):(null)]}>
                       <Text style={styels.categoryListText}>
                       {item.name}
                       </Text>
                     </TouchableOpacity>
                 </View>)
               }}
               />
           </View>
            
           {/* end of category list name */}
           
           

           {
             //fecth data while the bottons are clicked
             isLoadedStreaming ? (
              //  after fetching data check if the list is empty
              streamingList.length !== 0 ? (
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
            ):( <View style={{height:170, alignItems:'center', justifyContent:'center'}}>   
              <Text style={{color:'#fff', fontSize:18, textAlign:'center'}}>No result found for {streamingName}</Text>
              </View>)
              
             ) :(
              <View style={{height:170, alignItems:'center', justifyContent:'center'}}>   
                 <ActivityIndicator color="#ffffff" size="large"/>  
              </View>
            )
           }
          
           {/* end of categories section*/}
            
           {/* end of category list name */}
           
         
           {/* end of streaming service */}
           
           
        </ScrollView>
        </SafeAreaView>
       );}
      
      return ( 
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
     
       <ImageBackground
          style={{width:'100%', height:'100%'}}
          source={require('../img/background/Vertical_Big.png')}
                    />   
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


