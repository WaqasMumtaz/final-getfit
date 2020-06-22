import React from 'react';
import { Alert, StyleSheet, Text, View, ScrollView, TextInput, Button, Dimensions, Image, TouchableOpacity, Platform } from 'react-native';
import Wheelspiner from '../Progress Wheel/Progress';
import styles from '../Styling/StepCountScreenStyle';
import DatePicker from 'react-native-datepicker';
import HttpUtilsFile from '../Services/HttpUtils';
import AsyncStorage from '@react-native-community/async-storage';
import { BarChart, Grid, YAxis, XAxis } from 'react-native-svg-charts'
import moment from 'moment';
import Linechart from '../chartKit/lineChart'
import {
    DeviceEventEmitter // will emit events that you can listen to
} from 'react-native';
import { NativeAppEventEmitter } from 'react-native';
import { SensorManager } from 'NativeModules';
import GoogleFit, { Scopes } from 'react-native-google-fit'
import { thisExpression } from '@babel/types';
import OverlayLoader from '../Loader/OverlaySpinner';
import {NativeModules} from 'react-native';
const RNHealthKit = NativeModules.RNHealthKit;
import ToggleSwitch from 'toggle-switch-react-native';
// Import the react-native-pedometer module
import Fitness from '@ovalmoney/react-native-fitness';
import Health from '../counter/health.ios';
import HealthAndroid from '../counter/health.android';
import AppleHealthKit from 'rn-apple-healthkit';

const { heightDimension } = Dimensions.get('window');
const date = new Date().getDate();



