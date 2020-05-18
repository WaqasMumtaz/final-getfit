import React from 'react';
import { Alert, Text, View, ScrollView, Dimensions, Image, TouchableOpacity, BackHandler } from 'react-native';
import Wheelspiner from '../Progress Wheel/Progress';
import styles from '../Styling/HomeStyle';
import HttpUtils from '../Services/HttpUtils';
import AsyncStorage from '@react-native-community/async-storage';
// import firebase from 'react-native-firebase';
import HandleBack from '../buttons/backBtn';
//import { StackActions, NavigationActions } from 'react-navigation';

const { height } = Dimensions.get('window');
let userId = {};

class Homescreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homeScreen: false,
      todayData: '',
      yestertdayData: '',
      pedometerData: '',
      userId: '',
      goalSteps: '',
      userAllData: [],
      userCurrentWeight: '',
      measurementsWeight:'',
      excerciseArry: [],
      bmiData: [],
      currentUserBMI: '',
      fitnessGoal: '',
      stepsPercentage: '',
      macroArray: [],
      showCurrentMacro: false,
      currentCalories: '',
      currentCarbohy: '',
      currentProteins: '',
      currentMass: ''
    }
    //console.log('constructor method run here')
  }


  componentWillMount() {
    // console.log('end')    
    this.getTodayOrYesterdayExcersice()
    // this.getTodayOrYesterdayExcersice();
    this.getDaysData();
    this.pedometerFun();

    //getting user id from local storage
    AsyncStorage.getItem("currentUser").then(value => {
      if (value) {
        let dataFromLocalStorage = JSON.parse(value);

        //console.log(dataFromLocalStorage, 'value')

        // dataFromLocalStorage.status = 'Online'
        // console.log(dataFromLocalStorage ,'dataFromLocalStorage')
        // db.ref(`users/${dataUser._id}`).update(userDataForOnlineOff)
        //console.log(dataFromLocalStorage ,'value')

        this.setState({
          userId: dataFromLocalStorage._id,

        })
      }
    });



  }


  getTodayOrYesterdayExcersice = async () => {
    //console.log('getTodayOrYesterdayExcersice')
    const { userId } = this.state;
    //get all excersice log data
    //let dataUser = await HttpUtils.get('getallexerciselog');
    await AsyncStorage.getItem('logExercises').then((value) => {
      let dataFromLocalStorage = JSON.parse(value);
      //console.log('log exercises data >>', dataFromLocalStorage);
      this.setState({
        excerciseArry: dataFromLocalStorage
      })
    })
    //console.log('exercis data >>', this.state.excerciseArry);
    let data = this.state.excerciseArry;
    //let data = dataUser.content;
    //get current date 
    const currentDate = new Date().getDate();
    let currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    if (currentMonth == 1 || currentMonth == 2 || currentMonth == 3 || currentMonth == 4 || currentMonth == 5 || currentMonth == 6 || currentMonth == 7 || currentMonth == 8 || currentMonth == 9) {
      currentMonth = `0${currentMonth}`
    }
    //looping with data
    for (var i in data) {
      let dataApi = data[i];
      // console.log('exer array ',dataApi)
      //   //check user id with api data and get current user data
      if (dataApi.userId == userId) {
        //get today & yesterday of excersice from database 
        let currMonth = Number(currentMonth)
        let checkDate = Number(dataApi.dayOfMonth) - currentDate;
        let checkMonth = Number(dataApi.month) - currMonth;
        let checkYear = Number(dataApi.year) - currentYear;
        if (checkDate == 0 && checkMonth == 0 && checkYear == 0) {
          //console.log('today excersice')
          this.setState({
            todayData: dataApi
          })
        }
        else if (checkDate == -1 && checkMonth == 0 && checkYear == 0) {
          //console.log('yestertdayData excersice')
          this.setState({
            yestertdayData: dataApi
          })
        }
      }
    }

  }

  getUserData = async () => {
    this.setState({
      homeScreen: true
    })

    let obj = {
      userId: this.state.userId
    }
    //console.log(obj)
    let retrieveData = await HttpUtils.post('getgoal', obj);
    // console.log('retrieve data >>>', retrieveData)
    if (retrieveData.code == 200) {
      this.setState({
        userAllData: retrieveData.content
      }, () => {
        //console.log(this.state.userAllData)
        const userData = this.state.userAllData;
        for (var i in userData) {
          //console.log(userData[i].currentWeight)
          this.setState({
            userCurrentWeight: userData[i].currentWeight,
            goalSteps: userData[i].goalSteps,
          })
        }
      })
    }
    const userBmiApi = await HttpUtils.post('getbmi', obj);
    //console.log('current user bmi >>>', userBmiApi);
    if (userBmiApi.code == 200) {
      this.setState({
        bmiData: userBmiApi.content
      }, () => {
        //console.log(this.state.userAllData)
        const userBmiData = this.state.bmiData;
        for (var i in userBmiData) {
          //console.log(userData[i].currentWeight)
          this.setState({
            currentUserBMI: userBmiData[i].bmi
          })
        }
      })
    }
    let dataUser = await HttpUtils.get('getweightlog');
    // console.log('dataUser getWeightLog >>', dataUser);
    // console.log('Current User Id >>', this.state.userId);
    let code = dataUser.code;
    if (code == 200) {
      let dataArr = [];
      //console.log(dataUser.content)
      let checkId = dataUser.content;
      // console.log('User Content >>', checkId);
      for (const i in checkId) {
        //console.log(checkId[i])
        let data = checkId[i];
        // console.log('User DAta >>', data);
        // console.log('Match User >>',data.userId == this.state.userId)
        if (data.userId == this.state.userId) {
          // console.log('Current User Successfully ');
          // console.log('Current User Weight >>',data.weight)
          // dataArr = [...dataArr, data]
          this.setState({
            measurementsWeight: data.weight
          })
        }
      }

    }
    else {
      console.log('User Not Login')
    }
  }

  // backScreen=()=>{
  //   //console.log('press back button');

  // }

  pedometerFun = (data) => {
    //console.log('data from child component >>>', data)
    if (data != undefined) {
      const multiplySteps = data / Number(this.state.goalSteps);
      //console.log('multiply >>',multiplySteps);
      const divideSteps = multiplySteps * 100;
      //console.log('divided >>',divideSteps )
      const roundedValue = Math.round(divideSteps);
      //console.log('percentage steps >>',roundedValue)
      this.setState({
        stepsPercentage: roundedValue,
        pedometerData: data
      })

      // this.setState({
      //   pedometerData: data,
      // })
    }

  }
  changeRout(e) {
    const { userCurrentWeight, goalSteps, fitnessGoal } = this.state;
    const { navigate } = this.props.navigation;
    if (e == 'logexercise') {
      navigate('Exerciselog')
    }
    else if (e == 'stepcount') {
      if (userCurrentWeight != '' && goalSteps != '') {
        navigate('StepCountScreen', {
          'pedometerFun': (data) => this.pedometerFun(data),
          currentWeight: this.state.userCurrentWeight,
          goalSteps: this.state.goalSteps,
          pedometerData: this.state.pedometerData
        })
      }
      else {
        Alert.alert('Please set goal')
      }

    }
    else if (e == 'Macrocalculator') {
      navigate('Macrocalculator')
    }
    else if (e == 'CalculateBMI') {
      navigate('BMICalculator')

    }

  }



  getDaysData = () => {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', (res) => {
      // BackHandler.addEventListener("hardwareBackPress", this.onBack)
      // console.log('Running Successfully Add Listener Function')
      this.getUserData();
      this.macroGet();
      this.getTodayOrYesterdayExcersice();
      this.setState({
        homeScreen: true
      })
    });
  }
  // componentDidMount(){
  //        BackHandler.addEventListener('hardwareBackPress',this.handleBackButton);
  //        this.willBlur = this.props.navigation.addListener("willBlur", payload =>
  //        BackHandler.removeEventListener("hardwareBackPress", this.onBack),
  //      );
  // }
  // componentWillUnmount() {
  //   this.didFocus.remove();
  //   this.willBlur.remove();
  //   BackHandler.removeEventListener("hardwareBackPress", this.onBack);
  // }

  // Get specific user current macros
  macroGet = async () => {
    const { userId } = this.state;
    let userObj = {
      userId: userId
    }
    const specificMacro = await HttpUtils.post('getmacros', userObj);
    if (specificMacro.code == 200) {
      this.setState({
        macroArray: specificMacro.content
      }, () => {
        const userMacroData = this.state.macroArray;
        for (var i in userMacroData) {
          this.setState({
            showCurrentMacro: true,
            currentCalories: userMacroData[i].calculteCalries,
            currentCarbohy: userMacroData[i].carbohydrates,
            currentProteins: userMacroData[i].proteins,
            currentMass: userMacroData[i].fatMass
          })
        }
      })
    }
  }

  handleBackButton = async () => {
    // console.log('pressed back button')
    const { navigate } = this.props.navigation;
    const getData = await AsyncStorage.getItem("currentUser");
    // const parsForm = JSON.parse(getData)
    // console.log('current user data >>>',parsForm)
    if (getData) {
      navigate('Home')
    }
    else {
      navigate('Login')
    }

  }

  
  onBack = () => {
    if (this.state.homeScreen) {
      return true;
    }
    return false;
  };


  render() {
    const { todayData, yestertdayData, pedometerData,
      currentCalories, currentCarbohy, currentProteins,
      currentMass, showCurrentMacro,
      goalSteps, userCurrentWeight,measurementsWeight, currentUserBMI,
      fitnessGoal, stepsPercentage } = this.state;
    const { navigate } = this.props.navigation;
    console.log('Current User Id >>', this.state.userId);
    //console.log('current steps home >>',stepsPercentage)
    return (
      <HandleBack onBack={this.onBack}>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.textStyleOne}>GetFit</Text>
          <Text style={styles.textStyleTwo}>Athletic</Text>
        </View>
        {/* <View style={styles.arrowContainer}>
          <TouchableOpacity style={{ marginRight: 20 }}><Image source={require('../icons/left.png')} style={styles.forImgs} /></TouchableOpacity>
          <Text>Today</Text>
          <TouchableOpacity style={{ marginLeft: 20 }}><Image source={require('../icons/right.png')} style={styles.forImgs} /></TouchableOpacity>
        </View> */}
        <ScrollView style={{ flex: 1, backgroundColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >

          {/* Show current user macros */}

          {
            showCurrentMacro ?
              <View>
                <Text style={styles.currentMacroText}>Your Current Macro *</Text>
                <View style={styles.inputCaloriesContainer}>

                  <Text
                    style={styles.inputCaloriesStyleOne}
                  >
                    {currentCalories + ' Kcal calories'}
                  </Text>
                  <Text
                    // placeholder={"e.g 149 g\nCarbohydrates"} 
                    style={styles.inputCaloriesStyleTwo}
                  // value={carbohydrates + ' g Carbohyderates'}
                  >
                    {currentCarbohy + ' g Carbohyderates'}
                  </Text>
                  <Text
                    // placeholder={"e.g 107 g\Protein"} 
                    style={styles.inputCaloriesStyleThree}
                  // value={proteins + ' g Proteins'} 
                  >
                    {currentProteins + ' g Proteins'}
                  </Text>
                  <Text
                    //  placeholder={"e.g 51 g\nFat"} 
                    style={styles.inputCaloriesStyleFour}
                  // value={fatMass + ' g Fat'}
                  >
                    {currentMass + ' g Fat'}
                  </Text>
                </View>
              </View>
              :
              null
          }


          <View style={styles.cardsContainer}>
            <View style={styles.childContainerOne}>
              <TouchableOpacity style={styles.goalSetCard} TouchableOpacity={0.6} onPress={() => navigate('Setupscreen1')}>
                {/* <Text style={{ color: 'white', fontSize: 15, fontFamily: 'MontserratExtraBold' }}>Set Goal</Text> */}
                <Image source={require('../icons/setgoal.png')} style={styles.imgsStyle} />

              </TouchableOpacity>
              <View style={styles.waitContainer}>
                <Text style={styles.waitText}>{userCurrentWeight == '' ? 0 : userCurrentWeight} </Text>
                <Text style={styles.weightLabel}>current weight</Text>
                <Text style={styles.bmiText}>{currentUserBMI == '' ? 0 : currentUserBMI}</Text>
                <Text style={styles.weightLabel}>current BMI</Text>
                <Text style={styles.measurementWeight}>{measurementsWeight == '' ? 0 : measurementsWeight}</Text>
                <Text style={styles.weightLabel}>measurements weight</Text>
              </View>
              <TouchableOpacity style={styles.cardOne} onPress={() => { navigate('AddExercise') }}>
                <Image source={require('../icons/log-exer.png')} style={styles.imgsStyle} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.cardThree} onPress={() => navigate('ShowMeasurementsScreen')}>
                <Image source={require('../icons/log-weight.png')} style={styles.imgsStyle} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.cardFive} onPress={this.changeRout.bind(this, 'Macrocalculator')}>
                <Image source={require('../icons/calc-macros.png')} style={styles.imgsStyle} />
              </TouchableOpacity>

            </View>
            <View style={styles.childContainerTwo}>
              <TouchableOpacity style={styles.cardTwo} activeOpacity={0.7}
                onPress={this.changeRout.bind(this, 'stepcount')}
              >
                <Text style={styles.cardTwoTextStyle}>Today's {'\n'}step count</Text>
                <View style={styles.whelSpinerContainer}>
                  <Wheelspiner
                    size={65}
                    width={10}
                    color={'#FF6200'}
                    progress={stepsPercentage == '' ? 0 : stepsPercentage}
                    backgroundColor={'gray'}
                    animateFromValue={0}
                    fullColor={'#FF6200'}
                  />
                </View>
                <View style={styles.resultContainer}>
                  <Text style={{
                    color: '#FF6200',
                    // fontFamily: 'MontserratLight' 
                  }}>{pedometerData == '' ? 0 : pedometerData}</Text>
                  <Text style={{
                    color: '#a6a6a6',
                    // fontFamily: 'MontserratLight' 
                  }}> / {goalSteps == '' || goalSteps == undefined ? 0 : goalSteps}</Text>
                </View>
                <Text style={{
                  color: '#a6a6a6', marginLeft: 14,
                  // fontFamily: 'MontserratLight'
                }}>steps</Text>
                <View style={styles.detailReport}>
                  <Text style={{
                    color: '#FFFFFF',
                    // fontFamily: 'MontserratLight', 
                    fontSize: 12, marginTop: 33
                  }}>View detailed report</Text>
                  <Image source={require('../icons/forward-arrow.png')} style={styles.arrowIcon} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cardFour} activeOpacity={0.7}
                onPress={this.changeRout.bind(this, 'logexercise')}
              >
                <Text style={styles.cardFourTextStyle}>{todayData != '' ? `Today's ${'\n'} exercise` : yestertdayData != '' ? `Yesterday's${'\n'} exercise` : `No ${'\n'}exercise`}</Text>
                <Text style={{
                  color: '#a6a6a6',
                  // fontFamily: 'MontserratLight', 
                  marginTop: 20, marginLeft: 14
                }}>
                  {todayData != '' ? `${todayData.exerciseName} ${'\n'}exercise` : yestertdayData != '' ? `${yestertdayData.exerciseName} ${'\n'}exercise` : 'No Record Found'}
                </Text>
                <View style={{ borderBottomColor: '#a6a6a6', borderBottomWidth: 1, marginHorizontal: 14, marginTop: 20 }}></View>
                <Text style={{
                  color: '#FF6200',
                  // fontFamily: 'MontserratLight', 
                  marginLeft: 14, marginTop: 10
                }}>
                  {todayData != '' ? todayData.exerciseAmount : yestertdayData != '' ? yestertdayData.exerciseAmount : 'No Record Found'}
                </Text>
                <Text style={{
                  color: '#a6a6a6', marginLeft: 14,
                  // fontFamily: 'MontserratLight' 
                }}>
                  {todayData != '' ? todayData.exerciseUnit : yestertdayData != '' ? yestertdayData.exerciseUnit : 'No Record Found'}
                </Text>
                <Text style={{
                  color: '#FFFFFF',
                  // fontFamily: 'MontserratLight', 
                  fontSize: 12, marginTop: 20, marginLeft: 14
                }}>View detailed report</Text>
                <Image source={require('../icons/forward-arrow.png')} style={styles.lastArrow} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.bmiCard}
                onPress={this.changeRout.bind(this, 'CalculateBMI')}>
                <Text style={styles.bmiHeading}>
                  Calculate {'\n'}BMI
                </Text>
                <View>
                  <Image source={require('../icons/forward-arrow.png')} style={styles.lastArrow} />
                </View>
              </TouchableOpacity>
              <View style={{ marginVertical: 20 }}></View>
            </View>
          </View>
        </ScrollView>
      </View>
     </HandleBack>  
    );
  }
}

export default Homescreen;

