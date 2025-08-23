// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "impela-trading-cc",
  "appId": "1:551174540144:web:85d01388feb0488e0a9db5",
  "storageBucket": "impela-trading-cc.firebasestorage.app",
  "apiKey": "AIzaSyAoXgy0SRxyNfqSEgPy-G0YZVX1SIsH5pc",
  "authDomain": "impela-trading-cc.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "551174540144"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
