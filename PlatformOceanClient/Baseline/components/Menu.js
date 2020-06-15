import React, {Component} from "react";
import {Platform,Text, StyleSheet, TextInput, View, Button,ScrollView } from 'react-native';
import {Actions} from 'react-native-router-flux';


class Menu extends Component {



  renderChatRoomChoices = () => {
    return window.serverInfoPairs.map((msg, index) => {
      return (
        <Text style={{borderWidth:2,backgroundColor:'orange',height:40,fontSize:25}} key={index} onPress = {() => {

          window.id = msg[0];
          window.ip = msg[1];
          window.port = msg[2];
          //Actions.refresh('chat')
          Actions.chat()
        }}>
          {msg[0]+"("+msg[1]+":"+msg[2]+")"}
        </Text>
      )
    })
  }


  render(){
    return (
      <View style={menuStyles.menuStyle}>
        <View>
        <Text style={{fontSize:25,marginTop:30}}>
        {"Your PlatformOcean Chat servers:"}
        </Text>
        <ScrollView>
          {this.renderChatRoomChoices()}
        </ScrollView>

        </View>
        <View style={{borderWidth:1, borderColor:'black',marginTop:50}}>

          <Text>
            {"Join a new server by providing IP:port and a room identifier below"}
          </Text>
          <TextInput
            onChangeText={(newPort) => this.setState({id: newPort})}
            placeholder="Identifier"
          />
          <TextInput
            onChangeText={(newIP) => this.setState({ip: newIP})}
            placeholder="IP"
          />
          <TextInput
            onChangeText={(newPort) => this.setState({port: newPort})}
            placeholder="Port"
          />
          <Button
            title = "Add New Server"
            onPress = {() => {window.serverInfoPairs.push([this.state.id,this.state.ip,this.state.port]);Actions.reset('menu')}}
          />
        </View>

      </View>
    );
  }
}

const menuStyles = StyleSheet.create({
  menuStyle: {
    backgroundColor: '#CCFFFF',
    flex: 1,
  },
});

export default Menu
