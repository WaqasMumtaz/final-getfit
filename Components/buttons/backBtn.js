import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity , BackHandler} from 'react-native';

import { withNavigation } from 'react-navigation';

class HandleBack extends React.Component{ 
constructor(props){
    super(props)

   this.state={

   }

   this.didFocus = this.props.navigation.addListener('didFocus', payload =>{
     BackHandler.addEventListener('hardwareBackPress', this.onBack)
   })

}

componentDidMount(){
    this.willBluer = this.props.navigation.addListener('willBlur', payload =>{
     BackHandler.removeEventListener('hardwareBackPress', this.onBack)
    })
}

onBack = ()=>{
    return this.props.onBack();
}

componentWillUnmount(){
    this.didFocus.remove();
    this.willBluer.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.onBack)

}

render(){
    return this.props.children;
        
}


}

export default withNavigation(HandleBack);