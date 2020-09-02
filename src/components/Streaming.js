import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
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
      
     static propTypes = {
      streaming: PropTypes.object.isRequired
     }
     
     componentDidMount(){
       const {featured_media} = this.props.streaming
      
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
    
    return (
    <View style={{paddingVertical:20, paddingLeft:16}}>
       {isLoading  ? ( <TouchableOpacity>
            <Image alt={"image"} source = { {uri: imageUrl}}
                        style={{width:200, marginRight:8, height:150, borderRadius:10}}
                            />
            </TouchableOpacity>) : (null)
           }
        <Text style={{margin:5, fontSize:18, fontWeight:'bold'}}>
        {title.rendered}
        
        </Text>
    </View>
    );
  }
}
