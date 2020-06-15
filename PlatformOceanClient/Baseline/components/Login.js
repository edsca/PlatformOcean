import React,{Component} from 'react';
import {Platform, Text, StyleSheet, TextInput, View, Button, Image } from 'react-native';
import {Actions} from 'react-native-router-flux';


window.uname = "";
class Login extends Component {


  render(){
    return(
      <View style = {styles.loginStyle}>
        <Image
          style = {{marginTop: 15}}
          source = {require('../assets/icon.png')}
        />
        <View style={{flexDirection:'row',marginTop:15,borderColor:'Black',borderWidth:2,flexWrap:'nowrap',width:250}}>
          <Text style={{fontSize:14}}>
            Username:
          </Text>
          <TextInput
            style={{marginLeft:25}}
            onChangeText = {(newText) => {window.uname = newText}}
            placeholder='enter name here'
          />
        </View>
        <Button
          style={{marginTop:20,backgroundColor:'Black',borderColor:'Black',borderWidth:2}}
          title = "Login"
          onPress = {() => {Actions.menu()}}
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
export default Login
