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
          imageUrl:require('../img/background/Vertical_Big.png'),
          isLoading:true
        })
       }
     }
    

  render() {
    const {rating, title} = this.props.movie
    const {isLoading, imageUrl} = this.state
    const {movie, navigation} = this.props
    
    return (
    <View style={{ marginBottom:20}}>
       {isLoading  ? (
          <TouchableOpacity
          onPress={() => navigation.navigate('MovieDetails', {
              movie: movie,
              imageUrl:imageUrl
          }) }
          >
            <Image alt={"image"} source = { {uri: imageUrl}}
                         style={{ marginStart:20, marginEnd:20, height:172, borderRadius:10, } }
                            />
            </TouchableOpacity>) : (
              <Image alt={"image"} source={require('../img/background/Horizontal_big.png')}
              style={{ marginStart:20, marginEnd:20, height:172, borderRadius:10, } }
                 />
            )
           }
        <Text style={{color: '#ffffff', marginStart:35, marginTop:10, fontSize:20, fontWeight:'bold'}}>
        {title.rendered}
        </Text>
        <View style={{ marginStart:35,  marginTop:10,}}>
        <Rating  ratings = {rating} />  
        </View>
    </View>
    );
  }
}
