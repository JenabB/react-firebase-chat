import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyCmkq76r2QhcFYWxit3v0vGKV-IXthoIzY",
    authDomain: "react-firebase-chattt.firebaseapp.com",
    projectId: "react-firebase-chattt",
    storageBucket: "react-firebase-chattt.appspot.com",
    messagingSenderId: "49337148651",
    appId: "1:49337148651:web:5c7363c2ac362f26338aae",
    measurementId: "G-XMM6BRX3RR",
  })
  .auth();
