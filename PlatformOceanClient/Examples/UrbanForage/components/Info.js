import React,{Component} from 'react';
import {Platform, Text, StyleSheet, TextInput, View, Button, Image } from 'react-native';
import {Actions} from 'react-native-router-flux';



class Info extends Component {

  renderHeading = ()=>{
    return(
      <Text style={{fontSize:25}}>
        {this.props.config.heading}
      </Text>
    )
  }

  renderDescription = ()=>{
    return(
      <Text style={{fontSize:14}}>
        {this.props.config.description}
      </Text>
    )
  }

  render(){
    return(
      <View>
        {this.renderHeading()}
        {this.renderDescription()}
      </View>
    )
  };
}

const styles = StyleSheet.create({
  loginStyle: {
    backgroundColor: '#CCFFFF',
    alignItems: 'center',
    flex: 1,
  },
});
export default Info
