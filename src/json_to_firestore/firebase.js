// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAZB-euiRzOWBUApbbH0hi4_TbMWlV_VI0",
    authDomain: "whereswaldo-144f5.firebaseapp.com",
    projectId: "whereswaldo-144f5",
    storageBucket: "whereswaldo-144f5.appspot.com",
    messagingSenderId: "871945780155",
    appId: "1:871945780155:web:e5c509fd10660cb5ce229e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//module.exports = firebaseConfig;

export { db };