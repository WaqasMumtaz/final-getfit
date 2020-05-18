import React, { Component } from 'react-native';

// const Pedometer = React.NativeModules.PedometerAndroid; 
const Pedometer = React.NativeModules; 

export default () => {
    console.log('New Pedometer >>', Pedometer);
/* create promise for request because the data is rendered asynchronously. */
//   return new Promise((resolve, reject) => {
//     Pedometer.getHistory((result) => {
//       try {
//         result = JSON.parse(result);
// // Render the data to get necessary view
//         result = Object.keys(result).map((key) => {
//           let date = new Date(key);
//           date.setHours(0);
//           return {
//             steps: result[key].steps,
//             date: date
//           }
//         });
//         resolve(result);
//       } catch(err) {
//         reject(err);
//       };
//     }, (err) => {
//       reject(err);
//     });
//   });
 }