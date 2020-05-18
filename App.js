
import React, { Component } from 'react';
import { NetInfo } from 'react-native';
import AppContainer from './navigation/stackNavigation';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';

import * as firebase from 'firebase';
import config from './Config/ApiKeys';
const db = firebase.database();

class App extends Component {
  constructor(props) {
    super(props);

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }

  componentDidMount() {
    // NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    SplashScreen.hide();
  }
  componentWillMount() {
    // NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    // NetInfo.isConnected.fetch().then(isConnected => {
      // if (isConnected == true) {
        AsyncStorage.getItem("currentUser").then(value => {
          if (value) {
            let userData = JSON.parse(value);
            userData.status = 'Online';
            console.log(userData, 'userData')
            db.ref(`users/${userData._id}`).update(userData);
          }
        })
      // } else {
      //   AsyncStorage.getItem("currentUser").then(value => {
      //     if (value) {
      //       let userData = JSON.parse(value);
      //       userData.status = 'Offline';
      //       console.log(userData, 'userData')
      //       db.ref(`users/${userData._id}`).update(userData);
      //     }
      //   })
      // }
    // });
  }


  componentWillUnmount() {
    // NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    AsyncStorage.getItem("currentUser").then(value => {
      if (value) {
        let userData = JSON.parse(value);
        userData.status = 'Offline';
        console.log(userData, 'userData')
        db.ref(`users/${userData._id}`).update(userData);
      }
    })
  }

  // handleConnectivityChange = isConnected => {
  //   // if (isConnected == true) {
  //   //   AsyncStorage.getItem("currentUser").then(value => {
  //   //     if (value) {
  //   //       let userData = JSON.parse(value);
  //   //       userData.status = 'Online';
  //   //       console.log(userData, 'userData')
  //   //       db.ref(`users/${userData._id}`).update(userData);
  //   //     }
  //   //   })
  //   // } else
  //   if (!isConnected) {
  //     AsyncStorage.getItem("currentUser").then(value => {
  //       if (value) {
  //         let userData = JSON.parse(value);
  //         userData.status = 'Offline';
  //         console.log(userData, 'userData')
  //         db.ref(`users/${userData._id}`).update(userData);
  //       }
  //     })
  //   }
  // };

  render() {
    return <AppContainer />
  }
}

export default App;