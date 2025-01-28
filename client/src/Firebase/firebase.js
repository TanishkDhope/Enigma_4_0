// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore, addDoc, collection, getDocs, query, where, onSnapshot } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmBs7AwB7JPq-FqnLc7FoMWguyHfMa9Mo",
  authDomain: "enigma30-dce65.firebaseapp.com",
  projectId: "enigma30-dce65",
  storageBucket: "enigma30-dce65.firebasestorage.app",
  messagingSenderId: "862900851494",
  appId: "1:862900851494:web:1804c410cacb1d258d27e7",
  measurementId: "G-47LH3EJ3MN"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export const auth = getAuth(app);


export { storage, db, collection, addDoc, getDocs };
