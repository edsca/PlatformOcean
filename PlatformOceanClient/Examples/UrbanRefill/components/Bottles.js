import React,{Component} from 'react';
import {Platform, Text, StyleSheet, TextInput, View, Button, Image } from 'react-native';
import {Actions} from 'react-native-router-flux';



class Bottles extends Component {



  state = {
    newBottleName:"",
    reset:0,
    adminBottleName:"",
    adminBottleUserName:"",
  }

  componentDidMount(){
    if(this.props.fromBarcode){
      this.setState({newBottleName:this.props.newBarcode,adminBottleName:this.props.adminBarcode})
    }
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
            {"As an Admin you can mark bottles in your possession as ready for pickup"}
          </Text>
          <TextInput
            style={{marginLeft:25}}
            onChangeText = {(newText) => {this.setState({adminBottleUserName:newText})}}
            placeholder='Type user name'
          />
          <Text>
            {"Scanned Barcode: "+this.state.adminBottleName}
          </Text>
          <Text>
            {"BottleID: "+this.state.adminBottleUserName+":"+this.state.adminBottleName}
          </Text>
          <Button
            style={{marginTop:20,backgroundColor:'Black',borderColor:'Black',borderWidth:2}}
            title = "Scan a Barcode to get the bottle id"
            onPress = {() => {Actions.scanner({bType:'existingBottle'})}}
          />

          <Button
            style={{marginTop:20,backgroundColor:'Black',borderColor:'Black',borderWidth:2}}
            title = "Advance the specified Bottle"
            onPress = {() => {
              var msg = {
                  name:window.uname,message:"ot.adminvance "
                  +this.state.adminBottleUserName
                  +":"
                  +this.state.adminBottleName,
                  timestamp:new Date()
                }
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
      <Text>
        {"Scanned Barcode: "+this.state.newBottleName}
      </Text>
      <Button
        style={{marginTop:20,backgroundColor:'Black',borderColor:'Black',borderWidth:2}}
        title = "Scan a Barcode to add a new bottle"
        onPress = {() => {Actions.scanner({bType:'newBottle'})}}
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
