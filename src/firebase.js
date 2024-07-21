// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";


import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQSmUOd8JKJqGXEwH9tfh7vhaRXbQ4vXw",
  authDomain: "final-b4f74.firebaseapp.com",
  databaseURL: "https://final-b4f74-default-rtdb.firebaseio.com",
  projectId: "final-b4f74",
  storageBucket: "final-b4f74.appspot.com",
  messagingSenderId: "234547135960",
  appId: "1:234547135960:web:6ba7508750dcfa387d9ead",
  measurementId: "G-MFT9SC25YX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage();

export const provider = new GoogleAuthProvider();
export default app;

export const auth = getAuth(app)