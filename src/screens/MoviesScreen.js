import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView, SafeAreaView, FlatList, StyleSheet, Image,
ImageBackground,
TouchableOpacity } from 'react-native';
import Movie from '../components/MovieFull'

import axios from 'axios'
import Ionicons from 'react-native-vector-icons/Ionicons';

//update to movies screen. by commenting code


export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId:'all',
      MovieList:[],
      categoryList:[],
      movieList:[],
      isLoaded:false,
      
    };
  }

  changeBg (id) {
    this.setState({categoryId:id})
   } 
  
  componentDidMount(){
    
  const getMovieList = axios.get('https://trailerbabu.com/wp-json/wp/v2/movie');
  const getCategories = axios.get('https://trailerbabu.com/wp-json/wp/v2/movie_cat');

    Promise.all([getMovieList, getCategories])
           .then(res => {
             this.setState({
               movieList:res[0].data,
               categoryList:res[1].data,
               isLoaded:true
             })
           })
           .catch(err => {
             console.log('************************ Network error**********')
           })       
   
   }

  render() {
    const { isLoaded, movieList, categoryList} = this.state;
    const navigation = this.props.navigation
 
    if(isLoaded){ 
    return (
        <SafeAreaView>
            <ScrollView>
                 <View style={{padding:20, flexDirection: 'row',  justifyContent:'space-between'}}>
                     <Text style={styles.heading}> Categories </Text>                  
                     <Image 
                        duraton="1500"
                        source={require('../img/logo.png')}
                    /> 
                 </View> 

              <View style={{marginTop:-20}}>
               <FlatList 
               horizontal = {true}
               data = {categoryList}
               renderItem = {({item}) =>{
                 
                 return (
                 <View style={{paddingVertical:20, paddingLeft:10}}>
                     <TouchableOpacity 
                        onPress={()=>[this.changeBg(item.id)] }
                        style={[styles.categoryList, item.id === this.state.categoryId ? ({backgroundColor: '#bd10e0'}):(null)]}>
                       <Text style={styles.categoryListText}> 
                       {item.name}
                       </Text>
                     </TouchableOpacity>
                 </View>)
               }}
               />
           </View>
            {
              isLoaded ? ( <View style={{}}>
                <FlatList 
                data = {movieList} 
                renderItem = {({item}) =>{ 
                  return(
                   <Movie movie = {item}   key = {item.id.toString()} navigation= {navigation}/>
                  )                   
                }
                }
               
                />
            
            </View>) : (
               <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
               <Image
                  style={{width:'100%', height:'100%'}}
                  source={require('../img/background/Vertical_Big.png')}
                    />   
                </View>) 
    
            }

{/* {
             //fecth data while the bottons are clicked
             isLoaded ? (
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
           */}
           {/* end of Celebity section */}
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


const styles = StyleSheet.create({
  searchBox: {
    position:'absolute', 
    marginTop: Platform.OS === 'ios' ? 40 : 20, 
    flexDirection:"row",
    backgroundColor: '#7a00ff',
    width: '90%',
    alignSelf:'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  
  },
  categoryList: {
   
    padding:10,
    borderRadius:10,
    backgroundColor: '#232323'
  },
  categoryListText:{
    textAlign:'center',
    color:'#ffffff',
    fontSize:14
  },
  
  heading: {color: '#ffffff', fontSize:22, fontWeight:'bold'}
  
})