import React from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Picker,
    Option
} from 'react-native';

import styles from '../Styling/PackagesScreenStyle';
import AsyncStorage from '@react-native-community/async-storage';
import HttpUtilsFile from '../Services/HttpUtils';
import Toast, { DURATION } from 'react-native-easy-toast';

import CaloriesSetupBtn from '../buttons/setUpBtn';
const { heightDimension } = Dimensions.get('window').height;;

class PackagesScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            shortPrice: true,
            medical: true,
            transformation: true,
            partum: true,
            name: '',
            email: '',
            number: '',
            position: 'top',
            countryCode:'',
            PKR:false,
        }
    }

    componentWillMount() {
        const { currentName, userEmail, userNumber } = this.props.navigation.state.params;
        console.log('user data >>>', currentName)
        this.setState({
            name: currentName,
            email: userEmail,
            number: userNumber
        })
    }

    componentDidMount() {
        AsyncStorage.getItem('myProfile').then((value) => {
            let userDataB = JSON.parse(value);
            console.log('Profile Data >>', userDataB);
            if (value) {
                    const userCode = userDataB.countryCod;
                    console.log('Code >>', userCode);
                    this.setState({ countryCode: userCode },()=>{
                        if(Number(this.state.countryCode) == 92){
                            console.log('Pakistan Currency Condition ')
                          this.setState({PKR:true})
                        }
                        else {
                            console.log('USD Condition')
                            this.setState({PKR:false})
                        }
                    })
            }

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

    async sendRequestAdmin(data) {
        const { name, email, number } = this.state;

        if (data == 'Monthly Plan') {
            const userObj = {
                name: name,
                email: email,
                number: number,
                packageName: 'Monthly Plan'
            }
            console.log('user send data >>>', userObj)
            let requestData = await HttpUtilsFile.post('email', userObj);
            let userMsg = requestData.msg;
            console.log('user request data >>>', requestData);
            if (requestData.code == 200) {
                this.toastFunction(userMsg, this.state.position, DURATION.LENGTH_LONG, true);
            }
            else {
                this.toastFunction('Something went wrong', this.state.position, DURATION.LENGTH_LONG, true);
            }
        }
        else if (data == 'Medical Condition Plan') {
            const userObj = {
                name: name,
                email: email,
                number: number,
                packageName: 'Medical Condition Plan'
            }
            console.log('user send data >>>', userObj)
            let requestData = await HttpUtilsFile.post('email', userObj);
            let userMsg = requestData.msg;
            console.log('user request data >>>', requestData);
            if (requestData.code == 200) {
                this.toastFunction(userMsg, this.state.position, DURATION.LENGTH_LONG, true);
            }
            else {
                this.toastFunction('Something went wrong', this.state.position, DURATION.LENGTH_LONG, true);
            }
        }
        else if (data == 'The Transformation Plan') {
            const userObj = {
                name: name,
                email: email,
                number: number,
                packageName: 'The Transformation Plan'
            }
            console.log('user send data >>>', userObj)
            let requestData = await HttpUtilsFile.post('email', userObj);
            let userMsg = requestData.msg;
            console.log('user request data >>>', requestData);
            if (requestData.code == 200) {
                this.toastFunction(userMsg, this.state.position, DURATION.LENGTH_LONG, true);
            }
            else {
                this.toastFunction('Something went wrong', this.state.position, DURATION.LENGTH_LONG, true);
            }
        }
        else if (data == 'Post Partum Plan') {
            const userObj = {
                name: name,
                email: email,
                number: number,
                packageName: 'Post Partum Plan'
            }
            console.log('user send data >>>', userObj)
            let requestData = await HttpUtilsFile.post('email', userObj);
            let userMsg = requestData.msg;
            console.log('user request data >>>', requestData);
            if (requestData.code == 200) {
                this.toastFunction(userMsg, this.state.position, DURATION.LENGTH_LONG, true);
            }
            else {
                this.toastFunction('Something went wrong', this.state.position, DURATION.LENGTH_LONG, true);
            }
        }

        //  let data = await fetch('https://getfit-server.herokuapp.com/email')
        //  console.log(data)
        // await fetch("https://getfit-server.herokuapp.com/email", {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         userObj
        //     })
        //     //console.log()
        // }).then((response) => console.log(response.json()))
        //     .then((responseData) => {
        //         console.log(
        //             "Response Body -> " + JSON.stringify(responseData)
        //         )
        //     })

        // let requestData = await HttpUtils.post('email', userObj)
        // let requestData = await HttpUtils.post('email', userObj);


        // }
        // catch(err){
        //     console.log(err)
        // }

    }

    toggleDetail = () => {
        this.setState({
            shortPrice: !this.state.shortPrice,

        })

    }
    medicalToggel = () => {
        this.setState({
            medical: !this.state.medical,
        })
    }
    transformationToggel = () => {
        this.setState({
            transformation: !this.state.transformation,
        })
    }
    partumToggel = () => {
        this.setState({
            partum: !this.state.partum
        })
    }


    render() {
        const { shortPrice, medical, transformation, partum,PKR } = this.state;
        return (
            <ScrollView style={{ flex: 1, height: heightDimension }} contentContainerStyle={{ flexGrow: 1 }}  >
                <View style={styles.container}>
                    <View style={styles.heading}>
                        <Text style={styles.headingText}>Packages</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.monthlyPlan}
                        activeOpacity={0.6}
                        onPress={this.toggleDetail}
                    >
                        <View style={styles.plan}>
                            <Text style={styles.monthlyText}>Monthly Plan</Text>
                            {
                                shortPrice ?
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ color: '#7e7e7e', marginRight: 5 }}>Details</Text>
                                        <TouchableOpacity onPress={this.toggleDetail}>
                                            <Image source={require('../icons/dropdown-arrow.png')}
                                                style={styles.iconStyle}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <TouchableOpacity onPress={this.toggleDetail}>
                                        <Image source={require('../icons/uparrow.png')}
                                            style={styles.iconStyle}
                                        />
                                    </TouchableOpacity>
                            }

                        </View>
                        {
                            shortPrice && PKR ?
                                <Text style={styles.priceText}>Rs. PKR 6000</Text>
                                : shortPrice && !PKR ?
                                <Text style={styles.priceText}>Rs. USD 60</Text>
                                : !shortPrice && PKR ?
                                <View>
                                    <Text style={styles.detailPrice}>PKR 6000</Text>
                                    <View style={styles.instructionDetail}>
                                        <Text style={styles.instText}>- Customized meal plans</Text>
                                        <Text style={styles.instText}>- Home-based workouts</Text>
                                        <Text style={styles.instText}>- Coach support</Text>
                                    </View>

                                    <CaloriesSetupBtn title='Request This Package'
                                        caloriesBtnStyle={styles.caloriesBtnStyle}
                                        onPress={this.sendRequestAdmin.bind(this, 'Monthly Plan')}
                                    />
                                </View>
                                :
                                <View>
                                <Text style={styles.detailPrice}>USD 60</Text>
                                <View style={styles.instructionDetail}>
                                    <Text style={styles.instText}>- Customized meal plans</Text>
                                    <Text style={styles.instText}>- Home-based workouts</Text>
                                    <Text style={styles.instText}>- Coach support</Text>
                                </View>

                                <CaloriesSetupBtn title='Request This Package'
                                    caloriesBtnStyle={styles.caloriesBtnStyle}
                                    onPress={this.sendRequestAdmin.bind(this, 'Monthly Plan')}
                                />
                            </View>

                        }
                    </TouchableOpacity>

                    {/* Medical Plan Card */}

                    <TouchableOpacity
                        style={styles.monthlyPlan}
                        activeOpacity={0.6}
                        onPress={this.medicalToggel}
                    >
                        <View style={styles.plan}>
                            <Text style={styles.monthlyText}>Medical Condition Plan</Text>
                            {
                                medical ?
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ color: '#7e7e7e', marginRight: 5 }}>Details</Text>
                                        <TouchableOpacity onPress={this.medicalToggel}>
                                            <Image source={require('../icons/dropdown-arrow.png')}
                                                style={styles.iconStyle}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <TouchableOpacity onPress={this.medicalToggel}>
                                        <Image source={require('../icons/uparrow.png')}
                                            style={styles.iconStyle}
                                        />
                                    </TouchableOpacity>
                            }

                        </View>
                        {
                            medical && PKR ?
                                <Text style={styles.priceText}>Rs. PKR 8000</Text>
                                : medical && !PKR ?
                                <Text style={styles.priceText}>Rs. USD 80</Text>
                                : !medical && PKR ?
                                <View>
                                    <Text style={styles.detailPrice}>PKR 8000</Text>
                                    <View style={styles.instructionDetail}>
                                        <Text style={styles.instText}>- Exclusively for PCOs, Diabetes,Thyroid</Text>
                                        <Text style={styles.instText}>- Customized meal plans</Text>
                                        <Text style={styles.instText}>- Home-based workouts</Text>
                                        <Text style={styles.instText}>- Medical assistance</Text>
                                        <Text style={styles.instText}>- Coach support</Text>
                                    </View>

                                    <CaloriesSetupBtn title='Request This Package'
                                        caloriesBtnStyle={styles.caloriesBtnStyle}
                                        onPress={this.sendRequestAdmin.bind(this, 'Medical Condition Plan')}
                                    />
                                </View>
                                :
                                <View>
                                    <Text style={styles.detailPrice}>USD 80</Text>
                                    <View style={styles.instructionDetail}>
                                        <Text style={styles.instText}>- Exclusively for PCOs, Diabetes,Thyroid</Text>
                                        <Text style={styles.instText}>- Customized meal plans</Text>
                                        <Text style={styles.instText}>- Home-based workouts</Text>
                                        <Text style={styles.instText}>- Medical assistance</Text>
                                        <Text style={styles.instText}>- Coach support</Text>
                                    </View>

                                    <CaloriesSetupBtn title='Request This Package'
                                        caloriesBtnStyle={styles.caloriesBtnStyle}
                                        onPress={this.sendRequestAdmin.bind(this, 'Medical Condition Plan')}
                                    />
                                </View>



                        }
                    </TouchableOpacity>

                    {/* Transfermation Plan Card  */}

                    <TouchableOpacity
                        style={styles.monthlyPlan}
                        activeOpacity={0.6}
                        onPress={this.transformationToggel}
                    >
                        <View style={styles.plan}>
                            <Text style={styles.monthlyText}>The Transformation Plan</Text>
                            {
                                transformation ?
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ color: '#7e7e7e', marginRight: 5 }}>Details</Text>
                                        <TouchableOpacity onPress={this.transformationToggel}>
                                            <Image source={require('../icons/dropdown-arrow.png')}
                                                style={styles.iconStyle}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <TouchableOpacity onPress={this.transformationToggel}>
                                        <Image source={require('../icons/uparrow.png')}
                                            style={styles.iconStyle}
                                        />
                                    </TouchableOpacity>
                            }

                        </View>
                        {
                            transformation && PKR ?
                                <Text style={styles.priceText}>Rs. PKR 15000</Text>
                                : transformation && !PKR ?
                                <Text style={styles.priceText}>Rs. USD 150</Text>
                                : !transformation && PKR ?
                                <View>
                                    <Text style={styles.detailPrice}>PKR 15000</Text>
                                    <View style={styles.instructionDetail}>
                                        <Text style={{ color: '#7e7e7e', fontFamily: 'MontserratMedium', }}>Duration 3 Month</Text>
                                        <Text style={styles.instText}>- Customized meal plans</Text>
                                        <Text style={styles.instText}>- Home-based workouts</Text>
                                        <Text style={styles.instText}>- Coach support</Text>
                                    </View>

                                    <CaloriesSetupBtn title='Request This Package'
                                        caloriesBtnStyle={styles.caloriesBtnStyle}
                                        onPress={this.sendRequestAdmin.bind(this, 'The Transformation Plan')}
                                    />
                                </View>
                                :
                                <View>
                                    <Text style={styles.detailPrice}>USD 150</Text>
                                    <View style={styles.instructionDetail}>
                                        <Text style={{ color: '#7e7e7e', fontFamily: 'MontserratMedium', }}>Duration 3 Month</Text>
                                        <Text style={styles.instText}>- Customized meal plans</Text>
                                        <Text style={styles.instText}>- Home-based workouts</Text>
                                        <Text style={styles.instText}>- Coach support</Text>
                                    </View>

                                    <CaloriesSetupBtn title='Request This Package'
                                        caloriesBtnStyle={styles.caloriesBtnStyle}
                                        onPress={this.sendRequestAdmin.bind(this, 'The Transformation Plan')}
                                    />
                                </View>




                        }
                    </TouchableOpacity>

                    {/* Post Partum Plan Card*/}

                    <TouchableOpacity
                        style={styles.monthlyPlan}
                        activeOpacity={0.6}
                        onPress={this.partumToggel}
                    >
                        <View style={styles.plan}>
                            <Text style={styles.monthlyText}>Post Partum Plan</Text>
                            {
                                partum ?
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ color: '#7e7e7e', marginRight: 5 }}>Details</Text>
                                        <TouchableOpacity onPress={this.partumToggel}>
                                            <Image source={require('../icons/dropdown-arrow.png')}
                                                style={styles.iconStyle}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <TouchableOpacity onPress={this.partumToggel}>
                                        <Image source={require('../icons/uparrow.png')}
                                            style={styles.iconStyle}
                                        />
                                    </TouchableOpacity>
                            }

                        </View>
                        {
                            partum && PKR ?
                                <Text style={styles.priceText}>Rs. PKR 10000</Text>
                                : partum && !PKR ?
                                <Text style={styles.priceText}>Rs. USD 100</Text>
                                : !partum && PKR ?
                                <View>
                                    <Text style={styles.detailPrice}>PKR 10000</Text>
                                    <View style={styles.instructionDetail}>
                                        <Text style={styles.instText}>- Exclusively for post partum{"\n"}(post pregnancy) women.</Text>
                                        <Text style={styles.instText}>- Customized meal plans</Text>
                                        <Text style={styles.instText}>- Home-based workouts</Text>
                                        <Text style={styles.instText}>- Medical assistance</Text>
                                        <Text style={styles.instText}>- Coach support</Text>
                                    </View>

                                    <CaloriesSetupBtn title='Request This Package'
                                        caloriesBtnStyle={styles.caloriesBtnStyle}
                                        onPress={this.sendRequestAdmin.bind(this, 'Post Partum Plan')}
                                    />
                                </View>
                                :

                                  <View>
                                    <Text style={styles.detailPrice}>USD 100</Text>
                                    <View style={styles.instructionDetail}>
                                        <Text style={styles.instText}>- Exclusively for post partum{"\n"}(post pregnancy) women.</Text>
                                        <Text style={styles.instText}>- Customized meal plans</Text>
                                        <Text style={styles.instText}>- Home-based workouts</Text>
                                        <Text style={styles.instText}>- Medical assistance</Text>
                                        <Text style={styles.instText}>- Coach support</Text>
                                    </View>

                                    <CaloriesSetupBtn title='Request This Package'
                                        caloriesBtnStyle={styles.caloriesBtnStyle}
                                        onPress={this.sendRequestAdmin.bind(this, 'Post Partum Plan')}
                                    />
                                </View>


                        }
                    </TouchableOpacity>

                </View>
                <Toast ref="toastWithStyle"
                    style={{ backgroundColor: '#FF6200' }}
                    position={this.state.position}
                    positionValue={50}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{ color: 'white' }}
                />
                <View style={{ marginBottom: 15 }}>

                </View>
            </ScrollView>
        )
    }
}

export default PackagesScreen;