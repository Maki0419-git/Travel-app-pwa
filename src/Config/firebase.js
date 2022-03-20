
//v9.1.3
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "@firebase/storage";


const config = {
    apiKey: "AIzaSyAvLfE1ai2EO5zMyj3a8KftizoJeJGDbHQ",
    authDomain: "weather-app-web-push.firebaseapp.com",
    projectId: "weather-app-web-push",
    storageBucket: "weather-app-web-push.appspot.com",
    messagingSenderId: "657245387234",
    appId: "1:657245387234:web:a6229dc8846435545161bb",
    measurementId: "G-1KMTR536RX"
};
const firebaseApp = initializeApp(config);
const initial = () => initializeApp(config);
const db = getFirestore();
const storage = getStorage(firebaseApp, "gs://weather-app-web-push.appspot.com")


export { db, initial, storage };
