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
      loading: false,
      data: [],
      page: 1,
      refreshing: false
    };
  }
  
  componentDidMount(){
   this.makeRemoteRequest()
  }

  makeRemoteRequest = () => {
    const { page } = this.state;
    const url = (`https://trailerbabu.com/wp-json/wp/v2/movie?page=${page}`);
          axios.
          get(url)
           .then(res => {
             this.setState({
             //  data: res[0].data,
               data: page === 1 ? res.data : [...this.state.data, ...res.data,],
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
      const {data} = this.state;
      const navigation = this.props.navigation
    
    return (
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
               data = {data}
               onEndReached={this.handleLoadMore}
               onEndReachedThreshold={10}
               renderItem = {({item}) =>{ 
                 return (
               
                  
                  <Featured feature = {item} key = {item.id.toString()}  navigation = {navigation}/>
               
                   
                ) }}
               />
           </View>
       
        </ScrollView>
        </SafeAreaView>
    )
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


