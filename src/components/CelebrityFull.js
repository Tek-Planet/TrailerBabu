import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types'
import  axios from 'axios'

export default class Celebrity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl:'',
      isLoading:false
    };
  }
  
 static propTypes = {
   celebrity: PropTypes.object.isRequired
 }
 
 componentDidMount(){
   const {featured_media} = this.props.celebrity
  
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
      imageUrl:'noImage',
      isLoading:true
    })
   }
 }

  render() {
      const {title} = this.props.celebrity
      const {isLoading, imageUrl} = this.state
      const {celebrity, navigation} = this.props
    
    return (
        <View style={{ margin:5, alignContent:'center', alignItems:'center'}}>   
          {isLoading  ? (
           // if the celevrity has profile Image
           imageUrl !== 'noImage' ? (<TouchableOpacity
            onPress={() => navigation.navigate('CelebrityDetails', {
              celebrity: celebrity,
              imageUrl:imageUrl
          }) }
                      >
          <Image alt={"image"} source = { {uri: imageUrl}}
                      style={{width:170, marginRight:8, height:200, borderRadius:10} }
                          />
          </TouchableOpacity>): (

            // display no image icon if celebrity has no image
            <TouchableOpacity
            onPress={() => navigation.navigate('CelebrityDetails', {
              celebrity: celebrity,
              imageUrl:imageUrl
          }) }
                      >
              <Image alt={"image"} source={require('../img/background/noImage.png')}
              style={{width:170, marginRight:8, height:200, borderRadius:10} }
                />
          </TouchableOpacity>
          )
        ) : (
             <Image alt={"image"} source={require('../img/background/Vertical_Big.png')}
             style={{width:170, marginRight:8, height:200, borderRadius:10} }
             />
          )
           }
          
            <Text style={{color:'#ffffff',margin:5, fontSize:18, fontWeight:'bold', textAlign:'center'}}>
             {title.rendered}
            </Text>      
        </View>)
  }
}
