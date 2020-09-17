import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView, SafeAreaView, FlatList, StyleSheet } from 'react-native';

import Featured from '../components/Movie'
import axios from 'axios'
import Ionicons from 'react-native-vector-icons/Ionicons';


export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList:[],
      isLoaded:false,
    };
  }
  
  componentDidMount(){
    
    const getMovieList = axios.get('https://trailerbabu.com/wp-json/wp/v2/movie');
    
    Promise.all([getMovieList])
           .then(res => {
             this.setState({
               movieList: res[0].data,
               isLoaded:true
             })
           })
           .catch(err => {
             console.log('************************ Network error**********')
           })       
   
   }

  render() {
    const { isLoaded, celebrityList, movieList} = this.state;
    const navigation = this.props.navigation
 
   
    return (
        <SafeAreaView>
            <ScrollView>
            <View >
                 <View style={{padding:20, flexDirection: 'row', }}>
                     <Text style={styles.heading}>Movies</Text>                  

                </View>
                
           </View>
        {/* featured flat lis t */}
     {   isLoaded ? (  <View style={{marginTop:-20}}>
               <FlatList 
               data = {movieList}
               renderItem = {({item}) =>{
                 
                 return (
               <Featured feature = {item} key = {item.id.toString()}  navigation = {navigation}/>
                 )
               }}
               />
           </View> )  : (
               <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
               <ActivityIndicator color="#ffffff" size="large"/>  
                </View>) 
           }
        {/* end of future moview */}
           
            </ScrollView>
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