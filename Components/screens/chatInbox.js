import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native';
import styles from '../Styling/ChatScreenStyle';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from "react-native-modal";
import HttpUtils from '../Services/HttpUtils';
console.ignoredYellowBox = ['Remote debugger'];
import { YellowBox, PermissionsAndroid } from 'react-native';
console.disableYellowBox = true;
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);
import firebase from '../../Config/Firebase';
import 'firebase/firestore';
import { FilterType } from 'react-native-video';
import moment from 'moment';

const db = firebase.database();

// let counter = 0;
// let userNamesData = [];

class ChatInbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageUser: [],
            forTrainnerModal: false,
            currentName: '',
            userEmail: '',
            userNumber: '',
            chatMessages: '',
            opponentId: '',
            currentUserId: '',
            monthName: ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            newMessage: [],
            todayDate:'',
            yesterdayDate:''
        }
        this.checkTrainy()
    }


    // async componentWillMount() {
        

    // }

    chatInboxFunction= async ()=>{
        let date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        if (month == 1 || month == 2 || month == 3 || month == 4 || month == 5 || month == 6 || month == 7 || month == 8 || month == 9) {
            month = `0${month}`
        }
        if (date == 1 || date == 2 || date == 3 || date == 4 || date == 5 || date == 6 || date == 7 || date == 8 || date == 9) {
            date = `0${date}`
        }

        // console.log(time, 'time with am or pm')
        let yesterdayDate = Number(date) - 1;
        this.setState({
            todayDate: month + '-' + date + '-' + year,
            yesterdayDate: month + '-' + yesterdayDate.toString() + '-' + year,

        })

        let userData;
        let userNamesData = [];
        // let userMessages = [];
        // let userDataWithMesg = [];
        // let sentArray = [];
        let currentUserId;
        await AsyncStorage.getItem("currentUser").then(value => {
            let localStorageData = JSON.parse(value);
            currentUserId = localStorageData._id;
            this.setState({ currentUserId })

        })

        // console.log('Will Mount User Id >>', currentUserId);
        await AsyncStorage.getItem('opponentProfile').then((value) => {
            userData = JSON.parse(value);
            // userData.count = 0;
            //  console.log('Asyncstorage >>',userData);

        })



        // console.log('opponent data chatbox >>>', userData)
        await db.ref('users').on("value", snapshot => {
            let data = snapshot.val();
            // console.log('data snapshot >>', data)
            for (var i in userData) {
                //  console.log('User Data >>', userData[i])
                for (var j in data) {
                    if (userData[i].userId == data[j]._id) {
                        userData[i].status = data[j].status;
                        // userData[i].time = userMgs[i].time;
                        // if (userNamesData) {
                        //     userNamesData = []
                        // }

                        userNamesData.push(userData[i])
                        // console.log(userNamesData, 'data')
                    }
                }
            }
            // console.log('UserNames Data >>',userNamesData)

        });
        this.getUsersLastMgs(userNamesData, currentUserId)

    }

    getUsersLastMgs = async (userNamesData, currentUserId) => {
        let userMgs = [];
        let userMessageAndNameData = [];
        await db.ref('chatRoom').on("value", snapshot => {
            let data = snapshot.val();


            for (var i in userNamesData) {

                let userAllData = userNamesData[i];
                let counter = 0
                let sentMsgsArray;

                for (var j in data) {
                    let firbaseData = data[j];
                    if (firbaseData.reciverId == currentUserId && firbaseData.senderId == userAllData.userId) {
                        sentMsgsArray = firbaseData;

                        if (firbaseData.status == 'sent' || firbaseData.status == 'delivered') {
                            //  console.log(firbaseData ,'sent status messages opponent' , j , 'iteration')
                            counter = counter + 1;
                        }
                        if (firbaseData.status == 'sent') {
                            firbaseData.status = 'delivered'
                            db.ref(`chatRoom/${j}`).update(firbaseData);
                            // console.log(j, 'j iteration')

                        }

                    }

                    if (firbaseData.senderId == currentUserId && firbaseData.reciverId == userAllData.userId) {
                        firbaseData.currentUser = true

                        sentMsgsArray = firbaseData;
                        // if (firbaseData.type == 'text') {
                        //     userAllData.message = firbaseData.message
                        //     userData.push(userAllData)
                        // }
                        // else if (firbaseData.type == 'image') {
                        //     userAllData.message = 'Photo'
                        //     userData.push(userAllData)
                        // }
                    }

                }
                //  console.log(counter , 'counter messages')
                sentMsgsArray.counter = counter;
                // console.log(sentMsgsArray, 'sent message arr')
                userMgs.push(sentMsgsArray)

            }


            for (var i = 0; i < userNamesData.length; i++) {
                userNamesData[i].time = userMgs[i].time;
                userNamesData[i].date = userMgs[i].date;
                userNamesData[i].message = userMgs[i].message;
                userNamesData[i].counter = userMgs[i].counter;
                userNamesData[i].type = userMgs[i].type;
                userNamesData[i].msgStatus = userMgs[i].status;
                if (userMgs[i].currentUser != undefined) {
                    userNamesData[i].currentUser = userMgs[i].currentUser;
                }

                userMessageAndNameData.push(userNamesData[i])
            }
            this.setState({
                messageUser: userMessageAndNameData
            })
            userMessageAndNameData = [];
        })

    }



    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }
    checkTrainy = () => {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            AsyncStorage.getItem('currentUser').then((value) => {
                let userData = JSON.parse(value)
                let userName = userData.name;
                if (userData.assignTrainner != undefined) {
                    this.setState({
                        forTrainnerModal: false
                    })
                    this.chatInboxFunction();
                }
                else if (userData.assignTrainny != undefined) {
                    this.setState({
                        forTrainnerModal: false
                    })
                    this.chatInboxFunction();
                }
                else {
                    this.setState({
                        forTrainnerModal: true,
                        currentName: userName,
                        userEmail: userData.email,
                        userNumber: userData.mobileNo
                    })
                }
            })
        });
    }

    // countMesg = (data) => {
    //     console.log('Sent Mesg >>', data)
    // }

    removeModal = () => {
        const { navigate } = this.props.navigation;
        this.setState({
            forTrainnerModal: false
        }, () => { navigate('Homescreen') })

    }


    sendOppentUserData(userData, type) {
        // console.log('Type message user >>', userData, 'Type read >>', type);
        // this.setState({messageRead:type})
        let opponentUserData = [];
        console.log('Current User >', this.state.currentUserId);
        db.ref('chatRoom').on("value", snapshot => {
            let data = snapshot.val();
            // for (var i in userNamesData) {
            // let userAllData = userNamesData[i];
            // let counter = 0
            let sentMsgsArray;
            for (var j in data) {
                let firbaseData = data[j];
                if (firbaseData.reciverId == this.state.currentUserId) {
                    if (firbaseData.status == 'sent' || firbaseData.status == 'delivered') {
                        //  console.log(firbaseData ,'sent status messages opponent' , j , 'iteration')
                        // firbaseData.counter = 0;
                        firbaseData.status = type;
                        db.ref(`chatRoom/${j}`).update(firbaseData);
                        // console.log(j, 'j iteration')
                    }
                    // if (firbaseData.status == 'sent') {


                    // }
                }
            }
            // console.log('SentMsgsArray >>',sentMsgsArray);

        })
        const { navigate } = this.props.navigation;
        navigate('Chatscreen', {
            senderData: userData,
        });
    }


    showPackage = () => {
        const { navigate } = this.props.navigation;
        this.setState({
            forTrainnerModal: false
        }, () => {
            navigate('PackagesScreen', {
                currentName: this.state.currentName,
                userEmail: this.state.userEmail,
                userNumber: this.state.userNumber

            })
        })
    }


    render() {
        const { messageUser, newMessage, opponentId, forTrainnerModal,
             userEmail, currentName, userNumber,monthName,todayDate,yesterdayDate } = this.state;
        //  console.log('todayDate >>', todayDate , 'yesterdayDate >>', yesterdayDate);
        let dateNum;
        let month;
        let year;
        let showDate;
        const senderName = messageUser && messageUser.map((elem, key) => {
            // console.log('Elem >>', elem);
            if (dateNum == undefined) {
                if (Number(elem.date.slice(3, 5)) == Number(todayDate.slice(3, 5)) && Number(elem.date.slice(0, 2)) == Number(todayDate.slice(0, 2))
                  && Number(elem.date.slice(6)) == Number(todayDate.slice(6))) {
                  showDate = "Today";
                }
                else {
                  showDate = `${Number(elem.date.slice(3, 5))}-${monthName[Number(elem.date.slice(0, 2))]}-${Number(elem.date.slice(6))}`
                }
              }
              else {
                if (dateNum == Number(elem.date.slice(3, 5)) && month == Number(elem.date.slice(0, 2))
                  && year == Number(elem.date.slice(6))) {
                  showDate = ''
                }
                else {
                  if (Number(elem.date.slice(3, 5)) == Number(todayDate.slice(3, 5)) && Number(elem.date.slice(0, 2)) == Number(todayDate.slice(0, 2))
                    && Number(elem.date.slice(6)) == Number(elem.slice(6))) {
                    showDate = "Today";
                  }
                  else if (Number(elem.date.slice(3, 5)) == Number(yesterdayDate.slice(3, 5)) && Number(elem.date.slice(0, 2)) == Number(yesterdayDate.slice(0, 2))
                    && Number(elem.date.slice(6)) == Number(yesterdayDate.slice(6))) {
                    showDate = "Yesterday";
                  }
                  else {
                    showDate = `${Number(elem.date.slice(3, 5))}-${monthName[Number(elem.date.slice(0, 2))]}-${Number(elem.date.slice(6))}`
                  }
                }
              }
              dateNum = Number(elem.date.slice(3, 5));
              month = Number(elem.date.slice(0, 2));
              year = Number(elem.date.slice(6));
              console.log('showDate >>', showDate)

            return (
                <View style={styles.mainInboxContainer}>
                <View style={styles.nameContainer}>
                    {elem.image != undefined ?
                        <Image source={{ uri: `${elem.image}` }} style={styles.profilPicInInboxStyle} />
                        :
                        <Image source={require('../icons/profile.png')} style={styles.profilPicInInboxStyle} />
                    }
                    <TouchableOpacity style={styles.nameOpacity} onPress={this.sendOppentUserData.bind(this, elem, 'seen')}>
                        <Text style={styles.name}>{elem.name}</Text>
                    </TouchableOpacity>

                    {elem.status == 'Online' ?
                        <View style={styles.userIconView}>
                            <Image source={require('../icons/iconfinder_Circle_Green_34211.png')} style={styles.userIcon} />
                        </View>
                        :
                        elem.status == 'Offline' ?
                            <View style={styles.userIconView}>
                                <Image source={require('../icons/iconfinder_Circle_Red_34214.png')} style={styles.userIcon} />
                            </View>
                            : null
                    }
                    
                </View>
               {/* short message and time , date , counter */}
               <View style={styles.checkAndMessgContainer}>
                <View style={{marginRight:5}}>
                {elem.currentUser != undefined && elem.msgStatus == 'delivered' ?
                    <Text style={{ color: 'gray', fontSize: 12 }}>_/_/</Text>
                    : elem.currentUser != undefined && elem.msgStatus == 'sent' ?
                        <Text style={{ color: 'gray', fontSize: 12 }}>_/</Text>
                        : elem.currentUser != undefined && elem.msgStatus == 'seen' ?
                            <Text style={{ color: 'blue', fontSize: 12 }}>_/_/</Text>
                            :
                            null
                }
                </View>

                {
                    elem.type == 'image' ? <View style={styles.imagesAndText}>
                        <Image source={require('../icons/camera.jpg')} style={styles.iconsStyle } /><Text style={styles.textInbox}>Photo</Text></View>

                        :
                        elem.type == 'pdf' ? <View style={styles.imagesAndText}>
                            <Image source={require('../icons/pdf.jpg')} style={styles.iconsStyle} /><Text style={styles.textInbox}>PDF</Text></View>
                            :
                            elem.type == 'docx' ? <View style={styles.imagesAndText}>
                                <Image source={require('../icons/docx.png')} style={styles.iconsStyle} /><Text style={styles.textInbox}>Docx file</Text></View>
                                :
                                elem.type == 'doc' ? <View style={styles.imagesAndText}>
                                    <Image source={require('../icons/doc.png')} style={styles.iconsStyle} /> <Text style={styles.textInbox}>Doc file</Text></View>
                                    :
                                    elem.type == 'pptx' ? <View style={styles.imagesAndText}>
                                        <Image source={require('../icons/pptx.png')} style={styles.iconsStyle} /><Text style={styles.textInbox}>PPTX file</Text></View>
                                        :
                                        elem.type == 'mp3' || elem.type == 'wma' ? <View style={styles.imagesAndText}>
                                            <Image source={require('../icons/audio.png')} style={styles.iconsStyle} /><Text style={styles.textInbox}>Audio file</Text></View>
                                            :
                                            elem.type == 'mp4' ? <View style={styles.imagesAndText}>
                                                <Image source={require('../icons/video.png')} style={styles.iconsStyle} /><Text style={styles.textInbox}>Video</Text></View>
                                                :
                                                elem.type == 'weeklyReport' ? <View style={styles.imagesAndText}>
                                                    <Image source={require('../icons/report.png')} style={styles.iconsStyle} /><Text>Weekly Report</Text></View>
                                                    :
                                                    <Text style={{ color: 'gray', fontSize: 12, marginRight:'11%' }}>{elem.message}</Text>
                }

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Text style={{ color: 'gray', fontSize: 12 ,marginRight:5 }}>{elem.time}</Text>
                    {showDate != '' && showDate == 'Today' || showDate == 'Yesterday' ? <Text style={{ color: 'gray', fontSize: 12 }}>{showDate}</Text>
                    :
                    <Text style={{ color: 'gray', fontSize: 12, marginRight:'8%' }}>{elem.date}</Text>
                     } 
                </View>
                    <View><Text style={{ color: 'blue', fontSize: 14,marginRight:13}}>{elem.counter >= 1 ? elem.counter : null}</Text></View>
                    {/* <View><Text style={{ color: 'blue', fontSize: 14,marginRight:13}}>5</Text></View> */}


            </View>
                

            </View>
            )
        })
        return (
            <View style={styles.mainContainer}>
                <View style={styles.childMainContainer}>
                    <View style={styles.inbox}>
                        <Text style={styles.profileNameStyle}>Inbox</Text>
                    </View>
                    <ScrollView style={styles.scrollContainer} contentContainerStyle={{ flexGrow: 1 }}
                        ref={ref => this.scrollView = ref}
                        onContentSizeChange={(contentWidth, contentHeight) => {
                            this.scrollView.scrollToEnd({ animated: true });
                        }}>
                        {senderName != '' && senderName}
                    </ScrollView>
                    <Modal
                        isVisible={this.state.forTrainnerModal}
                        animationIn='zoomIn'
                        //animationOut='zoomOutDown'
                        backdropOpacity={0.8}
                        backdropColor='white'
                        coverScreen={true}
                        animationInTiming={500}
                        animationOutTiming={500}
                    >
                        <View style={styles.withOutTrainerModal}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 8 }}>
                                <Text style={styles.textColor}>You dont have a trainer</Text>
                                <TouchableOpacity onPress={this.removeModal} activeOpacity={0.6}>
                                    <Image source={require('../icons/cancel.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.userInstruction}>
                                <Text style={styles.userInsTextStyle}>Get premium account to get a coach</Text>
                                <Text style={styles.userInsTextStyle}>Kindly contact </Text>
                                <Text style={styles.userInsTextStyle}>After trainner successfully assign to you than restart your login process  </Text>
                                <TouchableOpacity
                                    style={styles.sendReqContainer}
                                    activeOpacity={0.7}
                                    //onPress={this.sendRequestAdmin}
                                    onPress={this.showPackage}
                                >
                                    <Text style={styles.sendReqText}>Show Packages</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        );
    }
}
export default ChatInbox;
