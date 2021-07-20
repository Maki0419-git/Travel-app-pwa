import firebase from 'firebase/app';


export var firebaseConfig = {
    apiKey: "AIzaSyAvLfE1ai2EO5zMyj3a8KftizoJeJGDbHQ",
    authDomain: "weather-app-web-push.firebaseapp.com",
    projectId: "weather-app-web-push",
    storageBucket: "weather-app-web-push.appspot.com",
    messagingSenderId: "657245387234",
    appId: "1:657245387234:web:a6229dc8846435545161bb",
    measurementId: "G-1KMTR536RX"
};
// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();