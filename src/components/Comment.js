import React, { Component } from 'react';
import { View, Text, StyleSheet,  ActivityIndicator , FlatList} from 'react-native';
import PropTypes from 'prop-types'
import axios from 'axios'
import { SafeAreaView } from 'react-native-safe-area-context';

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading:false,
        comments: []
    };
  }
  
  static propTypes = {
    postID: PropTypes.number.isRequired
  }
  
  componentDidMount(){
    const {postID} = this.props
   
   axios.get(`https://trailerbabu.com/wp-json/wp/v2/comments?post=${postID}`)
   .then(res => {
     this.setState({
       comments:res.data,
       isLoading:true
     })
   })
   
}

  render() {
    const {isLoading, comments} = this.state
  
    let commentMarkup = comments.length !== 0 ? (
    
     <FlatList 
        data = {comments}
        renderItem = {({item}) =>{
            const regex = /(<([^>]+)>)/ig;
            const content = item.content.rendered.replace(regex, '');
           return (
           
              <View >
                <View style={{marginTop:10, marginStart:20, marginEnd:20, flexDirection: 'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:20, fontWeight:"bold", color:"#ffffff"}}>{item.author_name}</Text>     
                    <Text style={{fontSize:20, fontWeight:"bold", color:"#ffffff"}}>Rating</Text>              
                </View>
           
                <View style={{marginTop:5,  marginStart:20, marginEnd:20,  }}>
                <Text style={{paddingHorizontal:14,lineHeight:26, justifyContent: 'flex-start', textAlign:'justify', fontSize:20, fontWeight:"normal", color:"#ffffff"}}>{content }</Text>       
                </View>
           </View>
         
            )
        }}
        />

    ):(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{fontSize:20, fontWeight:"normal", color:"#ffffff"}}> No review for this movie yet </Text>       
        </View>
    )
    
    let checkIfCommentIsLoaded = isLoading ? commentMarkup :
    (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <ActivityIndicator color="#ffffff" size="large"/>  
</View>)
    
  
    return (
      
        <View style={{padding:20, }}>
            <Text style={{ marginStart:20,fontSize:22, fontWeight:"bold", color:"#ffffff"}}>Reviews</Text>                  
          
            { checkIfCommentIsLoaded}
        </View>
      
        )
    }
}


const styles = StyleSheet.create({
  
    
    row:{
      flexDirection:'row',
      maxWidth:300, marginStart:20, marginTop:15
    },
    
    column:{
      marginStart:20, marginTop:15
    }
      
  })
  
