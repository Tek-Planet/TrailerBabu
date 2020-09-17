import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaView>
            <ScrollView>
           
                 <View style={{padding:20,}}>
                     <Text style={styles.heading}>Welcome</Text>                  
                     <Text style={styles.heading}>Abhilash Krishnan</Text>   
                </View>
                
                <View style={{backgroundColor:'#7a00ff' , padding:10, borderTopWidth:1, borderBottomWidth:1, borderColor:'#d2d9f0'}}>
                <View style={styles.subHeading}>
                        <Text style={styles.text}>Watchlists</Text>                  
                        <Icon name="chevron-forward-outline" size={22} color="#ffffff" />
                    </View>
                    <View style={styles.subHeading}>
                     <Text style={styles.text}> Reviews</Text>                  
                     <Icon name="chevron-forward-outline" size={22} color="#ffffff" />
                   </View>
                   <View style={styles.subHeading}>
                     <Text style={styles.text}> My Profile</Text>                  
                     <Icon name="chevron-forward-outline" size={22} color="#ffffff" />
                  </View>
                </View>
                
                
                <View style={{ marginTop:30, backgroundColor:'#7a00ff' , padding:10, borderTopWidth:1, borderBottomWidth:1, borderColor:'#d2d9f0'}}>
                <View style={styles.subHeading}>
                        <Text style={styles.text}>Notifications</Text>                  
                        <Icon name="ellipsis-horizontal-outline" size={22} color="#ffffff" />
                    </View>
                    <View style={styles.subHeading}>
                     <Text style={styles.text}> Remove Ads</Text>                  
                     <Icon name="ellipsis-horizontal-outline" size={22} color="#ffffff" />
                   </View>
                   <View style={styles.subHeading}>
                     <Text style={styles.text}> About App</Text>                  
                     <Icon name="chevron-forward-outline" size={22} color="#ffffff" />
                  </View>
                </View>
                
                
                <View style={{ marginTop:30, backgroundColor:'#7a00ff' , padding:10, borderTopWidth:1, borderBottomWidth:1, borderColor:'#d2d9f0'}}>
                <View style={styles.subHeading}>
                        <Text style={styles.text}>Privacy Policy</Text>                  
                        <Icon name="chevron-forward-outline" size={22} color="#ffffff" />
                    </View>
                    <View style={styles.subHeading}>
                     <Text style={styles.text}> Terms of Service </Text>                  
                     <Icon name="chevron-forward-outline" size={22} color="#ffffff" />
                   </View>
                   <View style={styles.subHeading}>
                   <Image 
                        duraton="1500"
                        source={require('../img/logo.png')}
                    />                
                  <Text style={[styles.text, {fontSize:13}]}> trailerbabudotcom@gmail.com</Text> 
                  </View>
                </View>
                
                <View>
                <TouchableOpacity 
                       style={styles.categoryList}>
                       <Text style={styles.categoryListText}>
                          Logout
                       </Text>
                     </TouchableOpacity>
                </View>
                
        
            </ScrollView>
      </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
 
  heading: {color: '#ffffff', fontSize:22, fontWeight:'bold'},
  
  text: {color: '#ffffff', fontSize:18, fontWeight:'normal'},
  
  subHeading:{
              margin: 10,
              flexDirection: 'row', justifyContent:'space-between'},
  categoryList: {
    marginTop:40,
    margin: 20,
    padding:14,
    borderRadius:10,
    backgroundColor: '#bd10e0',
    alignItems: 'center',
  },
  categoryListText:{
    color:'#ffffff',
    fontSize:20,
    textAlign:'center'
    
  },
  
})
