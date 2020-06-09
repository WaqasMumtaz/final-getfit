import React, { Component } from 'react-native';

/* Add and start up our module. BHealthKit contains two methods that we created in BHealthKit.m
*/
const {
    BHealthKit
} = React.NativeModules;
let auth;
// function to request authorization rights
function requestAuth() {
    console.log('BHealth >>', BHealthKit);
     return new Promise((resolve, reject) => {
        BHealthKit.askForPermissionToReadTypes([BHealthKit.Type.StepCount], (err) => {
            if (err) {
                 console.log('health error >>', err);
                reject(err);
            } else {
                 resolve(true);
                 console.log('StepCount Successfully Run')
            }
        });
     });
}
// function to request data
function requestData() {
    let date = new Date().getTime();
    // console.log('Date >>', date)
    let before = new Date();
    // console.log('Current DAte .>', before);
    before.setDate(before.getDate() - 5);
    // console.log('Before Date time >>>',before.getTime());
    
    /* as native module requests are rendered asynchronously, add and return a promise */
    return new Promise((resolve, reject) => {
        BHealthKit.getConstants([BHealthKit.Type.StepCount]);
        console.log('BHealthKit >>', BHealthKit.getConstants([BHealthKit.Type.StepCount]))
        BHealthKit.getStepsData(before.getTime(), date, (err, data) => {
            if (err) {
                reject(err);
                console.log('health err >>', err);
                // console.log('Error health ios');
            } else {
                console.log('Running health ios ')
                let result = {};
/* Rended the data to display it as we need */
                console.log('StepsData >>', data)
                for (let val in data) {
                    const date = new Date(data[val].start_date);
                    const day = date.getDate();
                    if (!result[day]) {
                        result[day] = {};
                    }
                    result[day]['steps'] = (result[day] && result[day]['steps'] > 0) ?
                        result[day]['steps'] + data[val].value :
                        data[val].value;
                    result[day]['date'] = date;
                    // console.log('Your Result >>', result);
                }
                console.log('Your Result >>', result);
                resolve(Object.values(result));
            }
        });
    });
}
export default () => {
    // return requestAuth()
    if (auth) {
        return requestData();
    } else {
        return requestAuth().then(() => {
            auth = true;
            return requestData();
        });
    }
}