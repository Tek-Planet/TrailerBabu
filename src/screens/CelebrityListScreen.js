import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView, SafeAreaView, FlatList, StyleSheet,  } from 'react-native';
import Celebrity from '../components/CelebrityFull'

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
    
  const getCelebityList = axios.get('https://trailerbabu.com/wp-json/wp/v2/celebrity?page=2');
  
 
    Promise.all([getCelebityList])
           .then(res => {
             this.setState({
               celebrityList:res[0].data,
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
                 <View style={{padding:20, flexDirection: 'row'}}>
                     <Text style={styles.heading}> Celebities </Text>                  
                    
                 </View>
            {
              isLoaded ? ( <View style={{marginTop:-20}}>
                <FlatList 
                data = {celebrityList} 
                renderItem = {({item}) =>{ 
                  return(
                   <Celebrity celebrity = {item}   key = {item.id.toString()} navigation= {navigation}/>
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