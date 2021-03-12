import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';

export default class Featured extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
      isLoading: false,
    };
  }

  static propTypes = {
    feature: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const {featured_media} = this.props.feature;

    if (featured_media !== 0) {
      axios
        .get(`https://trailerbabu.com/wp-json/wp/v2/media/${featured_media}`)
        .then((res) => {
          this.setState({
            imageUrl: res.data.media_details.sizes.full.source_url,
            isLoading: true,
          });
        });
    } else {
      this.setState({
        imageUrl: 'https://source.unsplash.com/random',
        isLoading: true,
      });
    }
  }

  render() {
    const {title} = this.props.feature;
    const {isLoading, imageUrl} = this.state;
    const {feature, navigation} = this.props;

    return (
      <View style={{paddingVertical: 20, paddingLeft: 16}}>
        {isLoading ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('MovieDetails', {
                movie: feature,
                imageUrl: imageUrl,
              })
            }>
            <Image
              alt={'image'}
              source={{uri: imageUrl}}
              style={{
                width: '98%',
                marginRight: 8,
                height: 300,
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
        ) : null}
        <Text
          style={{
            color: '#ffffff',
            margin: 5,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          {title.rendered}
        </Text>
      </View>
    );
  }
}
