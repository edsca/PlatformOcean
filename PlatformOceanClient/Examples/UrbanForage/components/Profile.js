import React,{Component} from 'react';
import {Platform, Text, StyleSheet, TextInput, View, Button, Image } from 'react-native';
import {Actions} from 'react-native-router-flux';



class Profile extends Component {

  state = {
    email: "",
    contactNumber: 0,
    profile:{},
  }

  componentDidMount(){
    window.socket.on('userUpdate',(usr)=>{this.setState({profile:usr})})
    window.socket.emit('clientToServer',{name:window.uname,message:"",timestamp:new Date()})
  }
  componentWillUnmount(){
    window.socket.removeAllListeners("userUpdate");
  }


  render(){
    return(
      <View>
        <Text style={{fontSize:14}}>
          {this.state.profile.email}
        </Text>
        <TextInput
          style={{marginLeft:25}}
          onChangeText = {(newText) => {this.setState({email:newText})}}
          placeholder='New Email Here'
        />
        <Button
          style={{marginTop:20,backgroundColor:'Black',borderColor:'Black',borderWidth:2}}
          title = "Update Email"
          onPress = {() => window.socket.emit('clientToServer',{name:window.uname,message:"pr.email "+this.state.email,timestamp:new Date()})}
        />
        <Text style={{fontSize:14}}>
          {this.state.profile.contactNumber}
        </Text>
        <TextInput
          style={{marginLeft:25}}
          onChangeText = {(newText) => {this.setState({contactNumber:newText})}}
          placeholder='New Contact Number'
        />
        <Button
          style={{marginTop:20,backgroundColor:'Black',borderColor:'Black',borderWidth:2}}
          title = "Update Contact Number"
          onPress = {() => window.socket.emit('clientToServer',{name:window.uname,message:"pr.contactNumber "+this.state.email,timestamp:new Date()})}
        />
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
export default Profile
