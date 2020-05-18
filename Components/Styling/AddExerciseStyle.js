import React from 'react';
import { Alert, StyleSheet,Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;

const styles =StyleSheet.create({
     mainContainer:{
         flex:1,
         //backgroundColor:'red'
         width:screenWidth
     },
     childContainer:{
         flex:1,
         marginHorizontal:20
     },
     headingContainer:{
         flex:0.5,
         height:'6%',
         //backgroundColor:'red'
     },
     headingStyle:{
         fontSize:20,
         color:'black',
        //  fontFamily: "MontserratMedium",
     },
     arrowContainer:{
        flex:0.2,
        //backgroundColor:'red',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    forImgs:{
        height:15,
        width:15,
    },
    bodyContainer:{
        flex:0.2,
        //height:'7%',
        marginTop:18,
        //backgroundColor:'gray',
        flexDirection:'row',
        
    },
    
    inputFieldStyle:{
        flex:1,
        //borderWidth:2,
        height:40,
        // borderColor:'black',
        paddingLeft:16,
         backgroundColor:'gray',
        opacity:0.2
    },
    listsContainer:{
        flex:3,
        backgroundColor:'#e5e5e5',
        justifyContent:'space-evenly',
        //opacity:0.2,
         marginTop:20
    },
    listsTextStyle:{
        // fontFamily:'MontserratLight',
        color:'#4f4f4f',
        marginVertical:10,
        marginLeft:16
    },
    cardContainer:{
        flex:1.5,
        flexDirection:'row'
    },
    headerIconContainer:{
        marginRight:25,
        marginBottom:8
    },
    headerIcon:{
        height:18,
        width:18
    },
    customInput:{
     flexDirection:'row',
     justifyContent:'space-between',

    },
    customInputs:{
     flexDirection:'row',
     justifyContent:'space-between',
     marginTop:22
    },
    customInputStyle:{
        height:40,
        flex:1,
        backgroundColor:'white',
        marginRight:10
    },
    customInputStyle2:{
        height:40,
        flex:1,
        backgroundColor:'white',
        marginRight:12
    },
    customInputStyle3:{
        height:40,
        flex:1,
        backgroundColor:'white',
        marginLeft:12
    },
    iconSize:{
        width:25,
        height:25,
        borderRadius:25/2
        // marginRight:8
    },
    
})

export default styles;