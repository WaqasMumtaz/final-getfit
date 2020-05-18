import React from 'react';
import { Alert, StyleSheet,Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHight =Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //marginTop:20,
      width:screenWidth,
      height:screenHight
    },
    childContainer:{
      flex:1,
      justifyContent:'flex-start',
     // backgroundColor: '#deb887',
      marginHorizontal:20,
      //marginTop:80
    },
    heading:{
      //flex:1,
      flexDirection:'row',
      marginTop:70
      //backgroundColor:'red'
    },
    headingText: {
      // fontFamily: "MontserratMedium",
      fontSize:17,
      // textAlign: 'center',
      // margin: 10,
      color:'#000000'
    },
    
    forText: {
      // fontFamily: 'MontserratLight',
      fontSize:15
    },
    itemsStyle:{
      //flex:0.3,
      marginVertical:15,
      flexDirection:'row'
    },
    itemsContainer:{
      marginTop:30
    }
  });

  export default styles;