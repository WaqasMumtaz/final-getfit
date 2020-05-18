import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
//import console = require('console');
// const screenWidth=Dimensions.get('window').width;
// const screenHeight=Dimensions.get('window').height;

const CaloriesSetupBtn = (props) => {
  //console.log(props)
  return (
    <View style={styles.mainContainer}>
      <View style={{ flex: 1 }}></View>
      <TouchableOpacity
        disabled={props.btnDisable}
        style={props.btnDisable ? props.caloriesBtnStyleDisabled : props.caloriesBtnStyle}
        onPress={props.onPress}>
        <Text
          style={{
            //  fontFamily: "MontserratExtraBold",
           color: '#FFF' }} >
          {props.title}
        </Text>
      </TouchableOpacity>
      <View style={{ flex: 1 }}></View>
    </View>
  )
}

export default CaloriesSetupBtn;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  btnStyle: {
    flex: 3,
    height: 40,
    justifyContent: 'center',
    backgroundColor: '#FF6200',
    alignItems: 'center',
    borderRadius: 5

  }
})