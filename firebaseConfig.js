import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAa4_-RJ3OlKM011X8m-1xOct2FcQZUmnA",
  authDomain: "hiphoptamizha-ede8a.firebaseapp.com",
  databaseURL: "https://hiphoptamizha-default-rtdb.firebaseio.com",
  projectId: "hiphoptamizha",
  storageBucket: "hiphoptamizha.appspot.com",
  messagingSenderId: "535335494126",
  appId: "1:535335494126:web:b2573c8b4f0f907910eeff",
  measurementId: "G-975JT0CMD2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


