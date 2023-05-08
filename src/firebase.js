// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyBvpFiD3ss8p8OcsBxfJI_wL3n2tj_41ak",
  authDomain: "project3-a9439.firebaseapp.com",
  databaseURL: "https://project3-a9439-default-rtdb.firebaseio.com",
  projectId: "project3-a9439",
  storageBucket: "project3-a9439.appspot.com",
  messagingSenderId: "273087044560",
  appId: "1:273087044560:web:ca53d54ce216339df377d5",
  measurementId: "G-Q7XV8C50Y8"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);