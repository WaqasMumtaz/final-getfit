import * as React from 'react';
import {  createAppContainer } from 'react-navigation';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Image } from 'react-native';
import ChatInbox from '../Components/screens/chatInbox';
// import Chatscreen from '../screens/Chat';
import Reportscreen from '../Components/screens/Reports';
import Homescreen from '../Components/screens/Home';
import Options from '../Components/screens/Options';

const activeHome = <Image source={require('../Components/icons/home-active.png')} style={{ width: 26, height: 26 }} />
const inactiveHome = <Image source={require('../Components/icons/home-inactive.png')} style={{ width: 26, height: 26 }} />
const activeChat = <Image source={require('../Components/icons/chat-active.png')} style={{ width: 26, height: 26 }} />
const inactiveChat = <Image source={require('../Components/icons/chat-inactive.png')} style={{ width: 26, height: 26 }} />
const activeReports = <Image source={require('../Components/icons/reports-active.png')} style={{ width: 26, height: 26 }} />
const inactiveReports = <Image source={require('../Components/icons/reports-inactive.png')} style={{ width: 26, height: 26 }} />
const activeMore = <Image source={require('../Components/icons/more-active.png')} style={{ width: 26, height: 26 }} />
const inactiveMore = <Image source={require('../Components/icons/more-inactive.png')} style={{ width: 26, height: 26 }} />

function getData(){
  console.log('Chat Screen Function Called Success')
}

const TabBarComponent = props => <BottomTabBar {...props} />;
const MainNavigator = createBottomTabNavigator({

  Homescreen: {
    screen: Homescreen,
    navigationOptions: {
      tabBarIcon: (navigation) => {
        const forFocused = navigation.focused;
        const renderHome = forFocused ? activeHome : inactiveHome;
        return (
          renderHome
        )
      }
    }
  },
  Chatscreen: {
    screen: ChatInbox,
    navigationOptions: {
      tabBarIcon: (navigation) => {
        //console.log('tabBarIcon navigation >>>',navigation.state)
        // console.log('chatscreen rout >>>', navigation.focused)
        const forFocused = navigation.focused;
        const renderChat = forFocused ? activeChat : inactiveChat;
        //const routScreen = forFocused ? getData() : null;
        return (
          renderChat
          
        )
      }

     

    },
    
    
  },

  Reportscreen: {
    screen: Reportscreen,
    navigationOptions: {
      tabBarIcon: (navigation) => {
        const forFocused = navigation.focused;
        const renderReports = forFocused ? activeReports : inactiveReports;
        return (
          renderReports
        )
      }
    }
  },
  Options: {
    screen: Options,
    navigationOptions: {
      headerStyle: {
        elevation: 0
      },
      tabBarIcon: (navigation) => {
        const forFocused = navigation.focused;
        const renderMore = forFocused ? activeMore : inactiveMore;
        return (
          renderMore
        )
      }
    },
  },
    tabBarComponent: props => (
      <TabBarComponent {...props} style={{ borderTopColor: '#605F60' }} />
    ),
  

},
  {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      tabStyle: {
        backgroundColor: '#fff',
        marginLeft:50
      },
      style: {
        backgroundColor: '#fff',
        alignContent:'space-between'
      },
      labelStyle: {
        fontSize: 12,
        padding: 2
      }
    }
  }
);

const BottomTabe = createAppContainer(MainNavigator);

export default BottomTabe;

