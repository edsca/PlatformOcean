import React,{Component} from 'react';
import {Platform, Text, StyleSheet, TextInput, View, Button, Image } from 'react-native';
import {Actions} from 'react-native-router-flux';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';



class Map extends Component {

  componentDidMount(){
    window.socket.emit('clientToServer',{name:window.uname,message:"wa.joblist",timestamp:new Date()})
    this.setHomeRegion()
    this.setMarkers()
}

  state = {
    region: {
      latitude: 51.498356,
      longitude: -0.176894,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    markers:[],

  }

  setMarkers = ()=>{
    var tmp = {}
    for(var i = 0;i<window.jobList.length;i++){
      console.warn(window.jobList[i].description)
      tmp.latlng = window.jobList[i].description.location
      tmp.title =  window.jobList[i].description.desc
      tmp.description = ""
      this.state.markers.push(tmp)

    }
  }


  onRegionChange = (region) => {
    this.setState({region:region});
  }

  setHomeRegion = ()=>{
    var postcode = window.profile.postCode.split(" ")[0]
    if(postcode=="W1"){
      this.setState({region:{
        latitude: 51.497971,
        longitude: -0.135642,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        },
      })
    }
    else if(postcode=="W2"){
      this.setState({region:{
        latitude: 51.515123,
        longitude: -0.176381,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        },
      })
    }

  }

  render(){
    return(

      <MapView
        style={styles.map}
        region={this.state.region}
        onRegionChange={this.onRegionChange}
      >
      {this.state.markers.map((marker,key) =>(
        <Marker
          coordinate={marker.latlng}
          title={marker.title}
          description={key.toString()}
        />
      ))}
      </MapView>
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
