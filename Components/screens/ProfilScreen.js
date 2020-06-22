import React from 'react';
import { Text, View, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
// import TextInputs from '../textInputs/TextInputs';
// import Wheelspiner from '../Progress Wheel/Progress';
import styles from '../Styling/ProfilScreenStyle';
// import CaloriesSetupBtn from '../buttons/setUpBtn';
import AsyncStorage from '@react-native-community/async-storage';
// import { thisExpression } from '@babel/types';
import HttpUtils from '../Services/HttpUtils';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'

const { height } = Dimensions.get('window');
let checkProfile = false;

class Profile extends React.Component {
  static navigationOptions = (navigation) => {
    const { params = {} } = navigation.navigation.state;
    let headerRight;
    if (params.opponentProfile) {
      checkProfile = params.opponentProfile;
    }
    else {
      checkProfile = false;
      headerRight = <TouchableOpacity
        style={styles.headerIconContainer}
        onPress={
          params.showEditForm
        }
      >
        <Image source={require('../icons/edit-pencil.png')} style={styles.headerIcon} />
      </TouchableOpacity>
    }
    return {
      headerRight,
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
      address: '',
      contactNo: '',
      email: '',
      gender: '',
      type: '',
      avatarSource: '',
      show: false,
      title: '',
      checkProfile: false,
      profileData: '',
      profile: ''
    }
  }

  componentWillMount() {
    this.profileFunction();
  }

  profileFunction = () => {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', async () => {
      // console.log(checkProfile, 'checkProfile')
      if (checkProfile) {
        const { senderData } = this.props.navigation.state.params;
        // console.log(senderData, 'sender data')
        if (senderData.image != undefined) {
          this.setState({
            name: senderData.name,
            address: senderData.address,
            contactNo: senderData.contactNo,
            email: senderData.email,
            gender: senderData.gender,
            avatarSource: senderData.image,
            type: senderData.type,
            title: senderData.type,
            profileData: senderData,
            profile: 'opponentProfile'
          })
        }
        else {
          let obj = {
            userId: senderData.userId
          }
          let profileData = await HttpUtils.post('getProfile', obj);
          let dataProfile = profileData.content[0]
          if (profileData.mgs == 'User not created profile yet') {
            this.setState({
              name: senderData.name,
              type: senderData.type,
              title: senderData.type,
              profileData: senderData,
              profile: 'opponentProfile'
            })
          }
          else {
            this.setState({
              name: dataProfile.name,
              address: dataProfile.address,
              contactNo: dataProfile.contactNo,
              email: dataProfile.email,
              gender: dataProfile.gender,
              avatarSource: dataProfile.image,
              type: dataProfile.type,
              title: dataProfile.type.charAt(0).toUpperCase() + dataProfile.type.slice(1),
              profileData: dataProfile,
              profile: 'opponentProfile'
            })
          }
        }

      }
      else {
        AsyncStorage.getItem('myProfile').then((value) => {
          let userData = JSON.parse(value);
          console.log(userData, 'userData')
          if (userData.image != undefined) {
            console.log('proffile complete data')
            this.setState({
              name: userData.name,
              email: userData.email,
              type: userData.type,
              address: userData.address,
              contactNo: userData.contactNo,
              gender: userData.gender,
              avatarSource: userData.image,
              title: 'My',
              profileData: userData,
              profile: 'myProfile'
            })
          }
          else {
            console.log('user profile else condition', userData)
            this.setState({
              name: userData.name,
              email: userData.email,
              address: userData.address,
              contactNo: userData.contactNo,
              gender: userData.gender,
              type: userData.type,
              title: 'My',
              profileData: userData,
              profile: 'myProfile'
            })
          }
        })
      }


    })
  }
  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  editForm = () => {
    const { profileData, profile } = this.state;
    this.props.navigation.navigate('EditProfileScreen', {
      profileData: profileData,
      profile: profile
    });
  }

  componentDidMount() {
    const { show } = this.state;
    this.props.navigation.setParams({ showEditForm: this.editForm, })
  }

  render() {
    const { show, name, type, address, contactNo, email, gender, avatarSource, title } = this.state;
    console.log('Type User >>', type);
    return (
      <KeyboardAwareView animated={true}>
        <View style={styles.mainContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingStyle}>
              {`${title} Profile`}
            </Text>
          </View>
          <ScrollView
            style={{ flex: 1, backgroundColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.profileContainer}>
              <View style={styles.profilPicContainer}>
                {
                  avatarSource != '' ?
                    <Image style={styles.profilPicStyle} source={{ uri: `${avatarSource}` }} />
                    :
                    <Image source={require('../icons/profile.png')} style={styles.profilPicStyle} />
                }
                <View style={styles.nameContainer}>
                  <Text style={styles.nameStyle}>{name}</Text>
                </View>
                <View style={styles.userTitle}>
                  <Text style={styles.userTitleStyle}>{type == 'trainner' ? 'trainer' : type}</Text>
                </View>
              </View>
            </View>
            <View style={styles.userInfoContainer}>
              <View>
                <Text style={styles.labelStyle}>Email</Text>
                <Text style={styles.userInsertedValueStyle}>{email}</Text>
              </View>
              <View style={styles.viewBlock}>
                <Text style={styles.labelStyle}>Address</Text>
                <Text style={styles.userInsertedValueStyle}>{address}</Text>
              </View>
              <View style={styles.viewBlock}>
                <Text style={styles.labelStyle}>Contact Number</Text>
                <Text style={styles.userInsertedValueStyle}>{contactNo}</Text>
              </View>
              <View style={styles.viewBlock}>
                <Text style={styles.labelStyle}>Gender</Text>
                <Text style={styles.userInsertedValueStyle}>{gender}</Text>
              </View>
              <View style={{ marginBottom: 10 }}>

              </View>
            </View>
          </ScrollView>


        </View>
      </KeyboardAwareView>
    )
  }

}

export default Profile;