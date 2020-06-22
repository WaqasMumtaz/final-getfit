import React from 'react';
import {
    Alert, StyleSheet,
    Image, Text, View,
    ScrollView, Dimensions,
    TextInput, Picker, TouchableOpacity, Platform
} from 'react-native';
import styles from '../Styling/PaymentScreenStyle';
import CaloriesSetupBtn from '../buttons/setUpBtn';
// import stripe from 'tipsi-stripe';
// import { CreditCardInput } from "react-native-credit-card-input";
import HttpUtils from '../Services/HttpUtils';
import Modal from "react-native-modal";
import OverlayLoader from '../Loader/OverlaySpinner';
import Toast, { DURATION } from 'react-native-easy-toast';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
const CryptoJS = require('crypto-js');
import { Dropdown } from 'react-native-material-dropdown';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view';
import DatePicker from 'react-native-datepicker';
import Spinner from 'react-native-loading-spinner-overlay';




const { height } = Dimensions.get('window');


class Payment extends React.Component {
    static navigationOptions = (navigation) => {
        // stripe.setOptions({
        //     publishableKey: navigation.navigation.state.params.stripeKey
        // });
        const { navigate } = navigation.navigation.navigate
        return {
            headerStyle: {
                backgroundColor: 'white'
            },
            headerTintColor: 'gray',
        }

    }
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            paymentMonth: '',
            amount: '',
            creditCardNo: "",
            cvc: "",
            expiry: "",
            typeCard: "",
            currency: '',
            monthArr: ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            nameValidation: false,
            emailValidation: false,
            // paymentMonth: false,
            amountValidation: false,
            currencyValidation: false,
            isVisibleModal: false,
            btnDisable: false,
            dataSubmit: false,
            isLoading: false,
            uploading: false,
            imgLoading: false,
            position: 'top',
            creditScreen: true,
            buttonActive: true,
            otherScreen: false,
            otherSevicesBtnActive: false,
            receiptImg: '',
            serviceValidation: "other",
            transactionIdValidation: false,
            serviceNameValidation: false,
            receiptImgValidation: false,
            transactionId: '',
            userId: '',
            serviceName: '',
            countryCode: '',
            date: ''
        }
    }
    componentWillMount() {
        let monthNo = new Date().getMonth();
        console.log('mont No >>>', monthNo)
        const date = new Date().getDate();
        const year = new Date().getFullYear();
        if (monthNo == 1 || monthNo == 2 || monthNo == 3 || monthNo == 4 || monthNo == 5 || monthNo == 6 || monthNo == 7 || monthNo == 8 || monthNo == 9) {
            month = `${monthNo + 1}`;
        }
        else {
            month = monthNo + 1;
        }

        AsyncStorage.getItem('currentUser').then((value) => {
            let userData = JSON.parse(value)
            console.log(userData, 'userDatas')
            this.setState({
                date: date + '-' + month + '-' + year,
                userId: userData._id
            })
        })

    }
    componentDidMount() {
        AsyncStorage.getItem('myProfile').then((value) => {
            let userDataB = JSON.parse(value);
            // console.log('Profile Data >>', userDataB);
            const userCode = userDataB.countryCod;
            // console.log('Code >>', userCode);
            this.setState({ countryCode: userCode }, () => {
                if (Number(this.state.countryCode) == 92) {
                    // console.log('Pakistan Currency Condition ')
                    this.setState({ currency: 'PKR' })
                }
                else {
                    // console.log('USD Condition')
                    this.setState({ currency: 'USD' })
                }
            })
        })
    }

    cardDetail = (e) => {
        if (e.status.number == "invalid" || e.status.expiry == 'invalid' || e.status.cvc == 'invalid',
            e.status.number == "incomplete" || e.status.expiry == 'incomplete' || e.status.cvc == 'incomplete') {
            this.setState({
                btnDisable: true
            })

        }
        else if (e.status.number == 'valid' && e.status.expiry == 'valid' && e.status.cvc == 'valid' && e.valid == true) {
            this.setState({
                creditCardNo: e.values.number,
                cvc: e.values.cvc,
                expiry: e.values.expiry,
                typeCard: e.values.type,
                btnDisable: false
            })
        }
    }
    pay = async () => {
        const { name, email, monthArr, paymentMonth, amount, currency, creditCardNo, cvc, expiry, typeCard,
            isLoading, serviceValidation, userId, serviceName, transactionId, date, receiptImg, receiptImgValidation } = this.state;
        //validation of the form
        // if (serviceValidation == "credit card") {
        //   console.log("credit card console")
        //   if (name == '') {
        //     this.setState({
        //       nameValidation: true,
        //       isLoading: false,
        //     })
        //   }
        //   else {
        //     this.setState({
        //       nameValidation: false,
        //       isLoading: true,
        //     })
        //   }
        //   if (email == '') {
        //     this.setState({
        //       emailValidation: true,
        //       isLoading: false,
        //     })
        //   }
        //   else {
        //     this.setState({
        //       emailValidation: false,
        //       isLoading: true,
        //     })
        //   }
        //   if (paymentMonth == '') {
        //     this.setState({
        //       paymentMonthValidation: true,
        //       isLoading: false,
        //     })
        //   }
        //   else {
        //     this.setState({
        //       paymentMonthValidation: false,
        //       isLoading: true,
        //     })
        //   }
        //   if (amount == '') {
        //     this.setState({
        //       amountValidation: true,
        //       isLoading: false,
        //     })
        //   }
        //   else {
        //     this.setState({
        //       amountValidation: false,
        //       isLoading: true,
        //     })
        //   }
        //   if (currency == '') {
        //     this.setState({
        //       currencyValidation: true,
        //       isLoading: false,
        //     })
        //   }
        //   else {
        //     this.setState({
        //       currencyValidation: false,
        //       isLoading: true,
        //     })
        //   }
        // }
        //if (serviceValidation == "other") {
        console.log('condition true')
        //get current year
        const year = new Date().getFullYear();
        // //geting payment month & year
        let monthNumber = Number(paymentMonth)
        let paymentMonthYear = `${monthArr[monthNumber]}, ${year}`
        if (serviceName == '') {
            this.setState({
                serviceNameValidation: true,
                isLoading: false,
            })
        }
        else {
            this.setState({
                serviceNameValidation: false,
                isLoading: true,
            })
        }
        if (email == '') {
            this.setState({
                emailValidation: true,
                isLoading: false,
            })
        }
        else {
            this.setState({
                emailValidation: false,
                isLoading: true,
            })
        }
        if (paymentMonth == '') {
            this.setState({
                paymentMonthValidation: true,
                isLoading: false,
            })
        }
        else {
            this.setState({
                paymentMonthValidation: false,
                isLoading: true,
            })
        }
        if (amount == '') {
            this.setState({
                amountValidation: true,
                isLoading: false,
            })
        }
        else {
            this.setState({
                amountValidation: false,
                isLoading: true,
            })
        }
        if (currency == '') {
            this.setState({
                currencyValidation: true,
                isLoading: false,
            })
        }
        else {
            this.setState({
                currencyValidation: false,
                isLoading: true,
            })
        }
        if (date == '') {
            this.setState({
                transactionIdValidation: true,
                isLoading: false,
            })
        }
        else {
            this.setState({
                transactionIdValidation: false,
                isLoading: true,
            })
        }
        if (receiptImg == '') {
            this.setState({
                receiptImgValidation: true,
                isLoading: false
            })
        }
        else {
            this.setState({
                receiptImgValidation: false,
                isLoading: true
            })
        }
        if (serviceName != '' && email != '' && paymentMonth != '' && amount !=
            '' && currency != '' && date != '' && receiptImg != '') {
            // console.log('data if condition work fine')
            let paymentObj = {
                serviceName: serviceName,
                email: email,
                paymentMonth: paymentMonthYear,
                amount: amount,
                currency: currency,
                // transactionId: transactionId,
                date: date,
                receiptImg: receiptImg,
                userId: userId
            }
            console.log('Payment Object >>', paymentObj);
            let res = await HttpUtils.post('otherpayment', paymentObj);
            console.log('payment object >>', res)
            if (res.code == 200) {
                this.setState({
                    isLoading: false,
                    imgLoading: false,
                    dataSubmit: true,
                    isVisibleModal: true,
                    serviceName: '',
                    email: '',
                    paymentMonth: '',
                    amount: '',
                    currency: '',
                    // transactionId: '',
                    date: '',
                    receiptImg: ''
                }, () => {
                    this.toastFunction(`Successfully Submit Payment`, this.state.position, DURATION.LENGTH_LONG, true)
                })
            }
            else {
                this.setState({
                    isLoading: false,
                    imgLoading: false,
                    serviceName: '',
                    email: '',
                    paymentMonth: '',
                    amount: '',
                    currency: '',
                    transactionId: '',
                    receiptImg: ''
                }, () => {
                    this.toastFunction(`Some thing went wrong of ${res.error}`, this.state.position, DURATION.LENGTH_LONG, true)
                })
            }
        }
        else {
            alert('Please insert all fields')
            // console.log('Esle Condition Work Because Image Is Undefined')
            this.setState({
                isLoading: false,
                serviceName: '',
                email: '',
                paymentMonth: '',
                amount: '',
                currency: '',
                // transactionId: '',
                receiptImg: '',
                date: ''
            })

        }

        //  }



        // if (serviceValidation == "credit card") {
        //   //seprate month & year for create token request
        //   let expMonth = Number(expiry.slice(0, 2));
        //   let expYear = Number(expiry.slice(3, 5));
        //   //object for create token
        //   const params = {
        //     // mandatory
        //     number: creditCardNo,
        //     expMonth: expMonth,
        //     expYear: expYear,
        //     cvc: cvc,
        //     typeCard: typeCard,
        //   }
        //   if (params.number != '') {
        //     this.setState({
        //       isLoading: true
        //     })
        //   }
        //   const token = await stripe.createTokenWithCard(params)
        //   // send object to database
        //   let paymentObj = {
        //     name: name,
        //     email: email,
        //     paymentMonth: paymentMonthYear,
        //     amount: amount,
        //     currency: currency,
        //     token: token.tokenId,
        //     userId: userId
        //   }
        //   res = await HttpUtils.post('payment', paymentObj);
        // }
        // else if(serviceValidation == "other"){
        // other screen data send on api

    }

    updateCurrency = (e) => {
        this.setState({
            currency: e
        })
    }

    updateServiceName = (e) => {
        // console.log(e)
        this.setState({
            serviceName: e
        })
    }
    backToPage = () => {
        const { dataSubmit } = this.state;
        const { navigate } = this.props.navigation;
        if (dataSubmit) {
            this.setState({
                dataSubmit: false,
                isVisibleModal: false
            })
            navigate('Homescreen');
        }
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

    toggelScreen(event) {
        if (event == 'credit card') {
            this.setState({
                creditScreen: true,
                buttonActive: true,
                otherScreen: false,
                otherSevicesBtnActive: false,
                serviceValidation: event
            })
        }
        else if (event == 'other') {
            this.setState({
                creditScreen: false,
                buttonActive: false,
                otherScreen: true,
                otherSevicesBtnActive: true,
                serviceValidation: event
            })
        }
    }
    choosePhotoFunc = () => {
        const options = {
            noData: true,
            mediaType: 'photo'
        }
        if (Platform.OS === 'android') {
            ImagePicker.showImagePicker(options, async (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                }
                else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                }
                else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                }
                else {
                    console.log('Image Local file >>', response);
                    this.setState({
                        uploading: true,
                        imgLoading: true
                    })
                    let timestamp = (Date.now() / 1000 | 0).toString();
                    let api_key = '878178936665133'
                    let api_secret = 'U8W4mHcSxhKNRJ2_nT5Oz36T6BI'
                    let cloud = 'dxk0bmtei'
                    let hash_string = 'timestamp=' + timestamp + api_secret
                    let signature = CryptoJS.SHA1(hash_string).toString();
                    let upload_url = 'https://api.cloudinary.com/v1_1/' + cloud + '/upload'
                    let xhr = new XMLHttpRequest();
                    xhr.open('POST', upload_url);
                    xhr.onload = () => {
                        let uploadData = JSON.parse(xhr._response)
                        console.log('Receipt IMG Data >>', uploadData);
                        console.log('Upload Imag Error >>', uploadData.error);
                        if (uploadData.error) {
                            this.setState({
                                uploading: false,
                                imgLoading: false
                            })
                            Alert.alert(`${uploadData.error.message}`)
                        }
                        else {
                            this.setState({
                                uploading: false,
                                imgLoading: false,
                                receiptImg: uploadData.secure_url
                            })
                        }

                    };
                    let formdata = new FormData();
                    formdata.append('file', { uri: response.uri, type: response.type, name: response.fileName });
                    formdata.append('timestamp', timestamp);
                    formdata.append('api_key', api_key);
                    formdata.append('signature', signature);
                    xhr.send(formdata);
                    // You can also display the image using data:
                    this.setState({
                        attachOrange: true,
                        shareFiles: true
                    });
                }
            })

        }

        else if (Platform.OS === 'ios') {
            ImagePicker.showImagePicker(options, async (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                }
                else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                }
                else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                }
                else {

                    let path = response.uri;
                    path = "~" + path.substring(path.indexOf("/Documents"));
                    if (!response.fileName) {
                        response.fileName = path.split("/").pop();
                        // console.log('Image Local file >>', response);

                    }
                    this.setState({
                        uploading: true,
                        imgLoading: true
                    })
                    let timestamp = (Date.now() / 1000 | 0).toString();
                    let api_key = '878178936665133'
                    let api_secret = 'U8W4mHcSxhKNRJ2_nT5Oz36T6BI'
                    let cloud = 'dxk0bmtei'
                    let hash_string = 'timestamp=' + timestamp + api_secret
                    let signature = CryptoJS.SHA1(hash_string).toString();
                    let upload_url = 'https://api.cloudinary.com/v1_1/' + cloud + '/upload'
                    let xhr = new XMLHttpRequest();
                    xhr.open('POST', upload_url);
                    xhr.onload = () => {
                        let uploadData = JSON.parse(xhr._response)
                        // console.log('Receipt IMG Data >>', uploadData);
                        // console.log('Upload Imag Error >>', uploadData.error);
                        if (uploadData.error) {
                            this.setState({
                                uploading: false,
                                imgLoading: false
                            }, () => {
                                Alert.alert(`${uploadData.error.message}`)
                            })
                        }
                        else {
                            this.setState({
                                uploading: false,
                                imgLoading: false,
                                receiptImg: uploadData.secure_url
                            })
                        }

                    };
                    let formdata = new FormData();
                    formdata.append('file', { uri: response.uri, type: response.type, name: response.fileName });
                    formdata.append('timestamp', timestamp);
                    formdata.append('api_key', api_key);
                    formdata.append('signature', signature);
                    xhr.send(formdata);
                    // You can also display the image using data:
                    this.setState({
                        attachOrange: true,
                        shareFiles: true
                    });
                }
            })

        }

    }

    render() {
        const {
            nameValidation,
            emailValidation,
            paymentMonthValidation,
            amountValidation,
            currencyValidation,
            currency,
            btnDisable,
            dataSubmit,
            isLoading,
            creditScreen,
            buttonActive,
            otherScreen,
            otherSevicesBtnActive,
            receiptImg,
            serviceNameValidation,
            transactionIdValidation,
            receiptImgValidation,
            serviceValidation,
            email,
            paymentMonth,
            amount,
            transactionId,
            countryCode,
            date,
            uploading
        } = this.state;
        // console.log('Date >>', date);
        // console.log('countryCode >>', countryCode , 'currency name >>',currency);

        return (
            <KeyboardAwareView animated={true}>
                <View style={styles.mainContainer}>
                    <ScrollView style={{ backgroundColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingStyle}>
                                Upload Receipt
            </Text>
                        </View>
                        {/* <View style={styles.toggelBtnContainer}>
            <TouchableOpacity style={[creditScreen == true &&
              buttonActive == true
              ? styles.payScreenOneBtn : styles.unActiveBtnStyle]}
              activeOpacity={0.6}
              onPress={this.toggelScreen.bind(this, 'credit card')}
            >
              <Text style={[creditScreen == true &&
                buttonActive == true ? styles.textStyleOne : styles.unActiveTextStyle]}>Credit Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[otherSevicesBtnActive ==
              false &&
              otherScreen == false
              ?
              styles.unActiveBtnStyle : styles.payScreenTwoBtn]} activeOpacity={0.6}
              onPress={this.toggelScreen.bind(this, 'other')}>
              <Text style={[
                otherSevicesBtnActive == false &&
                  otherScreen == false
                  ?
                  styles.unActiveTextStyle : styles.textStyleOne]}>Others</Text>
            </TouchableOpacity>
          </View> */}


                        {/* {
          creditScreen ? <View>
            <View style={styles.paraTextContainer}>
              <Text style={styles.inputLabelsStyle}>Enter your credit/debit card details below to pay for your subscription.</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.inputLabelsStyle}>Name</Text>
              <TextInput
                placeholder="Name"
                style={styles.inputTextStyle}
                placeholderColor="#4f4f4f"
                onChangeText={(name) => this.setState({ name })}
              />
            </View>
            <View>
              {nameValidation ?
                <View>
                  <Text>
                    Please fill your name
                  </Text>
                </View>
                : null}
            </View>
            <View style={styles.emailContainer}>
              <Text style={styles.inputLabelsStyle}>Email</Text>
              <TextInput placeholder="email@gmail.com"
                style={styles.inputTextStyle}
                keyboardType="email-address"
                placeholderColor="#4f4f4f"
                onChangeText={(email) => this.setState({ email })}
              />
            </View>
            <View>
              {emailValidation ?
                <View>
                  <Text>
                    Please fill your email
                  </Text>
                </View>
                : null}
            </View>
            <View style={styles.paymentMonthContainer}>
              <Text style={styles.inputLabelsStyle}>Payment For The Month Of</Text>
              <TextInput placeholder="01"
                style={styles.inputTextStyle}
                keyboardType={"numeric"}
                placeholderColor="#4f4f4f"
                onChangeText={(paymentMonth) => this.setState({ paymentMonth })}
              />
            </View>
            <View>
              {paymentMonthValidation ?
                <View>
                  <Text>
                    Please fill payment month no:
                  </Text>
                </View>
                : null}
            </View>
            <View style={styles.amountContainer}>
              <Text style={styles.inputLabelsStyle}>Amount</Text>
              <TextInput placeholder="USD amount"
                style={styles.inputTextStyle}
                keyboardType={"numeric"}
                placeholderColor="#4f4f4f"
                onChangeText={(amount) => this.setState({ amount })}
              />
              <Picker
                selectedValue={this.state.currency}
                onValueChange={this.updateCurrency}
              // style={styles.pickerStyle}
              >
                <Picker.Item label='Select an currency...' value='0' />
                <Picker.Item label="USD" value="usd" />
              </Picker>
            </View>
            <View>
              {amountValidation ?
                <View>
                  <Text>
                    Please fill amount
                  </Text>
                </View>
                : null}
            </View>
            <View>
              {currencyValidation ?
                <View>
                  <Text>
                    Please fill currency
                  </Text>
                </View>
                : null}
            </View>
            {/* <View style={styles.cardContainer}> */}
                        {/* <View style={{ marginTop: 15 }}></View>
            <CreditCardInput
              onChange={this.cardDetail}
              allowScroll={true}
            />
            {/* </View> */}

                        {/* loader show */}
                        {/* {isLoading ? <OverlayLoader /> : null} */}
                        {/* payment succesfully show modal */}
                        {/* {dataSubmit ?
              <Modal
                isVisible={this.state.isVisibleModal}
                animationIn='zoomIn'
                //animationOut='zoomOutDown'
                backdropOpacity={0.8}
                backdropColor='white'
                coverScreen={true}
                animationInTiming={800}
                animationOutTiming={500}
              >
                <View style={styles.cardContainer}>
                  <View style={styles.dateWithCancelIcon}>
                    <Text style={{ color: '#000000', fontSize: 18 }}>Data has been submitted successfully</Text>
                    <TouchableOpacity onPress={this.backToPage} activeOpacity={0.6}>
                      <Image source={require('../icons/cancel.png')} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                    <Image source={require('../icons/green-check-mark.gif')} style={styles.forImages} resizeMode='contain' />
                  </View>
                </View>
              </Modal>
              :
              null
            } */}
                        {/* in case error of payment stripe the show toast */}
                        {/* <Toast ref="toastWithStyle"
              style={{ backgroundColor: '#FF6200' }}
              position={this.state.position}
              positionValue={50}
              fadeInDuration={750}
              fadeOutDuration={1000}
              opacity={0.8}
              textStyle={{ color: 'white', fontFamily: 'MontserratLight', }}
            />
          </View>  */}

                        {/* :  */}

                        <View>
                            <View style={styles.paraTextContainer}>
                                <Text style={styles.inputLabelsStyle}>Enter your transaction details below to complete your payment.</Text>
                            </View>
                            <View style={styles.nameContainer}>
                                <Text style={styles.inputLabelsStyle}>Sevice Name</Text>
                                <View style={styles.iosPicker}>
                                    <Dropdown
                                        // label='Select an option..'
                                        value={this.state.serviceName}
                                        data={[{
                                            value: 'Western Union',
                                        }, {
                                            value: 'Easypaisa',
                                        }, {
                                            value: 'Monygram',
                                        }, {
                                            value: 'JazzCash',
                                        }, {
                                            value: 'Omni'
                                        },
                                        {
                                            value: 'Other'
                                        }
                                        ]}
                                        dropdownOffset={{ top: 8, left: 0 }}
                                        onChangeText={this.updateServiceName}

                                    />
                                </View>
                                {/* <Picker
                selectedValue={this.state.serviceName}
                onValueChange={this.updateServiceName}
                style={{ backgroundColor: '#e5e5e5', height: 40, fontFamily: 'MontserratLight' }}
              >
                <Picker.Item label='Select a service...' color='gray' value='0' />
                <Picker.Item label="Easy Piasa" value="Easypaisa" />
                <Picker.Item label="Mobi Cash" value="Mobicash" />
                <Picker.Item label="Ubl Omni" value="Ublomni" />
                <Picker.Item label="Cheque" value="Cheque" />
                <Picker.Item label="Other" value="Other" />
              </Picker> */}
                            </View>
                            <View>
                                {serviceNameValidation ?
                                    <View>
                                        <Text style={styles.validationInstruction}>
                                            Please select service name
                  </Text>
                                    </View>
                                    : null}
                            </View>
                            <View style={styles.emailContainer}>
                                <Text style={styles.inputLabelsStyle}>Email</Text>
                                <TextInput placeholder="email@gmail.com"
                                    style={styles.inputTextStyle}
                                    keyboardType="email-address"
                                    placeholderColor="#4f4f4f"
                                    autoCapitalize="none"
                                    value={email}
                                    onChangeText={(email) => this.setState({ email })}
                                />
                            </View>
                            <View>
                                {emailValidation ?
                                    <View>
                                        <Text style={styles.validationInstruction}>
                                            Please fill your email
                  </Text>
                                    </View>
                                    : null}
                            </View>
                            <View style={styles.paymentMonthContainer}>
                                <Text style={styles.inputLabelsStyle}>Payment For The Month Of</Text>
                                <TextInput placeholder="e.g sep."
                                    style={styles.inputTextStyle}
                                    keyboardType={"numeric"}
                                    placeholderColor="#4f4f4f"
                                    value={paymentMonth}
                                    onChangeText={(paymentMonth) => this.setState({ paymentMonth })}
                                />
                            </View>
                            <View>
                                {paymentMonthValidation ?
                                    <View>
                                        <Text style={styles.validationInstruction}>
                                            Please fill payment month no:
                                 </Text>
                                    </View>
                                    : null}
                            </View>
                            <View style={styles.amountContainer}>
                                <Text style={{ color: '#4f4f4f', marginTop: 2 }}>Your currency is:</Text>
                                <View style={styles.iosPicker}>
                                    {Number(countryCode) == 92 ?
                                        <Text style={{ marginLeft: 12, marginTop: 10 }}>
                                            PKR
                                       </Text>
                                        :
                                        <Text style={{ marginLeft: 12, marginTop: 10 }}>
                                            USD
                                        </Text>
                                    }

                                    {/* <Dropdown
                                    // label='Select an option..'
                                    value={this.state.currency}
                                    data={[{
                                        value: 'pkr',
                                    }, {
                                        value: 'usd',
                                    }]}
                                    dropdownOffset={{ top: 8, left: 0 }}
                                    onChangeText={this.updateCurrency}

                                /> */}
                                </View>
                                <View style={{ marginTop: 18 }}>
                                    <Text style={styles.inputLabelsStyle}>Amount</Text>
                                </View>
                                <View>
                                    <TextInput placeholder="enter your amount"
                                        style={styles.inputTextStyle}
                                        keyboardType={"numeric"}
                                        placeholderColor="#4f4f4f"
                                        value={amount}
                                        onChangeText={(amount) => this.setState({ amount })}
                                    />
                                </View>
                                <View>
                                    {amountValidation ?
                                        <View>
                                            <Text style={styles.validationInstruction}>
                                                Please fill amount
                                     </Text>
                                        </View>
                                        : null}
                                </View>
                            </View>

                            {/* <View>
                                {currencyValidation ?
                                    <View>
                                        <Text style={styles.validationInstruction}>
                                            Please select currency
                                     </Text>
                                    </View>
                                    : null}
                            </View> */}
                            <View style={styles.amountContainer}>
                                <Text style={styles.inputLabelsStyle}>Transaction Date:</Text>
                                {/* <TextInput placeholder="e.g xxxx xxxx xxxx"
                                    style={styles.inputTextStyle}
                                    keyboardType={"numeric"}
                                    placeholderColor="#4f4f4f"
                                    value={transactionId}
                                    onChangeText={(transactionId) => this.setState({ transactionId })}
                                /> */}
                                <DatePicker
                                    style={{ width: 200 }}
                                    date={date} //initial date from state
                                    mode="date" //The enum of date, datetime and time
                                    placeholder="select date"
                                    placeholderTextColor="#7e7e7e"
                                    format="DD-MM-YYYY"
                                    minDate="01-01-1950"
                                    maxDate={date}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            width: 0,
                                            height: 0,
                                        },
                                        dateInput: {
                                            backgroundColor: 'white',
                                            //opacity:0.4
                                            color: 'black'
                                        }
                                    }}
                                    onDateChange={(date) => { this.setState({ date }) }}
                                />

                            </View>
                            <View>
                                {transactionIdValidation ?
                                    <View>
                                        <Text style={styles.validationInstruction}>
                                            Please fill Transaction Date
                  </Text>
                                    </View>
                                    : null}
                            </View>
                            <View style={styles.fileUploadContainer}>
                                <TouchableOpacity style={styles.fileRecipet}>
                                    {console.log('receipt img >>', receiptImg)}
                                    {receiptImg == '' ?
                                        <Text style={styles.textStyle}>Upload Receipt</Text>
                                        :
                                        <Image source={{ uri: `${receiptImg}` }} style={styles.reciptImg} />
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.imgFile} onPress={this.choosePhotoFunc}>
                                    <Text style={styles.textStyle}>Upload Photo</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                {receiptImgValidation ?
                                    <View>
                                        <Text style={styles.validationInstruction}>
                                            Please upload image
                  </Text>
                                    </View>
                                    : null}
                            </View>
                            {/* <View style={styles.cardContainer}>
              <CreditCardInput
                onChange={this.cardDetail}
              />
            </View> */}

                            {/* loader show */}
                            {isLoading ? <OverlayLoader /> : null}
                            {this.state.uploading == true ?
                                <View style={styles.spinnerContainer}>
                                    <Spinner
                                        //visibility of Overlay Loading Spinner
                                        visible={this.state.imgLoading}
                                        //Text with the Spinner 
                                        textContent={'Uploading image ...'}
                                        //Text style of the Spinner Text
                                        textStyle={styles.spinnerTextStyle}
                                        color={'#FF6200'}

                                    />
                                </View>
                                : null
                            }

                            {/* payment succesfully show modal */}
                            {dataSubmit ?
                                <Modal
                                    isVisible={this.state.isVisibleModal}
                                    animationIn='zoomIn'
                                    animationOut='zoomOutDown'
                                    backdropOpacity={0.8}
                                    backdropColor='white'
                                    coverScreen={true}
                                    animationInTiming={300}
                                    animationOutTiming={100}
                                    onBackdropPress={() => this.setState({ isVisibleModal: false })}
                                >
                                    <View style={styles.modalCardContainer}>
                                        <View style={styles.dateWithCancelIcon}>
                                            <Text style={{ color: '#000000', fontSize: 18 }}>Data has been submitted successfully</Text>
                                            {/* <TouchableOpacity onPress={this.backToPage} activeOpacity={0.6}>
                        <Image source={require('../icons/cancel.png')} />
                      </TouchableOpacity> */}
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                                            <Image source={require('../icons/green-check-mark.gif')} style={styles.forImages}
                                                resizeMode='contain' />
                                        </View>
                                    </View>
                                </Modal>
                                :
                                null
                            }
                            {/* in case error of payment stripe the show toast */}
                            <Toast ref="toastWithStyle"
                                style={{ backgroundColor: '#FF6200' }}
                                position={this.state.position}
                                positionValue={50}
                                fadeInDuration={750}
                                fadeOutDuration={1000}
                                opacity={0.8}
                                textStyle={{ color: 'white' }}
                            />
                        </View>
                        {/* } */}
                        <View style={styles.btnContainer}>
                            <CaloriesSetupBtn title='Submit'
                                btnDisable={btnDisable}
                                onPress={this.pay}
                                caloriesBtnStyle={styles.caloriesBtnStyle}
                                caloriesBtnStyleDisabled={styles.caloriesBtnStyleDisabled} />
                        </View>
                        <View style={styles.blankContainer}>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAwareView>
        )
    }
}

export default Payment;