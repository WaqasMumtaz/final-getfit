import React from 'react';
import {Alert,StyleSheet, Text, View,Button,TextInput,Dimensions,TouchableOpacity} from 'react-native';
const screenWidth=Dimensions.get('window').width;
const screenHeight=Dimensions.get('window').height;

const SkipButton=(props)=>{
    return(
        <View style={styles.mainContainer}>
                  <View style={{flex:1}}></View>
                  <TouchableOpacity style={styles.btnStyle} underlayColor='#fff' onPress={()=>{props.gotToSetUpScreen('Setupscreen')}}>
                          <Text style={styles.skipButton}>Skip for now</Text>
                  </TouchableOpacity>
                  <View style={{flex:1}}></View>
        </View>
    )
}
export default SkipButton;

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      flexDirection:'row',
    //  backgroundColor:'#000000'
      
      
    },
    btnStyle:{
        flex:2,
        height:40,
        justifyContent:'center',
        backgroundColor: 'black',
        alignItems:'center',
        borderRadius:5
        
    },
    skipButton:{
        // fontFamily: 'MontserratMedium',
        color:'white'
        //textAlign:'center',
        
    },
})  