export default class StepCountScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: "",
            data: '',
            curTime: '',
            filterData: [],
            pedometerData: '',
            currentTime: new Date().toLocaleString(),
            targetTime: '',
            isPedometerAvailable: "checking",
            pastStepCount: 0,
            currentStepCount: 0,
            currntDate: '',
            timer: null,
            matchTimer: null,
            minutes_Counter: '00',
            seconds_Counter: '00',
            hour_Counter: '0',
            startDisable: false,
            achieve: false,
            allDataUser: [],
            userCurrentWeight: '',
            weightNoUnit: '',
            currentCalories: '',
            currentSteps: '',
            secTime: '',
            firstValue: '',
            secondValue: '',
            thirdValue: '',
            goalSteps: '',
            stepTime: '',
            currentUserId: '',
            showButton: false,
            isLoading: false,
            userId: '',
            stepGoalCountData: '',
            showAlert: false,
            timeWatch: '',
            eightToSixteen: false,
            sixteenTo23: false,
            oneToEight: false,
            tapLoad: true,
            stepsPercentage: '',
            onOffToggle: false

        }

    }

    toggelSwitchFun = (isOn) => {
        // console.log('function value >>', isOn);
        this.setState({ onOffToggle: isOn },
            () => {
                if (this.state.onOffToggle != false) {
                    //Use Google Fit Api 
                    const options = {
                        scopes: [
                            Scopes.FITNESS_ACTIVITY_READ_WRITE,
                            Scopes.FITNESS_BODY_READ_WRITE,
                        ],
                    }


                    // GoogleFit.onAuthorize(() => {
                    //     console.log('AUTH SUCCESS');
                    // });

                    // GoogleFit.onAuthorizeFailure(() => {
                    //     console.log('AUTH ERROR');
                    // });

                    GoogleFit.authorize(options)
                        .then((res) => {
                            // console.log('authorized google fit >>>', res)
                            if (res.success) {
                                // console.log('Authorization success and run if condition ')
                                const option = {
                                    startDate: moment(new Date()).startOf('day').toISOString(), //ISO Time String
                                    endDate: moment(new Date()).endOf('day').toISOString()
                                }
                                // let dayStart = moment(new Date()).startOf('day').toISOString(); //ISO Time String
                                // let dayEnd = moment(new Date()).endOf('day').toISOString();//ISO Time String
                                // console.log('Day Start >>', dayStart);
                                // console.log('Day End >>', dayEnd);

                                // console.log('GoogleFit >>', GoogleFit);
                                GoogleFit.observeSteps((res)=>{
                                    // console.log('Observe History Function run')
                                    // console.log('ObserveHistory >>', res);
                                })

                                GoogleFit.getDailyStepCountSamples(option).then((res)=>{
                                    // console.log('Daily steps >>> ', res);
                                    res && res.map((item, index)=>{
                                        item.steps.map((item,i)=>{
                                        // console.log('Steps Value >>', item.value);
                                        this.setState({ pedometerData: item.value })
                                        });
                                    })
                                })                                    
                                        
                                      

                            }
                            //alert(`${res.message}`)

                        })
                        .catch((err) => {
                            console.log('err >>> ', err)
                        })




                    // if (Platform.OS === 'android') {
                    //     const options = {
                    //         scopes: [
                    //             Scopes.FITNESS_ACTIVITY_READ_WRITE,
                    //             Scopes.FITNESS_BODY_READ_WRITE,
                    //         ],
                    //     }
                    //     GoogleFit.authorize(options)
                    //         .then((res) => {
                    //             console.log('authorized >>>', res)
                    //             //alert(`${res.message}`)
                    //             GoogleFit.observeSteps((res) => {
                    //                 // console.log('google fit steps', res)
                    //                 // const dataObj = {
                    //                 //     pedometerData: res,
                    //                 // }
                    //                 params.pedometerFun(res.steps)
                    //                 this.setState({ pedometerData: res.steps }, () => {
                    //                     if (res.steps > Number(1)) {
                    //                         //this.countStepTime()
                    //                         if (this.state.eightToSixteen == true) {
                    //                             this.setState({
                    //                                 firstValue: res.steps
                    //                             })
                    //                         }
                    //                         else if (this.state.sixteenTo23 == true) {
                    //                             this.setState({
                    //                                 secondValue: res.steps
                    //                             })
                    //                         }
                    //                         else if (this.state.oneToEight == true) {
                    //                             this.setState({
                    //                                 thirdValue: res.steps
                    //                             })

                    //                         }
                    //                         const multiplySteps = res.steps / Number(this.state.goalSteps);
                    //                         //console.log('multiply >>',multiplySteps);
                    //                         const divideSteps = multiplySteps * 100;
                    //                         //console.log('divided >>',divideSteps )
                    //                         const roundedValue = Math.round(divideSteps);
                    //                         //console.log('percentage steps >>',roundedValue)
                    //                         this.setState({
                    //                             stepsPercentage: roundedValue
                    //                         })


                    //                     }
                    //                     if (res.steps != 0 && Number(this.state.goalSteps) != 0) {
                    //                         if (res.steps == Number(this.state.goalSteps)) {
                    //                             console.log('steps match ')

                    //                         }
                    //                     }


                    //                 })
                    //             })

                    //         })

                    //         .catch((err) => {
                    //             console.log('err >>> ', err)
                    //         })


                    // }
                    // else if (Platform.OS === 'ios') {
                    //     const options = {
                    //         scopes: [
                    //             Scopes.FITNESS_ACTIVITY_READ_WRITE,
                    //             Scopes.FITNESS_BODY_READ_WRITE,
                    //         ],
                    //     }

                    //     rnHealthKit.authorize(options)
                    //         .then((res) => {
                    //             console.log('authorized >>>', res)
                    //             rnHealthKit.observeSteps((res) => {
                    //                 console.log('google fit api >>', res)
                    //                 this.setState({ pedometerData: res.steps })
                    //             })


                    //         })
                    //         .catch((err) => {
                    //             console.log('err >>> ', err)
                    //         })

                    // }
                }
            })
    }

    // googleFitAuthFun=()=>{
    //     const options = {
    //         scopes: [
    //           Scopes.FITNESS_ACTIVITY_READ_WRITE,
    //           Scopes.FITNESS_BODY_READ_WRITE,
    //         ],
    //       }
    //       GoogleFit.authorize(options)
    //         .then(authResult => {
    //           if (authResult.success) {
    //             // dispatch("AUTH_SUCCESS");
    //             console.log( authResult.success)
    //           } else {
    //             //dispatch("AUTH_DENIED", authResult.message);
    //             console.log(authResult.message)
    //           }
    //         })
    //         .catch((err) => {
    //           //dispatch("AUTH_ERROR");
    //           console.log(err)

    //         })
    // }

    // getGoalStepData = () => {
    //     //console.log('run function get goal steps')
    //     const { navigation } = this.props;
    //     this.focusListener = navigation.addListener('didFocus', () => {
    //         //    this.getData()
    //         AsyncStorage.getItem('goalSteps').then((value) => {
    //             if (value) {
    //                 const goalStepsValue = JSON.parse(value);
    //                 console.log('user steps >>', goalStepsValue);
    //                 this.setState({
    //                     goalSteps: goalStepsValue
    //                 })
    //             }
    //         })
    //     });

    // }
    async componentWillMount() {
        await this.getData()
        this.dateFilter()
        //this.getGoalStepData();
        const paramsData = this.props.navigation.state.params;
        // console.log('params data >>>', paramsData)
        this.setState({
            goalSteps: paramsData.goalSteps,
            pedometerData: paramsData.pedometerData
        })
        //this.googleFitAuthFun()
        AsyncStorage.getItem('pedometerData').then((value) => {
            if (value) {
                //const setValue = JSON.parse(value);
                // console.log('local storage pedometer >>>', value)
                this.setState({
                    pedometerData: value
                })
            }
        })
        this.matchTime();
        this._startPedometer();
    }

    checkFunc(data) {
        //console.log('data will update >>', data);
        this.setState({
            abc: data
        })
    }

    componentDidUpdate(prevProps, prevState) {
        const { goalSteps } = this.state;
        const goalStep = goalSteps;
        //console.log('number form goal >>', Number(goalSteps))
        if (prevState.pedometerData == Number(goalStep)) {
            //console.log('Condition successfully matched ');
            Alert.alert('Acheive Goal');
            this.sendDataPedometer();
        }

    }


    //get data from database
    getData = () => {
        const date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const hours = new Date().getHours(); //Current Hours
        const min = new Date().getMinutes(); //Current Minutes
        const sec = new Date().getSeconds(); //Current Seconds
        const currentTime = hours + ':' + min + ':' + sec;
        //console.log('current time >>>', currentTime)
        if (month == 1 || month == 2 || month == 3 || month == 4 || month == 5 || month == 6 || month == 7 || month == 8 || month == 9) {
            month = `0${month}`
        }
        //let dataUser = await HttpUtils.get('getallexerciselog')
        //try {
        AsyncStorage.getItem('currentUser').then((value) => {
            if (value) {
                let dataUser = JSON.parse(value);
                // console.log(dataUser)
                this.setState({
                    currentUserId: dataUser._id
                })
            }


        })





        // }
        // catch (error) {
        //     console.log(error)
        // }
        this.setState({
            date: date + '-' + month + '-' + year,
            curTime: currentTime
            //data: dataUser.content
        })
    }

   
    //filtration with date
    dateFilter = (e) => {
        const { data, date } = this.state;
        let dataArr = [];
        for (var i in data) {
            let dataFilter = data[i];
            if (e == undefined) {
                if (dataFilter.date == date) {
                    dataArr = [...dataArr, dataFilter]
                    this.setState({
                        filterData: dataArr
                    })
                }
            }
            else if (e != undefined) {
                if (dataFilter.date == e) {
                    dataArr = [...dataArr, dataFilter]
                    this.setState({
                        filterData: dataArr,
                        date: e
                    })
                }
            }
        }
    }

    sendDataPedometer = async () => {
        const currentDayOfWeek = new Date().getDay() + 1;
        const currentDate = new Date().getDate();
        let currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        // console.log('current week >>', currentDayOfWeek);
        // console.log('currentDate >>', currentDate);
        // console.log('currentMont >>', currentMonth);
        // console.log('currentYear >>', currentYear);
        const dataPost = {
            userId: this.state.currentUserId,
            time: this.state.curTime,
            date: currentDate,
            stepCount: this.state.pedometerData,
            dailGoal: this.state.goalSteps,
            dayOfWeek: currentDayOfWeek,
            month: currentMonth,
            year: currentYear
        }
        try {
            let postedData = await HttpUtilsFile.post('pedometer', dataPost)
            // console.log('posted data >>>', postedData)
            if (postedData.code == 200) {
                // console.log('data sumbit')
            }
        }
        catch (err) {
            console.log(err)
        }
    }


    _startPedometer() {
        const { params } = this.props.navigation.state;
        // console.log('Pedometer Function function successfully Run ')
        // this.setState({ tapLoad: false,})
        //this.matchTime()
        this.updateTime()
        //console.log('all data of user >>>',this.state.allDataUser)
        this.countStepTime()

        //console.log('watch time >>', this.state.timeWatch)
        // start tracking from current time


        //Sensor Manager For Stepcount

if(Platform.OS === 'android'){
    // HealthAndroid()
    SensorManager.startStepCounter(1000);
        DeviceEventEmitter.addListener('StepCounter', (data) => {
            console.log('sensor manager data -->>', data)
            params.pedometerFun(data.steps)
            this.setState({ pedometerData: data.steps }, () => {
                if (data.steps > Number(1)) {
                    //this.countStepTime()
                    if (this.state.eightToSixteen == true) {
                        this.setState({
                            firstValue: data.steps
                        })
                    }
                    else if (this.state.sixteenTo23 == true) {
                        this.setState({
                            secondValue: data.steps
                        })
                    }
                    else if (this.state.oneToEight == true) {
                        this.setState({
                            thirdValue: data.steps
                        })

                    }
                    const multiplySteps = data.steps / Number(this.state.goalSteps);
                    //console.log('multiply >>',multiplySteps);
                    const divideSteps = multiplySteps * 100;
                    //console.log('divided >>',divideSteps )
                    const roundedValue = Math.round(divideSteps);
                    //console.log('percentage steps >>',roundedValue)
                    this.setState({
                        stepsPercentage: roundedValue
                    })

                }
                if (data.steps != 0 && Number(this.state.goalSteps) != 0) {
                    if (data.steps == Number(this.state.goalSteps)) {
                        console.log('steps match ')
                        Alert.alert('Congrates Your Steps Match')
                        // this.setState({
                        //     showButton: true
                        // })
                    }
                }


            })
            // console.log('user steps -->', data.steps)


        });

}
        
        if (Platform.OS === 'ios') {
            console.log('IOS Stepcounter Running Successfully ')
             // Health()
            // let workoutData = [];
            const todayDate = moment().toDate();
            let d = new Date();
            let options1 = {
                    date: todayDate.toISOString()
             };
            console.log('options1 >>', options1);
            //  console.log('Options >>', options);
            //   console.log('AppleHealthKit >>', AppleHealthKit);
              let options = {
                permissions: {
                    read: ["Height", "Weight", "StepCount", "DateOfBirth", "BodyMassIndex"],
                    write: ["Weight", "StepCount", "BodyMassIndex","Steps"]
                },
            };   

            // HealthKit Init code 
            AppleHealthKit.initHealthKit(options, (err, results) => {
                if (err) {
                    console.log("error initializing Healthkit: ", err);
                    return;
                }

                //  console.log('HealthKit Result >>', results);
                //  AppleHealthKit.getStepCount(options1, (err, results) => {
                //     if (err) {
                //         return;
                //     }
                //     console.log('Steps >>',results)
                // });


                AppleHealthKit.getStepCount(options1, (err, results) => {
                    if (err) {
                        console.log('Steps Error >>', err);
                        return;
                    }
                    else{
                        // console.log('Steps Result >>',results)
                        console.log('sensor manager data -->>', results)
                        params.pedometerFun(results.value)
                        this.setState({ pedometerData: results.value }, () => {
                            if (results.value > Number(1)) {
                                //this.countStepTime()
                                if (this.state.eightToSixteen == true) {
                                    this.setState({
                                        firstValue: results.value
                                    })
                                }
                                else if (this.state.sixteenTo23 == true) {
                                    this.setState({
                                        secondValue: results.value
                                    })
                                }
                                else if (this.state.oneToEight == true) {
                                    this.setState({
                                        thirdValue: results.value
                                    })
            
                                }
                                const multiplySteps = results.value / Number(this.state.goalSteps);
                                //console.log('multiply >>',multiplySteps);
                                const divideSteps = multiplySteps * 100;
                                //console.log('divided >>',divideSteps )
                                const roundedValue = Math.round(divideSteps);
                                //console.log('percentage steps >>',roundedValue)
                                this.setState({
                                    stepsPercentage: roundedValue
                                })
            
                            }
                            if (results.value != 0 && Number(this.state.goalSteps) != 0) {
                                if (results.value == Number(this.state.goalSteps)) {
                                    console.log('steps match ')
                                    Alert.alert('Congrates Your Steps Match')
                                    // this.setState({
                                    //     showButton: true
                                    // })
                                }
                            }
            
            
                        })
    
                    }
                });
    

            //    }
                
            }); 
            
                     
    }


    }


    matchTime = () => {
        let matchTimer = setInterval(() => {
            const hours = new Date().getHours(); //Current Hours
            const min = new Date().getMinutes(); //Current Minutes
            const sec = new Date().getSeconds(); //Current Seconds
            const currentTime = hours + ':' + min + ':' + sec;
            //console.log('current time >>>', currentTime)
            const resetTime = '0' + ':' + '0' + ':' + '0';
            const eightTime = '8' + ':' + '0' + ':' + '0';
            const time16 = '16' + ':' + '0' + ':' + '0';
            const time23 = '23' + ':' + '59' + ':' + '59';
            const time1 = '1' + ':' + '0' + ':' + '0'
            //console.log('wanted time >>>', resetTime)

            if (currentTime == resetTime) {
                // console.log('Success!! condition match');

                this.setState({
                    pedometerData: '',
                    timer: null,
                    hour_Counter: '0',
                    minutes_Counter: '00',
                    seconds_Counter: '00',
                    startDisable: false,
                    matchTimer: null,
                    timer: clearInterval(this.state.timer),
                    matchTimer: clearInterval(this.state.matchTimer)
                })


            }
            else if (currentTime < time16 || currentTime >= eightTime) {
                // console.log('8 to 16 time condition')
                this.setState({
                    eightToSixteen: true
                })
            }
            
            else if (currentTime < time23 || currentTime >= time16) {
                // console.log('16 to 23 Condition Successfully run');
                this.setState({
                    sixteenTo23: true
                })
            }
            
            else if ((currentTime == time1 || currentTime < eightTime)) {
                // console.log('1 to 8 Condition Successfully run');
                this.setState({
                    oneToEight: true
                })
            }
           
        }, 1000)
        this.setState({ matchTimer })
    }

    updateTime = () => {
        const hours = new Date().getHours(); //Current Hours
        const min = new Date().getMinutes(); //Current Minutes
        const sec = new Date().getSeconds(); //Current Seconds
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        // console.log('current date >>>', today)
        const currentTime = hours + ':' + min + ':' + sec;
        // console.log('current time >>>', currentTime)
        this.setState({ currntDate: today })
        this.setState({ curTime: currentTime })


    }


    countStepTime = () => {
        let timer = setInterval(() => {

            let num = (Number(this.state.seconds_Counter) + 1).toString(),
                count = this.state.minutes_Counter,
                hour = this.state.hour_Counter;

            if (Number(this.state.seconds_Counter) == 59) {
                count = (Number(this.state.minutes_Counter) + 1).toString();
                // this.updateCalories(count)
                num = '00';
            }
            if (Number(this.state.minutes_Counter) == 59) {
                hour = (Number(this.state.hour_Counter) + 1).toString();
                count = '00';
            }
            this.setState({
                hour_Counter: hour.length == 1 ? hour : hour,
                minutes_Counter: count.length == 1 ? '0' + count : count,
                seconds_Counter: num.length == 1 ? '0' + num : num,
                //stepTime:hour_Counter + ': ' + minutes_Counter + ': ' + seconds_Counter
            });
        }, 1000);
        this.setState({ timer });

        this.setState({ startDisable: true })
    }

    componentWillUnmount() {
        clearInterval(this.state.matchTimer);
    }



    updateCalories = (minute) => {
        //console.log('updated state >>>', minute)
        const { params } = this.props.navigation.state;
        const latestWeight = params.currentWeight;
        const spaceIndex = latestWeight.indexOf(' ');
        const weight = latestWeight.slice(0 , spaceIndex);
        let walkingTime = Number(minute)
        const userWeight = Number(weight)
        // console.log('number weight >>>', userWeight)
        const formula = Math.floor(((2.3 * userWeight) * (walkingTime / 60)))
        // console.log('Calculated Calories >>>', formula)
        this.setState({
            currentCalories: formula
        })
    }

    getDataForPedometer = async () => {
        AsyncStorage.getItem("currentUser").then(value => {
            let dataFromLocalStorage = JSON.parse(value);
            let userId = dataFromLocalStorage._id;
            this.setState({
                userId: userId
            })
        });
        const userObj = {
            userId: this.state.userId
        }
        let userPedometerData = await HttpUtilsFile.post('getpedometerbyid', userObj);
        console.log('userId >>', userPedometerData);
        if (userPedometerData.code == 200) {
            const userContent = userPedometerData.content;
            for (let i in userContent) {
                //console.log(userContent[i])
                const userGoalSteps = userContent[i].dailGoal;
                //console.log(userGoalSteps)
                this.setState({
                    stepGoalCountData: userGoalSteps
                })
            }

        }


    }
    saveGoalSteps = (e) => {
        //const { goalSteps }=this.state;
        console.log('goal steps >>', e)
        AsyncStorage.setItem('goalSteps', JSON.stringify(e));
    }
    render() {
        const {
            date,
            filterData,
            pedometerData,
            currentTime,
            targetTime,
            minutes_Counter,
            seconds_Counter,
            hour_Counter,
            achieve,
            userCurrentWeight,
            currentCalories,
            currentSteps,
            secTime,
            firstValue,
            secondValue,
            thirdValue,
            goalSteps,
            curTime,
            stepGoalCountData,
            tapLoad,
            stepsPercentage,
            onOffToggle

            //currentUserId
        } = this.state;
        const caloriesBurn = Number(pedometerData) * Number(0.045);
        const roundedCalories = Math.round(caloriesBurn)
        
        const timeData = Number(firstValue);
        //console.log('Time Data >>>',timeData)
        const forSecTime = Number(secondValue);
        const forThirdTime = Number(thirdValue)
        const data1 = [0, 0, timeData, 0, 0,];
        const data2 = [0, 0, forSecTime, 0, 0,];
        const data3 = [0, 0, forThirdTime, 0, 0,];
        // const data2 = [0, 0, currentSteps, 0, 0,]
        // const data3 = [0, 0, currentSteps, 0, 0,]
        return (
            <ScrollView style={{ backgroundColor: '#FFFFFF', height: heightDimension }} contentContainerStyle={{ flexGrow: 1 }}  >

                <View style={styles.mainContainer}>

                    <View style={styles.childContainer}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingStyle}>Today's Step Count</Text>
                        </View>
                        <View style={styles.dateContainer}>
                            <Text>{date}</Text>
                        </View>


                        {/* <View style={styles.toggelSwitch}>
                            <View>
                                <Text style={{
                                    color: '#000',
                                    // fontFamily: 'MontserratLight',
                                }}>If pedometer not work open API</Text>
                            </View>
                            <View>
                                <ToggleSwitch
                                    isOn={onOffToggle}
                                    onColor="#FF6200"
                                    offColor="#a6a6a6"
                                    size="medium"
                                    onToggle={isOn => this.toggelSwitchFun(isOn)}
                                />
                            </View>

                        </View> */}

                        <TouchableOpacity
                            style={styles.stepCountContainer}
                            activeOpacity={0.7}
                            // onPress={this._startPedometer.bind(this)}
                            //onPress={this.countStepTime}
                            disabled={this.state.startDisable}
                        >
                            <View style={styles.progressWhelContainer} >
                                <Wheelspiner
                                    size={90}
                                    width={12}
                                    color={'#FF6200'}
                                    progress={stepsPercentage == '' ? 0 : stepsPercentage}
                                    backgroundColor={'gray'}
                                    animateFromValue={0}
                                    fullColor={'#FF6200'}

                                />
                                {/* {tapLoad ? <Text style={styles.tapLoadText}>Tap to load</Text> : null} */}
                            </View>
                            <View style={styles.stepCountData}>
                                <View style={{ flexDirection: 'row', marginRight: 50 }}>
                                    <Text style={{
                                        color: '#FF6200',
                                        fontSize: 11
                                    }}>{pedometerData == '' ? 0 : pedometerData}</Text>
                                    <Text style={{
                                        color: '#a6a6a6',
                                        // fontFamily: 'MontserratLight',
                                        fontSize: 11
                                    }}> / {goalSteps == '' ? 0 : goalSteps}</Text>
                                </View>
                                <Text style={{
                                    color: '#a6a6a6',

                                    fontSize: 11,
                                    marginTop: 4,
                                    marginRight: 50
                                }}>Steps</Text>
                                <Text style={{ borderBottomWidth: 0.5, borderColor: '#FFFFFF', opacity: 0.3, marginRight: 15 }}></Text>
                                <Text style={{ color: '#a6a6a6', fontSize: 11, marginTop: 10, marginRight: 50 }}>{hour_Counter}h  {minutes_Counter}m</Text>
                                <Text style={{ color: '#a6a6a6', fontSize: 11, marginTop: 4, marginRight: 50 }}>
                                    {this.state.startDisable == false ? 'Tracker Unactivate' : 'Tracker Activate'}
                                </Text>
                                <Text style={{ marginTop: 4, borderBottomWidth: 0.5, borderColor: '#FFFFFF', opacity: 0.3, marginRight: 15 }}></Text>
                                <Text style={{ color: '#a6a6a6', fontSize: 11, marginTop: 5, marginRight: 50 }}>{roundedCalories}</Text>
                                <Text style={{ color: '#a6a6a6', fontSize: 11, marginTop: 4, marginRight: 30, marginBottom: 5, paddingBottom: 5 }}>calories</Text>
                            </View>

                        </TouchableOpacity>

                        {/* <View style={styles.graphContainer}>
                        <Text style={{ color: 'white' }}>Graph Stepcount</Text>
                    </View> */}
                        {/* <Linechart/> */}
                        <View style={{ marginTop: 12 }}>
                            <Text
                            // style={{fontSize:12,}}
                            >
                                Graph shows are taking place according to the time
                            </Text>
                        </View>
                        <View style={{
                            borderWidth: 2,
                            borderColor: '#a6a6a6', height: 220
                            , marginHorizontal: 30, marginTop: 30,
                            backgroundColor: '#a6a6a6'
                        }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ height: 220, width: 100, padding: 20 }}>
                                    <BarChart
                                        style={{ flex: 1 }}
                                        data={data1}
                                        gridMin={0}
                                        svg={{ fill: '#FF6200' }}
                                        spacingInner={0.3}
                                        gridMax={10000}
                                    />

                                </View>
                                <View style={{ height: 220, width: 100, padding: 20 }}>
                                    <BarChart
                                        style={{ flex: 1 }}
                                        data={data2}
                                        gridMin={0}
                                        svg={{ fill: '#FF6200' }}
                                        spacingInner={0.3}
                                        gridMax={10000}
                                    />
                                </View>
                                <View style={{ height: 220, width: 100, padding: 20 }}>
                                    <BarChart
                                        style={{ flex: 1 }}
                                        data={data3}
                                        gridMin={0}
                                        svg={{ fill: '#FF6200' }}
                                        spacingInner={0.3}
                                        gridMax={10000}
                                    />
                                </View>


                            </View>
                            <View style={{ backgroundColor: 'black', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#e5e5e5', }}>08:00</Text>
                                <Text style={{ color: '#e5e5e5', }}>16:00</Text>
                                <Text style={{ color: '#e5e5e5', }}>01:00</Text>
                            </View>


                        </View>
                        {
                            this.state.isLoading ?
                                <OverlayLoader /> :
                                null
                        }
                        {
                            this.state.showAlert ?
                                alert('Achieve Steps')
                                :
                                null
                        }
                        <View style={{ flex: 1, width: '100%', height: 30, marginTop: 80 }}>
                            {
                                this.state.showButton ?
                                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                        <TouchableOpacity style={{
                                            width: 100, height: 35, backgroundColor: '#FF6200',
                                            borderRadius: 3, justifyContent: 'center'

                                        }} onPress={this.sendDataPedometer}>
                                            <Text style={{ color: 'white', alignSelf: 'center' }}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                    : null
                            }

                        </View>

                    </View>

                </View>
                <View style={{ marginBottom: 20 }}></View>

            </ScrollView>
        )
    }
}