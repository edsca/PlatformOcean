import React,{Component} from 'react';
import {Platform, Text, StyleSheet, TextInput, View, Button, Image } from 'react-native';
import {Actions} from 'react-native-router-flux';



class Bottles extends Component {

  state = {
    newBottleName:"",
    reset:0,
    adminBottleName:"",
  }

  renderBottles = () =>{
    var bottles = window.profile.objects;
    return window.profile.objects.map((object, index) =>{
      return(
        <View key={index}>
          <Text style={{textAlign: "center",color:"blue",fontStyle:"italic"}}>
            {JSON.stringify(object)}
          </Text>
          <Button

            style={{marginTop:20,backgroundColor:'Black',borderColor:'Black',borderWidth:2}}
            title = "Advance this bottle"
            onPress = {() => {
              var msg = {name:window.uname,message:"ot.advance "+object.objName.substring(window.uname.length+1),timestamp:new Date()}
              window.socket.emit('clientToServer',msg);
              this.setState({reset:1})
              }
            }

          />
        </View>
      )
    })
  }
  renderAdminBottles = ()=>{
    if(window.uname=="Admin"){
      return(
        <View>
          <Text style={{fontSize:14}}>
            {"As an Admin you can mark bottles in your posession as ready for pickup"}
          </Text>
          <TextInput
            style={{marginLeft:25}}
            onChangeText = {(newText) => {this.setState({adminBottleName:newText})}}
            placeholder='Type <name>:<BottleName>'
          />
          <Button
            style={{marginTop:20,backgroundColor:'Black',borderColor:'Black',borderWidth:2}}
            title = "Advance the specified Bottle"
            onPress = {() => {
              var msg = {name:window.uname,message:"ot.adminvance "+this.state.adminBottleName,timestamp:new Date()}
              window.socket.emit('clientToServer',msg);
              this.setState({reset:1})
              }
            }
          />
        </View>
      )
    }
    else{
      return(
        <Text>
          {"You are not an admin"}
        </Text>
      )
    }
  }

  renderNewBottles = () =>{
    return(
      <View>
      <TextInput
        style={{marginLeft:25}}
        onChangeText = {(newText) => {this.setState({newBottleName:newText})}}
        placeholder='New Bottle Name Here'
      />
      <Button
        style={{marginTop:20,backgroundColor:'Black',borderColor:'Black',borderWidth:2}}
        title = "Add a new bottle"
        onPress = {() => {window.socket.emit('clientToServer',{name:window.uname,message:"ot.initobject "+this.state.newBottleName,timestamp:new Date()});this.setState({reset:1})}}
      />
      </View>
    )
  }

  render(){
    try{
      return(
        <View>
          {this.renderBottles()}
          {this.renderNewBottles()}
          {this.renderAdminBottles()}
        </View>
      )
    }catch(err){
      console.warn(err)
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
export default Bottles
