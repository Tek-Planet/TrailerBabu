import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView, SafeAreaView, FlatList, StyleSheet,
TouchableOpacity, TextInput } from 'react-native';
import Celebrity from '../components/Celebrity'
import Featured from '../components/Featured'
import axios from 'axios'
import Ionicons from 'react-native-vector-icons/Ionicons';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';



export default class SearchScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categoryId:100,
      celebrityList:[],
      movieList:[],
      isLoadingMovie:true,
      isLoadingCeleb:true,
      category: [
        { name: 'Movie',  id: 100},
        { name: 'Celebrity', id: 200 },],
      keyword:'',
      radio_props : [
        {label: 'Movie', value: 100 },
        {label: 'Celebrities', value: 200 }
      ],
      value: 0,
    };


  }

  // method tyo search movie
  searchMovie = () => {
    const { keyword } = this.state;
    const url = (`https://trailerbabu.com/wp-json/wp/v2/movie?search=${keyword}`);
    this.setState({ isLoadingMovie: true });
          axios.
          get(url)
           .then(res => {
           
             this.setState({
               movieList: res.data,
               isLoadingMovie:false,
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
    this.setState({ isLoadingCeleb: true });
          axios.
          get(url)
           .then(res => {
             this.setState({
               celebrityList: res.data,
               isLoadingCeleb: false,
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
      // if(this.state.categoryId === 100)
      // this.searchMovie()
      // else this.searchCelebrity()
    } 
}

  search () {     
      if(100 === this.state.categoryId){
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
    const {keyword, isLoadingMovie, isLoadingCeleb, celebrityList, movieList, category, categoryId, radio_props} = this.state;
    const navigation = this.props.navigation
    
 
   
    return (
        <SafeAreaView>
            <ScrollView>
            
  <View style={{marginTop: Platform.OS === 'ios' ? 40 : 20,  }}>
  {/* <View style={{width:'20%', marginEnd:5}}>
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
             */}
       
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
            onPress={() => this.search() }
            size={20} color={'#fff'} />
            </View>       
            </View>
      

            {/* featured moviee zone */}
          
           <View style={{ alignItems:'center', marginTop:10}}>
              <RadioForm
                  radio_props={radio_props}
                  initial={0}
                  onPress={(value) => {this.setState({categoryId:value})}}
                  formHorizontal={true}
                  labelHorizontal={true}  
                  buttonColor={'#fff'} 
                  selectedButtonColor = {'#bd10e0'}
                  buttonStyle ={{color: '#fff',}}
                  labelStyle={{fontSize: 20, color: '#fff', marginEnd: 20,}}
                  animation={true}
                  buttonSize={10}
                  buttonOuterSize={20}/>
           </View>
            <View>
          
          {/* movie section */}
         <View style={{marginTop:20,  height:320}}>
         <Text style={styles.heading}>Movies</Text>     
             {
               isLoadingMovie ? (
                <View style={{height:170, alignItems:'center', justifyContent:'center'}}>   
                <ActivityIndicator color="#ffffff" size="large"/>  
                </View>
               ):(
               movieList.length !== 0 ? (
                <FlatList 
                horizontal = {true}
                data = {movieList}
                renderItem = {({item}) =>{ 
                  return (
                <Featured feature = {item} key = {item.id.toString()}  navigation = {navigation}
                maxwidth = {160}  imagewidth = {150} imageheight ={200}
                />
                  )
                }}
                />
               ): ( <View style={{height:170, alignItems:'center', justifyContent:'center'}}>   
               <Text style={{fontSize:20, color:'#fff'}}>No match found for {keyword}</Text> 
               </View>)
               
               )
             }
              
           </View>
           </View>
         
         
           <View>
               
         <View style={{marginTop:-10, height:320}}>
         <Text style={styles.heading}>Celebrity</Text>  
            { 

isLoadingCeleb ? (
  <View style={{height:170, alignItems:'center', justifyContent:'center'}}>   
  <ActivityIndicator color="#ffffff" size="large"/>  
  </View>
 ):(
  celebrityList.length !== 0 ? (
    <FlatList 
    horizontal = {true}
    data = {celebrityList}
    
    renderItem = {({item}) =>{ 
      return(
       <Celebrity celebrity = {item}   key = {item.id.toString()} navigation= {navigation}
       maxwidth = {160}  imagewidth = {150} imageheight ={200}
       />
      )                   
    }
    } />
  ):(
    
    <View style={{height:170, alignItems:'center', justifyContent:'center'}}>   
    <Text style={{fontSize:20, color:'#fff'}}>No match found for {keyword}</Text> 
    </View>
  )
 )
            
          
               
          }
           
           </View>
          
           </View> 
           
            </ScrollView>
        </SafeAreaView>
      );
  }
}


const styles = StyleSheet.create({
  searchBox: {  
    flex:1,
    flexDirection:"row",
    backgroundColor: '#0037018D',
    margin:10,
    borderRadius: 5,
    padding: 10,
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
  
  heading: {color: '#ffffff', fontSize:22, fontWeight:'bold', marginStart:20}
  
})

