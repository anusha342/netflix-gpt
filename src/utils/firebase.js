// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsxqJLKuxtdkSP1-RubmKXhhcs6CP-YHY",
  authDomain: "netfllix-gpt-9cf22.firebaseapp.com",
  projectId: "netfllix-gpt-9cf22",
  storageBucket: "netfllix-gpt-9cf22.firebasestorage.app",
  messagingSenderId: "914168831390",
  appId: "1:914168831390:web:0db00f938ec56f141e4a8f",
  measurementId: "G-M332MPK55F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();