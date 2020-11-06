import React, { Component } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, FlatList, 
  Image, ImageBackground,
  TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios'
import dayjs from 'dayjs'

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
    isLoadedCategory:false,

    // changing background of streaming category
    streamingId:1000,
    streamingName:'',
    isLoadedStreaming:true,
    reload:false,

    streaming: [
      { name: 'Netflix',  id: '108'},
      { name: 'Amazon Prime Video', id: '2' },
      { name: 'Zee5', id: '115' },
    
    ],
    categories:[],
    movies:[],
    celebrityList:[],
    featuredList:[],
    upcomingList:[],
    streamingList:[],
    isLoaded:false,
    data: [],
    page: 1,   
    
    };
  }
  
  componentDidMount(){
  this.makeRemoteRequest()
   
   
   const getActionList = axios.get('https://trailerbabu.com/wp-json/wp/v2/movie');
   const getCategories = axios.get('https://trailerbabu.com/wp-json/wp/v2/movie_cat');
   const getCelebityList = axios.get('https://trailerbabu.com/wp-json/wp/v2/celebrity?page=2');
   const getStreaming = axios.get('https://trailerbabu.com/wp-json/wp/v2/movie?movie_cat=115');

   Promise.all([getCategories,getActionList, getCelebityList,getStreaming])
          .then(res => {
            this.setState({
              categories: res[0].data,
              actionList: res[1].data,
              celebrityList:res[2].data,
              streamingList:res[3].data,
              isLoadedCategory:true,
            })
          })
          .catch(err => {
            console.log(err)
            this.setState({  
              reload: true,
              })
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

  makeRemoteRequest = () => {
    const { page } = this.state;
    const url = (`https://trailerbabu.com/wp-json/wp/v2/movie?page=${page}`);
          axios.
          get(url, {timeout:10000})
           .then(res => {
             this.setState({  
             movies: page === 1 ? res.data : [...this.state.movies, ...res.data,],
             isLoaded:true
             })
           })
           .catch(err => {
             console.log(err)
             this.setState({  
              reload: true,
              })
           })    
  };
  

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };
    
  render() {
      const {movies, streaming, actionList,categories, categoryName, streamingName, isLoaded, reload, isLoadedStreaming, isLoadedCategory, celebrityList, featuredList, upcomingList, streamingList} = this.state;
      const navigation = this.props.navigation     
      const date = new Date()

      if(reload){
        return ( 
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
               <Image 
                       style={{width:150, height:150, borderRadius:100, marginBottom:20}}
                        source={require('../img/error.png')}
                    />
              <Text style={{color:'#fff', fontSize:18, marginBottom:10}}>Hmm. We’re having trouble fetching data</Text>

              <Text style={{color:'#fff', fontSize:18, marginBottom:20}}>Check your network connection.</Text>

                <TouchableOpacity 
                          onPress={()=> [this.makeRemoteRequest(),   this.setState({  
                            reload: false,
                            })]}
                          style={[styels.categoryList,{backgroundColor: '#bd10e0'}]}>
                        <Text style={styels.categoryListText}> Try Again</Text>
                </TouchableOpacity>
            </View>) 
        }
  
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
               data = {movies}
               onEndReached={this.handleLoadMore}
               onEndReachedThreshold={10}
               renderItem = {({item}) =>{ 
                 return (
                  item.themeum_featured_movie ===  "1" ?(
                  <Featured feature = {item} key = {item.id.toString()}  navigation = {navigation}/>
                ):(null) ) }}
               />
           </View>
        {/* end of future moview */}
           
           {/* Start of upcoming movies */}
           
           <View>
                 <View style={{padding:20, flexDirection: 'row', justifyContent:'space-between'}}>
                     <Text style={styels.heading}> Upcoming</Text>                  
                     <TouchableOpacity
                        onPress={()=> navigation.navigate('UpcomingList')}
                     >
                     <Icon name="ellipsis-horizontal-outline" size={22} color="#ffffff" />
                     </TouchableOpacity> 
                 </View>
           </View>
           {/* upcoming flatlist */}
           <View style={{marginTop:-20}}>
               <FlatList 
               horizontal = {true}
               data = {movies}
               onEndReached={this.handleLoadMore}
               onEndReachedThreshold={10}
               renderItem = {({item}) =>{  
                const release_date  = new Date(item.themeum_release_date);     
                 return ( 
                  release_date.getTime()   >  date.getTime() ?(
                    <Upcoming upcoming = {item} key = {item.id.toString()}  navigation = {navigation} /> 
                  ):(null)
                //  <Upcoming upcoming = {item} key = {item.id.toString()}  navigation = {navigation} />  
                 )
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
                     <Text style={styels.heading}> Celebrities </Text> 
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
    backgroundColor: '#0037018D'
  },
  categoryListText:{
    color:'#ffffff',
    fontSize:14
  },
  
  heading: {color: '#ffffff', fontSize:22, fontWeight:'bold'}
  
})


