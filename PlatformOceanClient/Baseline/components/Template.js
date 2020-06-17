import React,{Component} from 'react';
import {Platform, Text, StyleSheet, TextInput, View, Button, Image } from 'react-native';
import {Actions} from 'react-native-router-flux';



class Template extends Component {



  state = {
    exampleStateObject:""
  }

  componentDidMount(){
    //start up functionality goes here
  }



  render(){
    return (
      <View>
      //Renderable elements go here examples are given below
      // <Text>
      // {"Example Text"}
      // </Text>
      // <TextInput
      // onChangeText={(text) => this.setState({exampleStateObject: text})}
      // placeholder="Identifier"
      // />
      // <Button
      // title = "Example button"
      // onPress = {() => {this.buttonFunction()}}
      // />
      </View>
    )
  };
  buttonFunction = ()=>{
    //example button function
  }
}


export default Template
