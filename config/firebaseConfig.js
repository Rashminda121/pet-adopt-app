// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "react-native-fa998.firebaseapp.com",
  projectId: "react-native-fa998",
  storageBucket: "react-native-fa998.appspot.com",
  messagingSenderId: "684598427939",
  appId: "1:684598427939:web:a874f41be8bf38219a4c96",
  measurementId: "G-ZC35SSJJZM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
//const analytics = getAnalytics(app);
