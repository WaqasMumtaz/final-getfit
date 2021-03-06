import React from 'react';
import { Text, View, TextInput, Picker, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native';
import CaloriesSetupBtn from '../buttons/setUpBtn';
import styles from '../Styling/SetUpScreenStyle';
import HttpUtilsFile from '../Services/HttpUtils';
import OverlayLoader from '../Loader/OverlaySpinner';
import { Dropdown } from 'react-native-material-dropdown';
const { heightDimension } = Dimensions.get('window');
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'


class Setupscreen extends React.Component {
    static navigationOptions = () => ({
        headerStyle: {
            backgroundColor: 'black'
        },
        headerTintColor: 'white'
    })
    constructor(props) {
        super(props);
        this.state = {
            screenHeight: 0,
            user: '',
            height: '',
            heightInch: '',
            currentWeight: '',
            goalWeight: '',
            goalSteps: '',
            heightUnit: '',
            currentWeightUnit: '',
            goalWeightUnit: '',
            heightValidation: false,
            currentWeightValidation: false,
            goalWeightValidation: false,
            heightUnitValidation: false,
            currentWeightUnitValidation: false,
            goalWeightUnitValidation: false,
            goalStepsValidation: false,
            isLoading: false,
        }
    }



    decrementVal(value) {
        const { height, heightInch, currentWeight, goalWeight } = this.state;
        if (value == 'height') {
            const heightNum = Number(height) - 1
            let heightVal = heightNum.toString()
            this.setState({
                height: heightVal
            })
        }
        else if (value == 'heightInch') {
            const heightInches = Number(heightInch) - 1
            let heightInchVal = heightInches.toString()
            this.setState({
                heightInch: heightInchVal
            })
        }
        else if (value == 'currentWeight') {
            const currentWeightNum = Number(currentWeight) - 1
            let currentWeightVal = currentWeightNum.toString()
            this.setState({
                currentWeight: currentWeightVal
            })
        }
        else if (value == 'goalWeight') {
            const goalWeightNum = Number(goalWeight) - 1
            let goalWeightVal = goalWeightNum.toString()
            this.setState({
                goalWeight: goalWeightVal
            })
        }
    }

    increamentVal(value) {
        const { height, heightInch, currentWeight, goalWeight } = this.state;
        if (value == 'height') {
            const heightNum = Number(height) + 1
            let heightVal = heightNum.toString()
            this.setState({
                height: heightVal
            })
        }
        else if (value == 'heightInch') {
            const heightInches = Number(heightInch) + 1
            let heightInchVal = heightInches.toString()
            this.setState({
                heightInch: heightInchVal
            })
        }
        else if (value == 'currentWeight') {
            const currentWeightNum = Number(currentWeight) + 1
            let currentWeightVal = currentWeightNum.toString()
            this.setState({
                currentWeight: currentWeightVal
            })
        }
        else if (value == 'goalWeight') {
            const goalWeightNum = Number(goalWeight) + 1
            let goalWeightVal = goalWeightNum.toString()
            this.setState({
                goalWeight: goalWeightVal
            })
        }
    }
    updateUnits(e, givenUnit) {
        if (e == 'current weight Unit') {
            this.setState({
                currentWeightUnit: givenUnit
            })
        }
        else if (e == 'goal weight Unit') {
            this.setState({
                goalWeightUnit: givenUnit
            })
        }
    }
    lastStep = async () => {
        const { height, heightInch, currentWeight, currentWeightUnit, fitnessResult, goalSteps } = this.state
        const { dob, date, time, userId } = this.props.navigation.state.params;
        if (height == '') {
            this.setState({
                heightValidation: true
            })
        }
        else {
            this.setState({
                heightValidation: false
            })
        }
        if (heightInch == '') {
            this.setState({
                heightUnitValidation: true
            })
        }
        else {
            this.setState({
                heightUnitValidation: false
            })
        }
        if (currentWeight == '') {
            this.setState({
                currentWeightValidation: true
            })
        }
        else {
            this.setState({
                currentWeightValidation: false
            })
        }
        if (goalSteps == '') {
            this.setState({
                goalStepsValidation: true
            })
        }
        else {
            this.setState({
                goalStepsValidation: false
            })
        }
        
        if (currentWeightUnit == '' || currentWeightUnit == '0') {
            this.setState({
                currentWeightUnitValidation: true
            })
        }
        else {
            this.setState({
                currentWeightUnitValidation: false
            })
        }
        
        if (height != '' && heightInch != '' && currentWeight != '' && fitnessResult != '' && currentWeightUnit != '' && goalSteps != '') {
            this.setState({
                isLoading: true
            })
            const heightCentimeter = height * 30.48;
            //console.log('height centi >>>', heightCentimeter)
            const heightInchCentimeter = heightInch * 2.54;
            //console.log('height inches centi >>>', heightInchCentimeter);
            const totalHeightCentimeter = heightCentimeter + heightInchCentimeter;
            //console.log('total centimeter >>>',totalHeightCentimeter)
            const currentDayOfWeek = new Date().getDay() + 1;
            const currentDate = new Date().getDate();
            let currentMonth = new Date().getMonth() + 1;
            const currentYear = new Date().getFullYear();
            console.log('current week >>', currentDayOfWeek);
            console.log('currentDate >>', currentDate);
            console.log('currentMont >>', currentMonth);
            console.log('currentYear >>', currentYear);
            const userData = {
                dob: dob,
                heightFit: height,
                heightInch: heightInch,
                currentWeight: currentWeight + `${' KG'}`,
                // currentWeight: currentWeight,
                date: currentDate,
                time: time,
                userId: userId,
                heightCentimeter: totalHeightCentimeter,
                fitnessGoal: fitnessResult,
                goalSteps:goalSteps,
                dayOfWeek:currentDayOfWeek,
                month:currentMonth,
                year:currentYear
            }
            // console.log('send user data >>>', userData)
            try {
                let sendData = await HttpUtilsFile.post('postgoal', userData);
                // console.log('data send >>>', sendData)
                if (sendData.code == 200) {
                    this.setState({
                        isLoading: false
                    }, () => {
                        height == '',
                            heightInch == '',
                            currentWeight == '',
                            fitnessResult == '',
                            currentWeightUnit == '',
                            this.state.clickedFemale == false,
                            this.state.clickedMale == false
                        const { navigate } = this.props.navigation;
                        navigate('BottomTabe');
                    })

                }
            }
            catch (err) {
                console.log(err)
            }

        }
    }

    render() {
        const { heightValidation,
            currentWeightValidation,
            goalWeightValidation,
            heightUnitValidation,
            currentWeightUnitValidation,
            lose,
            gain,
            fitnessResult,
            maleClickedTextStyle,
            femaleClickedTextStyle,
            clickedMaintainTextStyle,
            fitnessValidation,
            goalWeightUnitValidation,
            goalSteps,
            goalStepsValidation,
            maintain,
            maintainClicked
        } = this.state;
        // console.log('your fitness result >>>', goalSteps)
        return (
            <KeyboardAwareView animated={true}>
            <View style={styles.mainContainer}>
                <View style={styles.childContainer}>
                    <ScrollView style={{ flex: 1, backgroundColor: 'black', height: heightDimension }} contentContainerStyle={{ flexGrow: 1 }}  >
                        <View style={styles.heading}>
                            <Text style={styles.headingStyle}>Set Up Your App</Text>
                        </View>
                        <View style={styles.paraGraph}>
                            <Text style={styles.paraGraphStyle}>GetFitAthletic needs the following info to help you with your fitness journey</Text>
                        </View>
                        <View style={styles.labelsContainer}>
                            <Text style={styles.leftInputLabelStyle}>Height (ft)</Text>
                            <Text style={styles.rightInputLabelStyle}>Height (Inch)</Text>
                        </View>
                        <View style={styles.inputFieldOne}>
                            <View style={styles.inputFieldOneChild}>
                                <TouchableOpacity style={styles.touchableOpacityOne}
                                    activeOpacity={0.8}
                                    onPress={this.decrementVal.bind(this, 'height')}
                                >
                                    <Image source={require('../icons/minus-gray.png')} style={styles.forImg} />
                                </TouchableOpacity>
                                <TextInput keyboardType='numeric' maxLength={3} placeholder='0'
                                    style={styles.inputTextStyle}
                                    type="number"
                                    onChangeText={(height) => this.setState({ height: height })}
                                    value={this.state.height}
                                />
                                <TouchableOpacity
                                    style={styles.touchableOpacityTwo}
                                    activeOpacity={0.8}
                                    onPress={this.increamentVal.bind(this, 'height')}
                                >
                                    <Image source={require('../icons/plus-gray.png')} style={styles.forImg} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.pickerContainer}>
                                
                                <View style={styles.inputFieldOneChild}>
                                    <TouchableOpacity style={styles.touchableOpacityOne}
                                        activeOpacity={0.8}
                                        onPress={this.decrementVal.bind(this, 'heightInch')}
                                    >
                                        <Image source={require('../icons/minus-gray.png')} style={styles.forImg} />
                                    </TouchableOpacity>
                                    <TextInput keyboardType='numeric' maxLength={3} placeholder='0'
                                        style={styles.inputTextStyle}
                                        type="number"
                                        onChangeText={(height) => this.setState({ heightInch: height })}
                                        value={this.state.heightInch}
                                    />
                                    <TouchableOpacity
                                        style={styles.touchableOpacityTwo}
                                        activeOpacity={0.8}
                                        onPress={this.increamentVal.bind(this, 'heightInch')}
                                    >
                                        <Image source={require('../icons/plus-gray.png')} style={styles.forImg} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            {heightValidation ?
                                <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                                    <Text style={styles.validationInstruction}>
                                        Please fill your height
                                    </Text>
                                </View>
                                : null}
                            {heightUnitValidation ?
                                <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                                    <Text style={styles.validationInstruction}>
                                        Please select height inches
                                     </Text>
                                </View>
                                : null}
                        </View>
                        <View style={styles.weightLabelContainer}>
                            <Text style={styles.leftInputLabelStyle}>Current Weight</Text>
                            <Text style={styles.rightWeightUnitLabelInput}>Unit</Text>
                        </View>
                        <View style={styles.inputFieldTwo}>
                            <View style={styles.inputFieldOneChild}>
                                <TouchableOpacity style={styles.touchableOpacityOne} activeOpacity={0.8}
                                    onPress={this.decrementVal.bind(this, 'currentWeight')}
                                >
                                    <Image source={require('../icons/minus-gray.png')} style={styles.forImg} />
                                </TouchableOpacity>
                                <TextInput keyboardType='numeric' maxLength={5} placeholder='0'
                                    style={styles.inputTextStyle}
                                    type="number"
                                    onChangeText={(currentWeight) => this.setState({ currentWeight: currentWeight })}
                                    value={this.state.currentWeight}
                                />
                                <TouchableOpacity style={styles.touchableOpacityTwo} activeOpacity={0.8}
                                    onPress={this.increamentVal.bind(this, 'currentWeight')}
                                >
                                    <Image source={require('../icons/plus-gray.png')} style={styles.forImg} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.pickerContainer}>
                                <View style={styles.iosPicker}>
                                    <Dropdown
                                        label='Select an option..'
                                        value={this.state.currentWeightUnit}
                                        data={[{ value: 'KG' }]}
                                        dropdownOffset={{ top: 5, left: 0 }}
                                        onChangeText={this.updateUnits.bind(this, 'current weight Unit')}
                                    />
                                </View>

                                {/* <Picker
                                    selectedValue={this.state.currentWeightUnit}
                                    onValueChange={this.updateUnits.bind(this, 'current weight Unit')}
                                    style={styles.pickerStyle}>
                                    <Picker.Item label='Select an option...' value='0' />
                                    <Picker.Item label="KG" value="kg" />
                                </Picker> */}
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            {currentWeightValidation ?
                                <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                                    <Text style={styles.validationInstruction}>
                                        Please fill your weight
                                    </Text>
                                </View>
                                : null}
                            {currentWeightUnitValidation ?
                                <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                                    <Text style={[styles.validationInstruction, styles.rightValidationHieghtAndCurrentWeight]}>
                                        Please select weight unit
                                    </Text>
                                </View>
                                :
                                null}
                        </View>

                        <View style={styles.goalStepsContainer}>
                            <Text style={styles.goalStepsText}>Set your daily goal steps</Text>
                        </View>
                        <View style={styles.inputFields}>
                            <TextInput onChangeText={text => {

                                this.setState({ goalSteps: text })
                            }}
                                placeholder="Goal steps..."
                                placeholderTextColor="#7e7e7e"
                                keyboardType='numeric'
                                value={goalSteps}
                                style={styles.inputTexts} />
                        </View>

                        {goalStepsValidation ?
                            <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                                <Text style={styles.validationInstruction}>
                                    Please enter goal steps
                                    </Text>
                            </View>
                            :
                            null
                        }


                        {
                            this.state.isLoading ?
                                <OverlayLoader /> :
                                null
                        }
                        {/* <View style={styles.weightLabelContainer}>
                            <Text style={styles.leftInputLabelStyle}>Goal Weight</Text>
                            <Text style={styles.rightGoalWeightUnitLabel}>Unit</Text>
                        </View>
                        <View style={styles.inputFieldThree}>
                            <View style={styles.inputFieldOneChild}>
                                <TouchableOpacity style={styles.touchableOpacityOne} activeOpacity={0.8}
                                    onPress={this.decrementVal.bind(this, 'goalWeight')}
                                >
                                    <Image source={require('../icons/minus-gray.png')} style={styles.forImg} />
                                </TouchableOpacity>
                                <TextInput keyboardType='numeric' maxLength={3} placeholder='0'
                                    style={styles.inputTextStyle}
                                    type="number"
                                    onChangeText={(goalWeight) => this.setState({ goalWeight: goalWeight })}
                                    value={this.state.goalWeight}
                                />

                                <TouchableOpacity style={styles.touchableOpacityTwo} activeOpacity={0.8}
                                    onPress={this.increamentVal.bind(this, 'goalWeight')}
                                >
                                    <Image source={require('../icons/plus-gray.png')} style={styles.forImg} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.pickerContainer}>
                                <Picker selectedValue={this.state.goalWeightUnit}
                                    onValueChange={this.updateUnits.bind(this, 'goal weight Unit')}
                                    style={styles.pickerStyle}>
                                    <Picker.Item label='Select an option...' value='0' />
                                    <Picker.Item label="KG" value="kg" />
                                </Picker>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            {goalWeightValidation ?
                                <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                                    <Text style={styles.validationInstruction}>
                                        Please fill your goal weight
                                    </Text>
                                </View>
                                : null}
                            {goalWeightUnitValidation ?
                                <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                                    <Text style={[styles.validationInstruction, styles.rightGoalWeight]}>
                                        Please select goal weight unit
                                    </Text>
                                </View>
                                : null}
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 8, marginTop: 5 }}>
                            <Text style={styles.textsStyles}>Goal Steps</Text>
                        </View>
                        <View style={styles.inputFields}>
                            <TextInput onChangeText={text => { this.setState({ goalSteps: text }) }}
                                keyboardType='phone-pad'
                                value={goalSteps}
                                style={styles.inputTexts}
                            />
                        </View> */}
                        {/* {
                            goalStepsValidation ? 
                            <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                                    <Text style={styles.validationInstruction}>
                                        Please select goal steps
                                    </Text>
                                </View>
                         : null       
                        } */}
                        <View style={styles.buttonContainer}>
                            <CaloriesSetupBtn title='Submit'
                                onPress={this.lastStep}
                                // onPress={() => navigate('LastSetUpScreen')} 
                                caloriesBtnStyle={styles.caloriesBtnStyle} />
                        </View>
                    </ScrollView>
                </View>
            </View>
            </KeyboardAwareView>
        )
    }
}

export default Setupscreen;

