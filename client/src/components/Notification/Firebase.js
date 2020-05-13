import * as firebase from 'firebase';
import "firebase/database";

const config = {
    apiKey: "AIzaSyBWI5fBwmwjXYLu1jBtpVa7Ru_1I3cNJBs",
    authDomain: "food-network-chat.firebaseapp.com",
    databaseURL: "https://food-network-chat.firebaseio.com",
    projectId: "food-network-chat",
    storageBucket: "food-network-chat.appspot.com",
    messagingSenderId: "210291696500",
    appId: "1:210291696500:web:7a90dce672c3146eb94221",
    measurementId: "G-3J1QEDECCL"
};
firebase.initializeApp(config);

export default firebase;