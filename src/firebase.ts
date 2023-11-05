// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGne7FcVbtCEm96T9RY5nRx5sfG7VLlro",
  authDomain: "infomat-web.firebaseapp.com",
  projectId: "infomat-web",
  storageBucket: "infomat-web.appspot.com",
  messagingSenderId: "292174046524",
  appId: "1:292174046524:web:375f13889862fe511b6a39",
  measurementId: "G-TFSDB6TGYC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);