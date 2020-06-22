import React from 'react';
import {
    Text, View, Alert,
    ScrollView, Image, Dimensions, TouchableOpacity, Picker
} from 'react-native';
import styles from '../Styling/AddExerciseStyle';
import BriskScreen from '../screens/BriskScreen';
// import AsyncStorage from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Dropdown } from 'react-native-material-dropdown';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'



import HttpUtils from '../Services/HttpUtils';
import Toast, { DURATION } from 'react-native-easy-toast'
import { TextInput } from 'react-native-gesture-handler';

const { height } = Dimensions.get('window');
let exercise;
let exerciseArry = [];
let uniqeArray;

class AddExercise extends React.Component {
    static navigationOptions = (navigation) => {
        const { params = {} } = navigation.navigation.state;
        console.log(params);
        let headerRight = <TouchableOpacity style={styles.headerIconContainer}
            onPress={
                params.addExercise
            }>
            <Image source={require('../icons/tick.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        return {
            headerRight,
            headerStyle: {
            },
            headerTintColor: 'gray',
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            showCard: false,
            jogging: false,
            pushups: false,
            bicep: false,
            crunch: false,
            iconShow: false,
            logExercise: false,
            reverseCrunch: false,
            verticalLegCrunch: false,
            bicycleEx: false,
            rollingEx: false,
            walking: false,
            running: false,
            joggingEx: false,
            exerciseName: '',
            exerciseAmount: [],
            exerciseUnit: '',
            dayOfMonth: '',
            month: '',
            year: '',
            date: '',
            time: '',
            allExerciseName: '',
            briskExerciseAmount: '',
            exerciseArr: [],
            inputs: {},
            customInputs: {},
            amountExcercise: '',
            indexNumber: {},
            units: {},
            incInputValue: '',
            position: 'top',
            customExName: '',
            customExAmount: '',
            customExUnit: '',
        }
    }


    async componentDidMount() {
        const date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const hours = new Date().getHours();
        const min = new Date().getMinutes();
        const sec = new Date().getSeconds();
        if (month == 1 || month == 2 || month == 3 || month == 4 || month == 5 || month == 6 || month == 7 || month == 8 || month == 9) {
            month = `0${month}`
        }
        // const value = await AsyncStorage.getItem('currentUser');
        // console.log(value , 'value')
        AsyncStorage.getItem("currentUser").then(value => {
            if (value) {
                let dataFromLocalStorage = JSON.parse(value);
                this.setState({
                    date: date + '-' + month + '-' + year,
                    time: hours + ':' + min + ':' + sec,
                    dayOfMonth: date,
                    month: month,
                    year: year,
                    userId: dataFromLocalStorage._id
                })
            }

        });
        this.props.navigation.setParams({
            addExercise: this.addExercise,
        })
    }
    gettingDropDownValues = () => {
        const { exerciseArr } = this.state;
        exercise = exerciseArr.map((elem, i) => {
        })
    }

    toastFunction = (text, position, duration, withStyle) => {
        this.setState({
            position: position,
        })
        if (withStyle) {
            this.refs.toastWithStyle.show(text, duration);
        } else {
            this.refs.toast.show(text, duration);
        }
    }

    addExercise = async () => {
        const { inputs, units, date, time,
            userId, dayOfMonth, month, year,
            customExUnit,
            customExName,
            customExAmount
        } = this.state;
        const { navigate } = this.props.navigation;
        let dataArr = [];
        
        for (let i in uniqeArray) {
            const exerciseObj = {};
            exerciseObj.date = date;
            exerciseObj.time = time;
            exerciseObj.dayOfMonth = dayOfMonth;
            exerciseObj.month = month;
            exerciseObj.year = year;
            exerciseObj.userId = userId;
            exerciseObj['exerciseName'] = uniqeArray[i] != 'Add Custom Exercise' ? uniqeArray[i] : this.state.customInputs['Add Custom Exercise'];
            exerciseObj['exerciseAmount'] = inputs[uniqeArray[i]];
            exerciseObj['exerciseUnit'] = units[uniqeArray[i]];
            dataArr.push(exerciseObj)
        }
        // console.log('Data Array Length >>', dataArr.length);
        if (dataArr.length > 0) {
            AsyncStorage.setItem('logExercises', JSON.stringify(dataArr))
            this.toastFunction('Data Save Successfully', this.state.position, DURATION.LENGTH_LONG, true);
            navigate('Exerciselog');
            exerciseArry = [];
        }
        else if (dataArr.length <= 0 || this.state.customInputs['Add Custom Exercise'] == ''
            && customExName == '' && customExUnit == '') {
            Alert.alert('Please Add Exercise')
        }
    }

    exerciseLog = () => {
        this.setState({ show: false, logExercise: true })
    }

    backToHome(e, val) {
        exerciseArry = exerciseArry.filter(function (item) {
            return item !== e
        })
        this.setState({
            exerciseArr: exerciseArry
        })
    }



    setAmount = (index, text) => {
        this.setState({
            inputs: {
                ...this.state.inputs,
                [index]: text,

            }
        })
    }

    setCustomExeName = (index, text) => {
        this.setState({
            customInputs: {
                ...this.state.customInputs,
                [index]: text
            }
        })
    }

    increamentVal(data, item) {
        
        const inputValue = Number(data) + 1;
        const incValue = inputValue.toString();
        // console.log(incValue);
       

    }

    
    decrementVal = () => {
        const { exerciseAmount } = this.state;
        const amount = Number(exerciseAmount) - 1
        let amountVal = amount.toString()
        this.setState({
            exerciseAmount: amountVal
        })
    }
    updateUnit = (data, text) => {
        this.setState({
            units: {
                ...this.state.units,
                [data]: text
            }
        })
    }

    selectExercise = (data) => {
        if (data !== "0") {
            exerciseArry.push(data);
            this.setState({
                allExerciseName: data,
                exerciseArr: exerciseArry,
                inputs: {
                    ...this.state.inputs,
                    [data]: '',

                },
                units: {
                    ...this.state.units,
                    [data]: ''
                }
            })
        }
    }

    render() {
        const { indexNumber } = this.state;
        const data = [{
            value: 'Brisk Walk'
        }, {
            value: 'High paced jogging'
        }, {
            value: 'Push ups'
        }, {
            value: 'Bicep curls'
        }, {
            value: 'Side Crunch'
        }, {
            value: 'Reverse Crunches'
        }, {
            value: 'Vertical Leg Crunch'
        },
        {
            value: 'Bicycle Exercise'
        },
        {
            value: 'Rolling Plank Exercise'
        },
        {
            value: 'Walking'
        },
        {
            value: 'Running'
        },
        {
            value: 'Jogging'
        },
        {
            value: 'Add Custom Exercise'
        }
        ]

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        uniqeArray = exerciseArry.filter(onlyUnique);
        // const b = this.state.allExerciseName;
        // console.log('State Excercise Name >>', this.state.customInputs);
        return (
            <KeyboardAwareView animated={true}>
                <ScrollView style={{ flex: 1, backgroundColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >
                    <View style={styles.childContainer}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingStyle}>
                                Add Exercise
                        </Text>
                            <Text style={styles.textTodayStyle}>Enter today’s exercise details.</Text>

                        </View>
                        {/* <View style={styles.todayText}>
                    </View> */}
                        <Text style={{ color: '#A6A6A6', marginVertical: 5 }}>Select Exercise</Text>
                        <View style={{
                            height: 40, borderWidth: 2, borderColor: '#e5e5e5',
                            borderBottomWidth: 0
                        }}>
                            <Dropdown
                                // label='Select an option..'
                                value={this.state.allExerciseName}
                                data={data}
                                dropdownOffset={{ top: 7, left: 0 }}
                                onChangeText={this.selectExercise}
                                // dropdownPosition={}
                                itemCount={8}

                            />
                        </View>
                        {
                            uniqeArray.length >= 0 ?
                                uniqeArray.map((item, index) => {
                                    return <View style={{ marginTop: 20 }} key={index}>
                                        <BriskScreen title={item}
                                            backFunc={this.backToHome.bind(this, item)}
                                            setAmount={(text) => this.setAmount(item, text)}
                                            setCustomExeName={(text) => this.setCustomExeName(item, text)}
                                            value2={this.state.customInputs[item]}
                                            value={this.state.inputs[item]}
                                            increamentVal={this.increamentVal.bind(this, this.state.inputs[item], item)}
                                            //decrementVal={this.decrementVal}
                                            updateUnit={(text) => this.updateUnit(item, text)}
                                            indexNumber={indexNumber}
                                            unit={this.state.units[item]} />
                                    </View>
                                })
                                :
                                null
                        }
                        <Toast ref="toastWithStyle"
                            style={{ backgroundColor: '#FF6200' }}
                            position={this.state.position}
                            positionValue={50}
                            fadeInDuration={750}
                            fadeOutDuration={1000}
                            opacity={0.8}
                            textStyle={{ color: 'white' }}
                        />
                        <View style={{ flex: 2 }}>
                        </View>
                    </View>
                    <View style={{ flex: 1.2 }}>
                    </View>
                </ScrollView>
            </KeyboardAwareView>

        )
    }
}

export default AddExercise;

