// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "expo-services-bcebb.firebaseapp.com",
  projectId: "expo-services-bcebb",
  storageBucket: "expo-services-bcebb.appspot.com",
  messagingSenderId: "259789057939",
  appId: "1:259789057939:web:5f067c6a53c0a9ece20266",
  measurementId: "G-0K99NT9SQT"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const storage=getStorage(app)
