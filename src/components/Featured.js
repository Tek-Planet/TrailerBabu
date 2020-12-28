import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types'
import  axios from 'axios'


export default class Featured extends Component {
    constructor(props) {
        super(props);
        this.state = {
          imageUrl:'',
          isLoading:false
        };
      }
      
     static propTypes = {
       feature: PropTypes.object.isRequired
     }
     
     componentDidMount(){
      
       const {featured_media} = this.props.feature    
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
          imageUrl: require('../img/background/Vertical_Big.png'),
          isLoading:true
        })
       }
     }
    

  render() {
    const {title} = this.props.feature
    const {isLoading, imageUrl} = this.state
    const {feature, navigation, maxwidth,imagewidth,imageheight} = this.props
    
  
    
    
    return (
    <View style={{ maxWidth: maxwidth, paddingVertical:20, paddingLeft:16}}>
       {isLoading  ? (
          <TouchableOpacity
           onPress={() => navigation.navigate('Movies', {screen: 'MovieDetails',
           params:{movie: feature, imageUrl:imageUrl }
          }) }
          >
            <Image alt={"image"} source = { {uri: imageUrl}}
                         style={{width:imagewidth, marginRight:8, height:imageheight, borderRadius:10} }
                            />
            </TouchableOpacity>) : (

              <Image alt={"image"} source={require('../img/background/Vertical_Big.png')}
              style={{width:imagewidth, marginRight:8, height:imageheight, borderRadius:10} }
              />
            )
           }
        <Text style={{color: '#ffffff', margin:5, fontSize:18, fontWeight:'bold'}}>
        {title.rendered}
        </Text>
    </View>
    );
  }
}
