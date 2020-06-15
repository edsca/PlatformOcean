import React from 'react';
import Login from './components/Login';
import Menu from './components/Menu';
import ChatClient from './components/ChatClient';
import {Router, Scene} from 'react-native-router-flux';

import { StyleSheet, Text, View } from 'react-native';

window.serverInfoPairs = [];
window.id = "";
window.ip = "";
window.port = "";


export default class App extends React.Component {
  render(){
    return (
      <Router>
        <Scene key='app'>
          <Scene key='login' component={Login} title = "Login"/>
          <Scene key='menu' component={Menu} title = "Main Menu"/>
          <Scene key='chat' component={ChatClient} title = "Chat"/>
        </Scene>
      </Router>
    );
  }
}
