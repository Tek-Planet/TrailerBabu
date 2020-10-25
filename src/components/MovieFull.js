import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types'
import  axios from 'axios'
import Rating from '../components/Rating'

export default class Featured extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          imageUrl:'',
          isLoading:false
        };
      }
      
     static propTypes = {
       movie: PropTypes.object.isRequired
     }
     
     componentDidMount(){
      
      const featured_media = this.props.movie.themeum_movie_trailer_info[0].themeum_video_trailer_image[0]
      
      
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
    const {rating, title} = this.props.movie
    const {isLoading, imageUrl} = this.state
    const {feature, navigation} = this.props
    
    return (
    <View style={{ paddingVertical:20, paddingLeft:16}}>
       {isLoading  ? (
          <TouchableOpacity
          onPress={() => navigation.navigate('MovieDetails', {
              movie: feature,
              imageUrl:imageUrl
          }) }
          >
            <Image alt={"image"} source = { {uri: imageUrl}}
                         style={{width:'98%', marginRight:8, height:250, borderRadius:10} }
                            />
            </TouchableOpacity>) : (
              <Image alt={"image"} source={require('../img/background/Horizontal_big.png')}
              style={{width:'98%', marginRight:8, height:250, borderRadius:10} }
                 />
            )
           }
        <Text style={{color: '#ffffff', margin:8, fontSize:20, fontWeight:'bold'}}>
        {title.rendered}
        </Text>
        <View style={{margin:8}}>
        <Rating  ratings = {rating} />  
        </View>
    </View>
    );
  }
}
