import React,{Component, } from 'react';
import {Platform, Text, StyleSheet, TextInput, View, Button, Image } from 'react-native';
import {Actions} from 'react-native-router-flux';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';


class BCScanner extends Component {
  state = {
    scanned:false,
    permission:null,
    barcode:"",
  }

  componentDidMount(){
    console.warn(this.props.bType)

  }

  accept = ()=>{
    if(this.props.bType=="newBottle"){
      Actions.bottles({fromBarcode:true,newBarcode:this.state.barcode,adminBarcode:""})
    }else if(this.props.bType=="existingBottle"){
      Actions.bottles({fromBarcode:true,newBarcode:"",adminBarcode:this.state.barcode})
    }
  }

   requestPermissions = async () =>{
    const {status}= await BarCodeScanner.requestPermissionsAsync();
    this.setState({permission:true})
  }

  render(){

    this.requestPermissions()

    if (this.state.permission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (this.state.permission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={this.state.scanned ? undefined : ({ type, data }) => {
              this.setState({scanned:true,barcode:data})
              alert(`Bar code with type value ${data} has been scanned!`);
            }
          }
          style={StyleSheet.absoluteFillObject}
        />

        {this.state.scanned && <Button title={'Accept'} onPress={() => this.accept()} />}
        {this.state.scanned && <Button title={'Scan Again'} onPress={() => this.setState({scanned:false})} />}

        </View>
      );
  }
}

export default BCScanner
