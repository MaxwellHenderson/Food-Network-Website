import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import firebase from 'firebase';

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

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
