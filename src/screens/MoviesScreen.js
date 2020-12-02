import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, SafeAreaView , StyleSheet, Image} from "react-native";
import axios from 'axios'
import Movie from '../components/MovieFull'
//WORK BEGINS FROM HERE

class FlatListDemo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      page: 1,
      refreshing: false,
      categoryId:1,
      categoryCount:100
    };  
  }

  componentDidMount() {
    this.makeRemoteRequest();

    const getCategories = axios.get('https://trailerbabu.com/wp-json/wp/v2/movie_cat');

    Promise.all([getCategories])
           .then(res => {
             this.setState({
               categoryList:res[0].data,      
             })
           })
           .catch(err => {
             console.log('************************ Network error**********')
           })       
   
  }


  changeBg (item) {
    this.setState({categoryId:item.id,
    categoryCount:item.count,
    categoryName:item.name
    })
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
               refreshing: false
             })
           })
           .catch(err => {
             console.log(err)
           })    
  };
  

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
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

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    const navigation = this.props.navigation
    const {categoryName, categoryId,categoryCount} = this.state
    
    return (
      <SafeAreaView>
     
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
               data = {this.state.categoryList}
               renderItem = {({item}) =>{
                 
                 return (
                 <View style={{paddingVertical:20, paddingLeft:10}}>
                     <TouchableOpacity 
                        onPress={()=>[this.changeBg(item)] }
                        style={[styles.categoryList, item.id === categoryId ? ({backgroundColor: '#bd10e0'}):(null)]}>
                       <Text style={styles.categoryListText}> 
                       {item.name}
                       </Text>
                     </TouchableOpacity>
                 </View>)
               }}
               />
           </View>

     
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            
          categoryId === 1 ? (
             <Movie movie = {item}   key = {item.id.toString()} navigation= {navigation}/>    
             ) 
             : 
             ( item.movie_cat.includes(categoryId) ? (  <Movie movie = {item}   key = {item.id.toString()} navigation= {navigation}/>): (null)
             )
          )}
          keyExtractor={item => item.id}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={10}      
        />

        {
          categoryCount === 0 ? ( <View style={{height:170, alignItems:'center', justifyContent:'center'}}>   
          <Text style={{color:'#fff', fontSize:18, textAlign:'center'}}>No result found for {categoryName}</Text>
          </View>):(null)
        }
   
    </SafeAreaView>
    );
  }
}

export default FlatListDemo;


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
    backgroundColor: '#0037018D'
  },
  categoryListText:{
    textAlign:'center',
    color:'#ffffff',
    fontSize:14
  },
  
  heading: {color: '#ffffff', fontSize:22, fontWeight:'bold'}
  
})