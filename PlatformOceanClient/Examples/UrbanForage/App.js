import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import Login from './components/Login';
import Main from './components/Main';
import Profile from './components/Profile';
import Info from './components/Info';
import Map from './components/Map';




export default function App() {
  return (
    <Router>
      <Scene key='app'>
        <Scene key='login' component={Login} title = "Login"/>
        <Scene key='main' component={Main} title= "Main"/>
        <Scene key='profile' component={Profile} title="Profile"/>
        <Scene key='info' component={Info}  title="Information"/>
        <Scene key='map' component={Map}  title="Map"/>
      </Scene>
    </Router>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
