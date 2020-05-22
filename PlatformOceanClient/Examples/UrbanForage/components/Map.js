import React,{Component} from 'react';
import {Platform, Text, StyleSheet, TextInput, View, Button, Image } from 'react-native';
import {Actions} from 'react-native-router-flux';
import MapView from 'react-native-maps';



class Map extends Component {

  state = {
    region: {
      latitude: 51.498356,
      longitude: -0.176894,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  }

  onRegionChange = (region) => {
    this.setState({region:region});
  }


  render(){
    return(

        <MapView
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
      />
    )
  };
}

const styles = StyleSheet.create({
  loginStyle: {
    backgroundColor: '#CCFFFF',
    alignItems: 'center',
    flex: 1,
  },
  map:{...StyleSheet.absoluteFillObject,},
});
export default Map
