import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAYkrN8zbB8_2ysGucn1cbSm_e2sfCIRr0",
    authDomain: "safetyhub-ec418.firebaseapp.com",
    databaseURL: "https://safetyhub-ec418.firebaseio.com",
    projectId: "safetyhub-ec418",
    storageBucket: "safetyhub-ec418.appspot.com",
    messagingSenderId: "1002480327063",
    appId: "1:1002480327063:web:fe219b49a6e7f30ce8ccd2"
    
  };
  export default () => {
    return {firebase, auth, database, storage,firestore};
  };
 if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

