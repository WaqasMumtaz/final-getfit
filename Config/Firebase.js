import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCrtuXYX_EYef2zSbdKnbKMROkH65pFrX4",
    authDomain: "getfit-application.firebaseapp.com",
    databaseURL: "https://getfit-application.firebaseio.com",
    projectId: "getfit-application",
    storageBucket: "getfit-application-react-native-appspot.com",
    messagingSenderId: "253025208867",
    appId: "1:253025208867:web:bd3b867d48f7fe6e"

}
firebase.initializeApp(config)

export default firebase;