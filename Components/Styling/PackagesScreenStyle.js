import React from 'react';
import {StyleSheet, Dimensions, Platform } from 'react-native';

const styles =StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal:20
    },
    heading:{
        height:40,
        //backgroundColor:'red'
    },
    headingText:{
         color:'#000000',
        //  fontFamily: "MontserratMedium",
    },
    monthlyPlan:{
        backgroundColor:'black',
        marginTop:20,
        padding:15,
        borderRadius:3

    },

    plan:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    monthlyText:{
        color:'#FFFFFF',
        // fontFamily: "MontserratMedium",
    },
    priceText:{
        color: '#FF6200',
        // fontFamily: 'MontserratLight',
        marginTop:10
    },
    detailPrice:{
        color: '#FF6200',
        // fontFamily:'MontserratMedium',
        marginTop:10
    },
    instructionDetail:{
        marginTop:10,
        paddingVertical:7
    },
    instText:{
        color:'#7e7e7e',
        // fontFamily: 'MontserratLight',
    },
    caloriesBtnStyle:{
        flex:4,
        height:40,
        justifyContent:'center',
        backgroundColor: '#FF6200',
        alignItems:'center',
        borderRadius:5
      },
      iconStyle:{
          height:15,
          width:20,
          marginTop:4
      }
})

export default styles;