import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'
import  axios from 'axios'

export default class Streaming extends Component {
    constructor(props) {
        super(props);
        this.state = {
          imageUrl:'',
          isLoading:false
        };
      }
    
    //git config --global user.name "Tek-Planet"
      
     static propTypes = {
      streaming: PropTypes.object.isRequired
     }
     
     componentDidMount(){
       const {featured_media} = this.props.streaming
       const {streaming, navigation} = this.props
      
       if(featured_media !== 0){
      axios.get(`https://trailerbabu.com/wp-json/wp/v2/media/${featured_media}`)
      .then(res => {
        this.setState({
          imageUrl:res.data.media_details.sizes.full.source_url,
          isLoading:true
        })
      })}
       else{
        this.setState({
          imageUrl:'https://source.unsplash.com/random',
          isLoading:true
        })
       }
     }
    

  render() {
    const {title} = this.props.streaming
    const {isLoading, imageUrl} = this.state
    const {streaming, navigation} = this.props
    
    return (
    <View style={{paddingVertical:20, paddingLeft:16, maxWidth: 260}}>
       {isLoading  ? ( <TouchableOpacity 
                         onPress={() => navigation.navigate('MovieDetails', {
                          movie: streaming,
                          imageUrl:imageUrl
                      }) }
                      >
            <Image alt={"image"} source = { {uri: imageUrl}}
                        style={{width:250, marginRight:8, height:150, borderRadius:10}}
                            />
            </TouchableOpacity>) : (null)
           }
        <Text style={{color:'#ffffff',margin:5, fontSize:18, fontWeight:'bold'}}>
        {title.rendered}
        
        </Text>
    </View>
    );
  }
}
