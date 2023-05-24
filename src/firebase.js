// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyCCOAyfSV996dvOK9uAWP3Zpwqqhnxz0L8",
  authDomain: "usersubscriber-78947.firebaseapp.com",
  databaseURL: "https://usersubscriber-78947-default-rtdb.firebaseio.com",
  projectId: "usersubscriber-78947",
  storageBucket: "usersubscriber-78947.appspot.com",
  messagingSenderId: "302665680571",
  appId: "1:302665680571:web:f2a131bccdfeea1e0d4b9e",
  measurementId: "G-K6MNGT630H"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);