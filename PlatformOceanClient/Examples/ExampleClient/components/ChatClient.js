import React, {Component} from "react";
import {Platform,Text, StyleSheet, TextInput, View, Button,ScrollView } from 'react-native';
import {Actions} from 'react-native-router-flux';
import io from "socket.io-client";


class ChatClient extends Component {

  state = {
    msgLog: [],
    msgToSend: "",
    config:"",
    profile:{}
  }

  componentDidMount(){
      this.text = "test"
      this.socket = io(('http://'+window.ip+':'+window.port),{
              transports: ['websocket']
            });
      this.socket.emit('JOINED',window.uname);
      this.socket.on('serverToClient',(msg) => {this.updateChat(msg)})
      this.socket.on('config',(config)=>{this.setConfig(config)})
      this.socket.on('userUpdate',(usr)=>{this.setState({profile:usr})})
      this.socket.on('disconnect',() =>{this.updateChat({name:"local",message:"You've Disconnected. Hold Tight",timestamp:new Date()})})
      this.uname = window.uname
  }
  componentWillUnmount(){
    this.socket.disconnect()
    this.socket.removeAllListeners("serverToClient");
  }

  setConfig = (config) =>{
    this.setState({config:config});
  }

  renderConfig = () =>{
    return(
        <Text>
        {this.state.config.heading}
        </Text>
    )
  }
  sendMSG = (msg) =>{
    this.socket.emit('clientToServer',{name:this.uname,message:msg,timestamp:new Date()});
    this.setState({msgToSend:""})
  }


  updateChat = (msg) => {
    this.setState({msgLog : [...this.state.msgLog, msg]})

  }
  renderChat = () => {

    return this.state.msgLog.map((msg, index) => {
      if(msg.name=='Server'){
        return (
          <Text key={index} style={{textAlign: "center",color:"blue",fontStyle:"italic"}}>
            {msg.message}
          </Text>
        )
      }
      else{
        return (
          <Text key={index}>
            {msg.name+": "+msg.message}
          </Text>
        )
      }
    })
  }

  renderProfile = () =>{

    return(
      <Text>
      {JSON.stringify(this.state.profile)}
      </Text>
    )
  }

  render(){
    return (
      <View>
        <View>
        <Text>
          {"You are writing as: " + window.uname}
        </Text>
        <Text>
          {this.renderConfig()}
        </Text>
        <ScrollView style={styles.textBox}>
          {this.renderChat()}
        </ScrollView>
          <TextInput
            value={this.state.msgToSend}
            onChangeText={(msgToSend) => this.setState({msgToSend: msgToSend})}
            placeholder="Type message here!"
          />
        </View>
        <View>
          <Button
              title = "Send a message"
              onPress = {() => (this.state.msgToSend!="")&&this.sendMSG(this.state.msgToSend)}
          />
        </View>
        <View>
        <Text>
          Profile page dummy section:
        </Text>
          {this.renderProfile()}
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: ( Platform.OS === 'ios' ) ? 40 : 0
  },
  button: {
    marginTop: 10,
    height: 30,
  },
  textBox: {
    marginTop: 30,
    height: 250,
    borderColor: 'black',
    borderWidth: 1
  },
  inputBox: {
    height: 80,
    borderColor: 'green',
    borderWidth: 1
  },
});

export
default
ChatClient
