import React,{Component} from 'react';
import {Platform, Text, StyleSheet, TextInput, View, Button, Image } from 'react-native';
import {Actions} from 'react-native-router-flux';



class Profile extends Component {

  state = {
    email: "",
    contactNumber: 0,
    postCode: "",

  }

  componentDidMount(){
    window.socket.on('userUpdate',(usr)=>{window.profile = usr})
    window.socket.emit('clientToServer',{name:window.uname,message:"",timestamp:new Date()})
  }
  componentWillUnmount(){
    window.socket.removeAllListeners("userUpdate");
  }

  renderEmail = () =>{
    return(
      <View>
      <Text style={{fontSize:14}}>
        {"Email: " +window.profile.email}
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
      </View>
    )
  }

  renderContactNumber = () =>{
    return(
      <View>
        <Text style={{fontSize:14}}>
          {"Contact Number: " + window.profile.contactNumber}
        </Text>
        <TextInput
          style={{marginLeft:25}}
          onChangeText = {(newText) => {this.setState({contactNumber:newText})}}
          placeholder='New Contact Number'
        />
        <Button
          style={{marginTop:20,backgroundColor:'Black',borderColor:'Black',borderWidth:2}}
          title = "Update Contact Number"
          onPress = {() => window.socket.emit('clientToServer',{name:window.uname,message:"pr.contactNumber "+this.state.contactNumber,timestamp:new Date()})}
        />
      </View>

    )
  }

  renderPostCode =() =>{
    return(
      <View>
        <Text style={{fontSize:14}}>
          {"PostCode: " + window.profile.postCode}
        </Text>
        <TextInput
          style={{marginLeft:25}}
          onChangeText = {(newText) => {this.setState({postCode:newText})}}
          placeholder='New PostCode (first 2/3 letters/numbers)'
        />
        <Button
          style={{marginTop:20,backgroundColor:'Black',borderColor:'Black',borderWidth:2}}
          title = "Update Post Code"
          onPress = {() => window.socket.emit('clientToServer',{name:window.uname,message:"pr.postCode "+this.state.postCode,timestamp:new Date()})}
        />
      </View>
    )
  }

  renderDeliveriesMade = () =>{
    return(
      <Text style={{fontSize:14}}>
        {"You have successfully made " + window.profile.deliveriesMade+" deliveries"}
      </Text>
    )
  }

  renderAwards = () =>{
    return(
      <Text style={{fontSize:14}}>
        {"You have earned the following awards: " + JSON.stringify(window.profile.awards)}
      </Text>
    )
  }

  renderApproval = () =>{
    return(
      <Text style={{fontSize:14}}>
        {"Approved to send messages: " + window.profile.approved}
      </Text>
    )
  }


  render(){
    try{
      return(
        <View>

          <View>
            {this.renderEmail()}
            {this.renderContactNumber()}
            {this.renderPostCode()}
            {this.renderDeliveriesMade()}
            {this.renderAwards()}
            {this.renderApproval()}
          </View>
        </View>
      )
    }catch(err){
      return(
        <View>
          <Text>
            {"page couldn't load. Check Server is online"}
          </Text>
        </View>
      )
  }
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
