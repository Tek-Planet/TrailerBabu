import React, {Component} from 'react';
import {View, ImageBackground} from 'react-native';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <ImageBackground
          style={{width: '100%', height: '100%'}}
          source={require('../img/splash.png')}
        />
      </View>
    );
  }
}

export default SplashScreen;
