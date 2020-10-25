import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView, SafeAreaView, FlatList, StyleSheet,
TouchableOpacity, TextInput } from 'react-native';
import Celebrity from '../components/Celebrity'
import Featured from '../components/Featured'
import axios from 'axios'
import Ionicons from 'react-native-vector-icons/Ionicons';


export default class SearchScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categoryId:100,
      celebrityList:[],
      movieList:[],
      isLoaded:false,
      category: [
        { name: 'Movie',  id: 100},
        { name: 'Celebrity', id: 200 },],
      keyword:'',
    };
  }

  // method tyo search movie
  searchMovie = () => {
    const { keyword } = this.state;
    const url = (`https://trailerbabu.com/wp-json/wp/v2/movie?search=${keyword}`);
    this.setState({ loading: true });
          axios.
          get(url)
           .then(res => {
             this.setState({
               movieList: res.data,
               loading: false,
               refreshing: false
             })
           })
           .catch(err => {
             console.log(err)
           })    
  };

   // search celebrity
   searchCelebrity = () => {
    const { keyword } = this.state;
    const url = (`https://trailerbabu.com/wp-json/wp/v2/celebrity?search=${keyword}`);
    this.setState({ loading: true });
          axios.
          get(url)
           .then(res => {
             this.setState({
               celebrityList: res.data,
               loading: false,
               refreshing: false
             })
           })
           .catch(err => {
             console.log(err)
           })    
  };


  textInputChange = (val) => {
    if( val.trim().length >= 0 ) {
      this.setState({
        keyword: val
      })
      if(this.state.categoryId === 100)
      this.searchMovie()
      else this.searchCelebrity()
    } 
}

  changeBg (item) { 
      this.setState({categoryId:item.id})
      if(item.id === this.state.categoryId){
        this.searchMovie()
      
      }
      else{this.searchCelebrity()
      
      }
    }  
  
  componentDidMount(){
    this.searchMovie()
    this.searchCelebrity()
   }

  render() {
    const { isLoaded, celebrityList, movieList, category, categoryId} = this.state;
    const navigation = this.props.navigation
 
   
    return (
        <SafeAreaView>
            <ScrollView>
            
  <View style={{flexDirection:'row',  marginTop: Platform.OS === 'ios' ? 40 : 20, marginEnd:5,marginStart:5 }}>
  <View style={{width:'20%', marginEnd:5}}>
   <FlatList    
   data = {category}
   renderItem = {({item}) =>{
     return (
     <View style={{margin: 1, alignSelf:'center', maxWidth:70}}>
         <TouchableOpacity 
           onPress={()=>[
            this.changeBg(item),
          ]}
           style={[styles.categoryList, item.id === this.state.categoryId ? ({backgroundColor: '#bd10e0'}):(null)]}>
           <Text style={styles.categoryListText}>
           {item.name}
           </Text>
         </TouchableOpacity>
            </View>)
          }}
          />
        </View>
            
        
        <View style={styles.searchBox}>         
            <TextInput 
              placeholder="Search here..."
              placeholderTextColor="#fff"
              color= "#fff"
              autoCapitalize="none"
              fontSize={20}
              fontWeight= 'normal'
              style={{flex:1,padding:0}}
              onChangeText={(val) => this.textInputChange(val)}
            />
            <Ionicons name="ios-search"
            onPress={() => this.searchMovie() }
            size={20} color={'#fff'} />
            </View>       
            </View>
      

            {/* featured moviee zone */}
          

        {
          categoryId === 100 ?  (
        
        <View>
            <View style={{marginTop: 40,}}>
                 <View style={{padding:20, flexDirection: 'row', }}>
                     <Text style={styles.heading}>Movies</Text>                  
                   
                </View>
                
            </View>
       
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
           </View>
           ):( 
         
           <View>
              <View style={{marginTop: 40,}}>
                 <View style={{padding:20, flexDirection: 'row', }}>
                     <Text style={styles.heading}>Celebrity</Text>                  
                   
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
               } />
           
           </View>
          
           </View> )
          }
           
            </ScrollView>
        </SafeAreaView>
      );
  }
}


const styles = StyleSheet.create({
  searchBox: {  
    flexDirection:"row",
    backgroundColor: '#7a00ff',
    width: '75%',
    alignSelf:'center',
    borderRadius: 5,
    padding: 10,
    marginStart:5,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
   
  
  },
  categoryList: {
    width:70,
    padding:2,
    borderRadius:5,
    backgroundColor: '#232323'
  },
  categoryListText:{
    color:'#ffffff',
    fontSize:14,
    alignSelf:'center'
  },
  
  heading: {color: '#ffffff', fontSize:22, fontWeight:'bold'}
  
})

