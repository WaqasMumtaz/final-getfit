import React from 'react';
import { Text, View,Alert,
     ScrollView, Button, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import styles from '../Styling/LogMeasurementsStyle';
import CaloriesSetupBtn from '../buttons/setUpBtn';
import AsyncStorage from '@react-native-community/async-storage';
import HttpUtils from '../Services/HttpUtils';
import Toast, { DURATION } from 'react-native-easy-toast';
// import PickDate from '../Common/datePicker';
import DatePicker from 'react-native-datepicker';
import OverlayLoader from '../Loader/OverlaySpinner'
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'


const { height } = Dimensions.get('window');

class LogMeasurementsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: '',
            dayOfMonth: '',
            monthNo: '',
            year: '',
            time: '',
            weight: '',
            arms:'',
            neck: '',
            shoulder: '',
            biceps: '',
            chest: '',
            waistAtNaval: '',
            above2Inches: '',
            below2Inches: '',
            hips: '',
            calves: '',
            thigh: '',
            day: '',
            userId: '',
            data: '',
            filterData: [],
            weightValidation: false,
            neckValidation: false,
            shoulderValidation: false,
            bicepsValidation: false,
            chestValidation: false,
            waistValidation: false,
            thighValidation: false,
            currentDateData: false,
            isLoading: false,
            position: 'top',
            monthArr: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            weekDay: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        }
    }


    componentWillMount() {
        const { navigation } = this.props;
        let month;
        const { dayOfMonth } = this.state;
        let monthNo = new Date().getMonth() + 1;
        const day = new Date().getDay();
        const date = new Date().getDate();
        const year = new Date().getFullYear();
        const hours = new Date().getHours();
        const min = new Date().getMinutes();
        const sec = new Date().getSeconds();
        if (monthNo == 1 || monthNo == 2 || monthNo == 3 || monthNo == 4 || monthNo == 5 || monthNo == 6 || monthNo == 7 || monthNo == 8 || monthNo == 9) {
            month = `0${monthNo}`;
        }
        else {
            month = monthNo;
            //console.log('month >>', month)
        }
        AsyncStorage.getItem("currentUser").then(value => {
            if (value) {
                let dataFromLocalStorage = JSON.parse(value);
                this.setState({
                    userId: dataFromLocalStorage._id,
                    maxDate: date + '-' + month + '-' + year,
                    date: date + '-' + month + '-' + year,
                    time: hours + ':' + min + ':' + sec,
                    day: day,
                    dayOfMonth: date,
                    monthNo: monthNo,
                    year: year,
                })
            }
        });
        this.focusListener = navigation.addListener('didFocus', () => {
            this.getData();
        });
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


    addWeight = async () => {
        const {
            weight,
            monthNo,
            monthArr,
            weekDay,
            day,
            userId,
            date,
            time,
            dayOfMonth,
            neck,
            shoulder,
            biceps,
            chest,
            waistAtNaval,
            below2Inches,
            above2Inches,
            calves,
            hips,
            thigh,
            year,
            arms
        } = this.state;
        // console.log('Neck -->', neck, 'Shoulder -->', shoulder)
        let addWeight = {}
        if (weight == '') {
            this.setState({
                weightValidation: true,
                isLoading: false,
            })
        }
        else {
            this.setState({
                weightValidation: false,
                isLoading: false,
            })
        }
        if (waistAtNaval == '') {
            this.setState({
                waistValidation: true,
                isLoading: false,
            })
        }
        else {
            this.setState({
                waistValidation: false,
                isLoading: false,
            })
        }
        // if (neck == ''){
        //     this.setState({
        //         neckValidation: true,
        //         isLoading:false,
        //     })
        // }
        // else {
        //     this.setState({
        //         neckValidation: false,
        //         isLoading:false,
        //     })
        // }
        // if(shoulder == ''){
        //     this.setState({
        //         shoulderValidation: true,
        //         isLoading:false,
        //     })
        // }
        // else {
        //     this.setState({
        //         shoulderValidation: false,
        //         isLoading:false,
        //     })
        // }
        // if(biceps == ''){
        //     this.setState({
        //         bicepsValidation: true,
        //         isLoading:false,
        //     })
        // }
        // else {
        //     this.setState({
        //         bicepsValidation: false,
        //         isLoading:false,
        //     })
        // }
        // if(chest == ''){
        //     this.setState({
        //         chestValidation: true,
        //         isLoading:false,
        //     })
        // }
        // else {
        //     this.setState({
        //         chestValidation: false,
        //         isLoading:false,
        //     })
        // }


        // if(thigh == ''){
        //     this.setState({
        //         thighValidation: true,
        //         isLoading:false,
        //     })

        // }

        // else {
        //     this.setState({
        //         thighValidation: false,
        //         isLoading:false,
        //     })
        // }

        if (weight != '' && waistAtNaval != '') {
            addWeight.weight = weight + ' KG';
            addWeight.arms = arms != '' ? arms + ' Inches' : 0 + ' Inches';
            addWeight.neck = neck !='' ? neck + ' Inches' : 0 + ' Inches';
            addWeight.shoulder = shoulder != '' ? shoulder + ' Inches' : 0 + ' Inches';
            addWeight.biceps = biceps !='' ? biceps + ' Inches' : 0 + ' Inches';
            addWeight.chest = chest !='' ? chest + ' Inches' : 0 + ' Inches';
            addWeight.waistAtNaval = waistAtNaval + ' Inches';
            addWeight.below2Inches = below2Inches != '' ? below2Inches + ' Inches' : 0 + ' Inches';
            addWeight.above2Inches = above2Inches != '' ? above2Inches + ' Inches' : 0 + ' Inches';
            addWeight.calves = calves != '' ? calves + ' Inches' : 0 + ' Inches';
            addWeight.hips = hips != '' ? hips + ' Inches' : 0 + ' Inches';
            addWeight.thigh = thigh != '' ? thigh + ' Inches' : 0 + ' Inches';
            addWeight.month = monthArr[monthNo];
            addWeight.day = weekDay[day];
            addWeight.dayOfMonth = dayOfMonth;
            addWeight.date = date;
            addWeight.time = time;
            addWeight.dayOfWeek = day + 1;
            addWeight.month = monthNo;
            addWeight.year = year;
            addWeight.userId = userId;
            this.setState({
                isLoading: true
            })
            //console.log(addWeight, 'addWeight')
            let dataUser = await HttpUtils.post('weightLog', addWeight)
            console.log(dataUser, 'dataUser')
            let userMsg = dataUser.msg;
            if (dataUser.code == 200) {
                this.setState({
                    isLoading: false
                }, () => {
                    this.toastFunction(userMsg, this.state.position, DURATION.LENGTH_LONG, true)
                    this.props.navigation.navigate('BottomTabe')
                })
            }
            else if (!dataUser.code == 200) {
                this.setState({
                    isLoading: false
                }, () => {
                    this.toastFunction('Some thing went wrong', this.state.position, DURATION.LENGTH_LONG, true)
                })
            }
        }

    }

    //filtration with date
    dateFilter = async () => {
        const { data, date } = this.state;
        let dataArr = [];
        for (var i in data) {
            let dataFilter = data[i];
            // if (e == undefined) {
            //     if (dataFilter.date == date) {
            //         dataArr = [...dataArr, dataFilter]
            //         this.setState({
            //             filterData: dataArr
            //         })
            //     }
            // }
            // else if (e != undefined) {
            //     if (dataFilter.date == e) {
            //        // console.log('condition true')
            //         dataArr = [...dataArr, dataFilter]
            //         this.setState({
            //             filterData: dataArr,
            //             date: e
            //         })
            //     }
            // }
        }
    }

    getData = async () => {
        const { userId, dayOfMonth } = this.state;
        let dataUser = await HttpUtils.get('getweightlog');
        // console.log('getData >>', dataUser);
        // let dataArr = [];
        if (dataUser.code == 200) {
            const allUsersData = dataUser.content;
            // console.log('All User Data >>',allUsersData); 
            for (var i in allUsersData) {
                const allUsers = allUsersData[i];
                if (allUsers.userId == userId) {
                    //  console.log('Current User Successfully Match');
                      console.log('allUsers Data  >>>', allUsers);
                    // if (allUsers.dayOfMonth == dayOfMonth) {
                       const spaceIndexWeight = allUsers.weight.indexOf(' ');
                    //    console.log('Weight >>', allUsers.weight);
                       const weight = allUsers.weight.slice(0 , spaceIndexWeight);
                       const spaceIndexNeck = allUsers.neck.indexOf(' ');
                       const neck = allUsers.neck.slice(0 , spaceIndexNeck);
                       const spaceIndexShoulder = allUsers.shoulder.indexOf(' ');
                       const shoulder = allUsers.shoulder.slice(0 , spaceIndexShoulder);
                       const spaceIndexBiceps = allUsers.biceps.indexOf(' ');
                    //    console.log('space index bicep >>', spaceIndexBiceps);
                       const biceps = allUsers.biceps.slice(0, spaceIndexBiceps);
                       const spaceIndexChest = allUsers.chest.indexOf(' ');
                       const chest = allUsers.chest.slice(0 , spaceIndexChest);
                        console.log('waist At  waistAtNaval>>', allUsers.waistAtNaval);
                       const spaceIndexWaistAtNaval = allUsers.waistAtNaval.indexOf(' ');
                    //    console.log('index of spaceIndexWaistAtNaval >>', spaceIndexWaistAtNaval)
                        const waistAtNaval = allUsers.waistAtNaval.slice(0 , spaceIndexWaistAtNaval);
                    //    console.log('waistAtNaval', waistAtNaval)
                       const spaceIndexBelow2Inches = allUsers.below2Inches.indexOf(' ');
                       const below2Inches = allUsers.below2Inches.slice(0 , spaceIndexBelow2Inches);
                       const spaceIndexAbove2Inche = allUsers.above2Inches.indexOf(' ');
                       const above2Inches = allUsers.above2Inches.slice(0 , spaceIndexAbove2Inche);
                       const spaceIndexCalves = allUsers.calves.indexOf(' ');
                       const calves = allUsers.calves.slice(0 , spaceIndexCalves);
                       const spaceIndexHips = allUsers.hips.indexOf(' ');
                       const hips = allUsers.hips.slice(0 , spaceIndexHips);
                       const spaceIndexThigh = allUsers.thigh.indexOf(' ');
                       const thigh = allUsers.thigh.slice(0 , spaceIndexThigh);
                       const spaceIndexArms = allUsers.arms.indexOf(' ');
                    //    console.log('Arms >>', spaceIndexArms)
                       const arms = allUsers.arms.slice(0 , spaceIndexArms);
                    //    console.log('weight user >>', weight);
                        this.setState({
                            // currentDateData: true,
                            arms,
                            weight,
                            neck,
                            shoulder,
                            biceps,
                            chest,
                            waistAtNaval,
                            below2Inches,
                            above2Inches,
                            calves,
                            hips,
                            thigh,
                        })
                        // Alert.alert('This form will only be completed once a day');
                    // }
                    // else {
                    //     // console.log('Current Date Does Not Match');
                    //     this.setState({
                    //         currentDateData: false
                    //     })
                    // }
                }
            }

        }
        // console.log(dataUser, 'dataUser from log ')
        // this.setState({
        //     data: dataUser.content
        // })
        // this.dateFilter()
    }
    render() {
        const {
            weightValidation,
            neckValidation,
            shoulderValidation,
            bicepsValidation,
            chestValidation,
            waistValidation,
            thighValidation,
            isLoading,
            neck,
            shoulder,
            date,
            weight,
            waistAtNaval,
            below2Inches,
            above2Inches,
            hips,
            calves,
            thigh,
            chest,
            biceps,
            currentDateData,
            arms,
            maxDate
        } = this.state;
        // console.log('waistAtNaval -->>', this.state.waistAtNaval,
        //     'Hips -->>', this.state.hips,
        //     'above', this.state.above2Inches
        // )
        console.log('date >>', date)
        return (
            <KeyboardAwareView animated={true}>
            <View style={styles.mainContainer}>
                <ScrollView style={{ flex: 1, backgroundColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >
                    {/* <View style={styles.childContainer}> */}
                    <View style={styles.headingContainer}>
                        <Text style={styles.headingStyle}>
                            Measurements Log
                            </Text>
                    </View>
                     <View style={styles.datePicker}> 
                     <DatePicker
                            style={{ width: 120 }}
                            date={date}
                            mode="date"
                            placeholder="select date"
                            format="DD-MM-YYYY"
                            minDate="01-01-1950"
                            maxDate={maxDate}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    width: 0,
                                    height: 0,
                                },
                                dateInput: {
                                    height: 40,
                                }
                            }}
                            onDateChange={(date) => { this.setState({ date}) }}
                        />
                     </View>
                    <Text style={styles.labelTextWeight}>Weight</Text>
                                <View style={styles.inputContainer}>
                                    <TextInput placeholder="0"
                                        placeholderTextColor="#4f4f4f"
                                        style={styles.inputTextStyle}
                                        keyboardType={"numeric"}
                                        maxLength={7}
                                        value={weight}
                                        onChangeText={(weight) => this.setState({weight})}
                                    />
                                    <View style={styles.unitTextStyle}><Text style={styles.textStyle}>KG</Text></View>
                                </View>
                                <View style={styles.validationContainer}>
                                    {weightValidation ?
                                        <Text style={styles.validationInstruction}>Weight Required</Text>
                                        : null}
                                </View>
                         
                    
                    {/* <View style={{ marginTop: 20 }}></View> */}
                    <Text style={styles.labelText}>Arms</Text>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="0"
                                placeholderTextColor="#4f4f4f"
                                style={styles.inputTextStyle}
                                keyboardType={"numeric"}
                                maxLength={7}
                                value={arms}
                                onChangeText={(arms) => this.setState({arms})}
                            />
                            <View style={styles.unitTextStyle}><Text style={styles.textStyle}>Inches</Text></View>
                        </View>

                    <View style={{ marginTop: 20 }}></View>
                    <Text style={styles.labelText}>Neck</Text>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="0"
                                placeholderTextColor="#4f4f4f"
                                style={styles.inputTextStyle}
                                keyboardType={"numeric"}
                                maxLength={7}
                                value={neck}
                                onChangeText={(neck) => this.setState({ neck})}
                            />
                            <View style={styles.unitTextStyle}><Text style={styles.textStyle}>Inches</Text></View>
                        </View>
                    {/* <View style={styles.validationContainer}>
                        {neckValidation ?
                            <Text style={styles.validationInstruction}>Please Enter Your Neck Value </Text>
                            : null}
                    </View> */}
                    <View style={{ marginTop: 20 }}></View>
                    <Text style={styles.labelText}>Shoulder</Text>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="0"
                                placeholderTextColor="#4f4f4f"
                                style={styles.inputTextStyle}
                                keyboardType={"numeric"}
                                maxLength={7}
                                value={shoulder}
                                onChangeText={(shoulder) => this.setState({ shoulder})}
                            />
                            <View style={styles.unitTextStyle}><Text style={styles.textStyle}>Inches</Text></View>
                        </View>
                    {/* <View style={styles.validationContainer}>
                        {shoulderValidation ?
                            <Text style={styles.validationInstruction}>Please Enter Your Shoulder Value </Text>
                            : null}
                    </View> */}
                    <View style={{ marginTop: 20 }}></View>
                    <Text style={styles.labelText}>Biceps</Text>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="0"
                                placeholderTextColor="#4f4f4f"
                                style={styles.inputTextStyle}
                                keyboardType={"numeric"}
                                maxLength={7}
                                value={biceps}
                                onChangeText={(biceps) => this.setState({ biceps})}
                            />
                            <View style={styles.unitTextStyle}><Text style={styles.textStyle}>Inches</Text></View>
                        </View>

                    {/* <View style={styles.validationContainer}>
                        {bicepsValidation ?
                            <Text style={styles.validationInstruction}>Please Enter Your Biceps </Text>
                            : null}
                    </View> */}
                    <View style={{ marginTop: 20 }}></View>
                    <Text style={styles.labelText}>Chest</Text>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="0"
                                placeholderTextColor="#4f4f4f"
                                style={styles.inputTextStyle}
                                keyboardType={"numeric"}
                                maxLength={7}
                                value={chest}
                                onChangeText={(chest) => this.setState({ chest})}
                            />
                            <View style={styles.unitTextStyle}><Text style={styles.textStyle}>Inches</Text></View>
                        </View>

                    {/*                     
                    <View style={styles.validationContainer}>
                        {chestValidation ?
                            <Text style={styles.validationInstruction}>Please Enter Your Chest </Text>
                            : null}
                    </View> */}
                    <View style={{ marginTop: 20 }}></View>
                    <Text style={styles.labelText}>Waist (At Naval)</Text>
                        <View>
                            <View style={styles.inputContainer}>
                                <TextInput placeholder="0"
                                    placeholderTextColor="#4f4f4f"
                                    style={styles.inputTextStyle}
                                    keyboardType={"numeric"}
                                    maxLength={7}
                                    value={waistAtNaval}
                                    onChangeText={(waist) => this.setState({ waistAtNaval: waist })}
                                />
                                <View style={styles.unitTextStyle}><Text style={styles.textStyle}>Inches</Text></View>
                            </View>
                            <View style={styles.validationContainer}>
                                {waistValidation ?
                                    <Text style={styles.validationInstruction}>Waist At Naval Required </Text>
                                    : null}
                            </View>
                        </View>

                    <Text style={styles.labelText}>2 Inches Above Naval</Text>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="0"
                                placeholderTextColor="#4f4f4f"
                                style={styles.inputTextStyle}
                                keyboardType={"numeric"}
                                maxLength={7}
                                value={above2Inches}
                                onChangeText={(waist) => this.setState({ above2Inches: waist })}
                            />
                            <View style={styles.unitTextStyle}><Text style={styles.textStyle}>Inches</Text></View>
                        </View>

                    <View style={{ marginTop: 20 }}></View>
                    <Text style={styles.labelText}>2 Inches Below Naval</Text>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="0"
                                placeholderTextColor="#4f4f4f"
                                style={styles.inputTextStyle}
                                keyboardType={"numeric"}
                                maxLength={7}
                                value={below2Inches}
                                onChangeText={(waist) => this.setState({ below2Inches: waist })}
                            />
                            <View style={styles.unitTextStyle}><Text style={styles.textStyle}>Inches</Text></View>
                        </View>

                    <View style={{ marginTop: 20 }}></View>
                    <Text style={styles.labelText}>Hips</Text>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="0"
                                placeholderTextColor="#4f4f4f"
                                style={styles.inputTextStyle}
                                keyboardType={"numeric"}
                                maxLength={7}
                                value={hips}
                                onChangeText={(hips) => this.setState({ hips })}
                            />
                            <View style={styles.unitTextStyle}><Text style={styles.textStyle}>Inches</Text></View>
                        </View>

                    <View style={{ marginTop: 20 }}></View>
                    <Text style={styles.labelText}>Calves</Text>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="0"
                                placeholderTextColor="#4f4f4f"
                                style={styles.inputTextStyle}
                                keyboardType={"numeric"}
                                maxLength={7}
                                value={calves}
                                onChangeText={(calves) => this.setState({ calves })}
                            />
                            <View style={styles.unitTextStyle}><Text style={styles.textStyle}>Inches</Text></View>
                        </View>

                    <View style={{ marginTop: 20 }}></View>
                    <Text style={styles.labelText}>Thigh</Text>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="0"
                                placeholderTextColor="#4f4f4f"
                                style={styles.inputTextStyle}
                                keyboardType={"numeric"}
                                maxLength={7}
                                value={thigh}
                                onChangeText={(thigh) => this.setState({thigh})}
                            />
                            <View style={styles.unitTextStyle}><Text style={styles.textStyle}>Inches</Text></View>
                        </View>
                    {/* <View style={styles.validationContainer}>
                        {thighValidation ?
                            <Text style={styles.validationInstruction}>Please Enter Your Thigh </Text>
                            : null}
                    </View> */}
                    {isLoading ? <OverlayLoader /> : null}
                    {currentDateData ?
                    <View style={styles.btnContainer}>
                    <CaloriesSetupBtn 
                        btnDisable={true}
                        title="Save Measurements"
                        caloriesBtnStyle={styles.disableBtn}
            
                    />
                </View>
                :
                <View style={styles.btnContainer}>
                        <CaloriesSetupBtn title="Save Measurements"
                            caloriesBtnStyle={styles.caloriesBtnStyle}
                            onPress={this.addWeight}
                        />
                    </View>
                    }
                    

                    <Toast ref="toastWithStyle"
                        style={{ backgroundColor: '#FF6200' }}
                        position={this.state.position}
                        positionValue={50}
                        fadeInDuration={750}
                        fadeOutDuration={1000}
                        opacity={0.8}
                        textStyle={{ color: 'white', }}
                    />


                    {/* <View style={styles.weightListsContainer}>
                            {filterData.length >= 0 && filterData.map((elem, key) => (
                                <View style={styles.weightListOne}>
                                    <Text style={styles.weightNumberStyle}>{elem.weight} KG</Text>
                                    <Text style={styles.weightTextStyle}>{`Weight on ${elem.day}, ${elem.month} ${elem.dayOfMonth}th`}</Text>
                                </View>
                            ))
                            }
                        </View> */}
                    {/* </View> */}
                </ScrollView>

            </View>
            </KeyboardAwareView>
        )

    }
}
export default LogMeasurementsScreen;