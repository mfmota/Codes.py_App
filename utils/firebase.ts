import { initializeApp,getApp } from 'firebase/app';
import { initializeAuth,getAuth, getReactNativePersistence } from "firebase/auth"; 
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import {getFirestore,collection,addDoc} from "firebase/firestore";
import {getDatabase} from 'firebase/database';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDL-sDT_hf72CnyspZbICImWy7Z3H7Pwfc",
  authDomain: "dirppg-6d0bb.firebaseapp.com",
  projectId: "dirppg-6d0bb",
  storageBucket: "dirppg-6d0bb.appspot.com",
  messagingSenderId: "542474697056",
  appId: "1:542474697056:web:3fbeacbcd130ffe9214605",
  measurementId: "G-XR3PMRGC44"
};

const firebase = initializeApp(firebaseConfig);

const auth = initializeAuth(firebase, 
  {   persistence: getReactNativePersistence(AsyncStorage) });
  
  const db = getDatabase();
  //const db = getFirestore(firebase);

  export { db,firebase, auth, getApp, getAuth,getFirestore,collection,addDoc };
 

