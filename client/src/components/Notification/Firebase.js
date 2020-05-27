import * as firebase from 'firebase';
import "firebase/database";

const config = {
    apiKey: "AIzaSyBWI5fBwmwjXYLu1jBtpVa7Ru_1I3cNJBs",
    authDomain: "food-network-chat.firebaseapp.com",
    databaseURL: "https://food-network-chat.firebaseio.com",
    projectId: "food-network-chat",
    storageBucket: "food-network-chat.appspot.com",
    messagingSenderId: "210291696500",
    appId: "1:210291696500:web:ff7e159b3cf410a3b94221",
    measurementId: "G-FN9DJ0GZBW"
};
firebase.initializeApp(config);

export default firebase;