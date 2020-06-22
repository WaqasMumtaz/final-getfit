import React from 'react';
import { Alert, StyleSheet,Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;

const styles=StyleSheet.create({
container:{
    flex:1,
    backgroundColor:'white',
    marginHorizontal:'4%',
},
headingContainer:{
    height:'8%',
    //backgroundColor:'red',
    flexDirection:'row',
    marginTop:40

},
textStyleOne:{
    color:'black',
    // fontFamily: "MontserratMedium",
    fontSize:20
},
textStyleTwo:{
    color:'#FF6200',
    // fontFamily: "MontserratMedium",
    fontSize:20
},
arrowContainer:{
    height:'10%',
    //backgroundColor:'red',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
},
forImgs:{
    height:15,
    width:15,
},
// start here current macro styling
currentMacroText:{
    color:'#000000',
    marginTop:10,
    
},
inputCaloriesContainer:{
    flex:1,
    width: '100%', 
    height: 140, 
    marginTop: 5, 
    borderRadius: 3, 
    flexDirection: 'row',
    flexWrap:'wrap', 
    backgroundColor: '#e5e5e5'
},
inputCaloriesStyleOne:{
    height:65,
    //borderWidth:2,
    width:'40%',
    borderBottomWidth:1,
    marginLeft:8,
    marginTop:12,
    borderColor:'gray',
    paddingBottom:20

},
inputCaloriesStyleTwo:{
    height:65,
    //borderWidth:2,
    width:'50%',
    marginLeft:12,
    borderBottomWidth:1,
    marginLeft:20,
    marginTop:12,
    borderColor:'gray',
    paddingBottom:20

},
inputCaloriesStyleThree:{
    marginTop:8,
    height:65,
    borderWidth:0,
    width:'45%',
    marginLeft:8,
    paddingBottom:20

},
inputCaloriesStyleFour:{
    marginTop:8,
    height:65,
    borderWidth:0,
    width:'45%',
    marginLeft:8,
    paddingBottom:20

},
// end current macro styling

cardsContainer:{
    flex:1,
    flexDirection:'row',
    marginTop:15,
    // backgroundColor:'green',
    // justifyContent:'flex-end'
    //width:'47%'
    //  flexWrap:'wrap',
   justifyContent:'space-between',
//    paddingHorizontal:5
},
childContainerOne:{
    flex:1,
    //backgroundColor:'green'
    //  paddingLeft:15
},
// childContainerTwo:{
//     flex:1,
//     // backgroundColor:'red',
//     // flexDirection:'row',
//     // justifyContent:'flex-end',
//     paddingLeft:'14%'
// },
cardOne:{
    height:140,
    width:155,
    marginTop:12
    // borderWidth:2,
    // borderColor:'black',
    // borderRadius:3,
    // marginLeft:10
},
cardTwo:{
    // justifyContent:'flex-end',
    height:305,
    width:157,
    borderWidth:2,
    //borderColor:'white',
    borderRadius:5,
    backgroundColor:'#000000',
    // marginLeft:23
},
cardTwoTextStyle:{
    color:'#FFFFFF',
    // fontFamily:"MontserratMedium",
    marginLeft:14,
    marginTop:20
},
cardThree:{
    height:140,
    width:155,
    // borderWidth:2,
    // borderColor:'black',
    // borderRadius:3,
    marginTop:12
},
cardFour:{
    height:293,
    width:157,
    //borderWidth:2,
    //borderColor:'white',
    backgroundColor:'black',
    borderRadius:5,
    marginTop:12,
    // marginLeft:20
},
cardFourTextStyle:{
    color:'#FFFFFF',
    // fontFamily:"MontserratMedium",
    marginLeft:14,
    marginTop:20
},
cardFive:{
    height:140,
    width:155,
    // borderWidth:2,
    // borderColor:'black',
    // borderRadius:3,
    marginTop:12
},
bmiCard:{
    height:140,
    width:157,
    backgroundColor:'#000000',
    // borderWidth:2,
    // borderColor:'black',
    borderRadius:5,
    marginTop:12,
    // marginLeft:15

},
bmiHeading:{
    color:'#FFFFFF',
    fontSize:20,
    // fontFamily:"MontserratExtraBold",
    marginLeft:14,
    marginTop:20
},
goalSetCard:{
    height:140,
    width:152,
    // borderWidth:2,
    // borderColor:'black',
    //borderRadius:3,
    borderTopLeftRadius:3,
    borderTopRightRadius:3
    //marginTop:12,
    //backgroundColor:'black',
    //padding:15
},
imgsStyle:{
    flex: 1,
    height: 130,
    width: 152,
    alignSelf: 'stretch',
    borderRadius:5
    
},
whelSpinerContainer:{
    height:'23%',
    //backgroundColor:'white',
    marginLeft:14,
    marginTop:8
},
resultContainer:{
     flexDirection:'row',
    height:'6%',
    //backgroundColor:'red',
    marginLeft:14,
    marginTop:10
},
detailReport:{
    height:'38%',
    //backgroundColor:'red',
    marginLeft:14
},
arrowIcon:{
    height:23,
    width:23,
    marginTop:22
},
lastArrow:{
    height:23,
    width:23,
    marginTop:22,
    marginLeft:14
},
waitContainer:{
    //height:60,
    width:152,
    // borderWidth:2,
    // borderColor:'black',
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5,
    //marginTop:12,
    backgroundColor:'#000000',
    padding:12
    
},
waitText:{
    color: '#FF6200',
    // fontFamily: 'MontserratMedium',
},
weightLabel:{
    color:'#7e7e7e',
    // fontFamily: 'MontserratLight',
},
bmiText:{
    color: '#FF6200',
    // fontFamily: 'MontserratMedium',
    marginTop:5
},
measurementWeight:{
    color: '#FF6200',
    // fontFamily: 'MontserratMedium',
    marginTop:6
}
})

export default styles; 