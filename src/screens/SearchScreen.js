import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView, SafeAreaView, FlatList, StyleSheet, TextInput } from 'react-native';
import Celebrity from '../components/Celebrity'
import Featured from '../components/Featured'
import axios from 'axios'
import Ionicons from 'react-native-vector-icons/Ionicons';


export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      celebrityList:[],
      movieList:[],
      isLoaded:false,
    };
  }
  
  componentDidMount(){
    
    const getMovieList = axios.get('https://trailerbabu.com/wp-json/wp/v2/movie');
    const getCelebityList = axios.get('https://trailerbabu.com/wp-json/wp/v2/celebrity?page=2');
  
 
    Promise.all([getMovieList,getCelebityList])
           .then(res => {
             this.setState({
               movieList: res[0].data,
               celebrityList:res[1].data,
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
            <View style={styles.searchBox}>
            <TextInput 
              placeholder="Search here..."
              placeholderTextColor="#fff"
              color= "#fff"
              autoCapitalize="none"
              fontSize={20}
              fontWeight= 'normal'
              style={{flex:1,padding:0}}
            />
            <Ionicons name="ios-search" size={20} color={'#fff'} />
            </View>
            {/* featured moviee zone */}
            <View style={{marginTop: 100,}}>
                 <View style={{padding:20, flexDirection: 'row', }}>
                     <Text style={styles.heading}>Movies</Text>                  
                   
                </View>
                
           </View>
        {/* featured flat lis t */}
           <View style={{marginTop:-20}}>
               <FlatList 
               horizontal = {true}
               data = {movieList}
               renderItem = {({item}) =>{
                 
                 return (
               <Featured feature = {item} key = {item.id.toString()}  navigation = {navigation}/>
                 )
               }}
               />
           </View>
        {/* end of future moview */}
              
                 {/* Celebrity Section */}
           <View>
           <View>
                 <View style={{padding:20, flexDirection: 'row'}}>
                     <Text style={styles.heading}> Celebities </Text>                  
                    
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