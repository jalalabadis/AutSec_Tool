// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAORyY-x8rIyZL0h55WfqjbNgwxKz9vQ0A",
//   authDomain: "social-network1007.firebaseapp.com",
//   databaseURL: "https://social-network1007-default-rtdb.firebaseio.com",
//   projectId: "social-network1007",
//   storageBucket: "social-network1007.appspot.com",
//   messagingSenderId: "328012235049",
//   appId: "1:328012235049:web:490bd50c3daf74cd0db738"
// };

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

const auth = getAuth();

// Sign in With Goolge Provide 
const SignInWithGoogleProvider = () => {
  auth.sin
}

export { app,auth };