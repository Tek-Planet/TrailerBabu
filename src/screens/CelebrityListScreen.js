import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView, SafeAreaView, FlatList, StyleSheet, Image,
TouchableOpacity } from 'react-native';
import Celebrity from '../components/CelebrityFull'

import axios from 'axios'
import Ionicons from 'react-native-vector-icons/Ionicons';


export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId:'all',
      celebrityList:[],
      movieList:[],
      isLoaded:false,
      alphalist: [
        {id:'all',name:'All'},
      {id:'a',name:'A'},
      {id:'b',name:'B'},
      {id:'c',name:'C'},
      {id:'d',name:'D'},
      {id:'e',name:'E'},
      {id:'f',name:'F'},
      {id:'g',name:'G'},
      {id:'h',name:'H'},
      {id:'i',name:'I'},
      {id:'j',name:'J'},
      {id:'k',name:'K'},
      {id:'l',name:'L'},
      {id:'m',name:'M'},
      {id:'n',name:'N'},
      {id:'o',name:'O'},
      {id:'p',name:'P'},
      {id:'q',name:'Q'},
      {id:'r',name:'R'},
      {id:'s',name:'S'},
      {id:'t',name:'T'},
      {id:'u',name:'U'},
      {id:'v',name:'V'},
      {id:'w',name:'W'},
      {id:'x',name:'X'},
      {id:'y',name:'Y'},
      {id:'z',name:'Z'},
    ]
    };
  }

  changeBg (id) {
    this.setState({categoryId:id})
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
    const { isLoaded, celebrityList, movieList, alphalist} = this.state;
    const navigation = this.props.navigation
 
   
    return (
        <SafeAreaView>
            <ScrollView>
                 <View style={{padding:20, flexDirection: 'row',  justifyContent:'space-between'}}>
                     <Text style={styles.heading}> Celebrities </Text>                  
                     <Image 
                        duraton="1500"
                        source={require('../img/logo.png')}
                    /> 
                 </View>

              <View style={{marginTop:-20}}>
               <FlatList 
               horizontal = {true}
               data = {alphalist}
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
                numColumns={2}
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
    width:50,
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