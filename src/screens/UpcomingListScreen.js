import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView, SafeAreaView, FlatList, StyleSheet, Image,
TouchableOpacity } from 'react-native';
import Movie from '../components/MovieFull'

import axios from 'axios'
import CustomBottomNav from './CustomBottomNav'


export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList:[],
      isLoaded:false,
      page:1,
      screen:1
    };
  }

  
  componentDidMount(){
   this.makeRemoteRequest()
   console.log('mounted')
   }

   makeRemoteRequest = () => {
    const { page } = this.state;
    const url = (`https://trailerbabu.com/wp-json/wp/v2/movie?page=${page}`);
          axios.
          get(url)
           .then(res => {
             this.setState({  
             movieList: page === 1 ? res.data : [...this.state.movieList, ...res.data,],
             isLoaded:true
             })
           })
           .catch(err => {
             console.log(err)
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
    const { isLoaded, movieList} = this.state;
    const navigation = this.props.navigation
    const date = new Date()
 
   
    return (
      <SafeAreaView style={{flex:1}}> 
      <View style={{flex: 0.9}}>
                 <View style={{padding:20, flexDirection: 'row',  justifyContent:'space-between'}}>
                     <Text style={styles.heading}>Upcoming Movies</Text>                  
                     <Image 
                        duraton="1500"
                        source={require('../img/logo.png')}
                    /> 
                 </View>

             
            {
              isLoaded ? ( <View style={{}}>
                <FlatList 
                data = {movieList} 
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={10}
                renderItem = {({item}) =>{ 
                  const release_date  = new Date(item.themeum_release_date);     
                  return(
                  release_date.getTime()   >  date.getTime() ?(
                   <Movie movie = {item}   key = {item.id.toString()} navigation= {navigation}/> ):(null)
                  )                   
                }
                }
               
                />
            
            </View>) : (
               <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
               <ActivityIndicator color="#ffffff" size="large"/>  
                </View>) 
    
            }
          
           {/* end of Celebity section */}
           </View>
  
         <CustomBottomNav navigation = {navigation} />

        </SafeAreaView>
      );
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
  
  heading: {color: '#ffffff', fontSize:20, fontWeight:'bold'}
  
})